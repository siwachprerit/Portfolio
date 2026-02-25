import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollReveal from './ScrollReveal';

gsap.registerPlugin(ScrollTrigger);

// Animated number counter
function StatCounter({ end, suffix = '', label, decimals = 0 }) {
    const numRef = useRef(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        const el = numRef.current;

        ScrollTrigger.create({
            trigger: el,
            start: 'top 90%',
            once: true,
            onEnter: () => {
                if (hasAnimated) return;
                setHasAnimated(true);
                const obj = { val: 0 };
                gsap.to(obj, {
                    val: end,
                    duration: 2,
                    ease: 'power2.out',
                    onUpdate: () => {
                        el.textContent = decimals > 0
                            ? obj.val.toFixed(decimals) + suffix
                            : Math.floor(obj.val) + suffix;
                    },
                });
            },
        });
    }, [end, suffix, decimals, hasAnimated]);

    return (
        <div className="bento__stat">
            <span className="bento__stat-number" ref={numRef}>0{suffix}</span>
            <span className="bento__stat-label">{label}</span>
        </div>
    );
}

export default function About() {
    const photoContainerRef = useRef(null);
    const photoRef = useRef(null);

    useEffect(() => {
        const st = ScrollTrigger.create({
            trigger: photoContainerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            animation: gsap.fromTo(
                photoRef.current,
                { yPercent: -10, scale: 1.15 },
                { yPercent: 10, scale: 1.15, ease: 'none' }
            ),
            scrub: true,
        });

        return () => st.kill();
    }, []);

    return (
        <section className="section" id="about">
            <span className="section__bg-text">About</span>
            <ScrollReveal>
                <span className="section__label">About</span>
                <h2 className="section__title">Info</h2>
            </ScrollReveal>

            <div className="bento">
                {/* Row 1: Photo + Bio */}
                <ScrollReveal direction="left" className="bento__card bento__card--photo">
                    <div
                        ref={photoContainerRef}
                        className="bento__photo-wrap"
                    >
                        <img
                            ref={photoRef}
                            src="/images/prerit.jpg"
                            alt="Prerit Siwach"
                            loading="lazy"
                            style={{ transformOrigin: 'center center' }}
                        />
                    </div>
                </ScrollReveal>

                <ScrollReveal direction="right" delay={0.1} className="bento__card bento__card--bio">
                    <h3>Who I Am</h3>
                    <p>
                        I'm Prerit Siwach, a 3rd-year Computer Science undergraduate at Chitkara University
                        with hands-on experience as a Full Stack Developer. I specialize in MERN Stack, Java
                        Spring Boot, and cloud-based architectures—building everything from real-time trading
                        platforms to blogging systems with scalable microservices.
                    </p>
                    <p style={{ marginTop: '16px' }}>
                        I focus on building reusable components, clean REST APIs with proper error handling,
                        JWT auth flows, and Redis caching layers for performance. Every project starts with
                        solid architecture and ends with polished UX.
                    </p>
                </ScrollReveal>

                {/* Row 2: Stats */}
                <ScrollReveal delay={0.15} className="bento__card bento__card--stats">
                    <StatCounter end={3} suffix="+" label="Projects Built" />
                    <StatCounter end={8.42} suffix="" label="CGPA" decimals={2} />
                    <StatCounter end={1} suffix="+" label="Year Experience" />
                    <StatCounter end={10} suffix="+" label="Technologies" />
                </ScrollReveal>

                {/* Row 3: Approach + Education */}
                <ScrollReveal direction="left" delay={0.2} className="bento__card bento__card--approach">
                    <h3>My Approach</h3>
                    <p>
                        I believe in writing clean, maintainable code that scales. Every project starts with
                        solid architecture—whether it's designing RESTful APIs with proper error handling,
                        implementing JWT authentication flows, or setting up Redis caching layers for performance.
                    </p>
                </ScrollReveal>

                <ScrollReveal direction="right" delay={0.25} className="bento__card bento__card--edu">
                    <h3>Education</h3>
                    <p>
                        <strong>B.E. in Computer Science Engineering</strong><br />
                        Chitkara University — 2023–2027<br /><br />
                        <strong>Class XII (CBSE)</strong><br />
                        PML SD Public School, Chandigarh — 92.8%
                    </p>
                </ScrollReveal>

                {/* Row 4: Career */}
                <ScrollReveal delay={0.3} className="bento__card bento__card--career">
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
                </ScrollReveal>
            </div>
        </section>
    );
}
