import Loader from '../components/Loader';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import Works from '../components/Works';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="__variable_88ffcb __variable_c59efa __variable_e86be0 bg-[#000] text-white min-h-screen">
      <Loader />
      <Navigation />
      <main className="w-full h-full">
        <Hero />
        <Works />
        <Projects />
        <Experience />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}
