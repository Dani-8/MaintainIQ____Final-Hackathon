import { isMongoConnected } from '../config/db.js';
import Category from '../models/Category.js';
import { localDb } from '../services/localDbService.js';
import { apiResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';


// GET /api/categories
export const getCategories = asyncHandler(async (req, res) => {
    let categories = [];
    if (isMongoConnected()) {
        categories = await Category.find({}).sort({ name: 1 });
    } else {
        categories = localDb.categories.find({});
        categories.sort((a, b) => a.name.localeCompare(b.name));
    }

    // If DB/mock empty, seed default categories
    if (categories.length === 0) {
        const defaults = ['HVAC', 'Electrical', 'Plumbing', 'Fire Safety', 'Machinery', 'IT Infrastructure'];
        if (isMongoConnected()) {
            await Category.insertMany(defaults.map(name => ({ name })));
            categories = await Category.find({}).sort({ name: 1 });
        } else {
            defaults.forEach(name => localDb.categories.create({ name }));
            categories = localDb.categories.find({});
            categories.sort((a, b) => a.name.localeCompare(b.name));
        }
    }

    return apiResponse.success(res, categories, 'Categories fetched successfully');
})


// POST /api/categories (Admin/Supervisor Only)
export const createCategory = asyncHandler(async (req, res) => {
    const { name } = req.body;

    if (!name || name.trim() === '') {
        return apiResponse.error(res, 'Category name is required', 400);
    }

    const trimmedName = name.trim();

    let existingCategory = null;
    if (isMongoConnected()) {
        existingCategory = await Category.findOne({ name: { $regex: new RegExp(`^${trimmedName}$`, 'i') } });
    } else {
        existingCategory = localDb.categories.findOne({ name: trimmedName });
    }

    if (existingCategory) {
        return apiResponse.error(res, 'Category already exists', 400);
    }

    let newCategory = null;
    if (isMongoConnected()) {
        newCategory = new Category({ name: trimmedName });
        await newCategory.save();
    } else {
        newCategory = localDb.categories.create({ name: trimmedName });
    }

    return apiResponse.success(res, newCategory, 'Category created successfully', 201);
});
