import { useEffect, useState } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";
import "./App.css";
import { type QueueSummary } from "../../util";
import Queues from "../Queues";
import SelectedQueue from "../SelectedQueue/SelectedQueue";

function App() {
  const [queues, setQueues] = useState<QueueSummary[]>([]);
  const [selectedQueue, setSelectedQueue] = useState<string>("");
  const [queueMessage, setQueueMessage] = useState<string | null>(null);

  useEffect(() => {
    // Fetch all queues and their message counts
    const timer = setInterval(() => {
      axios
        .get("http://localhost:5000/api/queues")
        .then((response: AxiosResponse) => {
          setQueues(response.data);
        })
        .catch((error: AxiosError) => {
          console.error("Error fetching queues:", error);
        });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="app">
      <header className="App-header">
        <h1>Message Queue Dashboard</h1>
        <Queues queues={queues} setQueue={setSelectedQueue} />
        <SelectedQueue
          message={queueMessage}
          selectedQueue={selectedQueue}
          setMessage={setQueueMessage}
        />
      </header>
    </div>
  );
}

export default App;
