import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import Ticker from './components/Ticker';
import Expertise from './components/Expertise';
import Experience from './components/Experience';
import Work from './components/Work';
import Contact from './components/Contact';

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
        <Work />
        <Contact />
      </main>
    </>
  );
}
