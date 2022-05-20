import React, { Component } from 'react';
import { Col, Row, Card, Empty } from 'antd';

import { CATEGORY_YOU_SELECTED_HAS_NO_UPLOADED_DOCUMENTS } from '../../../../../config/constants';

class IncumbentManagers extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const getIAAData_data = this.props.getIAAData_data;
        const incumbentManagerFormData =
            getIAAData_data && getIAAData_data.incumbentManagerForm ? getIAAData_data.incumbentManagerForm : null;

        return (
            <>
                {/* if only incumbentManagers entered */}
                {incumbentManagerFormData && incumbentManagerFormData.length ? (
                    incumbentManagerFormData.map(incumb => (
                        <Card>
                            <Row className="input-row">
                                <Col xl={14} lg={12} xs={24} className="label-wrapper">
                                    <label className="input-title">Name of external investment manager</label>
                                </Col>
                                <Col xl={10} lg={12} xs={24} className="input-wrapper">
                                    <input
                                        type="text"
                                        disabled={true}
                                        value={incumb.invesmentManagerName}
                                        className="form-control"
                                        title={incumb.invesmentManagerName ? incumb.invesmentManagerName : ''}
                                    />
                                </Col>
                            </Row>
                            <Row className="input-row">
                                <Col xl={14} lg={12} xs={24} className="label-wrapper">
                                    <label className="input-title">Manager account number</label>
                                </Col>
                                <Col xl={10} lg={12} xs={24} className="input-wrapper">
                                    <input
                                        type="text"
                                        disabled={true}
                                        value={incumb.invesmentManagerAccountNumber}
                                        className="form-control"
                                        title={
                                            incumb.invesmentManagerAccountNumber
                                                ? incumb.invesmentManagerAccountNumber
                                                : ''
                                        }
                                    />
                                </Col>
                            </Row>
                            <Row className="input-row">
                                <Col xl={14} lg={12} xs={24} className="label-wrapper">
                                    <label className="input-title">Primary contact</label>
                                </Col>
                                <Col xl={10} lg={12} xs={24} className="input-wrapper">
                                    <input
                                        type="text"
                                        disabled={true}
                                        value={incumb.invesmentManagerPimaryContact}
                                        className="form-control"
                                        title={
                                            incumb.invesmentManagerPimaryContact
                                                ? incumb.invesmentManagerPimaryContact
                                                : ''
                                        }
                                    />
                                </Col>
                            </Row>
                            <Row className="input-row">
                                <Col xl={14} lg={12} xs={24} className="label-wrapper">
                                    <label className="input-title">Contact e-mail address</label>
                                </Col>
                                <Col xl={10} lg={12} xs={24} className="input-wrapper">
                                    <input
                                        type="text"
                                        disabled={true}
                                        value={incumb.invesmentManagerEmail}
                                        className="form-control"
                                        title={incumb.invesmentManagerEmail ? incumb.invesmentManagerEmail : ''}
                                    />
                                </Col>
                            </Row>
                            <Row className="input-row">
                                <Col xl={14} lg={12} xs={24} className="label-wrapper">
                                    <label className="input-title">Contact phone number</label>
                                </Col>
                                <Col xl={10} lg={12} xs={24} className="input-wrapper">
                                    <input
                                        type="text"
                                        disabled={true}
                                        value={incumb.invesmentManagerContactNumber}
                                        className="form-control"
                                        title={
                                            incumb.invesmentManagerContactNumber
                                                ? incumb.invesmentManagerContactNumber
                                                : ''
                                        }
                                    />
                                </Col>
                            </Row>
                        </Card>
                    ))
                ) : (
                    // if there isn't any data , render this view
                    <Empty description={<span>{CATEGORY_YOU_SELECTED_HAS_NO_UPLOADED_DOCUMENTS}</span>} />
                )}
            </>
        );
    }
}

export default IncumbentManagers;
