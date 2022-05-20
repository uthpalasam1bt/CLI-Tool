/*
This step template can be used to create approve reject container  which contains a tabs form.
This allowes to pass JSON or functional form configurations to create from fields in a particular tab.
*/

import React from 'react';

import { FORM_TITLE, FORM_I_ICON, FORM_NAME, TAB_ONE, TAB_TWO, DOWNLOAD_ZIP_NAME, EXCEL_TAB_NAME } from './constants';
import constants from '../../../workflows/constants';
import ApproveRejectContainer from '../../../workflows/templates/stepTemplates/approveReject';
import { formFields1 } from './formConfig1';
import { formFields2 } from './formConfig2';

const {
    APPROVE_REJECT_TYPE_TABS,
    BUTTON_TITLE_APPROVE,
    BUTTON_TITLE_REJECT,
    BUTTON_TITLE_DOWNLOAD,
    ON_APPROVE_MESSAGE,
    ON_REJECT_MESSAGE
} = constants;

let ApproveRejectTabForm = props => {
    //form tabs data
    const formTabs = [
        {
            tabKey: TAB_ONE.KEY, //a unique key for the tab
            tabName: TAB_ONE.NAME, //name to display in tab header
            formFieldFunction: formFields1 //passing functional form configuration
        },
        {
            tabKey: TAB_TWO.KEY,
            tabName: TAB_TWO.NAME,
            formFieldFunction: formFields2
        }
    ];
    return (
        <>
            {/* ApproveRejectContainer is used to approve or reject documents. It has two types
                and here it uses the APPROVE_REJECT_TYPE_TABS type. */}

            <ApproveRejectContainer
                formType={APPROVE_REJECT_TYPE_TABS} //type of the ApproveRejectContainer (tabs)
                formTabs={formTabs} //tabs data
                formName={FORM_NAME} //name of the redux form
                baseDocument={TAB_ONE.DOC} //name of the main document to approve or reject
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
                    onApproveMessage: ON_APPROVE_MESSAGE, //message to display after approving the document
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
                    excelFileName: 'IAA Request details', //downloaded excel file name
                    attachmentArray: [
                        /* 
                        developer can also download the documents and letters that has been uploaded 
                        to download the documents developer has to specify the uploaded field name in this array 
                        */
                        'hmrcDocument'
                    ]
                }}
                disabled={true}
                {...props}
            />
        </>
    );
};

export default ApproveRejectTabForm;
