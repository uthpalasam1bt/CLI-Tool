import React, { Component } from 'react';
import { Modal, Row, Col, Button } from 'antd';
import DefineTriggerForm from '../forms/defineTriggerForm';

export default class DefineTriggersModal extends Component {
  render() {
    const { show, handleCancel, defineTriggerFormSubmit, onSubmit } = this.props;

    return (
      <Modal
        visible={show}
        maskClosable={false}
        onCancel={handleCancel}
        className="lgim-styles-wrapper add-trigger-modal"
        footer={[
          <Button key="submit" className="tpip-btn-blue regular btn-create" onClick={defineTriggerFormSubmit}>
            Save
          </Button>,
          <Button className="btn-cancel" onClick={handleCancel}>Cancel</Button>
        ]}
      >
        <div className="modal-form-wrapper">
          <Row>
            <Col lg={24}>
              <h4 className="title">Define Triggers</h4>
              <DefineTriggerForm onSubmit={onSubmit} />
            </Col>
          </Row>
        </div>
      </Modal>
    );
  }
}
