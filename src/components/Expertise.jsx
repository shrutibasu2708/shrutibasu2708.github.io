import { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { skills, problems } from '../content/expertise';

function ProblemCard({ number, question, answer, tools, index, visible }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2rem',
        background: hovered ? 'var(--color-surface)' : 'var(--color-bg)',
        borderTop: `3px solid ${hovered ? 'var(--color-accent)' : 'transparent'}`,
        transition: 'background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? '0 16px 40px rgba(17,16,16,0.1)' : 'none',
        cursor: 'default', position: 'relative', zIndex: hovered ? 1 : 0,
      }}
    >
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.15rem, 2vw, 1.45rem)', fontWeight: 700, lineHeight: 1.2, color: 'var(--color-ink)', margin: 0 }}>{question}</h3>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', lineHeight: 1.75, color: 'var(--color-ink-muted)', margin: 0, flex: 1 }}>{answer}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
        {tools.map(t => (
          <span key={t} style={{ padding: '0.25rem 0.65rem', border: '1px solid var(--color-border)', borderRadius: '4px', fontFamily: 'var(--font-body)', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-ink-muted)' }}>{t}</span>
        ))}
      </div>
    </motion.div>
  );
}

const RADIUS = 32;
const CENTER_R = 11;

function nodePos(i) {
  const a = (i * 45 - 90) * (Math.PI / 180);
  return { x: 50 + RADIUS * Math.cos(a), y: 50 + RADIUS * Math.sin(a) };
}
function hubEdgePos(i) {
  const a = (i * 45 - 90) * (Math.PI / 180);
  return { x: 50 + CENTER_R * Math.cos(a), y: 50 + CENTER_R * Math.sin(a) };
}

