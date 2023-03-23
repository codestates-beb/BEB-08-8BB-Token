const user = require('../services/user.services');
const common = require('../services/web3.common.services');
const dataStore = require('../services/web3.datastore.services');
const { sequelize } = require('../models');

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
    //입력값체크
    if(!req.body.nickname
      || !req.body.password
      ) {
        res.status(400).send({message: "error. nickname, password required"});
        return;
      }
    //id중복체크
    const checkId = await user.user_joinById_get(req.body.nickname);
    if(checkId) {
      //중복된 아이디가 있을때
      if(checkId.length > 0) {
        res.status(409).send({message: "nickname already exists"});
        return;
      }
    }
    try {
      await sequelize.transaction(async(tx) => {
        //지갑생성
        const address = await common.newAccount(req.body.password);
        if(!address) {
          res.status(503).send({message: "error. create wallet failed"});
          throw new Error('error. create wallet failed');
        }
        //DB저장
        const result = await user.user_join_post(req.body.nickname, req.body.password, address, tx);
        if(!result) {
          res.status(400).send({message: "error"});
          throw new Error('error');
        }        
        //블록체인저장
        const dsResult = await dataStore.setUserData(result.id, result.nickname, result.address);
        if(!dsResult) {
          res.status(503).send({message: "error. dataStore failed"});
          throw new Error('error. dataStore failed');
        }
        const getResult = await dataStore.getUserData(result.id);
        console.log(getResult);

        const filterdResult = {
          id: result.id,
          nickname: result.nickname,
          address: result.address,
          token_amount: result.token_amount,
          eth_amount: result.eth_amount
        }
        res.status(200).send({message: "success", data: filterdResult});
        return;
      });
    } catch (e) {
      console.log(e);
      return;
    } 
  },
  user_login_post: async (req, res) => {
    const result = await user.user_login_post(req.body.nickname, req.body.password);
    if(result) {
      console.log(1, req.session.userData) //없을때는 undefined
      const userData = { 
        "id": result.id,
        "nickname": result.nickname,
        "password": result.password,
        "address": result.address,
        "token_amount": result.token_amount
      };
      req.session.userData = userData;
      console.log(2, req.session.userData)
      res.status(200).send({message: "success"});
    } else {
      res.status(400).send({message: "error"});
    }
  },  
}