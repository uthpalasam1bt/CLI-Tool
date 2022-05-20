import React, { Component } from 'react';
import { Modal, Row, Col, Button } from 'antd';
import AddTriggerForm from '../forms/addTriggerForm';

export default class AddTriggerModal extends Component {
  render() {
    const { show, handleCancel, triggerFormSubmit, onSubmit, updateMode, defineTriggersData } = this.props;

    return (
      <Modal
        visible={show}
        maskClosable={false}
        onCancel={handleCancel}
        className="lgim-styles-wrapper add-trigger-modal"
        footer={[
          <Button key="submit" className="tpip-btn-blue regular btn-create" onClick={triggerFormSubmit}>
            {updateMode ? 'Update' : 'Create'}
          </Button>
        ]}
      >
        <div className="modal-form-wrapper">
          <Row>
            <Col lg={24}>
              <h4 className="title">{updateMode ? 'Update' : 'Add new'} funding level triggers</h4>
              <AddTriggerForm onSubmit={onSubmit} defineTriggersData={defineTriggersData} />
            </Col>
          </Row>
        </div>
      </Modal>
    );
  }
}
