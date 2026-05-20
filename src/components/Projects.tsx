import { useEffect, useRef, useState, memo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { supabase } from '../services/supabaseClient';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id?: string;
  title: string;
  category: string;
  image_url: string;
}

const fallbackProjects: Project[] = [
  { title: "WEPNEST CLOUD", category: "SaaS Platform", image_url: "https://picsum.photos/seed/cloud/1200/800" },
  { title: "LUXURY STORE", category: "E-Commerce", image_url: "https://picsum.photos/seed/luxury/1200/800" },
  { title: "TECH HUB", category: "Web Application", image_url: "https://picsum.photos/seed/tech/1200/800" },
  { title: "FINTECH APP", category: "UI/UX Design", image_url: "https://picsum.photos/seed/fintech/1200/800" },
  { title: "MODERN FOLIO", category: "Web Design", image_url: "https://picsum.photos/seed/folio/1200/800" },
  { title: "BRAND IDENTITY", category: "Branding", image_url: "https://picsum.photos/seed/identity/1200/800" },
  { title: "LANDING PAGE X", category: "Marketing", image_url: "https://picsum.photos/seed/landing/1200/800" },
  { title: "CREATIVE STUDIO", category: "Web Design", image_url: "https://picsum.photos/seed/studio/1200/800" },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      // Smart fetching: Prioritize featured projects, limit to 6 for home page
      const { data, error } = await supabase
        .from('works')
        .select('title, category, image_url')
        .eq('is_featured', true)
        .order('created_at', { ascending: false })
        .limit(6);
      
      if (error) {
        console.error('Error fetching featured projects:', error);
        setProjects(fallbackProjects.slice(0, 6));
      } else if (data && data.length > 0) {
        setProjects(data);
      } else {
        // Fallback: Fetch the 6 most recent works if no featured ones exist
        const { data: latestWorks } = await supabase
          .from('works')
          .select('title, category, image_url')
          .order('created_at', { ascending: false })
          .limit(6);
          
        if (latestWorks && latestWorks.length > 0) {
          setProjects(latestWorks);
        } else {
          setProjects([]);
        }
      }
      setIsLoading(false);
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top+=100 80%",
          once: true
        }
      });

      tl.fromTo(".project-row", { y: 50, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power3.out" });
    }, sectionRef);

    return () => ctx.revert();
  }, [isLoading, projects]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !imageRef.current || !activeImage) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(imageRef.current, {
      x: x - 250, // Adjusted for wider image (assuming width 500)
      y: y - 150, // Adjusted for landscape height
      rotationX: (y - rect.height / 2) / 30,
      rotationY: -(x - rect.width / 2) / 30,
      duration: 0.8,
      ease: "power3.out"
    });
  };

  const handleMouseEnter = (image: string) => {
    setActiveImage(image);
    if (imageRef.current) {
      gsap.fromTo(imageRef.current, 
        { scale: 0.8, opacity: 0, rotationZ: gsap.utils.random(-5, 5) }, 
        { scale: 1, opacity: 1, rotationZ: 0, duration: 0.5, ease: "back.out(1.5)" }
      );
    }
  };

  const handleMouseLeave = () => {
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 0.3,
        onComplete: () => setActiveImage(null)
      });
    } else {
      setActiveImage(null);
    }
  };

  return (
    <section ref={sectionRef} className="px-[10px] sm:px-[20px] pt-[50px] lg:px-[50px] xl:pt-[50px] xl:pb-[100px]">
      <p className="text-[18px] sm:text-[23px] text-midgray font-intranet opacity-80 mb-[50px] leading-[130%]">selected<br/>projects</p>
      
      <div 
        ref={containerRef}
        className="relative flex flex-col w-full border-t border-zinc-900/50" 
        style={{ perspective: '1000px' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {isLoading ? (
          <div className="py-20 flex justify-center">
            <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
          </div>
        ) : projects.length > 0 ? (
          projects.map((project, i) => (
            <div 
              key={i} 
              className="project-row flex items-center justify-between w-full py-6 md:py-10 border-b border-zinc-900/50 opacity-50 hover:!opacity-100 duration-300 transition-opacity cursor-pointer z-10 group"
              onMouseEnter={() => handleMouseEnter(project.image_url)}
            >
              <p className="text-3xl md:text-5xl lg:text-7xl text-brightgray font-intranet uppercase tracking-tighter group-hover:translate-x-4 transition-transform duration-500">{project.title}</p>
              <p className="text-sm md:text-lg text-midgray font-ppsemibold hidden sm:block group-hover:-translate-x-4 transition-transform duration-500">{project.category}</p>
            </div>
          ))
        ) : (
          <div className="py-20 text-center">
            <p className="text-midgray font-ppsemibold opacity-40 uppercase tracking-widest">No featured projects found.</p>
          </div>
        )}

        {/* Floating Image */}
        <div className="pointer-events-none absolute top-0 left-0 w-full h-full z-0 overflow-visible">
           <img 
              ref={imageRef}
              src={activeImage || undefined} 
               className="absolute top-0 left-0 w-[250px] sm:w-[350px] md:w-[500px] aspect-video rounded-[13px] shadow-2xl object-cover opacity-0 border border-white/10"
              style={{ display: activeImage ? 'block' : 'none', transformOrigin: 'center center' }}
              alt="Project preview"
            />
        </div>
      </div>
    </section>
  );
}
