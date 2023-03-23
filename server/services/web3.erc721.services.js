require('dotenv').config();
const { web3, personalSendTx, sendSignedTx } = require('./web3.common.services');
const { erc721abi } = require('../common/abi');
const erc721Contract = new web3.eth.Contract(erc721abi, process.env.ERC721_CONTRACT_ADDRESS);

module.exports = {
  getBalance721: async (addr) => {
    try {
      return await erc721Contract.methods.balanceOf(addr).call();
    } catch (e) {
      console.log(e);
      return null;
    }  
  },
  setToken: async (tokenAddr) => {
    try {
      const data = await erc721Contract.methods.setToken(tokenAddr).encodeABI();
      const result = await sendSignedTx(data, process.env.ERC721_CONTRACT_ADDRESS, process.env.SERVER_ADDRESS, process.env.SERVER_PRIVATE_KEY);
      return result;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  setDataStore: async (dataStoreAddress) => {
    try {
      const data = await erc721Contract.methods.setDataStore(dataStoreAddress).encodeABI();
      const result = await sendSignedTx(data, process.env.ERC721_CONTRACT_ADDRESS, process.env.SERVER_ADDRESS, process.env.SERVER_PRIVATE_KEY);
      return result;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  mintSet: async (recipient, tokenURI, id, user_id) => {
    try {
      const data = await erc721Contract.methods.mintSet(recipient, tokenURI, id, user_id).encodeABI();
      const result = await sendSignedTx(data, process.env.ERC721_CONTRACT_ADDRESS, process.env.SERVER_ADDRESS, process.env.SERVER_PRIVATE_KEY)
      return result;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}