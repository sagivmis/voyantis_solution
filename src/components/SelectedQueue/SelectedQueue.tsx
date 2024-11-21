import axios, { AxiosError, AxiosResponse } from "axios";
import { Dispatch, SetStateAction } from "react";
import "./selected-queue.css";

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
    <div className="selected-queue-details">
      {selectedQueue && (
        <>
          {" "}
          <h2 className="selected-queue-label">
            Selected Queue:{" "}
            <span className="selected-queue-name">{selectedQueue}</span>
          </h2>
          <button onClick={handleGoClick} className="go-btn">
            Go
          </button>
          {message && (
            <div className="queue-message">
              <h3>Message:</h3>
              <p>{message}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SelectedQueue;
