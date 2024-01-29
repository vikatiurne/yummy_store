import $api from '../http/axios';

export default class UpdateServices {
  static async update(id, prodact) {
    return await $api.put(`/api/prodact/${id}/update`, prodact);
  }
  static async updateCategory(id, categoryName) {
    return await $api.put(`/api/category/${id}/updateCategory`, {
      categoryName,
    });
  }
  static async updateSubcategory(id, subcategoryName) {
    return await $api.put(`/api/subcategory/${id}/updateSubcategory`, {
      subcategoryName,
    });
  }

  static async updateUser(id, data) {
    return await $api.put(`/api/user/user/${id}/update`, data);
  }
}
