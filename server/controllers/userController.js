import { validationResult } from 'express-validator';

import { ApiError } from '../error/ApiError.js';
import { User, Basket } from '../models/models.js';
import { userService } from '../service/user-service.js';
import { tokenService } from '../service/token-service.js';
import { UserDto } from '../dtos/user-dto.js';

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      console.log(errors);
      if (!errors.isEmpty()) {
        next(ApiError.badRequest('Помилка валідації', errors.array()));
      } else {
        const { email, password, role, name } = req.body;
        const userData = await userService.registration(
          email,
          password,
          role,
          name
        );
        res.cookie('refreshToken', userData.refreshToken, {
          maxAge: 30 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        });
        return res.json(userData);
      }
    } catch (error) {
      next(error);
    }
  }
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }
  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie('refreshToken');
      // res.clearCookie('basketId');
      return res.json(token);
    } catch (error) {
      next(error);
    }
  }
  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (error) {
      next(error);
    }
  }
  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async check(req, res, next) {
    const { email } = req.user;
    const user = await User.findOne({ where: { email } });
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(
      userDto.id,
      tokens.refreshToken,
      tokens.accessToken
    );

    return res.json({ ...tokens });
  }

  async getUser(req, res, next) {
    try {
      const autorizationHeader = req.headers.authorization;
      const token = autorizationHeader.split(' ')[1];
      const user = await userService.getUser(token);
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async forgotPassword(req, res, next) {
    try {
      const { email } = req.body;
      const userData = await userService.forgotPassword(email);
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async resetPassword(req, res, next) {
    try {
      const { newPass, resetLink } = req.body;
      const userData = await userService.resetPassword(newPass, resetLink);
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }
}

export const userController = new UserController();
