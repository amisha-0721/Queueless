import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StatCard from "../components/StatCard";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [queues, setQueues] = useState([]);

  useEffect(() => {
    const getQueue = async() => {
      try {
        const response = await fetch("http://localhost:3000/queues");
        const data = await response.json();
        setQueues(data);
      } catch (error) {
        console.error(error);
      }
    }
    getQueue();
  }, []);

  const totalWaiting = queues.reduce(
    (sum, queue) => sum + (queue.waiting?.length ?? 0),
    0
  );

  return (
    <section>
      <div className="admin-heading">
        <div>
          <span className="eyebrow">STAFF PANEL</span>
          <h1>Queue Dashboard</h1>
          <p className="muted">Monitor and manage all active queues.</p>
        </div>
        <span className="live-pill large"><i /> System Live</span>
      </div>

      <div className="stats-grid">
        <StatCard label="Active queues" value={queues.length} icon="⌂" />
        <StatCard label="People waiting" value={totalWaiting} icon="↕" />
        <StatCard label="Queues live" value={queues.length} icon="●" />
      </div>

      <div className="section-heading">
        <div>
          <span className="eyebrow">ACTIVE QUEUES</span>
          <h2>Manage queues</h2>
        </div>
      </div>

      <div className="admin-queue-list">
        {queues.map(queue => (
          <button
            className="admin-queue-row"
            key={queue.id}
            onClick={() => navigate(`/admin/queue/${queue.id}`)}
          >
            <div className="queue-row-icon">{queue.queue_name.charAt(0)}</div>
            <div className="queue-row-main">
              <strong>{queue.queue_name}</strong>
              <span>Current token #{queue.current_token}</span>
            </div>
            <div className="queue-row-stat">
              <strong>{queue.waiting?.length ?? 0}</strong>
              <span>waiting</span>
            </div>
            <span className="arrow">→</span>
          </button>
        ))}
      </div>
    </section>
  );
}
