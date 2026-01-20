import bcrypt from 'bcryptjs';
import prisma from '../config/database.js';
import { generateToken } from '../utils/jwt.js';
import { logAuthSuccess, logAuthFailure, logError } from '../utils/logger.js';

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const ip = req.ip || req.connection.remoteAddress;

        // Find user
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            logAuthFailure(email, 'User not found', ip);
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials'
            });
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.passwordHash);

        if (!isValidPassword) {
            logAuthFailure(email, 'Invalid password', ip);
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials'
            });
        }

        // Generate token
        const token = generateToken({
            id: user.id,
            email: user.email,
            role: user.role
        });

        // Log successful authentication
        logAuthSuccess(email, user.id, ip);

        res.json({
            success: true,
            data: {
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role
                }
            }
        });
    } catch (error) {
        logError('Login error', error, { email: req.body.email });
        next(error);
    }
};

export const getMe = async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true
            }
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }

        res.json({
            success: true,
            data: { user }
        });
    } catch (error) {
        next(error);
    }
};
