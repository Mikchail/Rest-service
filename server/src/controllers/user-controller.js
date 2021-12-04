
const userService = require("../service/user-service");
const { validationResult } = require("express-validator");
const ApiError = require("../exeptions/ApiError");
class UsersController {

  async login(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        next(ApiError.BadRequest("не коректные данные"), errors.array());
      }

      const { email, password } = req.body;
      const user = await userService.login(email, password);
      res.cookie("refreshToken", user.refreshToken, { maxAge: 10 * 24 * 60 * 60 * 1000, httpOnly: true });
      return res.json(user);
    } catch (err) {
      next(err);
    }
  }

  async registeration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        next(ApiError.BadRequest("не коректные данные"), errors.array());
      }
      const { email, password } = req.body;
      const user = await userService.registeration(email, password);
      res.cookie("refreshToken", user.refreshToken, { maxAge: 10 * 24 * 60 * 60 * 1000, httpOnly: true });
      return res.json(user);
    } catch (err) {
      console.log(err)
      next(err);
    }
  }

  async refresh(req, res, next) {
    try {

    } catch (error) {
      next(error)
    }
  }

  async getUser(req, res, next) {
    try {
      const userWithPosts = await userService.getUser(req.params.id);
      return res.json(userWithPosts);
    } catch (err) {
      next(err);
    }

  }
}

module.exports = new UsersController();