import React from "react";
import { BiDownvote, BiSolidDownvote } from "react-icons/bi";

const DownvoteButton = ({ downvotes, voteType, onDownvote }) => {
  const isDownvoted = voteType === "downvote";

  const handleDownvote = () => {
    onDownvote();
  };

  return (
    <button type="button" onClick={handleDownvote}>
      {isDownvoted ? (
        <>
          <BiSolidDownvote className="downvoted" />
        </>
      ) : (
        <BiDownvote />
      )}
      {downvotes}
    </button>
  );
};

export default DownvoteButton;
