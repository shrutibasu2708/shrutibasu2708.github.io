import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { badge, headline, roles, tagline, ctas, stats, identity } from '../content/hero';
import ShrutiHero from '../assets/Shruti_hero.jpg';

/* ─────────────────────────────────────────
   Count-up hook
───────────────────────────────────────── */
function useCountUp(target, duration, active) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - p, 3); // cubic ease-out
      setVal(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return val;
}

/* ─────────────────────────────────────────
   Single stat cell
───────────────────────────────────────── */
function StatItem({ number, suffix, label, index, active }) {
  const count = useCountUp(number, 1.4, active);

  // mobile (2-col): right border on left column (0,2), bottom border on top row (0,1)
  // desktop (4-col): right border on all except last (0,1,2), no bottom border
  const mobileRightBorder  = index % 2 === 0;     // cols 0,2
  const mobileBottomBorder = index < 2;            // row 0
  const desktopRightBorder = index < 3;            // all except last

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 * index, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="stat-item flex flex-col items-center text-center"
      style={{
        padding: '1.75rem 1rem',
        borderRight:  mobileRightBorder  ? '1px solid var(--color-border)' : 'none',
        borderBottom: mobileBottomBorder ? '1px solid var(--color-border)' : 'none',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
          fontWeight: 700,
          lineHeight: 1,
          color: 'var(--color-accent)',
        }}
      >
        {active ? count : 0}{suffix}
      </span>
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.67rem',
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--color-ink-muted)',
          marginTop: '0.5rem',
        }}
      >
        {label}
      </span>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   Hero section
