import { Router } from 'express';
import { accessTokenValidator, refreshTokenValidator } from '../middlewares/categories.middleware.js';
import { validateMiddleware } from '../middlewares/validate.middlewares.js';
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categories.controller.js';

const categoriesRouter = Router();

categoriesRouter.get('/', accessTokenValidator, refreshTokenValidator, validateMiddleware, getAllCategories);
categoriesRouter.get('/:categoryId', accessTokenValidator, refreshTokenValidator, validateMiddleware, getCategoryById);
categoriesRouter.post('/', accessTokenValidator, refreshTokenValidator, validateMiddleware, createCategory);
categoriesRouter.put('/:categoryId', accessTokenValidator, refreshTokenValidator, validateMiddleware, updateCategory);
categoriesRouter.delete('/:categoryId', accessTokenValidator, refreshTokenValidator, validateMiddleware, deleteCategory);

export default categoriesRouter;