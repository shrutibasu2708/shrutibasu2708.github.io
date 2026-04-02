import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Ticker from "./components/Ticker";
import Expertise from "./components/Expertise";
import Experience from "./components/Experience";
import Deliverables from "./components/Deliverables";
import Volunteer from "./components/Volunteer";
import Tools from "./components/Tools";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <Expertise />
        <Experience />
        <Deliverables />
        <Volunteer />
        <Tools />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
