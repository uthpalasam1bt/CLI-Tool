import React from 'react';
import { Col, Modal, Row } from 'antd';


const InformationModal = props => {
    const { show, handleShow, content } = props;

    return (
        <Modal
            visible={show}
            maskClosable={false}
            onCancel={handleShow}
            footer={null}
            className="lgim-styles-wrapper input-flag-modal"
        >
            <div className="create-scheme-modal-wrapper">
                <Row>
                    <Col lg={24}>
                        <div className="title">
                            <i className="fa fa-exclamation-circle model-icon" aria-hidden="true"></i>
                            <h4 className="title-text">INFORMATION</h4>
                        </div>

                        <div className="input-flag-form">
                            <p className="content">
                                {content}
                            </p>
                            <div className="footer">
                                <button className="btn-grey-o regular btn-close" type="button" onClick={handleShow}>
                                    OK
                                </button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </Modal>
    );
};

export default InformationModal;
