import React, { useState } from 'react';
import DownvoteButton from './DownvoteButton';
import UpvoteButton from './UpvoteButton';

const VoteControl = () => {
  // For voting
  const [upvotes, setUpvotes] = useState(0);
  const [downvotes, setDownvotes] = useState(0);
  const [voteType, setVoteType] = useState(null);

  const handleVote = (type) => {
    if (voteType === type) {
      setVoteType(null);
    } else {
      setVoteType(type);
    }
  };
  const handleUpvote = () => {
    setUpvotes((prevUpvotes) => prevUpvotes + 1);
    setDownvotes((prevDownvotes) => prevDownvotes - 1);
    handleVote("upvote");
  };

  const handleDownvote = () => {
    setDownvotes((prevDownvotes) => prevDownvotes + 1);
    setUpvotes((prevUpvotes) => prevUpvotes - 1);
    handleVote("downvote");
  };
  return (
    <>
      <UpvoteButton
        upvotes={upvotes}
        downvotes={downvotes}
        voteType={voteType}
        onUpvote={handleUpvote}
      />
      <DownvoteButton
        upvotes={upvotes}
        downvotes={downvotes}
        voteType={voteType}
        onDownvote={handleDownvote}
      />
    </>
  )
}

export default VoteControl