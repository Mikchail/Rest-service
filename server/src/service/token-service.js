const jwt = require("jsonwebtoken");
const TokenModel = require("../models/Token");

class TokenService {
  generateToken(payload) {
    const accessToken = jwt.sign(payload, "process.env.JWT_ACCESS_SECRET", { expiresIn: "30m" });
    const refreshToken = jwt.sign(payload, "process.env.JWT_REFRESH_SECRET", { expiresIn: "30d" });
    return {
      accessToken,
      refreshToken
    }
  }

  async saveToken(userId, refreshToken) {
    const tokenDate = await TokenModel.findOne({ user: userId });
    if (tokenDate) {
      tokenDate.refreshToken = refreshToken
      return tokenDate.save();
    }
    const token = await TokenModel.create({ user: userId, refreshToken })
    return token;
  }

  async validateAccessToken(token) {
    try {
      const userDate = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
      return userDate;
    } catch (error) {
      return null;
    }
  }

  async validateRefreshToken(token) {
    try {
      const userDate = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
      return userDate;
    } catch (error) {
      return null;
    }
  }
}


module.exports = new TokenService();