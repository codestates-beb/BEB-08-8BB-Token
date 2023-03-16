const { post, user } = require('../models');

module.exports = {
  post_mainById_get: async (id) => {
    try {
      const result = await post.findAll({
        attributes: ['id', 'title', 'content', 'createdAt', 'updatedAt', ['user_id', 'userId']],
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
  post_main_post: async (title, content, userId) => {
    try {
      const result = await post.create({
        user_id: userId,
        title: title,
        content: content
      });
      return result;
    } catch (e) {
      console.log("post_main_post err", e);
      return null;
    }
  }
}