const ApiError = require("../exeptions/ApiError");
const tokenService = require("../service/token-service");


module.exports = function (req, res, next) {
  try {
    const authorizationHeader = req.header.authorization;
    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError());
    }
    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }
    const userDate = tokenService.validate;
    if (!userDate) {
      return next(ApiError.UnauthorizedError());
    }

    req.user = userDate
    next();
  } catch (error) {

  }
}