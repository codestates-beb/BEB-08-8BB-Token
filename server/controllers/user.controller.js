const user = require('../services/user.services');

module.exports = {
  user_main_get: (req, res) => {
    res.send("user_main_get");
    user.test();
  },
  user_join_post: (req, res) => {
    res.send("user join post")   
  },
}