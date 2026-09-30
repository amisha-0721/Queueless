import { useNavigate } from "react-router-dom";

export default function QueueCard({ queue }) {
  const navigate = useNavigate();

  return (
    <article className="queue-card">
      <div className="queue-card-top">
        <div className="queue-icon">{queue.queue_name.charAt(0)}</div>
        <span className="live-pill"><i /> Live</span>
      </div>

      <h3>{queue.queue_name}</h3>
      <p className="muted">People currently waiting</p>

      <div className="queue-stats">
        <div>
          <span>Now serving</span>
          <strong>#{queue.current_token}</strong>
        </div>
        <div>
          <span>Waiting</span>
          <strong>{queue.waiting?.length ?? 0}</strong>
        </div>
      </div>

      <button
        className="primary-btn full"
        onClick={() => navigate(`/user/queue/${queue.id}`)}
      >
        View Queue
      </button>
    </article>
  );
}
