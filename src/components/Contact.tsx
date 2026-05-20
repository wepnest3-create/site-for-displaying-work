import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.innerWidth >= 768) {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 90%",
        end: "bottom 90%",
        scrub: true,
        animation: gsap.fromTo(containerRef.current, { height: "0vh" }, { height: "70vh", ease: "none" })
      });
    }
  }, []);

  return (
    <section className="relative w-full min-h-[50vh] md:min-h-[70vh] px-[10px] sm:px-[20px] lg:px-[25px] flex items-start justify-center md:overflow-hidden">
      <div ref={containerRef} className="relative w-full h-[50vh] md:h-[70vh] p-[2px] bg-gradient-to-b from-[#0C0E0F] to-[#4D4D4D] rounded-[16px] sm:rounded-[20px] md:rounded-[25px] opacity-100 md:overflow-hidden mb-[50px] md:mb-[0]">
        <div className="absolute inset-[2px] rounded-[14px] sm:rounded-[18px] md:rounded-[24px] overflow-hidden z-0">
          <img alt="contact bg" src="https://www.lorisbukvic.graphics/assets/contact_bg.webp" className="w-full min-h-[50vh] md:min-h-[70vh] max-h-[50vh] md:max-h-[70vh] h-[60vh] md:h-[89vh] object-cover object-[80%] md:object-[70%] xl:object-[85%]" />
          <div className="absolute bottom-0 w-full h-[200px] sm:h-[300px] md:h-[400px] bg-gradient-to-b from-transparent to-black/90 z-10"></div>
        </div>
        <div className="absolute md:inset-y-0 md:left-[3vw] lg:left-[5vw] xl:left-[13vw] z-20 md:min-h-[50vh] md:max-h-[70vh] md:h-[70vh] bottom-[-30px] sm:bottom-[-40px] left-1/2 -translate-x-1/2 md:translate-x-0 flex flex-col items-center justify-center w-full md:w-fit">
          <div className="flex items-center mb-[15px]">
            <div className="w-[65px] h-[65px] rounded-full p-[2.5px] flex items-center justify-center bg-gradient-to-b from-white to-midgray">
              <img alt="Wepnest Logo" src="https://res.cloudinary.com/dua3y4qmf/image/upload/v1771549371/Opera_Snapshot_2026-02-19_170204_app.kittl.com_oefwup.png" className="w-full h-full object-cover rounded-full bg-black" />
            </div>
            <div className="w-[65px] h-[65px] rounded-full p-[2.5px] flex items-center justify-center bg-gradient-to-b from-white to-midgray -ml-5">
              <img alt="Client" src="https://www.lorisbukvic.graphics/assets/client_icon.webp" className="w-full h-full object-cover rounded-full" />
            </div>
          </div>
          <p className="text-white font-intranet text-[14px] sm:text-[16px] lg:text-[23px] mb-[15px] sm:mb-[25px] text-center px-4">START YOUR PROJECT WITH WEPNEST</p>
          <Link to="/plans" className="group p-[0px] bg-gradient-to-b from-[#ECEEED] via-[#616362] to-[#92B2AD] rounded-full overflow-hidden hover:py-[5px] hover:px-[5px] transition-all duration-300 w-fit">
            <div className="relative flex items-center justify-center px-[30px] sm:px-[40px] md:px-[50px] py-[16px] sm:py-[20px] md:py-[25px] rounded-full transition-all duration-300 group-hover:py-[14px] sm:group-hover:py-[18px] md:group-hover:py-[20px] group-hover:px-[25px] sm:group-hover:px-[35px] md:group-hover:px-[45px] overflow-hidden">
              <div className="absolute inset-0 rounded-full pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-[#CFD3D2] to-[#636E6D] opacity-100 group-hover:opacity-0 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-[#636E6D] to-[#CFD3D2] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="absolute inset-0 rounded-full pointer-events-none group-hover:shadow-[inset_0_-5px_8px_rgba(0,0,0,0.4)] transition-shadow duration-300"></div>
              <p className="relative text-[16px] sm:text-[20px] md:text-[23px] translate-y-[0.5px] text-[#3A3A3A] font-ppsemibold overflow-hidden z-10 leading-[130%] group-hover:scale-[0.98] transition-all duration-300">
                <span className="absolute inset-0 z-0 text-black/10 blur-[1px]">Get in Touch</span>
                <span className="relative z-10">Get in Touch</span>
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
