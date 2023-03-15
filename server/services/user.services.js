const { user } = require('../models');
const { post } = require('../models');
const { nft } = require('../models');

module.exports = {
  test: () => {
    // user.create({
    //   nickname: 'John2',
    //   password: '11111'
    // }).then(user => {
    //   console.log("User's auto-generated ID:", user.id);
    // });
    // post.create({
    //   user_id: 1,
    //   title: 'test',
    //   content: 'test!!'
    // }).then(user => {
    //   console.log("Post's auto-generated ID:", user.id);
    // });
    nft.create({
      user_id: 1,
    }).then(user => {
      console.log("User's auto-generated ID:", user.id);
    });
  },
}