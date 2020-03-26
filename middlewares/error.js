const expressValidation = require("express-validation");
module.exports = (err, req, res, next) => {
  const error = err;
  err.response = {
    results: {}
  };
  if (error instanceof expressValidation.ValidationError) {
    return res.status(err.statusCode).json(err);
  }

  if (error instanceof SyntaxError) {
    error.message = "Invalid JSON";
    error.status = 400;
  }

  if (!error.status && !error.statusCode) {
    error.status = 500;
  }
  const errorMessage = error.name !== "StatusCodeError" ? error.message : error.error.error.message;
  const errorResponse = {
    success: false,
    message: error.status !== 500 ? errorMessage : "Internal server error",
    hideNotification: error.hideNotification
  };

  //if development mode, console all error message
  if (process.env.NODE_ENV === "development") {
    errorResponse.stackTrace = error.stack;
  }

  // return the error
  res.status(error.status);
  res.json(errorResponse).end();

  next();
};
