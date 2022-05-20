import React from 'react';
import moment from 'moment';

import { Modal, Row, Col, Table, Avatar, Spin } from 'antd';

import { PROPOSAL_STATUS } from '../../constants/formConstants';
import Moment from '../../helpers/Moment';

const UserRow = item => {
    //should revisit this, user has a deault image, if user has default image then he has not uploaded an image
    let profileImageAvaliable = item.imageUrl && item.imageUrl.indexOf('/profile.png') < 0 ? true : false;
    return (
        <Row type="flex" className="user-row">
            <Col className="user-avatar">
                <Avatar
                    size={42}
                    style={{ backgroundColor: '#1899cc' }}
                    src={profileImageAvaliable ? item.imageUrl : null}
                >
                    {item.name.charAt(0).toUpperCase()}
                </Avatar>
            </Col>
            <Col className="user-details">
                <p className="name">{item.name}</p>
                <p className="date">{moment(Moment.format(item.createdDateTime)).format('Do MMM YYYY')}</p>
            </Col>
        </Row>
    );
};

const columns = [
    {
        title: 'Name',
        dataIndex: 'user',
        key: 'user',
        width: '50%'
    }
];

const PreviewComments = ({ close, show, commentModalStatus, commentsData, isLoadingData, reviewersList }) => {
    const mappedReviewers = [];
    let index = 0;
    reviewersList &&
        reviewersList.reduce((i, reviewer) => {
            if (reviewer.status == commentModalStatus) {
                const reviewerEmail = reviewer.userEmail ? reviewer.userEmail : reviewer.email;
                const user = commentsData && commentsData.find(comment => comment.email === reviewerEmail);

                if (user) {
                    mappedReviewers.push({
                        key: index++,
                        user: (
                            <UserRow
                                name={user.name}
                                createdDateTime={user.createdDateTime}
                                key={index}
                                imageUrl={user.imageUrl}
                            />
                        )
                    });
                }
            }
            return null;
        }, []);

    return (
        <Modal
            width="60%"
            visible={show}
            footer={null}
            maskClosable={false}
            className="lgim-styles-wrapper preview-comments-modal"
            onCancel={close}
        >
            <div className="create-scheme-modal-wrapper clearfix">
                <Row>
                    <Col lg={24}>
                        <h4 className="title">
                            {commentModalStatus === PROPOSAL_STATUS.APPROVED ? 'Approved' : 'Rejected'}
                        </h4>
                        {isLoadingData ? (
                            <div className="loading-container">
                                <Spin />
                            </div>
                        ) : (
                            <div className="comments-table">
                                <Table pagination={false} dataSource={mappedReviewers} columns={columns} />
                            </div>
                        )}
                    </Col>
                </Row>
                <div className="btn-container pull-right">
                    <button className="btn btn-blue tpip-btn-blue" onClick={close}>
                        Close
                    </button>
                </div>
            </div>
        </Modal>
    );
};

PreviewComments.defaultProps = {
    commentsData: []
};

export default PreviewComments;
