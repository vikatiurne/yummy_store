import $api from '../http/axios';

export default class GetServices {
  static async getUser() {
    const token = localStorage.getItem('token');
    const header = `Bearer ${token}`;
    return await $api.get('/api/user/user', {
      headers: { Authorization: header },
    });
  }
  static async getCategories() {
    return $api.get('/api/category');
  }
  static async getSubcategories() {
    return $api.get('/api/subcategory');
  }
  static async getAllProdacts(
    categoryId,
    subcategoryId,
    page,
    limit,
    orderBy,
    sortBy
  ) {
    return $api.get('/api/prodact', {
      params: { categoryId, subcategoryId, page, limit, orderBy, sortBy },
    });
  }
  static async getOneProdact(id) {
    return $api.get('/api/prodact/' + id);
  }
  static async getRating(prodactId) {
    return $api.get('/api/rating', { params: { prodactId } });
  }
  static async checkVote(prodactId, userId) {
    return $api.get('/api/rating/check', { params: { prodactId, userId } });
  }

  static async getBasket(userId) {
    return $api.get('/api/basket/getone', { params: { userId } });
  }
}
