const comContr = require('./common.controller');
const user = require('../services/user.services');
const common = require('../services/web3.common.services');
const erc20 = require('../services/web3.erc20.services');
const dataStore = require('../services/web3.datastore.services');
const { sequelize } = require('../models');

module.exports = {
  user_main_get: (req, res) => {
    res.send("user_main_get");
  },
  user_transfer_post: async (req, res) => {
    //로그인 체크
    if(!req.session.userData 
      || req.session.userData.id !== req.body.id
      ) {
      return res.status(401).send({message: "error. not logged in"});
    }
    //유효성 체크
    if(!req.body.toId || !req.body.toAddr || !req.body.amount) {
      return res.status(422).send({message: "error. all inputs required"});
    }
    //토큰 전송
    const transferResult = await erc20.transfer(req.body.toAddr, req.body.amount, req.session.userData.address, req.session.userData.password);
    if(!transferResult) {
      return res.status(503).send({message: "error. transfer failed"});
    }
    //정보 업데이트
    const userResult = await comContr.user_amountUpdate(req.session.userData.id, req.session.userData.address);
    const toResult = await comContr.user_amountUpdate(req.body.toId, req.body.toAddr);
    if(userResult && toResult) {
      return res.status(200).send({message: "success", 
      data: {
        from_token_amount: userResult.token_amount,
        from_eth_amount: userResult.eth_amount,  
        to_token_amount: toResult.token_amount,        
        to_eth_amount: toResult.eth_amount
      }}); 
    }
    res.status(400).send({message: "error"});
  },
  user_faucet_post: async (req, res) => {
    //로그인 체크
    if(!req.session.userData 
      || req.session.userData.id !== req.body.id
      ) {
      return res.status(401).send({message: "error. not logged in"});
    }
    //이더전송
    const sendResult = await common.sendEther(req.session.userData.address, "1");
    if(!sendResult) {
      return res.status(503).send({message: "error. send ether failed"});
    }
    //정보 업데이트
    const updateResult = await comContr.user_amountUpdate(req.session.userData.id, req.session.userData.address);
    if(updateResult) {
      return res.status(200).send({message: "success", data: {eth_amount: updateResult.eth_amount}}); 
    }
    res.status(400).send({message: "error"});
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
      const userData = { 
        "id": result.id,
        "nickname": result.nickname,
        "password": result.password,
        "address": result.address,
        "token_amount": result.token_amount
      };
      req.session.userData = userData;
      res.status(200).send({message: "success"});
    } else {
      res.status(400).send({message: "error"});
    }
  },  
  user_logout_post: async (req, res) => {
    //로그인 체크
    if(!req.session.userData 
      || req.session.userData.id !== req.body.id
      ) {
      return res.status(401).send({message: "error. not logged in"});
    }
    req.session.destroy(()=>{
      res.cookie("connect.sid","yop");
      res.status(200).send({message: "success"});
    })
  },
}