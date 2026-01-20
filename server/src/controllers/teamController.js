import prisma from '../config/database.js';

// Get all team members (public)
export const getAllTeamMembers = async (req, res, next) => {
    try {
        const teamMembers = await prisma.teamMember.findMany({
            orderBy: { order: 'asc' }
        });

        res.json({
            success: true,
            data: { teamMembers }
        });
    } catch (error) {
        next(error);
    }
};

// Get single team member
export const getTeamMember = async (req, res, next) => {
    try {
        const { id } = req.params;

        const teamMember = await prisma.teamMember.findUnique({
            where: { id: parseInt(id) }
        });

        if (!teamMember) {
            return res.status(404).json({
                success: false,
                error: 'Team member not found'
            });
        }

        res.json({
            success: true,
            data: { teamMember }
        });
    } catch (error) {
        next(error);
    }
};

// Create team member (protected)
export const createTeamMember = async (req, res, next) => {
    try {
        const { name, role, bio, image, linkedin, twitter, github, order } = req.body;

        // Validation
        if (!name || !role) {
            return res.status(400).json({
                success: false,
                error: 'Name and role are required'
            });
        }

        const teamMember = await prisma.teamMember.create({
            data: {
                name,
                role,
                bio: bio || null,
                image: image || null,
                linkedin: linkedin || null,
                twitter: twitter || null,
                github: github || null,
                order: order || 0
            }
        });

        res.status(201).json({
            success: true,
            data: { teamMember }
        });
    } catch (error) {
        next(error);
    }
};

// Update team member (protected)
export const updateTeamMember = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, role, bio, image, linkedin, twitter, github, order } = req.body;

        const teamMember = await prisma.teamMember.update({
            where: { id: parseInt(id) },
            data: {
                ...(name && { name }),
                ...(role && { role }),
                ...(bio !== undefined && { bio }),
                ...(image !== undefined && { image }),
                ...(linkedin !== undefined && { linkedin }),
                ...(twitter !== undefined && { twitter }),
                ...(github !== undefined && { github }),
                ...(order !== undefined && { order })
            }
        });

        res.json({
            success: true,
            data: { teamMember }
        });
    } catch (error) {
        next(error);
    }
};

// Delete team member (protected)
export const deleteTeamMember = async (req, res, next) => {
    try {
        const { id } = req.params;

        await prisma.teamMember.delete({
            where: { id: parseInt(id) }
        });

        res.json({
            success: true,
            message: 'Team member deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};
