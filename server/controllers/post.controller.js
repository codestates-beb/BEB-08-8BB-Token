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
    //로그인 체크
    if(!req.session.userData 
      || req.session.userData.id !== req.body.user_id
      ) {
      res.status(401).send({message: "error. not logged in"});
      return;
    }
    const result = await post.post_main_post(req.body.title, req.body.content, req.body.userId);
    if(result) {
      res.status(200).send({message: "success"});
    } else {
      res.status(400).send({message: "error"});
    }
  }
}