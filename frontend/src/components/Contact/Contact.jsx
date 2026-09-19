import { useEffect, useRef, useState } from "react";

import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaWhatsapp,
} from "react-icons/fa";

import Select from "react-select";

import PhoneInput from "react-phone-number-input/input";
import {
  getCountries,
  getCountryCallingCode,
  isValidPhoneNumber,
} from "react-phone-number-input";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "react-phone-number-input/style.css";
import "./Contact.css";

gsap.registerPlugin(ScrollTrigger);

/* =========================
   COUNTRY LIST
========================= */

const countryNames = new Intl.DisplayNames(["en"], {
  type: "region",
});

const countryOptions = getCountries()
  .map((country) => {
    const name =
      countryNames.of(country) || country;

    const callingCode =
      getCountryCallingCode(country);

    return {
      value: country,
      label: name,
      countryName: name,
      callingCode,
    };
  })
  .sort((a, b) =>
    a.countryName.localeCompare(
      b.countryName
    )
  );

function Contact() {
  const sectionRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    country: "IN",
    treatment: "",
    medicalHistory: "",
  });

  const [selectedCountry, setSelectedCountry] =
    useState("IN");

  const [medicalReports, setMedicalReports] =
    useState([]);

  const [errors, setErrors] = useState({});

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [submitMessage, setSubmitMessage] =
    useState("");

  const [submitError, setSubmitError] =
    useState("");

  const [captchaChecked, setCaptchaChecked] =
    useState(false);

  const [captchaLoading, setCaptchaLoading] =
    useState(false);

  /* =========================
     GSAP ANIMATION
  ========================= */

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-form-card", {
        opacity: 0,
        x: -40,
        duration: 0.8,
        ease: "power3.out",

        scrollTrigger: {
          trigger: ".contact-section",
          start: "top 80%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* =========================
     GENERAL INPUT CHANGE
  ========================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    setSubmitMessage("");
    setSubmitError("");
  };

  /* =========================
     COUNTRY CHANGE
  ========================= */

  const handleCountryChange = (selectedOption) => {
    const country =
      selectedOption?.value || "IN";

    setSelectedCountry(country);

    setFormData((previous) => ({
      ...previous,
      country,
      contact: previous.contact || "",
    }));

    setErrors((previous) => ({
      ...previous,
      country: "",
      contact: "",
    }));

    setSubmitMessage("");
    setSubmitError("");
  };

  /* =========================
     CONTACT NUMBER CHANGE
  ========================= */

  const handleContactChange = (value) => {
    setFormData((previous) => ({
      ...previous,
      contact: value || "",
    }));

    setErrors((previous) => ({
      ...previous,
      contact: "",
    }));

    setSubmitMessage("");
    setSubmitError("");
  };

  /* =========================
     FILE CHANGE
  ========================= */

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    setMedicalReports(files);

    setErrors((previous) => ({
      ...previous,
      medicalReports: "",
    }));

    setSubmitMessage("");
    setSubmitError("");
  };

  /* =========================
     CAPTCHA
  ========================= */

  const handleCaptchaClick = () => {
    if (captchaChecked) {
      setCaptchaChecked(false);

      setErrors((previous) => ({
        ...previous,
        captcha: "",
      }));

      return;
    }

    if (captchaLoading) {
      return;
    }

    setCaptchaLoading(true);

    setTimeout(() => {
      setCaptchaLoading(false);
      setCaptchaChecked(true);

      setErrors((previous) => ({
        ...previous,
        captcha: "",
      }));
    }, 1200);
  };

  const handleCaptchaKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCaptchaClick();
    }
  };

  /* =========================
     FORM VALIDATION
  ========================= */

  const validateForm = () => {
    const newErrors = {};

    /* =========================
       NAME
    ========================= */

    const name = formData.name.trim();

    if (!name) {
      newErrors.name =
        "Please enter your name.";
    } else if (name.length < 2) {
      newErrors.name =
        "Name must contain at least 2 characters.";
    }

    /* =========================
       EMAIL
    ========================= */

    const email = formData.email.trim();

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      newErrors.email =
        "Please enter your email address.";
    } else if (!emailPattern.test(email)) {
      newErrors.email =
        "Please enter a valid email address.";
    }

    /* =========================
       CONTACT NUMBER
    ========================= */

  /* =========================
   CONTACT NUMBER
========================= */

