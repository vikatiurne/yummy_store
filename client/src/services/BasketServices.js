import $api from '../http/axios';

export default class BasketServices {
  static async append(prodactId, qty, userId) {
    return $api.put(`/api/basket/prodact/${prodactId}/append/1`, {
      params: { userId, qty },
    });
  }

  static async increment(prodactId) {
    return $api.put(`/api/basket/prodact/${prodactId}/increment`, {
      params: { prodactId },
    });
  }
  static async decrement(prodactId, minOrder) {
    return $api.put(`/api/basket/prodact/${prodactId}/decrement/${minOrder}`, {
      params: { prodactId, minOrder },
    });
  }
  static async remove(prodactId) {
    return $api.put(`/api/basket/prodact/${prodactId}/remove`);
  }
  static async clear( userId) {
    return $api.put('/api/basket/clear', { params: {userId } });
  }
}
