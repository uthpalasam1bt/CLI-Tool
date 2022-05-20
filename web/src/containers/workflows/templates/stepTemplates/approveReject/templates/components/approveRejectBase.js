import React, { useState } from 'react';
import { Comment } from 'antd';
import { lowerCase } from 'lodash';
import moment from 'moment';

import Moment from '../../../../../../../helpers/Moment';
import ProfileImage from '../../../../../../../components/profileimage';
import UserList from './userList';
import constants from '../../../../../constants';

const { STATUS_REJECTED, STATUS_APPROVED, STATUS_PENDING, CONTENT_POSITION_CENTER, CONTENT_POSITION_TOP } = constants;

const ApprovalStatusBox = ({ count, status, onClick, action }) => (
    <div
        onClick={() => (count > 0 ? onClick(action) : null)}
        className={`status-box clickable-box ${lowerCase(status)}-box`}
    >
        <p className="title">{status}</p>
        <p className="count">{count}</p>
    </div>
);

const ApproveRejectBase = props => {
    const {
        reviewStatusCount,
        renderComponent,
        comments,
        commentsSection,
        userList,
        contentPosition = CONTENT_POSITION_CENTER,
        hideComments = false,
        hideTitles = false
    } = props;

    const [isShowUserList, setIsShowUserList] = useState(false);
    const [userListFilterStatus, setUserListFilterStatus] = useState('');

    const handleShowUserListModal = isShow => {
        setIsShowUserList(isShow);
    };

    const showUserList = status => {
        handleShowUserListModal(true);
        setUserListFilterStatus(status);
    };

    const renderClientApprovalStatus = data => (
        <>
            <ApprovalStatusBox
                onClick={showUserList}
                action={STATUS_APPROVED}
                status="Approved"
                count={data.approved}
            />
            <ApprovalStatusBox
                onClick={showUserList}
                action={STATUS_REJECTED}
                status="Rejected"
                count={data.rejected}
            />
            <ApprovalStatusBox onClick={showUserList} action={STATUS_PENDING} status="Pending" count={data.pending} />
        </>
    );

    const renderCommentAuthor = comment => {
        if (comment.action === 'A') {
            return <span className="approved-text">{comment.name} - Approved</span>;
        } else if (comment.action === 'R') {
            return <span className="rejected-text">{comment.name} - Rejected</span>;
        }
        return comment.name;
    };

    return (
        <>
            <div className="approval-wrap">
                {contentPosition == CONTENT_POSITION_TOP && (
                    <div className="doc-preview-container">{renderComponent}</div>
                )}
                {!hideTitles ? (
                    <div className="approval-status-container">
                        {reviewStatusCount && renderClientApprovalStatus(reviewStatusCount)}
                    </div>
                ) : null}
                {contentPosition == CONTENT_POSITION_CENTER && (
                    <div className="doc-preview-container">{renderComponent}</div>
                )}
                {!hideComments ? (
                    <div className="comment-container">
                        <h3 className="header">Comments</h3>
                        <div className="comment-list">
                            {comments &&
                                comments.map(comment => (
                                    <Comment
                                        key={comment.commentId}
                                        author={renderCommentAuthor(comment)}
                                        content={<p>{comment.content}</p>}
                                        avatar={
                                            <ProfileImage
                                                imageUrl={comment.userProfilePic || null}
                                                alt={comment.name}
                                            />
                                        }
                                        datetime={
                                            <span>
                                                {moment(Moment.format(comment.createdDateTime)).format('Do MMM YYYY')}
                                            </span>
                                        }
                                    />
                                ))}
                        </div>
                        {commentsSection()}
                    </div>
                ) : null}
            </div>
            <UserList
                userData={
                    userListFilterStatus === STATUS_PENDING
                        ? userList.pendingUserList
                        : userListFilterStatus === STATUS_APPROVED
                        ? userList.approvedUserList
                        : userListFilterStatus === STATUS_REJECTED
                        ? userList.rejectedUserList
                        : []
                }
                close={() => handleShowUserListModal(false)}
                show={isShowUserList}
                title={
                    userListFilterStatus === STATUS_PENDING
                        ? 'Pending'
                        : userListFilterStatus === STATUS_APPROVED
                        ? 'Approved'
                        : userListFilterStatus === STATUS_REJECTED
                        ? 'Rejected'
                        : 'Unknown'
                }
            />
        </>
    );
};

export default ApproveRejectBase;
