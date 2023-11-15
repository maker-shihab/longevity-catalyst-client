import React from 'react';
import { Link } from 'react-router-dom';

const ShowLikes = ({ likes, likesUsers }) => {
  let lastThreeLikedUsers = likesUsers.slice(-3);

  if (likesUsers.length <= 3) {
    lastThreeLikedUsers = likesUsers;
  }

  return (
    <div className="project_reso_details">
      <div className="likded_users">
        {
          lastThreeLikedUsers.map((user, index) => (
            <Link to="/" key={index}>
              <img src={user.profileImageUrl} alt={`userImage`} />
            </Link>
          ))
        }
      </div>
      <p>and {likes} {likes === 1 ? "person" : "people"} liked this post.</p>
    </div>
  )
}

export default ShowLikes;