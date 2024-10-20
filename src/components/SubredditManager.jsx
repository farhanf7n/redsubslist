import { useState } from "react";
import AddSubBtn from "./AddSubBtn";
import SubsLane from "./SubsLane";

export default function SubredditManager() {
  const [subreddits, setSubreddits] = useState([]);

  const addSubreddit = (newSubreddit) => {
    setSubreddits((prevSubreddits) => [...prevSubreddits, newSubreddit]);
  };

  const deleteSubreddit = (subredditToDelete) => {
    console.log("Deleting subreddit:", subredditToDelete);
    setSubreddits((prevSubreddits) =>
      prevSubreddits.filter((subreddit) => subreddit !== subredditToDelete)
    );
  };

  return (
    <div className="flex flex-wrap">
      <AddSubBtn onAddSubreddit={addSubreddit} />
      {subreddits.map((subreddit) => (
        <SubsLane
          key={subreddit}
          subreddit={subreddit}
          onDelete={() => deleteSubreddit(subreddit)}
        />
      ))}
    </div>
  );
}
