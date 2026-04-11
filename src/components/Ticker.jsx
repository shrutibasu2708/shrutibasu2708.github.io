import { rowOne, rowTwo, sep } from '../content/ticker';

/* Triple the items so the -33.333% keyframe shift is seamless at any viewport */
function buildTrack(items) {
  const chunk = items.map(t => `${t} ${sep}`).join('   ');
  return `${chunk}   ${chunk}   ${chunk}`;
}

const trackOne = buildTrack(rowOne);
const trackTwo = buildTrack(rowTwo);

/* Shared row wrapper with edge-fade mask */
function TickerRow({ children, direction, duration, bg, border }) {
  return (
    <div
      style={{
        overflow: 'hidden',
        background: bg,
        borderBottom: border ? '1px solid rgba(255,255,255,0.07)' : 'none',
        /* fade first/last ~4% to transparent — works at any viewport width */
        WebkitMaskImage:
          'linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)',
        maskImage:
          'linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)',
      }}
      onMouseEnter={e => {
        e.currentTarget.querySelector('span').style.animationPlayState = 'paused';
      }}
      onMouseLeave={e => {
        e.currentTarget.querySelector('span').style.animationPlayState = 'running';
      }}
    >
      <div style={{ padding: '1.1rem 0', display: 'flex' }}>
        <span
          style={{
            display: 'inline-block',
            whiteSpace: 'nowrap',
            flexShrink: 0,
            animation: `${direction} ${duration} linear infinite`,
            willChange: 'transform',
          }}
        >
          {children}
        </span>
      </div>
    </div>
  );
}

export default function Ticker() {
  return (
    <div
      aria-hidden="true"
      style={{
        background: 'var(--color-ink)',
        userSelect: 'none',
      }}
    >
      {/* ── Row 1 — disciplines, forward ── */}
      <TickerRow direction="ticker-fwd" duration="32s" bg="var(--color-ink)" border>
        {rowOne.concat(rowOne).concat(rowOne).map((item, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '1.25rem', marginRight: '1.25rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.78rem, 2.5vw, 1rem)',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#fff',
              }}
            >
              {item}
            </span>
            <span style={{ color: 'var(--color-accent)', fontSize: '0.55rem', verticalAlign: 'middle' }}>✦</span>
          </span>
        ))}
      </TickerRow>

      {/* ── Row 2 — tools, reverse ── */}
      <TickerRow direction="ticker-rev" duration="24s" bg="var(--color-pop)" border={false}>
        {rowTwo.concat(rowTwo).concat(rowTwo).map((item, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '1.25rem', marginRight: '1.25rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(0.78rem, 2.5vw, 1rem)',
                fontWeight: 600,
                fontStyle: 'italic',
                letterSpacing: '0.03em',
                color: 'var(--color-ink)',
              }}
            >
              {item}
            </span>
            <span style={{ color: 'var(--color-accent)', fontSize: '0.55rem', verticalAlign: 'middle' }}>✦</span>
          </span>
        ))}
      </TickerRow>
    </div>
  );
}

