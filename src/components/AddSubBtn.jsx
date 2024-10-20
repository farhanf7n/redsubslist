import { useState } from "react";
import Modal from "./Modal";
import Toast from "./Toast";

export default function AddSubBtn() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subredditInput, setSubredditInput] = useState("");
  const [toasts, setToasts] = useState([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const addToast = (reason, message) => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { id, reason, message }]);
  };

  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  const fetchSubredditData = async () => {
    try {
      const response = await fetch(
        `https://www.reddit.com/r/${subredditInput}.json`
      );
      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      if (data.error || !data.data || data.data.children.length === 0) {
        throw new Error(data.message || "Subreddit not found or has no posts");
      }

      // Success case
      addToast("Success", "Subreddit found");
    } catch (error) {
      console.error("Error fetching subreddit data:", error);
      addToast("Error", error.message || "Error fetching subreddit data");
    } finally {
      setSubredditInput("");
      closeModal();
    }
  };

  return (
    <>
      <button
        className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-royal-purple hover:text-white h-10 rounded-lg px-4 py-6 text-xs border-2 border-royal-purple text-royal-purple bg-deep-slate"
        aria-label="Add subscription"
        onClick={openModal}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          color="#ffffff"
          fill="none"
        >
          <path
            d="M14.236 5.29178C14.236 4.77191 14.236 4.51198 14.1789 4.29871C14.0238 3.71997 13.5717 3.26793 12.9931 3.11285C12.4315 2.96238 11.5684 2.96238 11.0068 3.11285C10.4281 3.26793 9.97609 3.71997 9.82101 4.29871C9.76387 4.51198 9.76387 4.77191 9.76387 5.29178C9.76387 6.34588 9.76387 9.109 9.43641 9.43647C9.10894 9.76393 6.34582 9.76393 5.29172 9.76393C4.77185 9.76393 4.51192 9.76393 4.29865 9.82107C3.71991 9.97615 3.26787 10.4282 3.11279 11.0069C2.96232 11.5685 2.96232 12.4315 3.11279 12.9931C3.26787 13.5718 3.71991 14.0239 4.29865 14.1789C4.51192 14.2361 4.77185 14.2361 5.29172 14.2361C6.34582 14.2361 9.10894 14.2361 9.43641 14.5635C9.76387 14.891 9.76387 15.418 9.76387 16.4721C9.76387 16.992 9.76387 19.4881 9.82101 19.7013C9.97609 20.28 10.4281 20.7321 11.0068 20.8871C11.5684 21.0376 12.4315 21.0376 12.9931 20.8871C13.5717 20.7321 14.0238 20.28 14.1789 19.7013C14.236 19.4881 14.236 16.992 14.236 16.4721C14.236 15.418 14.236 14.891 14.5635 14.5635C14.8909 14.2361 17.654 14.2361 18.7082 14.2361C19.228 14.2361 19.488 14.2361 19.7013 14.1789C20.28 14.0239 20.732 13.5718 20.8871 12.9931C21.0376 12.4315 21.0376 11.5685 20.8871 11.0069C20.732 10.4282 20.28 9.97615 19.7013 9.82107C19.488 9.76393 19.228 9.76393 18.7082 9.76393C17.654 9.76393 14.8909 9.76393 14.5635 9.43647C14.236 9.109 14.236 6.34588 14.236 5.29178Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <h2 className="text-2xl font-bold mb-4 text-white">
            Search for a subreddit
          </h2>
          <input
            type="text"
            placeholder="Enter subreddit name"
            className="w-full px-4 py-2 bg-charcoal-black border-2 border-deep-slate text-white rounded transition-all focus:border-orange-500 mb-4 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
            value={subredditInput}
            onChange={(e) => setSubredditInput(e.target.value)}
          />
          <button
            className="w-full px-4 py-2 bg-deep-slate text-white rounded transition-all hover:bg-purple-700"
            onClick={fetchSubredditData}
          >
            Submit
          </button>
        </Modal>
      )}

      <div className="fixed bottom-5 left-5 space-y-2">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            id={toast.id}
            reason={toast.reason}
            message={toast.message}
            onRemove={removeToast}
          />
        ))}
      </div>
    </>
  );
}
