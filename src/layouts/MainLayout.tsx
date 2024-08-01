import { NavLink, Outlet } from "react-router-dom";
import "./mainLayout.css";

export default function MainLayout() {
  return (
    <>
      <header>
        <h1>Minimalist todolist</h1>
        <NavLink to="">Logout</NavLink>
      </header>

      <Outlet />
    </>
  );
}
