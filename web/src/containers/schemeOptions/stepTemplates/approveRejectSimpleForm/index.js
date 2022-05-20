/*
This step template can be used to create approve reject container  which contains a simple form.
This allowes to pass JSON or functional form configurations to create from fields.
*/

import React from 'react';

import ApproveRejectContainer from '../../../workflows/templates/stepTemplates/approveReject';
import { formFields } from './formConfig';
import { FORM_TITLE, FORM_I_ICON, FORM_NAME, DOC_NAME,DOWNLOAD_ZIP_NAME,EXCEL_TAB_NAME } from './constants';
import constants from '../../../workflows/constants';

const {
    APPROVE_REJECT_TYPE_SIMPLE,
    BUTTON_TITLE_APPROVE,
    BUTTON_TITLE_REJECT,
    BUTTON_TITLE_DOWNLOAD,
    ON_APPROVE_MESSAGE,
    ON_REJECT_MESSAGE,
    CONTENT_POSITION_CENTER
} = constants;

let ApproveRejectSimpleForm = props => {
    return (
        <>
            <ApproveRejectContainer
                formType={APPROVE_REJECT_TYPE_SIMPLE} //type of the ApproveRejectContainer (simple)
                documentName={DOC_NAME} //name of the document you need to approve or reject
                formOptions={{
                    //options that requires to generate the form
                    formName: FORM_NAME, //name of the redux form
                    formFieldFunction: formFields //passing functional form configuration
                }}
                options={{
                    //necessary properties need to be passed down to create form header
                    title: FORM_TITLE, //a title to display in the header.
                    titleIicon: FORM_I_ICON, //the value of the tooltip icon in the header.
                    rejectButton: {
                        title: BUTTON_TITLE_REJECT //reject button title
                    },
                    approveButton: {
                        title: BUTTON_TITLE_APPROVE //approve button title
                    },
                    downloadButton: {
                        title: BUTTON_TITLE_DOWNLOAD //download button title
                    },
                    onRejectMessage: ON_REJECT_MESSAGE, //message to display after rejecting the document
                    onApproveMessage: ON_APPROVE_MESSAGE ,//message to display after approving the document
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
                    excelFileName: 'IAA Request details',//downloaded excel file name
                    attachmentArray: [
                        /* 
                        developer can also download the documents and letters that has been uploaded 
                        to download the documents developer has to specify the uploaded field name in this array 
                        */
                        'hmrcDocument'
                    ]
                }}
                downloadOptions={{
                    isPublicBucket: false //use to choose download bucket is publicBucket or privateBucket
                }}
                contentPosition={CONTENT_POSITION_CENTER} // adjust content to center or top using CONTENT_POSITION_CENTER or CONTENT_POSITION_TOP
                {...props}
            />
        </>
    );
};

export default ApproveRejectSimpleForm;
