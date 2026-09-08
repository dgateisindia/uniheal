import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Treatments from "./components/Treatments/Treatments";

function App() {
  return (
    <>
      <Header />
      <Home />
      <About />
      <Treatments />

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