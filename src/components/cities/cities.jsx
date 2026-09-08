import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./Cities.css";

import bengaluruImage from "../../assets/images/cities/bengaluru.jpg";
import delhiImage from "../../assets/images/cities/delhi.jpg";
import mumbaiImage from "../../assets/images/cities/mumbai.jpg";
import hyderabadImage from "../../assets/images/cities/hyderabad.jpg";

gsap.registerPlugin(ScrollTrigger);

function Cities() {
  const sectionRef = useRef(null);

  const cities = [
    {
      name: "Bengaluru",
      image: bengaluruImage,
      description:
        "Bangalore blends world-class medical care with tech-driven precision for seamless healing.",
    },
    {
      name: "Delhi",
      image: delhiImage,
      description:
        "Delhi offers top-tier healthcare with advanced specialists at globally trusted hospitals.",
    },
    {
      name: "Mumbai",
      image: mumbaiImage,
      description:
        "Mumbai delivers cutting-edge medical expertise backed by premier multispecialty facilities.",
    },
    {
      name: "Hyderabad",
      image: hyderabadImage,
      description:
        "Hyderabad combines high-quality treatment with renowned healthcare innovation and affordability.",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cities-title", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cities-section",
          start: "top 80%",
          once: true,
        },
      });

      gsap.from(".cities-description", {
        opacity: 0,
        y: 20,
        duration: 0.7,
        delay: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cities-section",
          start: "top 80%",
          once: true,
        },
      });

      gsap.from(".city-card", {
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cities-grid",
          start: "top 82%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="cities-section"
      id="cities"
      ref={sectionRef}
    >
      <div className="cities-container">

        <h2 className="cities-title">
          India’s Most Preferred Cities for Medical Treatment
        </h2>

        <p className="cities-description">
          Discover India’s leading destinations for world-class healthcare.
          Each city offers advanced hospitals, expert specialists, and
          affordable treatment options.
        </p>

        <div className="cities-grid">
          {cities.map((city) => (
            <div className="city-card" key={city.name}>

              <div className="city-image-wrapper">
                <img
                  src={city.image}
                  alt={`${city.name} medical treatment destination`}
                  className="city-image"
                />
              </div>

              <h3 className="city-name">
                {city.name}
              </h3>

              <p className="city-description">
                {city.description}
              </p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Cities;