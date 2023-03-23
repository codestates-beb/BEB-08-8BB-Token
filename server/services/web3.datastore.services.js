require('dotenv').config();
const { web3, personalSendTx, sendSignedTx } = require('./web3.common.services');
const { dataStoreabi } = require('../common/abi');
const dataContract = new web3.eth.Contract(dataStoreabi, process.env.DATASTORE_CONTRACT_ADDRESS);

module.exports = {
  approve: async (address) => {
    try {
      const data = await dataContract.methods.approve(address).encodeABI();
      const result = await sendSignedTx(data, process.env.DATASTORE_CONTRACT_ADDRESS, process.env.SERVER_ADDRESS, process.env.SERVER_PRIVATE_KEY);
      return result;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  setUserData: async (id, nickname, address) => {
    try {
      const data = await dataContract.methods.setUserData(id, nickname, address).encodeABI();
      const result = await sendSignedTx(data, process.env.DATASTORE_CONTRACT_ADDRESS, process.env.SERVER_ADDRESS, process.env.SERVER_PRIVATE_KEY);
      return result;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  setPostData: async (id, user_id, title, content, hits) => {
    try {
      const data = await dataContract.methods.setPostData(id, user_id, title, content, hits).encodeABI();
      const result = await sendSignedTx(data, process.env.DATASTORE_CONTRACT_ADDRESS, process.env.SERVER_ADDRESS, process.env.SERVER_PRIVATE_KEY);
      return result;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  setNftData: async (id, user_id, token_id, token_URI) => {
    try {
      const data = await dataContract.methods.setNftData(id, user_id, token_id, token_URI).encodeABI();
      const result = await sendSignedTx(data, process.env.DATASTORE_CONTRACT_ADDRESS, process.env.SERVER_ADDRESS, process.env.SERVER_PRIVATE_KEY);
      return result;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  getUserData: async (id) => {
    try {
      return await dataContract.methods.getUserData(id).call(); 
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  getPostData: async (id) => {
    try {
      return await dataContract.methods.getPostData(id).call(); 
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  getNftData: async (id) => {
    try {
      return await dataContract.methods.getNftData(id).call(); 
    } catch (e) {
      console.log(e);
      return null;
    }
  },
}
