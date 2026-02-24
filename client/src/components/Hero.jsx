import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Hero() {
    const nameRef = useRef(null);
    const titleRef = useRef(null);
    const img1Ref = useRef(null);
    const img2Ref = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.fromTo(nameRef.current,
            { opacity: 0, y: 60, filter: 'blur(15px)' },
            { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2 }
        )
            .fromTo(titleRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8 },
                '-=0.5'
            )
            .fromTo([img1Ref.current, img2Ref.current],
                { opacity: 0, scale: 0.8 },
                { opacity: 0.4, scale: 1, duration: 1, stagger: 0.2 },
                '-=0.6'
            );

        // Parallax on scroll
        const onScroll = () => {
            const scrollY = window.scrollY;
            if (img1Ref.current) {
                img1Ref.current.style.transform = `rotate(-8deg) translateY(${scrollY * 0.3}px)`;
            }
            if (img2Ref.current) {
                img2Ref.current.style.transform = `rotate(5deg) translateY(${scrollY * 0.15}px)`;
            }
        };

        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <section className="hero" id="hero">
            <div className="hero__parallax-img" ref={img1Ref}>
                <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80" alt="Code" />
            </div>
            <div className="hero__parallax-img" ref={img2Ref}>
                <img src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&q=80" alt="Tech" />
            </div>
            <h1 className="hero__name" ref={nameRef}>PRERIT SIWACH</h1>
            <p className="hero__title" ref={titleRef}>Full Stack Developer from India</p>
            <div className="hero__scroll-indicator">
                <span>Scroll</span>
                <div className="arrow"></div>
            </div>
        </section>
    );
}
