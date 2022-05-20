/*
     This step template can be used to create simple forms.
     To create form fields a form field configuration (either in JSON or functional format) should pass to this component.
 
*/
import React from 'react';
import _ from 'lodash';
import config from 'appConfig';

import DownloadUiTemplate from '../../../../workflows/templates/stepTemplates/downloads';
import { formFields } from './formConfig';
import { OnSubmitHook } from './hooks';
import connectApi from '../../../../../middlewares/connectApi';

import { FORM_NAME, FORM_TITLE, FORM_I_ICON } from './constants';
import constants from '../../../../../UILibrary/constants';

const { bucket: privateBucket } = config;
const { BUTTON_TITLE_CONTINUE, BUTTON_TITLE_DOWNLOAD, DOWNLOAD_FORM_DATA_ZIP_TYPE_SIMPLE_WITH_DATA_CHANGE } = constants;

let SimpleForm = props => {
    return (
        <>
            <DownloadUiTemplate
                formName={FORM_NAME} // name of the form
                formFieldFunction={formFields} //Use to pass functional configuration
                downloadType={DOWNLOAD_FORM_DATA_ZIP_TYPE_SIMPLE_WITH_DATA_CHANGE} //Use to get formType single or tab
                formHooks={{
                    // custom hooks to handle validation before submitting the form
                    ...OnSubmitHook
                }}
                options={{
                    //Use to mention other neccerssary properties need to be pass to create form
                    title: FORM_TITLE, // Use display a title in the header
                    titleIicon: FORM_I_ICON, //The value of the tooltip icon in the header
                    saveButton: false,
                    submitButton: {
                        //Display name of the submit button
                        title: BUTTON_TITLE_CONTINUE
                    },
                    downloadButton: {
                        title: BUTTON_TITLE_DOWNLOAD //download button title
                    },
                    onSubmitMessage: '', //Use to add message that display when submit form data
                    fetchEntityDataAfterSubmit: false, //Use when need scheme data after submiting
                    navigateAfterSubmit: false // Use to stop navigate to another place after submit form data
                }}
                downloadOptions={{
                    api: connectApi,
                    bucketName: privateBucket,
                    forceDownloadLink: true,
                    link: _.get(props, `dataset.documents.ConsultationSponsor.url`, true)
                }}
                {...props}
            />
        </>
    );
};

export default SimpleForm;
