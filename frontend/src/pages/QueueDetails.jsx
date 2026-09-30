import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function QueueDetails() {
  const { queueId } = useParams();
  const navigate = useNavigate();
  const [queue, setQueue] = useState(null);
  const [joinedToken, setJoinedToken] = useState(null);

  useEffect(() => {
    const getQueue = async() =>{
      try {
        const response = await fetch(`http://localhost:3000/queues/${queueId}`);
        const data = await response.json();
        setQueue(data);
      } catch (error) {
        console.error(error);
      }
    };
    getQueue();
  }, [queueId]);

  if (!queue) {
    return (
      <div className="empty-state">
        <h2>Queue data will appear here</h2>
        <p className="muted">Connect GET /queues/:queueid to load this queue.</p>
        <button className="primary-btn" onClick={() => navigate("/user")}>
          Back
        </button>
      </div>
    );
  }

  const joinQueue = async () => {
    try {
      const response = await fetch(`http://localhost:3000/queues/${queueId}/join` , {method: "POST"});
      const data = await response.json();
      setQueue(data);
      setJoinedToken(data.token);
    } catch (error) {
      console.error(error);
    }
  };

  const leaveQueue = async () => {
    try {
      const response = await fetch(`http://localhost:3000/queues/${queueId}/tokens/${joinedToken}`, {method : "DELETE"});
      const data = await response.json();
      setQueue(data);
      setJoinedToken(null);
    } catch (error) {
      console.error(error);
    }
  };

  const waiting = queue?.waiting ?? [];
  const position = joinedToken === null ? null : waiting.indexOf(joinedToken) + 1;
  const peopleAhead = position === null ? null : position - 1;

  return (
    <section>
      <button className="back-btn" onClick={() => navigate("/user")}>
        ← Back to queues
      </button>

      <div className="detail-header">
        <div>
          <span className="eyebrow">QUEUE DETAILS</span>
          <h1>{queue.queue_name}</h1>
          <p className="muted">Real-time queue information</p>
        </div>
        <span className="live-pill large"><i /> Live</span>
      </div>

      <div className="detail-grid">
        <div className="main-panel">
          <div className="current-token-box">
            <span>NOW SERVING</span>
            <strong>#{queue.current_token}</strong>
            <p>Please wait for your token to be called.</p>
          </div>

          <div className="queue-info-grid">
            <div className="info-box">
              <span>Waiting</span>
              <strong>{queue.waiting.length}</strong>
              <small>people in queue</small>
            </div>
            <div className="info-box">
              <span>Next token</span>
              <strong>{queue.waiting[0] ? `#${queue.waiting[0]}` : "—"}</strong>
              <small>first in line</small>
            </div>
          </div>
        </div>

        <aside className="action-panel">
          {joinedToken === null ? (
            <>
              <span className="eyebrow">YOUR TURN</span>
              <h2>Ready to join?</h2>
              <p className="muted">
                Get a token instantly and track your place in the queue.
              </p>
              <button className="primary-btn full" onClick={joinQueue}>
                Join Queue
              </button>
            </>
          ) : (
            <>
              <span className="eyebrow">YOUR TOKEN</span>
              <div className="my-token">#{joinedToken}</div>

              <div className="mini-status">
                <div><span>Position</span><strong>{position}</strong></div>
                <div><span>People ahead</span><strong>{peopleAhead}</strong></div>
              </div>

              <button
                className="primary-btn full"
                onClick={() => navigate(`/user/status/${queue.id}/${joinedToken}`)}
              >
                Track My Token
              </button>
              <button className="danger-btn full" onClick={leaveQueue}>
                Leave Queue
              </button>
            </>
          )}
        </aside>
      </div>
    </section>
  );
}
