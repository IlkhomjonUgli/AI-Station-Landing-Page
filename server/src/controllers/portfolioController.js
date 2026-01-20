import prisma from '../config/database.js';

// Get all portfolios (public - only active)
export const getPortfolios = async (req, res, next) => {
    try {
        const portfolios = await prisma.portfolio.findMany({
            where: { isActive: true },
            orderBy: [
                { order: 'asc' },
                { createdAt: 'desc' }
            ]
        });

        res.json({
            success: true,
            data: { portfolios }
        });
    } catch (error) {
        next(error);
    }
};

// Get all portfolios (admin - including inactive)
export const getAllPortfolios = async (req, res, next) => {
    try {
        const portfolios = await prisma.portfolio.findMany({
            orderBy: [
                { order: 'asc' },
                { createdAt: 'desc' }
            ]
        });

        res.json({
            success: true,
            data: { portfolios }
        });
    } catch (error) {
        next(error);
    }
};

// Get single portfolio
export const getPortfolio = async (req, res, next) => {
    try {
        const { id } = req.params;

        const portfolio = await prisma.portfolio.findUnique({
            where: { id: parseInt(id) }
        });

        if (!portfolio) {
            return res.status(404).json({
                success: false,
                error: 'Portfolio not found'
            });
        }

        res.json({
            success: true,
            data: { portfolio }
        });
    } catch (error) {
        next(error);
    }
};

// Create new portfolio
export const createPortfolio = async (req, res, next) => {
    try {
        const {
            title, client, category, description, challenge, solution,
            results, technologies, image, gradient, featured, order, isActive
        } = req.body;

        if (!title || !client || !category || !description || !challenge || !solution) {
            return res.status(400).json({
                success: false,
                error: 'Title, client, category, description, challenge, and solution are required'
            });
        }

        const portfolio = await prisma.portfolio.create({
            data: {
                title,
                client,
                category,
                description,
                challenge,
                solution,
                results: results || [],
                technologies: technologies || [],
                image: image || null,
                gradient: gradient || 'var(--gradient-primary)',
                featured: featured || false,
                order: order || 0,
                isActive: isActive !== undefined ? isActive : true
            }
        });

        res.status(201).json({
            success: true,
            data: { portfolio }
        });
    } catch (error) {
        next(error);
    }
};

// Update portfolio
export const updatePortfolio = async (req, res, next) => {
    try {
        const { id } = req.params;
        const {
            title, client, category, description, challenge, solution,
            results, technologies, image, gradient, featured, order, isActive
        } = req.body;

        const portfolio = await prisma.portfolio.update({
            where: { id: parseInt(id) },
            data: {
                ...(title !== undefined && { title }),
                ...(client !== undefined && { client }),
                ...(category !== undefined && { category }),
                ...(description !== undefined && { description }),
                ...(challenge !== undefined && { challenge }),
                ...(solution !== undefined && { solution }),
                ...(results !== undefined && { results }),
                ...(technologies !== undefined && { technologies }),
                ...(image !== undefined && { image }),
                ...(gradient !== undefined && { gradient }),
                ...(featured !== undefined && { featured }),
                ...(order !== undefined && { order }),
                ...(isActive !== undefined && { isActive })
            }
        });

        res.json({
            success: true,
            data: { portfolio }
        });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({
                success: false,
                error: 'Portfolio not found'
            });
        }
        next(error);
    }
};

// Delete portfolio
export const deletePortfolio = async (req, res, next) => {
    try {
        const { id } = req.params;

        await prisma.portfolio.delete({
            where: { id: parseInt(id) }
        });

        res.json({
            success: true,
            message: 'Portfolio deleted successfully'
        });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({
                success: false,
                error: 'Portfolio not found'
            });
        }
        next(error);
    }
};
