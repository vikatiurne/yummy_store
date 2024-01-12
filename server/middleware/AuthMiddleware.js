import { ApiError } from '../error/ApiError.js';
import { tokenService } from '../service/token-service.js';

export default function authMiddleware(req, res, next) {
  try {
    const autorizationHeader = req.headers.authorization;
    console.log("autorizationHeader:", autorizationHeader)
    if (!autorizationHeader) {
      return next(ApiError.unauthorizedError());
    }
    const accessToken = autorizationHeader.split(' ')[1];
    if (!accessToken) {
      return next(ApiError.unauthorizedError());
    }
    const userData = tokenService.validateAccessToken(accessToken);
    console.log("autorizationHeader:", accessToken)
    if (!userData) {
      return next(ApiError.unauthorizedError());
    }
    req.user = userData;
    next();
  } catch (error) {
    return next(ApiError.unauthorizedError());
  }
}
