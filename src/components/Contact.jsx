import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

const links = [
  {
    label: 'Email',
    value: 'shruti.basu2708@gmail.com',
    href: 'mailto:shruti.basu2708@gmail.com',
    eyebrow: 'Drop a line',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/shrutibasu2708',
    href: 'https://www.linkedin.com/in/shrutibasu2708/',
    eyebrow: 'Connect',
    external: true,
  },
  {
    label: 'Phone',
    value: '+1 (236) 863-2761',
    href: 'tel:+12368632761',
    eyebrow: 'Call or text',
  },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        background: 'var(--color-ink)',
        paddingTop: 'clamp(4rem, 9vw, 8rem)',
        paddingBottom: 'clamp(2rem, 4vw, 3.5rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ghost watermark */}
      <div aria-hidden="true" style={{ position: 'absolute', bottom: '-2rem', right: '-1rem', fontFamily: 'var(--font-display)', fontSize: 'clamp(8rem, 18vw, 18rem)', fontWeight: 700, lineHeight: 1, color: 'rgba(249,247,242,0.03)', userSelect: 'none', pointerEvents: 'none', whiteSpace: 'nowrap' }}>
        Let's Talk.
      </div>

      <div className="page-x" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45 }}
            style={{ color: 'var(--color-pop)' }}
          >
            Ready to grow?
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 6vw, 5rem)',
              fontWeight: 700,
              lineHeight: 1.0,
              letterSpacing: '-0.03em',
              color: '#fff',
              margin: '0 0 1.5rem',
              maxWidth: '14ch',
            }}
          >
            Let's build something that{' '}
            <em style={{ color: 'var(--color-accent)', fontStyle: 'italic' }}>actually works.</em>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.55 }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
              lineHeight: 1.75,
              color: 'rgba(249,247,242,0.55)',
              maxWidth: '52ch',
              margin: 0,
            }}
          >
            If you have a growth problem and want someone who'll dig into the data before touching your budget — let's talk.
          </motion.p>
        </div>

        {/* Contact cards */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1px', background: 'rgba(249,247,242,0.08)', border: '1px solid rgba(249,247,242,0.08)', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
          {links.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.25 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{
                flex: '1 1 220px',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                padding: '2rem',
                background: 'transparent',
                textDecoration: 'none',
                transition: 'background 0.2s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(249,247,242,0.05)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
            >
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-pop)' }}>{link.eyebrow}</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'rgba(249,247,242,0.4)' }}>{link.label}</span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(0.88rem, 1.4vw, 1.05rem)', fontWeight: 700, color: '#fff', lineHeight: 1.3 }}>{link.value}</span>
            </motion.a>
          ))}
        </div>

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.55, duration: 0.5 }}
          style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}
        >
          <a
            href="mailto:shruti.basu2708@gmail.com"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1rem 2.5rem',
              background: 'var(--color-accent)',
              color: '#fff',
              fontFamily: 'var(--font-body)',
              fontSize: '0.82rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              borderRadius: '2px',
              transition: 'background 0.2s ease, transform 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#d93f00'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--color-accent)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            Get in touch <span style={{ fontSize: '1rem', lineHeight: 1 }}>→</span>
          </a>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.5 }}
          style={{ borderTop: '1px solid rgba(249,247,242,0.08)', paddingTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}
        >
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', color: 'rgba(249,247,242,0.22)' }}>© 2026 Shruti Basu · Vancouver, BC</span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', color: 'rgba(249,247,242,0.22)', fontStyle: 'italic' }}>Data Driven. Story Led. Impact Focused.</span>
        </motion.div>
      </div>
    </section>
  );
}
