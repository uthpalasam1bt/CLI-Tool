/*
This step template can be used to create an approval rejection container
 that displays multiple documents on particular tabs.
*/

import React from 'react';

import { FORM_TITLE, FORM_I_ICON, TAB_ONE, TAB_TWO, FORM_NAME } from './constants';
import constants from '../../../workflows/constants';
import ApproveRejectContainer from '../../../workflows/templates/stepTemplates/approveReject';

const {
    APPROVE_REJECT_TYPE_TABS,
    BUTTON_TITLE_APPROVE,
    BUTTON_TITLE_REJECT,
    BUTTON_TITLE_DOWNLOAD,
    ON_APPROVE_MESSAGE,
    ON_REJECT_MESSAGE
} = constants;

let ApproveRejectTabDoc = props => {
    //form tabs data
    const formTabs = [
        {
            tabKey: TAB_ONE.KEY, //a unique key for the tab
            tabName: TAB_ONE.NAME, //name to display in tab header
            documentName: TAB_ONE.DOC //name of the document which need to display in this tab
        },
        {
            tabKey: TAB_TWO.KEY,
            tabName: TAB_TWO.NAME,
            documentName: TAB_TWO.DOC
        }
    ];
    return (
        <>
            {/* ApproveRejectContainer is used to approve or reject documents. It has two types
                and here it uses the APPROVE_REJECT_TYPE_TABS type. */}

            <ApproveRejectContainer
                formType={APPROVE_REJECT_TYPE_TABS} //type of the ApproveRejectContainer(tab)
                formTabs={formTabs} //tabs data
                formName={FORM_NAME} //name of the redux form *Required
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
                    onApproveMessage: ON_APPROVE_MESSAGE //message to display after approving the document
                }}
                {...props}
            />
        </>
    );
};

export default ApproveRejectTabDoc;
