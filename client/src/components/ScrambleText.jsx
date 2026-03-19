import { useEffect, useRef } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

export default function ScrambleText({ text, trigger = false, className = '' }) {
    const elRef = useRef(null);
    const frameRef = useRef(null);
    const iterRef = useRef(0);

    const scramble = () => {
        let iteration = 0;
        const originalText = text;
        clearInterval(frameRef.current);

        frameRef.current = setInterval(() => {
            if (!elRef.current) return;
            elRef.current.textContent = originalText
                .split('')
                .map((char, i) => {
                    if (char === ' ') return ' ';
                    if (i < iteration) return originalText[i];
                    return CHARS[Math.floor(Math.random() * CHARS.length)];
                })
                .join('');

            iteration += 0.5;
            if (iteration >= originalText.length) {
                clearInterval(frameRef.current);
                elRef.current.textContent = originalText;
            }
        }, 30);
    };

    useEffect(() => {
        if (trigger) scramble();
    }, [trigger]);

    useEffect(() => {
        return () => clearInterval(frameRef.current);
    }, []);

    return (
        <span ref={elRef} className={className} onMouseEnter={scramble}>
            {text}
        </span>
    );
}
