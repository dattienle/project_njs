import categoryService from "../services/categories.services.js";
import { verifyToken } from "../utils/jwt.js";

export const getAllCategories = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    await verifyToken(token); 

    const categories = await categoryService.getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCategoryById = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const token = req.headers.authorization.split(" ")[1];
    await verifyToken(token); 

    const category = await categoryService.getCategoryById(categoryId);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCategory = async (req, res) => {
  const { name, description } = req.body;
  try {
    const token = req.headers.authorization.split(" ")[1];
    await verifyToken(token); 

    const newCategory = await categoryService.createCategory({ name, description });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateCategory = async (req, res) => {
  const { categoryId } = req.params;
  const { name, description } = req.body;
  try {
    const token = req.headers.authorization.split(" ")[1];
    await verifyToken(token); 

    const updatedCategory = await categoryService.updateCategory(categoryId, { name, description });
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const token = req.headers.authorization.split(" ")[1];
    await verifyToken(token); 

    await categoryService.deleteCategory(categoryId);
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
