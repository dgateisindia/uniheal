import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import "./PrivacyPolicy.css";

gsap.registerPlugin(ScrollTrigger);

function PrivacyPolicy() {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* =========================
         HEADER ANIMATION
      ========================= */

      gsap.from(".privacy-header", {
        opacity: 0,
        y: 25,
        duration: 0.8,
        ease: "power3.out",
      });

      /* =========================
         CONTENT ANIMATION
      ========================= */

      gsap.from(".privacy-section", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".privacy-content",
          start: "top 80%",
          once: true,
        },
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      className="privacy-page"
      ref={pageRef}
    >
      {/* =========================
          HEADER
      ========================= */}

      <Header />


      {/* =========================
          PRIVACY HERO
      ========================= */}

      <section className="privacy-hero">

        <div className="privacy-container">

          <div className="privacy-header">

            <h1>
              Privacy Policy
            </h1>

            <p>
              Learn how Uniheal collects, uses, and protects
              your personal information.
            </p>

          </div>

        </div>

      </section>


      {/* =========================
          PRIVACY CONTENT
      ========================= */}

      <main className="privacy-content">

        <div className="privacy-container">


          {/* =========================
              SECTION 1
          ========================= */}

          <section className="privacy-section">

            <h2>
              1. Your Privacy Is Our Priority
            </h2>

            <p>
              Uniheal is committed to helping patients find the
              right doctors and treatment options. While connecting
              with us, you may share personal information that we
              collect for service processing. We take your data
              privacy seriously and safeguard all information you
              provide.
            </p>

            <p>
              We maintain strict security procedures to prevent
              unauthorized access, misuse, or disclosure of your
              data. This Privacy Policy outlines how we collect,
              store, handle, and protect your information. In the
              unlikely event of a data breach or unauthorized
              attempt to access or sell data, Uniheal will take
              immediate action to protect your privacy and reduce
              any associated risks.
            </p>

          </section>


          {/* =========================
              SECTION 2
          ========================= */}

          <section className="privacy-section">

            <h2>
              2. Basics of Our Privacy Policy
            </h2>

            <p>
              This Privacy Policy applies only to services
              directly provided by Uniheal. Our partners,
              associated services, or third-party tools may have
              their own data handling practices, which may differ
              from ours.
            </p>

            <p>
              By using Uniheal services, you acknowledge that you
              have read and understood this Privacy Policy and give
              us permission to collect and use your information as
              outlined. If you disagree with our practices, you are
              not permitted to use our services. If you use our
              services on behalf of someone else, you confirm that
              you have authorization to accept this Privacy Policy
              on their behalf.
            </p>

          </section>


          {/* =========================
              SECTION 3
          ========================= */}

          <section className="privacy-section">

            <h2>
              3. Use of Your Personal Information
            </h2>

            <p>
              To provide effective assistance, Uniheal may collect
              information voluntarily shared by you, including
              personal and medical records. Our team reviews all
              information before sharing it with selected doctors,
              surgeons, or hospitals.
            </p>


            {/* BULLET POINTS */}

            <ul className="privacy-list">

              <li>
                We may collect your name, phone number, email
                address, IP address, browser details, and country.
              </li>

              <li>
                Your data may be stored in our website database
                and trusted third-party tools used for newsletters
                or communication campaigns.
              </li>

              <li>
                Embedded content such as videos and images from
                third-party sites may track your interactions
                according to their own privacy policies.
              </li>

            </ul>


            {/* NORMAL PARAGRAPH */}

            <p>
              While we prioritize data security, no system is
              completely immune to breaches. In case of any
              unauthorized access or exposure, we are committed
              to responding immediately, notifying affected
              users, and taking preventive measures to avoid
              future incidents.
            </p>

          </section>


          {/* =========================
              SECTION 4
          ========================= */}

          <section className="privacy-section">

            <h2>
              4. Cookie Policy
            </h2>

            <p>
              We use Google Analytics to collect visitor data
              through cookies. Our website may also store cookies
              related to login details and display preferences,
              which are deleted after your session ends.
            </p>

          </section>


          {/* =========================
              SECTION 5
          ========================= */}

          <section className="privacy-section">

            <h2>
              5. Protection of Children’s Information
            </h2>

            <p>
              Uniheal services are not designed for children. We
              do not knowingly collect information from anyone
              under the age of 13. By using this website, you
              confirm that you are at least 13 years old.
            </p>

          </section>


          {/* =========================
              SECTION 6
          ========================= */}

          <section className="privacy-section">

            <h2>
              6. General Information
            </h2>

            <p>
              Uniheal connects patients with medical professionals,
              healthcare service providers, and affiliated partners
              such as interpreters, concierge services, customer
              support, and payment processors.
            </p>

            <p>
              If any significant changes are made to this Privacy
              Policy, we will notify you. Continued use of the
              website after updates implies acceptance of the
              revised policy. Please revisit this page regularly
              for updates.
            </p>

            <p>
              For questions, concerns, or requests regarding your
              personal information, contact us at{" "}

              <a
                href="mailto:info@unihealhealth.com"
              >
                info@unihealhealth.com
              </a>

              . We aim to respond promptly to all inquiries.
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

export default PrivacyPolicy;