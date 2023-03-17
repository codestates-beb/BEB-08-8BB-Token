const { user } = require('../models');

module.exports = {
  user_joinById_get:async (nickname) => {
    try {
      const result = await user.findAll({
        where: {nickname: nickname}
      });
      return result;
    } catch (e) {
      console.log("user_joinById_get err", e);
      return null;
    }
  },
  user_join_post: async (nickname, password) => {
    try {
      const result = await user.create({
        nickname: nickname,
        password: password,
        address: "0x0000",
        token_amount: 0,
        eth_amount: 0
      });
      return result
    } catch (e) {
      console.log("user_join_post err", e);
      return null;
    }
  },
  user_login_post: async (nickname, password) => {
    try {
      const result = await user.findOne({
        where: {nickname: nickname, password: password}
      });
      return result;
    } catch (e) {
      console.log("user_login_post err", e);
      return null;
    }
  }
}