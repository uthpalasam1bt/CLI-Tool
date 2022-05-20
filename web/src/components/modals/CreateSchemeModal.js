import React, { Component } from 'react';
import { Modal, Row, Col } from 'antd';
import CreateSchemeForm from '../../containers/scheme/forms/CreateSchemeForm';

export default class CreateSchemeModal extends Component {
    render() {
        const { show, inProgress, handleShow, handleSubmit } = this.props;

        return (
            <Modal
                visible={show}
                footer={null}
                maskClosable={false}
                className="lgim-styles-wrapper create-scheme-modal"
                onCancel={handleShow}
            >
                <div className="create-scheme-modal-wrapper">
                    <Row>
                        <Col lg={24}>
                            <h4 className="title">Create New Scheme</h4>
                            <CreateSchemeForm onSubmit={handleSubmit} handleShow={handleShow} inProgress={inProgress} />
                        </Col>
                    </Row>
                </div>
            </Modal>
        );
    }
}
