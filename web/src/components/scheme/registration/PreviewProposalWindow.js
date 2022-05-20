import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Comment, Avatar, Spin, Row, Col } from 'antd';

import { lowerCase } from 'lodash';
import moment from 'moment';

import Moment from '../../../helpers/Moment';
import ProfileImage from '../../../components/profileimage/index';
import PDFViewer from './PDFViewer';
import PreviewComments from '../../modals/PreviewComments';
import PendingUserList from '../../modals/PendingUserList';

import { PROPOSAL_STATUS } from '../../../constants/formConstants';

export const ApprovalStatusBox = ({ count, status, onClick, action }) => (
    <div
        onClick={() => (count > 0 ? onClick(action) : null)}
        className={`status-box clickable-box ${lowerCase(status)}-box`}
    >
        <p className="title">{status}</p>
        <p className="count">{count}</p>
    </div>
);

const PendingStatusBox = ({ icon }) => (
    <div className="status-box pending-box">
        <p className="title">{icon && <i className="fa fa-clock-o">&nbsp;</i>}Pending approval</p>
    </div>
);

const ApprovedCommentBox = ({ comment, date, user }) => (
    <Row type="flex" justify="start" className="approve-box-container approved-box">
        <Col>
            <p className="avatar">
                {/* <Avatar size="large" icon="user" /> */}
                <Avatar size={'large'} style={{ backgroundColor: '#1899cc' }}>
                    {user.charAt(0).toUpperCase()}
                </Avatar>
            </p>
        </Col>
        <Col className="approve-user">
            <Row>
                <Col>
                    <span className="name">{user} - Approved</span>
                    <span className="date">{moment(Moment.format(date)).format('Do MMM YYYY')}</span>
                </Col>
            </Row>
            <Row>
                <p className="comment">{comment}</p>
            </Row>
        </Col>
    </Row>
);

const LoadingContainer = () => (
    <div className="loading-container">
        <Spin />
    </div>
);

class PreviewProposalWindow extends Component {
    static propTypes = {
        data: PropTypes.shape({
            pending: PropTypes.number,
            rejected: PropTypes.number,
            approved: PropTypes.number,
            documentURL: PropTypes.string,
            comments: PropTypes.array
        }),
        isDataLoading: PropTypes.bool,
        isLoadingCommentsByStatus: PropTypes.bool,
        commentsByStatusData: PropTypes.array,
        renderCommentForm: PropTypes.func
    };

    state = {
        isShowPreviewComments: false,
        isShowPendingUserList: false,
        commentModalStatus: ''
    };

    handleShowPreviewCommentsModal(status) {
        this.setState({
            isShowPreviewComments: status
        });
    }

    handleShowPendingUserListModal(status) {
        this.setState({
            isShowPendingUserList: status
        });
    }

    showCommentList = status => {
        this.handleShowPreviewCommentsModal(true);
        this.setState({ commentModalStatus: status });
        this.props.fetchCommentsByStatus && this.props.fetchCommentsByStatus(status);
    };

    showPendingUserList = () => {
        this.handleShowPendingUserListModal(true);
    };

    renderPDFViewer = url => {
        const { isLoadingProposalDoc } = this.props;
        if (isLoadingProposalDoc) {
            return <LoadingContainer />;
        }
        return <PDFViewer documentURL={url} />;
    };

    renderDocumentsList = docList => {
        return (
            <div className="doc-list-container">
                {docList.map(docItem => {
                    return (
                        <div className="doc-list-item">
                            <div>{docItem.name}</div>
                            <div>
                                <a href={docItem.url} target="new">
                                    Download link
                                </a>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    renderClientApprovalStatus = data => {
        const { stepComplete } = this.props;

        return (
            <>
                <ApprovalStatusBox
                    onClick={this.showCommentList}
                    action={PROPOSAL_STATUS.APPROVED}
                    status="Approved"
                    count={data.approved}
                />

                <ApprovalStatusBox
                    onClick={this.showCommentList}
                    action={PROPOSAL_STATUS.REJECTED}
                    status="Rejected"
                    count={data.rejected}
                />

                <ApprovalStatusBox
                    onClick={
                        stepComplete
                            ? () => {
                                  // console.log('drop event');
                              }
                            : this.showPendingUserList
                    }
                    action={PROPOSAL_STATUS.PENDING}
                    status="Pending"
                    count={stepComplete ? 0 : data.pending}
                />
            </>
        );
    };

    renderApprovalStatusStatus = approvalStatus => {
        const { data } = this.props;
        if (approvalStatus === PROPOSAL_STATUS.APPROVED) {
            if (data.comments.length === 0) return null;
            const lastComment = data.comments[data.comments.length - 1];
            const approveDetails = {
                comment: lastComment.content,
                date: lastComment.createdDateTime,
                user: lastComment.name
            };
            return <ApprovedCommentBox {...approveDetails} />;
        }
        return <PendingStatusBox icon />;
    };

    renderCommentAuthor = comment => {
        if (comment.action === 'A') {
            return <span className="approved-text">{comment.name} - Approved</span>;
        } else if (comment.action === 'R') {
            return <span className="rejected-text">{comment.name} - Rejected</span>;
        }
        return comment.name;
    };

    handleRenderDocumentViewer() {
        const { data, signedDocumentURL } = this.props;
        if (signedDocumentURL) return this.renderPDFViewer(signedDocumentURL);
        else if (data.documents) return this.renderDocumentsList(data.documents);
        else return <LoadingContainer />;
    }

    render() {
        const {
            data,
            isDataLoading,
            renderCommentForm,
            commentsByStatusData,
            isLoadingCommentsByStatus,
            reviewersList,
            reviewStatusCount,
            component,
            stepComplete
        } = this.props;
        const { isShowPreviewComments, commentModalStatus, isShowPendingUserList } = this.state;
        if (isDataLoading) {
            return <LoadingContainer />;
        }

        return (
            <>
                <div className="approval-wrap">
                    <div
                        className={
                            data.approvalStatus ? 'approval-status-container-single' : 'approval-status-container'
                        }
                    >
                        {data.approvalStatus
                            ? this.renderApprovalStatusStatus(data.approvalStatus)
                            : reviewStatusCount && this.renderClientApprovalStatus(reviewStatusCount)}
                    </div>
                    <div className="doc-preview-container">{component || this.handleRenderDocumentViewer()}</div>
                    <div className="comment-container">
                        <h3 className="header">Comments</h3>
                        <div className="comment-list">
                            {data.comments &&
                                data.comments.map(comment => (
                                    <Comment
                                        key={comment.id}
                                        author={this.renderCommentAuthor(comment)}
                                        content={<p>{comment.content}</p>}
                                        avatar={<ProfileImage imageUrl={comment.imageUrl || null} alt={comment.name} />}
                                        datetime={
                                            <span>
                                                {moment(Moment.format(comment.createdDateTime)).format('Do MMM YYYY')}
                                            </span>
                                        }
                                    />
                                ))}
                        </div>
                        {!stepComplete ? renderCommentForm() : null}
                    </div>
                </div>
                <PreviewComments
                    commentModalStatus={commentModalStatus}
                    isLoadingData={isLoadingCommentsByStatus}
                    commentsData={commentsByStatusData}
                    close={() => this.handleShowPreviewCommentsModal(false)}
                    show={isShowPreviewComments}
                    reviewersList={reviewersList}
                />
                <PendingUserList
                    commentsData={reviewersList}
                    close={() => this.handleShowPendingUserListModal(false)}
                    show={isShowPendingUserList}
                />
            </>
        );
    }
}

export default PreviewProposalWindow;
