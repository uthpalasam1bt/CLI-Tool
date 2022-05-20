import React, { Component } from 'react';
import { Modal, Row, Col, Checkbox } from 'antd';

export default class CreateSchemeGroupModal extends Component {
    render() {
        const { show } = this.props;

        return (
            <Modal
                visible={show}
                footer={null}
                maskClosable={false}
                className="lgim-styles-wrapper create-scheme-group-modal"
            >
                <div className="create-scheme-group-modal-wrapper">
                    <Row className="header">
                        <Col lg={24}>
                            <h4 className="title">Create Scheme Group</h4>
                        </Col>
                    </Row>
                    <Row className="content-row">
                        <Col lg={7} xs={24}>
                            <span className="input-title">Group name</span>
                        </Col>
                        <Col lg={17} xs={24}>
                            <div className="field-wrapper margin-wrap">
                                <input className="form-control input-field" type="text" placeholder="Eg:Admin" />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Checkbox.Group>
                            <Row>
                                <Col span={12} className="checkbox-list">
                                    <Checkbox value="A">Notification 01</Checkbox>
                                </Col>
                                <Col span={12} className="checkbox-list">
                                    <Checkbox value="B">Notification 01</Checkbox>
                                </Col>
                                <Col span={12} className="checkbox-list">
                                    <Checkbox value="C">Notification 01</Checkbox>
                                </Col>
                                <Col span={12} className="checkbox-list">
                                    <Checkbox value="D">Notification 01</Checkbox>
                                </Col>
                                <Col span={12} className="checkbox-list">
                                    <Checkbox value="E">Notification 01</Checkbox>
                                </Col>
                                <Col span={12} className="checkbox-list">
                                    <Checkbox value="D">Notification 01</Checkbox>
                                </Col>
                                <Col span={12} className="checkbox-list">
                                    <Checkbox value="E">Notification 01</Checkbox>
                                </Col>
                            </Row>
                        </Checkbox.Group>
                    </Row>
                </div>
                <div className="footer clearfix">
                    <button className="btn-grey-o btn-close regular btn-footer">Close</button>
                    <button className="tpip-btn-blue btn-create regular btn-footer">Create</button>
                </div>
            </Modal>
        );
    }
}
