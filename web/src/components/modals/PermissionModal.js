import React, { Component } from 'react';
import { Modal, Row, Col } from 'antd';

export default class PermissionModal extends Component {
    render() {
        const { show } = this.props;

        return (
            <Modal visible={show} footer={null} maskClosable={false} className="lgim-styles-wrapper permission-modal">
                <div className="permission-modal-wrapper">
                    <Row className="header">
                        <Col lg={24}>
                            <h4 className="title">Admin-permissions</h4>
                        </Col>
                    </Row>
                    <Row className="content-row">
                        <div className="permission-list">
                            <span className="square"></span>
                            <span className="content">Permission1 permission1 </span>
                        </div>
                        <div className="permission-list">
                            <span className="square"></span>
                            <span className="content">Permission1 permission1 </span>
                        </div>
                        <div className="permission-list">
                            <span className="square"></span>
                            <span className="content">Permission1 permission1 </span>
                        </div>
                    </Row>
                </div>
                <div className="footer clearfix">
                    <button className="btn-grey-o btn-close regular btn-footer">Close</button>
                </div>
            </Modal>
        );
    }
}
