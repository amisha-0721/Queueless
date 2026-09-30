import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function UserLayout() {
  const navigate = useNavigate();

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand" onClick={() => navigate("/user")}>
          <span className="brand-mark">Q</span>
          <span>QueueLess</span>
        </div>

        <nav className="nav-links">
          <NavLink to="/user" end>Queues</NavLink>
          <NavLink to="/admin">Staff</NavLink>
        </nav>
      </header>

      <main className="page-container">
        <Outlet />
      </main>
    </div>
  );
}
