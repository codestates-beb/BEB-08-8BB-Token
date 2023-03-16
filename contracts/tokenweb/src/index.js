import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createRoot } from "react-dom/client";
import { ThirdwebProvider } from "@thirdweb-dev/react";

import { Web3ReactProvider } from '@web3-react/core';
import { getProvider } from './utils/provider';

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "ethereum";

const container = document.getElementById("root");
const root = createRoot(container);

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getProvider}>
    <ThirdwebProvider activeChain={activeChain}>
      <App /> 
      {/* web3에 저장되어 있는 정보들을 손쉽게 가져올 수 있다.  */}
      </ThirdwebProvider>
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById('root')
);