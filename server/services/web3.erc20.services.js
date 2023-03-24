require('dotenv').config();
const { web3, personalSendTx, sendSignedTx } = require('./web3.common.services');
const { erc20abi } = require('../common/abi');
const erc20Contract = new web3.eth.Contract(erc20abi, process.env.ERC20_CONTRACT_ADDRESS);

module.exports = {
  getBalance: async (addr) => {
    try {
      return  await erc20Contract.methods.balanceOf(addr).call();
    } catch (e) {
      console.log(e);
      return null;
    }  
  },   
  approve: async (spenderAddr, tokenAmount, fromAddr, fromPassword) => {
    try {
      const data = await erc20Contract.methods.approve(spenderAddr, tokenAmount).encodeABI();
      const result = await personalSendTx(data, process.env.ERC20_CONTRACT_ADDRESS, fromAddr, fromPassword);
      return result;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  setDataStore: async (dataStoreAddress) => {
    try {
      const data = await erc20Contract.methods.setDataStore(dataStoreAddress).encodeABI();
      const result = await sendSignedTx(data, process.env.ERC20_CONTRACT_ADDRESS, process.env.SERVER_ADDRESS, process.env.SERVER_PRIVATE_KEY);
      return result;
    } catch (e) {
      console.log(e);
      return null;
    }
  }, 
  postSet: async (toAddr, tokenAmount, id, user_id, title, content, hits) => {
    try {
      const data = await erc20Contract.methods.postSet(toAddr, tokenAmount, id, user_id, title, content, hits).encodeABI();
      const result = await sendSignedTx(data, process.env.ERC20_CONTRACT_ADDRESS, process.env.SERVER_ADDRESS, process.env.SERVER_PRIVATE_KEY)
      return result;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  transfer: async (toAddr, tokenAmount, fromAddr, fromPassword) => {
    try {
      const data = await erc20Contract.methods.transfer(toAddr, tokenAmount).encodeABI();
      const result = await personalSendTx(data, process.env.ERC20_CONTRACT_ADDRESS, fromAddr, fromPassword);
      return result;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}

