import React, { Dispatch, SetStateAction, useState } from "react";
import { QueueSummary } from "../../util";
import axios, { AxiosResponse, AxiosError } from "axios";

interface IQueues {
  selectedQueue: string;
  queues: QueueSummary[];
  setQueue: Dispatch<SetStateAction<string>>;
}

const Queues = (props: IQueues) => {
  const { queues, selectedQueue, setQueue } = props;

  const handleQueueSelect = (queue_name: string) => {
    setQueue(queue_name);
  };

  return (
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
  );
};

export default Queues;
