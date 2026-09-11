import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();


  /*
    ==========================================================
    HANDLE SCROLL
    ==========================================================
  */

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    handleScroll();

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);


  /*
    ==========================================================
    NAVIGATION ITEMS
    ==========================================================
  */

  const navItems = [
    { name: "Home", id: "home" },
    { name: "About Us", id: "about" },
    { name: "Specialities", id: "specialities" },
    { name: "Cities", id: "cities" },
    { name: "Hospitals", id: "hospitals" },
    { name: "Doctors", id: "doctors" },
    { name: "Patient Guide", id: "journey" },
  ];


  /*
    ==========================================================
    HANDLE NAVIGATION
    ==========================================================
  */

  const handleNavigation = (id) => {

    /*
      SPECIALITIES
    */

    if (id === "specialities") {
      navigate("/specialities");

      setMenuOpen(false);

      return;
    }


    /*
      HOME
    */

    if (id === "home") {

      setMenuOpen(false);

      if (location.pathname === "/") {

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

      } else {

        navigate("/");

      }

      return;
    }


    /*
      IF ALREADY ON HOME
    */

    if (location.pathname === "/") {

      const section =
        document.getElementById(id);

      if (section) {

        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

      }

      setMenuOpen(false);

      return;
    }


    /*
      IF ON ANOTHER PAGE
    */

    navigate(`/#${id}`);

    setMenuOpen(false);
  };


  /*
    ==========================================================
    HANDLE HASH AFTER RETURNING TO HOME
    ==========================================================
  */

  useEffect(() => {

    if (location.pathname !== "/") {
      return;
    }

    if (!location.hash) {
      return;
    }

    const sectionId =
      location.hash.substring(1);

    const scrollToSection = () => {

      const section =
        document.getElementById(
          sectionId
        );

      if (section) {

        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

      }
    };

    const timer =
      setTimeout(
        scrollToSection,
        150
      );

    return () =>
      clearTimeout(timer);

  }, [
    location.pathname,
    location.hash,
  ]);


  /*
    ==========================================================
    ACTIVE NAVIGATION
    ==========================================================
  */

  const isActive = (id) => {

    /*
      SPECIALITIES PAGE
    */

    if (
      location.pathname ===
      "/specialities"
    ) {
      return id === "specialities";
    }


    /*
      PRIVACY PAGE
    */

    if (
      location.pathname ===
      "/privacy"
    ) {
      return false;
    }


    /*
      TERMS PAGE
    */

    if (
      location.pathname ===
      "/terms"
    ) {
      return false;
    }


    /*
      HOME PAGE
    */

    if (
      location.pathname === "/"
    ) {

      if (!location.hash) {
        return id === "home";
      }

      const currentSection =
        location.hash.substring(1);

      return currentSection === id;
    }

    return false;
  };


  return (
    <header className="header">

      {/* =====================================================
          TOP BAR
          ===================================================== */}

      <div className="top-bar">

        <div className="top-bar-container">

          {/* CONTACT INFORMATION */}

          <div className="contact-info">

            <a
              href="mailto:medical@unihealhealth.com"
            >

              <FaEnvelope />

              <span>
                medical@unihealhealth.com
              </span>

            </a>


            <a
              href="https://wa.me/919538564300"
              target="_blank"
              rel="noopener noreferrer"
            >

              <FaWhatsapp />

              <span>
                +91 953 856 4300
              </span>

            </a>

          </div>


          {/* SOCIAL MEDIA */}

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


      {/* =====================================================
          MAIN NAVBAR
          ===================================================== */}

      <nav
        className={`navbar ${
          isScrolled
            ? "navbar-scrolled"
            : ""
        }`}
      >

        <div className="navbar-container">


          {/* =================================================
              LOGO
              ================================================= */}

          <button
            type="button"
            className="logo"
            onClick={() =>
              handleNavigation("home")
            }
            aria-label="UniHeal Home"
          >

            <img
              src={logo}
              alt="UniHeal"
              className="logo-image"
            />

          </button>


          {/* =================================================
              DESKTOP NAVIGATION
              ================================================= */}

          <div className="nav-links">

            {navItems.map((item) => (

              <button
                type="button"
                key={item.id}
                className={`nav-link ${
                  isActive(item.id)
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  handleNavigation(
                    item.id
                  )
                }
              >

                {item.name}

              </button>

            ))}

          </div>


          {/* =================================================
              CONTACT US BUTTON
              ================================================= */}

          <button
            type="button"
            className="contact-button"
            onClick={() =>
              handleNavigation(
                "contact"
              )
            }
          >
            Contact Us
          </button>


          {/* =================================================
              MOBILE MENU BUTTON
              ================================================= */}

          <button
            type="button"
            className="menu-button"
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            aria-label={
              menuOpen
                ? "Close menu"
                : "Open menu"
            }
          >

            {menuOpen ? (
              <FaTimes />
            ) : (
              <FaBars />
            )}

          </button>

        </div>


        {/* =====================================================
            MOBILE NAVIGATION
            ===================================================== */}

        <div
          className={`mobile-menu ${
            menuOpen
              ? "mobile-menu-open"
              : ""
          }`}
        >

          {navItems.map((item) => (

            <button
              type="button"
              key={item.id}
              className={`mobile-nav-link ${
                isActive(item.id)
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                handleNavigation(
                  item.id
                )
              }
            >

              {item.name}

            </button>

          ))}


          {/* MOBILE CONTACT US */}

          <button
            type="button"
            className="mobile-contact-button"
            onClick={() =>
              handleNavigation(
                "contact"
              )
            }
          >
            Contact Us
          </button>

        </div>

      </nav>

    </header>
  );
}

export default Header;