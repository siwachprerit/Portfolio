import { useState } from 'react';
import ScrollReveal from './ScrollReveal';
import { submitContact } from '../api';

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await submitContact(form);
            setStatus('Message sent successfully! I\'ll get back to you soon.');
            setForm({ name: '', email: '', message: '' });
        } catch {
            setStatus('Failed to send. Please try emailing directly.');
        }
        setLoading(false);
        setTimeout(() => setStatus(''), 5000);
    };

    return (
        <section className="section contact" id="contact">
            <ScrollReveal blur={true}>
                <h2 className="contact__heading">GET IN<br />TOUCH</h2>
            </ScrollReveal>

            <div className="contact__grid">
                <div className="contact__info">
                    <ScrollReveal delay={0.1}>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '40px' }}>
                            Let's build something meaningful together.<br />
                            I'd love to hear about your project, big or small.
                        </p>
                    </ScrollReveal>
                </div>

                <div className="contact__info">
                    <ScrollReveal delay={0.15}>
                        <h4>Email & Socials</h4>
                        <a href="mailto:prerit2261.be23@chitkara.edu.in">prerit2261.be23@chitkara.edu.in</a>
                        <a href="https://linkedin.com/in/preritsiwach" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
                        <a href="https://github.com/siwachprerit" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
                    </ScrollReveal>
                </div>

                <div>
                    <ScrollReveal delay={0.2}>
                        <form className="contact__form" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Your Name"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                required
                            />
                            <input
                                type="email"
                                placeholder="Your Email"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                required
                            />
                            <textarea
                                placeholder="Your Message"
                                value={form.message}
                                onChange={(e) => setForm({ ...form, message: e.target.value })}
                                required
                            />
                            <button type="submit" disabled={loading}>
                                {loading ? 'Sending...' : 'Send Message'}
                            </button>
                            {status && <p className="form-success">{status}</p>}
                        </form>
                    </ScrollReveal>
                </div>
            </div>

            <div className="footer-bottom">
                <span>© 2026 PRERIT SIWACH</span>
                <span>DESIGNED & BUILT WITH ♥</span>
            </div>
        </section>
    );
}
