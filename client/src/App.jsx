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
