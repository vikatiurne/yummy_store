import { Subcategory } from '../models/models.js';
import { subcategoryService } from '../service/subcategory-service.js';

class SubcategoryController {
  async create(req, res) {
    const { name, categoryId } = req.body;
    const subcategory = await Subcategory.create({ name, categoryId });
    return res.json(subcategory);
  }
  async getAll(req, res) {
    const subcategory = await Subcategory.findAll();
    return res.json(subcategory);
  }
  async getOne(req, res, next) {
    try {
      const { id } = req.query;
      const subcaregory = await subcategoryService.getSubcategory(id);
      return res.json(subcaregory);
    } catch (error) {
      next(error);
    }
  }
}

export const subcategoryController = new SubcategoryController();
