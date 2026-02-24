import { useState, useEffect } from 'react';

export default function Navbar() {
    const [time, setTime] = useState('');
    const [scrolled, setScrolled] = useState(false);

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

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollToSection = (e, id) => {
        e.preventDefault();
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
            <div className="navbar__logo">PRERIT©</div>
            <ul className="navbar__links">
                <li><a href="#hero" onClick={(e) => scrollToSection(e, 'hero')}>Home</a></li>
                <li><a href="#works" onClick={(e) => scrollToSection(e, 'works')}>Works</a></li>
                <li><a href="#skills" onClick={(e) => scrollToSection(e, 'skills')}>Skills</a></li>
                <li><a href="#about" onClick={(e) => scrollToSection(e, 'about')}>About</a></li>
                <li><a href="#contact" onClick={(e) => scrollToSection(e, 'contact')}>Contact</a></li>
            </ul>
            <div className="navbar__clock">{time}</div>
        </nav>
    );
}
