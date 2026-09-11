import "./Footer.css";

import {
  FaMapMarkerAlt,
  FaWhatsapp,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaArrowUp,
} from "react-icons/fa";

import { useNavigate, useLocation } from "react-router-dom";

import logo from "../../assets/images/logo/uniheal-logo.webp";

function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  /* =========================
     SECTION NAVIGATION
  ========================= */

  const handleSectionNavigation = (sectionId) => {
    if (location.pathname === "/") {
      const section = document.getElementById(sectionId);

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      return;
    }

    navigate(`/#${sectionId}`);
  };

  /* =========================
     SPECIALITIES PAGE
  ========================= */

  const handleSpecialities = () => {
    navigate("/specialities");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================
     PRIVACY POLICY
  ========================= */

  const handlePrivacyPolicy = () => {
    navigate("/privacy");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================
     TERMS & CONDITIONS
  ========================= */

  const handleTerms = () => {
    navigate("/terms");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================
     WHATSAPP
  ========================= */

  const handleWhatsApp = () => {
    window.open(
      "https://wa.me/919538564300",
      "_blank",
      "noopener,noreferrer"
    );
  };

  /* =========================
     SCROLL TO TOP
  ========================= */

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer-section">

      <div className="footer-container">

        {/* =========================
            COMPANY INFORMATION
        ========================= */}

        <div className="footer-company">

          <img
            src={logo}
            alt="UniHeal"
            className="footer-logo"
          />

          <p className="footer-description">
            Trusted by patients worldwide for affordable,
            transparent, and high-quality healthcare.
          </p>

          {/* ADDRESS */}

          <div className="footer-contact-item">

            <a
              href="https://www.google.com/maps/search/?api=1&query=Uniheal+Robust+Private+Limited+Bengaluru"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-address-link"
            >
              <FaMapMarkerAlt />

              <span>
                #218, 2nd Floor, JP Royale Complex,
                Malleshwaram, Bengaluru - 560003
              </span>
            </a>

          </div>

          {/* PHONE / WHATSAPP */}

          <div className="footer-contact-item">

            <FaWhatsapp />

            <button
              type="button"
              onClick={handleWhatsApp}
            >
              +91 953 856 4300
            </button>

          </div>

          {/* EMAIL */}

          <div className="footer-contact-item">

            <FaEnvelope />

            <a href="mailto:medical@unihealhealth.com">
              medical@unihealhealth.com
            </a>

          </div>

          {/* SOCIAL MEDIA */}

          <div className="footer-socials">

            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon facebook"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon instagram"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>

            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon linkedin"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>

          </div>

        </div>


        {/* =========================
            QUICK LINKS
        ========================= */}

        <div className="footer-column">

          <h3>Quick Links</h3>

          <button
            type="button"
            onClick={() =>
              handleSectionNavigation("about")
            }
          >
            About Us
          </button>

          <button
            type="button"
            onClick={handleSpecialities}
          >
            Specialities
          </button>

          <button
            type="button"
            onClick={() =>
              handleSectionNavigation("hospitals")
            }
          >
            Hospitals
          </button>

          <button
            type="button"
            onClick={() =>
              handleSectionNavigation("doctors")
            }
          >
            Doctors
          </button>

          <button
            type="button"
            onClick={() =>
              handleSectionNavigation("contact")
            }
          >
            Contact Us
          </button>

        </div>


        {/* =========================
            SPECIALITIES
        ========================= */}

        <div className="footer-column">

          <h3>Specialities</h3>

          <button
            type="button"
            onClick={handleSpecialities}
          >
            Cancer Treatment
          </button>

          <button
            type="button"
            onClick={handleSpecialities}
          >
            Neurosurgery
          </button>

          <button
            type="button"
            onClick={handleSpecialities}
          >
            Orthopedics
          </button>

          <button
            type="button"
            onClick={handleSpecialities}
          >
            Heart Treatment
          </button>

          <button
            type="button"
            onClick={handleSpecialities}
          >
            Spine Surgery
          </button>

          <button
            type="button"
            onClick={handleSpecialities}
          >
            Pediatric Heart Surgery
          </button>

        </div>


        {/* =========================
            PATIENT SUPPORT
        ========================= */}

        <div className="footer-column">

          <h3>Patient Support</h3>

          <button
            type="button"
            onClick={() =>
              handleSectionNavigation("contact")
            }
          >
            Visa Assistance
          </button>

          <button
            type="button"
            onClick={() =>
              handleSectionNavigation("contact")
            }
          >
            Get Cost Estimate
          </button>

          <button
            type="button"
            onClick={() =>
              handleSectionNavigation("faq")
            }
          >
            FAQs
          </button>

          <button
            type="button"
            onClick={handlePrivacyPolicy}
          >
            Privacy Policy
          </button>

          <button
            type="button"
            onClick={handleTerms}
          >
            Terms & Conditions
          </button>

        </div>

      </div>


      {/* =========================
          FOOTER BOTTOM
      ========================= */}

      <div className="footer-bottom">

        <p>
          © 2025{" "}
          <span>Uniheal Robust Pvt. Ltd.</span>{" "}
          All rights reserved.
        </p>

        <p>
          Designed by{" "}
          <a
            href="https://www.dgateis.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            DGATE INTEGRATED SERVICES
          </a>
        </p>

      </div>


      {/* =========================
          FLOATING WHATSAPP
      ========================= */}

      <button
        type="button"
        className="footer-whatsapp"
        onClick={handleWhatsApp}
        aria-label="WhatsApp"
      >
        <FaWhatsapp />
      </button>


      {/* =========================
          SCROLL TO TOP
      ========================= */}

      <button
        type="button"
        className="footer-scroll-top"
        onClick={handleScrollTop}
        aria-label="Scroll to top"
      >
        <FaArrowUp />
      </button>

    </footer>
  );
}

export default Footer;