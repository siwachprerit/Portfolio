import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import ScrollReveal from './ScrollReveal';

const techItems = [
    'React', 'Node.js', 'Express', 'MongoDB', 'Java',
    'Spring', 'AWS', 'Docker', 'Redis', 'PostgreSQL',
    'MySQL', 'Vite', 'Git', 'C++', 'JS',
    'Socket.IO', 'REST', 'Tailwind',
];

function createTextTexture(text) {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, 256, 64);
    ctx.font = 'bold 22px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(26, 26, 46, 0.8)';
    ctx.fillText(text, 128, 32);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
}

export default function TechGlobe() {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const width = container.clientWidth;
        const height = 500;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Wireframe globe — subtle purple tint for warm light mode
        const sphereGeo = new THREE.SphereGeometry(2.2, 24, 24);
        const sphereMat = new THREE.MeshBasicMaterial({
            color: 0x6C47FF,
            wireframe: true,
            transparent: true,
            opacity: 0.08,
        });
        const sphere = new THREE.Mesh(sphereGeo, sphereMat);
        scene.add(sphere);

        // Text sprites
        const sprites = [];
        const radius = 2.6;

        techItems.forEach((text, i) => {
            const phi = Math.acos(-1 + (2 * i) / techItems.length);
            const theta = Math.sqrt(techItems.length * Math.PI) * phi;

            const texture = createTextTexture(text);
            const material = new THREE.SpriteMaterial({
                map: texture,
                transparent: true,
                depthWrite: false,
            });

            const sprite = new THREE.Sprite(material);
            sprite.scale.set(1.5, 0.4, 1);
            sprite.position.setFromSphericalCoords(radius, phi, theta);

            sprites.push({ sprite, phi, theta });
            scene.add(sprite);
        });

        // Mouse interaction
        let mouseX = 0, mouseY = 0;
        const onMouseMove = (e) => {
            const rect = container.getBoundingClientRect();
            mouseX = ((e.clientX - rect.left) / width - 0.5) * 2;
            mouseY = ((e.clientY - rect.top) / height - 0.5) * 2;
        };
        container.addEventListener('mousemove', onMouseMove);

        // Animation
        let frameId;
        const animate = () => {
            frameId = requestAnimationFrame(animate);
            sphere.rotation.y += 0.003;
            sphere.rotation.y += mouseX * 0.005;
            sphere.rotation.x = mouseY * 0.3;

            sprites.forEach(({ sprite, phi, theta }) => {
                const x = radius * Math.sin(phi) * Math.cos(theta + sphere.rotation.y);
                const y = radius * Math.cos(phi);
                const z = radius * Math.sin(phi) * Math.sin(theta + sphere.rotation.y);
                sprite.position.set(x, y, z);
                const depthFactor = (z + radius) / (2 * radius);
                sprite.material.opacity = 0.3 + depthFactor * 0.7;
            });

            renderer.render(scene, camera);
        };
        animate();

        // Resize
        const handleResize = () => {
            const newWidth = container.clientWidth;
            camera.aspect = newWidth / height;
            camera.updateProjectionMatrix();
            renderer.setSize(newWidth, height);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(frameId);
            container.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('resize', handleResize);
            renderer.dispose();
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <section className="section" id="tech-globe">
            <ScrollReveal>
                <span className="section__label">Tech Stack</span>
                <h2 className="section__title">Technologies</h2>
            </ScrollReveal>
            <div
                ref={containerRef}
                className="tech-globe"
                style={{ width: '100%', height: '500px', cursor: 'grab' }}
            />
        </section>
    );
}
