import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Loader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.to(bgRef.current, { opacity: 0, duration: 0.25, delay: 0.5 })
      .to(loaderRef.current, { opacity: 0, duration: 0.5, pointerEvents: 'none' });
  }, []);

  return (
    <div ref={loaderRef} className="pointer-events-none fixed top-0 right-0 w-screen h-[100dvh] z-[9999] flex items-center justify-center">
      <img src="https://www.lorisbukvic.graphics/icons/loader.svg" className="fixed top-[40px] lg:top-[50px] right-[10px] sm:right-[20px] lg:right-[50px] animate-spin" alt="Loader" />
      <div ref={bgRef} className="w-screen h-screen bg-black z-[9999] fixed top-0 right-0"></div>
    </div>
  );
}
