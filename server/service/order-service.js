import { Order, OrderItem } from '../models/models.js';
import { mailService } from './mail-service.js';

class OrderService {
  async getAll(userId = null) {
    let orders;
    userId
      ? (orders = await Order.findAll({
          where: { userId },
          include: [
            {
              model: OrderItem,
              as: 'items',
              attributes: ['name', 'price', 'qty'],
            },
          ],
        }))
      : (orders = await Order.findAll({
          include: [
            {
              model: OrderItem,
              as: 'items',
              attributes: ['name', 'price', 'qty'],
            },
          ],
        }));
    return orders;
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
    const { name, email, phone, address, comment, items, userId = null } = data;
    const amount = Math.round(
      items
        .map(
          (item) =>
            item.basket_prodact.qty * (item.price / parseInt(item.sizes[0]))
        )
        .reduce((acc, val) => acc + val, 0)
    );

    const order = await Order.create({
      name,
      email,
      phone,
      address,
      comment,
      amount,
      userId,
    });
    const date = new Date();
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    const orderNum = `${yyyy}-${mm}-${dd}_${order.id}`;
    await mailService.sendClientOrderMail(email, orderNum, amount);
    await mailService.sendAdminOrderMail(order);

    for (let item of items) {
      await OrderItem.create({
        name: item.name,
        price: item.price / parseInt(item.sizes[0]),
        qty:
          item.basket_prodact.qty + item.sizes[0].replace(/[^a-zа-яё]/gi, ''),
        orderId: order.id,
      });
    }
    const newOrder = await Order.findByPk(order.id, {
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
