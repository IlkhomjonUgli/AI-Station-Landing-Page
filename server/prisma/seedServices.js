import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedServices() {
    console.log('Seeding services...');

    const services = [
        {
            title: 'AI Consulting',
            description: 'Strategic guidance to integrate AI into your business operations and drive innovation.',
            icon: '🎯',
            category: 'consulting',
            popular: false,
            order: 1,
            isActive: true
        },
        {
            title: 'Custom AI Development',
            description: 'Tailored AI solutions built specifically for your unique business needs and challenges.',
            icon: '⚙️',
            category: 'development',
            popular: true,
            order: 2,
            isActive: true
        },
        {
            title: 'Data Analytics',
            description: 'Transform your data into actionable insights with advanced analytics and visualization.',
            icon: '📊',
            category: 'analytics',
            popular: false,
            order: 3,
            isActive: true
        },
        {
            title: 'AI  Training Programs',
            description: 'Comprehensive training to upskill your team in AI technologies and best practices.',
            icon: '🎓',
            category: 'training',
            popular: false,
            order: 4,
            isActive: true
        }
    ];

    for (const service of services) {
        await prisma.service.create({
            data: service
        });
    }

    console.log('✅ Services seeded successfully!');
}

seedServices()
    .catch((e) => {
        console.error('Error seeding services:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
