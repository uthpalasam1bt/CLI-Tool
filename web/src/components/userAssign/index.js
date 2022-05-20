import React, { Component } from 'react';
import { Col, Row, Select } from 'antd';

const { Option } = Select;

class UserAssignComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { changeValue, submitValue } = this.props;
        return (
            <Row className="assign-flex-wrapper">
                {this.props.isTextDisabled ? null : (
                    <Col xl={14} lg={14} xs={14} className="assign-user-label-container">
                        <label className="assign-user-label">Assigned to</label>
                    </Col>
                )}

                <Col xl={10} lg={10} xs={10} className="autocomplete-container">
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder={this.props.report ? 'Assign To' : ''}
                        optionFilterProp="children"
                        onChange={value => {
                            changeValue && changeValue(value);
                            submitValue && submitValue(value);
                        }}
                        filterOption={true}
                        disabled={
                            (this.props.activeTask && this.props.activeTask.completed) || !this.props.assineeEnabled
                        }
                        value={this.props.assignUserValue}
                    >
                        {this.props.dataSource.map(user => {
                            return (
                                <Option key={user.value} value={user.value}>
                                    {user.text}
                                </Option>
                            );
                        })}
                    </Select>
                </Col>
            </Row>
        );
    }
}

export default UserAssignComponent;
