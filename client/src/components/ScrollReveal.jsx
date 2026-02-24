import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollReveal({ children, delay = 0, blur = false, className = '' }) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;

        // Immediately visible initial state to avoid empty gaps
        gsap.set(el, { opacity: 0, y: 25 });

        gsap.to(el, {
            opacity: 1,
            y: 0,
            filter: blur ? 'blur(0px)' : 'none',
            duration: 0.5,
            delay: delay * 0.3,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 96%',
                toggleActions: 'play none none none',
            },
        });

        if (blur) {
            gsap.set(el, { filter: 'blur(4px)' });
        }

        return () => {
            ScrollTrigger.getAll().forEach(t => {
                if (t.trigger === el) t.kill();
            });
        };
    }, [delay, blur]);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}
