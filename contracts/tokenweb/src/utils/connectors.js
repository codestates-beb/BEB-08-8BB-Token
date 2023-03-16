import { InjectedConnector } from "@web3-react/injected-connector";

export const injected = new InjectedConnector({
    supportedChainIds: [1, 31337, 5, 1337] 
    // 연결할 네트워크체인 설정
})