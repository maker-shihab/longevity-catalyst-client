/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import '../../assets/styles/comment.css';
import AddComment from './AddComment';
import Comments from './Comments';
import PinBox from './PinBox';

const CommentBox = () => {
    const commentDataDami = [
        {
            "id": 1,
            "name": "John Doe",
            "email": "john@example.com",
            "comment": "This is the first comment."
        },
        {
            "id": 2,
            "name": "Jane Smith",
            "email": "jane@example.com",
            "comment": "Nice work!"
        },
        {
            "id": 3,
            "name": "Alice Johnson",
            "email": "alice@example.com",
            "comment": "I agree with this."
        },
        {
            "id": 4,
            "name": "Bob Brown",
            "email": "bob@example.com",
            "comment": "Great job!"
        },
        {
            "id": 5,
            "name": "Eve Davis",
            "email": "eve@example.com",
            "comment": "Keep it up."
        },
        {
            "id": 6,
            "name": "Charlie Wilson",
            "email": "charlie@example.com",
            "comment": "Well done."
        },
        {
            "id": 7,
            "name": "Grace Lee",
            "email": "grace@example.com",
            "comment": "Impressive."
        },
        {
            "id": 8,
            "name": "David Martin",
            "email": "david@example.com",
            "comment": "I like it."
        },
        {
            "id": 9,
            "name": "Olivia Garcia",
            "email": "olivia@example.com",
            "comment": "Good job!"
        },
        {
            "id": 10,
            "name": "William Rodriguez",
            "email": "william@example.com",
            "comment": "Awesome!"
        }
    ];

    const initialDisplayCount = 3;
    const increment = 2;
    const [commentData, setCommentData] = useState([]);
    const [moreCount, setMoreCount] = useState(0);
   

    useEffect(() => {
        // const sortedComments = commentDataDami.sort((a, b) => b.id - a.id);// Sort the comments in descending order by their ID
        setCommentData(commentDataDami.slice(0, initialDisplayCount));
        setMoreCount(commentDataDami.length - initialDisplayCount);
    }, []);

    const handleShowMoreClick = () => {
        const currentDisplayCount = commentData.length;
        setCommentData(commentDataDami.slice(0, currentDisplayCount + increment));
        setMoreCount(moreCount - increment);
    };

    // add comment work 
    // Function to add a new comment
    const [lastCommentCount, setLastCommentCount] = useState(commentDataDami.length);
    const addNewComment = (formDataObject) => {
        console.log(formDataObject);
        const newCommentId = lastCommentCount + 1;
        setLastCommentCount(newCommentId);
        const newComment = {
            id: newCommentId,
            name: "New User",
            email: "new@example.com",
            comment: formDataObject.commentText,
        };
        // Add the new comment to the beginning of the array
        setCommentData([newComment, ...commentData]);
    };

 

    return (
        <>
            <div className="details_block commnet_add_box">
                <AddComment addNewComment={addNewComment}/>
            </div>
            <div className="details_block">
                <PinBox />
            </div>

            {
                commentData.length !== 0 ? (
                    commentData.map((singleComment) => (<Comments key={singleComment.id} data={singleComment} />))
                ) : (
                    <> No comment yet ..</>
                )
            }

            {moreCount >= 0 && (
                <div className="devide_buttons_wraper">
                    <div className="comment_box_buttons">
                        <button onClick={handleShowMoreClick} className='show_more_button' >
                            <span className='box_open_close_icon'> + </span>
                            <span >{moreCount} more Comments</span>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default CommentBox;
