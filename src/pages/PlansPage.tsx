import { useEffect, useRef, Suspense, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Float, Environment, ContactShadows } from '@react-three/drei';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import OrderModal from '../components/OrderModal';
import { supabase } from '../services/supabaseClient';

interface Plan {
  id?: string;
  name: string;
  price: string;
  description: string;
  features: string[];
}

function MoonModel() {
  const { scene } = useGLTF('https://res.cloudinary.com/dua3y4qmf/image/upload/v1771551764/the_moon_td8rri.glb');
  const moonRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (moonRef.current) {
      moonRef.current.rotation.y += 0.002;
    }
  });

  return <primitive ref={moonRef} object={scene} scale={2.5} position={[0, 0, 0]} />;
}

const fallbackPlans: Plan[] = [
  {
    name: "Starter",
    price: "499",
    description: "Ideal for landing pages and simple portfolios that need a professional touch.",
    features: ["Custom Landing Page", "Responsive Design", "Basic SEO", "Fast Loading Speed", "2 Rounds of Revisions"]
  },
  {
    name: "Professional",
    price: "1499",
    description: "Complete web solutions for growing businesses and e-commerce stores.",
    features: ["Full Website Development", "E-commerce Integration", "Advanced UI/UX Design", "Custom Logo Design", "SEO & Performance Optimization", "Priority Support"]
  },
  {
    name: "Custom",
    price: "Custom",
    description: "Bespoke digital ecosystems tailored to your specific enterprise needs.",
    features: ["Scalable Web Applications", "Complex API Integrations", "Dedicated Project Manager", "Ongoing Maintenance", "Full Brand Identity System"]
  }
];

export default function PlansPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('plans')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (error) {
        console.error('Error fetching plans:', error);
        setPlans(fallbackPlans);
      } else {
        setPlans(data && data.length > 0 ? data : fallbackPlans);
      }
      setIsLoading(false);
    };

    fetchPlans();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      // Static animations - run once
      gsap.fromTo(".page-title span", 
        { y: "110%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 1.5, ease: "expo.out", stagger: 0.15 }
      );
      gsap.fromTo(".moon-container",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 2, ease: "power3.out", delay: 0.2 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const ctx = gsap.context(() => {
      // Data-dependent animations - run when plans are ready
      gsap.fromTo(".plan-card", 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", stagger: 0.2, delay: 0.5 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [isLoading, plans]);

  const handlePlanSelect = (plan: Plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  return (
    <div ref={containerRef} className="bg-[#000] text-white min-h-screen selection:bg-white selection:text-black font-ppregular overflow-x-hidden">
      <Navigation />
      <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      <OrderModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        selectedPlan={selectedPlan} 
      />

      <main className="w-full pt-[140px] md:pt-[200px] px-[15px] sm:px-[30px] lg:px-[60px] pb-[150px]">
        
        {/* Header Section with 3D Moon */}
        <div className="relative mb-[100px] md:mb-[150px] flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-1 z-10">
            <h1 className="page-title text-[40px] xs:text-[60px] sm:text-[90px] md:text-[120px] lg:text-[160px] font-intranet leading-[0.85] text-brightgray uppercase tracking-tighter overflow-visible">
              <div className="overflow-hidden"><span className="block">Wepnest</span></div>
              <div className="overflow-hidden"><span className="block">Pricing</span></div>
            </h1>
            <p className="mt-8 text-midgray font-ppsemibold text-[16px] md:text-[20px] max-w-[500px] opacity-80 leading-relaxed">
              Strategic digital solutions designed to scale. Invest in a platform that works as hard as you do.
            </p>
          </div>

          <div className="moon-container relative w-full max-w-[250px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[600px] aspect-square lg:absolute lg:right-[-100px] lg:top-[-50px] z-0">
            <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1.5} />
              <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
              <Suspense fallback={null}>
                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                  <MoonModel />
                </Float>
                <Environment preset="city" />
                <ContactShadows position={[0, -3.5, 0]} opacity={0.4} scale={10} blur={2} far={4.5} />
              </Suspense>
            </Canvas>
          </div>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {isLoading ? (
            <div className="col-span-full py-20 flex justify-center">
              <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
            </div>
          ) : (
            plans.map((plan, i) => (
              <div key={i} className="plan-card group relative p-8 md:p-10 rounded-[32px] border border-white/5 bg-gradient-to-b from-[#0A0A0A] to-[#050505] hover:border-white/20 transition-all duration-700 flex flex-col gap-8 h-full overflow-hidden">
                {/* Subtle Glow Effect */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/5 blur-[80px] rounded-full group-hover:bg-white/10 transition-all duration-700"></div>
                
                <div className="flex flex-col gap-4 relative z-10">
                  <div className="flex justify-between items-start">
                    <h2 className="text-[32px] md:text-[42px] font-intranet text-brightgray uppercase group-hover:text-white transition-all duration-500 tracking-tighter leading-none">{plan.name}</h2>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[16px] text-midgray opacity-40 font-ppsemibold">$</span>
                    <span className="text-[45px] md:text-[60px] font-intranet text-white tracking-tighter leading-none">{plan.price}</span>
                    {plan.price !== "Custom" && <span className="text-[13px] text-midgray opacity-40 ml-1 font-ppsemibold">/ project</span>}
                  </div>
                </div>
                
                <p className="text-midgray font-ppsemibold text-[15px] md:text-[16px] leading-relaxed opacity-60 min-h-[70px] relative z-10">
                  {plan.description}
                </p>

                <div className="flex flex-col gap-5 mt-2 relative z-10">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-ppsemibold">Service Scope</p>
                  <div className="flex flex-col gap-4">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-4 text-[14px] text-midgray font-ppsemibold group-hover:text-white/80 transition-colors duration-300">
                        <div className="mt-1.5 w-1 h-1 rounded-full bg-white/20 group-hover:bg-white/60 transition-colors duration-300 shrink-0"></div>
                        <span className="leading-tight">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => handlePlanSelect(plan)}
                  className="mt-auto w-full py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-ppsemibold text-[12px] uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-500 active:scale-[0.98] relative z-10 overflow-hidden group/btn"
                >
                  <span className="relative z-10">Select Plan</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
                </button>
              </div>
            ))
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
