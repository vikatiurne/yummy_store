import { ApiError } from '../error/ApiError.js';
import { tokenService } from '../service/token-service.js';

export default function checkRoleMiddleware(role) {
  return function (req, res, next) {
    try {
      const autorizationHeader = req.headers.authorization;
      if (!autorizationHeader) {
        return next(ApiError.unauthorizedError());
      }
      const accessToken = autorizationHeader.split(' ')[1];
      if (!accessToken) {
        return next(ApiError.unauthorizedError());
      }
      const userData = tokenService.validateAccessToken(accessToken);
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
