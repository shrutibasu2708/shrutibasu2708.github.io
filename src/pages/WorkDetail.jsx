import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from '../components/Navbar';
import { work } from '../content/work';

/* ─────────────────────────────────────────
   Lightbox — fullscreen overlay
───────────────────────────────────────── */
function Lightbox({ artifact, onClose }) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(17,16,16,0.92)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(1rem, 4vw, 3rem)',
        }}
      >
        {/* close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.5rem',
            all: 'unset',
            color: '#fff',
            fontSize: '1.5rem',
            cursor: 'pointer',
            lineHeight: 1,
            opacity: 0.7,
          }}
        >
          ✕
        </button>

        {/* content — stop propagation so clicking content doesn't close */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{ maxWidth: '90vw', maxHeight: '85vh', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
        >
          {artifact.type === 'image' && (
            <img
              src={artifact.src}
              alt={artifact.caption}
              style={{ maxWidth: '100%', maxHeight: '80vh', objectFit: 'contain', borderRadius: '4px' }}
            />
          )}
          {(artifact.type === 'pdf' || artifact.type === 'video') && (
            <iframe
              src={`https://drive.google.com/file/d/${artifact.driveId}/preview`}
              title={artifact.caption}
              allow="autoplay"
              style={{
                width: 'min(860px, 88vw)',
                height: artifact.type === 'pdf' ? 'min(680px, 80vh)' : 'min(480px, 60vh)',
                border: 'none',
                borderRadius: '4px',
                background: '#000',
              }}
            />
          )}
          {artifact.caption && (
            <p style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: '0.78rem',
              fontFamily: 'var(--font-body)',
              textAlign: 'center',
              margin: 0,
            }}>
              {artifact.caption}
            </p>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────
   Artifact thumbnail card
───────────────────────────────────────── */
function ArtifactCard({ artifact, onClick }) {
  const [hovered, setHovered] = useState(false);

  const isImage = artifact.type === 'image';
  const isPdf   = artifact.type === 'pdf';
  const isVideo = artifact.type === 'video';

  const iconLabel = isPdf ? 'PDF' : isVideo ? 'Video' : null;
  const icon      = isPdf ? '📄' : isVideo ? '▶' : null;

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        all: 'unset',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.6rem',
      }}
    >
      {/* thumbnail area */}
      <div
        style={{
          position: 'relative',
          aspectRatio: '16 / 10',
          background: 'var(--color-border)',
          border: `1px solid ${hovered ? 'var(--color-accent)' : 'var(--color-border-dark)'}`,
          borderRadius: '4px',
          overflow: 'hidden',
          transition: 'border-color 0.2s ease',
        }}
      >
        {isImage && (
          <img
            src={artifact.thumb || artifact.src}
            alt={artifact.caption}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease', transform: hovered ? 'scale(1.04)' : 'scale(1)' }}
          />
        )}
        {(isPdf || isVideo) && (
          <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: 'var(--color-surface)' }}>
            <span style={{ fontSize: '2rem', lineHeight: 1 }}>{icon}</span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-ink-muted)' }}>{iconLabel}</span>
          </div>
        )}
        {/* hover overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,77,0,0.08)', opacity: hovered ? 1 : 0, transition: 'opacity 0.2s ease', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-accent)', background: '#fff', padding: '0.3rem 0.75rem', borderRadius: '2px' }}>
            View
          </span>
        </div>
      </div>
      {/* caption */}
      {artifact.caption && (
        <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--color-ink-muted)', lineHeight: 1.5 }}>
          {artifact.caption}
        </p>
      )}
    </button>
  );
}

