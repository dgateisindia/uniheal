import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./Testimonials.css";

gsap.registerPlugin(ScrollTrigger);

function Testimonials() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      text: `"UniHeal made my entire medical trip extremely smooth. From doctor appointments to travel help, everything was perfectly handled."`,
      name: "Sarah, Kenya",
    },
    {
      text: `"I received excellent medical care in India thanks to UniHeal's professional support and guidance."`,
      name: "Maria, Nigeria",
    },
    {
      text: `"The hospital suggested was world-class and the cost was much lower than in the UAE. Highly recommended!"`,
      name: "Sara, UAE",
    },
    {
      text: `"Uniheal made my medical journey so smooth. From hospital selection to travel and stay, everything was perfectly arranged."`,
      name: "Daniel Mwangi, Kenya",
    },
    {
      text: `"The doctors were excellent and the care was world-class. Thank you Uniheal for your amazing support."`,
      name: "Ahmed Hassan, UAE",
    },
    {
      text: `"I got the best cancer treatment in India at an affordable cost. Uniheal team was with me in every step."`,
      name: "Chinedu Okafor, Nigeria",
    },
    {
      text: `"Very professional team and quick response. I highly recommend Uniheal for anyone looking for treatment in India."`,
      name: "Joseph Mushi, Tanzania",
    },
  ];

  // --------------------------------
  // SECTION SCROLL ANIMATION
  // --------------------------------
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".testimonials-title", {
        opacity: 0,
        y: 25,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".testimonials-section",
          start: "top 80%",
          once: true,
        },
      });

      gsap.from(".testimonials-content", {
        opacity: 0,
        y: 25,
        duration: 0.8,
        delay: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".testimonials-content",
          start: "top 85%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // --------------------------------
  // TESTIMONIAL CHANGE ANIMATION
  // --------------------------------
  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      {
        opacity: 0,
        x: 30,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.45,
        ease: "power2.out",
      }
    );
  }, [currentIndex]);

  // --------------------------------
  // NEXT
  // --------------------------------
  const nextTestimonial = () => {
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  // --------------------------------
  // PREVIOUS
  // --------------------------------
  const previousTestimonial = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  // --------------------------------
  // AUTO SLIDE
  // --------------------------------
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section
      className="testimonials-section"
      ref={sectionRef}
    >
      <div className="testimonials-container">

        {/* TITLE */}
        <h2 className="testimonials-title">
          What Our Patients Say
        </h2>

        {/* DECORATIVE LINE */}
        <div className="testimonials-title-line">
          <span></span>
          <span className="active"></span>
          <span></span>
        </div>

        {/* CONTENT */}
        <div className="testimonials-content">

          {/* TESTIMONIAL CARD */}
          <div
            className="testimonial-card"
            ref={cardRef}
          >
            <p className="testimonial-text">
              {testimonials[currentIndex].text}
            </p>

            <p className="testimonial-name">
              — {testimonials[currentIndex].name}
            </p>
          </div>

          {/* ARROWS */}
          <div className="testimonial-arrows">

            <button
              type="button"
              className="testimonial-arrow"
              onClick={previousTestimonial}
              aria-label="Previous testimonial"
            >
              ❮
            </button>

            <button
              type="button"
              className="testimonial-arrow"
              onClick={nextTestimonial}
              aria-label="Next testimonial"
            >
              ❯
            </button>

          </div>

          {/* DOTS */}
          <div className="testimonial-dots">

            {testimonials.map((_, index) => (
              <button
                type="button"
                key={index}
                className={`testimonial-dot ${
                  currentIndex === index ? "active" : ""
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}

          </div>

        </div>
      </div>
    </section>
  );
}

export default Testimonials;