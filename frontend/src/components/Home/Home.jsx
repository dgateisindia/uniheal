import { useEffect, useRef } from "react";

import {
  FaCheckCircle,
  FaFileAlt,
  FaUserMd,
  FaShieldAlt,
} from "react-icons/fa";

import gsap from "gsap";

import "./Home.css";

import heroImage from "../../assets/images/home/hero-image.jpeg";
import heroBackground from "../../assets/images/home/hero-background.webp";


function Home() {

  const sectionRef = useRef(null);

  const circleOneRef = useRef(null);
  const circleTwoRef = useRef(null);
  const circleThreeRef = useRef(null);

  const counterRefs = useRef([]);


  /* ==========================================================
     SCROLL TO CONTACT SECTION
     ========================================================== */

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

      /* ======================================================
         DECORATIVE CIRCLE ANIMATION
         ====================================================== */

      gsap.to(circleOneRef.current, {
        x: 25,
        y: -20,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });


      gsap.to(circleTwoRef.current, {
        x: -20,
        y: 25,
        duration: 5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });


      gsap.to(circleThreeRef.current, {
        x: 15,
        y: 15,
        duration: 4.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });


      /* ======================================================
         HERO CONTENT ANIMATION
         ====================================================== */

      gsap.from(".home-content > *", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.12,
        ease: "power2.out",
      });


      gsap.from(".home-image-frame", {
        opacity: 0,
        x: 50,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
      });


      /* ======================================================
         STATISTICS COUNTER
         ====================================================== */

      counterRefs.current.forEach((counter) => {

        if (!counter) return;

        const target = Number(counter.dataset.target);

        const counterObject = {
          value: 0,
        };


        gsap.to(counterObject, {

          value: target,

          duration: 2,

          delay: 0.5,

          ease: "power2.out",

          onUpdate: () => {

            counter.textContent =
              `${Math.floor(counterObject.value)}+`;

          },

        });

      });

    }, sectionRef);


    return () => ctx.revert();

  }, []);


  return (

    <section
      className="home-section"
      id="home"
      ref={sectionRef}
    >

      {/* =====================================================
          BACKGROUND IMAGE
          ===================================================== */}

      <div
        className="home-background"
        style={{
          backgroundImage: `url(${heroBackground})`,
        }}
      ></div>


      <div className="home-background-overlay"></div>


      <div className="home-container">


        {/* ===================================================
            LEFT CONTENT
            =================================================== */}

        <div className="home-content">


          {/* TRUSTED BADGE */}

          <div className="home-badge">

            <span className="badge-icon">
              <FaCheckCircle />
            </span>

            <span>
              India's Trusted Medical Tourism Partner
            </span>

          </div>


          {/* MAIN HEADING */}

          <h1 className="home-title">

            Find the Right

            <br />

            Hospital &amp; Doctor in

            <br />

            India

          </h1>


          {/* DESCRIPTION */}

          <p className="home-description">

            Get expert medical opinion, compare treatment options
            and receive a personalized cost estimate - all for free.

          </p>


          {/* =================================================
              FEATURES
              ================================================= */}

          <div className="home-features">


            <div className="home-feature">

              <FaFileAlt />

              <span>
                Upload Reports
              </span>

            </div>


            <div className="home-feature">

              <FaUserMd />

              <span>
                Get Expert Review
              </span>

            </div>


            <div className="home-feature">

              <FaShieldAlt />

              <span>
                Receive Best Options
              </span>

            </div>


          </div>


          {/* =================================================
              STATISTICS
              ================================================= */}

          <div className="home-stats">


            <div className="home-stat">

              <strong
                ref={(element) => {
                  counterRefs.current[0] = element;
                }}
                data-target="45"
              >
                0+
              </strong>

              <span>
                Accredited Hospitals
              </span>

            </div>


            <div className="home-stat">

              <strong
                ref={(element) => {
                  counterRefs.current[1] = element;
                }}
                data-target="2000"
              >
                0+
              </strong>

              <span>
                Expert Doctors
              </span>

            </div>


            <div className="home-stat">

              <strong
                ref={(element) => {
                  counterRefs.current[2] = element;
                }}
                data-target="20"
              >
                0+
              </strong>

              <span>
                Specialties
              </span>

            </div>


            <div className="home-stat">

              <strong
                ref={(element) => {
                  counterRefs.current[3] = element;
                }}
                data-target="50"
              >
                0+
              </strong>

              <span>
                Countries Served
              </span>

            </div>


          </div>


          {/* =================================================
              CTA BUTTONS
              ================================================= */}

          <div className="home-cta">


            {/* GET FREE MEDICAL OPINION */}

            <button
              type="button"
              className="home-cta-primary"
              onClick={handleContactNavigation}
            >
              Get Free Medical Opinion
            </button>


            {/* GET TREATMENT COST */}

            <button
              type="button"
              className="home-cta-secondary"
              onClick={handleContactNavigation}
            >
              Get Treatment Cost
            </button>


          </div>


        </div>


        {/* ===================================================
            RIGHT IMAGE
            =================================================== */}

        <div className="home-image-area">


          {/* ANIMATED CIRCLE 1 */}

          <div
            className="home-circle home-circle-one"
            ref={circleOneRef}
          ></div>


          {/* ANIMATED CIRCLE 2 */}

          <div
            className="home-circle home-circle-two"
            ref={circleTwoRef}
          ></div>


          {/* ANIMATED CIRCLE 3 */}

          <div
            className="home-circle home-circle-three"
            ref={circleThreeRef}
          ></div>


          {/* DOCTOR + PATIENT IMAGE */}

          <div className="home-image-frame">

            <img
              src={heroImage}
              alt="Doctor consulting with patient"
              className="home-image"
            />

          </div>


        </div>


      </div>

    </section>

  );
}


export default Home;