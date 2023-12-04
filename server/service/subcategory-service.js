import { Subcategory } from '../models/models.js';

class SubcategoryService {
  async getSubcategory(id) {
    const subcategory = await Subcategory.findOne({ where: { id } });
    return await subcategory.name;
  }
}

export const subcategoryService = new SubcategoryService();
