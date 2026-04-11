import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import Ticker from './components/Ticker';
import Expertise from './components/Expertise';
import Contact from './components/Contact';
import Work from './components/Work';
import CaseStudies from './components/CaseStudies';

export default function App() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <Expertise />
        <Work />
        <CaseStudies />
        <Contact />
      </main>
    </>
  );
}
