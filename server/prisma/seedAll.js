import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seeding (Services, Programs, Team)...\n');

    // Note: Posts are not included because they require User relationship
    // Services, Programs, and Team can be seeded independently

    // 1. SERVICES
    console.log('📦 Seeding Services...');
    const services = [
        {
            title: 'AI Consulting',
            description: 'Expert guidance to integrate AI solutions into your business operations and drive innovation. Our consultants analyze your workflows, identify automation opportunities, and create a tailored AI adoption roadmap.',
            icon: '/icons/consulting.svg',
            category: 'consulting',
            popular: false,
            order: 1,
            isActive: true
        },
        {
            title: 'Custom AI Development',
            description: 'Build tailored AI models and applications designed specifically for your unique challenges. From computer vision to NLP, we develop custom solutions that integrate seamlessly with your existing systems.',
            icon: '/icons/development.svg',
            category: 'development',
            popular: true,
            order: 2,
            isActive: true
        },
        {
            title: 'Data Analytics & Insights',
            description: 'Transform your data into actionable insights with advanced analytics and visualization. We help you make data-driven decisions with real-time dashboards and predictive analytics.',
            icon: '/icons/analytics.svg',
            category: 'analytics',
            popular: false,
            order: 3,
            isActive: true
        },
        {
            title: 'AI Training Programs',
            description: 'Upskill your team with comprehensive AI training tailored to your industry. Our programs range from beginner fundamentals to advanced machine learning workshops.',
            icon: '/icons/training.svg',
            category: 'training',
            popular: false,
            order: 4,
            isActive: true
        },
        {
            title: 'AI Integration Services',
            description: 'Seamlessly integrate AI capabilities into your existing software stack. We ensure smooth deployment with minimal disruption to your current operations.',
            icon: '/icons/network.svg',
            category: 'integration',
            popular: false,
            order: 5,
            isActive: true
        },
        {
            title: 'Process Automation',
            description: 'Automate repetitive tasks and workflows with intelligent AI agents. Reduce operational costs while improving accuracy and speed across your organization.',
            icon: '/icons/robot.svg',
            category: 'automation',
            popular: true,
            order: 6,
            isActive: true
        }
    ];

    for (const service of services) {
        await prisma.service.create({ data: service });
        console.log(`  ✓ ${service.title}`);
    }

    // 2. PROGRAMS  
    console.log('\n📚 Seeding Programs...');
    const programs = [
        {
            title: 'AI Fundamentals',
            description: 'Master the core concepts of Artificial Intelligence with hands-on projects and real-world applications. Perfect for beginners looking to start their AI journey. Learn Python, machine learning basics, and how to build your first AI models.',
            duration: '12 weeks',
            level: 'Beginner',
            features: [
                'Introduction to Machine Learning',
                'Python for AI Development',
                'Neural Networks Basics',
                'Hands-on Projects with Real Data',
                'Certificate of Completion',
                'Access to AI Community'
            ],
            price: '$120',
            icon: '/icons/robot.svg',
            popular: false,
            order: 1,
            isActive: true
        },
        {
            title: 'AIPreneurs Program',
            description: 'Transform your business ideas into AI-powered solutions. Learn to identify opportunities, build MVPs, and scale AI products. This program combines technical skills with entrepreneurship fundamentals.',
            duration: '16 weeks',
            level: 'Intermediate',
            features: [
                'AI Business Strategy',
                'MVP Development',
                'Product-Market Fit Analysis',
                'Scaling AI Solutions',
                'Mentorship & Networking',
                'Access to Funding Network'
            ],
            price: '$150',
            icon: '/icons/lightbulb.svg',
            popular: true,
            order: 2,
            isActive: true
        },
        {
            title: 'Data Science Mastery',
            description: 'Deep dive into advanced data science techniques, statistical modeling, and machine learning algorithms to become an expert data scientist. Work on enterprise-level projects with industry mentors.',
            duration: '24 weeks',
            level: 'Advanced',
            features: [
                'Advanced Statistics & Probability',
                'Deep Learning & Neural Networks',
                'Big Data Processing with Spark',
                'Real-world Capstone Project',
                'Job Placement Support',
                'Industry Certification'
            ],
            price: '$180',
            icon: '/icons/chart.svg',
            popular: false,
            order: 3,
            isActive: true
        },
        {
            title: 'Banking AI Workshop',
            description: 'Specialized intensive program for banking professionals to leverage AI in financial services and strategic decision-making. Learn fraud detection, risk assessment, and customer analytics.',
            duration: '4 weeks',
            level: 'Professional',
            features: [
                'AI Applications in Banking',
                'Fraud Detection Systems',
                'Risk Assessment Models',
                'Customer Behavior Analytics',
                'Regulatory Compliance with AI',
                'Executive-level Insights'
            ],
            price: '$160',
            icon: '/icons/bank.svg',
            popular: false,
            order: 4,
            isActive: true
        },
        {
            title: 'Corporate AI Training',
            description: 'Custom AI upskilling programs designed specifically for your organization\'s unique needs and strategic objectives. We tailor the curriculum to your industry and team requirements.',
            duration: 'Flexible',
            level: 'All Levels',
            features: [
                'Fully Customized Curriculum',
                'On-site or Remote Delivery',
                'Team Collaboration Projects',
                'Ongoing Support & Mentorship',
                'ROI Measurement Framework',
                'Executive Reporting'
            ],
            price: 'Custom',
            icon: '/icons/target.svg',
            popular: false,
            order: 5,
            isActive: true
        }
    ];

    for (const program of programs) {
        await prisma.program.create({ data: program });
        console.log(`  ✓ ${program.title}`);
    }

    // 3. TEAM MEMBERS
    console.log('\n👥 Seeding Team Members...');
    const team = [
        {
            name: 'Dr. Sarah Chen',
            role: 'Chief AI Scientist',
            bio: 'PhD in Machine Learning from MIT. 10+ years building AI systems for Fortune 500 companies. Previously led AI research teams at Google and Microsoft.',
            image: 'https://ui-avatars.com/api/?name=Sarah+Chen&background=3B82F6&color=fff&size=200',
            linkedin: 'https://linkedin.com/in/sarahchen',
            twitter: 'https://twitter.com/sarahchen_ai',
            github: 'https://github.com/sarahchen',
            order: 1
        },
        {
            name: 'Marcus Johnson',
            role: 'Lead AI Engineer',
            bio: 'Former Google AI engineer specializing in NLP and computer vision applications. Expert in building scalable ML pipelines and production AI systems.',
            image: 'https://ui-avatars.com/api/?name=Marcus+Johnson&background=8B5CF6&color=fff&size=200',
            linkedin: 'https://linkedin.com/in/marcusj',
            twitter: null,
            github: 'https://github.com/marcusj-ai',
            order: 2
        },
        {
            name: 'Aisha Patel',
            role: 'Data Science Lead',
            bio: 'Expert in predictive analytics and big data. Published researcher in deep learning with papers in top AI conferences. Previously at Amazon and Netflix.',
            image: 'https://ui-avatars.com/api/?name=Aisha+Patel&background=10B981&color=fff&size=200',
            linkedin: 'https://linkedin.com/in/aishapatel',
            twitter: 'https://twitter.com/aisha_ds',
            github: 'https://github.com/aishapatel',
            order: 3
        },
        {
            name: 'David Kim',
            role: 'AI Solutions Architect',
            bio: 'Specialized in designing scalable AI infrastructure for enterprise clients. 8+ years experience deploying ML models at scale across various industries.',
            image: 'https://ui-avatars.com/api/?name=David+Kim&background=F59E0B&color=fff&size=200',
            linkedin: 'https://linkedin.com/in/davidkim-ai',
            twitter: null,
            github: 'https://github.com/davidkim',
            order: 4
        },
        {
            name: 'Elena Rodriguez',
            role: 'AI Education Director',
            bio: 'Former professor at Stanford. Passionate about making AI accessible to everyone. Designed curriculum for 50+ AI training programs worldwide.',
            image: 'https://ui-avatars.com/api/?name=Elena+Rodriguez&background=EC4899&color=fff&size=200',
            linkedin: 'https://linkedin.com/in/elenarodriguez',
            twitter: 'https://twitter.com/elena_ai_edu',
            github: null,
            order: 5
        },
        {
            name: 'James Wright',
            role: 'Head of Business Development',
            bio: 'MBA from Wharton. Expert in AI strategy consulting and digital transformation. Helped 100+ companies adopt AI solutions successfully.',
            image: 'https://ui-avatars.com/api/?name=James+Wright&background=6366F1&color=fff&size=200',
            linkedin: 'https://linkedin.com/in/jameswright-ai',
            twitter: 'https://twitter.com/jameswright_biz',
            github: null,
            order: 6
        }
    ];

    for (const member of team) {
        await prisma.teamMember.create({ data: member });
        console.log(`  ✓ ${member.name}`);
    }

    console.log('\n✨ Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   Services: ${services.length}`);
    console.log(`   Programs: ${programs.length}`);
    console.log(`   Team Members: ${team.length}`);
    console.log(`   TOTAL: ${services.length + programs.length + team.length} items`);
    console.log('\n🎉 Your website now has demo data for Services, Programs, and Team!');
    console.log('\n📝 Note: Blog and News posts should be created through the admin panel');
    console.log('   because they require authentication and User relationships.');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
