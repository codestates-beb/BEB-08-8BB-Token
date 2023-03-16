const { nft, user } = require('../models');

module.exports = {
  market_main_get: async () => {
    try {
      const result = await nft.findAll({
        attributes: ['title', 'img_url', 'comment', 'token_id', 'tx_hash'],
        include: [{
           model: user,     
           attributes: ['nickname']
        }],
      });
      return result;
    } catch (e) {
      console.log("market_main_get err", e);
      return null;
    }
  },
  market_main_post: async (user_id, title, img_url, comment, token_id, tx_hash) => {
    try {
      const result = await nft.create({
        user_id,
        title,
        img_url,
        comment,
        token_id,
        tx_hash
      });
      return result;
    } catch (e) {
      console.log("market_main_post err", e);
      return null;
    }
  }
}