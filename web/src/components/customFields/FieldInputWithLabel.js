import React from 'react';
import { Row, Col } from 'antd';
import { required, numericality } from 'redux-form-validators';
import { Field, FormSection } from 'redux-form';
import { InputField, DatePicker, SelectOptions, ButtonGroup } from '../../UILibrary/components/forms/fields';

let CustomFormSection = props => {
    return (
        <div>
            <FormSection name={props.name}>
                <Field
                    component={ButtonGroup}
                    name="fundingPosition"
                    label={props.label}
                    options={[{ title: 'Yes', value: 'yes' }, { title: 'No', value: 'no' }]}
                    validate={[required({ message: 'Required' })]}
                />

                {props.fieldName === 'yes' && <div>{props.div}</div>}
            </FormSection>
        </div>
    );
};

let CustomInputSection = props => {
    let normalize;
    let validate = [];
    let valExpression = '';
    if (props.type === 'number') {
        if (props.expression !== undefined) valExpression = JSON.parse(props.expression);
        normalize = value => value.replace(/[^\d]/g, '');
        validate = [...validate, numericality(valExpression)];
    }
    if (!props.notRequired) validate = [...validate, required({ message: 'Required' })];

    return (
        <div>
            <Row className="input-row">
                {props.isStructured ? (
                    <div>
                        <Col className="label-wrap">
                            <span className="input-title">{props.label}</span>
                            <Field
                                name={props.name}
                                className="form-control"
                                placeholder={props.placeHolder}
                                component={InputField}
                                validate={validate}
                                normalize={normalize}
                            />
                        </Col>
                    </div>
                ) : (
                    <div>
                        {' '}
                        <Col xl={14} lg={12} xs={24} className="label-wrap">
                            <span className="input-title">{props.label}</span>
                        </Col>
                        <Col xl={10} lg={12} xs={24} className="input-wrap">
                            <Field
                                name={props.name}
                                className="form-control"
                                placeholder={props.placeHolder}
                                component={InputField}
                                validate={validate}
                                normalize={normalize}
                            />
                        </Col>{' '}
                    </div>
                )}
            </Row>
        </div>
    );
};

let CustomInputSectionMiner = props => {
    let normalize;
    let validate = [];
    let valExpression = '';
    if (props.type === 'number') {
        if (props.expression !== undefined) valExpression = JSON.parse(props.expression);
        normalize = value => value.replace(/[^\d]/g, '');
        validate = [...validate, numericality(valExpression)];
    }
    if (!props.notRequired) validate = [...validate, required({ message: 'Required' })];

    return (
        <div>
            <Row className="input-row" gutter={20}>
                <Col xl={12} lg={12} xs={24}>
                    <Row>
                        <Col xl={12} lg={12} xs={24} className="label-wrap">
                            <span className="input-title">{props.Llabel}</span>
                        </Col>
                        <Col xl={12} lg={12} xs={24} className="input-wrap">
                            <Field
                                name={props.Lname}
                                className="form-control"
                                placeholder={props.LplaceHolder}
                                component={InputField}
                                validate={validate}
                                normalize={normalize}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col xl={12} lg={12} xs={24}>
                    <Row>
                        <Col xl={12} lg={12} xs={24} className="label-wrap">
                            <span className="input-title">{props.Rlabel}</span>
                        </Col>
                        <Col xl={12} lg={12} xs={24} className="input-wrap">
                            <Field
                                name={props.Rname}
                                className="form-control"
                                placeholder={props.RplaceHolder}
                                component={InputField}
                                validate={validate}
                                normalize={normalize}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

let CustomDatePicker = props => {
    return (
        <div>
            <Row className="input-row">
                <Col xl={14} lg={12} xs={24} className="label-wrap">
                    <span className="input-title">{props.label}</span>
                </Col>
                <Col xl={10} lg={12} xs={24} className="input-wrap">
                    <Field
                        name={props.name}
                        className="form-control input-select"
                        placeholder={props.placeHolder}
                        component={DatePicker}
                        validate={[required({ message: 'Required' })]}
                    />
                </Col>
            </Row>
        </div>
    );
};

let CustomSelectOption = props => {
    return (
        <div>
            <Row className="input-row">
                <Col xl={14} lg={12} xs={24} className="label-wrap">
                    <span className="input-title">{props.title}</span>
                </Col>
                <Col xl={10} lg={12} xs={24} className="input-wrap">
                    <Field
                        name={props.name}
                        className="form-control"
                        placeholder={props.placeHolder}
                        component={SelectOptions}
                        options={props.options}
                        validate={[required({ message: 'Required' })]}
                    />
                </Col>
            </Row>
        </div>
    );
};

let CustomAssetSelectOption = props => {
    return (
        <div>
            <Row className="input-row">
                <Col xl={14} lg={12} xs={24} className="label-wrap">
                    <span className="schemeTitle">{props.title}</span>
                </Col>
                <Col xl={10} lg={12} xs={24} className="inputWrap">
                    <Field
                        name={props.name}
                        className="form-control"
                        placeholder={props.placeHolder}
                        component={SelectOptions}
                        options={props.options}
                        validate={[required({ message: 'Required' })]}
                    />{' '}
                </Col>
            </Row>
        </div>
    );
};

export {
    CustomFormSection,
    CustomInputSection,
    CustomDatePicker,
    CustomSelectOption,
    CustomInputSectionMiner,
    CustomAssetSelectOption
};
