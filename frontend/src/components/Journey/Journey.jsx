import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./Journey.css";

import journey1 from "../../assets/images/journey/journey-1.png";
import journey2 from "../../assets/images/journey/journey-2 (1).png";
import journey3 from "../../assets/images/journey/journey-3 (2).png";
import journey4 from "../../assets/images/journey/journey-4.png";
import journey5 from "../../assets/images/journey/journey-5.png";
import journey6 from "../../assets/images/journey/journey-6.png";
import journey7 from "../../assets/images/journey/journey-7 (1).png";
import journey8 from "../../assets/images/journey/journey-8.png";

gsap.registerPlugin(ScrollTrigger);

function Journey() {
  const sectionRef = useRef(null);

  const journeySteps = [
    {
      number: "01",
      title: (
        <>
          Share Your
          <br />
          Requirement
        </>
      ),
      image: journey1,
    },
    {
      number: "02",
      title: (
        <>
          Upload Medical
          <br />
          Reports
        </>
      ),
      image: journey2,
    },
    {
      number: "03",
      title: (
        <>
          Expert Medical
          <br />
          Review
        </>
      ),
      image: journey3,
    },
    {
      number: "04",
      title: (
        <>
          Receive Best
          <br />
          Options
        </>
      ),
      image: journey4,
    },
    {
      number: "05",
      title: (
        <>
          Get Cost
          <br />
          Estimate
        </>
      ),
      image: journey5,
    },
    {
      number: "06",
      title: (
        <>
          Plan Your
          <br />
          Trip
        </>
      ),
      image: journey6,
    },
    {
      number: "07",
      title: (
        <>
          Get Treated with
          <br />
          Care
        </>
      ),
      image: journey7,
    },
    {
      number: "08",
      title: (
        <>
          Follow-up &
          <br />
          Support
        </>
      ),
      image: journey8,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Title animation */
      gsap.from(".journey-title", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".journey-section",
          start: "top 80%",
          once: true,
        },
      });

      /* Steps animation */
      gsap.from(".journey-step", {
        opacity: 0,
        y: 15,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".journey-track",
          start: "top 82%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="journey-section"
      ref={sectionRef}
    >
      <div className="journey-container">

        {/* Section Heading */}
        <h2 className="journey-title">
          Your Journey With UniHeal
        </h2>

        {/* Horizontal Scroll Area */}
        <div className="journey-scroll">

          <div className="journey-track">

            {/* Connecting Line */}
            <div className="journey-line"></div>

            {/* Journey Steps */}
            {journeySteps.map((step) => (
              <div
                className="journey-step"
                key={step.number}
              >
                {/* Icon */}
                <div className="journey-icon">
                  <img
                    src={step.image}
                    alt={step.number}
                  />
                </div>

                {/* Number */}
                <div className="journey-number">
                  {step.number}
                </div>

                {/* Title */}
                <h3 className="journey-step-title">
                  {step.title}
                </h3>
              </div>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}

export default Journey;