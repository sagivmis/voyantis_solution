import { Dispatch, SetStateAction } from "react";
import { QueueSummary } from "../../util";
import "./queues.css";

interface IQueues {
  queues: QueueSummary[];
  setQueue: Dispatch<SetStateAction<string>>;
}

const Queues = (props: IQueues) => {
  const { queues, setQueue } = props;

  const handleQueueSelect = (queue_name: string) => {
    setQueue(queue_name);
  };

  return (
    <div className="queue-list-container">
      <h2>Available Queues</h2>
      <ul className="queue-list">
        {queues.map((queue) => (
          <li key={queue.queue_name} className="queue-list-item">
            <button
              onClick={() => handleQueueSelect(queue.queue_name)}
              className="queue"
            >
              <span className="queue-name">{queue.queue_name}</span>{" "}
              <span className="queue-messages">
                Messages: {queue.message_count}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Queues;
