import { useRef, useCallback } from 'react';

export default function MagneticButton({ children, className = '', strength = 0.3, ...props }) {
    const btnRef = useRef(null);

    const handleMouseMove = useCallback((e) => {
        const btn = btnRef.current;
        if (!btn) return;

        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    }, [strength]);

    const handleMouseLeave = useCallback(() => {
        const btn = btnRef.current;
        if (btn) {
            btn.style.transform = 'translate(0, 0)';
        }
    }, []);

    return (
        <div
            ref={btnRef}
            className={`magnetic ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)', display: 'inline-block' }}
            {...props}
        >
            {children}
        </div>
    );
}
