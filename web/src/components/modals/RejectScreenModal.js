import React, { Component } from 'react';
import { Modal, Row, Col } from 'antd';

import RIPRejectCommentForm from '../../containers/schemeOptions/registration/forms/RIPRejectCommentForm';

class RejectScreenModal extends Component {
    state = {};
    constructor(props) {
        super(props);
        this.handleShow = this.handleShow.bind(this);
    }

    handleShow() {
        this.props.close();
    }

    render() {
        const { show, handleSubmit, isSubmitInProgress } = this.props;

        return (
            <Modal
                visible={show}
                footer={null}
                maskClosable={false}
                className="lgim-styles-wrapper rip-proposal-modal"
                onCancel={this.handleShow}
            >
                <div className="create-scheme-modal-wrapper">
                    <Row>
                        <Col lg={24}>
                            <h4 className="title">Reject</h4>
                            <RIPRejectCommentForm
                                isSubmitInProgress={isSubmitInProgress}
                                handleReject={handleSubmit}
                                handleShow={this.handleShow}
                            />
                        </Col>
                    </Row>
                </div>
            </Modal>
        );
    }
}

export default RejectScreenModal;
