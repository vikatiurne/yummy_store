import { where } from 'sequelize';
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
      const category = await categoryService.getCategory(id);
      return res.json(category);
    } catch (error) {
      next(error);
    }
  }
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const delCategory = await Category.destroy({ where: { id } });
      return res.json(delCategory);
    } catch (error) {
      next(error);
    }
  }
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { categoryName } = req.body;
      const updatedCategory = await Category.update(
        { name: categoryName },
        { where: { id } }
      );
      return res.json(updatedCategory);
    } catch (error) {
      next(error);
    }
  }
}

export const categoryController = new CategoryController();
