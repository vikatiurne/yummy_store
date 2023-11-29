export class ApiError extends Error {
  status;
  errors;

  constructor(status, message, errors = []) {
    super(message);
    (this.status = status), (this.errors = errors);
  }

  static unauthorizedError() {
    return new ApiError(401, 'Користувач не авторизований');
  }

  static badRequest(message, errors = []) {
    return new ApiError(404, message, errors);
  }
  static internal(message) {
    return new ApiError(500, message);
  }
  static forbidden(message) {
    return new ApiError(403, message);
  }
}
