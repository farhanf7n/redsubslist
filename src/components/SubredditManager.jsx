import { useState } from "react";
import AddSubBtn from "./AddSubBtn";
import SubsLane from "./SubsLane";

export default function SubredditManager() {
  const [subreddits, setSubreddits] = useState([]);

  const addSubreddit = (newSubreddit) => {
    setSubreddits((prevSubreddits) => [...prevSubreddits, newSubreddit]);
  };

  return (
    <div className="flex gap-2">
      {subreddits.map((subreddit) => (
        <SubsLane key={subreddit} subreddit={subreddit} />
      ))}
      <AddSubBtn onAddSubreddit={addSubreddit} />
    </div>
  );
}