───────────────────────────────────────── */
export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [statsOn, setStatsOn] = useState(false);
  const statsRef = useRef(null);

  /* cycle roles every 2.4 s */
  useEffect(() => {
    const id = setInterval(() => setRoleIdx(i => (i + 1) % roles.length), 2400);
    return () => clearInterval(id);
  }, []);

  /* trigger count-up when stats row enters viewport */
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsOn(true); },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* reusable fade-up preset */
  const fadeUp = (delay) => ({
    initial:    { opacity: 0, y: 28 },
    animate:    { opacity: 1, y: 0  },
    transition: { delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        paddingTop: '68px',
        background: 'var(--color-bg)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <div className="page-x">

        {/* ── two-column layout ─────────────────────── */}
        <div
          className="grid grid-cols-1 md:grid-cols-[3fr_2fr] items-center"
          style={{ gap: '3rem', paddingTop: '4rem', paddingBottom: '3rem' }}
        >

          {/* ── LEFT col ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* availability badge */}
            <motion.div {...fadeUp(0)}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.4rem 0.875rem',
                  background: 'var(--color-pop)',
                  borderRadius: '100px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.63rem',
                  fontWeight: 700,
                  letterSpacing: '0.13em',
                  textTransform: 'uppercase',
                  color: 'var(--color-ink)',
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: 'var(--color-accent)',
                    display: 'inline-block',
                    flexShrink: 0,
                    animation: 'blink 1.8s ease-in-out infinite',
                  }}
                />
                {badge}
              </span>
            </motion.div>

            {/* headline */}
            <motion.h1
              {...fadeUp(0.1)}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3.5rem, 8vw, 7rem)',
                fontWeight: 700,
                lineHeight: 1.0,
                letterSpacing: '-0.02em',
                color: 'var(--color-ink)',
                margin: 0,
              }}
            >
              {headline.map((line, i) => (
                <span key={i} style={{ display: 'block' }}>
                  {line.normal}
                  <em style={{ color: 'var(--color-accent)', fontStyle: 'italic' }}>
                    {line.italic}
                  </em>
                </span>
              ))}
            </motion.h1>

            {/* animated role ticker */}
            <motion.div
              {...fadeUp(0.2)}
              style={{ height: '1.75rem', overflow: 'hidden', position: 'relative' }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIdx}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0  }}
                  exit={{    opacity: 0, y: -14 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    position: 'absolute',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--color-ink-muted)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  ↳&nbsp;{roles[roleIdx]}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            {/* tagline */}
            <motion.p
              {...fadeUp(0.3)}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.93rem, 1.3vw, 1.02rem)',
                lineHeight: 1.78,
                color: 'var(--color-ink-muted)',
                maxWidth: '52ch',
                margin: 0,
              }}
            >
              {tagline}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              {...fadeUp(0.4)}
              style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap', marginTop: '0.25rem' }}
            >
              {ctas.map((cta) => (
                <a
                  key={cta.href}
                  href={cta.href}
                  style={
                    cta.variant === 'solid'
                      ? {
                          display:        'inline-flex',
                          alignItems:     'center',
                          gap:            '0.4rem',
                          padding:        '0.8rem 2rem',
                          background:     'var(--color-accent)',
                          color:          '#fff',
                          borderRadius:   '100px',
                          fontFamily:     'var(--font-body)',
                          fontSize:       '0.72rem',
                          fontWeight:     700,
                          letterSpacing:  '0.13em',
                          textTransform:  'uppercase',
                          textDecoration: 'none',
                          transition:     'opacity 0.2s',
                          border:         'none',
                        }
                      : {
                          display:        'inline-flex',
                          alignItems:     'center',
                          gap:            '0.4rem',
                          padding:        '0.8rem 2rem',
                          border:         '1.5px solid var(--color-accent)',
                          color:          'var(--color-accent)',
                          background:     'transparent',
                          borderRadius:   '100px',
                          fontFamily:     'var(--font-body)',
                          fontSize:       '0.72rem',
                          fontWeight:     700,
                          letterSpacing:  '0.13em',
                          textTransform:  'uppercase',
                          textDecoration: 'none',
                          transition:     'all 0.2s',
                        }
                  }
                  onMouseEnter={e => {
                    if (cta.variant === 'solid') {
                      e.currentTarget.style.opacity = '0.88';
                    } else {
                      e.currentTarget.style.background = 'var(--color-accent)';
                      e.currentTarget.style.color = '#fff';
                    }
                  }}
                  onMouseLeave={e => {
                    if (cta.variant === 'solid') {
                      e.currentTarget.style.opacity = '1';
                    } else {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = 'var(--color-accent)';
                    }
                  }}
                >
                  {cta.label}
                  {cta.variant === 'solid' && (
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                  {cta.variant === 'outline' && (
                    <span style={{ fontSize: '0.85rem' }}>↓</span>
                  )}
                </a>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT col — identity card ── */}
          <motion.div
            initial={{ opacity: 0, x: 32, rotate: 4 }}
            animate={{ opacity: 1, x: 0,  rotate: 2 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{
              rotate: 0,
              scale: 1.015,
              transition: { type: 'spring', stiffness: 280, damping: 22 },
            }}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <div
              style={{
                width: '100%',
                maxWidth: '320px',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 24px 64px rgba(17,16,16,0.14)',
              }}
            >
              {/* photo */}
              <div style={{ height: '300px', overflow: 'hidden' }}>
                <img
                  src={ShrutiHero}
                  alt="Shruti Basu"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
                />
              </div>

              {/* name / role strip */}
              <div style={{ padding: '1.25rem 1.5rem 1.5rem', background: 'var(--color-ink)' }}>
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.4rem',
                    fontWeight: 700,
                    color: '#fff',
                    margin: '0 0 0.2rem',
                    lineHeight: 1.2,
                  }}
                >
                  {identity.name}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--color-pop)',
                    margin: '0 0 0.75rem',
                  }}
                >
                  {identity.role}
                </p>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.3rem 0.7rem',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '100px',
                  }}
                >
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: '50%',
                      background: 'var(--color-accent)',
                      display: 'inline-block',
                      animation: 'blink 1.8s ease-in-out infinite',
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.62rem',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.5)',
                    }}
                  >
                    {identity.location}
                  </span>
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── stats strip ─────────────────────────── */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0  }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4"
          style={{ borderTop: '1px solid var(--color-border)' }}
        >
          {stats.map((s, i) => (
            <StatItem
              key={s.label}
              {...s}
              index={i}
              active={statsOn}
            />
          ))}
        </motion.div>

      </div>
    </section>
  );
}
