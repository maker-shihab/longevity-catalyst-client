import React from 'react'
import { AiOutlineLike } from 'react-icons/ai'
import { FaRegCommentDots, FaUserAlt } from 'react-icons/fa'
import { HiArrowNarrowRight } from 'react-icons/hi'
import { RiShareForwardFill } from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom'
import VoteControl from './VoteControl'

const SingleProject = ({ project }) => {



  const navigation = useNavigate();
  return (
    <>
      <div className="card" key={project.id}>
        {/* card header */}
        <div className="card_header">
          <div className="post_auth_info">
            <div className="profile_image">
              <button onClick={() => navigation(`/user/${project.author}`)}>
                <img src={project.profileImageUrl} alt="userProfile" />
              </button>
            </div>
            <div className="post_user_fet">
              <button onClick={() => navigation(`/user/${project.author}`)} className="user_name">
                {project.author}
              </button>
              <div className="post-features">
                <FaUserAlt /> Friends <span></span> 5 hours ago
              </div>
            </div>
          </div>
          <div className="post_arrow">
            <VoteControl />
          </div>
        </div>
        {/* card body */}
        <div className="card_body">
          <h4 className="card_title">{project.projectName}</h4>
          <p className="card_text">
            {project.projectDescription}
          </p>
          <Link to="single-project">
            Learn more <HiArrowNarrowRight />
          </Link>
        </div>
        {/* card footer */}
        <div className="card_footer">
          {/* project resource */}
          <div className="project_resourse">
            <button className="project_effective_button">
              <AiOutlineLike /> Like
            </button>
            <div className="project_reso_details">
              <div className="likded_users">
                <Link to="/">
                  <img src={project.profileImageUrl} alt={`userImage`} />
                </Link>
                <Link to="/">
                  <img src={project.profileImageUrl} alt={`userImage`} />
                </Link>
                <Link to="/">
                  <img src={project.profileImageUrl} alt={`userImage`} />
                </Link>
              </div>
              <p>and {project.likesCount} people liked this post.</p>
            </div>
            <button className="project_effective_button">
              <RiShareForwardFill /> Share
            </button>
          </div>
          {/* comment features */}
          <div className="project_comment_features">
            <button className="project_effective_button">
              <FaRegCommentDots /> Comment
            </button>
            <div className="post-features">
              <Link to="/">{project.commentsCount} Comments</Link> <span></span>
              <Link to="/">{project.sharesCount} Shares</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SingleProject