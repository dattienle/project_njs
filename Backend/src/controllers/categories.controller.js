import Categories from '../model/schema/categories.schema.js';

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Categories.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCategoryById = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const category = await category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createCategory = async (req, res) => {
  const { name, artwork_ids } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  try {
    const newCategory = new Categories({ name, artwork_ids });
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateCategory = async (req, res) => {
  const { categoryId } = req.params;
  const { name, artwork_ids } = req.body;
  try {
    const updatedCategory = await Categories.findByIdAndUpdate(
      categoryId,
      { name, artwork_ids },
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.status(201).json(updatedCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const deletedCategory = await Categories.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(deletedCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};