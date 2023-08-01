const { getErrorMessage } = require("./messages");
const { HTTP_CODES, Errors } = require("./types");

class BaseError extends Error {
  constructor(errorCode, statusCode, message) {
    super(message);

    this.errorCode = errorCode;
    this.statusCode = statusCode;

    Error.captureStackTrace(this);
  }
}

class BadRequest extends BaseError {
  constructor({ errCode = "USR400", message = "" }) {
    if (!message) {
      message = getErrorMessage(errCode);
    }

    super(errCode, HTTP_CODES.BAD_REQUEST, message);
  }
}
class MethodNotAllowed extends BaseError {
  constructor(errCode, message = "") {
    if (!message) {
      message = getErrorMessage(errCode);
    }

    super(errCode, HTTP_CODES.METHOD_NOT_ALLOWED, message);
  }
}

class Unauthorized extends BaseError {
  constructor(errCode = "USR-401", message = "") {
    if (!message) {
      message = getErrorMessage(errCode);
    }

    super(errCode, HTTP_CODES.UNAUTHORIZED, message);
  }
}

class NotFound extends BaseError {
  constructor() {
    let errCode = "NOT-FOUND";
    let message = getErrorMessage(errCode);
    super(errCode, HTTP_CODES.NOT_FOUND, message);
  }
}
class UserNotFound extends BaseError {
  constructor(errCode = "USR-404", message = "") {
    if (!message) {
      message = getErrorMessage(errCode);
    }
    super(errCode, HTTP_CODES.NOT_FOUND, message);
  }
}

class internal_Server extends BaseError {
  constructor() {
    let errCode = "USR-500";
    let message = getErrorMessage(errCode);
    super(errCode, HTTP_CODES.INTERNAL_SERVER_ERROR, message);
  }
}

class USER_EXISTS extends BaseError {
  constructor(message) {
    let errCode = "USR-404";
    super(errCode, HTTP_CODES.NOT_FOUND, message);
  }
}

module.exports = {
  BadRequest,
  NotFound,
  MethodNotAllowed,
  UserNotFound,
  internal_Server,
  USER_EXISTS,
  Unauthorized,
};
