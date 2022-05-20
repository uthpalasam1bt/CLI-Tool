import React, { useState, useEffect } from 'react';
import { Field, change, getFormValues } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux';
import { required, numericality } from 'redux-form-validators';
import { Col, Row } from 'antd';
import _ from 'lodash';

import InputField from '../InputField';
import NumberField from '../NumberField';
import {
    CURRENT_ASSET_ALLOCATION_TYPE,
    ASSET_ALLOCATION_TOTAL,
    simpleAssetAllocationFields,
    detailAssetAllocationFields,
    SIMPLE_ASSET_ALLOCATION_TOTAL,
    DETAIL_ASSET_ALLOCATION_TOTAL
} from './constants';

const FormFields = ({ label, field, total, disabled, ...formData }) => {
    const tempMax = !Number(_.get(formData, field, null))
        ? 100 - total
        : 100 - (total - Number(_.get(formData, field, null)));
    return (
        <Col xl={12} lg={12} xs={24}>
            <Col xl={12} lg={12} xs={24} className="label-wrapper">
                <label className="input-title">{label}</label>
            </Col>
            <Col xl={12} lg={12} xs={24}>
                <Row className="input-row">
                    <Field
                        name={field}
                        className="form-control"
                        component={NumberField}
                        suffix="%"
                        options={{
                            decimalScale: 1,
                            placeholder: 0,
                            allowNegative: false,
                            disabled: (!_.get(formData, field, null) && total === 100) || disabled,
                            min: 0,
                            max: parseFloat(tempMax.toFixed(1))
                        }}
                    />
                </Row>
            </Col>
        </Col>
    );
};

const AssetsValueSeparator = props => {
    const { options, disabled } = props;
    const { formName, tabKey, prefix = null, currentAssetAT = null } = options;

    const formData = useSelector(getFormValues(formName));

    let assetAllocationTotalName =
        currentAssetAT && currentAssetAT == 'simple' ? SIMPLE_ASSET_ALLOCATION_TOTAL : DETAIL_ASSET_ALLOCATION_TOTAL;

    const totalFieldName =
        currentAssetAT && currentAssetAT == 'simple' ? SIMPLE_ASSET_ALLOCATION_TOTAL : DETAIL_ASSET_ALLOCATION_TOTAL;

    if (prefix) assetAllocationTotalName = `${prefix}.${assetAllocationTotalName}`;
    if (tabKey) assetAllocationTotalName = `${tabKey}.${assetAllocationTotalName}`;

    const [total, setTotal] = useState(0);
    const [asyncFormData, setAsyncFormData] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(change(formName, assetAllocationTotalName, 0));
    }, []);

    useEffect(() => {
        if (formData && !_.isEqual(asyncFormData, _.cloneDeep(formData))) {
            if (tabKey) {
                setAsyncFormData(formData[tabKey]);
            } else {
                setAsyncFormData(formData);
            }
        }
    }, [formData]);

    useEffect(() => {
        let curtotal = 0;
        let filedArray = [];
        options[CURRENT_ASSET_ALLOCATION_TYPE] === 'detail'
            ? (filedArray = detailAssetAllocationFields)
            : (filedArray = simpleAssetAllocationFields);

        if (asyncFormData) {
            for (let item of filedArray) {
                const fieldName = prefix ? `${prefix}.${item.field}` : item.field;
                const itemVal = _.get(asyncFormData, fieldName, null);

                if (!itemVal || !Number(itemVal)) continue;

                curtotal += Number(itemVal);
            }
        }
        if (curtotal != total) {
            dispatch(change(formName, assetAllocationTotalName, curtotal.toFixed(1)));
            setTotal(Number(curtotal.toFixed(1)));
        }
    }, [asyncFormData]);

    return (
        <>
            <Row gutter={8} className="input-row">
                {options[CURRENT_ASSET_ALLOCATION_TYPE] === 'simple'
                    ? simpleAssetAllocationFields.map(fd => {
                          return (
                              <FormFields
                                  label={fd.label}
                                  field={prefix ? `${prefix}.${fd.field}` : fd.field}
                                  total={total}
                                  disabled={disabled}
                                  {...asyncFormData}
                              />
                          );
                      })
                    : options[CURRENT_ASSET_ALLOCATION_TYPE] === 'detail'
                    ? detailAssetAllocationFields.map(fd => {
                          return (
                              <FormFields
                                  label={fd.label}
                                  field={prefix ? `${prefix}.${fd.field}` : fd.field}
                                  total={total}
                                  disabled={disabled}
                                  {...asyncFormData}
                              />
                          );
                      })
                    : null}

                <Col xl={24} lg={24} xs={24}>
                    <Col xl={18} lg={12} xs={24} className="label-wrapper">
                        <label className="input-title text-bold">Total</label>
                    </Col>
                    <Col xl={6} lg={12} xs={24}>
                        <Row className="input-row">
                            <Field
                                name={prefix ? `${prefix}.${totalFieldName}` : totalFieldName}
                                className="form-control"
                                component={InputField}
                                suffix="%"
                                editable={false}
                                validate={[
                                    required({ message: 'Required' }),
                                    numericality({
                                        int: true,
                                        '=': 100,
                                        message: 'Invalid entry. Total should be 100%.'
                                    })
                                ]}
                            />
                        </Row>
                    </Col>
                </Col>
            </Row>
        </>
    );
};

export default AssetsValueSeparator;
