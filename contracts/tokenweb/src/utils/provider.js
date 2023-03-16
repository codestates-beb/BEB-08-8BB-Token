import { Web3Provider } from '@ethersproject/providers';

export function getProvider(provider) {
    const web3Provider = new Web3Provider(provider);
    return web3Provider;
}