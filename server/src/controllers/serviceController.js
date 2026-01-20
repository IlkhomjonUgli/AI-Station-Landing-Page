import prisma from '../config/database.js';

// Get all services (public - only active)
export const getServices = async (req, res, next) => {
    try {
        const services = await prisma.service.findMany({
            where: { isActive: true },
            orderBy: [
                { order: 'asc' },
                { createdAt: 'asc' }
            ]
        });

        res.json({
            success: true,
            data: { services }
        });
    } catch (error) {
        next(error);
    }
};

// Get all services (admin - including inactive)
export const getAllServices = async (req, res, next) => {
    try {
        const services = await prisma.service.findMany({
            orderBy: [
                { order: 'asc' },
                { createdAt: 'asc' }
            ]
        });

        res.json({
            success: true,
            data: { services }
        });
    } catch (error) {
        next(error);
    }
};

// Get single service
export const getService = async (req, res, next) => {
    try {
        const { id } = req.params;

        const service = await prisma.service.findUnique({
            where: { id: parseInt(id) }
        });

        if (!service) {
            return res.status(404).json({
                success: false,
                error: 'Service not found'
            });
        }

        res.json({
            success: true,
            data: { service }
        });
    } catch (error) {
        next(error);
    }
};

// Create new service
export const createService = async (req, res, next) => {
    try {
        const { title, description, icon, category, popular, order, isActive } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                success: false,
                error: 'Title and description are required'
            });
        }

        const service = await prisma.service.create({
            data: {
                title,
                description,
                icon: icon || null,
                category: category || null,
                popular: popular || false,
                order: order || 0,
                isActive: isActive !== undefined ? isActive : true
            }
        });

        res.status(201).json({
            success: true,
            data: { service }
        });
    } catch (error) {
        next(error);
    }
};

// Update service
export const updateService = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description, icon, category, popular, order, isActive } = req.body;

        const service = await prisma.service.update({
            where: { id: parseInt(id) },
            data: {
                ...(title !== undefined && { title }),
                ...(description !== undefined && { description }),
                ...(icon !== undefined && { icon }),
                ...(category !== undefined && { category }),
                ...(popular !== undefined && { popular }),
                ...(order !== undefined && { order }),
                ...(isActive !== undefined && { isActive })
            }
        });

        res.json({
            success: true,
            data: { service }
        });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({
                success: false,
                error: 'Service not found'
            });
        }
        next(error);
    }
};

// Delete service
export const deleteService = async (req, res, next) => {
    try {
        const { id } = req.params;

        await prisma.service.delete({
            where: { id: parseInt(id) }
        });

        res.json({
            success: true,
            message: 'Service deleted successfully'
        });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({
                success: false,
                error: 'Service not found'
            });
        }
        next(error);
    }
};
