import React, { Component } from 'react';
import { CustomInputSection, CustomDatePicker } from '../../../../../components/customFields/FieldInputWithLabel';
import { Col, Button, Row } from 'antd';
import data from './FundingData.json';

class DeficitContributionOptions extends Component {
    state = {
        fieldData: data.ContributionOptions,
        count: 1,
        visible: true
    };

    addMoreFields = () => {
        let newFields = [...this.state.fieldData, ...data.ContributionOptions];
        this.setState({
            fieldData: newFields,
            count: this.state.count + 1
        });
        if (this.state.count > 18) {
            this.setState({ visible: false });
        }
    };
    render() {
        return (
            <div>
                <Row className="input-row">
                    <Col xl={24} lg={24} xs={24} className="label-wrap">
                        <span className="input-title input-heading">
                            Add upto 20 sets of value and date of deficit contribution
                        </span>
                    </Col>
                </Row>
                {this.state.fieldData.map((props, index) => (
                    <div key={index}>
                        <CustomInputSection
                            key={props.input.name + index}
                            name={props.input.name + index}
                            label={props.input.label}
                            placeHolder={props.input.placeHolder}
                            type="number"
                        />
                        <CustomDatePicker
                            key={props.date.name + index}
                            name={props.date.name + index}
                            label={props.date.label}
                            placeHolder={props.date.placeHolder}
                        />
                    </div>
                ))}

                {this.state.visible && (
                    <Row className="input-row">
                        <Col xl={24} lg={24} xs={24} className="input-wrap" onClick={this.addMoreFields}>
                            <span className="input-title input-heading">
                                <Button className="btn-add" type="dashed">
                                    <i className="fa fa-plus fa-icon"></i> Add more
                                </Button>
                            </span>
                        </Col>
                    </Row>
                )}
            </div>
        );
    }
}

export default DeficitContributionOptions;
