import React from 'react';
import { Modal, Row, Col, Table, Avatar, Spin } from 'antd';
import moment from 'moment';
import Moment from '../../../../../../../helpers/Moment';
import { STATES_PENDING } from '../../../../../../../config/constants';

const UserRow = item => {
    let profileImageAvaliable = item.imageUrl && item.imageUrl.indexOf('/profile.png') < 0 ? true : false;

    return (
        <Row type="flex" className="user-row">
            <Col className="user-avatar">
                <Avatar
                    size={42}
                    style={{ backgroundColor: '#1899cc' }}
                    src={profileImageAvaliable ? item.imageUrl : null}
                >
                    {item.firstName.charAt(0).toUpperCase()}
                </Avatar>
            </Col>
            <Col className="user-details">
                <p className="name">{`${item.firstName} ${item.lastName}`}</p>
                {item.status == STATES_PENDING ? null : (
                    <p className="date">{moment(Moment.format(item.date)).format('Do MMM YYYY')}</p>
                )}
            </Col>
        </Row>
    );
};

const pendingColumns = [
    {
        title: 'Name',
        dataIndex: 'user',
        key: 'user'
    }
];

const UserList = ({ close, show, userData, isLoadingData, title }) => {
    // TODO: Should ask from Backend to get userId for key value
    const data = userData.map((item, index) => ({
        key: index,
        user: <UserRow {...item} />
    }));

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
                        <h4 className="title">{title}</h4>
                        {isLoadingData ? (
                            <div className="loading-container">
                                <Spin />
                            </div>
                        ) : (
                            <div className="comments-table">
                                <Table pagination={false} dataSource={data} columns={pendingColumns} />
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

UserList.defaultProps = {
    commentsData: []
};

export default UserList;
