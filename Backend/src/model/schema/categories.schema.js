import express from 'express';
import mongoose from 'mongoose';
import path from 'path'; 
import Categories from './categoriesModel';
import axios from 'axios';

const app = express();
const port = 1000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const categoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  artwork_ids: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Artwork',
      required: true
    }
  ]
})

app.post('/api/categories', async (req, res) => {
  try {
    const newCategory = new Categories(req.body);
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/categories', async (req, res) => {
  try {
    const response = await axios.get('https://65b1f8f49bfb12f6eafc7a06.mockapi.io/categories');
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/categories/:id', async (req, res) => {
  try {
    const response = await axios.get(`https://65b1f8f49bfb12f6eafc7a06.mockapi.io/categories/${req.params.id}`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/categories/:id', async (req, res) => {
  try {
    const response = await axios.put(`https://65b1f8f49bfb12f6eafc7a06.mockapi.io/categories/${req.params.id}`, req.body);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/categories/:id', async (req, res) => {
  try {
    const response = await axios.delete(`https://65b1f8f49bfb12f6eafc7a06.mockapi.io/categories/${req.params.id}`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/categories', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'categories.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const Categories = mongoose.model('Categories', categoriesSchema)
export default Categories
