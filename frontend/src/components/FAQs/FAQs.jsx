import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./FAQs.css";

gsap.registerPlugin(ScrollTrigger);

function FAQs() {
  const sectionRef = useRef(null);

  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is UniHeal, and how does it work?",
      answer:
        "UniHeal makes health tourism in India simple, safe, and affordable for patients from around the world. We work with JCI and NABH hospitals in India to offer world-class treatments, English-speaking doctors, transparent pricing, and medical visa assistance for India. From heart surgery to robotic procedures, we help patients access medical treatment in India.",
    },
    {
      question:
        "How can UniHeal help me find the right hospital and doctor for my treatment?",
      answer:
        "UniHeal helps patients find trusted hospitals and experienced doctors based on their medical needs. Our team guides you through suitable treatment options and helps you choose the right healthcare provider.",
    },
    {
      question:
        "How do I request a cost estimate for my treatment through UniHeal?",
      answer:
        "You can request a personalized treatment cost estimate by sharing your medical details and reports with UniHeal. Our team will review your case and coordinate with suitable hospitals to provide an estimated treatment cost.",
    },
    {
      question:
        "Can UniHeal assist with travel and accommodation arrangements for my medical trip?",
      answer:
        "Yes. UniHeal can assist with airport transfers, accommodation near the hospital, and travel planning to make your medical journey more convenient.",
    },
    {
      question:
        "Will English-speaking doctors and hospital staff be available?",
      answer:
        "Yes. Our partner hospitals have English-speaking doctors and hospital staff who are experienced in treating international patients. Our team can also assist with communication whenever required.",
    },
    {
      question:
        "Does UniHeal provide follow-up support after treatment?",
      answer:
        "Yes. UniHeal continues to support patients after treatment by helping coordinate follow-up consultations, medical reports, and communication with doctors when required.",
    },
    {
      question:
        "Can I choose my preferred hospital or doctor?",
      answer:
        "Yes. You can share your preferred hospital or doctor with us. UniHeal will help coordinate your treatment based on your medical requirements and preferences.",
    },
    {
      question:
        "Can UniHeal arrange a second medical opinion?",
      answer:
        "Yes. UniHeal can help you obtain a second medical opinion from experienced specialists in India. You can share your medical reports with us for review.",
    },
    {
      question:
        "Will I receive a detailed treatment cost estimate before traveling?",
      answer:
        "Yes. After reviewing your medical reports and treatment requirements, UniHeal can coordinate with suitable hospitals and provide an estimated treatment cost before your travel.",
    },
    {
      question:
        "Can my family member or attendant accompany me to India?",
      answer:
        "Yes. A family member or attendant can accompany you to India. UniHeal can also assist with accommodation and travel arrangements for accompanying family members.",
    },
  ];

  // =========================================
  // GSAP SECTION ANIMATION
  // =========================================

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".faqs-title", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",

        scrollTrigger: {
          trigger: ".faqs-section",
          start: "top 80%",
          once: true,
        },
      });

      gsap.from(".faq-item", {
        opacity: 0,
        y: 15,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",

        scrollTrigger: {
          trigger: ".faqs-list",
          start: "top 82%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // =========================================
  // OPEN / CLOSE FAQ
  // =========================================

  const toggleFAQ = (index) => {
    setOpenIndex((previousIndex) =>
      previousIndex === index ? null : index
    );
  };

  return (
    <section
      className="faqs-section"
      id="faqs"
      ref={sectionRef}
    >
      <div className="faqs-container">

        {/* TITLE */}

        <h2 className="faqs-title">
          Frequently Asked Questions
        </h2>

        {/* FAQ LIST */}

        <div className="faqs-list">

          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                className={`faq-item ${
                  isOpen ? "open" : ""
                }`}
                key={index}
              >

                {/* QUESTION */}

                <button
                  type="button"
                  className="faq-question"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-question-text">
                    {faq.question}
                  </span>

                  <span className="faq-icon">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {/* ANSWER */}

                <div
                  className={`faq-answer-wrapper ${
                    isOpen ? "show" : ""
                  }`}
                >
                  <div className="faq-answer">
                    {faq.answer}
                  </div>
                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}

export default FAQs;