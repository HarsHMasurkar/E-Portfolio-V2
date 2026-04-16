/**
 * CustomCursor — Lusion-inspired magnetic cursor
 * Dot + ring that follows mouse, expands on hover
 */

import { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const ringPos = useRef({ x: 0, y: 0 });
  const mouse   = useRef({ x: 0, y: 0 });
  const rafId   = useRef(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      dot.style.left = `${e.clientX}px`;
      dot.style.top  = `${e.clientY}px`;
    };

    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = () => {
      ringPos.current.x = lerp(ringPos.current.x, mouse.current.x, 0.12);
      ringPos.current.y = lerp(ringPos.current.y, mouse.current.y, 0.12);
      ring.style.left = `${ringPos.current.x}px`;
      ring.style.top  = `${ringPos.current.y}px`;
      rafId.current = requestAnimationFrame(animate);
    };

    const onEnter = () => ring.classList.add('hovering');
    const onLeave = () => ring.classList.remove('hovering');

    document.addEventListener('mousemove', onMove);
    document.querySelectorAll('button, a, [data-hover]').forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    rafId.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
};

export default CustomCursor;
