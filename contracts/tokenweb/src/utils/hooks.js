import { useWeb3React } from "@web3-react/core";
import { useState, useEffect, useCallback } from 'react';
import { injected } from "./connectors";

export function useWeb3Connect() {
    const { activate, active } = useWeb3React();
    const [tried, setTried] = useState(false);

    const tryActivate = useCallback(() => {
        async function _tryActivate() {
            const isAuthorized = await injected.isAuthorized();

            if (isAuthorized) {
                try{
                    await activate(injected, undefined, true);
                } catch (error){
                    window.alert('Error:' + (error && error.message));
                }
            }
            setTried(true);
        }
        _tryActivate();
    }, [activate])

    useEffect(() => {
        tryActivate();
    }, [tryActivate]);

    useEffect(() => {
        if(!tried && active){
            setTried(true);
        }
    }, [tried, active]);

    return tried;
};

export function showAccount(){
    const { ethereum } = window;
    let account
    const handleAccountChanged = (accounts) => {
        console.log('handleAccountChanged', accounts);
        account = accounts;
    }
    ethereum.on('accountsChanged', handleAccountChanged);

    return (account);
};

// 이더리움 라이브러리의 변화가 웹에서 감지될 수 있게 한다.
export function useInactiveListener(suppress = false) {
    const { active, error, activate } = useWeb3React();

    useEffect(() => {
        const { ethereum } = window;

        if(ethereum && ethereum.on && !active && !error && !suppress){
            const handleConnect = () => {
                console.log('handle connect');
                activate(injected);
            }

            const handleChainChanged = (chainId) => {
                console.log('handleChainChanged', chainId);
                activate(injected);
            }

            const handleAccountChanged = (accounts) => {
                console.log('handleAccountChanged', accounts);
                if(accounts.length > 0){
                    activate(injected);
                }
            }

            ethereum.on('connect', handleConnect);
            ethereum.on('chainChanged', handleChainChanged);
            ethereum.on('accountsChanged', handleAccountChanged);

            return () => {
                if (ethereum.removeListener) {
                    ethereum.removeListener('connect', handleConnect);
                    ethereum.removeListener('chainChanged', handleChainChanged);
                    ethereum.removeListener('accountsChanged', handleAccountChanged);
                }
                
            }
        }
    }, [active, error, activate, suppress])
}