import React from 'react';
import { Modal, Row, Col, Table, Avatar, Spin, Button, Typography } from 'antd';

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
                {item.date ? <p className="date">{item.date}</p> : null}
            </Col>
        </Row>
    );
};

const pendingColumns = [
    {
        title: 'Corporate trustee company name',
        dataIndex: 'user',
        key: 'user'
    }
];

const pendingColumns2 = [
    {
        title: 'Corporate trustee company name',
        dataIndex: 'user',
        key: 'user'
    }
];

const TrusteeListModal = ({ close, show, userData, isLoadingData, title, type = true }) => {
    // TODO: Should ask from Backend to get userId for key value

    //Temp Dummy Data
    const dataSource = [
        {
            key: '1',
            firstName: 'Mike',
            lastName: '55'
        },
        {
            key: '2',
            firstName: 'bn',
            lastName: '4'
        }
    ];

    const data = dataSource.map((item, index) => ({
        key: index,
        user: <UserRow {...item} />
    }));

    return (
        <Modal
            width={500}
            title={<Typography.Text className="header-title">Approved</Typography.Text>}
            visible={show}
            footer={null}
            maskClosable={false}
            className="lgim-styles-wrapper preview-comments-modal aprove-model"
            onCancel={close}
        >
            <div className="create-scheme-modal-wrapper clearfix  aprove-model">
                <Row>
                    <Col lg={24}>
                        {isLoadingData ? (
                            <div className="loading-container">
                                <Spin />
                            </div>
                        ) : (
                            <div className="comments-table">
                                <Table pagination={false} dataSource={data} columns={pendingColumns} />
                                {type && <Table pagination={false} dataSource={data} columns={pendingColumns2} />}
                            </div>
                        )}
                    </Col>
                </Row>
                <div className="btn-footer-row">
                    <Button className="btn-container-footer" onClick={close}>
                        Close
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

TrusteeListModal.defaultProps = {
    commentsData: []
};

export default TrusteeListModal;
