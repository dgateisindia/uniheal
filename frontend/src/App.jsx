import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Header from "./components/Header/Header";

import Home from "./components/Home/Home";
import About from "./components/About/About";
import Treatments from "./components/Treatments/Treatments";
import Cities from "./components/Cities/Cities";
import Hospitals from "./components/Hospitals/Hospitals";
import Doctors from "./components/Doctors/Doctors";
import Journey from "./components/Journey/Journey";
import Trust from "./components/Trust/Trust";
import Testimonials from "./components/Testimonials/Testimonials";
import FAQs from "./components/FAQs/FAQs";
import CTA from "./components/CTA/CTA";
import Contact from "./components/Contact/Contact";
import Map from "./components/Map/Map";

import Footer from "./components/Footer/Footer";

/* Admin pages */
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";

import Specialities from "./components/Specialities/Specialities";

import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy";

import Terms from "./components/Terms/Terms";


/* =====================================================
   PUBLIC HOME WEBSITE
===================================================== */

function PublicWebsite() {
  return (
    <>
      <Header />

      <main className="site-content">

        <Home />

        <About />

        <Treatments />

        <Cities />

        <Hospitals />

        <Doctors />

        <Journey />

        <Trust />

        <Testimonials />

        <FAQs />

        <CTA />

        <Contact />

        <Map />

      </main>

      <Footer />
    </>
  );
}


/* =====================================================
   MAIN APP
===================================================== */

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* ==========================================
            HOME PAGE
        ========================================== */}

        <Route
          path="/"
          element={<PublicWebsite />}
        />


        {/* ==========================================
            SPECIALITIES PAGE
        ========================================== */}

        <Route
          path="/specialities"
          element={<Specialities />}
        />


        {/* ==========================================
            PRIVACY POLICY PAGE
        ========================================== */}

        <Route
          path="/privacy"
          element={<PrivacyPolicy />}
        />


        {/* ==========================================
            TERMS & CONDITIONS PAGE
        ========================================== */}

        <Route
          path="/terms"
          element={<Terms />}
        />


        {/* ==========================================
            ADMIN LOGIN PAGE
        ========================================== */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />


        {/* ==========================================
            ADMIN DASHBOARD PAGE
        ========================================== */}

        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;