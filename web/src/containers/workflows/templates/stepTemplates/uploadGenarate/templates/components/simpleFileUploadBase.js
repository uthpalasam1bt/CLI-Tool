import React, { useEffect, useState } from 'react';
import { getFormValues } from 'redux-form';
import { useSelector, connect } from 'react-redux';
import { Row, Col } from 'antd';
import { Field } from 'redux-form';
import _ from 'lodash';
import config from 'appConfig';

import { FileUploader, MultipleFileUploader } from '../../../../../../../UILibrary/components/forms/fields';
import connectApi from '../../../../../../../middlewares/connectApi';
import { convertArtifacts } from '../../../../../../../UILibrary/helpers/ArtifactConverter';
import ValidationModule from '../../../../../../../UILibrary/validation-module';
import { internal_stepAction_inProgress } from '../../../../../actions/stepDataActions';
import AwsIotSingleton from '../../../../../../../helpers/awsIot';
import ClaimHelper from '../../../../../../../helpers/claimHelper';

const { bucket: privateBucketName, publicBucket: publicBucketName, generateBucket: generateBucketName } = config;

const UploaderComponent = ({ element, onChangeField, onClick, document = {}, artifacts, handleLoader, ...rest }) => {
  
    const { label, field } = element;
    let filePath = _.get(document, `path`);
    const bucketName = field.options.isPublic ? publicBucketName : privateBucketName;

    if (field && field.validationModules) {
        const validations = ValidationModule.formFieldValidations(field.validationModules);
        if (validations) {
            delete field.validationModules;
            field.validate = validations;
        }
    }

    //checking the user has the claim to generate
    if (field && field.generateoptions) _.set(field, 'generateoptions.haveClaim', !ClaimHelper.checkIfUserHasClaim(_.get(rest, 'props.step.claims.SA_DOC_UPLOAD', "")))

    return (
        <Row className="input-row">
            <Col xl={12} lg={12} xs={24} className="label-wrapper">
                <label className="input-title">{convertArtifacts(label, artifacts)}</label>
            </Col>
            <Col xl={10} lg={12} xs={24} className="pull-right">
                <div className="buttons-holder">
                    <Field
                        name={field.name}
                        className="form-control"
                        component={field.isMultiple ? MultipleFileUploader : FileUploader}
                        options={{ ...field.options, path: filePath, bucketName, api: connectApi }}
                        validate={field.validate}
                        disabled={field.disabled || !ClaimHelper.checkIfUserHasClaim(_.get(rest, 'props.step.claims.SA_DOC_UPLOAD', ""))}
                        generate={field.generate}
                        disableduploadonly={field.disableduploadonly}
                        generateoptions={field.generateoptions}
                        onChange={e => onChangeField(e, field.name, false)}
                        onClick={onClick}
                        actionInProgress={handleLoader}
                        socketOptions={{
                            subscribeToSocket: AwsIotSingleton.getPayloadFromSocket,
                            unsubscribeFromSocket: AwsIotSingleton.unsubscribeSocket
                        }}
                    />
                    {field.isMultiple && (
                        <button className="btn btn-generate" disabled>
                            <i className="fa fa-cog icon"></i> Generate
                        </button>
                    )}
                </div>
            </Col>
        </Row>
    );
};

const SimpleFileUploadBase = props => {
    const { formFields: json, dataset, formSubmit, formName, artifacts, internal_stepAction_inProgress } = props;
    
    const [generateState, changeGenerateState] = useState(false);
    const [documents, setDocuments] = useState({});
    const [documentJson, setDocumentsJson] = useState([]);
    const dirtyFormValues = useSelector(getFormValues(formName));
    const excludeUrls = ['', null];

    useEffect(() => {
        if (dataset && dataset.documents) {
            setDocuments(dataset.documents);
        }
    }, [dataset]);

    useEffect(() => {
        if (json && json.length && documents) {
            const setOrderArray = json.map(item => {
                if (_.get(item, 'field.name') && documents[_.get(item, 'field.name')] && documents[_.get(item, 'field.name')].order) {
                    item.order = documents[_.get(item, 'field.name')].order;
                    return item
                } else {
                    return item
                }
            })

            const orderedArray = _.orderBy(setOrderArray, ['order'], ['asc']);
            setDocumentsJson(orderedArray);
        }
    }, [json, documents]);

    const isMultiDocRemoved = (url = []) => {
        return url.every(x => _.has(x, 'documentStatus'));
    };

    const onChangeField = (url, name, workflowUpdate, prevUrl) => {
        const oldFiles = {
            ...dirtyFormValues,
            remove:
                excludeUrls.includes(url) ||
                (Array.isArray(url) && url.length == 0) ||
                (Array.isArray(url) && url.length > 0 && isMultiDocRemoved(url))
                    ? true
                    : false
        };
        formSubmit(
            { ...oldFiles, [name]: url === '' || !url ? null : url },
            null,
            null,
            workflowUpdate,
            generateState,
            name
        );
    };

    const onClick = event => {
        changeGenerateState(event);
    };

    return (
        <>
            {documentJson.map(element => {
                if (_.has(element, 'rawComponent')) {
                    return (
                        <>{element.rawComponent}</>
                    )
                } else {
                    const doc = _.get(documents, `${element.field.name}`, {});
                    return (
                        Object.keys(doc).length > 0 && (
                            <UploaderComponent
                                element={element}
                                onChangeField={onChangeField}
                                onClick={onClick}
                                document={doc}
                                artifacts={artifacts}
                                handleLoader={state => internal_stepAction_inProgress(state)}
                               {...props}
                            />
                        )
                    );
                }
            })}
        </>
    );
};

const mapDispatchToProps = dispatch => ({
    internal_stepAction_inProgress: payload => {
        dispatch(internal_stepAction_inProgress(payload));
    }
});

export default connect(
    null,
    mapDispatchToProps
)(SimpleFileUploadBase);
