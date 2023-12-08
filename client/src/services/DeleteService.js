import $api from '../http/axios';

export default class DeleteServices {
  static async delete(id) {
    return await $api.put(`/api/prodact/${id}/delete`);
  }
 static async deleteCategory(id){
    return await $api.put(`api/category/${id}/deleteCategory`)
 }
 static async deleteSubcategory(id){
    return await $api.put(`api/subcategory/${id}/deleteSubcategory`)
 }
}