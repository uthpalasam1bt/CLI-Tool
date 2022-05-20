import React from 'react';
import { Row, Col } from 'antd';
import { required } from 'redux-form-validators';
import { Field } from 'redux-form';
import { InputField } from '../../UILibrary/components/forms/fields';

let FieldInputWithLabel = (componentName, labelValue, placeholder) => {
    return (
        <Row className="input-row">
            <Col xl={14} lg={12} xs={24} className="label-wrap">
                <label htmlFor={componentName}>{labelValue}</label>
            </Col>
            <Col xl={10} lg={12} xs={24} className="input-wrap">
                <Field
                    name={componentName}
                    className="form-control"
                    placeholder={placeholder}
                    component={InputField}
                    validate={[required({ message: 'Required' })]}
                />
            </Col>
        </Row>
    );
};

export default FieldInputWithLabel;
