const user = require('../services/user.services');
const { web3, getEtherAmount } = require('../services/web3.common.services');
const { getBalance } = require('../services/web3.erc20.services');

module.exports = {
  user_amountUpdate: async (id, address, tx) => {
    try {
      let eth_amount = await getEtherAmount(address);
      eth_amount = await web3.utils.fromWei(eth_amount, 'ether').substring(0, 9);
      const token_amount = await getBalance(address);
      const updateValue = {id: id};
      if(eth_amount) updateValue.eth_amount = eth_amount;
      if(token_amount) updateValue.token_amount = token_amount;

      const updateResult = await user.user_update(updateValue, tx);
      if(!updateResult) return null;
      return {
        updateResult: updateResult,
        eth_amount: eth_amount,
        token_amount: token_amount
      }
    } catch (e){
      console.log(e);
      return null;
    }    
  }
}