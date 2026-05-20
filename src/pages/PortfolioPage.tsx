import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { supabase } from '../services/supabaseClient';

gsap.registerPlugin(ScrollTrigger);

interface Work {
  id?: string;
  title: string;
  category: string;
  image_url: string;
  preview_url?: string;
}

const fallbackItems: Work[] = [
  { title: "E-Commerce Ecosystem", category: "Development", image_url: "https://picsum.photos/seed/shop/800/1000" },
  { title: "SaaS Landing Page", category: "Web Design", image_url: "https://picsum.photos/seed/saas/800/600" },
  { title: "Corporate Branding", category: "Logo Design", image_url: "https://picsum.photos/seed/brand/800/1200" },
  { title: "Mobile App Interface", category: "UI/UX", image_url: "https://picsum.photos/seed/app/800/800" },
  { title: "Real Estate Portal", category: "Full-Stack", image_url: "https://picsum.photos/seed/house/800/1100" },
  { title: "Portfolio for Creators", category: "Web Design", image_url: "https://picsum.photos/seed/art/800/700" },
];

export default function PortfolioPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<Work[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWorks = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('works')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching works:', error);
        setItems(fallbackItems);
      } else {
        setItems(data || []);
      }
      setIsLoading(false);
    };

    fetchWorks();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.fromTo(".page-title span", 
        { y: "110%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 1.5, ease: "expo.out", stagger: 0.15 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (isLoading) return;
    
    const ctx = gsap.context(() => {
      gsap.fromTo(".portfolio-item", 
        { y: 100, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1.2, 
          ease: "expo.out", 
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".portfolio-grid",
            start: "top 85%"
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [isLoading, items]);

  return (
    <div ref={containerRef} className="bg-[#000] text-white min-h-screen selection:bg-white selection:text-black font-ppregular">
      <Navigation />
      <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      <main className="w-full pt-[140px] md:pt-[200px] px-[10px] sm:px-[20px] lg:px-[50px] pb-[150px]">
        
        {/* Hero Section with Blob Logo */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-[100px] md:mb-[150px]">
          <div className="relative w-full max-w-[400px] md:max-w-[500px] aspect-square group">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
              <defs>
                <clipPath id="blobClip">
                  <path 
                    d="M43.1,-68.5C56.2,-58.6,67.5,-47.3,72.3,-33.9C77.2,-20.5,75.5,-4.9,74.2,11.3C72.9,27.6,71.9,44.5,63.8,57.2C55.7,69.8,40.6,78.2,25.5,79.2C10.4,80.1,-4.7,73.6,-20.9,69.6C-37.1,65.5,-54.5,63.9,-66,54.8C-77.5,45.8,-83.2,29.3,-85.7,12.3C-88.3,-4.8,-87.7,-22.3,-79.6,-34.8C-71.5,-47.3,-55.8,-54.9,-41.3,-64.2C-26.7,-73.6,-13.4,-84.7,0.8,-86C15,-87.2,29.9,-78.5,43.1,-68.5Z"
                    transform="translate(100 100)"
                  />
                </clipPath>
              </defs>
              
              <g className="transition-transform duration-500 ease-out group-hover:scale-[1.05] origin-center">
                <image 
                  href="https://res.cloudinary.com/dua3y4qmf/image/upload/v1771549371/Opera_Snapshot_2026-02-19_170204_app.kittl.com_oefwup.png"
                  width="200" height="200"
                  preserveAspectRatio="xMidYMid slice"
                  clipPath="url(#blobClip)"
                  className="mix-blend-screen"
                />
                
                <path
                  id="textPathCircle"
                  d="M43.1,-68.5C56.2,-58.6,67.5,-47.3,72.3,-33.9C77.2,-20.5,75.5,-4.9,74.2,11.3C72.9,27.6,71.9,44.5,63.8,57.2C55.7,69.8,40.6,78.2,25.5,79.2C10.4,80.1,-4.7,73.6,-20.9,69.6C-37.1,65.5,-54.5,63.9,-66,54.8C-77.5,45.8,-83.2,29.3,-85.7,12.3C-88.3,-4.8,-87.7,-22.3,-79.6,-34.8C-71.5,-47.3,-55.8,-54.9,-41.3,-64.2C-26.7,-73.6,-13.4,-84.7,0.8,-86C15,-87.2,29.9,-78.5,43.1,-68.5Z"
                  transform="translate(100 100)"
                  fill="none"
                  stroke="none"
                />

                <text className="text-[5.5px] font-ppsemibold uppercase tracking-[2.5px] fill-white/40 group-hover:fill-white transition-colors duration-500">
                  <textPath href="#textPathCircle" startOffset="0%">
                    WEPNEST DIGITAL SOLUTIONS • PREMIUM CODE • HIGH-END DESIGN • INNOVATIVE TECH • WEPNEST DIGITAL SOLUTIONS • PREMIUM CODE • HIGH-END DESIGN • INNOVATIVE TECH •
                    <animate attributeName="startOffset" from="0%" to="100%" dur="30s" repeatCount="indefinite" />
                  </textPath>
                  <textPath href="#textPathCircle" startOffset="100%">
                    WEPNEST DIGITAL SOLUTIONS • PREMIUM CODE • HIGH-END DESIGN • INNOVATIVE TECH • WEPNEST DIGITAL SOLUTIONS • PREMIUM CODE • HIGH-END DESIGN • INNOVATIVE TECH •
                    <animate attributeName="startOffset" from="-100%" to="0%" dur="30s" repeatCount="indefinite" />
                  </textPath>
                </text>
              </g>
            </svg>
          </div>

          <div className="flex flex-col gap-8 flex-1">
            <h1 className="page-title text-[36px] xs:text-[50px] sm:text-[80px] md:text-[100px] lg:text-[120px] font-intranet leading-[0.85] text-brightgray uppercase tracking-tighter overflow-visible">
              <div className="overflow-hidden"><span className="block">Crafting</span></div>
              <div className="overflow-hidden"><span className="block">Digital</span></div>
              <div className="overflow-hidden"><span className="block">Excellence</span></div>
            </h1>
            <div className="max-w-[600px] flex flex-col gap-6 text-midgray font-ppsemibold text-[16px] md:text-[20px] leading-relaxed opacity-80">
              <p>
                At Wepnest, we don't just build websites; we engineer digital experiences. Our expertise lies at the intersection of professional programming and high-end aesthetic design.
              </p>
              <p>
                Every line of code is written with performance and scalability in mind, while every pixel is placed to ensure your brand commands the attention it deserves in the digital landscape.
              </p>
            </div>
            
            <a 
              href="https://www.instagram.com/wepnest" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-4 w-fit px-6 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-white hover:text-black transition-all duration-500 group"
            >
              <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform duration-500" />
              <span className="text-[13px] font-ppsemibold uppercase tracking-[0.2em]">Follow Wepnest</span>
            </a>
          </div>
        </div>

        <div className="portfolio-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {isLoading ? (
            <div className="col-span-full py-20 flex justify-center">
              <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
            </div>
          ) : items.length > 0 ? (
            items.map((item, i) => (
              <a 
                key={i} 
                href={item.preview_url || '#'} 
                target={item.preview_url ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className="portfolio-item group cursor-pointer flex flex-col gap-6"
              >
                <div className="relative w-full overflow-hidden rounded-[15px] bg-[#0A0A0A] border border-white/5">
                  <img loading="lazy" 
                    src={item.image_url} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                </div>
                <div className="flex flex-col gap-1 px-2">
                  <h2 className="text-[24px] md:text-[30px] font-intranet text-brightgray uppercase group-hover:text-white transition-colors duration-500">{item.title}</h2>
                  <p className="text-[14px] font-ppsemibold text-midgray uppercase tracking-widest opacity-50">{item.category}</p>
                </div>
              </a>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-midgray font-ppsemibold opacity-40 uppercase tracking-widest">No works found in database.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
