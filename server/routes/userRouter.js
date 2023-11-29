import { Router } from 'express';
import { body } from 'express-validator';
import { userController } from '../controllers/userController.js';
import authMiddleware from '../middleware/AuthMiddleware.js';
import { googleAuthController } from '../controllers/googleAuthController.js';


const router = new Router();

router.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  userController.registration
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/auth', authMiddleware, userController.check);
router.get('/user', userController.getUser);
router.put('/forgot-password', userController.forgotPassword);
router.put('/reset-password', userController.resetPassword);

router.get('/auth/google/url', (req, res) => {
  return res.send(googleAuthController.getGoogleOAuthUrl());
})
router.get('/auth/google',googleAuthController.getGoogleUser)
router.get("/auth/me", googleAuthController.getCurentGoogleUser)


export { router as userRouter };
