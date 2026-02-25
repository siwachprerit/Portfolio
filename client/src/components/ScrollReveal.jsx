import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollReveal({ children, delay = 0, blur = false, direction = 'up', className = '' }) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;

        const fromVars = {
            opacity: 0,
            x: direction === 'left' ? -80 : direction === 'right' ? 80 : 0,
            y: direction === 'up' ? 25 : 0,
        };

        if (blur) fromVars.filter = 'blur(4px)';

        gsap.set(el, fromVars);

        gsap.to(el, {
            opacity: 1,
            x: 0,
            y: 0,
            filter: blur ? 'blur(0px)' : 'none',
            duration: 0.6,
            delay: delay * 0.3,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 96%',
                toggleActions: 'play none none none',
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => {
                if (t.trigger === el) t.kill();
            });
        };
    }, [delay, blur, direction]);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}
