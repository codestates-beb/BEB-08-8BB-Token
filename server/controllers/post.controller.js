const post = require('../services/post.services');
const { sequelize } = require('../models');
const { user_amountUpdate } = require('./common.controller');
const { postSet } = require('../services/web3.erc20.services');
const { getPostData } = require('../services/web3.datastore.services');

module.exports = {
  post_main_get: (req, res) => {
    res.send("post_main_get")   
  },
  post_mainById_get: async (req, res) => {
    const result = await post.post_mainById_get(req.params.id);    
    if(result) {
      //게시글을 찾을 수 없을때
      if(result.length === 0 ) {
        res.status(404).send({message: "not found list"});
        return;
      }
      let filterdResult = [];
      for(obj of result) {
        let objcpy = {...obj.dataValues}
        //nickname 설정
        objcpy.nickname = objcpy.user.nickname;
        delete objcpy.user; 
        //시간 설정
        objcpy.createdAt = objcpy.createdAt.getTime();
        objcpy.updatedAt = objcpy.updatedAt.getTime();
        filterdResult.push(objcpy);
      }
      res.status(200).send({message: "success", data: filterdResult});
    } else {
      res.status(400).send({message: "error"});
    }
  },
  post_main_post: async (req, res) => {
    //로그인 체크
    if(!req.session.userData 
      || req.session.userData.id !== req.body.userId
      ) {
      return res.status(401).send({message: "error. not logged in"});
    }
    try {
      await sequelize.transaction(async(tx) => {
        //DB저장
        const result = await post.post_main_post(req.body.title, req.body.content, req.body.userId, null, tx);
        if(!result) {
          res.status(400).send({message: "error"});
          throw new Error('error');
        }
        //토큰전송
        const tokenAmount = 10;
        const postSetReceipt = await postSet(
          req.session.userData.address, tokenAmount, //토큰 전송용
          result.id, result.user_id, result.title ? result.title: "", result.content ? result.content: "", result.hits ? result.hits: 0 //블록체인 저장용
          );
        if(!postSetReceipt) {
          res.status(503).send({message: "error. token transfer failed"});
          throw new Error('error. token transfer failed');
        }
        const getPost = await getPostData(result.id); //체인데이터 저장 확인
        console.log(getPost);
        //정보 업데이트
        await user_amountUpdate(req.session.userData.id, req.session.userData.address, tx);
        await post.post_update({id: result.id, tx_hash: postSetReceipt.transactionHash}, tx);

        return res.status(200).send({message: "success"});         
      });
    } catch (e) {
      console.log(e);
      return;
    }  
  }  
}