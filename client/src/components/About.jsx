import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollReveal from './ScrollReveal';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const containerRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        // Parallax scroll effect for the image
        const st = ScrollTrigger.create({
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            animation: gsap.fromTo(
                imageRef.current,
                { yPercent: -15, scale: 1.15 },
                { yPercent: 15, scale: 1.15, ease: 'none' }
            ),
            scrub: true,
        });

        return () => st.kill();
    }, []);

    return (
        <section className="section" id="about">
            <ScrollReveal>
                <span className="section__label">About</span>
                <h2 className="section__title">Info</h2>
            </ScrollReveal>
            <div className="about">
                <div className="about__left">
                    <ScrollReveal delay={0.1}>
                        <div className="about__block">
                            <h3>Who I Am</h3>
                            <p>
                                I'm Prerit Siwach, a 3rd-year Computer Science undergraduate at Chitkara University
                                with hands-on experience as a Full Stack Developer. I specialize in MERN Stack, Java
                                Spring Boot, and cloud-based architectures—building everything from real-time trading
                                platforms to blogging systems with scalable microservices.
                            </p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.2}>
                        <div className="about__block">
                            <h3>My Approach</h3>
                            <p>
                                I believe in writing clean, maintainable code that scales. Every project starts with
                                solid architecture—whether it's designing RESTful APIs with proper error handling,
                                implementing JWT authentication flows, or setting up Redis caching layers for
                                performance. I focus on building reusable components and following industry best practices.
                            </p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.3}>
                        <div className="about__block">
                            <h3>Education</h3>
                            <p>
                                <strong>B.E. in Computer Science Engineering</strong><br />
                                Chitkara University — 2023–2027 — CGPA: 8.42<br /><br />
                                <strong>Class XII (CBSE)</strong><br />
                                PML SD Public School, Chandigarh — 92.8%
                            </p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.35}>
                        <div className="about__block">
                            <h3>Career</h3>
                            <div className="timeline">
                                <div className="timeline__item">
                                    <div>
                                        <div className="timeline__role">Web Executive</div>
                                        <div className="timeline__org">Chitkara ACM Student Chapter</div>
                                    </div>
                                    <div className="timeline__date">11/2023 — 08/2024</div>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>

                <div className="about__right">
                    <ScrollReveal delay={0.2}>
                        <div className="about__image-frame">
                            <div
                                ref={containerRef}
                                style={{ overflow: 'hidden', borderRadius: '10px', contain: 'paint' }}
                            >
                                <img
                                    ref={imageRef}
                                    className="about__image"
                                    src="/images/prerit.jpg"
                                    alt="Prerit Siwach"
                                    loading="lazy"
                                    style={{ transformOrigin: 'center center' }}
                                />
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
