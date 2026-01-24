import express from 'express';
import { generateSitemap } from '../controllers/sitemapController.js';

const router = express.Router();

// Public route - XML sitemap
router.get('/sitemap.xml', generateSitemap);

export default router;
