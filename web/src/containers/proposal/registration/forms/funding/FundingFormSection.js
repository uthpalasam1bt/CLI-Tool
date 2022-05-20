import React from 'react';
import { connect } from 'react-redux';
import { required } from 'redux-form-validators';
import { Row, Col } from 'antd';
import { Field, FormSection, formValueSelector } from 'redux-form';
import FundingPositionChild from './FundingPositionChild';
import { ButtonGroup } from '../../../../../UILibrary/components/forms/fields';

let FundingFormSection = props => {
    const { fundingParent } = props;
    return (
        <div className="form-wrap funding-wrap">
            <FormSection name="funding">
                <Row className="input-row">
                    <Col xl={14} lg={12} xs={24} className="label-wrap">
                        <label htmlFor="returnFee" className="input-title">
                            Would you like to see a projection of your funding position?
                        </label>
                    </Col>
                    <Col xl={10} lg={12} xs={24} className="input-wrap">
                        <Field
                            component={ButtonGroup}
                            name="funding"
                            options={[{ title: 'Yes', value: 'yes' }, { title: 'No', value: 'no' }]}
                            validate={[required()]}
                        />
                    </Col>
                </Row>
                {fundingParent === 'yes' && <FundingPositionChild />}
            </FormSection>
        </div>
    );
};

const selector = formValueSelector('initialProposalForm');

FundingFormSection = connect(state => {
    const fundingParent = selector(state, 'funding.funding');
    return { fundingParent };
})(FundingFormSection);

export default FundingFormSection;
