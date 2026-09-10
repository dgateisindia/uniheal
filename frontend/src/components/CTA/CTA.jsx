import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./CTA.css";

gsap.registerPlugin(ScrollTrigger);

function CTA() {
  const sectionRef = useRef(null);

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

            <button
              type="button"
              className="cta-button"
            >
              Get Free Medical Opinion
            </button>

            <button
              type="button"
              className="cta-button"
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