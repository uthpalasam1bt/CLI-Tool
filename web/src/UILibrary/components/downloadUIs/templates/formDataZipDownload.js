import React, { useState, useEffect } from 'react';
import { compose } from 'redux';
import { getFormValues, submit, initialize, getFormSyncErrors } from 'redux-form';
import { useDispatch, useSelector, connect } from 'react-redux';
import _ from 'lodash';

import constants from '../../../constants';
import FormGenerator from '../../forms/formBase';
import FormHeaderComponent from '../../forms/formHeader';
import { simpleFormDataDownloader } from '../../../helpers/FormDownloadHelper';
import { downloadFile } from '../../../helpers/fileDownloadHelper';

const {
    GENERATE_FORMS_TYPE_SIMPLE,
    BUTTON_TITLE_DOWNLOAD,
    BUTTON_TITLE_REQUEST,
    SUBMIT_ACTION,
    FORM_ACTION_TYPES
} = constants;

let SimpleFormDataDownload = props => {
    const {
        formFieldData,
        formFieldFunction,
        formName,
        formHooks,
        options: {
            title = null,
            titleIicon = null,
            downloadButton = true,
            submitButton = true,
            labelOverRide = {},
            zipName = 'scheme',
            excelTabName = 'tab1',
            excelFileName = 'request',
            attachmentArray = []
        },
        action_inProgress,
        dataset,
        handleFormSubmit,
        submitAction = SUBMIT_ACTION,
        disabled = true,
        downloadOptions: { api, bucketName = null, forceDownloadLink = false, link = null },
        artifacts
    } = props;

    const dispatch = useDispatch();
    const dirtyFormValues = useSelector(getFormValues(formName));
    const [downloadInProgress, setDownloadInProgress] = useState(false);

    useEffect(() => {
        if (dataset && dataset.formData) {
            dispatch(initialize(formName, dataset.formData));
        }
    }, [dataset]);

    const handleDownload = async () => {
        setDownloadInProgress(true);
        try {
            if (forceDownloadLink) {
                await downloadFile({ url: link, bucketNameProp: bucketName, api });
            } else {
                await simpleFormDataDownloader(
                    dirtyFormValues,
                    formFieldData
                        ? formFieldData
                        : formFieldFunction
                            ? formFieldFunction({ ...dirtyFormValues, ...props })
                            : null,
                    api,
                    bucketName,
                    labelOverRide,
                    zipName,
                    excelFileName,
                    excelTabName,
                    attachmentArray,
                    artifacts
                );
            }
            setDownloadInProgress(false);
        } catch (e) {
            setDownloadInProgress(false);
        }
    };

    const formSubmit = submissionType => {
        let message = null;

        handleFormSubmit(submissionType, { formData: dataset && dataset.formData }, () => { }, message, true);
    };

    const formHeaderProps = {
        title: title,
        iIconText: titleIicon,
        actions: [
            ...(downloadButton
                ? [
                      {
                          type: FORM_ACTION_TYPES.DOWNLOAD,
                          title: downloadButton.title || BUTTON_TITLE_DOWNLOAD,
                          state: { inProgress: downloadInProgress },
                          onClick: () => {
                              handleDownload();
                          },
                          bool: downloadButton.showButton
                      }
                  ]
                : []),
            ...(submitButton
                ? [
                      {
                          type: FORM_ACTION_TYPES.SUBMIT,
                          title: submitButton.title || BUTTON_TITLE_REQUEST,
                          state: {
                              inProgress: action_inProgress
                          },
                          onClick: () => {
                              formSubmit(submitAction);
                          },
                          bool: submitButton.showButton,
                          disabled: _.get(submitButton, 'disabled', false)
                      }
                  ]
                : [])
        ],
        artifacts: artifacts
    };

    return (
        <>
            <FormHeaderComponent {...formHeaderProps} />
            <FormGenerator
                formType={GENERATE_FORMS_TYPE_SIMPLE}
                className="generate-iaa-manager-letters-form"
                onSubmit={() => {}}
                name={formName}
                formFieldData={
                    formFieldData
                        ? formFieldData
                        : formFieldFunction
                        ? formFieldFunction({ ...dirtyFormValues, ...props })
                        : null
                }
                disabled={disabled}
                formHooks={formHooks}
                artifacts={artifacts}
            />
        </>
    );
};

const mapStateToProps = (state, ownProps) => ({
    simpleFormData: getFormValues(ownProps.formName)(state),
    asyncErrors: getFormSyncErrors(ownProps.formName)(state)
});

const mapDispatchToProps = dispatch => ({
    submitSimpleForm: formName => {
        dispatch(submit(formName));
    }
});
export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(SimpleFormDataDownload);
