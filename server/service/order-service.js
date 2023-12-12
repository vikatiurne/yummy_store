import { Order, OrderItem } from '../models/models.js';

class OrderService {
  async getAll(userId = null) {
    let orders;
    userId
      ? (orders = await Order.findAll({ where: { userId } }))
      : (orders = await Order.findAll());
  }

  async getOne(id, userId = null) {
    let order;
    if (userId) {
      order = await Order.findOne({
        where: { id, userId },
        include: [
          {
            model: OrderItem,
            as: 'items',
            attributes: ['name', 'price', 'qty'],
          },
        ],
      });
    } else {
      order = await Order.findByPk(id, {
        include: {
          model: OrderItem,
          as: 'items',
          attributes: ['name', 'price', 'qty'],
        },
      });
    }
    if (!order) throw new Error('Замовлення не знайдене у БД');
    return order;
  }

  async create(data) {
    const {
      name,
      email,
      phone,
      address,
      comment = null,
      items,
      userId = null,
    } = data;
    const amount = items.reduce((acc, item) => acc + item.price * item.qty, 0);
    const order = await OrderItem.create({
      name,
      email,
      phone,
      address,
      comment,
      amount,
      userId,
    });
    for (let item of items) {
      await OrderItem.create({
        name: item.name,
        price: item.price,
        qty: item.qty,
        orderId: order.id,
      });
    }
    const newOrder = Order.findByPk(order.id, {
      include: [
        { model: OrderItem, as: 'items', attributes: ['name', 'price', 'qty'] },
      ],
    });
    return newOrder;
  }

  async delete(id) {
    const order = await Order.findByPk(id, {
      include: [{ model: OrderItem, attributes: ['name', 'price', 'qty'] }],
    });
    if (!order) throw new Error('Замовлення не знайдене у БД');
    await order.destroy();
    return order;
  }
}

export const orderService = new OrderService();
