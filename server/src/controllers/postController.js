import prisma from '../config/database.js';

// Helper function to generate slug from title
const generateSlug = (title) => {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
};

// GET /api/posts - Get all posts with filters
export const getPosts = async (req, res, next) => {
    try {
        const { type, status, page = 1, limit = 10, sort = 'publishedAt:desc' } = req.query;

        const where = {};
        if (type) where.type = type;
        if (status) where.status = status;

        const [sortField, sortOrder] = sort.split(':');
        const orderBy = { [sortField]: sortOrder || 'desc' };

        const skip = (parseInt(page) - 1) * parseInt(limit);
        const take = parseInt(limit);

        const [posts, total] = await Promise.all([
            prisma.post.findMany({
                where,
                include: {
                    author: {
                        select: { id: true, name: true, email: true }
                    },
                    tags: {
                        include: { tag: true }
                    }
                },
                orderBy,
                skip,
                take
            }),
            prisma.post.count({ where })
        ]);

        res.json({
            success: true,
            data: {
                posts,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total,
                    totalPages: Math.ceil(total / parseInt(limit))
                }
            }
        });
    } catch (error) {
        next(error);
    }
};

// GET /api/posts/:id - Get single post
export const getPost = async (req, res, next) => {
    try {
        const { id } = req.params;

        const post = await prisma.post.findUnique({
            where: { id: parseInt(id) },
            include: {
                author: {
                    select: { id: true, name: true, email: true }
                },
                tags: {
                    include: { tag: true }
                }
            }
        });

        if (!post) {
            return res.status(404).json({
                success: false,
                error: 'Post not found'
            });
        }

        // Increment views
        await prisma.post.update({
            where: { id: parseInt(id) },
            data: { views: { increment: 1 } }
        });

        res.json({
            success: true,
            data: { post }
        });
    } catch (error) {
        next(error);
    }
};

// POST /api/posts - Create new post
export const createPost = async (req, res, next) => {
    try {
        const { title, content, excerpt, type, featuredImage } = req.body;

        const slug = generateSlug(title);

        const post = await prisma.post.create({
            data: {
                title,
                slug,
                content,
                excerpt,
                type,
                featuredImage,
                authorId: req.user.id,
                status: 'draft'
            },
            include: {
                author: {
                    select: { id: true, name: true, email: true }
                }
            }
        });

        res.status(201).json({
            success: true,
            data: { post }
        });
    } catch (error) {
        next(error);
    }
};

// PUT /api/posts/:id - Update post
export const updatePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, content, excerpt, type, featuredImage } = req.body;

        const updateData = {
            content,
            excerpt,
            type,
            featuredImage
        };

        if (title) {
            updateData.title = title;
            updateData.slug = generateSlug(title);
        }

        const post = await prisma.post.update({
            where: { id: parseInt(id) },
            data: updateData,
            include: {
                author: {
                    select: { id: true, name: true, email: true }
                }
            }
        });

        res.json({
            success: true,
            data: { post }
        });
    } catch (error) {
        next(error);
    }
};

// DELETE /api/posts/:id - Delete post
export const deletePost = async (req, res, next) => {
    try {
        const { id } = req.params;

        await prisma.post.delete({
            where: { id: parseInt(id) }
        });

        res.json({
            success: true,
            message: 'Post deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

// PATCH /api/posts/:id/publish - Publish post
export const publishPost = async (req, res, next) => {
    try {
        const { id } = req.params;

        const post = await prisma.post.update({
            where: { id: parseInt(id) },
            data: {
                status: 'published',
                publishedAt: new Date()
            }
        });

        res.json({
            success: true,
            data: { post }
        });
    } catch (error) {
        next(error);
    }
};

// PATCH /api/posts/:id/unpublish - Unpublish post
export const unpublishPost = async (req, res, next) => {
    try {
        const { id } = req.params;

        const post = await prisma.post.update({
            where: { id: parseInt(id) },
            data: {
                status: 'draft',
                publishedAt: null
            }
        });

        res.json({
            success: true,
            data: { post }
        });
    } catch (error) {
        next(error);
    }
};
