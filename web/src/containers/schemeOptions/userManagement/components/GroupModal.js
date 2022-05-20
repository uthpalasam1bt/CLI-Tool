import React from 'react';
import { Modal, Row, Col, Typography } from 'antd';

const { Paragraph } = Typography;

const GroupModal = props => {
    const { groups, handleShow, show } = props;

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
                            <h4 className="title">Groups</h4>
                            <Paragraph className="permission-wrap">
                                <ul>
                                    {groups.map((group, index) => {
                                        return <li key={index}>{group}</li>;
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

export default GroupModal;
