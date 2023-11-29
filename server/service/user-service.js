import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';

import { ApiError } from '../error/ApiError.js';
import { User } from '../models/models.js';
import { mailService } from './mail-service.js';
import { tokenService } from './token-service.js';
import { UserDto } from '../dtos/user-dto.js';

class UserService {
  async registration(email, password, role, name) {
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      throw ApiError.badRequest(`Користувач з e-mail: ${email} вже існує`);
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuidv4();
    const user = await User.create({
      name,
      email,
      password: hashPassword,
      role,
      activationLink,
    });

    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/user/activate/${activationLink}`
    );

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(
      userDto.id,
      tokens.refreshToken,
      tokens.accessToken
    );

    return { ...tokens, user: userDto };
  }

  async activate(activationLink) {
    const user = await User.findOne({ activationLink });
    if (!user) {
      throw ApiError.badRequest('Некоректне посилання активації');
    }
    user.isActivated = true;
    await user.save();
  }

  async login(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw ApiError.badRequest(`Користувач ${email} не знайден`);
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.badRequest('Невірно вказаний пароль');
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(
      userDto.id,
      tokens.refreshToken,
      tokens.accessToken
    );

    return { ...tokens, user: userDto };
  }
  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.unauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!tokenFromDb || !userData) {
      throw ApiError.unauthorizedError();
    }
    const user = await User.findByPk(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(
      userDto.id,
      tokens.refreshToken,
      tokens.accessToken
    );

    return { ...tokens, user: userDto };
  }

  async getUser(token) {
    const tokenData = await tokenService.findAccessToken(token);
    const user = await User.findByPk(tokenData.userId);
    const userDto = new UserDto(user);
    return userDto;
  }

  async forgotPassword(email) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw ApiError.badRequest(`Користувач ${email} не знайден`);
    }
    const token = tokenService.generateResetToken({ id: user.id });
    await mailService.sendResetPasswordMail(
      email,
      `${process.env.CLIENT_URL}/resetpassword/${token}`
    );

    await User.update({ resetLink: token }, { where: { email } });
    return {
      message: `На пошту ${email} був відправлений лист з посиланням на скидання пароля`,
    };
  }

  async resetPassword(newPass, resetLink) {
    if (!resetLink) {
      throw ApiError.unauthorizedError();
    }
    const userData = tokenService.validateResetToken(resetLink);
    let user = await User.findOne({ where: { resetLink } });
    if (!user || !userData) {
      throw ApiError.badRequest(`Користувач з цим токен не знайден`);
    }
    const hashPassword = await bcrypt.hash(newPass, 3);
    const obj = {
      password: hashPassword,
      resetLink: '',
    };
    user = _.extend(user, obj);
    await user.save();
    return { message: 'Пароль змінено' };
  }
}

export const userService = new UserService();
