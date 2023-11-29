import { Category } from '../models/models.js';

class CategoryController {
  async create(req, res) {
    const { name } = req.body;
    const category = await Category.create({ name });
    return res.json(category);
  }
  async getAll(req, res) {
    const category = await Category.findAll();
    return res.json(category);
  }
}

export const categoryController = new CategoryController();
