import { Router } from 'express';
import { getCategories, createCategory } from '../controllers/category.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { roleMiddleware } from '../middleware/roleMiddleware.js';

const router = Router();

// Public route for fetching categories (e.g., guest issue reporter)
router.get('/public', getCategories);

// Everyone who is authenticated can get categories (to filter issues, report issues, create assets etc)
router.get('/', authMiddleware, getCategories);

// Only admins and supervisors can register brand new categories
router.post('/', authMiddleware, roleMiddleware(['admin', 'supervisor']), createCategory);

export default router;
