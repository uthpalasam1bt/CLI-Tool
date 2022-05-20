import React from 'react';
import { Row, Col, Avatar, List } from 'antd';

const data = [
    {
        title: 'Will Smith',
        description: 'Admin'
    },
    {
        title: 'Will SmithWill Smith',
        description: 'Supervisor'
    },
    {
        title: 'AWill Smith',
        description: 'Executive'
    },
    {
        title: 'Will Smith',
        description: 'Supervisor'
    }
];

let ApprovalFormSection = props => {
    return (
        <div className="approval-list approval-wrap">
            <Row className="approval-header">
                <Col xl={20} xs={24}>
                    <span className="approval-title">Send formal proposal document to following users</span>
                </Col>
                <Col xl={4} xs={24}>
                    <span className="approval-link">3 users added</span>
                </Col>
            </Row>
            <div className="form-wrap">
                <List
                    className="approval-list-items"
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar icon="user" />}
                                title={item.title}
                                description={item.description}
                            />
                            <div>
                                {/* <button className="liabilityInput btn-red">Remove</button> */}
                                <button type="button" className="btn-green">
                                    Add
                                </button>
                            </div>
                        </List.Item>
                    )}
                />
            </div>
        </div>
    );
};

export default ApprovalFormSection;
