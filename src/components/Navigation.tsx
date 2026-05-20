import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

export default function Navigation() {
  const btnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.to(btnRef.current, {
      opacity: 1,
      pointerEvents: 'all',
      duration: 0.5,
      ease: 'linear',
      delay: 2
    });
  }, []);

  return (
    <>
      <Link to="/">
        <img alt="logo" src="https://res.cloudinary.com/dua3y4qmf/image/upload/v1771549371/Opera_Snapshot_2026-02-19_170204_app.kittl.com_oefwup.png" className="fixed top-[40px] left-[10px] sm:left-[20px] lg:left-[50px] lg:top-[50px] w-[50px] md:w-[70px] z-[500] mix-blend-screen" />
      </Link>
      
      <div ref={btnRef} className="opacity-0 pointer-events-none fixed top-[30px] lg:top-[40px] right-[10px] sm:right-[20px] lg:right-[50px] flex items-center gap-1 sm:gap-4 lg:gap-6 z-[90]">
        <Link to="/works" className="hidden xs:inline-block px-2 sm:px-4 py-2 text-white font-ppsemibold text-[10px] sm:text-xs lg:text-sm hover:opacity-50 transition-opacity duration-150 uppercase tracking-widest">
          Works
        </Link>
        <Link to="/portfolio" className="hidden xs:inline-block px-2 sm:px-4 py-2 text-white font-ppsemibold text-[10px] sm:text-xs lg:text-sm hover:opacity-50 transition-opacity duration-150 uppercase tracking-widest">
          Portfolio
        </Link>
        <Link to="/plans" className="hidden xs:inline-block px-2 sm:px-4 py-2 text-white font-ppsemibold text-[10px] sm:text-xs lg:text-sm hover:opacity-50 transition-opacity duration-150 uppercase tracking-widest">
          Plans
        </Link>
        
        <Link to="/plans" className="relative inline-block px-3 sm:px-4 lg:px-6 py-2 text-white group">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-[2px] border-l-[2px] border-[#FBFBFB80] rounded-tl-[10px]"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-[2px] border-r-[2px] border-[#FBFBFB80] rounded-tr-[10px]"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-[2px] border-l-[2px] border-[#FBFBFB80] rounded-bl-[10px]"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-[2px] border-r-[2px] border-[#FBFBFB80] rounded-br-[10px]"></div>
          <span className="text-[10px] sm:text-xs lg:text-sm font-ppsemibold">Contact</span>
        </Link>
      </div>
    </>
  );
}
