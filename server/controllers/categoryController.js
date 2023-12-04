import { Category } from '../models/models.js';
import { categoryService } from '../service/category-service.js';

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
  async getOne(req, res, next) {
    try {
      const { id } = req.query;
      const category = await categoryService.getCategory(id)
      return res.json(category);
    } catch (error) {
      next(error)
    }
  }
}

export const categoryController = new CategoryController();
