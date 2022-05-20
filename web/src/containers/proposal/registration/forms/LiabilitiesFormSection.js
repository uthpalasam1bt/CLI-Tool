import React from 'react';
import { connect } from 'react-redux';
import { Field, FormSection, formValueSelector } from 'redux-form';
import {
    CustomInputSection,
    CustomDatePicker,
    CustomSelectOption
} from '../../../../components/customFields/FieldInputWithLabel';
import { required } from 'redux-form-validators';
import { Row, Col } from 'antd';
import data from './liabilityData';
import { FileUploader, ButtonGroup, AutoComplete } from '../../../../UILibrary/components/forms/fields';

let LiabilitiesFormSection = props => {
    const { liability, inflaction, cashflow, liabilityValues } = props;

    const autocompleteProps = { dataSource: ['ABC', 'DEF'] };

    return (
        <FormSection name="liabilities">
            <div className="liability-wrap form-wrap">
                <Row className="input-row">
                    <Col xl={14} lg={12} xs={24} className="label-wrap">
                        <label xl={14} lg={12} xs={24} className="input-title">
                            Do you know your liability duration?
                        </label>
                    </Col>
                    <Col xl={10} lg={12} xs={24} className="input-wrap">
                        <Field
                            component={ButtonGroup}
                            name="liability"
                            options={[{ title: 'Yes', value: 'yes' }, { title: 'No', value: 'no' }]}
                            validate={[required()]}
                        />
                    </Col>
                </Row>

                {liability === 'yes' && (
                    <div>
                        <CustomInputSection name={data.duration.name} label={data.duration.label} type="number" />
                        <Row className="input-row">
                            <Col xl={14} lg={12} xs={24} className="label-wrap">
                                <label className="input-title">
                                    Do you know the % of liabilities linked to inflation?
                                </label>
                            </Col>
                            <Col xl={10} lg={12} xs={24} className="input-wrap">
                                <Field
                                    component={ButtonGroup}
                                    name="inflaction"
                                    options={[{ title: 'Yes', value: 'yes' }, { title: 'No', value: 'no' }]}
                                    validate={[required()]}
                                />
                            </Col>
                        </Row>

                        {inflaction === 'yes' && (
                            <div>
                                <CustomInputSection
                                    name={data.liabilityLink.name}
                                    label={data.liabilityLink.label}
                                    type="number"
                                />
                            </div>
                        )}
                        {inflaction === 'no' && <div></div>}

                        <Row className="input-row">
                            <Col xl={14} lg={12} xs={24} className="label-wrap">
                                <label className="input-title">
                                    Do you have a set of past service liability cashflows that you can upload?
                                </label>
                            </Col>
                            <Col xl={10} lg={12} xs={24} className="input-wrap">
                                <Field
                                    component={ButtonGroup}
                                    name="cashflow"
                                    options={[{ title: 'Yes', value: 'yes' }, { title: 'No', value: 'no' }]}
                                    validate={[required()]}
                                />
                            </Col>
                        </Row>
                        {cashflow === 'yes' && (
                            <div>
                                <Row className="input-row">
                                    <Col xl={14} lg={12} xs={24} className="label-wrap">
                                        <label className="input-title">
                                            Do you want to upload overall cashflows or do you want to upload your
                                            cashflows as real and fixed separately?
                                        </label>
                                    </Col>
                                    <Col xl={10} lg={12} xs={24} className="input-wrap">
                                        <Row>
                                            <div className="pull-left download-input">
                                                <Field
                                                    component={AutoComplete}
                                                    name="fixedNrepair"
                                                    validate={[required()]}
                                                    options={autocompleteProps}
                                                />
                                            </div>
                                            <div className="pull-right download-input">
                                                <button
                                                    title="Download"
                                                    className="tpip-btn-blue regular button-download"
                                                >
                                                    <span>
                                                        <i className="fa fa-download fa-icon"></i>
                                                    </span>
                                                    Download
                                                </button>
                                            </div>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className="input-row">
                                    <Col xl={14} lg={12} xs={24} className="label-wrap">
                                        <label className="input-title">Upload overall cashflows</label>
                                    </Col>
                                    <Col xl={10} lg={12} xs={24} className="input-wrap">
                                        <Field
                                            name="upload"
                                            className="form-control"
                                            placeholder=""
                                            component={FileUploader}
                                        />
                                    </Col>
                                </Row>
                                <CustomDatePicker name={data.cashflowdate.name} label={data.cashflowdate.label} />
                            </div>
                        )}
                    </div>
                )}
                {liability === 'no' && (
                    <div>
                        <Row className="input-row">
                            <Col xl={14} lg={12} xs={24} className="label-wrap">
                                <label className="input-title">
                                    Do you know the % of liabilities linked to inflation?
                                </label>
                            </Col>
                            <Col xl={10} lg={12} xs={24} className="input-wrap">
                                <Field
                                    component={ButtonGroup}
                                    name="inflaction"
                                    options={[{ title: 'Yes', value: 'yes' }, { title: 'No', value: 'no' }]}
                                    validate={[required()]}
                                />
                            </Col>
                        </Row>
                        {inflaction === 'yes' && (
                            <div>
                                <CustomInputSection
                                    name={data.liabilityLink.name}
                                    label={data.liabilityLink.label}
                                    type="number"
                                />
                            </div>
                        )}
                        {inflaction === 'no' && <div></div>}

                        <Row className="input-row">
                            <Col xl={14} lg={12} xs={24} className="label-wrap">
                                <label className="input-title">
                                    Do you want to upload overall cashflows or do you want to upload your cashflows as
                                    real and fixed separately?
                                </label>
                            </Col>
                            <Col xl={10} lg={12} xs={24} className="input-wrap">
                                <Row>
                                    <div className="pull-left download-input">
                                        <Field
                                            component={AutoComplete}
                                            name="fixedNrepair"
                                            validate={[required()]}
                                            options={autocompleteProps}
                                        />
                                    </div>
                                    <div className="pull-right download-input">
                                        <button title="Download" className="tpip-btn-blue regular button-download">
                                            <span>
                                                <i className="fa fa-download fa-icon"></i>
                                            </span>
                                            Download
                                        </button>
                                    </div>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="input-row">
                            <Col xl={14} lg={12} xs={24} className="label-wrap">
                                <label className="input-title">Upload overall cashflows</label>
                            </Col>
                            <Col xl={10} lg={12} xs={24} className="input-wrap">
                                <Field name="upload" className="form-control" placeholder="" component={FileUploader} />
                            </Col>
                        </Row>
                        <CustomDatePicker name={data.cashflowProduce.name} label={data.cashflowProduce.label} />
                    </div>
                )}

                <div>
                    <Row className="input-row">
                        <Col xl={14} lg={12} xs={24} className="label-wrap">
                            <label className="input-title">
                                Do you know your liability value, margin date and type?
                            </label>
                        </Col>
                        <Col xl={10} lg={12} xs={24} className="input-wrap">
                            <Field
                                component={ButtonGroup}
                                name="liabilityValues"
                                options={[{ title: 'Yes', value: 'yes' }, { title: 'No', value: 'no' }]}
                                validate={[required()]}
                            />
                        </Col>
                    </Row>
                    {liabilityValues === 'yes' && (
                        <div>
                            <CustomInputSection
                                name={data.liabilityValue.name}
                                label={data.liabilityValue.label}
                                type="number"
                            />
                            <CustomInputSection
                                name={data.liabilityDiscont.name}
                                label={data.liabilityDiscont.label}
                                type="number"
                            />
                            <CustomDatePicker
                                name={data.providValueDatepicker.name}
                                label={data.providValueDatepicker.label}
                            />
                            <CustomSelectOption
                                name={data.liabilityOption.name}
                                title={data.liabilityOption.title}
                                options={data.liabilityOption.liabilityOptions}
                            />
                        </div>
                    )}
                </div>
            </div>
        </FormSection>
    );
};

const selector = formValueSelector('initialProposalForm');

LiabilitiesFormSection = connect(state => {
    const liability = selector(state, 'liabilities.liability');
    const inflaction = selector(state, 'liabilities.inflaction');
    const liabilityValues = selector(state, 'liabilities.liabilityValues');
    const cashflow = selector(state, 'liabilities.cashflow');
    const cashflowProduce = selector(state, 'liabilities.cashflowProduce');
    return { liability, inflaction, liabilityValues, cashflow, cashflowProduce };
})(LiabilitiesFormSection);

export default LiabilitiesFormSection;
