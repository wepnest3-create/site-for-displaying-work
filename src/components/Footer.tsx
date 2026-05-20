import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram } from 'lucide-react';

export default function Footer() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-GB', { hour12: false, hour: '2-digit', minute: '2-digit' }) + ' [HU]');
    };
    updateTime();
    const int = setInterval(updateTime, 1000);
    return () => clearInterval(int);
  }, []);

  return (
    <section className="p-[20px] sm:p-[30px] md:p-[50px] flex items-center lg:justify-between lg:items-end flex-col lg:flex-row gap-[30px] sm:gap-[40px] lg:gap-[0px]">
      <div className="flex lg:items-end flex-col lg:flex-row w-fit gap-[70px] lg:gap-[0px]">
        <div className="flex flex-col gap-[26px] items-center justify-center">
          <Link to="/works">
            <div className="group relative w-[120px] h-[90px] [perspective:1000px] overflow-visible cursor-pointer">
              <img alt="backplate" src="https://www.lorisbukvic.graphics/assets/folder/folder_back.png" className="w-[120px] h-[90px] object-contain group-hover:translate-y-[2px] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]" />
              <img alt="thumb" src="https://picsum.photos/seed/cloud/800/1000" className="absolute top-[-40px] left-[10px] w-[100px] h-[130px] scale-[0.6] rotate-[-5deg] object-cover origin-bottom transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] border border-midgray rounded-[10px] group-hover:top-[-60px] group-hover:rotate-[-15deg] opacity-0 group-hover:opacity-100" />
              <img alt="thumb" src="https://picsum.photos/seed/luxury/800/1000" className="absolute top-[-40px] left-[10px] w-[100px] h-[130px] scale-[0.65] rotate-[5deg] object-cover origin-bottom transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] border border-midgray rounded-[10px] group-hover:top-[-70px] group-hover:rotate-[15deg] opacity-0 group-hover:opacity-100" />
              <img alt="frontplate" src="https://www.lorisbukvic.graphics/assets/folder/folder_front.png" className="absolute top-2 left-1/2 -translate-x-1/2 min-w-[125px] min-h-full object-contain origin-bottom transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:[transform:translateX(-50%)_rotateX(-60deg)]" />
            </div>
          </Link>
          <p className="font-intranet text-[18px] text-midgray leading-[100%]">WEPNEST PROJECTS</p>
        </div>
      </div>

      <div className="flex flex-col items-center lg:items-start gap-4">
        <a 
          href="https://www.instagram.com/wepnest" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-midgray hover:text-white transition-colors duration-300 group"
        >
          <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
          <span className="text-[12px] font-ppsemibold uppercase tracking-[0.2em]">@wepnest</span>
        </a>
      </div>

      <div className="flex flex-col gap-[2px] text-center w-fit lg:text-left">
        <p className="text-[14px] leading-[100%] translate-y-[2.5px] font-intranet text-midgray min-h-[14px]">{time}</p>
        <div className="flex gap-[5px] items-center">
          <div className="w-[10px] h-[10px] p-[4px] rounded-full bg-gradient-to-b from-[#0FFF2F] to-[#84FF6F] shadow-[0_0_10px_0.2px_#0FFF2F]">
            <div className="w-full h-full rounded-full bg-gradient-to-b from-[#6CFF6C] to-[#23FF1F]"></div>
          </div>
          <p className="text-[14px] leading-[100%] translate-y-[2.5px] font-intranet text-midgray uppercase">Wepnest is online</p>
        </div>
      </div>
    </section>
  );
}
