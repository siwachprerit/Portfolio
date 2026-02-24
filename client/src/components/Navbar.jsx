import { useState, useEffect } from 'react';
import MagneticButton from './MagneticButton';

export default function Navbar() {
    const [time, setTime] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') || 'dark';
        }
        return 'dark';
    });

    // Apply theme
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    // Live clock
    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            const formatted = now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true,
            });
            setTime(`INDIA ${formatted}`);
        };

        updateClock();
        const interval = setInterval(updateClock, 1000);
        return () => clearInterval(interval);
    }, []);

    const scrollToSection = (e, id) => {
        e.preventDefault();
        setMenuOpen(false);
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    return (
        <>
            <nav className="navbar">
                <MagneticButton strength={0.2}>
                    <div className="navbar__logo">PRERIT©</div>
                </MagneticButton>

                <ul className="navbar__links">
                    {['hero', 'works', 'skills', 'about', 'contact'].map((id) => (
                        <li key={id}>
                            <MagneticButton strength={0.4}>
                                <a href={`#${id}`} onClick={(e) => scrollToSection(e, id)}>
                                    {id === 'hero' ? 'Home' : id.charAt(0).toUpperCase() + id.slice(1)}
                                </a>
                            </MagneticButton>
                        </li>
                    ))}
                </ul>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <MagneticButton strength={0.3}>
                        <button className="theme-toggle" onClick={toggleTheme}>
                            {theme === 'dark' ? '☀ Light' : '● Dark'}
                        </button>
                    </MagneticButton>
                    <span className="navbar__clock">{time}</span>
                    <button
                        className={`hamburger ${menuOpen ? 'open' : ''}`}
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </nav>

            {/* Mobile fullscreen nav */}
            <div className={`mobile-nav ${menuOpen ? 'open' : ''}`}>
                <a href="#hero" onClick={(e) => scrollToSection(e, 'hero')}>Home</a>
                <a href="#works" onClick={(e) => scrollToSection(e, 'works')}>Works</a>
                <a href="#skills" onClick={(e) => scrollToSection(e, 'skills')}>Skills</a>
                <a href="#about" onClick={(e) => scrollToSection(e, 'about')}>About</a>
                <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')}>Contact</a>
                <button className="theme-toggle" onClick={toggleTheme} style={{ marginTop: '20px' }}>
                    {theme === 'dark' ? '☀ Switch to Light' : '● Switch to Dark'}
                </button>
            </div>
        </>
    );
}
