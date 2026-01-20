import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const programs = [
    {
        title: 'AI Fundamentals',
        description: 'Master the core concepts of Artificial Intelligence with hands-on projects and real-world applications. Perfect for beginners looking to start their AI journey.',
        duration: '12 weeks',
        level: 'Beginner',
        features: [
            'Introduction to Machine Learning',
            'Python for AI Development',
            'Neural Networks Basics',
            'Hands-on Projects',
            'Certificate of Completion'
        ],
        price: '$120',
        icon: '🤖',
        popular: false,
        order: 1,
        isActive: true
    },
    {
        title: 'AIPreneurs Program',
        description: 'Transform your business ideas into AI-powered solutions. Learn to identify opportunities, build MVPs, and scale AI products.',
        duration: '16 weeks',
        level: 'Intermediate',
        features: [
            'AI Business Strategy',
            'MVP Development',
            'Product-Market Fit',
            'Scaling AI Solutions',
            'Mentorship & Networking'
        ],
        price: '$150',
        icon: '💡',
        popular: true,
        order: 2,
        isActive: true
    },
    {
        title: 'Data Science Mastery',
        description: 'Deep dive into advanced data science techniques, statistical modeling, and machine learning algorithms to become an expert data scientist.',
        duration: '24 weeks',
        level: 'Advanced',
        features: [
            'Advanced Statistics',
            'Deep Learning',
            'Big Data Processing',
            'Real-world Capstone Project',
            'Job Placement Support'
        ],
        price: '$180',
        icon: '📊',
        popular: false,
        order: 3,
        isActive: true
    }
];

async function main() {
    console.log('🌱 Seeding programs...');

    for (const program of programs) {
        await prisma.program.create({
            data: program
        });
        console.log(`✅ Created program: ${program.title}`);
    }

    console.log('✨ Program seeding completed!');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding programs:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
