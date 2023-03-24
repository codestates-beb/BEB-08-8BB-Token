const { post, user } = require('../models');

module.exports = {
  post_mainById_get: async (id) => {
    try {
      const result = await post.findAll({
        attributes: ['id', 'title', 'content', 'hits', 'createdAt', 'updatedAt', ['user_id', 'userId']],
        include: [{
           model: user,     
           attributes: ['nickname']
        }],
        where: {user_id : id}
      });
      return result;
    } catch (e) {
      console.log("post_mainById_get err", e);
      return null;
    }
  },
  post_main_post: async (title, content, userId, tx_hash, tx) => {
    try {
      const result = await post.create({
        user_id: userId,
        title: title,
        content: content,
        tx_hash: tx_hash,
        hits: 0
      }, {transaction: tx});
      return result;
    } catch (e) {
      console.log("post_main_post err", e);
      return null;
    }
  },
  post_update: async ({id, user_id, title, content, hits, tx_hash}, tx) => {
    let updateValues = {}
    if(user_id) updateValues.user_id = user_id;
    if(title) updateValues.title = title;
    if(content) updateValues.content = content;
    if(hits) updateValues.hits = hits;
    if(tx_hash) updateValues.tx_hash = tx_hash;
    try {
      const result = await post.update(updateValues, {where:{id: id}, transaction: tx});
      return result;
    } catch (e) {
      console.log("post_update err", e);
      return null;
    }
  }
}