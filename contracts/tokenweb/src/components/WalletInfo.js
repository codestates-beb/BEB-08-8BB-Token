import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'
import { ethers } from "ethers";

export function ChainId() {
    const { chainId } = useWeb3React()
    
    return(chainId ? chainId : '')
}

export function BlockNumber() {
    const { chainId, library } = useWeb3React();
    const [blockNumber, setBlockNumber] = useState();

    useEffect(() => {
        if (!library) return;

        let stale = false;

        async function getBlockNumber() {
            try {
                const blockNumber = await library.getBlockNumber();
                if(!stale) {
                    setBlockNumber(blockNumber);
                }
            } catch (error) {
                console.error(error);
            }
        }
        getBlockNumber();

        library.on('block', setBlockNumber)

        return () => {
            stale = true;
            library.removeListener('block', setBlockNumber);
            setBlockNumber(undefined);
        }
    }, [library, chainId])

    return (blockNumber ? blockNumber : '')
}

export function Account() {
    const { account } = useWeb3React();

    return (account? account : '')
}

export function Balance() {
    const { account, library, chainId } = useWeb3React();
    const [balance, setBlance] = useState();

    let stale = false;
    useEffect(() => {
        if (typeof account === 'undefined' || account === null || !library) {
            return;
        }

        async function getBalance() {
            try {
                const balance = await library.getBalance(account);
                if(!stale) {
                    setBlance(balance);
                }
            } catch(error) {
                console.error(error);
            }
        }
        getBalance();

        library.on('block', getBalance);
        //when a new block is added to the blockchain, the "getBalance" function will be called

        return () => {
            stale = true;
            library.removeListener('block', getBalance)
            setBlance(undefined);
        }
    }, [account, library, chainId])

    return (balance ? `${ethers.utils.formatEther(balance)} ETH` : '')
}

export function NextNonce() {
    let stale = false;
    const { account, library, chainId } = useWeb3React();
    const [nextNonce, setNextNonce] = useState();

    useEffect(() => {
        if (typeof account === 'undefined' || account === null || !library) {
            return;
        }

        async function getNextNonce() {
            try{
                const nextNonce = await library.getTransactionCount(account);
                if (!stale) {
                    setNextNonce(nextNonce);
                }
            }catch(error) {
                console.error(error);
            }
        }
        getNextNonce();

        library.on('block', getNextNonce)

        return () => {
            stale = true;
            setNextNonce(undefined);
            library.off('block', getNextNonce);
        }
    },[library])

    return( nextNonce ? nextNonce : '')
}

