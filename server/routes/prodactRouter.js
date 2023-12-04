import { Router } from 'express';
import { prodactController } from '../controllers/prodactController.js';
import checkRoleMiddleware from '../middleware/CheckRoleMiddleware.js';

const router = new Router();

router.post('/', checkRoleMiddleware('ADMIN'), prodactController.create);
router.get('/', prodactController.getAll);
router.get('/:id', prodactController.getOne);
router.put('/:id', prodactController.deleteProdact);
router.put('/:id', prodactController.updateProdact);

export { router as prodactRouter };
