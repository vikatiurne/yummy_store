import jwt from 'jsonwebtoken';
import { Token } from '../models/models.js';

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: '15m',
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: '30d',
    });
    return { accessToken, refreshToken };
  }
  generateResetToken(payload) {
    const token = jwt.sign(payload, process.env.JWT_RESET_PASSWORD_SECRET, {
      expiresIn: '20m',
    });
    
    return token;
  }
  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (error) {
      return null;
    }
  }
  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (error) {
      return null;
    }
  }
  validateResetToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_RESET_PASSWORD_SECRET);
      return userData;
    } catch (error) {
      return null;
    }
  }
  async saveToken(userId, refreshToken, accessToken) {
    const tokenData = await Token.findOne({ where: { userId: userId } });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      tokenData.accessToken = accessToken;
      return tokenData.save();
    }
    const token = await Token.create({ userId, refreshToken, accessToken });
    return token;
  }
  async removeToken(refreshToken) {
    const tokenData = await Token.destroy({ where: { refreshToken } });
    return tokenData;
  }
  async findToken(refreshToken) {
    const tokenData = await Token.findOne({ where: { refreshToken } });
    return tokenData;
  }
  async findAccessToken(accessToken) {
    const tokenData = await Token.findOne({ where: { accessToken } });
    return tokenData;
  }
}

export const tokenService = new TokenService();
