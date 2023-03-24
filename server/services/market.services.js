const { nft, user } = require('../models');

module.exports = {
  market_main_get: async () => {
    try {
      const result = await nft.findAll({
        attributes: ['title', 'img_url', 'comment', 'token_id','token_uri', 'tx_hash'],
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
  market_main_post: async (user_id, title, img_url, comment, token_uri, token_id, tx_hash, tx) => {
    try {
      const result = await nft.create({
        user_id,
        title,
        img_url,
        comment,
        token_uri,
        token_id,
        tx_hash
      }, {transaction: tx});
      return result;
    } catch (e) {
      console.log("market_main_post err", e);
      return null;
    }
  },
  market_update: async ({id, user_id, title, img_url, comment, token_uri, token_id, tx_hash}, tx) => {
    let updateValues = {}
    if(user_id) updateValues.user_id = user_id;
    if(title) updateValues.title = title;
    if(img_url) updateValues.img_url = img_url;
    if(comment) updateValues.comment = comment;
    if(token_uri) updateValues.token_uri = token_uri;
    if(token_id) updateValues.token_id = token_id;
    if(tx_hash) updateValues.tx_hash = tx_hash;
    try {
      const result = await nft.update(updateValues, {where:{id: id}, transaction: tx});
      return result;
    } catch (e) {
      console.log("market_update err", e);
      return null;
    }
  }
}