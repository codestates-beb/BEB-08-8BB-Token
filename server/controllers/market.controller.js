const market = require('../services/market.services');

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
    //NFT 민트후 token_id와 tx_hash 얻는 기능 추가! 
    const token_id = 0;
    const tx_hash = "";

    const result = await market.market_main_post(req.body.user_id, req.body.title, req.body.img_url, req.body.comment, token_id, tx_hash );
    if(result) {
      res.status(200).send({message: "success"});
    } else {
      res.status(400).send({message: "error"});
    }   
  },
}