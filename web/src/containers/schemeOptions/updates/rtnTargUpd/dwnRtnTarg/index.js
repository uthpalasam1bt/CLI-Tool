/* 
This step template can be used to create a single page form data download component (simple form ) which contains form  fields
To create form fields,a form field configuration ( functional format) should pass to this component
*/

import React from 'react';

import { formFields } from './formConfig';
import DownloadUiTemplate from '../../../../workflows/templates/stepTemplates/downloads';
import connectApi from '../../../../../middlewares/connectApi';
import constants from '../../../../workflows/constants';
import {
    FORM_NAME,
    FORM_TITLE,
    FORM_I_ICON,
    DOWNLOAD_ZIP_NAME,
    EXCEL_TAB_NAME,
    ON_SUBMIT_MESSAGE_RTN, EXCEL_FILE_NAME
} from './constants';

const { BUTTON_TITLE_CONTINUE, DOWNLOAD_FORM_DATA_ZIP_TYPE_SIMPLE } = constants; // constants that are commonly used in all other components

let SimpleFormDataDownloadFunc = props => {
    return (
        <>
            <DownloadUiTemplate
                downloadType={DOWNLOAD_FORM_DATA_ZIP_TYPE_SIMPLE} // specifying the component type to be simple form
                formFieldFunction={formFields} // functional configuration to create the form fields in the template
                formName={FORM_NAME} // form name
                options={{
                    title: FORM_TITLE, // title to display in the header
                    titleIicon: FORM_I_ICON, // description to the icon in the header
                    submitButton: {
                        // contains the properties to the continue button displayed in the header
                        title: BUTTON_TITLE_CONTINUE // text to the continue button
                    },
                    onSubmitMessage: ON_SUBMIT_MESSAGE_RTN,
                    labelOverRide: {},
                    zipName: DOWNLOAD_ZIP_NAME,
                    excelFileName: EXCEL_FILE_NAME, // name to the zip file that being downloaded using this component
                    excelTabName: EXCEL_TAB_NAME, // tab name to the excel sheet
                    attachmentArray: []
                }}
                downloadOptions={{
                    api: connectApi
                }}
                disabled={true} // used to disable the fields in the component
                {...props} // props that are passed down to the child components
            />
        </>
    );
};

export default SimpleFormDataDownloadFunc;
