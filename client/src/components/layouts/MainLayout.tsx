import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div>
      <header>header</header>
      <div>
        <Outlet />
      </div>
      <footer>footer</footer>
    </div>
  );
}
