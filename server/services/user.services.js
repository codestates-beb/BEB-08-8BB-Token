const { user } = require('../models');

module.exports = {
  user_joinById_get: async (nickname) => {
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
  user_join_post: async (nickname, password, address, tx) => {
    let createValues = {token_amount: 0, eth_amount: 0};
    if(nickname) createValues.nickname = nickname;
    if(password) createValues.password = password;
    if(address) createValues.address = address;
    try {
      const result = await user.create(createValues, {transaction: tx});
      return result;
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
  },
  user_update: async ({id, address, token_amount, eth_amount}, tx) => {
    let updateValues = {}
    if(address) updateValues.address = address;
    if(token_amount) updateValues.token_amount = token_amount;
    if(eth_amount) updateValues.eth_amount = eth_amount;
    try {
      const result = await user.update(updateValues, {where:{id: id}, transaction: tx});
      return result;
    } catch (e) {
      console.log("user_update err", e);
      return null;
    }
  }
}