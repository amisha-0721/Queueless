import { useEffect, useState } from "react";
import QueueCard from "../components/QueueCard";

export default function UserHome() {
  const [queues, setQueues] = useState([]);

  useEffect(() => {
    const getQueue = async() =>{
      try {
        const response = await fetch("http://localhost:3000/queues");
        const data = await response.json();
        setQueues(data);
      } catch (error) {
        console.error(error);
      }
    };
    getQueue();
    }, []);

  return (
    <section>
      <div className="hero">
        <div>
          <span className="eyebrow">SMART QUEUE MANAGEMENT</span>
          <h1>Skip the line.<br /><span>Keep your time.</span></h1>
          <p>
            Join a queue remotely, get your token, and know exactly where you
            stand before you arrive.
          </p>
        </div>

        <div className="hero-card">
          <div className="hero-number">
            {queues.reduce((sum, queue) => sum + (queue.waiting?.length ?? 0), 0)}
          </div>
          <span>people waiting<br />across active queues</span>
        </div>
      </div>

      <div className="section-heading">
        <div>
          <span className="eyebrow">AVAILABLE NOW</span>
          <h2>Choose a queue</h2>
        </div>
        <span className="live-text">● Live updates</span>
      </div>

      <div className="queue-grid">
        {queues.map(queue => <QueueCard key={queue.id} queue={queue} />)}
      </div>
    </section>
  );
}
