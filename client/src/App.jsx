import { useState } from 'react';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Works from './components/Works';
import Skills from './components/Skills';
import About from './components/About';
import Marquee from './components/Marquee';
import TechGlobe from './components/TechGlobe';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import BackToTop from './components/BackToTop';
import useLenis from './hooks/useLenis';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  useLenis();

  return (
    <>
      <Preloader onComplete={() => setLoaded(true)} />
      {loaded && (
        <>
          <div className="bg-mesh">
            <div className="bg-mesh__orb-1"></div>
            <div className="bg-mesh__orb-2"></div>
            <div className="bg-mesh__orb-3"></div>
            <div className="bg-mesh__grid"></div>
          </div>

          <CustomCursor />
          <Navbar />
          <main>
            <Hero />
            <Marquee />
            <Works />
            <Skills />
            <TechGlobe />
            <About />
            <Marquee />
            <Contact />
          </main>
          <BackToTop />
        </>
      )}
    </>
  );
}
