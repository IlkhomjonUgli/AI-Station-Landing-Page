import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function addMorePosts() {
    console.log('🌱 Adding more blog and news posts...');

    // Get the admin user
    const admin = await prisma.user.findFirst({
        where: { email: 'admin@aistation.uz' }
    });

    if (!admin) {
        console.error('❌ Admin user not found');
        return;
    }

    // Add 10 more blog posts
    const blogTitles = [
        'Deep Learning Fundamentals Explained',
        'Natural Language Processing in 2025',
        'Computer Vision Applications in Business',
        'AI Ethics and Responsible Development',
        'Getting Started with TensorFlow',
        'Python for Data Science Beginners',
        'Machine Learning Project Best Practices',
        'Understanding Neural Networks',
        'AI in Healthcare: Opportunities and Challenges',
        'Building Chatbots with LLMs'
    ];

    const blogPosts = [];
    for (let i = 0; i < blogTitles.length; i++) {
        const title = blogTitles[i];
        const slug = title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');

        const post = await prisma.post.create({
            data: {
                title,
                slug: `${slug}-${Date.now()}-${i}`,
                content: `# ${title}\n\nThis is a comprehensive guide about ${title.toLowerCase()}. In this article, we'll explore various aspects and provide practical insights.\n\n## Key Concepts\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n\n## Practical Examples\n\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
                excerpt: `A comprehensive guide exploring ${title.toLowerCase()} with practical examples and insights.`,
                type: 'blog',
                status: 'published',
                publishedAt: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)), // Spread over last 10 days
                authorId: admin.id
            }
        });
        blogPosts.push(post);
    }

    console.log(`✅ Created ${blogPosts.length} blog posts`);

    // Add 12 more news articles
    const newsTitles = [
        'New AI Workshop Series Announced for Summer 2025',
        'AI Station Partners with Leading Tech Companies',
        '100+ Students Enrolled in AIpreneurs Program',
        'Free AI Webinar: Introduction to Machine Learning',
        'AI Station Wins Best EdTech Platform Award',
        'New Campus Opening in Samarkand',
        'Guest Lecture by Google AI Researcher',
        'Scholarship Program for Underprivileged Students',
        'AI Station Hackathon 2025 Registration Open',
        'Corporate Training Program Expansion Announced',
        'Student Success: Landed Job at Microsoft',
        'New Course: Advanced Deep Learning'
    ];

    const newsPosts = [];
    for (let i = 0; i < newsTitles.length; i++) {
        const title = newsTitles[i];
        const slug = title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');

        const post = await prisma.post.create({
            data: {
                title,
                slug: `${slug}-${Date.now()}-${i}`,
                content: `# ${title}\n\nExciting news from AI Station! ${title}\n\nWe are thrilled to announce this latest development that will benefit our students and the broader AI community. Stay tuned for more updates!`,
                excerpt: `${title} - Read more about this exciting announcement.`,
                type: 'news',
                status: 'published',
                publishedAt: new Date(Date.now() - (i * 12 * 60 * 60 * 1000)), // Spread over last 6 days
                authorId: admin.id
            }
        });
        newsPosts.push(post);
    }

    console.log(`✅ Created ${newsPosts.length} news articles`);

    // Show total counts
    const blogCount = await prisma.post.count({ where: { type: 'blog', status: 'published' } });
    const newsCount = await prisma.post.count({ where: { type: 'news', status: 'published' } });

    console.log('\n📊 Total Published Posts:');
    console.log(`   Blog: ${blogCount} posts`);
    console.log(`   News: ${newsCount} articles`);
    console.log('\n✨ Database populated with more content!');
}

addMorePosts()
    .catch((e) => {
        console.error('❌ Error adding posts:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
