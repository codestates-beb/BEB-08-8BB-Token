const user = require('../services/user.services');

module.exports = {
  user_main_get: (req, res) => {
    res.send("user_main_get");
    user.test();
  },
  user_joinById_get: async (req, res) => {
    const result = await user.user_joinById_get(req.params.nickname);
    if(result) {
      //중복된 아이디가 있을때
      if(result.length > 0) {
        res.status(409).send({message: "already exists", data: {isDuplicate:true}});
        return;
      } 
      //중복된 아이디가 없을때
      else {
        res.status(200).send({message: "You can use this nickname", data: {isDuplicate:false}});
        return;
      }      
    } else {
      res.status(400).send({message: "error", result});
      return;
    }
  },
  user_join_post: async (req, res) => {
    const result = await user.user_join_post(req.body.nickname, req.body.password);
    if(result) {
      const filterdResult = {
        id: result.id,
        nickname: result.nickname,
        address: result.address,
        token_amount: result.token_amount,
        eth_amount: result.eth_amount
      }
      res.status(200).send({message: "success", data: filterdResult});
    } else {
      res.status(400).send({message: "error"});
    } 
  },
  user_login_post: async (req, res) => {
    const result = await user.user_login_post(req.body.nickname, req.body.password);
    if(result) {
      console.log(1, req.session.userData) //없을때는 undefined
      const userData = { 
        "id": result.id,
        "nickname": result.nickname
      };
      req.session.userData = userData;
      console.log(2, req.session.userData)
      res.status(200).send({message: "success"});
    } else {
      res.status(400).send({message: "error"});
    }
  }
}