const bcrypt = require('bcrypt');
const UserModel = require("../models/User");
const PostModel = require("../models/Post");
const UserDto = require("../dtos/user-dto");
const tokenService = require("./token-service");
const ApiError = require('../exeptions/ApiError');

class UserService {

  async login(email, password) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest("Такого пользователя нет в системе!");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const userDto = new UserDto(user);
      const tokens = tokenService.generateToken({ ...userDto })
      await tokenService.saveToken(userDto.id, tokens.refreshToken);
      return {
        ...tokens,
        user: userDto
      };
    }
    throw ApiError.BadRequest("Неверный логин или пароль!");
  }

  async registeration(email, password) {
    if (!email || !password) {
      return res.json("нету данных")
    }
    const oldUser = await UserModel.findOne({ email });
    if (oldUser) {
      throw ApiError.BadRequest("Пользователь с таким емейлом уже существует!");
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await UserModel.create({ email, password: hash });
    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    
    return {
      ...tokens,
      user: userDto
    };
  }

  async getUser(userId) {
      const user = await UserModel.findById(userId).populate("posts");
      return user
  }

}

module.exports = new UserService();