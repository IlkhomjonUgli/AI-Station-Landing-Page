import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // Create admin user
    const passwordHash = await bcrypt.hash('admin123', 10);

    const admin = await prisma.user.upsert({
        where: { email: 'admin@aistation.uz' },
        update: {},
        create: {
            email: 'admin@aistation.uz',
            passwordHash,
            name: 'AI Station Admin',
            role: 'admin'
        }
    });

    console.log('✅ Created admin user:', admin.email);

    // Create sample blog posts
    const blogPost1 = await prisma.post.create({
        data: {
            title: 'Introduction to Machine Learning',
            slug: 'introduction-to-machine-learning',
            content: `# Introduction to Machine Learning

Machine Learning is transforming industries worldwide. In this comprehensive guide, we'll explore the fundamentals of ML and how it's shaping the future.

## What is Machine Learning?

Machine Learning is a subset of artificial intelligence that enables systems to learn and improve from experience without being explicitly programmed.

## Key Concepts

1. **Supervised Learning**: Learning from labeled data
2. **Unsupervised Learning**: Finding patterns in unlabeled data
3. **Reinforcement Learning**: Learning through trial and error

Join our AI Fundamentals program to dive deeper into these concepts!`,
            excerpt: 'Learn the basics of Machine Learning and how it\'s transforming industries worldwide.',
            type: 'blog',
            status: 'published',
            publishedAt: new Date('2025-12-20'),
            authorId: admin.id
        }
    });

    const blogPost2 = await prisma.post.create({
        data: {
            title: 'Building AI-Powered Applications',
            slug: 'building-ai-powered-applications',
            content: `# Building AI-Powered Applications

In this article, we explore how to integrate AI into your applications and create intelligent solutions.

## Getting Started

The rise of AI APIs and frameworks makes it easier than ever to build intelligent applications...`,
            excerpt: 'Discover how to integrate AI into your applications with modern frameworks and APIs.',
            type: 'blog',
            status: 'published',
            publishedAt: new Date('2025-12-25'),
            authorId: admin.id
        }
    });

    // Create sample news articles
    const news1 = await prisma.post.create({
        data: {
            title: 'AI Station Launches New Data Science Program',
            slug: 'ai-station-launches-new-data-science-program',
            content: `# AI Station Launches New Data Science Program

We're excited to announce the launch of our comprehensive Data Science Mastery program!

## Program Highlights

- 4 months intensive training
- Hands-on projects with real data
- Industry expert instructors
- Job placement assistance

Applications are now open. Enroll today!`,
            excerpt: 'Announcing our new 4-month Data Science Mastery program with job placement assistance.',
            type: 'news',
            status: 'published',
            publishedAt: new Date('2025-12-27'),
            authorId: admin.id
        }
    });

    const news2 = await prisma.post.create({
        data: {
            title: '50+ Students Graduate from AI Fundamentals',
            slug: '50-students-graduate-from-ai-fundamentals',
            content: `# 50+ Students Graduate from AI Fundamentals

Congratulations to our latest cohort of 50+ students who successfully completed the AI Fundamentals program!

## Success Stories

Our graduates are now working at leading tech companies across Uzbekistan...`,
            excerpt: 'Celebrating 50+ graduates from our AI Fundamentals program, now working in leading tech companies.',
            type: 'news',
            status: 'published',
            publishedAt: new Date('2025-12-26'),
            authorId: admin.id
        }
    });

    console.log('✅ Created sample posts');
    console.log(`   - ${blogPost1.title} (blog)`);
    console.log(`   - ${blogPost2.title} (blog)`);
    console.log(`   - ${news1.title} (news)`);
    console.log(`   - ${news2.title} (news)`);

    console.log('✅ Database seeding completed!');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
