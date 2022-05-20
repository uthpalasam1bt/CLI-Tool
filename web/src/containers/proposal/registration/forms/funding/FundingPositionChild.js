import React from 'react';
import { connect } from 'react-redux';
import { Col, Row } from 'antd';
import { required } from 'redux-form-validators';
import { Field, formValueSelector } from 'redux-form';
import { ButtonGroup } from '../../../../../UILibrary/components/forms/fields';
import { CustomInputSection, CustomDatePicker } from '../../../../../components/customFields/FieldInputWithLabel';
import DeficitContributionChild from './DeficitContributionChild';
import FutureAccuralChild from './FutureAccuralChild';
import data from './FundingData';

let FundingPositionChild = props => {
    const { deficitContribution, futureAccrual, buyOutValue } = props;
    return (
        <div>
            <Row className="input-row">
                <Col xl={14} lg={12} xs={24} className="label-wrap">
                    <label htmlFor="returnFee" className="input-title">
                        Do you want us to model deficit contribution if any?
                    </label>
                </Col>
                <Col xl={10} lg={12} xs={24} className="input-wrap">
                    <Field
                        component={ButtonGroup}
                        name="deficitContribution"
                        options={[{ title: 'Yes', value: 'yes' }, { title: 'No', value: 'no' }]}
                        validate={[required()]}
                    />
                </Col>
            </Row>
            {deficitContribution === 'yes' && <DeficitContributionChild />}
            <Row className="input-row">
                <Col xl={14} lg={12} xs={24} className="label-wrap">
                    <label htmlFor="returnFee" className="input-title">
                        Is the scheme open to future accrual?
                    </label>
                </Col>
                <Col xl={10} lg={12} xs={24} className="input-wrap">
                    <Field
                        component={ButtonGroup}
                        name="futureAccrual"
                        options={[{ title: 'YES', value: 'yes' }, { title: 'NO', value: 'no' }]}
                        validate={[required()]}
                    />
                </Col>
            </Row>
            {futureAccrual === 'yes' && <FutureAccuralChild />}

            <Row className="input-row">
                <Col xl={14} lg={12} xs={24} className="label-wrap">
                    <label htmlFor="returnFee" className="input-title">
                        Do you have a target buyout value?
                    </label>
                </Col>
                <Col xl={10} lg={12} xs={24} className="input-wrap">
                    <Field
                        component={ButtonGroup}
                        name="buyOutValue"
                        options={[{ title: 'Yes', value: 'yes' }, { title: 'No', value: 'no' }]}
                        validate={[required()]}
                    />
                </Col>
            </Row>
            {buyOutValue === 'yes' && (
                <div>
                    <CustomInputSection
                        name={data.buyOutValueChild.name}
                        label={data.buyOutValueChild.label}
                        type="number"
                    />
                    <CustomDatePicker name={data.datePicker.name} label={data.datePicker.label} />
                </div>
            )}
            <Row className="input-row">
                <Col xl={14} lg={12} xs={24} className="label-wrap">
                    <label htmlFor="returnFee" className="input-title">
                        Would you like to include funding level triggers?
                    </label>
                </Col>
                <Col xl={10} lg={12} xs={24} className="input-wrap">
                    <Field
                        component={ButtonGroup}
                        name="fundingLevel"
                        options={[{ title: 'Yes', value: 'yes' }, { title: 'No', value: 'no' }]}
                        validate={[required()]}
                    />
                </Col>
            </Row>
        </div>
    );
};

const selectorChild = formValueSelector('initialProposalForm');

FundingPositionChild = connect(state => {
    const deficitContribution = selectorChild(state, 'funding.deficitContribution');
    const futureAccrual = selectorChild(state, 'funding.futureAccrual');
    const buyOutValue = selectorChild(state, 'funding.buyOutValue');

    return { deficitContribution, futureAccrual, buyOutValue };
})(FundingPositionChild);

export default FundingPositionChild;
