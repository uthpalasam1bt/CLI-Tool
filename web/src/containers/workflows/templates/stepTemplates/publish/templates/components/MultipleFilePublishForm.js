import React, { useState, useEffect } from 'react';
import { compose } from 'redux';
import { reduxForm, change, Field, getFormValues } from 'redux-form';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'antd';
import config from 'appConfig';
import _ from 'lodash';

import { CheckboxField, FileDownloader } from '../../../../../../../UILibrary/components/forms/fields';
import constants from '../../../../../constants';
import { convertArtifacts } from '../../../../../../../UILibrary/helpers/ArtifactConverter';

const { STATUS_DOCUMENT_PUBLISHED } = constants;
const { bucket: privateBucketName, publicBucket: publicBucketName } = config;

const MultipleFilePublishForm = props => {
    const {
        handleSubmit,
        documentConfig,
        documentData,
        formName,
        artifacts,
        downloadOptions: { api, isPublicBucket = false }
    } = props;

    const formValues = useSelector(getFormValues(formName));
    const dispatch = useDispatch();
    const [allchecked, setAllchecked] = useState(false);
    const [selectAllChecked, setSelectAllChecked] = useState(false);

    useEffect(() => {
        if (documentConfig && documentConfig.length !== 0 && formValues) {
            const fieldNames = documentConfig.map(doc =>
                Array.isArray(documentData[doc].urls) ? documentData[doc].urls.map(subDoc => subDoc.uid) : doc
            );

            const all = _.flattenDeep(fieldNames).every(name => formValues[name]);

            if (all) {
                setSelectAllChecked(true);
            } else {
                setSelectAllChecked(false);
            }
        }
    }, [formValues]);

    useEffect(() => {
        //all of the items are selected at initkvb
        if (documentConfig && documentConfig.length !== 0 && documentData) {
            documentConfig.map(doc => {
                if (documentData[doc].documentStatus === STATUS_DOCUMENT_PUBLISHED) {
                    dispatch(change(formName, doc, true));
                }
                if (Array.isArray(documentData[doc].urls)) {
                    documentData[doc].urls.map((docItem, key) => {
                        docItem.documentStatus === STATUS_DOCUMENT_PUBLISHED &&
                            dispatch(change(formName, docItem.uid, true));
                    });
                }
            });

            const allCheckedAtInit = documentConfig.every(doc =>
                Array.isArray(documentData[doc].urls)
                    ? documentData[doc].urls.every(subDoc => subDoc.documentStatus == STATUS_DOCUMENT_PUBLISHED)
                    : documentData[doc].documentStatus === STATUS_DOCUMENT_PUBLISHED
            );

            if (allCheckedAtInit) {
                setAllchecked(true);
                dispatch(change(formName, `selectAll`, true));
            } else {
                setAllchecked(false);
                dispatch(change(formName, `selectAll`, false));
            }
        } else {
            dispatch(change(formName, `selectAll`, false));
            setAllchecked(false);
        }
    }, [documentConfig, documentData]);

    const onChangeField = event => {
        documentConfig.map((doc, key) => {
            if (documentData[doc] && documentData[doc].url) {
                if (documentData[doc].documentStatus !== STATUS_DOCUMENT_PUBLISHED) {
                    dispatch(change(formName, doc, event));
                }
            }
            if (documentData[doc] && Array.isArray(documentData[doc].urls)) {
                documentData[doc].urls.map((docItem, key) => {
                    docItem.documentStatus !== STATUS_DOCUMENT_PUBLISHED &&
                        dispatch(change(formName, docItem.uid, event));
                });
            }
        });
    };

    const onChangeOtherFeild = (event, name) => {
        if (!event) {
            dispatch(change(formName, `selectAll`, event));
            dispatch(change(formName, name, event));
        }
    };

    return (
        documentData && (
            <form onSubmit={handleSubmit}>
                <div className="form-body">
                    {documentConfig.length > 1 ? (
                        <Row className="input-row checkbox-row">
                            <Col xl={14} lg={12} sm={12} xs={24} className="label-wrapper">
                                <label className="input-title">Select All</label>
                                <Field
                                    name="selectAll"
                                    checked={selectAllChecked}
                                    onChange={onChangeField}
                                    value="selectAll"
                                    component={CheckboxField}
                                    disabled={allchecked}
                                />
                            </Col>
                        </Row>
                    ) : null}

                    {documentConfig &&
                        documentConfig.map(
                            (doc, key) =>
                                documentData[doc] &&
                                (documentData[doc].url && documentData[doc].documentStatus ? (
                                    <Row className="input-row checkbox-row" key={key}>
                                        <Col xl={14} lg={12} sm={12} xs={24} className="label-wrapper">
                                            <label className="input-title">
                                                {convertArtifacts(documentData[doc].title, artifacts)}
                                            </label>
                                            <Field
                                                name={doc}
                                                value={doc}
                                                component={CheckboxField}
                                                checked={documentData[doc].documentStatus === STATUS_DOCUMENT_PUBLISHED}
                                                disabled={
                                                    documentData[doc].documentStatus === STATUS_DOCUMENT_PUBLISHED
                                                }
                                                onChange={e => {
                                                    onChangeOtherFeild(e, doc);
                                                }}
                                            />
                                        </Col>
                                        <Col xl={10} lg={12} sm={12} xs={24} className="pull-right">
                                            <div className="resource-wrapper">
                                                <FileDownloader
                                                    type="resource"
                                                    url={documentData[doc].url}
                                                    api={api}
                                                    bucketNameProp={
                                                        isPublicBucket ? publicBucketName : privateBucketName
                                                    }
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                ) : (
                                    Array.isArray(documentData[doc].urls) &&
                                    documentData[doc].urls.map((subDoc, subKey) => (
                                        <Row className="input-row checkbox-row" key={subKey}>
                                            <Col xl={14} lg={12} xs={24} className="label-wrapper">
                                                <label className="input-title">
                                                    {
                                                    
                                                    convertArtifacts(
                                                        documentData[doc].urls.length>1?documentData[doc].title.replace(/\%\w+\%/i, ' ' + (subKey + 1)):documentData[doc].title.replace(/\%\w+\%/i,''),
                                                        artifacts
                                                    )}
                                                </label>
                                                <Field
                                                    name={subDoc.uid}
                                                    component={CheckboxField}
                                                    checked={subDoc.documentStatus === STATUS_DOCUMENT_PUBLISHED}
                                                    disabled={subDoc.documentStatus === STATUS_DOCUMENT_PUBLISHED}
                                                    onChange={e => {
                                                        onChangeOtherFeild(e, subDoc.uid);
                                                    }}
                                                />
                                            </Col>
                                            <Col xl={10} lg={12} xs={24} className="pull-right">
                                                <div className="resource-wrapper">
                                                    <FileDownloader
                                                        type="resource"
                                                        url={subDoc.url}
                                                        api={api}
                                                        bucketNameProp={
                                                            isPublicBucket ? publicBucketName : privateBucketName
                                                        }
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                    ))
                                ))
                        )}
                </div>
            </form>
        )
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
)(MultipleFilePublishForm);
