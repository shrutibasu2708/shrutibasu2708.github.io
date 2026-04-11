import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import Ticker from './components/Ticker';
import Expertise from './components/Expertise';
import Experience from './components/Experience';

export default function App() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <div id="about" style={{ display: 'none' }} />
        <Expertise />
        <Experience />
        <div id="work"       style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>Work</div>
        <div id="contact"    style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#111010', color: '#fff' }}>Contact</div>
      </main>
    </>
  );
}
