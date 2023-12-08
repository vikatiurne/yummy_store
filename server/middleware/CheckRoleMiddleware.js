import { ApiError } from '../error/ApiError.js';
import { tokenService } from '../service/token-service.js';

export default function checkRoleMiddleware(role) {
  return function (req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) {
        return next(ApiError.unauthorizedError());
      }
      const userData = tokenService.validateRefreshToken(refreshToken);
      if (!userData) {
        return next(ApiError.unauthorizedError());
      }
      if (userData.role !== role) {
        return next(ApiError.forbidden('Доступ має тільки адміністратор'));
      }
      req.user = userData;
      next();
    } catch (error) {
      return next(ApiError.unauthorizedError());
    }
  };
}
