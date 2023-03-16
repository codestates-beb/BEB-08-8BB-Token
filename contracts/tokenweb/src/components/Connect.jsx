import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { useState } from "react";
import { injected } from '../utils/connectors';
import { useInactiveListener, useWeb3Connect } from '../utils/hooks';
import styled from 'styled-components';
import { NoEthereumProviderError, UserRejectedRequestError } from '@web3-react/injected-connector';

const StyledActivateButton = styled.button`
    width: 150px;
    height: 2rem;
    border-radius: 1rem;
    border-color: green;
    cursor: pointer;
`;

const StyledDeactivateButton = styled.button`
    width: 150px;
    height: 2rem;
    border-radius: 1rem;
    border-color: red;
    cursor: pointer;
`;

const Activate = () => {
    const context = useWeb3React();
    const { activate, active } = context;
    const [activating, setActivating] = useState(false);
    const { account, library } = useWeb3React()

    const handleActivate = (event) => {
        event.preventDefault(); 

        async function _activate() {
            try {
                const signature = await library.getSigner(account).signMessage('Hello');
                window.alert(`Success! ${signature}`);
            }catch(error) {
                console.error(error);
            }
            setActivating(true);
            await activate(injected);
            setActivating(false); 
        }
        _activate();
    }
    
    // web3 요소가 감지되면 자동실행
    const eagerConnectionSuccessful = useWeb3Connect();
    useInactiveListener(!eagerConnectionSuccessful);

    return (
        <StyledActivateButton disabled = {active} 
        style={{
            borderColor: activating ? 'orange' : active? 'unset' : 'green'
        }}
        onClick = {handleActivate}>Connect</StyledActivateButton>
    )
}

const Deactivate = () => {
    const context = useWeb3React();
    const { deactivate, active } = context;

    const handleDeactivate = (event) => {
        event.preventDefault();

        deactivate();
    }

    return (
        <StyledDeactivateButton disabled = {!active} 
        style={{
            borderColor: active? 'red' : 'unset'
        }}
        onClick = {handleDeactivate}>Disconnect</StyledDeactivateButton>
    )
}

function getErrorMessage(error) {
    let errorMessage;

    switch (error.constructor) {
        case NoEthereumProviderError:
            errorMessage = `이더리움 브라우져가 설치되어 있지 않습니다. 메타마스크 익스텐션을 설치하세요.`;
            break;
        case UnsupportedChainIdError:
            errorMessage = `지원하지 않는 네트워크 입니다.`;
            break;
        case UserRejectedRequestError:
            errorMessage = `웹사이트가 당신의 이더리움 계정에 접근할 수 있도록 수락하세요.`;
            break;
        default:
            errorMessage = error.message;
    }

    return errorMessage;
}

export function isActivate() {
    return Activate.active;
}

export function Connect() {
    const { error } = useWeb3React();

    if(error) {
        window.alert(getErrorMessage(error));
    }
    return(
        <>
            <Activate />
            <Deactivate />
        </>
    )
}