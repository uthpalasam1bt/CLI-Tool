import React, { Component } from 'react';
import { Modal, Row, Col } from 'antd';
import CreateTaskForm from '../../containers/notification/tasks/forms/CreateTaskForm';
// import CreateTaskForm from 'containers/notification/tasks/forms/CreateTaskForm';

export default class CreateTaskModal extends Component {
    render() {
        const { show, close, userEmail, loggedUser } = this.props;
        const { primaryRole } = loggedUser;
        const className = primaryRole === 'client' ? 'create-meesage-wrap task-model-wrap' : 'create-meesage-wrap';

        return (
            <Modal
                visible={show}
                footer={null}
                maskClosable={false}
                onCancel={() => close()}
                className="lgim-styles-wrapper create-task-modal"
            >
                <div className="task-content clearfix">
                    <Row className="header">
                        <Col lg={24}>
                            <h4 className="title">Create Message </h4>
                        </Col>
                    </Row>
                    <div className={className}>
                        <CreateTaskForm userEmail={userEmail} close={close} loggedUser={loggedUser} />
                    </div>
                </div>
            </Modal>
        );
    }
}
