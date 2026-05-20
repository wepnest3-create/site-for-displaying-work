import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { supabase } from '../services/supabaseClient';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id?: string;
  title: string;
  category: string;
  image_url: string;
  preview_url?: string;
  created_at?: string;
}

const fallbackProjects = [
  { title: "Wepnest Cloud", category: "SaaS Platform", image_url: "https://picsum.photos/seed/cloud/1200/800", created_at: "2024-01-01" },
  { title: "Luxury Store", category: "E-Commerce", image_url: "https://picsum.photos/seed/luxury/1200/800", created_at: "2024-01-01" },
  { title: "Tech Hub", category: "Web Application", image_url: "https://picsum.photos/seed/tech/1200/800", created_at: "2023-01-01" },
  { title: "Fintech App", category: "UI/UX Design", image_url: "https://picsum.photos/seed/fintech/1200/800", created_at: "2023-01-01" },
  { title: "Modern Portfolio", category: "Web Design", image_url: "https://picsum.photos/seed/folio/1200/800", created_at: "2023-01-01" },
  { title: "Brand Identity", category: "Branding", image_url: "https://picsum.photos/seed/identity/1200/800", created_at: "2023-01-01" },
  { title: "Landing Page X", category: "Marketing", image_url: "https://picsum.photos/seed/landing/1200/800", created_at: "2022-01-01" },
  { title: "Creative Studio", category: "Web Design", image_url: "https://picsum.photos/seed/studio/1200/800", created_at: "2022-01-01" }
];

export default function WorksPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [projects, setProjects] = useState<Project[]>([]);
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
        setProjects(fallbackProjects);
      } else {
        setProjects(data || []);
      }
      setIsLoading(false);
    };

    fetchWorks();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const ctx = gsap.context(() => {
      // Title Animation - Run once on mount
      gsap.fromTo(".page-title span", 
        { y: "110%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 1.5, ease: "expo.out", stagger: 0.15 }
      );

      // Subtitle Animation - Run once on mount
      gsap.fromTo(".page-subtitle",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 0.6 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const ctx = gsap.context(() => {
      // Projects Animation with ScrollTrigger - Run when data is ready
      gsap.fromTo(".work-item", 
        { y: 60, opacity: 0 }, 
        { 
          y: 0, 
          opacity: 1, 
          duration: 1.2, 
          ease: "expo.out",
          stagger: 0.05,
          scrollTrigger: {
            trigger: ".works-grid",
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isLoading, projects]);

  const getYear = (dateStr?: string) => {
    if (!dateStr) return "2024";
    return new Date(dateStr).getFullYear().toString();
  };

  return (
    <div ref={containerRef} className="__variable_88ffcb __variable_c59efa __variable_e86be0 bg-[#000] text-white min-h-screen selection:bg-white selection:text-black font-ppregular">
      <Navigation />
      
      {/* Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      <main className="w-full pt-[140px] md:pt-[200px] px-[10px] sm:px-[20px] lg:px-[50px] pb-[150px]">
        
        {/* Header Section */}
        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-end mb-[80px] md:mb-[120px] gap-12 z-10">
          <h1 className="page-title text-[40px] xs:text-[50px] sm:text-[80px] md:text-[100px] lg:text-[140px] font-intranet leading-[0.9] text-brightgray uppercase tracking-tighter overflow-visible">
            <div className="overflow-hidden">
              <span className="block">Wepnest</span>
            </div>
            <div className="overflow-hidden">
              <span className="block">Works</span>
            </div>
          </h1>
          <div className="page-subtitle flex flex-col gap-6 max-w-[350px] text-midgray font-ppsemibold text-[15px] md:text-[18px] leading-[150%]">
            <p className="opacity-80">A curated showcase of digital experiences, visual identities, and interactive designs crafted with precision and purpose by Wepnest.</p>
            <div className="flex items-center gap-4">
              <span className="w-12 h-[1px] bg-white/20"></span>
              <p className="text-[13px] uppercase tracking-[0.3em] opacity-40 font-ppsemibold">2021 — 2025</p>
            </div>
          </div>
        </div>

        {/* Projects Grid - 3 Columns for better landscape layout */}
        <div className="works-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 md:gap-y-24">
          {isLoading ? (
            <div className="col-span-full py-20 flex justify-center">
              <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
            </div>
          ) : projects.length > 0 ? (
            projects.map((project, i) => (
              <a 
                key={i} 
                href={project.preview_url || '#'} 
                target={project.preview_url ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className="work-item group cursor-pointer flex flex-col gap-5"
              >
                
                {/* Image Container */}
                <div className="relative w-full overflow-hidden rounded-[8px] md:rounded-[12px] bg-[#080808] aspect-video border border-white/5">
                  <img loading="lazy" 
                    src={project.image_url} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  
                  {/* View Button */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70px] h-[70px] bg-white/5 backdrop-blur-xl rounded-full flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-[0.6s] ease-[cubic-bezier(0.16,1,0.3,1)] border border-white/10">
                    <span className="text-white font-ppsemibold text-[10px] uppercase tracking-[0.2em]">View</span>
                  </div>
                </div>
                
                {/* Project Info */}
                <div className="flex flex-col gap-2 px-1">
                  <div className="flex justify-between items-start gap-2">
                    <h2 className="text-[20px] md:text-[24px] font-intranet text-brightgray uppercase leading-[1.1] tracking-tight group-hover:text-white transition-colors duration-500">
                      {project.title}
                    </h2>
                    <span className="text-[12px] font-ppsemibold text-midgray/40 tabular-nums">
                      {getYear(project.created_at)}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] font-ppsemibold text-midgray uppercase tracking-widest opacity-50">
                    <span>{project.category}</span>
                  </div>
                </div>
                
              </a>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-midgray font-ppsemibold opacity-40 uppercase tracking-widest">No works found in database.</p>
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="mt-[150px] md:mt-[200px] pt-[80px] border-t border-white/5 flex flex-col items-center text-center gap-10">
          <p className="text-midgray font-ppsemibold text-[13px] md:text-[15px] uppercase tracking-[0.4em] opacity-30">Keep Exploring</p>
          <Link to="/" className="group relative">
            <span className="text-[40px] md:text-[80px] font-intranet text-brightgray hover:text-white transition-colors duration-700 uppercase tracking-tight">
              Home
            </span>
            <div className="absolute -bottom-2 left-0 w-0 h-[1px] bg-white transition-all duration-700 ease-expo group-hover:w-full"></div>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
