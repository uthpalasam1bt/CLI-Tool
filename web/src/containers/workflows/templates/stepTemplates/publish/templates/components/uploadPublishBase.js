import React, { useState } from 'react';
import config from 'appConfig';
import { Col, Row } from 'antd';
import { connect } from 'react-redux';
import { required } from 'redux-form-validators';
import { compose } from 'redux';
import { Field } from 'redux-form';
import _ from 'lodash';

import { convertArtifacts } from '../../../../../../../UILibrary/helpers/ArtifactConverter';
import { FileUploader } from '../../../../../../../UILibrary/components/forms/fields';
import connectApi from '../../../../../../../middlewares/connectApi';
import PDFViewer from '../../../../../../../components/scheme/registration/PDFViewer';
import AwsIotSingleton from '../../../../../../../helpers/awsIot';
import { internal_stepAction_inProgress } from '../../../../../actions/stepDataActions';

const { bucket: privateBucketName, publicBucket: publicBucketName } = config;

const UploadPublishBase = props => {
    const { dataset, formFieldFunction, artifacts, documentName, documentUrl, formSubmit, disabled,internal_stepAction_inProgress } = props;
    const [generateState, changeGenerateState] = useState(false);

    let filePath = _.get(dataset, `documents.${documentName}.path`);
    const excludeUrls = ['', '[]', null];

    const onChangeField = url => {
        if (documentName) {
            if (!url || excludeUrls.includes(url)) {
                formSubmit({ [documentName]: null }, null, null, generateState);
            } else {
                formSubmit({ [documentName]: url }, null, null, generateState);
            }
        }
    };

    const onClick = event => {
        changeGenerateState(event);
    };

    return (
        <>
            {formFieldFunction.map(element => {
                const { field, label } = element;
                const bucketName = field.options.isPublic ? publicBucketName : privateBucketName;

                return (
                    <Row className="input-row">
                        <Col xl={14} lg={12} xs={24} className="label-wrapper">
                            <label className="input-title">{convertArtifacts(label, artifacts)}</label>
                        </Col>
                        <Col xl={10} lg={12} xs={24} className="pull-right">
                            <div className="buttons-holder">
                                <Field
                                    name={field.name}
                                    className="form-control"
                                    component={FileUploader}
                                    options={{
                                        ...field.options,
                                        path: filePath,
                                        bucketName,
                                        api: connectApi
                                    }}
                                    validate={required()}
                                    disabled={field.disabled || disabled}
                                    generate={field.generate}
                                    disableduploadonly={!documentUrl ? false : true}
                                    generateoptions={{
                                        ...field.generateoptions,
                                        disabled: field.generateoptions.disabled || disabled
                                    }}
                                    actionInProgress={state => internal_stepAction_inProgress(state)}
                                    socketOptions={{
                                        subscribeToSocket: AwsIotSingleton.getPayloadFromSocket,
                                        unsubscribeFromSocket: AwsIotSingleton.unsubscribeSocket
                                    }}
                                    onChange={e => onChangeField(e)}
                                    onClick={onClick}
                                />
                            </div>
                        </Col>
                    </Row>
                );
            })}
            {documentUrl ? (
                <div className="doc-preview-container">
                    <div>
                        <PDFViewer documentURL={documentUrl} />
                    </div>
                </div>
            ) : null}
        </>
    );
};
const mapDispatchToProps = dispatch => ({
    internal_stepAction_inProgress: payload => {
        dispatch(internal_stepAction_inProgress(payload));
    }
});

export default compose(
    connect(
        null,
        mapDispatchToProps
    )
)(UploadPublishBase);
