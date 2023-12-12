import { ApiError } from '../error/ApiError.js';
import { BasketProdact } from '../models/models.js';
import { basketService } from '../service/basket-service.js';
import { orderService } from '../service/order-service.js';

class OrderController {
    adminCreate = async (req, res, next) => {
        await this.create(req, res, next, 'ADMIN')
    }

    userCreate = async (req, res, next) => {
        await this.create(req, res, next, 'user')
    }

    guestCreate = async (req, res, next) => {
        await this.create(req, res, next, 'guest')
    }


  async adminGetAll(req, res, next) {
    try {
      const orders = await orderService.getAll();
      return res.json(orders);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async adminGetOrderUser(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) next(ApiError.badRequest('Користувач не знайден'));
      const orders = await orderService.getAll(id);
      return res.json(orders);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async adminGetOne(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) next(ApiError.badRequest('Замовлення не знайдене у БД'));
      const order = await orderService.getOne(id);
      return res.json(order);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async create(req, res, next, role) {
    try {
      const { name, email, phone, address, comment = null } = req.body;
      const { basketId } = req.signedCookies;
      let items, userId;
      if (role === 'ADMIN') {
        items = req.body.items;
        userId = req.body.userId ?? null;
      } else {
        if (!basketId) next(ApiError.badRequest('Ваш кошик порожній'));
        const basket = await BasketProdact.findAll({
          where: { basketId: parseInt(basketId) },
        });
        if (basket.length === 0)
          next(ApiError.badRequest('Ваш кошик порожній'));
      }
      const order = await orderService.create({
        name,
        email,
        phone,
        address,
        comment,
        items,
        userId,
      });
      await basketService.clear(basketId, userId);
      res.json(order);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async adminDelete(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) next(ApiError.badRequest('Не вказан id замовлення'));
      const order = await orderService.delete(id);
      return res.json(order);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async userGetAll(req, res, next) {
    try {
      const { id } = req.auth;
      const orders = await orderService.getAll(id);
      return res.json(orders);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async userGetOne(req, res, next) {
    try {
      const userId = req.auth.id;
      const { id } = req.params;
      const order = await orderService.getOne(id, userId);
      return res.json(order)
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

}

export const orderController = new OrderController();
