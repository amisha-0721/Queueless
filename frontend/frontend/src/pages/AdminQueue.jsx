import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function AdminQueue() {
  const { queueId } = useParams();
  const navigate = useNavigate();
  const [queue, setQueue] = useState(null);

  useEffect(() => {
    // TODO: connect this to GET /queues/:queueid
    // setQueue(responseData);
  }, [queueId]);

  const callNext = async () => {
    // TODO: connect this to POST /queues/:queueid/next
    // setQueue(updatedQueue);
  };

  const skipToken = async (token) => {
    // TODO: connect this to DELETE /queues/:queueid/tokens/:token/skip
    // setQueue(updatedQueue);
  };

  if (!queue) {
    return (
      <div className="empty-state">
        <h2>Queue management</h2>
        <p className="muted">Connect the queue API to load this queue.</p>
        <button className="primary-btn" onClick={() => navigate("/admin")}>Back</button>
      </div>
    );
  }

  return (
    <section>
      <button className="back-btn" onClick={() => navigate("/admin")}>← Dashboard</button>

      <div className="admin-heading">
        <div>
          <span className="eyebrow">MANAGE QUEUE</span>
          <h1>{queue.queue_name}</h1>
          <p className="muted">Staff controls and waiting list</p>
        </div>
        <span className="live-pill large"><i /> Live</span>
      </div>

      <div className="admin-control-grid">
        <div className="current-admin-card">
          <span>NOW SERVING</span>
          <strong>#{queue.current_token}</strong>
          <small>Current token</small>
        </div>

        <div className="control-card">
          <div>
            <span className="eyebrow">NEXT ACTION</span>
            <h2>Call the next person</h2>
            <p className="muted">
              {queue.waiting.length
                ? `Token #${queue.waiting[0]} is next.`
                : "No one is currently waiting."}
            </p>
          </div>
          <button
            className="primary-btn"
            disabled={!queue.waiting.length}
            onClick={callNext}
          >
            Call Next →
          </button>
        </div>
      </div>

      <div className="section-heading">
        <div>
          <span className="eyebrow">WAITING LIST</span>
          <h2>{queue.waiting.length} people waiting</h2>
        </div>
      </div>

      {queue.waiting.length === 0 ? (
        <div className="empty-state compact">
          <div className="empty-icon">✓</div>
          <h3>Queue is clear</h3>
          <p>No customers are waiting right now.</p>
        </div>
      ) : (
        <div className="waiting-list">
          {queue.waiting.map((token, index) => (
            <div className="waiting-row" key={token}>
              <div className="position-number">{index + 1}</div>
              <div className="token-label">
                <strong>Token #{token}</strong>
                <span>{index === 0 ? "Next to be served" : `${index} ${index === 1 ? "person" : "people"} ahead`}</span>
              </div>
              <button className="skip-btn" onClick={() => skipToken(token)}>
                Skip
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
