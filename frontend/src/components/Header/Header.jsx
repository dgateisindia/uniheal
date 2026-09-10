import { useState } from "react";
import {
  FaEnvelope,
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import "./Header.css";

import logo from "../../assets/images/logo/uniheal-logo.webp";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", id: "home" },
    { name: "About Us", id: "about" },
    { name: "Treatments", id: "treatments" },
    { name: "Cities", id: "cities" },
    { name: "Hospitals", id: "hospitals" },
    { name: "Doctors", id: "doctors" },
    { name: "Patient Guide", id: "patient-guide" },
    { name: "Contact Us", id: "contact" },
  ];

  const handleNavigation = (id) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    setMenuOpen(false);
  };

  return (
    <header className="header">

      {/* TOP BAR */}

      <div className="top-bar">
        <div className="top-bar-container">

          {/* Contact Information */}
          <div className="contact-info">

            <a href="mailto:medical@unihealhealth.com">
              <FaEnvelope />
              <span>medical@unihealhealth.com</span>
            </a>

            <a
              href="https://wa.me/919538564300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp />
              <span>+91 953 856 4300</span>
            </a>

          </div>


          {/* Social Media */}
          <div className="social-links">

            <a
              href="https://www.facebook.com/unihealrobust"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://www.instagram.com/uniheal_/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>

            <a
              href="https://www.linkedin.com/company/uniheal/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>

          </div>

        </div>
      </div>


      {/* MAIN NAVBAR */}

      <nav className="navbar">

        <div className="navbar-container">

          {/* LOGO */}

          <button
            className="logo"
            onClick={() => handleNavigation("home")}
            aria-label="UniHeal Home"
          >
            <img
              src={logo}
              alt="UniHeal"
              className="logo-image"
            />
          </button>


          {/* DESKTOP NAVIGATION */}

          <div className="nav-links">

            {navItems.map((item) => (
              <button
                key={item.id}
                className={`nav-link ${
                  item.id === "home" ? "active" : ""
                }`}
                onClick={() => handleNavigation(item.id)}
              >
                {item.name}
              </button>
            ))}

          </div>


          {/* FREE QUOTE BUTTON */}

          <button
            className="quote-button"
            onClick={() => handleNavigation("contact")}
          >
            Get a FREE Quote
          </button>


          {/* MOBILE MENU BUTTON */}

          <button
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

        </div>


        {/* MOBILE NAVIGATION */}

        <div
          className={`mobile-menu ${
            menuOpen ? "mobile-menu-open" : ""
          }`}
        >

          {navItems.map((item) => (
            <button
              key={item.id}
              className="mobile-nav-link"
              onClick={() => handleNavigation(item.id)}
            >
              {item.name}
            </button>
          ))}

          <button
            className="mobile-quote-button"
            onClick={() => handleNavigation("contact")}
          >
            Get a FREE Quote
          </button>

        </div>

      </nav>

    </header>
  );
}

export default Header;