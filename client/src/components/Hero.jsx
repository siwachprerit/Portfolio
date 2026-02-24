import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';

const trailImages = [
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&q=75',
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&q=75',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&q=75',
    'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=300&q=75',
    'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=300&q=75',
    'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&q=75',
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=300&q=75',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&q=75',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=300&q=75',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&q=75',
];

export default function Hero() {
    const heroRef = useRef(null);
    const nameRef = useRef(null);
    const titleRef = useRef(null);
    const [images, setImages] = useState([]);
    const imgIndexRef = useRef(0);
    const lastSpawnRef = useRef(0);
    const idCounterRef = useRef(0);

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.fromTo(nameRef.current,
            { opacity: 0, y: 60, filter: 'blur(15px)' },
            { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2 }
        )
            .fromTo(titleRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8 },
                '-=0.5'
            );
    }, []);

    const spawnImage = useCallback((x, y) => {
        const now = Date.now();
        if (now - lastSpawnRef.current < 120) return; // throttle
        lastSpawnRef.current = now;

        const imgSrc = trailImages[imgIndexRef.current % trailImages.length];
        imgIndexRef.current++;

        const id = idCounterRef.current++;
        const rotation = (Math.random() - 0.5) * 24; // -12 to 12 degrees
        const offsetX = (Math.random() - 0.5) * 40;
        const offsetY = (Math.random() - 0.5) * 40;

        const newImg = {
            id,
            src: imgSrc,
            x: x + offsetX,
            y: y + offsetY,
            rotation,
        };

        setImages(prev => {
            const updated = [...prev, newImg];
            // Keep max 6 images at a time
            if (updated.length > 6) return updated.slice(-6);
            return updated;
        });

        // Auto-remove after fade out
        setTimeout(() => {
            setImages(prev => prev.filter(img => img.id !== id));
        }, 1200);
    }, []);

    const handleMouseMove = useCallback((e) => {
        const rect = heroRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        spawnImage(x, y);
    }, [spawnImage]);

    return (
        <section
            className="hero"
            id="hero"
            ref={heroRef}
            onMouseMove={handleMouseMove}
        >
            {/* Mouse trail images */}
            {images.map((img) => (
                <div
                    key={img.id}
                    className="hero__trail-img"
                    style={{
                        left: `${img.x}px`,
                        top: `${img.y}px`,
                        transform: `translate(-50%, -50%) rotate(${img.rotation}deg)`,
                    }}
                >
                    <img src={img.src} alt="" />
                </div>
            ))}

            <h1 className="hero__name" ref={nameRef}>PRERIT SIWACH</h1>
            <p className="hero__title" ref={titleRef}>Full Stack Developer</p>
            <div className="hero__scroll-indicator">
                <span>Scroll</span>
                <div className="arrow"></div>
            </div>
        </section>
    );
}
