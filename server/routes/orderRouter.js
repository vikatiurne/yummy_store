import { Router } from 'express';
import authMiddleware from '../middleware/AuthMiddleware.js';
import checkRoleMiddleware from '../middleware/CheckRoleMiddleware.js';
import { orderController } from '../controllers/orderController.js';

const router = new Router();

router.get(
  '/admin/getAll',
  authMiddleware,
  checkRoleMiddleware('ADMIN'),
  orderController.adminGetAll
);
router.get(
  '/admin/getAll/user/:id',
  authMiddleware,
  checkRoleMiddleware('ADMIN'),
  orderController.adminGetOrderUser
);
router.get(
  '/admin/getOne/:id',
  authMiddleware,
  checkRoleMiddleware('ADMIN'),
  orderController.adminGetOne
);
router.post(
  '/admin/create',
  authMiddleware,
  checkRoleMiddleware('ADMIN'),
  orderController.adminCreate
);
router.delete(
  '/admin/delete/:id',
  authMiddleware,
  checkRoleMiddleware('ADMIN'),
  orderController.adminDelete
);


router.get('/user/getAll', authMiddleware, orderController.userGetAll)
router.get('/user/getOne/:id', authMiddleware, orderController.userGetOne)
router.post('/user/create', authMiddleware, orderController.userCreate)

router.post('/guest/create', orderController.guestCreate)

export {router as orderRouter}