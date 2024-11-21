import axios, { AxiosError, AxiosResponse } from "axios";
import React, { Dispatch, SetStateAction } from "react";

interface ISelectedQueue {
  message: string | null;
  setMessage: Dispatch<SetStateAction<string | null>>;
  selectedQueue: string;
}

const SelectedQueue = (props: ISelectedQueue) => {
  const { message, selectedQueue, setMessage } = props;

  const handleGoClick = () => {
    if (selectedQueue) {
      axios
        .get(`http://localhost:5000/api/${selectedQueue}?timeout=5000`)
        .then((response: AxiosResponse) => {
          if (response.status === 204) throw new Error("No messages available");
          setMessage(JSON.stringify(response.data));
        })
        .catch((error: AxiosError) => {
          if (error.response && error.response.status === 204) {
            setMessage("No messages available");
          } else {
            console.error("Error fetching message:", error);
          }
        });
    }
  };

  return (
    selectedQueue && (
      <div className="queue-details">
        <h2>Selected Queue: {selectedQueue}</h2>
        <button onClick={handleGoClick}>Go</button>
        {message && (
          <div className="queue-message">
            <h3>Message:</h3>
            <p>{message}</p>
          </div>
        )}
      </div>
    )
  );
};

export default SelectedQueue;
