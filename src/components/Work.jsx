import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { cases } from '../content/work';

/* ─── column label style (not using .eyebrow class — avoids the orange dash) ─── */
const COL_LABEL = {
  display: 'block',
  fontFamily: 'var(--font-body)',
  fontSize: '0.62rem',
  fontWeight: 700,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  marginBottom: '0.8rem',
};

function CaseRow({ c }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      style={{
        borderTop: '1px solid var(--color-border)',
        paddingTop: 'clamp(2rem, 4vw, 3rem)',
        paddingBottom: 'clamp(2rem, 4vw, 3rem)',
      }}
    >
      {/* ── ghost number + tag chips ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
          marginBottom: 'clamp(0.5rem, 1.2vw, 1rem)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(4rem, 8vw, 7rem)',
            fontWeight: 700,
            lineHeight: 1,
            color: 'rgba(17,16,16,0.06)',
            letterSpacing: '-0.04em',
            userSelect: 'none',
          }}
        >
          {c.num}
        </span>

        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignSelf: 'center' }}>
          {c.tags.map((t) => (
            <span
              key={t}
              style={{
                padding: '0.22rem 0.65rem',
                border: '1px solid var(--color-border-dark)',
                color: 'var(--color-ink-muted)',
                fontSize: '0.62rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                borderRadius: '2px',
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ── title ── */}
      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.35rem, 2.5vw, 2rem)',
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          color: 'var(--color-ink)',
          marginBottom: 'clamp(1.5rem, 2.5vw, 2.25rem)',
          maxWidth: '64ch',
        }}
      >
        {c.title}
      </h3>

      {/* ── 3-column panel ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 'clamp(1.5rem, 3vw, 2.5rem)',
        }}
      >
        {/* The Problem */}
        <div>
          <span style={{ ...COL_LABEL, color: 'var(--color-ink-muted)' }}>The Problem</span>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-ink)', lineHeight: 1.75, opacity: 0.82 }}>
            {c.problem}
          </p>
        </div>

        {/* What I Did */}
        <div>
          <span style={{ ...COL_LABEL, color: 'var(--color-ink-muted)' }}>What I Did</span>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-ink)', lineHeight: 1.75, opacity: 0.82 }}>
            {c.action}
          </p>
        </div>

        {/* The Outcome */}
        <div>
          <span style={{ ...COL_LABEL, color: 'var(--color-accent)' }}>The Outcome</span>

          {/* lime metric callout */}
          <div
            style={{
              background: 'var(--color-pop)',
              color: 'var(--color-ink)',
              padding: '0.65rem 1rem',
              borderRadius: '3px',
              marginBottom: '0.9rem',
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(0.92rem, 1.4vw, 1.08rem)',
              fontWeight: 700,
              lineHeight: 1.25,
            }}
          >
            {c.metric}
          </div>

          <p style={{ fontSize: '0.9rem', color: 'var(--color-ink)', lineHeight: 1.75, opacity: 0.82 }}>
            {c.outcome}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Work() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-50px' });

  return (
    <section
      id="work"
      style={{
        background: 'var(--color-bg)',
        paddingLeft: 'clamp(1.2rem, 5vw, 6rem)',
        paddingRight: 'clamp(1.2rem, 5vw, 6rem)',
        paddingTop: 'clamp(3rem, 6vw, 5rem)',
        paddingBottom: 'clamp(3rem, 6vw, 5rem)',
      }}
    >
      {/* ── section header ── */}
      <div ref={headerRef} style={{ marginBottom: 'clamp(0.5rem, 1vw, 1rem)' }}>
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, x: -16 }}
          animate={headerInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.45 }}
        >
          Case Studies
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4.5vw, 3.6rem)',
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '-0.025em',
            color: 'var(--color-ink)',
            margin: '0 0 clamp(0.75rem, 1.5vw, 1.1rem)',
          }}
        >
          Real problems.{' '}
          <em style={{ color: 'var(--color-accent)', fontStyle: 'italic' }}>Real results.</em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{
            fontSize: 'clamp(0.92rem, 1.4vw, 1.05rem)',
            color: 'var(--color-ink-muted)',
            lineHeight: 1.75,
          }}
        >
          Not concepts — campaigns I ran, problems I solved, and outcomes I can stand behind.
        </motion.p>
      </div>

      {/* ── case study rows ── */}
      <div>
        {cases.map((c) => (
          <CaseRow key={c.num} c={c} />
        ))}
      </div>
    </section>
  );
}
