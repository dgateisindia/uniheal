import { useEffect, useRef } from "react";

import { FaArrowRight } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./Treatments.css";

import kneeReplacement from "../../assets/images/treatments/knee-replacement.png";
import cardiology from "../../assets/images/treatments/cardiology.png";
import neurosurgery from "../../assets/images/treatments/neurosurgery.png";
import ophthalmology from "../../assets/images/treatments/ophthalmology.png";
import heartBypass from "../../assets/images/treatments/heart-bypass.png";

gsap.registerPlugin(ScrollTrigger);

function Treatments() {
  const sectionRef = useRef(null);

  const navigate = useNavigate();

  const popularTreatments = [
    {
      name: "Knee Replacement",
      image: kneeReplacement,
      alt: "Knee replacement treatment in India",
    },
    {
      name: "Cardiology",
      image: cardiology,
      alt: "Cardiology treatment and care in India",
    },
    {
      name: "Neurosurgery",
      image: neurosurgery,
      alt: "Neurosurgery treatment in India",
    },
    {
      name: "Ophthalmology",
      image: ophthalmology,
      alt: "Ophthalmology treatment in India",
    },
    {
      name: "Heart Bypass Surgery",
      image: heartBypass,
      alt: "Heart bypass surgery in India",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".treatments-title", {
        opacity: 0,
        y: 25,
        duration: 0.8,
        ease: "power3.out",

        scrollTrigger: {
          trigger: ".treatments-section",
          start: "top 80%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSpecialities = () => {
    navigate("/specialities");
  };

  return (
    <section
      className="treatments-section"
      id="treatments"
      ref={sectionRef}
    >
      <div className="treatments-container">

        {/* SECTION TITLE */}
        <h2 className="treatments-title">
          Popular Medical Treatments in India
        </h2>

        {/* TREATMENTS GRID */}
        <div className="treatments-grid">

          {popularTreatments.map((treatment) => (
            <div
              className="treatment-card"
              key={treatment.name}
            >
              <div className="treatment-icon">
                <img
                  src={treatment.image}
                  alt={treatment.alt}
                />
              </div>

              <h3>{treatment.name}</h3>
            </div>
          ))}

          {/* VIEW ALL TREATMENTS */}
          <button
            type="button"
            className="view-all-card"
            onClick={handleSpecialities}
          >
            <span>
              View All
              <br />
              Treatments
            </span>

            <FaArrowRight />
          </button>

        </div>

      </div>
    </section>
  );
}

export default Treatments;