import { useEffect, useState } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";
import "./App.css";

type QueueSummary = {
  queue_name: string;
  message_count: number;
};

function App() {
  const [queues, setQueues] = useState<QueueSummary[]>([]);
  const [selectedQueue, setSelectedQueue] = useState<string>("");
  const [queueMessage, setQueueMessage] = useState<string | null>(null);

  useEffect(() => {
    // Fetch all queues and their message counts
    axios
      .get("http://localhost:5000/api/queues")
      .then((response: AxiosResponse) => {
        setQueues(response.data);
      })
      .catch((error: AxiosError) => {
        console.error("Error fetching queues:", error);
      });
  }, []);

  const handleQueueSelect = (queue_name: string) => {
    setSelectedQueue(queue_name);
  };

  const handleGoClick = () => {
    if (selectedQueue) {
      axios
        .get(`http://localhost:5000/api/${selectedQueue}?timeout=5000`)
        .then((response: AxiosResponse) => {
          setQueueMessage(JSON.stringify(response.data));
        })
        .catch((error: AxiosError) => {
          if (error.response && error.response.status === 204) {
            setQueueMessage("No messages available");
          } else {
            console.error("Error fetching message:", error);
          }
        });
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Message Queue Dashboard</h1>
        <div className="queue-list">
          <h2>Available Queues</h2>
          <ul>
            {queues.map((queue) => (
              <li key={queue.queue_name}>
                <button onClick={() => handleQueueSelect(queue.queue_name)}>
                  {queue.queue_name} (Messages: {queue.message_count})
                </button>
              </li>
            ))}
          </ul>
        </div>
        {selectedQueue && (
          <div className="queue-details">
            <h2>Selected Queue: {selectedQueue}</h2>
            <button onClick={handleGoClick}>Go</button>
            {queueMessage && (
              <div className="queue-message">
                <h3>Message:</h3>
                <p>{queueMessage}</p>
              </div>
            )}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
