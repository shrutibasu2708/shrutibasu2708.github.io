import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import Ticker from './components/Ticker';
import Expertise from './components/Expertise';
import Contact from './components/Contact';
import Work from './components/Work';
import CaseStudies from './components/CaseStudies';
import WorkDetail from './pages/WorkDetail';

function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const id = location.state.scrollTo;
      navigate(location.pathname, { replace: true, state: null });
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      });
    } else if (location.hash) {
      const id = location.hash.slice(1);
      // Small delay to let sections mount before scrolling
      const t = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return () => clearTimeout(t);
    }
  }, [location.state, location.hash]);

  return (
    <>
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

export default function App() {
  return (
    <>
      <CustomCursor />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/work/:slug" element={<WorkDetail />} />
      </Routes>
    </>
  );
}
