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
    //NFT 민트후 token_id와 tx_hash 얻는 기능 추가! 
    const token_id = 0;
    const tx_hash = "";

    const result = await market.market_main_post(req.query.user_id, req.query.title, req.query.img_url, req.query.comment, token_id, tx_hash );
    if(result) {
      res.status(200).send({message: "success"});
    } else {
      res.status(400).send({message: "error"});
    }   
  },
}