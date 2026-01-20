import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all active programs (public endpoint)
export const getPrograms = async (req, res, next) => {
    try {
        const programs = await prisma.program.findMany({
            where: { isActive: true },
            orderBy: [
                { order: 'asc' },
                { createdAt: 'asc' }
            ]
        });

        res.json({
            success: true,
            data: { programs }
        });
    } catch (error) {
        next(error);
    }
};

// Get all programs (admin endpoint)
export const getAllPrograms = async (req, res, next) => {
    try {
        const programs = await prisma.program.findMany({
            orderBy: [
                { order: 'asc' },
                { createdAt: 'asc' }
            ]
        });

        res.json({
            success: true,
            data: { programs }
        });
    } catch (error) {
        next(error);
    }
};

// Get single program (admin endpoint)
export const getProgram = async (req, res, next) => {
    try {
        const { id } = req.params;

        const program = await prisma.program.findUnique({
            where: { id: parseInt(id) }
        });

        if (!program) {
            return res.status(404).json({
                success: false,
                error: 'Program not found'
            });
        }

        res.json({
            success: true,
            data: { program }
        });
    } catch (error) {
        next(error);
    }
};

// Create new program (admin endpoint)
export const createProgram = async (req, res, next) => {
    try {
        const {
            title,
            description,
            duration,
            level,
            features,
            price,
            icon,
            popular,
            order,
            isActive
        } = req.body;

        // Validation
        if (!title || !description || !duration || !level) {
            return res.status(400).json({
                success: false,
                error: 'Title, description, duration, and level are required'
            });
        }

        // Ensure features is an array
        const featuresArray = Array.isArray(features) ? features : [];

        const program = await prisma.program.create({
            data: {
                title,
                description,
                duration,
                level,
                features: featuresArray,
                price: price || null,
                icon: icon || null,
                popular: popular || false,
                order: order || 0,
                isActive: isActive !== undefined ? isActive : true
            }
        });

        res.status(201).json({
            success: true,
            data: { program }
        });
    } catch (error) {
        next(error);
    }
};

// Update program (admin endpoint)
export const updateProgram = async (req, res, next) => {
    try {
        const { id } = req.params;
        const {
            title,
            description,
            duration,
            level,
            features,
            price,
            icon,
            popular,
            order,
            isActive
        } = req.body;

        // Check if program exists
        const existingProgram = await prisma.program.findUnique({
            where: { id: parseInt(id) }
        });

        if (!existingProgram) {
            return res.status(404).json({
                success: false,
                error: 'Program not found'
            });
        }

        // Ensure features is an array if provided
        const featuresArray = features !== undefined
            ? (Array.isArray(features) ? features : [])
            : undefined;

        const program = await prisma.program.update({
            where: { id: parseInt(id) },
            data: {
                ...(title !== undefined && { title }),
                ...(description !== undefined && { description }),
                ...(duration !== undefined && { duration }),
                ...(level !== undefined && { level }),
                ...(featuresArray !== undefined && { features: featuresArray }),
                ...(price !== undefined && { price }),
                ...(icon !== undefined && { icon }),
                ...(popular !== undefined && { popular }),
                ...(order !== undefined && { order }),
                ...(isActive !== undefined && { isActive })
            }
        });

        res.json({
            success: true,
            data: { program }
        });
    } catch (error) {
        next(error);
    }
};

// Delete program (admin endpoint)
export const deleteProgram = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Check if program exists
        const existingProgram = await prisma.program.findUnique({
            where: { id: parseInt(id) }
        });

        if (!existingProgram) {
            return res.status(404).json({
                success: false,
                error: 'Program not found'
            });
        }

        await prisma.program.delete({
            where: { id: parseInt(id) }
        });

        res.json({
            success: true,
            message: 'Program deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};
