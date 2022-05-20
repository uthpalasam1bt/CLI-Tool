/* 
This step template can be used to create a single page form data download component (simple form ) which contains form  fields
To create form fields,a form field configuration ( functional format) should pass to this component
*/

import React from 'react';

import { formFields } from './formConfig';
import DownloadUiTemplate from '../../../../workflows/templates/stepTemplates/downloads';
import connectApi from '../../../../../middlewares/connectApi';
import constants from '../../../../workflows/constants';
import { FORM_NAME, FORM_TITLE, FORM_I_ICON, DOWNLOAD_ZIP_NAME, EXCEL_TAB_NAME } from './constants'; //constants that are  used in this component creation

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
                    labelOverRide: {
                        /* 
                        developer can override the field names that has been  specified in the configuration file that passed 
                        to this component  and download that field data using a different name,
                        for that the developer has to pass the field name that has been speified in  the config as a key 
                        and a new name as a value to be override in this object

                        ***field name : new name***
                         */

                        hmrcDocument: 'Hmrc Document'
                    },
                    zipName: DOWNLOAD_ZIP_NAME, // name to the zip file that being downloaded using this component
                    excelTabNames: EXCEL_TAB_NAME, // tab name to the excel sheet
                    attachmentArray: [
                        /* 
                        developer can also download the documents and letters that has been uploaded 
                        to download the documents developer has to specify the uploaded field name in this array 
                        */
                        'hmrcDocument'
                    ]
                }}
                downloadOptions={{
                    /* 
                     contain the api's to download documents

                    */
                    api: connectApi
                }}
                disabled={true} // used to disable the fields in the component
                {...props} // props that are passed down to the child components
            />
        </>
    );
};

export default SimpleFormDataDownloadFunc;
