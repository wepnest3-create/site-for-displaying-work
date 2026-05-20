import { useEffect, useRef, useState, memo } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';

const fallbackImages = [
  "https://www.lorisbukvic.graphics/assets/project_images/aughtsspective/thumb.webp",
  "https://www.lorisbukvic.graphics/assets/project_images/daydream/thumb.webp",
  "https://www.lorisbukvic.graphics/assets/project_images/daydream_web/thumb.webp",
  "https://www.lorisbukvic.graphics/assets/project_images/pneuma/thumb.webp",
  "https://www.lorisbukvic.graphics/assets/project_images/amca/thumb.webp",
  "https://www.lorisbukvic.graphics/assets/project_images/ikon_web/thumb.webp",
  "https://www.lorisbukvic.graphics/assets/project_images/loben/thumb.webp",
  "https://www.lorisbukvic.graphics/assets/project_images/orith/thumb.webp",
  "https://www.lorisbukvic.graphics/assets/project_images/posterfolio/thumb.webp",
  "https://www.lorisbukvic.graphics/assets/project_images/36daysoftype/thumb.webp",
  "https://www.lorisbukvic.graphics/assets/project_images/dailyui/thumb.webp",
  "https://www.lorisbukvic.graphics/assets/project_images/wayer/thumb.webp"
];

function MarqueeItem({ src }: { src: string }) {
  return (
    <div className="min-w-[200px] sm:min-w-[240px] md:min-w-[280px] transition-opacity duration-300 hover:opacity-100 group-hover:opacity-60">
      <img loading="lazy" alt="project" src={src} className="w-full h-full object-cover" />
    </div>
  );
}

const MemoizedMarqueeItem = memo(MarqueeItem);

export default function Works() {
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWorks = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('works')
        .select('image_url')
        .order('created_at', { ascending: false })
        .limit(10);
      
      if (error) {
        console.error('Error fetching works for marquee:', error);
        setImages(fallbackImages);
      } else if (data && data.length > 0) {
        setImages(data.map(w => w.image_url));
      } else {
        setImages(fallbackImages);
      }
      setIsLoading(false);
    };
    fetchWorks();
  }, []);

  return (
    <div className="relative h-full w-full mt-[50px] lg:-mt-[50px] z-[50] overflow-hidden group">
      <Link className="block w-full h-full" to="/works">
        <div className="flex lg:hidden justify-between mb-[40px] md:mb-[50px] px-[10px] sm:px-[20px]">
          <p className="text-[18px] sm:text-[23px] text-midgray font-intranet">WORKS</p>
          <div className="text-[18px] sm:text-[23px] text-brightgray font-ppsemibold hover:opacity-50 duration-150 transition-opacity">Go to Works</div>
        </div>
        <div className="relative h-full w-full md:pt-[20px] mask-image-linear">
          <div className="lg:block hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[500px] h-full blur-[15px] scale-125 transition-opacity duration-300" style={{ background: 'linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.663) 20%, rgba(0, 0, 0, 0.882) 40%, rgba(0, 0, 0, 0.882) 60%, rgba(0, 0, 0, 0.663) 80%, transparent 100%)' }}></div>
          
          <div className="lg:block hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="translate-y-[15px] flex flex-col gap-[16px] items-center justify-center w-screen">
              <div className="group relative w-[120px] h-[90px] [perspective:1000px] overflow-visible cursor-pointer">
                <img alt="backplate" src="https://www.lorisbukvic.graphics/assets/folder/folder_back.png" className="w-[120px] h-[90px] object-contain group-hover:translate-y-[2px] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]" />
                <img loading="lazy" alt="thumb" src={images[0]} className="absolute top-[-40px] left-[10px] w-[100px] h-[130px] scale-[0.6] rotate-[-5deg] object-cover origin-bottom transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] border border-midgray rounded-[10px] group-hover:top-[-60px] group-hover:rotate-[-15deg]" />
                <img loading="lazy" alt="thumb" src={images[1]} className="absolute top-[-40px] left-[10px] w-[100px] h-[130px] scale-[0.65] rotate-[5deg] object-cover origin-bottom transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] border border-midgray rounded-[10px] group-hover:top-[-70px] group-hover:rotate-[15deg]" />
                <img alt="frontplate" src="https://www.lorisbukvic.graphics/assets/folder/folder_front.png" className="absolute top-2 left-1/2 -translate-x-1/2 min-w-[125px] min-h-full object-contain origin-bottom transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:[transform:translateX(-50%)_rotateX(-60deg)]" />
              </div>
              <p className="font-intranet text-[18px] text-midgray">WORKS</p>
            </div>
          </div>

          {!isLoading && images.length > 0 && (
            <div className="flex animate-marquee gap-[4px] will-change-transform">
              {[...images, ...images].map((src, i) => (
                <MemoizedMarqueeItem key={`${src}-${i}`} src={src} />
              ))}
            </div>
          )}
          {isLoading && (
            <div className="flex items-center justify-center py-10">
              <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
