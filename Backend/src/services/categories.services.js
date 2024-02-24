import Categories from '../model/schema/categories.schema.js';
import { verifyToken } from '../utils/jwt.js';

class CategoryService {
  async getAllCategories(token) {
    try {
      const decodedToken = await verifyToken(token);

      const categories = await Categories.find();
      return categories;
    } catch (error) {
      throw new Error('Failed to fetch categories');
    }
  }

  async getCategoryById(categoryId, token) {
    try {
      const decodedToken = await verifyToken(token);

      const category = await Categories.findById(categoryId);
      if (!category) {
        throw new Error('Category not found');
      }
      return category;
    } catch (error) {
      throw new Error('Failed to fetch category by ID');
    }
  }

  async createCategory(categoryData, token) {
    try {
      const decodedToken = await verifyToken(token);
      
      if (!decodedToken || !decodedToken.userId) {
        throw new Error('Unauthorized: Invalid token');
      }

      const newCategory = new Categories(categoryData);
      const savedCategory = await newCategory.save();
      return savedCategory;
    } catch (error) {
      throw new Error('Failed to create category');
    }
  }

  async updateCategory(categoryId, categoryData, token) {
    try {
      const decodedToken = await verifyToken(token);
      
      if (!decodedToken || !decodedToken.userId) {
        throw new Error('Unauthorized: Invalid token');
      }

      const updatedCategory = await Categories.findByIdAndUpdate(
        categoryId,
        categoryData,
        { new: true }
      );
      if (!updatedCategory) {
        throw new Error('Category not found');
      }
      return updatedCategory;
    } catch (error) {
      throw new Error('Failed to update category');
    }
  }

  async deleteCategory(categoryId, token) {
    try {
      const decodedToken = await verifyToken(token);
      
      if (!decodedToken || !decodedToken.userId) {
        throw new Error('Unauthorized: Invalid token');
      }

      const deletedCategory = await Categories.findByIdAndDelete(categoryId);
      if (!deletedCategory) {
        throw new Error('Category not found');
      }
      return deletedCategory;
    } catch (error) {
      throw new Error('Failed to delete category');
    }
  }
}

const categoryService = new CategoryService();
export default categoryService;
