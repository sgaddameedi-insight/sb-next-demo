  class GeneralError extends Error {
    constructor(statusCode, message) {
      super();
      this.statusCode = statusCode;
      this.message = message;
    }
  }
  
  class AuthError extends GeneralError { }
  
  module.exports = {
    GeneralError,
    AuthError
  };