import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./CTA.css";

gsap.registerPlugin(ScrollTrigger);

function CTA() {
  const sectionRef = useRef(null);

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


  /*
    ==========================================================
    OPEN WHATSAPP
    ==========================================================
  */

  const handleWhatsApp = () => {
    window.open(
      "https://wa.me/919538564300",
      "_blank",
      "noopener,noreferrer"
    );
  };


  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.from(".cta-content", {
        opacity: 0,
        y: 25,
        duration: 0.8,
        ease: "power3.out",

        scrollTrigger: {
          trigger: ".cta-section",
          start: "top 82%",
          once: true,
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);


  return (
    <section
      className="cta-section"
      id="cta"
      ref={sectionRef}
    >

      <div className="cta-container">

        <div className="cta-content">

          <h2 className="cta-title">
            Ready to Begin Your Healing Journey in India?
          </h2>


          <p className="cta-description">
            Our medical experts are here to help you 24*7
          </p>


          <div className="cta-buttons">

            {/* ==========================================
                GET FREE MEDICAL OPINION
                → CONTACT SECTION
                ========================================== */}

            <button
              type="button"
              className="cta-button"
              onClick={handleContactNavigation}
            >
              Get Free Medical Opinion
            </button>


            {/* ==========================================
                CALL / WHATSAPP NOW
                → WHATSAPP
                ========================================== */}

            <button
              type="button"
              className="cta-button"
              onClick={handleWhatsApp}
            >
              Call / WhatsApp Now
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}

export default CTA;