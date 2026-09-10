import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./Trust.css";

import gdprLogo from "../../assets/images/trust/gdpr.jpg";
import jciLogo from "../../assets/images/trust/jci.png";
import nabhLogo from "../../assets/images/trust/nabh.png";

gsap.registerPlugin(ScrollTrigger);

function Trust() {
  const sectionRef = useRef(null);

  const trustItems = [
    {
      image: nabhLogo,
      title: "NABH",
      description: "Accredited Hospitals",
    },
    {
      image: jciLogo,
      title: "JCI",
      description: "Accredited Hospitals",
    },
    {
      image: gdprLogo,
      title: "GDPR",
      description: "Data Protection Compliance",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* =========================
         TITLE ANIMATION
      ========================= */

      gsap.from(".trust-title", {
        opacity: 0,
        y: 25,
        duration: 0.8,
        ease: "power3.out",

        scrollTrigger: {
          trigger: ".trust-section",
          start: "top 80%",
          once: true,
        },
      });


      /* =========================
         CARDS ANIMATION
      ========================= */

      gsap.from(".trust-card", {
        opacity: 0,
        y: 25,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",

        scrollTrigger: {
          trigger: ".trust-cards",
          start: "top 82%",
          once: true,
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="trust-section"
      ref={sectionRef}
    >
      <div className="trust-container">

        {/* Heading */}
        <h2 className="trust-title">
          Why Patients Trust Uniheal
        </h2>


        {/* Trust Cards */}
        <div className="trust-cards">

          {trustItems.map((item) => (
            <div
              className="trust-card"
              key={item.title}
            >

              {/* Logo */}
              <div className="trust-logo-wrapper">
                <img
                  src={item.image}
                  alt={item.title}
                  className="trust-logo"
                />
              </div>


              {/* Title */}
              <h3 className="trust-card-title">
                {item.title}
              </h3>


              {/* Description */}
              <p className="trust-card-description">
                {item.description}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Trust;