const market = require('../services/market.services');
const { sequelize } = require('../models');
const { user_amountUpdate } = require('./common.controller');
const { approve } = require('../services/web3.erc20.services');
const { mintSet } = require('../services/web3.erc721.services');
const { getNftData } = require('../services/web3.datastore.services');

module.exports = {
  market_main_get: async (req, res) => {
    const result = await market.market_main_get();
    if(result) {
      let filterdResult = [];
      for(obj of result) {
        let objcpy = {...obj.dataValues}
        //nickname 설정
        objcpy.nickname = objcpy.user.nickname;
        delete objcpy.user; 

        filterdResult.push(objcpy);
      }
      res.status(200).send({message: "success", data: filterdResult});
    } else {
      res.status(400).send({message: "error"});
    }   
  },
  market_main_post: async (req, res) => {
    //로그인 체크
    if(!req.session.userData 
      || req.session.userData.id !== req.body.user_id
      ) {
      res.status(401).send({message: "error. not logged in"});
      return;
    }
    try {
      await sequelize.transaction(async(tx) => {
        //DB저장
        const result = await market.market_main_post(req.body.user_id, req.body.title, req.body.img_url, req.body.comment, req.body.token_uri, null, null, tx );
        if(!result) {
          res.status(400).send({message: "error"});
          throw new Error('error');
        }
        //erc20 approve설정
        const tokenAmount = 10;
        const approveTxhash = await approve(process.env.ERC721_CONTRACT_ADDRESS, tokenAmount, req.session.userData.address, req.session.userData.password);  
        //NFT민트
        const mintSetReceipt = await mintSet(
          req.session.userData.address, req.body.token_uri ? req.body.token_uri : "",
          result.id, result.user_id
          );
        if(!mintSetReceipt) {
          res.status(503).send({message: "error. mint failed"});
          throw new Error('error. mint failed');
        }
        const getNFT = await getNftData(result.id); //체인데이터 저장 확인
        console.log(getNFT);
        const token_id = parseInt(mintSetReceipt.logs[2].topics[3]);
        //정보 업데이트
        await user_amountUpdate(req.session.userData.id, req.session.userData.address, tx);  
        await market.market_update({id: result.id, token_id: token_id, tx_hash: mintSetReceipt.transactionHash}, tx);  

        return res.status(200).send({message: "success"});
      });
    } catch (e) {
      console.log(e);
      return;
    }       
  },
}