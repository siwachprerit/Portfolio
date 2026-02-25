import { useState, useEffect } from 'react';
import ScrollReveal from './ScrollReveal';
import { getProjects } from '../api';

// Fallback projects if API is not available
const fallbackProjects = [
    {
        _id: '1',
        title: 'CHAINXCHANGE',
        subtitle: 'Crypto Trading Platform',
        description: 'Full-stack MERN crypto trading platform with real-time market data, Redis caching, simulated trading, wallet management, and PnL tracking.',
        image: '/images/chainxchange.png',
        techStack: ['React', 'Vite', 'Node.js', 'Express', 'MongoDB', 'Redis'],
        githubUrl: 'https://github.com/siwachprerit',
        liveUrl: '',
    },
    {
        _id: '2',
        title: 'DRAFTED',
        subtitle: 'Blogging Platform',
        description: 'MERN blogging platform with JWT auth, Socket.IO real-time notifications, follow system, personalized feed, and Cloudinary image integration.',
        image: '/images/drafted.png',
        techStack: ['React 19', 'Tailwind', 'Node.js', 'Socket.IO', 'MongoDB', 'Cloudinary'],
        githubUrl: 'https://github.com/siwachprerit',
        liveUrl: '',
    },
    {
        _id: '3',
        title: 'GAME HUB',
        subtitle: 'Game Module',
        description: 'Modular gaming platform using Spring Boot microservices with REST APIs, OpenFeign inter-service communication, and Resilience4j circuit breaker.',
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800',
        techStack: ['Java', 'Spring Boot', 'OpenFeign', 'Resilience4j', 'Maven'],
        githubUrl: 'https://github.com/siwachprerit',
        liveUrl: '',
    },
];

export default function Works() {
    const [projects, setProjects] = useState(fallbackProjects);

    useEffect(() => {
        getProjects()
            .then((res) => {
                if (res.data && res.data.length > 0) setProjects(res.data);
            })
            .catch(() => {
                // Use fallback data
            });
    }, []);

    return (
        <section className="section" id="works">
            <span className="section__bg-text">Works</span>
            <ScrollReveal>
                <span className="section__label">Selected Works</span>
                <h2 className="section__title">Projects</h2>
            </ScrollReveal>
            <div className="works-grid">
                {projects.map((project, i) => (
                    <ScrollReveal key={project._id} delay={i * 0.15} direction={i % 2 === 0 ? 'left' : 'right'}>
                        <div className="project-card" data-cursor="view">
                            <img
                                className="project-card__image"
                                src={project.image}
                                alt={project.title}
                                loading="lazy"
                            />
                            <div className="project-card__overlay">
                                <h3 className="project-card__title">{project.title}</h3>
                                <p className="project-card__subtitle">{project.subtitle}</p>
                                <div className="project-card__tech">
                                    {project.techStack?.map((tech) => (
                                        <span key={tech}>{tech}</span>
                                    ))}
                                </div>
                                <div className="project-card__links">
                                    {project.githubUrl && (
                                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
                                    )}
                                    {project.liveUrl && (
                                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">Live Demo ↗</a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                ))}
            </div>
        </section>
    );
}
