import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="empty-state not-found-page">
      <span className="eyebrow">404</span>
      <h1>Page not found</h1>
      <p className="muted">The page you're looking for doesn't exist.</p>
      <button className="primary-btn" onClick={() => navigate("/user")}>
        Go to QueueLess
      </button>
    </div>
  );
}
