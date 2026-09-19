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
  const [activeSection, setActiveSection] = useState("home");

  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: "Home", id: "home" },
    { name: "About Us", id: "about" },
    { name: "Treatments", id: "specialities" },
    { name: "Cities", id: "cities" },
    { name: "Hospitals", id: "hospitals" },
    { name: "Doctors", id: "doctors" },
    { name: "Patient Guide", id: "journey" },
  ];

  /* =========================================
     HEADER SCROLL EFFECT
  ========================================= */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* =========================================
     CLOSE MOBILE MENU WHEN PAGE CHANGES
  ========================================= */
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  /* =========================================
     HANDLE HASH AFTER NAVIGATION
     
     This is important when coming from:
     
     /specialities
     
     to:
     
     /#cities
     
     The homepage needs to render first,
     then we scroll to the section.
  ========================================= */
  useEffect(() => {
    if (location.pathname !== "/") {
      return;
    }

    const hash = location.hash.replace("#", "");

    if (!hash) {
      setActiveSection("home");
      return;
    }

    setActiveSection(hash);

    /*
      Wait until the homepage sections are
      rendered before searching for the element.
    */
    const scrollAfterRender = () => {
      const section = document.getElementById(hash);

      if (!section) {
        return;
      }

      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    };

    /*
      First wait for React to render the homepage.
    */
    const timer = setTimeout(() => {
      scrollAfterRender();
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [location.pathname, location.hash]);

  /* =========================================
     SCROLL TO HOMEPAGE SECTION
  ========================================= */
  const scrollToSection = (id) => {
    const section = document.getElementById(id);

    if (!section) {
      console.error(
        `Section #${id} was not found.`
      );
      return;
    }

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  /* =========================================
     NAVIGATION
  ========================================= */
  const handleNavigation = (id) => {
    const wasMobileMenuOpen = menuOpen;

    // Close mobile menu
    setMenuOpen(false);

    /* =========================================
       HOME
    ========================================= */
    if (id === "home") {
      setActiveSection("home");

      if (location.pathname === "/") {
        window.history.replaceState(
          null,
          "",
          "/"
        );

        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });

        return;
      }

      navigate("/", {
        replace: true,
      });

      return;
    }

    /* =========================================
       TREATMENTS
       Separate Specialities page
    ========================================= */
   if (id === "specialities") {
  navigate("/specialities");
  return;
}

    /* =========================================
       IF ALREADY ON HOMEPAGE
    ========================================= */
    if (location.pathname === "/") {
      setActiveSection(id);

      /*
        Update URL without causing a page
        navigation.
      */
      window.history.pushState(
        null,
        "",
        `/#${id}`
      );

      /*
        MOBILE:
        Wait for menu to close.

        DESKTOP:
        Scroll immediately.
      */
      if (
        window.innerWidth <= 900 &&
        wasMobileMenuOpen
      ) {
        setTimeout(() => {
          scrollToSection(id);
        }, 400);
      } else {
        scrollToSection(id);
      }

      return;
    }

    /* =========================================
       FROM ANOTHER PAGE → HOMEPAGE SECTION
       
       Example:
       /specialities
       ↓
       /#cities
       
       The useEffect above will then wait for
       the homepage to render and scroll to
       Cities.
    ========================================= */
    setActiveSection(id);

    navigate(`/#${id}`);
  };

  /* =========================================
     ACTIVE NAV ITEM
  ========================================= */
 const isActive = (id) => {
  // Treatments should ONLY be active
  // when we are actually on the Specialities page
  if (id === "specialities") {
    return location.pathname === "/specialities";
  }

  // Privacy and Terms pages:
  // no homepage section should be highlighted
  if (
    location.pathname === "/privacy" ||
    location.pathname === "/terms"
  ) {
    return false;
  }

  // Homepage
  if (location.pathname === "/") {
    return activeSection === id;
  }

  return false;
};
  return (
    <header className="header">

      {/* =====================================
          TOP BAR
      ====================================== */}
      <div className="top-bar">
        <div className="top-bar-container">

          <div className="contact-info">

            <a href="mailto:medical@unihealhealth.com">
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

      {/* =====================================
          MAIN NAVBAR
      ====================================== */}
      <nav
        className={`navbar ${
          isScrolled
            ? "navbar-scrolled"
            : ""
        }`}
      >

        <div className="navbar-container">

          {/* LOGO */}
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

          {/* DESKTOP NAVIGATION */}
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
                  handleNavigation(item.id)
                }
              >
                {item.name}
              </button>
            ))}

          </div>

          {/* DESKTOP CONTACT BUTTON */}
          <button
            type="button"
            className="contact-button"
            onClick={() =>
              handleNavigation("contact")
            }
          >
            Get a FREE Quote
          </button>

          {/* MOBILE MENU BUTTON */}
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

        {/* =====================================
            MOBILE MENU
        ====================================== */}
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
                handleNavigation(item.id)
              }
            >
              {item.name}
            </button>
          ))}

          {/* MOBILE CONTACT */}
          <button
            type="button"
            className="mobile-contact-button"
            onClick={() =>
              handleNavigation("contact")
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