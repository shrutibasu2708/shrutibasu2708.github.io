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
      const el = document.getElementById(location.state.scrollTo);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      // Clear the state so browser back doesn't retrigger the scroll
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location.state]);

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
