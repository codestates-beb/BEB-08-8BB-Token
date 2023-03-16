import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'
import { ethers } from "ethers";
import styled from 'styled-components'

const StyledWalletStatusDiv = styled.div`
    display: flex;
    gap: 20px;
`;

function ChainId() {
    const { chainId } = useWeb3React()
    
    return(
        <>
            <span>ChainID</span>
            <span>{chainId}</span>
        </>
    )
}

function BlockNumber() {
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

    return (
        <>
            <span>BlockNumber</span>
            <span>{blockNumber}</span>
        </>
    )
}

function Account() {
    const { account } = useWeb3React();

    return (
        <>
            <span>Account</span>
            <span>{account ? `${account.substring(0, 6)}...${account.substring(account.length-4)}` : ''}</span>
        </>
    )
}

function Balance() {
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

    return (
        <>
            <span>Balance</span>
            <span>{balance ? `${ethers.utils.formatEther(balance)} ETH` : ''}</span>
        </>
    )
}

function NextNonce() {
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
            library.off('block', getNextNonce); // 논스 값이 웹페이지에서 계속 깜빡거리는 것을 방지
        }
    }, [library])

    return(
        <>
            <span>NextNonce</span>
            <span>{nextNonce ? nextNonce : ''}</span>
        </>
    )
}

export function WalletStatus() {
    return(
        <StyledWalletStatusDiv>
            <ChainId />
            <BlockNumber />
            <Account />
            <Balance />
            <NextNonce />
        </StyledWalletStatusDiv>
    )
}