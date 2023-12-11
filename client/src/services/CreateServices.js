import $api from '../http/axios';
import GetServices from './GetServices';

export default class CreateServices {
  static async createCategory(name) {
    return await $api.post('/api/category', { name });
  }
  static async createSubcategory(name, categoryId) {
    try {
      return $api.post('/api/subcategory', { name, categoryId });
    } catch (error) {
      return null;
    }
  }
  static async createProdact(prodact) {
    return $api.post('/api/prodact', prodact);
  }
  static async createRating(rating, prodactId) {
    try {
      const user = await GetServices.getUser();
      const userId = user.data.id;
      return await $api.post('/api/rating', { rating, prodactId, userId });
    } catch (error) {
      return null;
    }
  }
}
