import React from "react";
import { BiSolidUpvote, BiUpvote } from "react-icons/bi";

const UpvoteButton = ({ upvotes, voteType, onUpvote }) => {
  const isUpvoted = voteType === "upvote";

  const handleUpvote = () => {
    onUpvote();
  };

  return (
    <button type="button" onClick={handleUpvote}>
      {isUpvoted ? (
        <>
          <BiSolidUpvote className="upvoted" />
        </>
      ) : (
        <BiUpvote />
      )}
      {upvotes}
    </button>
  );
};

export default UpvoteButton;
