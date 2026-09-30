import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function TokenStatus() {
  const { queueId, token } = useParams();
  const navigate = useNavigate();
  const [queue, setQueue] = useState(null);
  const [statusData, setStatusData] = useState(null);

  useEffect(() => {
    // TODO: connect this to GET /queues/:queueid/status/:token
    // setStatusData(responseData);
    //
    // You can also fetch queue information with:
    // GET /queues/:queueid
  }, [queueId, token]);

  if (!queue) {
    return (
      <div className="empty-state">
        <h2>Token status</h2>
        <p className="muted">Connect the queue/status APIs to load live data.</p>
        <button className="primary-btn" onClick={() => navigate(`/user/queue/${queueId}`)}>
          Back to queue
        </button>
      </div>
    );
  }

  const isServing = statusData?.status === "serving";
  const isWaiting = statusData?.status === "waiting";
  const position = statusData?.position;
  const peopleAhead = statusData?.people_ahead;

  return (
    <section>
      <button className="back-btn" onClick={() => navigate(`/user/queue/${queue.id}`)}>
        ← Back to queue
      </button>

      <div className="status-page">
        <span className="eyebrow">TOKEN STATUS</span>
        <h1>#{token}</h1>
        <p className="muted">{queue.queue_name}</p>

        <div className={`status-badge ${isServing ? "serving" : isWaiting ? "waiting" : "not-found"}`}>
          <span className="status-dot" />
          {statusData?.status || "Loading"}
        </div>

        <div className="status-main">
          <div className="big-status-number">
            {isServing ? "It's your turn!" : isWaiting ? `#${queue.current_token}` : "—"}
            <span>
              {isServing
                ? "Please proceed to the counter."
                : isWaiting
                  ? "currently serving"
                  : "Your live queue status will appear here."}
            </span>
          </div>

          {isWaiting && (
            <div className="status-metrics">
              <div><span>Your position</span><strong>{position}</strong></div>
              <div><span>People ahead</span><strong>{peopleAhead}</strong></div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
