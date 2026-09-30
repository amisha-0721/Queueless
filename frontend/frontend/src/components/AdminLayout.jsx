import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function AdminLayout() {
  const navigate = useNavigate();

  return (
    <div className="app-shell admin-shell">
      <header className="topbar">
        <div className="brand" onClick={() => navigate("/admin")}>
          <span className="brand-mark">Q</span>
          <span>QueueLess <small>STAFF</small></span>
        </div>

        <nav className="nav-links">
          <NavLink to="/admin" end>Dashboard</NavLink>
          <NavLink to="/user">User View</NavLink>
        </nav>
      </header>

      <main className="page-container">
        <Outlet />
      </main>
    </div>
  );
}
