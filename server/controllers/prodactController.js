import { v4 as uuidv4 } from 'uuid';
import path from 'path';

import { Prodact, ProdactInfo } from '../models/models.js';
import { ApiError } from '../error/ApiError.js';

class ProdactController {
  async create(req, res, next) {
    try {
      const { name, price, categoryId, subcategoryId, sizes, info } = req.body;
      const sizesArr = sizes.split(',');
      const { img } = req.files;
      let fileName = uuidv4() + '.jpg';
      const __dirname = path.dirname('..');
      img.mv(path.resolve(__dirname, 'static', fileName));

      const prodact = await Prodact.create({
        name,
        price,
        categoryId,
        subcategoryId,
        sizes: sizesArr,
        img: fileName,
      });
      if (info.length > 0) {
        await ProdactInfo.create({
          discription: info,
          prodactId: prodact.id,
        });
      }

      return await res.json(prodact);
    } catch (error) {
      next(ApiError.badRequest(error));
    }
  }
  async getAll(req, res) {
    let { categoryId, subcategoryId, limit, page, orderBy, sortBy } = req.query;
    page = page || 1;
    limit = limit || 8;
    let offset = (page - 1) * limit;
    let prodacts;
    const queries = {
      offset,
      limit,
    };
    if (orderBy) {
      queries.order = [[orderBy, sortBy]];
    }
    if (!categoryId && !subcategoryId) {
      prodacts = await Prodact.findAndCountAll({ ...queries });
    }
    if (categoryId && !subcategoryId) {
      prodacts = await Prodact.findAndCountAll({
        where: { categoryId },
        ...queries,
      });
    }
    if (categoryId && subcategoryId) {
      prodacts = await Prodact.findAndCountAll({
        where: { categoryId, subcategoryId },
        ...queries,
      });
    }

    return await res.json(prodacts);
  }
  async getOne(req, res) {
    const { id } = req.params;
    const prodact = await Prodact.findOne({
      where: { id },
      include: { model: ProdactInfo, as: 'info' },
    });
    return res.json(prodact);
  }
}

export const prodactController = new ProdactController();
