import axios from 'axios';
import React, { useState } from 'react';
import { AiOutlineLike } from 'react-icons/ai';

const LikeButton = ({item, type}) => {
  const [likes, setLikes] = useState(item.likes);

  const handaleLike = async () => {
    try {
      const response = await axios.post(`/api/like/${type}/${item._id}`);
      if(response.data.success){
        setLikes(likes + 1);
      }
    } catch (error) {
      console.log(error);
    }
  } 
  return (
    <button onClick={handaleLike}>
       <AiOutlineLike /> Like
    </button>
  )
}

export default LikeButton