/* ─────────────────────────────────────────
   WorkDetail page
───────────────────────────────────────── */
export default function WorkDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [lightbox, setLightbox] = useState(null);

  const entry = work.find((w) => w.slug === slug);

  // Scroll to top on mount
  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!entry) {
    return (
      <>
        <Navbar />
        <div style={{ paddingTop: '8rem', textAlign: 'center', fontFamily: 'var(--font-body)', color: 'var(--color-ink-muted)' }}>
          <p>Work entry not found.</p>
          <button onClick={() => navigate('/', { state: { scrollTo: 'work' } })} style={{ all: 'unset', cursor: 'pointer', color: 'var(--color-accent)', textDecoration: 'underline', marginTop: '1rem', display: 'inline-block' }}>← Back</button>
        </div>
      </>
    );
  }

  const hasArtifacts = entry.artifacts && entry.artifacts.length > 0;

  return (
    <>
      <Navbar />

      {/* lightbox */}
      {lightbox !== null && (
        <Lightbox artifact={entry.artifacts[lightbox]} onClose={() => setLightbox(null)} />
      )}

      <main
        style={{
          paddingTop: 'clamp(5rem, 10vw, 8rem)',
          paddingBottom: 'clamp(4rem, 8vw, 7rem)',
          paddingLeft: 'clamp(1.2rem, 5vw, 6rem)',
          paddingRight: 'clamp(1.2rem, 5vw, 6rem)',
          minHeight: '100vh',
          background: 'var(--color-bg)',
        }}
      >
        {/* ── back link ── */}
        <button
          onClick={() => navigate('/', { state: { scrollTo: 'work' } })}
          style={{
            all: 'unset',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontFamily: 'var(--font-body)',
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--color-ink-muted)',
            marginBottom: 'clamp(2rem, 4vw, 3.5rem)',
            cursor: 'pointer',
          }}
        >
          <span style={{ fontSize: '1rem' }}>←</span> All Work
        </button>

        {/* ── role header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* type + period + location row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
            <span style={{ display: 'inline-flex', padding: '0.2rem 0.65rem', background: 'var(--color-pop)', borderRadius: '100px', fontFamily: 'var(--font-body)', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-ink)' }}>
              {entry.type}
            </span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-ink-muted)' }}>
              {entry.period} · {entry.location}
            </span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 3.2rem)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.025em', color: 'var(--color-ink)', margin: '0 0 0.3rem' }}>
            {entry.role}
          </h1>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1rem, 1.8vw, 1.3rem)', fontWeight: 600, fontStyle: 'italic', color: 'var(--color-accent)', margin: '0 0 clamp(1.5rem, 3vw, 2.5rem)' }}>
            {entry.company}
          </p>

          {/* stat callouts */}
          {entry.stats.length > 0 && (
            <div style={{ display: 'flex', gap: '1px', background: 'var(--color-border)', border: '1px solid var(--color-border)', marginBottom: 'clamp(2rem, 4vw, 3rem)', maxWidth: '640px' }}>
              {entry.stats.map((stat, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem', padding: '1rem 1.25rem', background: 'var(--color-surface)' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 2.2vw, 1.9rem)', fontWeight: 700, color: 'var(--color-accent)', lineHeight: 1 }}>{stat.value}</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--color-ink-muted)' }}>{stat.label}</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* ── content: description + bullets + tools ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(2rem, 4vw, 4rem)',
            marginBottom: 'clamp(3rem, 6vw, 5rem)',
            borderTop: '1px solid var(--color-border)',
            paddingTop: 'clamp(2rem, 4vw, 3rem)',
          }}
        >
          {/* description */}
          <div>
            <p style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-ink-muted)', marginBottom: '1rem' }}>Overview</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.9rem, 1.3vw, 1rem)', lineHeight: 1.85, color: 'var(--color-ink)', opacity: 0.85 }}>
              {entry.description}
            </p>
          </div>

          {/* bullets + tools */}
          <div>
            <p style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-ink-muted)', marginBottom: '1rem' }}>What I Did</p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.75rem' }}>
              {entry.bullets.map((bullet, i) => (
                <li key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', fontFamily: 'var(--font-body)', fontSize: '0.88rem', lineHeight: 1.75, color: 'var(--color-ink-muted)' }}>
                  <span style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: '0.35rem', fontSize: '0.55rem' }}>✦</span>
                  {bullet}
                </li>
              ))}
            </ul>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {entry.tools.map((tool) => (
                <span key={tool} style={{ display: 'inline-flex', padding: '0.3rem 0.7rem', border: '1px solid var(--color-border)', borderRadius: '4px', fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-ink-muted)', background: 'var(--color-surface)' }}>
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── artifacts gallery ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 'clamp(2rem, 4vw, 3rem)' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-ink-muted)', marginBottom: hasArtifacts ? '1.75rem' : '1rem' }}>
              Artifacts
            </p>

            {hasArtifacts ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 'clamp(1rem, 2vw, 1.75rem)' }}>
                {entry.artifacts.map((artifact, i) => (
                  <ArtifactCard key={i} artifact={artifact} onClick={() => setLightbox(i)} />
                ))}
              </div>
            ) : (
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'var(--color-ink-muted)', opacity: 0.6, fontStyle: 'italic' }}>
                Artifacts coming soon.
              </p>
            )}
          </div>
        </motion.div>
      </main>
    </>
  );
}
