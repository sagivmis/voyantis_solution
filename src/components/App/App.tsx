import { useEffect, useState } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";
import "./App.css";
import { type QueueSummary } from "../../util";
import Queues from "../Queues";
import SelectedQueue from "../Queues/SelectedQueue/SelectedQueue";

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
        <Queues
          queues={queues}
          selectedQueue={selectedQueue}
          setQueue={setSelectedQueue}
        />
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
