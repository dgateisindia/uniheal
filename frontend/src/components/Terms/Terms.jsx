import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import "./Terms.css";

gsap.registerPlugin(ScrollTrigger);

function Terms() {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* =========================
         HEADER ANIMATION
      ========================= */

      gsap.from(".terms-header", {
        opacity: 0,
        y: 25,
        duration: 0.8,
        ease: "power3.out",
      });

      /* =========================
         CONTENT ANIMATION
      ========================= */

      gsap.from(".terms-section", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".terms-content",
          start: "top 80%",
          once: true,
        },
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      className="terms-page"
      ref={pageRef}
    >
      {/* =========================
          HEADER
      ========================= */}

      <Header />


      {/* =========================
          TERMS HERO
      ========================= */}

      <section className="terms-hero">

        <div className="terms-container">

          <div className="terms-header">

            <h1>
              Terms of Use
            </h1>

            <p>
              Please review our service guidelines carefully
              before using Uniheal.
            </p>

          </div>

        </div>

      </section>


      {/* =========================
          TERMS CONTENT
      ========================= */}

      <main className="terms-content">

        <div className="terms-container">


          {/* =========================
              SECTION 1
          ========================= */}

          <section className="terms-section">

            <h2>
              1. Introduction
            </h2>

            <p>
              At Uniheal, we strive to offer users an excellent
              browsing and service experience. These Terms of Use
              establish the guidelines under which you may access
              and use our services. By agreeing to these terms, you
              confirm that you are at least 18 years old and that
              you fully understand and accept the conditions stated
              herein.
            </p>

          </section>


          {/* =========================
              SECTION 2
          ========================= */}

          <section className="terms-section">

            <h2>
              2. Important Notice
            </h2>

            <p>
              Uniheal is not a hospital, medical institution, or
              healthcare provider. We serve as an online healthcare
              information platform aimed at helping patients
              understand their treatment options.
            </p>

            <ul className="terms-list">

              <li>
                You acknowledge that all interactions with
                hospitals or doctors listed on our website are
                solely your responsibility.
              </li>

              <li>
                Uniheal is not liable for medical outcomes,
                service-related issues, or miscommunications with
                any healthcare provider.
              </li>

              <li>
                We do not provide medical advice, diagnoses, or
                treatment recommendations.
              </li>

              <li>
                If you choose to proceed with any hospital or
                doctor, you do so entirely at your own risk.
              </li>

            </ul>

          </section>


          {/* =========================
              SECTION 3
          ========================= */}

          <section className="terms-section">

            <h2>
              3. General Terms &amp; Conditions
            </h2>

            <p>
              Uniheal acts as an intermediary to facilitate
              communication between users and healthcare providers.
              Service fees may apply depending on the services used.
              All disputes between the user and the healthcare
              provider must be resolved independently, without
              involving Uniheal.
            </p>

            <p>
              All content on this website—including images, text,
              videos, and other materials—may not be copied,
              modified, shared, or used for commercial purposes
              without permission.
            </p>

            <p>
              The content provided through blogs, chats, emails,
              calls, or video consultations is strictly informational
              and should not be considered a substitute for
              professional medical advice.
            </p>

            <p>
              You must always consult a qualified doctor for medical
              concerns. Uniheal is not responsible for actions taken
              based on information provided on our platform.
            </p>

          </section>


          {/* =========================
              SECTION 4
          ========================= */}

          <section className="terms-section">

            <h2>
              4. Intellectual Property Rights
            </h2>

            <p>
              All content on the Uniheal website is owned by
              Uniheal, its partners, or third-party contributors.
              Unauthorized use or reproduction is strictly
              prohibited.
            </p>

          </section>


          {/* =========================
              SECTION 5
          ========================= */}

          <section className="terms-section">

            <h2>
              5. Disputes, Law &amp; Venue
            </h2>

            <p>
              By using this website, you agree to abide by these
              Terms of Use. Any legal action must be initiated
              within one year from the date an issue occurs.
            </p>

          </section>


          {/* =========================
              SECTION 6
          ========================= */}

          <section className="terms-section">

            <h2>
              6. Restrictions on Liability
            </h2>

            <p>
              Uniheal is not responsible for any damages arising
              from the use of our website or services. If you are
              dissatisfied with the platform, your sole remedy is
              to discontinue using it.
            </p>

            <p>
              Neither Uniheal nor its affiliates shall be liable
              for incidental, indirect, or consequential damages
              of any kind.
            </p>

          </section>


          {/* =========================
              SECTION 7
          ========================= */}

          <section className="terms-section">

            <h2>
              7. Indemnification
            </h2>

            <p>
              You agree to defend and indemnify Uniheal and its
              team against any claims, losses, damages, or legal
              fees arising from your misuse of the website or
              violation of these terms.
            </p>

          </section>


          {/* =========================
              SECTION 8
          ========================= */}

          <section className="terms-section">

            <h2>
              8. No Warranty
            </h2>

            <p>
              Uniheal does not endorse any doctor, surgeon,
              hospital, or healthcare provider listed on the
              website. We do not guarantee the quality, accuracy,
              or reliability of any medical service provider.
            </p>

            <p>
              You must conduct your own research before choosing
              a doctor or hospital. Uniheal is not liable for any
              shortcomings, service issues, or misrepresentations
              by healthcare providers.
            </p>

            <p>
              If you have questions about these Terms of Use,
              please contact us at{" "}

              <a
                href="mailto:info@unihealhealth.com"
              >
                info@unihealhealth.com
              </a>
              .
            </p>

          </section>

        </div>

      </main>


      {/* =========================
          FOOTER
      ========================= */}

      <Footer />

    </div>
  );
}

export default Terms;