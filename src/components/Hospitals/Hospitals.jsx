import { useEffect, useRef } from "react";
import { FaStar } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./Hospitals.css";

// Hospital images
import apolloImage from "../../assets/images/hospitals/apollo.jpg";
import fortisImage from "../../assets/images/hospitals/Fortis.jpg";
import medantaImage from "../../assets/images/hospitals/Medanta.jpg";
import kokilabenImage from "../../assets/images/hospitals/Kokilaben.jpg";

// Hospital logos
import sparshLogo from "../../assets/images/hospital-logos/sparsh.webp";
import apolloLogo from "../../assets/images/hospital-logos/apollo.webp";
import asterLogo from "../../assets/images/hospital-logos/aster.webp";
import fortisLogo from "../../assets/images/hospital-logos/fortis.webp";
import kauveryLogo from "../../assets/images/hospital-logos/kauvery.webp";
import manipalLogo from "../../assets/images/hospital-logos/manipal.webp";
import marengoLogo from "../../assets/images/hospital-logos/marengo.webp";
import shalbyLogo from "../../assets/images/hospital-logos/shalby.webp";

gsap.registerPlugin(ScrollTrigger);

function Hospitals() {
  const sectionRef = useRef(null);

  const hospitals = [
    {
      name: "Apollo Hospitals",
      city: "Chennai",
      rating: "4.7",
      accreditation: "JCI, NABH Accredited",
      image: apolloImage,
    },
    {
      name: "Fortis Escorts Heart Institute",
      city: "Delhi",
      rating: "4.8",
      accreditation: "JCI, NABH Accredited",
      image: fortisImage,
    },
    {
      name: "Medanta - The Medicity",
      city: "Gurugram",
      rating: "4.6",
      accreditation: "JCI, NABH Accredited",
      image: medantaImage,
    },
    {
      name: "Kokilaben Dhirubhai Ambani Hospital",
      city: "Mumbai",
      rating: "4.6",
      accreditation: "NABH Accredited",
      image: kokilabenImage,
    },
  ];

  const hospitalLogos = [
    {
      name: "Sparsh Hospital",
      image: sparshLogo,
    },
    {
      name: "Apollo Hospitals",
      image: apolloLogo,
    },
    {
      name: "Aster",
      image: asterLogo,
    },
    {
      name: "Fortis",
      image: fortisLogo,
    },
    {
      name: "Kauvery Hospital",
      image: kauveryLogo,
    },
    {
      name: "Manipal Hospitals",
      image: manipalLogo,
    },
    {
      name: "Marengo Asia Hospitals",
      image: marengoLogo,
    },
    {
      name: "Shalby Multi-Specialty Hospitals",
      image: shalbyLogo,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Only animate the section title
      gsap.from(".hospitals-title", {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".hospitals-section",
          start: "top 80%",
          once: true,
        },
      });

      // Assistance card animation
      gsap.from(".hospital-assistance", {
        opacity: 0,
        x: 20,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".hospital-assistance",
          start: "top 85%",
          once: true,
        },
      });

      // Marquee entrance animation
      gsap.from(".hospital-marquee", {
        opacity: 0,
        y: 15,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".hospital-marquee",
          start: "top 90%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="hospitals-section"
      id="hospitals"
      ref={sectionRef}
    >

      <div className="hospitals-container">

        <div className="hospitals-header">
          <h2 className="hospitals-title">
            Top Hospitals in India
          </h2>
        </div>


        <div className="hospitals-content">

          <div className="hospitals-scroll">

            <div className="hospitals-grid">

              {hospitals.map((hospital) => (
                <div
                  className="hospital-card"
                  key={hospital.name}
                >

                  <div className="hospital-image-wrapper">
                    <img
                      src={hospital.image}
                      alt={hospital.name}
                      className="hospital-image"
                    />
                  </div>


                  <div className="hospital-details">

                    <div className="hospital-name-row">

                      <h3 className="hospital-name">
                        {hospital.name}
                      </h3>

                      <span className="hospital-rating">
                        {hospital.rating}
                        <FaStar />
                      </span>

                    </div>


                    <p className="hospital-city">
                      {hospital.city}
                    </p>


                    <p className="hospital-accreditation">
                      {hospital.accreditation}
                    </p>

                  </div>

                </div>
              ))}

            </div>

          </div>

          <div className="hospital-assistance">

            <h3>
              Can’t find the right
              <br />
              hospital?
            </h3>

            <p>
              We will help you find the best hospital
              based on your treatment and medical
              condition.
            </p>

            <button
              type="button"
              className="assistance-button"
            >
              Get Free Assistance
            </button>

          </div>

        </div>

      </div>

      <div className="hospital-marquee">

        <div className="hospital-marquee-track">

          <div className="hospital-logo-set">

            {hospitalLogos.map((logo) => (
              <div
                className="hospital-logo-item"
                key={`first-${logo.name}`}
              >
                <img
                  src={logo.image}
                  alt={logo.name}
                />
              </div>
            ))}

          </div>


          <div
            className="hospital-logo-set"
            aria-hidden="true"
          >

            {hospitalLogos.map((logo) => (
              <div
                className="hospital-logo-item"
                key={`second-${logo.name}`}
              >
                <img
                  src={logo.image}
                  alt=""
                />
              </div>
            ))}

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hospitals;