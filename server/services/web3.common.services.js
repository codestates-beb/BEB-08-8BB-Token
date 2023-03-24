require('dotenv').config();
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.PROVIDER_ADDRESS || 'http://127.0.0.1:7545'));

module.exports = {  
  newAccount: async (password) => {
    try {
      return await web3.eth.personal.newAccount(password);
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  getEtherAmount: async (addr) => {
    try {
      return  await await web3.eth.getBalance(addr);
    } catch (e) {
      console.log(e);
      return null;
    }  
  },
  sendEther: async (toAddr, amount) => {
    try {       
      const accounts = await web3.eth.getAccounts();
      const accountsLen = accounts.length > 10 ? 10 : accounts.length;
      for(let i = 1; i < accountsLen; i++) {
        //이더확인 
        let balance = await web3.eth.getBalance(accounts[i]);
        balance = await web3.utils.fromWei(balance, "ether");
        if(Number(balance) > Number(amount)) {
          //이더전송
          const txhash = await web3.eth.sendTransaction({from: accounts[i], to: toAddr, value: web3.utils.toWei(amount, 'ether')});
          return txhash;
        }
      } 
      return null; 
    } catch (e) {
      console.log(e);
      return null;
    }
  },  
  personalSendTx: async (data, contractAddr, fromAddr, fromPassword) => {     
    try {
      //nonce 값 조회
      const nonce = await web3.eth.getTransactionCount(fromAddr);
      //트랜잭션 객체 생성
      const txParams = {
        nonce: nonce,
        gasPrice: web3.utils.toHex(web3.utils.toWei('10','gwei')),
        gasLimit: 300000,
        to: contractAddr,
        from: fromAddr,
        value: 0,
        data: data
      };
      //계정 해제
      await web3.eth.personal.unlockAccount(fromAddr, fromPassword, 300);
      //트랜잭션 전송
      const txhash = await web3.eth.personal.sendTransaction(txParams, fromPassword);    
      return txhash;
    } catch (e) {
      console.log(e)
      return null;
    }
  }, 
  sendSignedTx: async (data, contractAddr, fromAddr, privateKey) => {     
    try {
      //nonce 값 조회
      const nonce = await web3.eth.getTransactionCount(fromAddr);
      //트랜잭션 객체 생성
      const txParams = {
        nonce: nonce,
        gasPrice: web3.utils.toHex(web3.utils.toWei('10','gwei')),
        gasLimit: 300000,
        to: contractAddr,
        from: fromAddr,
        value: 0,
        data: data
      };  
      //트랜잭션 서명
      const result = await web3.eth.accounts.signTransaction(txParams, privateKey);
      //서명된 트랜잭션 전송
      const receipt = await web3.eth.sendSignedTransaction(result.rawTransaction);
      return receipt;
    } catch (e) {
      console.log(e)
      return null;
    }
  },
  web3: web3
}