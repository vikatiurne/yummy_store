import { Router } from 'express';
import { subcategoryController } from '../controllers/subcategoryController.js';
import checkRoleMiddleware from '../middleware/CheckRoleMiddleware.js';

const router = new Router();

router.post('/',checkRoleMiddleware('ADMIN'), subcategoryController.create);
router.get('/', subcategoryController.getAll);
router.get('/getOne', subcategoryController.getOne);


export { router as subcategoryRouter };
