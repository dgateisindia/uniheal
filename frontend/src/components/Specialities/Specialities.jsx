import { useEffect, useRef } from "react";

import {
  FaArrowRight,
  FaMicroscope,
  FaBone,
  FaHeartbeat,
  FaUserMd,
  FaBrain,
  FaHeart,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import "./Specialities.css";

import cancer from "../../assets/images/specialities/cancer.webp";
import jointReplacement from "../../assets/images/specialities/Joint-Replacement.webp";
import pediatricHeartSurgery from "../../assets/images/specialities/Pediatric-heart-surgery.webp";
import spineSurgery from "../../assets/images/specialities/Spine-surgery.webp";
import neurosurgery from "../../assets/images/specialities/Neurosurgery.webp";
import heartTreatment from "../../assets/images/specialities/heart-treatment.webp";

gsap.registerPlugin(ScrollTrigger);

function Specialities() {
  const pageRef = useRef(null);
  const navigate = useNavigate();

  /* =========================
     SCROLL TO TOP
  ========================= */

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);

  const specialities = [
    {
      title: "Cancer Treatment",
      description:
        "India is a global hub for cancer treatment for international patients, offering advanced options such as immunotherapy, targeted therapy, proton therapy, and bone marrow transplant.",
      image: cancer,
      icon: FaMicroscope,
    },
    {
      title: "Joint Replacement Surgery",
      description:
        "Advanced joint replacement procedures that restore mobility and eliminate chronic pain. Personalized care ensures faster recovery and long-lasting joint function.",
      image: jointReplacement,
      icon: FaBone,
    },
    {
      title: "Pediatric Heart Surgery",
      description:
        "Specialized heart surgeries for infants and children, performed by expert pediatric cardiac surgeons. Focused on safety, precision, and giving young hearts a healthy future.",
      image: pediatricHeartSurgery,
      icon: FaHeartbeat,
    },
    {
      title: "Spine Surgery",
      description:
        "Comprehensive spine treatments that address pain, nerve compression, and structural issues. Minimally invasive options ensure quicker recovery and improved mobility.",
      image: spineSurgery,
      icon: FaUserMd,
    },
    {
      title: "Neurosurgery",
      description:
        "Cutting-edge neurosurgical care for brain, spine, and nerve disorders. Expert surgeons use advanced technology for safe, precise, and life-enhancing outcomes.",
      image: neurosurgery,
      icon: FaBrain,
    },
    {
      title: "Heart Treatment",
      description:
        "Complete cardiac care ranging from diagnosis to advanced interventional procedures. Designed to improve heart health, prevent complications, and support long-term well-being.",
      image: heartTreatment,
      icon: FaHeart,
    },
  ];

  /* =========================
     GSAP ANIMATION
  ========================= */

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Header animation */

      gsap.from(".specialities-header", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      });

      /* Cards animation */

      gsap.from(".speciality-card", {
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",

        scrollTrigger: {
          trigger: ".specialities-grid",
          start: "top 80%",
          once: true,
        },
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  /* =========================
     MEDICAL OPINION
  ========================= */

  const handleMedicalOpinion = () => {
    navigate("/#contact");
  };

  return (
    <div
      className="specialities-page"
      ref={pageRef}
    >

      {/* =========================
          HEADER
      ========================= */}

      <Header />


      {/* =========================
          HERO
      ========================= */}

      <section className="specialities-hero">

        <div className="specialities-container">

          <div className="specialities-header">

            <h1>
              Specialities and Procedures
            </h1>

            <p>
              Experience seamless medical travel with our full-service
              patient care solutions. From your first medical query to your
              final follow-up, UniHeal ensures safety, reliability, and
              world-class treatment outcomes.
            </p>

            <button
              type="button"
              className="specialities-main-button"
              onClick={handleMedicalOpinion}
            >
              <span>
                Get Medical Opinion Now
              </span>

              <FaArrowRight />
            </button>

          </div>

        </div>

      </section>


      {/* =========================
          SPECIALITIES
      ========================= */}

      <section className="specialities-section">

        <div className="specialities-container">

          <div className="specialities-grid">

            {specialities.map((speciality) => {

              const Icon = speciality.icon;

              return (
                <article
                  className="speciality-card"
                  key={speciality.title}
                >

                  {/* IMAGE */}

                  <div className="speciality-image">

                    <img
                      src={speciality.image}
                      alt={speciality.title}
                    />

                    <div className="speciality-image-overlay">

                      <div className="speciality-hover-icon">
                        <Icon />
                      </div>

                    </div>

                  </div>


                  {/* CONTENT */}

                  <div className="speciality-content">

                    <h2>
                      {speciality.title}
                    </h2>

                    <p>
                      {speciality.description}
                    </p>

                  </div>

                </article>
              );
            })}

          </div>

        </div>

      </section>


      {/* =========================
          COMMON FOOTER
      ========================= */}

      <Footer />

    </div>
  );
}

export default Specialities;