function RadialDial({ active, setActive, visible }) {
  return (
    <div style={{ position: 'relative', width: '100%', paddingBottom: '100%' }}>
      <div style={{ position: 'absolute', inset: 0 }}>
        <motion.svg viewBox="0 0 100 100" initial={{ opacity: 0 }} animate={visible ? { opacity: 1 } : {}} transition={{ delay: 0.1, duration: 0.7 }} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          <circle cx="50" cy="50" r={RADIUS} fill="none" stroke="rgba(17,16,16,0.07)" strokeWidth="0.3" strokeDasharray="1.5 2.5" />
          {skills.map((_, i) => {
            const { x, y } = nodePos(i);
            const hub = hubEdgePos(i);
            return <line key={i} x1={hub.x} y1={hub.y} x2={x} y2={y} stroke={active === i ? 'rgba(255,77,0,0.5)' : 'rgba(17,16,16,0.1)'} strokeWidth={active === i ? '0.55' : '0.25'} style={{ transition: 'stroke 0.25s ease, stroke-width 0.25s ease' }} />;
          })}
        </motion.svg>
        {/* Pulsing ring */}
        <motion.div
          animate={{ scale: [1, 1.45, 1], opacity: [0.35, 0, 0.35] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          style={{ position: 'absolute', left: 'calc(50% - 11%)', top: 'calc(50% - 11%)', width: '22%', height: '22%', borderRadius: '50%', border: '2px solid var(--color-pop)', pointerEvents: 'none', zIndex: 1 }}
        />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={visible ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: 0.15, type: 'spring', stiffness: 280, damping: 22 }}
          style={{ position: 'absolute', left: 'calc(50% - 11%)', top: 'calc(50% - 11%)', width: '22%', height: '22%', borderRadius: '50%', background: 'var(--color-pop)', border: '2px solid rgba(212,242,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, boxShadow: '0 0 0 4px rgba(212,242,0,0.12), 0 0 28px rgba(212,242,0,0.25), 0 4px 20px rgba(17,16,16,0.15)' }}
        >
          <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'clamp(0.7rem, 1.6vw, 1rem)', fontWeight: 700, color: 'var(--color-ink)', textAlign: 'center', lineHeight: 1.2 }}>Full<br />Funnel</span>
        </motion.div>
        {skills.map((skill, i) => {
          const { x, y } = nodePos(i);
          const isActive = active === i;
          return (
            <div key={i} style={{ position: 'absolute', left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)', zIndex: 3 }}>
              <button onMouseEnter={() => setActive(i)} onClick={() => setActive(i)} style={{ all: 'unset', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-label={skill.title}>
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={visible ? { scale: 1, opacity: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.07, type: 'spring', stiffness: 350, damping: 26 }}
                  style={{ width: 'clamp(110px, 19vw, 148px)', height: 'clamp(110px, 19vw, 148px)', borderRadius: '50%', border: `2px solid ${isActive ? 'var(--color-accent)' : 'rgba(17,16,16,0.15)'}`, background: isActive ? 'var(--color-accent)' : 'var(--color-bg)', boxShadow: isActive ? '0 0 0 6px rgba(255,77,0,0.12)' : '0 2px 10px rgba(17,16,16,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.25s ease', padding: '10px' }}
                >
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.68rem, 1.2vw, 0.88rem)', fontWeight: 700, color: isActive ? '#fff' : 'var(--color-ink)', transition: 'color 0.25s ease', userSelect: 'none', textAlign: 'center', lineHeight: 1.3, letterSpacing: '0.01em' }}>{skill.title}</span>
                </motion.div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DetailPanel({ skill }) {
  return (
    <div>
      <AnimatePresence mode="wait">
        <motion.div
          key={skill.number}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', flexDirection: 'column', border: '1px solid var(--color-border)', background: 'var(--color-surface)', overflow: 'hidden' }}
        >
          <div style={{ background: 'var(--color-ink)', padding: '2rem 2.5rem 1.75rem', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
            <span style={{ position: 'absolute', top: '-1.5rem', right: '-0.5rem', fontFamily: 'var(--font-display)', fontSize: '8rem', fontWeight: 700, lineHeight: 1, color: 'rgba(255,255,255,0.04)', userSelect: 'none', pointerEvents: 'none' }}>{skill.number}</span>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 2.6vw, 2.4rem)', fontWeight: 700, lineHeight: 1.05, color: '#fff', margin: 0 }}>{skill.title}</h3>
          </div>
          <div style={{ padding: '2rem 2.5rem', display: 'flex', flexDirection: 'column' }}>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0', margin: 0, padding: 0 }}>
              {skill.items.map((item, idx) => (
                <li key={item} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', fontFamily: 'var(--font-body)', fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--color-ink)', padding: '0.85rem 0', borderBottom: idx < skill.items.length - 1 ? '1px solid var(--color-border)' : 'none' }}>
                  <span style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: '0.35rem', fontSize: '0.45rem' }}>✦</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function MobileSkill({ number, title, items }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid var(--color-border)' }}>
      <button onClick={() => setOpen(prev => !prev)} style={{ all: 'unset', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.1rem 0', cursor: 'pointer' }}>
        <span style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-accent)' }}>{number}</span>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-ink)' }}>{title}</span>
        </span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }} style={{ color: 'var(--color-accent)', fontSize: '1.2rem', lineHeight: 1, display: 'block', flexShrink: 0 }}>+</motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: 'easeInOut' }} style={{ overflow: 'hidden', paddingBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {items.map(item => (
              <li key={item} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', fontFamily: 'var(--font-body)', fontSize: '0.82rem', lineHeight: 1.6, color: 'var(--color-ink-muted)' }}>
                <span style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: '0.3rem', fontSize: '0.5rem' }}>✦</span>
                {item}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Expertise() {
  const [activeSkill, setActiveSkill] = useState(0);
  const headerRef  = useRef(null);
  const problemRef = useRef(null);
  const dialRef    = useRef(null);
  const thinkRef   = useRef(null);
  const headerInView  = useInView(headerRef,  { once: true, margin: '-60px' });
  const problemInView = useInView(problemRef, { once: true, margin: '-80px' });
  const dialInView    = useInView(dialRef,    { once: true, margin: '-80px' });
  const thinkInView   = useInView(thinkRef,   { once: true, margin: '-80px' });

  const steps = [
    {
      number: '01',
      title: 'Diagnose',
      subtitle: 'Find what\'s actually broken',
      body: 'I start in your funnel data, not in a slide deck. I map your customer journey, identify drop-off points, and audit your channels to understand where the real problem is — before touching a single campaign.',
    },
    {
      number: '02',
      title: 'Hypothesize',
      subtitle: 'Build a testable thesis',
      body: 'Growth assumptions without evidence are expensive guesses. I form a specific, testable hypothesis about what\'s limiting performance — then design a low-cost experiment to validate it before scaling spend.',
    },
    {
      number: '03',
      title: 'Execute',
      subtitle: 'Ship fast, measure everything',
      body: 'Campaigns go live with tracking in place before launch — not after. I use GA4, CRM dashboards, and platform analytics to track performance in real time, not in a Monday morning report.',
    },
    {
      number: '04',
      title: 'Scale',
      subtitle: 'Double down on what works',
      body: 'Once a tactic is validated, I build a repeatable system around it. Budget moves toward what\'s proven. Underperformers get cut. The result: compounding growth, not constant reinvention.',
    },
  ];

  return (
    <section id="expertise" style={{ background: 'var(--color-bg)', paddingTop: 'clamp(3rem, 6vw, 5rem)', paddingBottom: 'clamp(4rem, 8vw, 7rem)' }}>
      <div className="page-x">
        <div ref={headerRef} style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <motion.p className="eyebrow" initial={{ opacity: 0, x: -16 }} animate={headerInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.45 }}>What I Do Best</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 5vw, 3.75rem)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--color-ink)', margin: 0 }}>
            Your problem.<br /><em style={{ color: 'var(--color-accent)', fontStyle: 'italic' }}>My speciality.</em>
          </motion.h2>
        </div>
        <div ref={problemRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1px', background: 'var(--color-border)', border: '1px solid var(--color-border)' }}>
          {problems.map((p, i) => <ProblemCard key={p.number} {...p} index={i} visible={problemInView} />)}
        </div>
        <div ref={dialRef} style={{ marginTop: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <motion.p className="eyebrow" initial={{ opacity: 0, x: -16 }} animate={dialInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.45 }}>What I Specialise In</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={dialInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--color-ink)', margin: '0 0 clamp(1.25rem, 2.5vw, 2rem)' }}>
            Deep in the craft.<br /><em style={{ color: 'var(--color-accent)', fontStyle: 'italic' }}>Broad across the funnel.</em>
          </motion.h2>
          <div className="hidden md:grid" style={{ gridTemplateColumns: '3fr 2fr', gap: '3rem', alignItems: 'center' }}>
            <RadialDial active={activeSkill} setActive={setActiveSkill} visible={dialInView} />
            <DetailPanel skill={skills[activeSkill]} />
          </div>
          <div className="md:hidden" style={{ borderTop: '1px solid var(--color-border)' }}>
            {skills.map(skill => <MobileSkill key={skill.number} {...skill} />)}
          </div>
        </div>

        {/* ── How I Think ── */}
        <div ref={thinkRef}>
          <motion.p className="eyebrow" initial={{ opacity: 0, x: -16 }} animate={thinkInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.45 }}>How I Think</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={thinkInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--color-ink)', margin: '0 0 clamp(2rem, 4vw, 3.5rem)' }}>
            My approach to growth.<br /><em style={{ color: 'var(--color-accent)', fontStyle: 'italic' }}>Not gut-feel. Evidence.</em>
          </motion.h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1px', background: 'var(--color-border)', border: '1px solid var(--color-border)' }}>
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                animate={thinkInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2rem', background: 'var(--color-bg)' }}
              >
                <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '2.2rem', fontWeight: 700, lineHeight: 1, color: 'rgba(17,16,16,0.08)' }}>{step.number}</span>
                <div>
                  <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.05rem', color: 'var(--color-ink)', margin: '0 0 0.2rem' }}>{step.title}</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-accent)', margin: 0 }}>{step.subtitle}</p>
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', lineHeight: 1.75, color: 'var(--color-ink-muted)', margin: 0 }}>{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
