import { Category } from '../models/models.js';

class CategoryService {
  async getCategory(id) {
    const curentCategory = await Category.findOne({ where: { id } });
    return await curentCategory.name;
  }
}

export const categoryService = new CategoryService();
