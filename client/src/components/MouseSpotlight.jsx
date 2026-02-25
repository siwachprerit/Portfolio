import { useEffect, useRef } from 'react';

export default function MouseSpotlight() {
    const spotRef = useRef(null);

    useEffect(() => {
        const spot = spotRef.current;
        let mouseX = 0, mouseY = 0;
        let spotX = 0, spotY = 0;

        const onMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY + window.scrollY;
        };

        const animate = () => {
            spotX += (mouseX - spotX) * 0.08;
            spotY += (mouseY - spotY) * 0.08;
            spot.style.transform = `translate(${spotX - 300}px, ${spotY - 300}px)`;
            requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', onMouseMove);
        requestAnimationFrame(animate);

        return () => window.removeEventListener('mousemove', onMouseMove);
    }, []);

    return <div ref={spotRef} className="mouse-spotlight" />;
}
