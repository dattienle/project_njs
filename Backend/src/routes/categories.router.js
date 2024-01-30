import express from 'express';

import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categories.controller.js';

const router = express.Router();

router.get('/Getcategories', getAllCategories);
router.get('/Getcategories/:categoryId', getCategoryById);
router.post('/Addcategories', createCategory);
router.put('/Updatecategories/:categoryId', updateCategory);
router.delete('/Detelecategories/:categoryId', deleteCategory);

export default router;