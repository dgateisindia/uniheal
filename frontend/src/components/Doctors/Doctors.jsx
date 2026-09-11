import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./Doctors.css";

import ajayImage from "../../assets/images/doctors/Ajay.webp";
import anthonyImage from "../../assets/images/doctors/Anthony.webp";
import girishImage from "../../assets/images/doctors/Girish.webp";
import mansiImage from "../../assets/images/doctors/Mansi.webp";
import meetImage from "../../assets/images/doctors/Meet.webp";
import mohanImage from "../../assets/images/doctors/Mohan.webp";
import pragnyaImage from "../../assets/images/doctors/Pragnya.webp";
import venkateshImage from "../../assets/images/doctors/Venkatesh.jpg";

gsap.registerPlugin(ScrollTrigger);

function Doctors() {
  const sectionRef = useRef(null);

  const doctors = [
    {
      name: "Dr. Anthony Pais",
      specialization: "Surgical Oncologist",
      experience: "35+ years of Experience",
      image: anthonyImage,
    },
    {
      name: "Dr. Girish S. Shetkar",
      specialization: "Head & Neck Oncologist",
      experience: "13+ years of Experience",
      image: girishImage,
    },
    {
      name: "Dr Ajay Rao",
      specialization: "Director of Urologist",
      experience: "31+ years of Experience",
      image: ajayImage,
    },
    {
      name: "Dr. Mohan Keshavamurthy",
      specialization: "Urologist and Transplant Surgeon",
      experience: "16+ years of Experience",
      image: mohanImage,
    },
    {
      name: "Dr. Mansi Khanderia",
      specialization: "Medical Oncologist",
      experience: "10+ years of Experience",
      image: mansiImage,
    },
    {
      name: "Dr. Meet Kumar",
      specialization:
        "Hematologist and Bone Marrow Transplant Specialist",
      experience: "20+ years of Experience",
      image: meetImage,
    },
    {
      name: "Dr. Pragnya Coca",
      specialization: "Medical Oncologist",
      experience: "10+ years of Experience",
      image: pragnyaImage,
    },
    {
      name: "Dr S. Venkatesh",
      specialization: "Cardiologist",
      experience: "31+ years of Experience",
      image: venkateshImage,
    },
  ];

  /*
    ==========================================================
    SCROLL TO CONTACT SECTION
    ==========================================================
  */

  const handleContactNavigation = () => {
    const section = document.getElementById("contact");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".doctors-title", {
        opacity: 0,
        y: 25,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".doctors-section",
          start: "top 80%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="doctors-section"
      id="doctors"
      ref={sectionRef}
    >
      <div className="doctors-container">

        <h2 className="doctors-title">
          Top Doctors In India
        </h2>

        <div className="doctors-grid">

          {doctors.map((doctor) => (

            <div
              className="doctor-card"
              key={doctor.name}
            >

              <div className="doctor-image-wrapper">

                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="doctor-image"
                />

              </div>


              <div className="doctor-details">

                <h3 className="doctor-name">
                  {doctor.name}
                </h3>


                <p className="doctor-specialization">
                  {doctor.specialization}
                </p>


                <p className="doctor-experience">
                  {doctor.experience}
                </p>


                {/* ==========================================
                    GET IN TOUCH BUTTON
                    ========================================== */}

                <button
                  type="button"
                  className="doctor-contact"
                  onClick={handleContactNavigation}
                >
                  Get In Touch
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default Doctors;