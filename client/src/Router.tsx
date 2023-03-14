import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "./components/layouts/AuthLayout";
import MainLayout from "./components/layouts/MainLayout";
import MainPage from "./pages/MainPage";
import MyPage from "./pages/MyPage";
import LoginPage from "./pages/auth/LoginPage";
import JoinPage from "./pages/auth/JoinPage";
import MarketPage from "./pages/MarketPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<MainPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/market" element={<MarketPage />} />
        </Route>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/join" element={<JoinPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
