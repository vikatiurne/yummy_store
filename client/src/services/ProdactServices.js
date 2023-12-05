import $api from '../http/axios';

export default class ProdactServices {
  static async delete(id) {
    return await $api.put(`/api/prodact/${id}/delete`);
  }
  static async update(id, prodact) {
    return await $api.put(`/api/prodact/${id}/update`, prodact);
  }
}
