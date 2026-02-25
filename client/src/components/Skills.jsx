import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollReveal from './ScrollReveal';

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        number: '01',
        title: 'Frontend',
        desc: 'Building responsive, performant user interfaces with modern frameworks. Focused on clean UI, smooth animations, and exceptional user experience.',
        skills: ['React.js', 'Vite', 'Vanilla CSS', 'Tailwind CSS', 'Framer Motion', 'GSAP'],
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
        accent: 'rgba(108, 71, 255, 0.15)',
    },
    {
        number: '02',
        title: 'Backend',
        desc: 'Designing and building scalable server-side architecture, RESTful APIs, real-time systems, and microservices with robust authentication and data management.',
        skills: ['Node.js', 'Express.js', 'Java', 'Spring Boot', 'REST APIs', 'Socket.IO', 'JWT'],
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
        accent: 'rgba(212, 100, 74, 0.15)',
    },
    {
        number: '03',
        title: 'Cloud & DevOps',
        desc: 'Deploying and managing applications on cloud infrastructure with containerization, CI/CD pipelines, and scalable architectures.',
        skills: ['AWS', 'EC2', 'S3', 'Docker', 'MongoDB Atlas', 'Redis', 'Vercel', 'Render'],
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
        accent: 'rgba(59, 124, 110, 0.15)',
    },
];

export default function Skills() {
    const trackRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const track = trackRef.current;
        const container = containerRef.current;

        const totalScroll = track.scrollWidth - container.offsetWidth;

        const st = gsap.to(track, {
            x: -totalScroll,
            ease: 'none',
            scrollTrigger: {
                trigger: container,
                pin: true,
                scrub: 1,
                end: () => `+=${totalScroll}`,
                invalidateOnRefresh: true,
            },
        });

        return () => {
            st.scrollTrigger?.kill();
            st.kill();
        };
    }, []);

    return (
        <section className="section skills-section" id="skills" ref={containerRef}>
            <span className="section__bg-text">Skills</span>
            <ScrollReveal>
                <span className="section__label">What I Do</span>
                <h2 className="section__title">Services</h2>
            </ScrollReveal>
            <div className="skills-track" ref={trackRef}>
                {services.map((service) => (
                    <div
                        className="skill-card"
                        key={service.number}
                        style={{ '--card-accent': service.accent }}
                    >
                        <div className="skill-card__img">
                            <img src={service.image} alt={service.title} loading="lazy" />
                        </div>
                        <div className="skill-card__content">
                            <span className="skill-card__number">{service.number}</span>
                            <h3 className="skill-card__title">{service.title}</h3>
                            <p className="skill-card__desc">{service.desc}</p>
                            <div className="skill-card__tags">
                                {service.skills.map((skill) => (
                                    <span key={skill}>{skill}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
