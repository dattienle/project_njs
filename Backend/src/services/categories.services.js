import Categories from '../model/schema/notification.schema.js';

class CategoriesService {
  async getAllCategories() {
    try {
      const categories = await Categories.find();
      return categories;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getCategoryById(categoryId) {
    try {
      const category = await Categories.findById(categoryId);
      if (!category) {
        throw new Error('Category not found');
      }
      return category;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createCategory(name, artwork_ids) {
    try {
      const newCategory = new Categories({ name, artwork_ids });
      const savedCategory = await newCategory.save();
      return savedCategory;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateCategory(categoryId, name, artwork_ids) {
    try {
      const updatedCategory = await Categories.findByIdAndUpdate(
        categoryId,
        { name, artwork_ids },
        { new: true }
      );
      if (!updatedCategory) {
        throw new Error('Category not found');
      }
      return updatedCategory;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteCategory(categoryId) {
    try {
      const deletedCategory = await Categories.findByIdAndDelete(categoryId);
      if (!deletedCategory) {
        throw new Error('Category not found');
      }
      return deletedCategory;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

const categoriesService = new CategoriesService();
export default categoriesService;