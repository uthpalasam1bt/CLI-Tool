import React, { useEffect, useState } from 'react';
import { reduxForm, getFormValues, Field, change, initialize } from 'redux-form';
import { compose } from 'redux';
import { connect, useDispatch, useSelector } from 'react-redux';
import config from 'appConfig';
import _ from 'lodash';

import FormBase from '../../../../../../UILibrary/components/forms/formBase/FormBase';

import constants from '../../../../constants';
import { Col, Radio, Row } from 'antd';
import { FileUploader, FormField, SelectOptions } from '../../../../../../UILibrary/components/forms/fields';
import uiconstants from '../../../../../../UILibrary/constants';
import PDFViewer from '../../../../../../components/scheme/registration/PDFViewer';
import connectApi from '../../../../../../middlewares/connectApi';
import { internal_stepAction_inProgress } from '../../../../actions/stepDataActions';

const { bucket: bucketName } = config;

const { FORM_TEMPLATES, FORM_FIELDS } = uiconstants;
const {
    BUTTON_GROUP,
    DATE_PICKER,
    CURRENCY_FIELD,
    NUMBER_FIELD,
    ASSETS_VALUE_SEPARATOR,
    SELECT_OPTION,
    FILE_UPLOADER
} = uiconstants;

const FieldBase = props => {
    const { field, disabled, selectedDocType, formName } = props;

    const dispatch = useDispatch();

    useEffect(() => {
        if (field && field.selectOptionField) {
            dispatch(change(formName, field.selectOptionField.fieldName, field.selectOptionField.options.defaultValue));
        }
    }, [JSON.stringify(field)]);
    return (
        <>
            <Row>
                <div class="pull-right pr-4 input-row">
                    <div className="input-wrapper mw-100">
                        <div className="row" style={{ flexWrap: 'initial' }}>
                            {field && field.selectOptionField && (
                                <div style={{ marginRight: '16px' }}>
                                    <Field
                                        component={SelectOptions}
                                        name={field.selectOptionField.fieldName}
                                        options={field.selectOptionField.options}
                                        disabled={
                                            selectedDocType !== field.radioButtonName ||
                                            field.selectOptionField.disabled
                                        }
                                    />
                                </div>
                            )}
                            {field && field.uploadField && (
                                <Field
                                    component={FileUploader}
                                    options={{ ...field.uploadField.options, bucketName, api: connectApi }}
                                    generate={field.uploadField.generate}
                                    onChange={field.uploadField.onChange}
                                    name={field.uploadField.fieldName}
                                    uploadSuccessCallback={ _.get(field.uploadField,'uploadSuccessCallback',null) }
                                    disabled={selectedDocType !== field.radioButtonName || field.uploadField.disabled}
                                    actionInProgress={state => dispatch(internal_stepAction_inProgress(state))}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </Row>
        </>
    );
};

const SimpleUploadSelectBase = props => {
    const { formFields, formName, selectedDocType, defaultSelectedDocType } = props;
    const dirtyFormValues = useSelector(getFormValues(formName));
    const [showPdfViewer, setShowPdfViewer] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        if (defaultSelectedDocType) {
            dispatch(change(formName, 'radio', defaultSelectedDocType));
        }
    }, [defaultSelectedDocType]);

    useEffect(() => {
        if (dirtyFormValues) {
            renderPDFViewer();
        }
    }, [dirtyFormValues]);

    const renderPDFViewer = () => {
        const docUrl = selectedDocType && dirtyFormValues && dirtyFormValues[selectedDocType];
        if (!docUrl) return null;
        return <div className="doc-preview-container">{showPdfViewer && <PDFViewer documentURL={docUrl} />}</div>;
    };

    //pdf viewer does not create signed urls on prop update, its risky to change the pdf viewer
    //so we remount the component to trigger getsignurl within pdf viewer.
    const rerenderPdfViewer = () => {
        setShowPdfViewer(false);
        setTimeout(() => {
            setShowPdfViewer(true);
        }, 1000);
    };

    return (
        <>
            {formFields &&
                formFields.length > 0 &&
                formFields.map(field => {
                    return (
                        <Row gutter={20} className="custom-row">
                            <Col xl={6} xs={6}>
                                <Radio
                                    value={field.radioButtonName}
                                    name={field.radioButtonName}
                                    checked={field.radioButtonName === selectedDocType}
                                    onChange={event => {
                                        if (event.target.checked) {
                                            dispatch(change(formName, 'radio', event.target.name));
                                            rerenderPdfViewer();
                                        }
                                    }}
                                    disabled={field.disabled}
                                >
                                    <span className="custom-text" style={{ fontSize: '14px' }}>
                                        {field.label}
                                    </span>
                                </Radio>
                            </Col>
                            <Col xl={18} xs={18}>
                                <FieldBase field={field} {...props} />
                            </Col>
                        </Row>
                    );
                })}

            <>{renderPDFViewer()}</>
        </>
    );
};

const UploadSelectBase = props => {
    const { handleSubmit, className, formFieldData, onSubmit } = props;
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-body">
                <SimpleUploadSelectBase formFields={formFieldData} {...props} />
            </div>
        </form>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
        form: ownProps.formName
    };
};

export default compose(
    connect(mapStateToProps),
    reduxForm({})
)(UploadSelectBase);
