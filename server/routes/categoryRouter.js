import { Router } from 'express';
import { categoryController } from '../controllers/categoryController.js';
import checkRoleMiddleware from '../middleware/CheckRoleMiddleware.js';

const router = new Router();

router.post('/', checkRoleMiddleware('ADMIN'), categoryController.create);
router.get('/', categoryController.getAll);
router.get('/getone', categoryController.getOne)
router.put('/:id/deleteCategory',checkRoleMiddleware('ADMIN'), categoryController.delete)
router.put('/:id/updateCategory',checkRoleMiddleware('ADMIN'), categoryController.update)

export { router as categoryRouter };
