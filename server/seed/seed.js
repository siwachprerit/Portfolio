import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from '../models/Project.js';

dotenv.config();

const projects = [
    {
        title: 'CHAINXCHANGE',
        subtitle: 'Crypto Trading Platform',
        description: 'A full-stack MERN crypto trading platform with real-time market data APIs, Redis caching, simulated trading, wallet management, portfolio analytics with PnL tracking, and leaderboard. Deployed on Vercel.',
        category: 'Full Stack',
        image: '/images/chainxchange.png',
        techStack: ['React', 'Vite', 'Node.js', 'Express.js', 'MongoDB', 'Redis'],
        githubUrl: 'https://github.com/siwachprerit',
        liveUrl: '',
        featured: true,
        order: 1,
    },
    {
        title: 'DRAFTED',
        subtitle: 'Blogging Platform',
        description: 'A MERN-stack blogging platform with JWT authentication, bcrypt password hashing, real-time notifications via Socket.IO, user follow system, likes, comments, and personalized feed. Frontend on Vercel, backend on Render, Cloudinary for images.',
        category: 'Full Stack',
        image: '/images/drafted.png',
        techStack: ['React 19', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'Socket.IO', 'Cloudinary'],
        githubUrl: 'https://github.com/siwachprerit',
        liveUrl: '',
        featured: true,
        order: 2,
    },
    {
        title: 'GAME HUB',
        subtitle: 'Game Module',
        description: 'A modular gaming platform using Spring Boot microservices architecture with REST APIs, secure hashing, inter-service communication using OpenFeign, and Resilience4j circuit breaker pattern for fault tolerance.',
        category: 'Backend',
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800',
        techStack: ['Java', 'Spring Boot', 'OpenFeign', 'Resilience4j', 'Maven'],
        githubUrl: 'https://github.com/siwachprerit',
        liveUrl: '',
        featured: true,
        order: 3,
    },
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
        await Project.deleteMany({});
        await Project.insertMany(projects);
        console.log('Database seeded with projects!');
        process.exit(0);
    } catch (error) {
        console.error('Seed error:', error);
        process.exit(1);
    }
};

seedDB();
