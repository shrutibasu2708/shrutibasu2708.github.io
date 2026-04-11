import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';

export default function App() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <div id="about"      style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F9F7F2' }}>About</div>
        <div id="expertise"  style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>Expertise</div>
        <div id="experience" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F9F7F2' }}>Experience</div>
        <div id="work"       style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>Work</div>
        <div id="contact"    style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#111010', color: '#fff' }}>Contact</div>
      </main>
    </>
  );
}
