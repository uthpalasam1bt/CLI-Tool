/* 
This step template can be used to create a tab form data download component using Functional config (tab form ) which contains tabs 
To create tabs ,a tab configuration ( formTabs) should pass to this component
inside the tab configuration the devloper can define the formfields for each tab should contain by passing a functional config
*/

import React from 'react';

import { formFields } from './formConfig';
import DownloadUiTemplate from '../../../../workflows/templates/stepTemplates/downloads';
import connectApi from '../../../../../middlewares/connectApi';
import uiLibConstants from '../../../../../UILibrary/constants';
import constants from '../../../../workflows/constants';
import { FORM_NAME, FORM_TITLE, FORM_I_ICON, DOWNLOAD_ZIP_NAME, EXCEL_TAB_NAME, EXCEL_FILE_NAME } from './constants'; //constants that are  used in this template creation

const { DOWNLOAD_FORM_DATA_ZIP_TYPE_SIMPLE } = uiLibConstants;
const { BUTTON_TITLE_CONTINUE } = constants;

const SimpleFormDataDownloadFunc = props => {
    return (
        <>
            <DownloadUiTemplate
                downloadType={DOWNLOAD_FORM_DATA_ZIP_TYPE_SIMPLE} // specifying the component tyoe to be tabs form
                formFieldFunction={formFields} // passing the formTabs array which contains the configuration for the components to be created in each tab
                formName={FORM_NAME} // form name
                options={{
                    title: FORM_TITLE, // title to display in the header
                    titleIicon: FORM_I_ICON, // description to the icon in the header
                    submitButton: {
                        // contains the properties to the continue button displayed in the header
                        title: BUTTON_TITLE_CONTINUE // text to the continue button
                    },
                    zipName: DOWNLOAD_ZIP_NAME, // name to the zip file that being downloaded using this component
                    excelTabName: EXCEL_TAB_NAME, // tab name to the excel sheet
                    excelFileName: EXCEL_FILE_NAME,
                    attachmentArray: [
                        /* 
                        developer can also download the documents and letters that has been uploaded 
                        to download the documents developer has to specify the uploaded field name in this array 
                        */
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
