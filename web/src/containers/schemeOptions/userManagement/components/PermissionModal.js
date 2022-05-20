import React from 'react';
import { Modal, Row, Col, Typography } from 'antd';
import _ from 'lodash';

const { Paragraph } = Typography;

const PermissionModal = props => {
    const { show, handleShow, data } = props;
    const sortedData = _.sortBy(data, 'title');
    return (
        <Modal
            visible={show}
            footer={
                <button className="btn-grey-o regular btn-close" type="button" onClick={() => handleShow(false)}>
                    Close
                </button>
            }
            maskClosable={false}
            className="lgim-styles-wrapper add-user-modal permission-modal"
            onCancel={() => handleShow(false)}
        >
            <div className="add-user-modal-wrapper">
                <Row>
                    <Col lg={24}>
                        <Typography>
                            <h4 className="title">Permissions</h4>
                            <Paragraph className="permission-wrap">
                                <ul>
                                    {sortedData.map(item => {
                                        return <li key={item.claimId}>{item.title}</li>;
                                    })}
                                </ul>
                            </Paragraph>
                        </Typography>
                    </Col>
                </Row>
            </div>
        </Modal>
    );
};

export default PermissionModal;
