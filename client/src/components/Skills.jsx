import ScrollReveal from './ScrollReveal';
import Tilt from 'react-parallax-tilt';

const services = [
    {
        number: '01',
        title: 'Frontend',
        desc: 'Building responsive, performant user interfaces with modern frameworks. Focused on clean UI, smooth animations, and exceptional user experience.',
        skills: ['React.js', 'Vite', 'Vanilla CSS', 'Tailwind CSS', 'Framer Motion', 'GSAP'],
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
        color: 'orange',
    },
    {
        number: '02',
        title: 'Backend',
        desc: 'Designing and building scalable server-side architecture, RESTful APIs, real-time systems, and microservices with robust authentication and data management.',
        skills: ['Node.js', 'Express.js', 'Java', 'Spring Boot', 'REST APIs', 'Socket.IO', 'JWT'],
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
        color: 'slate',
    },
    {
        number: '03',
        title: 'Cloud & DevOps',
        desc: 'Deploying and managing applications on cloud infrastructure with containerization, CI/CD pipelines, and scalable architectures.',
        skills: ['AWS', 'EC2', 'S3', 'Docker', 'MongoDB Atlas', 'Redis', 'Vercel', 'Render'],
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
        color: 'beige',
    },
];

export default function Skills() {
    return (
        <section className="section" id="skills">
            <ScrollReveal>
                <span className="section__label">What I Do</span>
                <h2 className="section__title">Services</h2>
            </ScrollReveal>
            <div className="services">
                {services.map((service, i) => (
                    <ScrollReveal key={service.number} delay={i * 0.1}>
                        <Tilt
                            tiltMaxAngleX={4}
                            tiltMaxAngleY={4}
                            glareEnable={true}
                            glareMaxOpacity={0.15}
                            glareColor="#ffffff"
                            glarePosition="all"
                            scale={1.02}
                            transitionSpeed={800}
                        >
                            <div className={`service-block service-block--${service.color}`}
                                style={{ direction: i % 2 === 1 ? 'rtl' : 'ltr' }}>
                                <div className="service-block__content" style={{ direction: 'ltr' }}>
                                    <span className="service-block__number">{service.number}</span>
                                    <h3 className="service-block__title">{service.title}</h3>
                                    <p className="service-block__desc">{service.desc}</p>
                                    <div className="service-block__skills">
                                        {service.skills.map((skill) => (
                                            <span key={skill}>{skill}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="service-block__visual">
                                    <img src={service.image} alt={service.title} loading="lazy" />
                                </div>
                            </div>
                        </Tilt>
                    </ScrollReveal>
                ))}
            </div>
        </section>
    );
}
