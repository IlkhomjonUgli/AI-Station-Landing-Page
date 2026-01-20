import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const portfolioData = [
    {
        title: 'Smart Banking Analytics Platform',
        client: 'Major Financial Institution',
        category: 'finance',
        description: 'AI-powered analytics platform that revolutionized risk assessment and fraud detection for a leading bank.',
        challenge: 'The client needed to process millions of transactions daily while identifying potential fraud in real-time.',
        solution: 'Developed a custom ML model with 99.7% accuracy in fraud detection, reducing false positives by 85%.',
        results: [
            '$12M annual savings in fraud prevention',
            '85% reduction in false positives',
            '2.3s average detection time',
            '40% improvement in customer satisfaction'
        ],
        technologies: ['Python', 'TensorFlow', 'Azure ML', 'Power BI'],
        image: '/icons/bank.svg',
        gradient: 'var(--gradient-primary)',
        featured: false,
        order: 1,
        isActive: true
    },
    {
        title: 'Healthcare Diagnostic Assistant',
        client: 'Regional Medical Center',
        category: 'healthcare',
        description: 'AI diagnostic assistant that helps doctors identify diseases from medical imaging with unprecedented accuracy.',
        challenge: 'Radiologists were overwhelmed with case volume, leading to delayed diagnoses and potential errors.',
        solution: 'Built a computer vision system trained on 500K+ medical images to assist in preliminary diagnosis.',
        results: [
            '94% diagnostic accuracy',
            '60% faster initial assessment',
            '500+ patients helped daily',
            '98% doctor satisfaction rate'
        ],
        technologies: ['PyTorch', 'CNN', 'DICOM', 'React'],
        image: '/icons/clipboard.svg',
        gradient: 'var(--gradient-secondary)',
        featured: true,
        order: 2,
        isActive: true
    },
    {
        title: 'E-Commerce Recommendation Engine',
        client: 'Leading Online Retailer',
        category: 'retail',
        description: 'Personalized product recommendation system that increased sales and customer engagement significantly.',
        challenge: 'Low conversion rates and poor customer engagement despite high traffic volumes.',
        solution: 'Implemented advanced collaborative filtering and deep learning recommendation algorithms.',
        results: [
            '45% increase in conversion rate',
            '3.2x improvement in avg order value',
            '70% boost in customer retention',
            '$8.5M additional revenue/year'
        ],
        technologies: ['Python', 'Spark', 'Neo4j', 'AWS'],
        image: '/icons/chart.svg',
        gradient: 'var(--gradient-accent)',
        featured: false,
        order: 3,
        isActive: true
    },
    {
        title: 'Intelligent Supply Chain Optimizer',
        client: 'Global Manufacturing Corp',
        category: 'logistics',
        description: 'AI system that optimizes supply chain operations, reducing costs and improving delivery times.',
        challenge: 'Complex global supply chain with unpredictable delays and inefficient inventory management.',
        solution: 'Developed predictive analytics for demand forecasting and route optimization using reinforcement learning.',
        results: [
            '32% reduction in logistics costs',
            '25% faster delivery times',
            '50% better inventory accuracy',
            '$15M annual cost savings'
        ],
        technologies: ['Python', 'OR-Tools', 'Kubernetes', 'PostgreSQL'],
        image: '/icons/network.svg',
        gradient: 'var(--gradient-purple)',
        featured: false,
        order: 4,
        isActive: true
    },
    {
        title: 'Customer Service AI Chatbot',
        client: 'Telecom Provider',
        category: 'customer-service',
        description: 'Advanced NLP-powered chatbot handling customer inquiries 24/7 with human-like conversations.',
        challenge: 'High customer service costs and long wait times leading to customer dissatisfaction.',
        solution: 'Built conversational AI with sentiment analysis, multi-language support, and seamless human handoff.',
        results: [
            '80% of queries handled automatically',
            '90% customer satisfaction score',
            '4x reduction in response time',
            '$3M annual savings in support costs'
        ],
        technologies: ['GPT-4', 'Node.js', 'MongoDB', 'WebSocket'],
        image: '/icons/robot.svg',
        gradient: 'var(--gradient-sunset)',
        featured: true,
        order: 5,
        isActive: true
    },
    {
        title: 'Predictive Maintenance System',
        client: 'Industrial Equipment Manufacturer',
        category: 'manufacturing',
        description: 'IoT and AI-powered system that predicts equipment failures before they occur.',
        challenge: 'Unexpected equipment downtime costing millions in lost production and repairs.',
        solution: 'Deployed IoT sensors and ML models to predict failures up to 2 weeks in advance.',
        results: [
            '75% reduction in unplanned downtime',
            '90% prediction accuracy',
            '$20M saved in maintenance costs',
            '35% longer equipment lifespan'
        ],
        technologies: ['Python', 'IoT Hub', 'Time Series DB', 'Grafana'],
        image: '/icons/development.svg',
        gradient: 'var(--gradient-primary)',
        featured: false,
        order: 6,
        isActive: true
    }
];

async function seedPortfolio() {
    console.log('🚀 Seeding portfolio data...');

    try {
        // Clear existing portfolios
        await prisma.portfolio.deleteMany({});
        console.log('✅ Cleared existing portfolio data');

        // Insert new portfolios
        for (const portfolio of portfolioData) {
            await prisma.portfolio.create({ data: portfolio });
            console.log(`✅ Created: ${portfolio.title}`);
        }

        console.log(`\n🎉 Successfully seeded ${portfolioData.length} portfolio items!`);
    } catch (error) {
        console.error('❌ Error seeding portfolio:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

seedPortfolio();
