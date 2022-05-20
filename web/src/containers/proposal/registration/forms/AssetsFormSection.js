import React, { Component } from 'react';
import { Field, FormSection, formValueSelector, change, resetSection } from 'redux-form';
import { ButtonGroup, AutoComplete } from '../../../../UILibrary/components/forms/fields';
import {
    CustomInputSection,
    CustomDatePicker,
    CustomInputSectionMiner
} from '../../../../components/customFields/FieldInputWithLabel';
import { required } from 'redux-form-validators';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import data from './assetData';
import store from '../../../../redux/store';

class AssetsFormSection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formTotal: 0
        };

        this.test = this.test.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        store.dispatch(change('initialProposalForm', 'assets.total', 0));
        if (nextProps.assetAllocationSecondary === 'simple' && nextProps.simpleForm !== prevState.simpleForm) {
            store.dispatch(resetSection('initialProposalForm', ['assets.detail']));
            let total = 0;
            for (let key in nextProps.simpleForm) {
                total = total + parseInt(nextProps.simpleForm[key]);
            }
            store.dispatch(change('initialProposalForm', 'assets.total', total));

            return { formTotal: total };
        }
        if (nextProps.assetAllocationSecondary === 'detail' && nextProps.detailsForm !== prevState.detailsForm) {
            store.dispatch(resetSection('initialProposalForm', ['assets.simple']));
            let total = 0;
            for (let key in nextProps.detailsForm) {
                total = total + parseInt(nextProps.detailsForm[key]);
            }
            store.dispatch(change('initialProposalForm', 'assets.total', total));

            return { formTotal: total };
        } else return { formTotal: 0 };
    }

    test(value) {
        this.props.syncData(value);
    }

    render() {
        const {
            existingProposals,
            targetReturn,
            hedgeRatio,
            consultingFees,
            currentAssetAllocation,
            assetAllocationSecondary
        } = this.props;

        if (existingProposals) {
            existingProposals.cb = this.test;
        }
        return (
            <FormSection name="assets">
                <div className="asset-wrap form-wrap">
                    <div>
                        {/* <CustomInputSection name={data.proposalName.name} label={data.proposalName.label} placeholder={data.proposalName.placeholder} /> */}
                        <Row className="input-row">
                            <Col xl={12} lg={12} xs={24} className="label-wrap">
                                <label className="input-title">Formal Proposal name</label>
                            </Col>
                            <Col xl={10} lg={12} xs={24} className="input-wrap">
                                <Field
                                    component={AutoComplete}
                                    name="proposalName"
                                    validate={[required()]}
                                    onChange={() => {
                                        this.props.handleChangeProposalName();
                                    }}
                                    options={existingProposals}
                                />
                            </Col>
                        </Row>

                        <CustomInputSection
                            name={data.assetValue.name}
                            label={data.assetValue.label}
                            placeholder={data.assetValue.placeholder}
                            type="number"
                        />
                        <CustomDatePicker
                            name={data.assetValueDate.name}
                            label={data.assetValueDate.label}
                            placeholder={data.assetValueDate.placeholder}
                        />
                        <Row className="input-row">
                            <Col xl={14} lg={12} xs={24} className="label-wrap">
                                <label htmlFor="returnFee" className="input-title">
                                    Do you know the target return above gilts?
                                </label>
                            </Col>
                            <Col xl={10} lg={12} xs={24} className="input-wrap">
                                <Field
                                    component={ButtonGroup}
                                    name="targetReturn"
                                    options={[{ title: 'Yes', value: 'yes' }, { title: 'No', value: 'no' }]}
                                    validate={[required()]}
                                />
                            </Col>
                        </Row>
                        {targetReturn === 'yes' && (
                            <div>
                                <CustomInputSection
                                    name={data.returnGiftFee.name}
                                    label={data.returnGiftFee.label}
                                    placeholder={data.returnGiftFee.placeholder}
                                    type="number"
                                />
                                <Row className="input-row">
                                    <Col xl={14} lg={12} xs={24} className="label-wrap">
                                        <label htmlFor="currentAssetAllocation" className="input-title">
                                            Do you know your current asset allocation?
                                        </label>
                                    </Col>
                                    <Col xl={10} lg={12} xs={24} className="input-wrap">
                                        <Field
                                            name="currentAssetAllocation"
                                            className="form-control"
                                            placeholder=""
                                            component={ButtonGroup}
                                            options={[{ title: 'Yes', value: 'yes' }, { title: 'No', value: 'no' }]}
                                        />
                                    </Col>
                                </Row>
                            </div>
                        )}
                        {currentAssetAllocation === 'yes' && (
                            <div>
                                <Row className="input-row">
                                    <Col xl={14} lg={12} xs={24} className="label-wrap">
                                        <label htmlFor="assetAllocationSecondary" className="input-title">
                                            How do you want to enter your current asset allocation?
                                        </label>
                                    </Col>
                                    <Col xl={10} lg={12} xs={24} className="input-wrap">
                                        <Field
                                            component={ButtonGroup}
                                            name="assetAllocationSecondary"
                                            options={[
                                                { title: 'Simple', value: 'simple' },
                                                { title: 'Detail', value: 'detail' }
                                            ]}
                                        />
                                    </Col>
                                </Row>
                                {assetAllocationSecondary === 'simple' && (
                                    <FormSection name="simple">
                                        {data.Simple.map((res, index) => {
                                            return <CustomInputSectionMiner key={index} {...res} />;
                                        })}
                                    </FormSection>
                                )}
                                {assetAllocationSecondary === 'detail' && (
                                    <FormSection name="detail">
                                        {data.Detail.map((res, index) => {
                                            return <CustomInputSectionMiner key={index} {...res} />;
                                        })}
                                    </FormSection>
                                )}
                                <CustomInputSection {...data.total} />
                            </div>
                        )}

                        {targetReturn === 'no' && (
                            <div>
                                {/* <Row className="input-row">
                                    <Col xl={14} lg={12} xs={24} className="label-wrap">
                                        <label htmlFor="returnFee" className="input-title">How do you want to enter your current asset allocation?</label>
                                    </Col>
                                    <Col xl={10} lg={12} xs={24} className="input-wrap">
                                        <Field component={ButtonGroup} name="assetAllocation" options={[{ title: 'Simple', value: 'simple' }, { title: 'Detail', value: 'detail' }]} />
                                    </Col>
                                </Row> */}
                            </div>
                        )}
                    </div>
                    {/* ...........Separation here.................. */}
                    <Row className="input-row">
                        <Col xl={14} lg={12} xs={24} className="label-wrap">
                            <label htmlFor="hedgeRatio" className="input-title">
                                Do you know your liability hedge ratio?
                            </label>
                        </Col>
                        <Col xl={10} lg={12} xs={24} className="input-wrap">
                            <Field
                                component={ButtonGroup}
                                name="hedgeRatio"
                                options={[{ title: 'Yes', value: 'yes' }, { title: 'No', value: 'no' }]}
                            />
                        </Col>
                    </Row>

                    {hedgeRatio === 'yes' && (
                        <div>
                            <CustomInputSection
                                name={data.interestPercentage.name}
                                label={data.interestPercentage.label}
                                type="number"
                            />
                            <CustomInputSection
                                name={data.inflationPercentage.name}
                                label={data.inflationPercentage.label}
                                type="number"
                            />
                        </div>
                    )}
                    <Row className="input-row">
                        <Col xl={14} lg={12} xs={24} className="label-wrap">
                            <label htmlFor="consultingFees" className="input-title">
                                Do you know your what your total asset management and investment consulting fees are?
                            </label>
                        </Col>
                        <Col xl={10} lg={12} xs={24} className="input-wrap">
                            <Field
                                component={ButtonGroup}
                                name="consultingFees"
                                options={[{ title: 'Yes', value: 'yes' }, { title: 'No', value: 'no' }]}
                            />
                        </Col>
                    </Row>
                    {consultingFees === 'yes' && (
                        <div>
                            <CustomInputSection
                                name={data.manageNconsulting.name}
                                label={data.manageNconsulting.label}
                                type="number"
                            />
                        </div>
                    )}
                </div>
            </FormSection>
        );
    }
}
const selector = formValueSelector('initialProposalForm');

AssetsFormSection = connect(state => {
    const existingProposals = selector(state, 'assets.existingProposals');
    const proposalName = selector(state, 'assets.proposalName');
    const targetReturn = selector(state, 'assets.targetReturn');
    const hedgeRatio = selector(state, 'assets.hedgeRatio');
    const consultingFees = selector(state, 'assets.consultingFees');
    const currentAssetAllocation = selector(state, 'assets.currentAssetAllocation');
    const assetAllocationSecondary = selector(state, 'assets.assetAllocationSecondary');
    const simpleForm = selector(state, 'assets.simple');
    const detailsForm = selector(state, 'assets.detail');

    return {
        existingProposals,
        proposalName,
        targetReturn,
        hedgeRatio,
        consultingFees,
        currentAssetAllocation,
        assetAllocationSecondary,
        simpleForm,
        detailsForm
    };
})(AssetsFormSection);

export default AssetsFormSection;
