import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { work } from '../content/work';

/* ─────────────────────────────────────────
   Left sidebar — company list
───────────────────────────────────────── */
function CompanyList({ activeIndex, onSelect }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0', paddingTop: '0.5rem' }}>
      {work.map((exp, i) => {
        const isActive = activeIndex === i;
        return (
          <button
            key={i}
            onClick={() => onSelect(i)}
            style={{
              all: 'unset',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.2rem',
              padding: '1.1rem 0',
              borderBottom: '1px solid var(--color-border)',
              cursor: 'pointer',
              position: 'relative',
              paddingLeft: isActive ? '1rem' : '0',
              transition: 'padding-left 0.2s ease',
            }}
          >
            {/* active indicator bar */}
            <span
              style={{
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                width: isActive ? '3px' : '0px',
                height: '60%',
                background: 'var(--color-accent)',
                borderRadius: '2px',
                transition: 'width 0.2s ease',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.95rem',
                fontWeight: 700,
                color: isActive ? 'var(--color-accent)' : 'var(--color-ink)',
                transition: 'color 0.2s ease',
                lineHeight: 1.2,
              }}
            >
              {exp.company}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.72rem',
                fontWeight: 500,
                color: isActive ? 'var(--color-ink)' : 'var(--color-ink-muted)',
                transition: 'color 0.2s ease',
                lineHeight: 1.3,
              }}
            >
              {exp.role}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.6rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: isActive ? 'var(--color-ink-muted)' : 'rgba(107,101,96,0.4)',
                transition: 'color 0.2s ease',
              }}
            >
              {exp.location} · {exp.period}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────
   Right panel — single role detail
───────────────────────────────────────── */
function ExperiencePanel({ exp }) {
  return (
    <motion.div
      key={exp.company}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{ paddingTop: '0', paddingBottom: '3rem' }}
    >
      <div>
        {/* header */}
        <div style={{ marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
            <span
              style={{
                display: 'inline-flex',
                padding: '0.2rem 0.65rem',
                background: 'var(--color-pop)',
                borderRadius: '100px',
                fontFamily: 'var(--font-body)',
                fontSize: '0.6rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--color-ink)',
              }}
            >
              {exp.type}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.68rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--color-ink-muted)',
              }}
            >
              {exp.period} · {exp.location}
            </span>
          </div>

          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
              fontWeight: 700,
              lineHeight: 1.15,
              color: 'var(--color-ink)',
              margin: '0 0 0.25rem',
            }}
          >
            {exp.role}
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.9rem',
              fontWeight: 600,
              fontStyle: 'italic',
              color: 'var(--color-accent)',
              margin: 0,
            }}
          >
            {exp.company}
          </p>
        </div>

        {/* stat callouts */}
        {exp.stats.length > 0 && (
          <div
            style={{
              display: 'flex',
              gap: '1px',
              background: 'var(--color-border)',
              border: '1px solid var(--color-border)',
              marginBottom: '1.75rem',
            }}
          >
            {exp.stats.map((stat, si) => (
              <div
                key={si}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem',
                  padding: '1rem 1.25rem',
                  background: 'var(--color-surface)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.4rem, 2.2vw, 1.9rem)',
                    fontWeight: 700,
                    color: 'var(--color-accent)',
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    letterSpacing: '0.09em',
                    textTransform: 'uppercase',
                    color: 'var(--color-ink-muted)',
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* bullets */}
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.75rem' }}>
          {exp.bullets.map((bullet, bi) => (
            <li
              key={bi}
              style={{
                display: 'flex',
                gap: '0.75rem',
                alignItems: 'flex-start',
                fontFamily: 'var(--font-body)',
                fontSize: '0.88rem',
                lineHeight: 1.75,
                color: 'var(--color-ink-muted)',
              }}
            >
              <span
                style={{
                  color: 'var(--color-accent)',
                  flexShrink: 0,
                  marginTop: '0.35rem',
                  fontSize: '0.55rem',
                }}
              >
                ✦
              </span>
              {bullet}
            </li>
          ))}
        </ul>

        {/* tool tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {exp.tools.map(tool => (
            <span
              key={tool}
              style={{
                display: 'inline-flex',
                padding: '0.3rem 0.7rem',
                border: '1px solid var(--color-border)',
                borderRadius: '4px',
                fontFamily: 'var(--font-body)',
                fontSize: '0.65rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--color-ink-muted)',
                background: 'var(--color-surface)',
              }}
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   Work section
───────────────────────────────────────── */
export default function Work() {
  const [activeIndex, setActiveIndex] = useState(0);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });

  const handleSelect = (i) => setActiveIndex(i);

  return (
    <section
      id="work"
      style={{
        background: 'var(--color-surface)',
        paddingTop: 'clamp(3rem, 6vw, 5rem)',
      }}
    >
      <div className="page-x">

        {/* ── section header ── */}
        <div ref={headerRef} style={{ marginBottom: '2rem' }}>
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, x: -16 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45 }}
          >
            Where I've Made an Impact
          </motion.p>
        </div>

        {/* ── sticky split layout — desktop only ── */}
        <div
          className="hidden md:grid"
          style={{
            gridTemplateColumns: '1fr 2fr',
            gap: '0 4rem',
            alignItems: 'start',
            paddingBottom: 'clamp(4rem, 8vw, 7rem)',
          }}
        >
          {/* LEFT — sticky sidebar */}
          <div
            style={{
              position: 'sticky',
              top: '88px',
            }}
          >
            <CompanyList activeIndex={activeIndex} onSelect={handleSelect} />
          </div>

          {/* RIGHT — single active panel */}
          <div style={{ minHeight: '520px' }}>
            <AnimatePresence mode="wait">
              <ExperiencePanel
                key={activeIndex}
                exp={work[activeIndex]}
              />
            </AnimatePresence>
          </div>
        </div>

        {/* ── mobile — tab selector + single panel ── */}
        <div className="md:hidden" style={{ paddingBottom: 'clamp(4rem, 8vw, 7rem)' }}>
          {/* mobile company tabs */}
          <div style={{ display: 'flex', overflowX: 'auto', gap: '0.5rem', paddingBottom: '1.25rem', marginBottom: '0.5rem', borderBottom: '1px solid var(--color-border)' }}>
            {work.map((exp, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                style={{
                  all: 'unset',
                  display: 'inline-flex',
                  flexShrink: 0,
                  padding: '0.4rem 1rem',
                  borderRadius: '100px',
                  border: activeIndex === i ? '1.5px solid var(--color-accent)' : '1.5px solid var(--color-border)',
                  background: activeIndex === i ? 'var(--color-accent)' : 'transparent',
                  color: activeIndex === i ? '#fff' : 'var(--color-ink)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  letterSpacing: '0.04em',
                  transition: 'all 0.2s ease',
                }}
              >
                {exp.company}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <ExperiencePanel
              key={activeIndex}
              exp={work[activeIndex]}
            />
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
