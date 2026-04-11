import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { logo, links, cta } from '../content/nav';

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [active,   setActive]     = useState('');
  const [open,     setOpen]       = useState(false);
  const navigate  = useNavigate();
  const location  = useLocation();
  const isHome    = location.pathname === '/';

  /* ── Scroll detection ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Active section via IntersectionObserver ── */
  useEffect(() => {
    const ids = links.map(l => l.href.slice(1));
    const map = new Map();

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => map.set(e.target.id, e.isIntersecting));
        // pick the first visible section
        const first = ids.find(id => map.get(id));
        if (first) setActive(first);
      },
      { threshold: 0.25 }
    );

    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, []);

  /* ── Close drawer on desktop resize ── */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  /* ── Close drawer when a link is clicked ── */
  const handleLinkClick = () => setOpen(false);

  /* ── Nav click: scroll on home, navigate+scroll from detail pages ── */
  const handleNavClick = (e, href) => {
    e.preventDefault();
    setOpen(false);
    const id = href.replace('#', '');
    if (isHome) {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      // Update URL hash so the link is shareable/bookmarkable
      history.replaceState(null, '', `#${id}`);
    } else {
      navigate('/', { state: { scrollTo: id } });
    }
  };

  return (
    <>
      <header
        className={[
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled || open
            ? 'bg-[var(--color-bg)] shadow-[0_1px_0_var(--color-border)]'
            : 'bg-transparent',
        ].join(' ')}
        style={{ width: '100%', maxWidth: '100vw' }}
      >
        <div className="page-x flex items-center justify-between h-[68px]">

          {/* ── Logo ── */}
          <a
            href="/"
            onClick={e => { e.preventDefault(); if (isHome) window.scrollTo({ top: 0, behavior: 'smooth' }); else navigate('/'); }}
            className="flex items-baseline gap-[3px] select-none"
            aria-label="Shruti Basu — home"
          >
            <span
              className="font-display text-[1.35rem] font-semibold tracking-tight leading-none"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {logo.first}
            </span>
            <span
              className="font-display text-[1.35rem] font-semibold tracking-tight leading-none italic"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-accent)' }}
            >
              {logo.last}
            </span>
          </a>

          {/* ── Desktop nav ── */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
            {links.map(link => {
              const id = link.href.slice(1);
              const isActive = active === id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={e => handleNavClick(e, link.href)}
                  className="relative pb-0.5"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    letterSpacing: '0.13em',
                    textTransform: 'uppercase',
                    color: isActive ? 'var(--color-accent)' : 'var(--color-ink)',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = 'var(--color-accent)'; }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = 'var(--color-ink)'; }}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-line"
                      className="absolute bottom-0 left-0 right-0 h-[2px]"
                      style={{ background: 'var(--color-accent)' }}
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* ── Desktop CTA ── */}
          <a
            href={cta.href}
            onClick={e => handleNavClick(e, cta.href)}
            className="hidden md:inline-flex items-center gap-2 text-[0.7rem] font-bold tracking-[0.14em] uppercase transition-all duration-200 group"
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--color-accent)',
              border: '1.5px solid var(--color-accent)',
              borderRadius: '100px',
              padding: '0.75rem 2.25rem',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--color-accent)';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'var(--color-accent)';
            }}
          >
            {cta.label}
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{ transition: 'transform 0.2s' }}>
              <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>

          {/* ── Mobile hamburger ── */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px]"
            onClick={() => setOpen(v => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <motion.span
              animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.22 }}
              className="block w-5 h-[1.5px] origin-center"
              style={{ background: 'var(--color-ink)' }}
            />
            <motion.span
              animate={open ? { scaleX: 0, opacity: 0 } : { scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.18 }}
              className="block w-5 h-[1.5px]"
              style={{ background: 'var(--color-ink)' }}
            />
            <motion.span
              animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.22 }}
              className="block w-5 h-[1.5px] origin-center"
              style={{ background: 'var(--color-ink)' }}
            />
          </button>
        </div>
      </header>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="drawer"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-[68px] left-0 right-0 z-40 md:hidden"
            style={{
              background: 'var(--color-bg)',
              borderBottom: '1px solid var(--color-border)',
              boxShadow: '0 8px 32px rgba(17,16,16,0.08)',
            }}
          >
            <nav className="flex flex-col py-4 gap-0" aria-label="Mobile">
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={e => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.045, duration: 0.22 }}
                  className="flex items-center justify-between border-b"
                  style={{
                    paddingTop: '1.25rem',
                    paddingBottom: '1.25rem',
                    paddingLeft: '2rem',
                    paddingRight: '2rem',
                    borderColor: 'var(--color-border)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    letterSpacing: '0.13em',
                    textTransform: 'uppercase',
                    color: active === link.href.slice(1) ? 'var(--color-accent)' : 'var(--color-ink)',
                  }}
                >
                  {link.label}
                  <span style={{ color: 'var(--color-accent)', fontSize: '1rem' }}>→</span>
                </motion.a>
              ))}
              <motion.a
                href={cta.href}
                onClick={e => handleNavClick(e, cta.href)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: links.length * 0.045 + 0.05 }}
                className="flex items-center justify-center gap-2 text-[0.72rem] font-bold tracking-[0.14em] uppercase"
                style={{
                  background: 'var(--color-accent)',
                  color: '#fff',
                  borderRadius: '100px',
                  fontFamily: 'var(--font-body)',
                  letterSpacing: '0.14em',
                  margin: '1.25rem 2rem 1rem',
                  padding: '1rem 1.5rem',
                }}
              >
                {cta.label}
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
