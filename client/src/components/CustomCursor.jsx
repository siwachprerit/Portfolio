import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
    const cursorRef = useRef(null);
    const [cursorText, setCursorText] = useState('');

    useEffect(() => {
        const cursor = cursorRef.current;
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let isHovering = false;

        const onMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const onMouseEnterView = (e) => {
            cursor.classList.add('view');
            setCursorText(e.target.closest('[data-cursor="view"]').getAttribute('data-cursor-text') || 'VIEW');
        };
        const onMouseLeaveView = () => {
            cursor.classList.remove('view');
            setCursorText('');
        };

        const onMouseEnterInteractive = () => {
            if (!cursor.classList.contains('view')) {
                cursor.classList.add('hover');
            }
        };
        const onMouseLeaveInteractive = () => cursor.classList.remove('hover');

        const animate = () => {
            // Smooth spring physics
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;

            // Adjust center point based on state
            const offset = cursor.classList.contains('view') ? 40 : (cursor.classList.contains('hover') ? 20 : 6);

            cursor.style.transform = `translate3d(${cursorX - offset}px, ${cursorY - offset}px, 0)`;
            requestAnimationFrame(animate);
        };

        document.addEventListener('mousemove', onMouseMove);
        requestAnimationFrame(animate);

        // Bind standard hover elements
        const bindInteractives = () => {
            document.querySelectorAll('a, button, input, textarea').forEach((el) => {
                el.addEventListener('mouseenter', onMouseEnterInteractive);
                el.addEventListener('mouseleave', onMouseLeaveInteractive);
            });

            // Bind 'view' cursor elements (e.g. project cards)
            document.querySelectorAll('[data-cursor="view"]').forEach((el) => {
                el.addEventListener('mouseenter', onMouseEnterView);
                el.addEventListener('mouseleave', onMouseLeaveView);
            });
        };

        // Initial bind
        bindInteractives();

        // Re-bind when DOM changes (helpful for dynamically loaded content)
        const observer = new MutationObserver(bindInteractives);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            observer.disconnect();
        };
    }, []);

    return (
        <div ref={cursorRef} className="custom-cursor">
            {cursorText && <span className="custom-cursor__text">{cursorText}</span>}
        </div>
    );
}
