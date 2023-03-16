import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';



import Header from './components/Header';



import { WalletStatus } from './components/WalletStatus';
import { MintNFTPage } from './pages/mintNFTPage'; // 시작은 대문자로 해야 정상적으로 적용된다. 

function App() {

  return (
    <BrowserRouter>
      <Header getAccount/>
      <Routes>
        <Route path='/' element={<MintNFTPage />} />       
      </Routes>
      <WalletStatus />
    </BrowserRouter>
  );
}

export default App;