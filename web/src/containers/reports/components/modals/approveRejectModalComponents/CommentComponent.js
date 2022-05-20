import React, { useState } from 'react';
import { Avatar, Comment } from 'antd';
import moment from 'moment';
import AddComment from './AddComment';
import Moment from '../../../../../UILibrary/helpers/Moment';

function CommentComponent({
    comments = [],
    approvalStatus,
    saveComment,
    commentValue,
    commentsVisibility,
    addCommentVisibility
}) {
    // const [approvedComment, setApprovedComment] = useState({});
    const [removedComment, setIsRemoved] = useState(false);

    if (approvalStatus === 'Approved' && !removedComment) {
        // setApprovedComment(comments.pop());
        setIsRemoved(true);
    }

    return commentsVisibility ? (
        [
            <div className="comment-container">
                {(comments || addCommentVisibility) && <h3 className="header">Comments</h3>}
                {commentsVisibility ? (
                    <div className="comment-list">
                        {comments &&
                            comments.length > 0 &&
                            comments.map(comment => (
                                <div>
                                    <Comment
                                        key={comment.commentId}
                                        author={renderCommentAuthor(comment)}
                                        content={<p>{comment.content ? comment.content : ''}</p>}
                                        avatar={
                                            <Avatar
                                                size={32}
                                                style={{ backgroundColor: '#1899cc' }}
                                                src={
                                                    (comment.userProfilePic || '').includes('/profile.png')
                                                        ? null
                                                        : comment.userProfilePic
                                                }
                                            >
                                                {comment.name.charAt(0).toUpperCase()}
                                            </Avatar>
                                        }
                                        datetime={
                                            <span>
                                                {moment(Moment.format(comment.updatedAt)).format('Do MMM YYYY')}
                                            </span>
                                        }
                                    />
                                </div>
                            ))}

                        {addCommentVisibility ? (
                            <AddComment commentValue={commentValue} saveComment={saveComment} />
                        ) : (
                            <></>
                        )}
                    </div>
                ) : (
                    <></>
                )}
            </div>
        ]
    ) : (
        <></>
    );
}

const renderCommentAuthor = comment => {
    if (comment.action === 'A') {
        return <span className="approved-text">{comment.name} - Approved</span>;
    } else if (comment.action === 'R') {
        return <span className="rejected-text">{comment.name} - Rejected</span>;
    }
    return comment.name;
};

export default CommentComponent;
