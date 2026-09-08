import { useEffect, useRef, useState } from "react";

import {
  FaArrowRight,
  FaChevronUp,
} from "react-icons/fa";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./Treatments.css";

import kneeReplacement from "../../assets/images/treatments/knee-replacement.png";
import cardiology from "../../assets/images/treatments/cardiology.png";
import neurosurgery from "../../assets/images/treatments/neurosurgery.png";
import ophthalmology from "../../assets/images/treatments/ophthalmology.png";
import heartBypass from "../../assets/images/treatments/heart-bypass.png";

import cancerTreatment from "../../assets/images/treatments/cancer-treatment.png";
import kidneyTreatment from "../../assets/images/treatments/kidney-treatment.png";
import ivfTreatment from "../../assets/images/treatments/ivf-treatment.png";
import roboticSurgery from "../../assets/images/treatments/robotic-surgery.png";
import spineSurgery from "../../assets/images/treatments/spine-surgery.png";

gsap.registerPlugin(ScrollTrigger);

function Treatments() {
  const sectionRef = useRef(null);
  const [showAll, setShowAll] = useState(false);

  const popularTreatments = [
    {
      name: "Knee Replacement",
      image: kneeReplacement,
    },
    {
      name: "Cardiology",
      image: cardiology,
    },
    {
      name: "Neurosurgery",
      image: neurosurgery,
    },
    {
      name: "Ophthalmology",
      image: ophthalmology,
    },
    {
      name: "Heart Bypass Surgery",
      image: heartBypass,
    },
  ];

  const additionalTreatments = [
    {
      name: "Cancer Treatment",
      image: cancerTreatment,
    },
    {
      name: "Kidney Treatment",
      image: kidneyTreatment,
    },
    {
      name: "IVF Treatment",
      image: ivfTreatment,
    },
    {
      name: "Robotic Surgery",
      image: roboticSurgery,
    },
    {
      name: "Spine Surgery",
      image: spineSurgery,
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

  const handleViewAll = () => {
    setShowAll((previous) => !previous);
  };

  return (
    <section
      className="treatments-section"
      id="treatments"
      ref={sectionRef}
    >
      <div className="treatments-container">

        <h2 className="treatments-title">
          Popular Treatments
        </h2>

        {/* FIRST FIVE + VIEW ALL */}
        {!showAll && (
          <div className="treatments-grid">

            {popularTreatments.map((treatment) => (
              <div
                className="treatment-card"
                key={treatment.name}
              >
                <div className="treatment-icon">
                  <img
                    src={treatment.image}
                    alt={treatment.name}
                  />
                </div>

                <h3>{treatment.name}</h3>
              </div>
            ))}

            <button
              type="button"
              className="view-all-card"
              onClick={handleViewAll}
            >
              <span>
                View All<br />
                Treatments
              </span>

              <FaArrowRight />
            </button>

          </div>
        )}

        {/* ALL TREATMENTS */}
        {showAll && (
          <>
            <div className="treatments-grid expanded-grid">

              {[
                ...popularTreatments,
                ...additionalTreatments,
              ].map((treatment) => (
                <div
                  className="treatment-card"
                  key={treatment.name}
                >
                  <div className="treatment-icon">
                    <img
                      src={treatment.image}
                      alt={treatment.name}
                    />
                  </div>

                  <h3>{treatment.name}</h3>
                </div>
              ))}

            </div>

            <button
              type="button"
              className="show-less-button"
              onClick={handleViewAll}
            >
              <span>Show Less</span>
              <FaChevronUp />
            </button>
          </>
        )}

      </div>
    </section>
  );
}

export default Treatments;