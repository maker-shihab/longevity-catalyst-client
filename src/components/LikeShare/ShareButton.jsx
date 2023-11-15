import React from 'react';
import { RiShareForwardFill } from 'react-icons/ri';

const ShareButton = ({item}) => {
  const handleShare = () => {
    alert(`Sharing post with ID: $`);
  }
  return (
    <button onClick={handleShare}>
        <RiShareForwardFill /> Share
    </button>
  )
}

export default ShareButton