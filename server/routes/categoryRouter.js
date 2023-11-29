import { Router } from 'express';
import { categoryController } from '../controllers/categoryController.js';
import checkRoleMiddleware from '../middleware/CheckRoleMiddleware.js';

const router = new Router();

router.post('/', checkRoleMiddleware('ADMIN'), categoryController.create);
router.get('/', categoryController.getAll);
// router.delete('/',)

export { router as categoryRouter };
