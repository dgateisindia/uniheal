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

function App() {
  return (
    <>
      <Header />
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
      


      <main>
        <section id="home"></section>
        <section id="about"></section>
        <section id="treatments"></section>
        <section id="cities"></section>
        <section id="hospitals"></section>
        <section id="doctors"></section>
        <section id="patient-guide"></section>
        <section id="contact"></section>
      </main>
    </>
  );
}

export default App;