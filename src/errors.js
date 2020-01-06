/**
 * ERRORS
 */
class HttpError extends Error {
  constructor(status, message, code, ...errorLogs) {
    // Calling parent constructor of base Error class.
    super();
    // Saving class name in the property of our custom error as a shortcut.
    this.name = this.constructor.name;
    // Capturing stack trace, excluding constructor call from it.
    Error.captureStackTrace(this, this.constructor);

    this.message = message;
    this.status = status || 500;
    this.code = code || 'SERVER-ERROR';
    this.errorLogs = errorLogs;
    this.json = {
      message: this.message,
      code: this.code
    };
  }

  consoleError() {
    console.error(this.code, this.message);

    if (this.errorLogs.length > 0 && process.env.NODE_ENV !== 'production') {
      console.error(this.errorLogs);
    }
  }
}

class MissingRequiredParametersError extends HttpError {

  constructor(...errorLogs) {
    let status = 422;
    let code = 'MISSING_REQUIRED_PARAMETER';
    let message = 'Missing required parameters';

    super(status, message, code, ...errorLogs);
  }

}


class ParameterNotValidError extends HttpError {

  constructor(...errorLogs) {
    let status = 422;
    let code = 'PARAMETER_NOT_VALID';
    let message = 'Parameter not valid in request';

    super(status, message, code, ...errorLogs);
  }

}


module.exports = {
  HttpError,
  MissingRequiredParametersError,
  ParameterNotValidError
};