const contact = formData.contact.trim();

      if (!contact) {
        newErrors.contact =
          "Please enter your contact number.";
      } else if (!isValidPhoneNumber(contact)) {
        newErrors.contact =
          "Please enter a valid contact number.";
      }

    /* =========================
       COUNTRY
    ========================= */

    if (!formData.country.trim()) {
      newErrors.country =
        "Please select your country.";
    }

    /* =========================
       TREATMENT
    ========================= */

    if (!formData.treatment.trim()) {
      newErrors.treatment =
        "Please enter the treatment you are looking for.";
    }

    /* =========================
       MEDICAL REPORTS
    ========================= */

    if (medicalReports.length === 0) {
      newErrors.medicalReports =
        "Please upload at least one medical report.";
    } else {
      const allowedExtensions = [
        ".pdf",
        ".jpg",
        ".jpeg",
        ".png",
      ];

      const invalidFile =
        medicalReports.find((file) => {
          const fileName =
            file.name.toLowerCase();

          return !allowedExtensions.some(
            (extension) =>
              fileName.endsWith(extension)
          );
        });

      if (invalidFile) {
        newErrors.medicalReports =
          "Only PDF, JPG, JPEG or PNG files are allowed.";
      }

      /* Maximum 5 MB per file */

      const largeFile =
        medicalReports.find(
          (file) =>
            file.size >
            5 * 1024 * 1024
        );

      if (largeFile) {
        newErrors.medicalReports =
          "Each medical report must be smaller than 5 MB.";
      }

      /* Maximum 5 files */

      if (medicalReports.length > 5) {
        newErrors.medicalReports =
          "You can upload a maximum of 5 medical reports.";
      }
    }

    /* =========================
       MEDICAL HISTORY
       OPTIONAL
    ========================= */

    /* No validation for medicalHistory */

    /* =========================
       CAPTCHA
    ========================= */

    if (!captchaChecked) {
      newErrors.captcha =
        "Please verify that you are not a robot.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* =========================
     FORM SUBMIT
  ========================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    setSubmitMessage("");
    setSubmitError("");

    setIsSubmitting(true);

    try {
      const data = new FormData();

      data.append(
        "name",
        formData.name.trim()
      );

      data.append(
        "email",
        formData.email.trim()
      );

      data.append(
        "contact",
        formData.contact.trim()
      );

      data.append(
        "country",
        formData.country.trim()
      );

      data.append(
        "treatment",
        formData.treatment.trim()
      );

      data.append(
        "medicalHistory",
        formData.medicalHistory.trim()
      );

      medicalReports.forEach((file) => {
        data.append(
          "medicalReports",
          file
        );
      });

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/contact`,
        {
          method: "POST",
          body: data,
        }
      );

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitMessage(
          "Message submitted successfully! Our team will get back to you shortly."
        );

        /* Reset form */

        setFormData({
          name: "",
          email: "",
          contact: "",
          country: "IN",
          treatment: "",
          medicalHistory: "",
        });

        setSelectedCountry("IN");

        setMedicalReports([]);

        setCaptchaChecked(false);

        setCaptchaLoading(false);

        setErrors({});

        /* Reset HTML form */

        e.target.reset();
      } else {
        setSubmitError(
          result.message ||
            "Failed to submit your message. Please try again."
        );
      }
    } catch (error) {
      console.error(
        "Contact form submission error:",
        error
      );

      setSubmitError(
        "Unable to connect to the server. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /* =========================
     SELECTED COUNTRY OPTION
  ========================= */

  const selectedCountryOption =
    countryOptions.find(
      (option) =>
        option.value === selectedCountry
    ) || null;

  return (
    <section
      className="contact-section"
      id="contact"
      ref={sectionRef}
    >
      <div className="contact-container">

        {/* =========================
            CONTACT FORM
        ========================= */}

        <div className="contact-form-card">

          <h2 className="contact-form-title">
            Send us a Message
          </h2>

          <p className="contact-form-description">
            Have questions or want to learn more? Reach out to us and our
            team will get back to you shortly.
          </p>

          <form
            className="contact-form"
            onSubmit={handleSubmit}
            noValidate
          >

            {/* =========================
                NAME + EMAIL
            ========================= */}

            <div className="contact-row">

              <div className="contact-field">

                <label>
                  Your Name{" "}
                  <span className="required-star">
                    *
                  </span>
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                />

                {errors.name && (
                  <small className="form-error">
                    {errors.name}
                  </small>
                )}

              </div>

              <div className="contact-field">

                <label>
                  Your Email{" "}
                  <span className="required-star">
                    *
                  </span>
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                />

                {errors.email && (
                  <small className="form-error">
                    {errors.email}
                  </small>
                )}

              </div>

            </div>

            {/* =========================
                CONTACT + COUNTRY
            ========================= */}

            <div className="contact-row">

              {/* CONTACT NUMBER */}

              <div className="contact-field">

                <label>
                  Your Contact Number{" "}
                  <span className="required-star">
                    *
                  </span>
                </label>

                <div className="contact-phone-wrapper">

                  <PhoneInput
                    international
                    withCountryCallingCode
                    country={selectedCountry}
                    value={formData.contact}
                    onChange={handleContactChange}
                    placeholder="Your Contact Number"
                    className="contact-phone-input"
                  />

                </div>

                {errors.contact && (
                  <small className="form-error">
                    {errors.contact}
                  </small>
                )}

              </div>

              {/* COUNTRY */}

              <div className="contact-field">

                <label>
                  Your Country{" "}
                  <span className="required-star">
                    *
                  </span>
                </label>

                <Select
                  value={selectedCountryOption}
                  onChange={handleCountryChange}
                  options={countryOptions}
                  isSearchable
                  isClearable={false}
                  placeholder="Your Country"
                  className="country-select"
                  classNamePrefix="country-select"
                  maxMenuHeight={250}
                  filterOption={(
                    option,
                    inputValue
                  ) => {
                    const search =
                      inputValue
                        .toLowerCase()
                        .trim();

                    if (!search) {
                      return true;
                    }

                    return (
                      option.data.countryName
                        .toLowerCase()
                        .includes(search) ||
                      option.data.value
                        .toLowerCase()
                        .includes(search) ||
                      option.data.callingCode
                        .includes(search)
                    );
                  }}
                />

                {errors.country && (
                  <small className="form-error">
                    {errors.country}
                  </small>
                )}

              </div>

            </div>

            {/* =========================
                TREATMENT
            ========================= */}

            <div className="contact-field">

              <label>
                What Medical Treatment are you looking for?{" "}
                <span className="required-star">
                  *
                </span>
              </label>

              <input
                type="text"
                name="treatment"
                value={formData.treatment}
                onChange={handleChange}
                className="contact-full-input"
                placeholder="What Medical Treatment are you looking for?"
              />

              {errors.treatment && (
                <small className="form-error">
                  {errors.treatment}
                </small>
              )}

            </div>

            {/* =========================
                MEDICAL REPORTS
            ========================= */}

            <div className="contact-upload">

              <label htmlFor="medicalReports">
                Upload Medical Reports (PDF, JPG, PNG){" "}
                <span className="required-star">
                  *
                </span>
              </label>

              <input
                id="medicalReports"
                type="file"
                name="medicalReports"
                accept=".pdf,.jpg,.jpeg,.png"
                multiple
                onChange={handleFileChange}
              />

              {errors.medicalReports && (
                <small className="form-error">
                  {errors.medicalReports}
                </small>
              )}

            </div>

            {/* =========================
                MEDICAL HISTORY
                OPTIONAL
            ========================= */}

            <div className="contact-field">

              <label>
                Your Medical History Details
              </label>

              <textarea
                name="medicalHistory"
                value={formData.medicalHistory}
                onChange={handleChange}
                placeholder="Your Medical History Details"
              ></textarea>

            </div>

            {/* =========================
                CAPTCHA
            ========================= */}

            <div
              className={`contact-captcha ${
                captchaChecked
                  ? "captcha-checked"
                  : ""
              } ${
                captchaLoading
                  ? "captcha-loading"
                  : ""
              }`}
              onClick={handleCaptchaClick}
              onKeyDown={handleCaptchaKeyDown}
              role="checkbox"
              aria-checked={captchaChecked}
              tabIndex="0"
            >

              <div className="captcha-checkbox">

                {captchaLoading && (
                  <span className="captcha-spinner"></span>
                )}

                {captchaChecked &&
                  !captchaLoading && (
                    <span className="captcha-checkmark">
                      ✓
                    </span>
                  )}

              </div>

              <span className="captcha-text">
                I'm not a robot
              </span>

              <div className="captcha-logo">

                <div className="captcha-logo-symbol">
                  ↻
                </div>

                <small>
                  reCAPTCHA
                </small>

              </div>

            </div>

            {/* CAPTCHA ERROR */}

            {errors.captcha && (
              <small className="form-error captcha-error">
                {errors.captcha}
              </small>
            )}

            {/* SUCCESS */}

            {submitMessage && (
              <div className="submit-success">
                ✓ {submitMessage}
              </div>
            )}

            {/* ERROR */}

            {submitError && (
              <div className="submit-error">
                {submitError}
              </div>
            )}

            {/* SUBMIT */}

            <button
              type="submit"
              className="contact-submit"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Sending..."
                : "Send Message"}
            </button>

          </form>

        </div>

        {/* =========================
            CONTACT INFORMATION
        ========================= */}

        <div className="contact-info">

          {/* ADDRESS */}

          <a
            href="https://www.google.com/maps/search/?api=1&query=JP+Royale+Complex+Malleswaram+Bengaluru+560003"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-info-item contact-info-link"
          >

            <div className="contact-info-icon">
              <FaMapMarkerAlt />
            </div>

            <div className="contact-info-content">

              <h3>
                Address
              </h3>

              <p>
                #218, 2nd Floor, JP Royale Complex,
                Malleswaram, Bengaluru - 560003
              </p>

            </div>

          </a>

          {/* EMAIL */}

          <a
            href="mailto:medical@unihealhealth.com"
            className="contact-info-item contact-info-link"
          >

            <div className="contact-info-icon">
              <FaEnvelope />
            </div>

            <div className="contact-info-content">

              <h3>
                Email Address
              </h3>

              <p>
                medical@unihealhealth.com
              </p>

            </div>

          </a>

          {/* WHATSAPP */}

          <a
            href="https://wa.me/919538564300"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-info-item contact-info-link"
          >

            <div className="contact-info-icon">
              <FaWhatsapp />
            </div>

            <div className="contact-info-content">

              <h3>
                WhatsApp
              </h3>

              <p>
                +91 953 856 4300
              </p>

            </div>

          </a>

        </div>

      </div>
    </section>
  );
}

export default Contact;