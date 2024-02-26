import express from 'express';
import { accessTokenValidator, refreshTokenValidator } from '../middlewares/categories.middleware.js';
import { validateMiddleware } from '../middlewares/validate.middlewares.js';
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categories.controller.js';

const router =  express.Router();

router.get('/Getcategories', accessTokenValidator, refreshTokenValidator, validateMiddleware, getAllCategories);
router.get('/Getcategories/:categoryId', accessTokenValidator, refreshTokenValidator, validateMiddleware, getCategoryById);
router.post('/Addcategoriess', accessTokenValidator, refreshTokenValidator, validateMiddleware, createCategory);
router.put('/Updatecategories/:categoryId', accessTokenValidator, refreshTokenValidator, validateMiddleware, updateCategory);
router.delete('/Detelecategories/:categoryId', accessTokenValidator, refreshTokenValidator, validateMiddleware, deleteCategory);

export default router;