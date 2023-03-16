import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "./components/layouts/AuthLayout";
import MainPage from "./pages/MainPage";
import MyPage from "./pages/MyPage";
import LoginPage from "./pages/auth/LoginPage";
import JoinPage from "./pages/auth/JoinPage";
import MarketPage from "./pages/MarketPage";
import BaseLayout from "./components/layouts/BaseLayout";
import PATH from "./constants/path";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATH.HOME} element={<BaseLayout />}>
          <Route index element={<MainPage />} />
          <Route path={PATH.MYPAGE} element={<MyPage />} />
          <Route path={PATH.MARKET} element={<MarketPage />} />
          <Route path={PATH.FAUCET} element={<MarketPage />} />
        </Route>
        <Route path={PATH.AUTH} element={<AuthLayout />}>
          <Route path={PATH.LOGIN} element={<LoginPage />} />
          <Route path={PATH.JOIN} element={<JoinPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
