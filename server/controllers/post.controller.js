const post = require('../services/post.services');

module.exports = {
  post_main_get: (req, res) => {
    res.send("post_main_get")   
  },
  post_mainById_get: async (req, res) => {
    const result = await post.post_mainById_get(req.params.id);    
    if(result) {
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
    const result = await post.post_main_post(req.query.title, req.query.content, req.query.userId);
    if(result) {
      res.status(200).send({message: "success"});
    } else {
      res.status(400).send({message: "error", errData: result});
    }
  }
}