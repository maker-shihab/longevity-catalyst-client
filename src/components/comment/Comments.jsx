/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { BiDownvote, BiUpvote } from 'react-icons/bi';
import { MdOutlineAddComment } from 'react-icons/md';
import { RiShareForwardFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import UserProfileImage from "../../assets/images/user-4.png";
import AddReplay from './AddReplay';
import Replay from './Replay';

const Comments = ({ data }) => {

    const replayDataDami = [
        {
            "id": 1,
            "name": "John Doe",
            "email": "john@example.com",
            "replay": "This is the first comment."
        },
        {
            "id": 2,
            "name": "Jane Smith",
            "email": "jane@example.com",
            "replay": "Nice work!"
        },
        {
            "id": 3,
            "name": "Alice Johnson",
            "email": "alice@example.com",
            "replay": "I agree with this."
        },
        {
            "id": 4,
            "name": "Bob Brown",
            "email": "bob@example.com",
            "replay": "Great job!"
        },
        {
            "id": 5,
            "name": "Eve Davis",
            "email": "eve@example.com",
            "replay": "Keep it up."
        },
        {
            "id": 6,
            "name": "Charlie Wilson",
            "email": "charlie@example.com",
            "replay": "Well done."
        },
        {
            "id": 7,
            "name": "Grace Lee",
            "email": "grace@example.com",
            "replay": "Impressive."
        },
        {
            "id": 8,
            "name": "David Martin",
            "email": "david@example.com",
            "replay": "I like it."
        },
        {
            "id": 9,
            "name": "Olivia Garcia",
            "email": "olivia@example.com",
            "replay": "Good job!"
        },
        {
            "id": 10,
            "name": "William Rodriguez",
            "email": "william@example.com",
            "replay": "Awesome!"
        }
    ];

    const initialDisplayCount = 3;
    const increment = 2;
    const [replayData, setReplayData] = useState([]);
    const [moreCount, setMoreCount] = useState(0);



    useEffect(() => {
        // const sortedComments = commentDataDami.sort((a, b) => b.id - a.id);// Sort the comments in descending order by their ID
        setReplayData(replayDataDami.slice(0, initialDisplayCount));
        setMoreCount(replayDataDami.length - initialDisplayCount);
    }, []);

    const handleShowReplay = () => {
        const currentDisplayCount = replayData.length;
        setReplayData(replayDataDami.slice(0, currentDisplayCount + increment));
        setMoreCount(moreCount - increment);
    };

    // add comment work 
    // Function to add a new comment
    const [lastRepalyCount, setLastCommentCount] = useState(replayDataDami.length);
    const addNewReplay = (formDataObject) => {
        console.log(formDataObject);
        const newReplayId = lastRepalyCount + 1;
        setLastCommentCount(newReplayId);
        const newReplay = {
            id: newReplayId,
            name: "New User",
            email: "new@example.com",
            replay: formDataObject.replayText,
        };
        // Add the new comment to the beginning of the array
        setReplayData([newReplay, ...replayData]);
        setOpenCmnt(true);
        setIsAddReplay(false);
    };


    const [isOpenCmnt, setOpenCmnt] = useState(false);
    const openReplyHandel = () => {
        setOpenCmnt(!isOpenCmnt);
    }
    const [isAddReplay,setIsAddReplay] = useState(false);
    const openReplayBoxHandeler = () =>{
        setIsAddReplay(!isAddReplay);
        setOpenCmnt(true);
    }
    return (
        <>
            <div className="comment_card">
                {/* card head  */}
                <div className="comment_card_head">
                    <div className="commenter_info">
                        <Link to="/user/username">
                            <img className='user_thum_style' src={UserProfileImage} alt="userImage" />
                        </Link>
                        <div className="post_user_fet">
                            <Link to="/user/Esther Howard" className="user_name">{data.name}</Link>
                        </div>
                        <span className="comment_time">5 hr. ago</span>
                    </div>
                </div>
                {/* card body  */}
                <div className="comment_card_body">
                    <p>{data.comment}</p>

                </div>
                {/* card footer  */}
                <div className="comment_card_footer">
                    <div className="devide_buttons_wraper">
                        <div className="comment_box_buttons">
                            <button onClick={openReplyHandel} className="box_open_close_icon"> {isOpenCmnt ? '-' : '+'}  </button>
                            <div className="post_arrow">
                                <button type="button">
                                    <BiUpvote />
                                </button>
                                <span className="comment_vote_count">2.5K</span>
                                <button>
                                    <BiDownvote />
                                </button>
                            </div>
                            <button className="project_effective_button replay_btn" onClick={openReplayBoxHandeler}>
                                <MdOutlineAddComment /> <span>Replay</span>
                            </button>
                            <button className="project_effective_button">
                                <RiShareForwardFill /> Share
                            </button>
                        </div>
                    </div>
                    {
                        isAddReplay &&   <AddReplay addNewReplay={addNewReplay} openReplayBoxHandele={openReplayBoxHandeler}/>
                    }
                  
                    {/* show reply of this comment  */}
                    {
                        isOpenCmnt && <> {
                            replayData.length !== 0 ? (
                                replayData.map((singleData) => (<Replay key={singleData.id} data={singleData} addNewReplay={addNewReplay} />))
                            ) : (
                                <> No Replay yet ..</>
                            )
                        }
                        </>
                    }

                    {/* show reply of this comment  */}
                  
                </div>
                {isOpenCmnt &&
                    moreCount >= 0 && (
                        <div className="devide_buttons_wraper">
                        <div className="comment_box_buttons">
                            <button onClick={handleShowReplay} className='show_more_button' >
                                <span className='box_open_close_icon'> + </span>
                                <span >{moreCount} more replies</span>
                            </button>
                        </div>
                    </div>
                    )
                }
            </div>
        </>
    );
};

export default Comments;