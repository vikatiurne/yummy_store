import { Subcategory } from '../models/models.js';

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
}

export const subcategoryController = new SubcategoryController();
