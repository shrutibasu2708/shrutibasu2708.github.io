import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

// Reliable desktop pointer check — pointer:fine + hover:hover is the correct signal.
// maxTouchPoints is NOT reliable (Windows 10/11 reports >0 on non-touch machines).
function isRealPointer() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(-500);
  const y = useMotionValue(-500);

  const ringX = useSpring(x, { stiffness: 150, damping: 20, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 150, damping: 20, mass: 0.4 });

  useEffect(() => {
    if (!isRealPointer()) return;

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
    };
    const onEnter = (e) => {
      if (e.target instanceof Element && e.target.closest('a, button, [data-cursor]')) setHovered(true);
    };
    const onLeave = (e) => {
      if (e.target instanceof Element && e.target.closest('a, button, [data-cursor]')) setHovered(false);
    };

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseenter', onEnter, true);
    document.addEventListener('mouseleave', onLeave, true);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseenter', onEnter, true);
      document.removeEventListener('mouseleave', onLeave, true);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visible) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{
          x, y, translateX: '-50%', translateY: '-50%',
          position: 'fixed', top: 0, left: 0,
          zIndex: 9999, pointerEvents: 'none',
          width: 6, height: 6, borderRadius: '50%',
          background: 'var(--color-accent)',
        }}
      />
      <motion.div
        aria-hidden="true"
        style={{
          x: ringX, y: ringY, translateX: '-50%', translateY: '-50%',
          position: 'fixed', top: 0, left: 0,
          zIndex: 9998, pointerEvents: 'none',
          borderRadius: '50%',
          border: '1.5px solid var(--color-accent)',
        }}
        animate={{ width: hovered ? 52 : 34, height: hovered ? 52 : 34, opacity: hovered ? 0.45 : 0.65 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
      />
    </>
  );
}


