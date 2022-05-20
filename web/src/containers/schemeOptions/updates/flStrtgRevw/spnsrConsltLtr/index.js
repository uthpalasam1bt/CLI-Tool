/*
     This step template can be used to create simple forms.
     To create form fields a form field configuration (either in JSON or functional format) should pass to this component.
 
*/
import React from 'react';
import config from 'appConfig';
import _ from 'lodash';

import DownloadUiTemplate from '../../../../workflows/templates/stepTemplates/downloads';
import { formFields } from './formConfig';
import connectApi from '../../../../../middlewares/connectApi';
import { OnSubmitHook } from './hooks';

import constants from '../../../../../UILibrary/constants';
import { FORM_NAME, FORM_TITLE, FORM_I_ICON } from './constants';

const { bucket: privateBucket } = config;
const {
    FORM_TYPE_SINGLE_PAGE,
    BUTTON_TITLE_SAVE,
    BUTTON_TITLE_REQUEST,
    BUTTON_TITLE_CONTINUE,
    BUTTON_TITLE_DOWNLOAD,
    ON_SAVE_MESSAGE,
    ON_SUBMIT_MESSAGE,
    DOWNLOAD_FORM_DATA_ZIP_TYPE_SIMPLE_WITH_DATA_CHANGE
} = constants;

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
                    // saveButton: {
                    //     // Display name of the save button
                    //     title: BUTTON_TITLE_SAVE
                    // },
                    submitButton: {
                        //Display name of the submit button
                        title: BUTTON_TITLE_CONTINUE
                    },
                    downloadButton: {
                        title: BUTTON_TITLE_DOWNLOAD //download button title
                    },
                    onSubmitMessage: ON_SUBMIT_MESSAGE,
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
