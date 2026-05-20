import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experienceData = [
  {
    title: "expertise",
    content: <p className="text-[16px] sm:text-[18px] text-brightgray max-w-[300px] lg:max-w-[450px]">Full-Stack Development / E-Commerce Solutions / UI/UX Design / Brand Strategy / Performance Optimization / SEO</p>
  },
  {
    title: "tech stack",
    content: <p className="text-[16px] sm:text-[18px] text-brightgray max-w-[300px] lg:max-w-[450px]">React / Next.js / TypeScript / Node.js / Shopify / Tailwind CSS / GSAP / Figma / PostgreSQL / AWS</p>
  },
  {
    title: "wepnest mission",
    content: (
      <>
        <p className="text-[16px] sm:text-[18px] text-brightgray max-w-[300px] lg:max-w-[446px]">• Empowering Businesses Online</p>
        <p className="text-[16px] sm:text-[18px] text-brightgray max-w-[300px] lg:max-w-[446px] opacity-50 ml-5">We build scalable digital products that drive growth and deliver exceptional user experiences.</p>
        <p className="text-[16px] sm:text-[18px] text-brightgray max-w-[300px] lg:max-w-[446px]">• Future-Proof Solutions</p>
        <p className="text-[16px] sm:text-[18px] text-brightgray max-w-[300px] lg:max-w-[446px] opacity-50 ml-5">Leveraging the latest technologies to ensure your platform stays ahead of the curve.</p>
      </>
    )
  },
  {
    title: "services",
    content: <p className="text-[16px] sm:text-[18px] text-brightgray max-w-[300px] lg:max-w-[437px]">Custom Website Design, High-Converting E-Commerce Stores, Logo & Brand Identity, Landing Pages, and Full-Stack Web Applications.</p>
  }
];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.exp-item');
      items.forEach((item: any) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top-=300 50%",
          onEnter: () => {
            gsap.fromTo(item, { opacity: 0, y: 50 }, { opacity: 0.5, y: 0, duration: 1, ease: "power3.out" });
          }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      <section className="lg:hidden relative w-full px-[10px] sm:px-[20px] py-[90px] md:py-[150px] flex flex-col gap-[45px] md:gap-[90px]">
        {experienceData.map((item, i) => (
          <div key={i} className="exp-item flex flex-col md:flex-row justify-between md:gap-[50px] opacity-0">
            <div className="md:w-[50%]">
              <p className="font-intranet text-[18px] sm:text-[23px] text-midgray md:text-brightgray mb-[8px]">{item.title}</p>
            </div>
            <div className="md:w-[50%] font-ppsemibold">
              {item.content}
            </div>
          </div>
        ))}
      </section>

      <section className="hidden lg:block relative w-full py-[170px]">
        <div className="relative mx-auto max-w-[1200px]">
          <div className="absolute left-1/2 -translate-x-1/2 top-[33px] h-full pointer-events-none">
            <div className="sticky top-[50vh] -translate-y-1/2 flex justify-center">
              <img alt="icon" src="https://www.lorisbukvic.graphics/icons/experience_icon.png" className="w-[92px]" />
            </div>
          </div>
          <div className="flex flex-col gap-[40px] lg:gap-[60px]">
            {experienceData.map((item, i) => (
              <div key={i} className="exp-item flex gap-[60px] lg:gap-[120px] xl:gap-[220px] items-center opacity-0 hover:!opacity-100 transition-opacity duration-300">
                <p className="font-intranet text-[20px] lg:text-[23px] text-brightgray w-[200px] lg:w-[350px] xl:w-[500px] text-right shrink-0">{item.title}</p>
                <div className="w-[300px] lg:w-[400px] xl:w-[500px] font-ppsemibold shrink-0">
                  {item.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
