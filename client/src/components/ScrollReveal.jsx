import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollReveal({ children, delay = 0, blur = false, direction = 'up', className = '', onReveal }) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const xOffset = direction === 'left' ? -30 : direction === 'right' ? 30 : 0;
        const yOffset = 40;
        const rotation = direction === 'left' ? -1.5 : direction === 'right' ? 1.5 : 0;

        gsap.set(el, {
            opacity: 0,
            y: yOffset,
            x: xOffset,
            rotation,
            ...(blur ? { filter: 'blur(8px)' } : {}),
        });

        const trigger = ScrollTrigger.create({
            trigger: el,
            start: 'top 92%',
            once: true,
            onEnter: () => {
                gsap.to(el, {
                    opacity: 1,
                    y: 0,
                    x: 0,
                    rotation: 0,
                    filter: 'blur(0px)',
                    duration: 0.8,
                    delay: delay * 0.25,
                    ease: 'power3.out',
                    clearProps: 'filter,rotation',
                    onComplete: () => {
                        if (onReveal) onReveal();
                    },
                });
            },
        });

        return () => trigger.kill();
    }, [delay, blur, direction]);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}
