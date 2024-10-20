import { useState, useEffect } from "react";
import SubItem from "./SubItem";

export default function SubsLane({ subreddit, onDelete }) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, [subreddit]);

  const fetchPosts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://www.reddit.com/r/${subreddit}/hot.json?limit=15`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data = await response.json();
      const fetchedPosts = data.data.children.map((child) => ({
        id: child.data.id,
        title: child.data.title,
        author: child.data.author,
        score: child.data.score,
        num_comments: child.data.num_comments,
        url: child.data.url,
      }));
      setPosts(fetchedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("Failed to fetch posts. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = () => {
    console.log("Delete button clicked for subreddit:", subreddit);
    if (typeof onDelete === "function") {
      onDelete();
    } else {
      console.error("onDelete is not a function");
    }
  };

  return (
    <>
      <div className="border-2 border-royal-purple flex-shrink-0 w-80 bg-card rounded-lg p-4 h-[calc(100vh-5rem)] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font- text-white">
            /r/<span className="text-orange">{subreddit}</span>{" "}
          </h2>
          <div className="flex space-x-2">
            {/* Refresh button */}
            <button
              className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-royal-purple hover:text-white h-8 rounded-md px-3 text-xs text-royal-purple bg-deep-slate"
              aria-label="Refresh posts"
              onClick={fetchPosts}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="16"
                height="16"
                color="#ffffff"
                fill="none"
              >
                <path
                  d="M20.5 5.5H9.5C5.78672 5.5 3 8.18503 3 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3.5 18.5H14.5C18.2133 18.5 21 15.815 21 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18.5 3C18.5 3 21 4.84122 21 5.50002C21 6.15882 18.5 8 18.5 8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5.49998 16C5.49998 16 3.00001 17.8412 3 18.5C2.99999 19.1588 5.5 21 5.5 21"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {/* Delete Row button */}
            <button
              className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-red-600 hover:text-white h-8 rounded-md px-3 text-royal-purple text-xs bg-deep-slate"
              onClick={handleDelete}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="16"
                height="16"
                color="#ffffff"
                fill="none"
              >
                <path
                  d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M9.5 16.5L9.5 10.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M14.5 16.5L14.5 10.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {isLoading ? (
            <p className="text-white">Loading posts...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            posts.map((post) => (
              <SubItem
                key={post.id}
                id={post.id}
                title={post.title}
                author={post.author}
                score={post.score}
                num_comments={post.num_comments}
                url={post.url}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}
