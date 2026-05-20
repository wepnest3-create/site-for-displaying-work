import { useEffect, useRef, Suspense } from 'react';
import gsap from 'gsap';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

function TechCore() {
  const coreRef = useRef<THREE.Mesh>(null);
  const shellRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.rotation.x = time * 0.2;
      coreRef.current.rotation.y = time * 0.3;
    }
    if (shellRef.current) {
      shellRef.current.rotation.x = -time * 0.1;
      shellRef.current.rotation.y = -time * 0.2;
      shellRef.current.rotation.z = time * 0.15;
    }
  });

  return (
    <group scale={1.5}>
      {/* Inner Solid Core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[2, 0]} />
        <meshStandardMaterial 
          color="#222222" 
          roughness={0.2} 
          metalness={0.9} 
          emissive="#111111"
        />
      </mesh>
      
      {/* Outer Wireframe Shell */}
      <mesh ref={shellRef}>
        <icosahedronGeometry args={[2.5, 1]} />
        <meshStandardMaterial 
          color="#ffffff" 
          wireframe 
          transparent 
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Subtle Glow Point */}
      <pointLight distance={5} intensity={2} color="#ffffff" />
    </group>
  );
}

export default function Hero() {
  const titleRef = useRef<HTMLParagraphElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.fromTo(subtitleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, delay: 2.5, ease: 'power3.out' });
    gsap.fromTo(titleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, delay: 2.7, ease: 'power3.out' });
  }, []);

  return (
    <div className="w-screen h-[100dvh] relative overflow-hidden">
      <div className="absolute w-full h-[100vh] bottom-0 left-0 bg-gradient-to-b from-transparent to-black z-[1]"></div>
      
      {/* 3D Tech Core Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
          <Suspense fallback={null}>
            <Float speed={1.5} rotationIntensity={0.8} floatIntensity={0.5}>
              <TechCore />
            </Float>
            <Environment preset="night" />
            <ContactShadows position={[0, -4, 0]} opacity={0.3} scale={20} blur={2.5} far={4.5} />
          </Suspense>
        </Canvas>
      </div>

      <div className="absolute top-1/2 left-1/2 origin-center overflow-hidden -translate-x-1/2 -translate-y-[67%] sm:translate-y-[-55%] w-[100vw] h-[100vw] max-w-[1000px] max-h-[1000px] pointer-events-none">
        <div className="w-full h-full rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.05)_0%,_transparent_60%)] blur-3xl" />
      </div>

      <div className="!z-[5] absolute bottom-3 sm:bottom-6 md:bottom-10 lg:bottom-20 left-[10px] sm:left-[20px] lg:left-[50px] flex flex-col gap-[12px] sm:gap-[20px] w-[calc(100%-20px)] sm:w-[85%] md:w-[65%] lg:w-[500px] xl:w-[600px] 2xl:w-[700px]">
        <p ref={subtitleRef} className="opacity-0 text-[11px] sm:text-sm lg:text-lg text-midgray font-ppsemibold uppercase tracking-[0.3em]">
          wepnest.tech
        </p>
        <p ref={titleRef} className="opacity-0 text-[18px] sm:text-[21px] md:text-[24px] lg:text-[28px] xl:text-[32px] 2xl:text-[35px] font-intranet text-brightgray leading-[1.3]">
          Wepnest is a digital powerhouse specializing in high-end web development, e-commerce stores, and visual identities that command attention.
        </p>
      </div>
    </div>
  );
}
