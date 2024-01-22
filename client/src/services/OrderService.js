import $api from '../http/axios';

export default class OrderService {
  static async adminGetAll(userId) {
    return $api.get('api/order/admin/getAll', { params: { userId } });
  }
  static async adminGetOrderUser(userId) {
    return $api.get(`api/order/admin/getAll/user/${userId}`);
  }
  static async adminGetOne(orderId) {
    return $api.get(`api/order/admin/getOne/${orderId}`);
  }
  // static async adminCreate(data) {
  //   return $api.post('api/order/admin/create', data);
  // }
  static async adminDelete(orderId) {
    return $api.post(`api/order/admin/delete/${orderId}`);
  }
  static async userGetAll(userId, page, limit) {
    return $api.get('api/order/user/getAll', {
      params: { userId, page, limit },
    });
  }
  static async userGetOne(orderId, userId) {
    return $api.get(`api/order/user/getOne/${orderId}`, { params: { userId } });
  }
  // static async userCreate(data) {
  //   return $api.post('api/order/user/create', data);
  // }
  // static async guestCreate(data) {
  //   return $api.post('api/order/guest/create',  data  );
  // }
  static async create(data) {
    return $api.post('api/order/create', data);
  }
}
