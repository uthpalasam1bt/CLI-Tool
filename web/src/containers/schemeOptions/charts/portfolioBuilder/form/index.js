import React, { useState, useEffect } from 'react';
import { Field, reduxForm, change } from 'redux-form';
import { numericality, required } from 'redux-form-validators';
import { Col, Row, Slider } from 'antd';

import { NumberField, CurrencyField } from '../../../../../UILibrary/components/forms/fields';
import store from '../../../../../redux/store';

let PortFolioForm = props => {
    const {
        handleSubmit,
        onSubmit,
        initialTargetReturn,
        minRange,
        maxRange,
        adAnualContribution,
        paymentPeriod,
        stepFunctionpaInprogress,
        PROJECTFLAG
        // onChangeTRSliderValue
    } = props;

    const minRangeMulti = minRange * 100;
    const maxRangeMulti = maxRange * 100;

    let minVal = parseFloat(minRangeMulti.toFixed(3).slice(0, -1));
    let maxVal = parseFloat(maxRangeMulti.toFixed(3).slice(0, -1));

    const [changedTargetReturnValue, changeTargetReturnValue] = useState(
        initialTargetReturn ? parseFloat(initialTargetReturn) : 0
    );

    useEffect(() => {
        // Trigger changes
        store.dispatch(change('PORTFOLIO_FORM', `additionalContribution`, adAnualContribution));
        store.dispatch(change('PORTFOLIO_FORM', `timePeriod`, paymentPeriod));
    }, [adAnualContribution, paymentPeriod]);

    const onChangeSlider = e => {
        const value = e;
        store.dispatch(change('PORTFOLIO_FORM', `targetReturnValue`, value));
        // onChangeTRSliderValue();
    };

    const sliderMarks = {
        [minRangeMulti]: parseFloat(minRangeMulti.toFixed(3).slice(0, -1)),
        [maxRangeMulti]: parseFloat(maxRangeMulti.toFixed(3).slice(0, -1))
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="card">
                <div className="card-content">
                    <div className="content">
                        <Row className="input-row" gutter={20}>
                            <Col span={12} className="label-wrapper">
                                <span>Target return above gilts (net of fees)</span>
                            </Col>
                            <Col span={12} className="input-wrapper">
                                <Field
                                    disabled={stepFunctionpaInprogress} //{stepFunctionpaInprogress}
                                    name="targetReturnValue"
                                    className="form-control"
                                    component={NumberField}
                                    options={{ min: minVal, max: maxVal, decimalScale: 2 }}
                                    onChange={e => {
                                        changeTargetReturnValue(parseFloat(e));
                                    }}
                                    validate={required({ message: 'Required' })}
                                />
                                <span className="suffix">%</span>
                            </Col>
                        </Row>
                        {!stepFunctionpaInprogress && (
                            <Slider
                                min={minVal}
                                max={maxVal}
                                marks={sliderMarks}
                                onChange={onChangeSlider}
                                value={changedTargetReturnValue ? changedTargetReturnValue : 0}
                                tipFormatter={null}
                                step={0.01}
                            />
                        )}
                    </div>
                    {PROJECTFLAG === 'Y' && (
                        <div className="content special-content">
                            {/* <Row className="input-row" gutter={20}>
                <Col span={12} className="label-wrapper">
                  <span>Show approximate impact of additional contributions?</span>
                </Col>
                <Col span={12} className="input-wrapper">
                  <div className="field-group">
                    <span
                      onClick={() => changeShowDetails(true)}
                      className={`button-group ${show ? 'active' : null}`}
                    >
                      Yes
                    </span>
                    <span
                      onClick={() => changeShowDetails(false)}
                      className={`button-group ${!show ? 'active' : null}`}
                    >
                      No
                    </span>
                  </div>
                </Col>
              </Row> */}
                            {
                                <div>
                                    <Row className="input-row" gutter={20}>
                                        <Col span={12} className="label-wrapper">
                                            <span>Additional contributions (per annum)</span>
                                        </Col>
                                        <Col span={12} className="input-wrapper">
                                            <Field
                                                disabled={stepFunctionpaInprogress || PROJECTFLAG === 'N'}
                                                name="additionalContribution"
                                                className="form-control"
                                                component={CurrencyField}
                                                placeholder={''}
                                                options={{
                                                    // prefix: '£',
                                                    // suffix: 'pa',
                                                    props: {
                                                        precision: 0,
                                                        className: 'form-control'
                                                    }
                                                }}
                                            />
                                            <span className="prefix">£</span>
                                        </Col>
                                    </Row>
                                    <Row className="input-row" gutter={20}>
                                        <Col span={12} className="label-wrapper">
                                            <span>Payment period</span>
                                        </Col>
                                        <Col span={12} className="input-wrapper">
                                            <Field
                                                disabled={stepFunctionpaInprogress || PROJECTFLAG === 'N'}
                                                name="timePeriod"
                                                className="form-control"
                                                component={NumberField}
                                                validate={[
                                                    numericality({
                                                        int: false,
                                                        '>=': 0,
                                                        '<=': 100,
                                                        message: 'Invalid entry',
                                                        allowBlank: true
                                                    })
                                                ]}
                                                options={{
                                                    decimalScale: 2,
                                                    allowNegative: false,
                                                    min: 0,
                                                    max: 100
                                                }}
                                            />
                                            <span className="suffix">Years</span>
                                        </Col>
                                    </Row>
                                </div>
                            }
                        </div>
                    )}
                </div>
            </div>
        </form>
    );
};
PortFolioForm = reduxForm({
    form: 'PORTFOLIO_FORM'
})(PortFolioForm);
export default PortFolioForm;
