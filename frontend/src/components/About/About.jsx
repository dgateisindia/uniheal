import { useEffect, useRef } from "react";

import { FaArrowRight } from "react-icons/fa";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./About.css";

import aboutImage from "../../assets/images/about/about-image.png";

gsap.registerPlugin(ScrollTrigger);

function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left content animation
      gsap.from(".about-content", {
        opacity: 0,
        x: -40,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-section",
          start: "top 75%",
        },
      });

      // Image animation
      gsap.from(".about-image-card", {
        opacity: 0,
        x: 40,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-section",
          start: "top 75%",
        },
      });

      // 45+ card animation
      gsap.from(".about-hospital-card", {
        opacity: 0,
        y: 25,
        duration: 0.8,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".about-section",
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMedicalOpinion = () => {
    const contactSection = document.getElementById("contact");

    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section
      className="about-section"
      id="about"
      ref={sectionRef}
    >
      <div className="about-container">

        {/* LEFT CONTENT */}
        <div className="about-content">

          <h2 className="about-title">
              About UniHeal
            </h2>

         <p className="about-description">
              UniHeal helps international patients explore medical treatment options
              in India by connecting them with hospitals, doctors, and healthcare
              services. We provide support with medical opinion requests, treatment
              planning, hospital selection, cost comparisons, and other aspects of
              planning healthcare in India. Through our network of hospitals and
              specialists across India, UniHeal aims to make the process of finding
              suitable medical care clear, convenient, and easier for international
              patients.
          </p>

          <button
            className="about-button"
            onClick={handleMedicalOpinion}
          >
            <span>Get Medical Opinion Now</span>

            <FaArrowRight className="about-button-icon" />
          </button>

        </div>

        {/* RIGHT IMAGE */}
        <div className="about-visual">

          <div className="about-image-card">
           <img
              src={aboutImage}
              alt="UniHeal healthcare support for international patients in India"
              className="about-image"
            />
          </div>

          {/* 45+ CARD */}
          <div className="about-hospital-card">

            <strong>45+</strong>

            <span>
              Accredited Hospitals
            </span>

          </div>

        </div>

      </div>
    </section>
  );
}

export default About;