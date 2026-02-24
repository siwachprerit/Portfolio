import { useEffect, useRef } from 'react';

export default function CustomCursor() {
    const cursorRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        const onMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const onMouseEnterInteractive = () => cursor.classList.add('hover');
        const onMouseLeaveInteractive = () => cursor.classList.remove('hover');

        const animate = () => {
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;
            cursor.style.left = `${cursorX - 6}px`;
            cursor.style.top = `${cursorY - 6}px`;
            requestAnimationFrame(animate);
        };

        document.addEventListener('mousemove', onMouseMove);
        requestAnimationFrame(animate);

        // Add hover effect to all interactive elements
        const interactives = document.querySelectorAll('a, button, input, textarea, .project-card');
        interactives.forEach((el) => {
            el.addEventListener('mouseenter', onMouseEnterInteractive);
            el.addEventListener('mouseleave', onMouseLeaveInteractive);
        });

        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            interactives.forEach((el) => {
                el.removeEventListener('mouseenter', onMouseEnterInteractive);
                el.removeEventListener('mouseleave', onMouseLeaveInteractive);
            });
        };
    }, []);

    return <div ref={cursorRef} className="custom-cursor" />;
}
