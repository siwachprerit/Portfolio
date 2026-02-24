import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Works from './components/Works';
import Skills from './components/Skills';
import About from './components/About';
import Marquee from './components/Marquee';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import useLenis from './hooks/useLenis';

export default function App() {
  useLenis();

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Works />
        <Skills />
        <About />
        <Marquee />
        <Contact />
      </main>
    </>
  );
}
