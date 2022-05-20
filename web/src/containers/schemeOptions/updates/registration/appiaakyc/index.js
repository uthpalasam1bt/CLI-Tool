import React, { useState } from 'react';

import ApproveRejectContainer from '../../../../workflows/templates/stepTemplates/approveReject';
import { formFields } from './formConfig';
import { FORM_TITLE, FORM_I_ICON, FORM_NAME } from './constants';
import constants from '../../../../workflows/constants';

const {
    APPROVE_REJECT_TYPE_SIMPLE,
    BUTTON_TITLE_APPROVE,
    BUTTON_TITLE_REJECT,
    BUTTON_TITLE_DOWNLOAD,
    ON_APPROVE_MESSAGE,
    ON_REJECT_MESSAGE
} = constants;

let ApproveTrusteeKycComponent = props => {
    const [activeTrusteeTab, setActiveTrusteeTab] = useState('individual');

    const onchangeTrusteeTabs = tabKey => {
        setActiveTrusteeTab(tabKey);
    };

    return (
        <>
            <ApproveRejectContainer
                formType={APPROVE_REJECT_TYPE_SIMPLE}
                documentName="TRUSTEE"
                formOptions={{
                    //options that requires to generate the form
                    formName: FORM_NAME, //name of the redux form
                    formFieldFunction: formFields,
                    disabled: true
                }}
                options={{
                    title: FORM_TITLE,
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
                    onRejectMessage: ON_REJECT_MESSAGE,
                    onApproveMessage: ON_APPROVE_MESSAGE,
                    zipName: 'IAA_KYC_AML information',
                    excelFileName: 'IAA Request details',
                    excelTabName: 'IAA Requset Data',
                    labelOverRide: {
                        trustDeed: 'Deed_Of_Trustee',
                        schemeAccount: 'Scheme_Accounts',
                        otherDocuments: 'Other_Documents',
                        hmrcDocument: 'Hmrc_Reg',
                        certificateOfIncorporation: 'certificate_of_incorporation'
                    },
                    attachmentArray: [
                        'trustDeed',
                        'schemeAccount',
                        'otherDocuments',
                        'hmrcDocument',
                        'certificateOfIncorporation'
                    ]
                }}
                downloadOptions={{
                    isPublicBucket: false
                }}
                metaProps={{
                    // these props will be used in form configs and hooks
                    activeTrusteeTab: activeTrusteeTab,
                    onchangeTrusteeTab: onchangeTrusteeTabs
                }}
                {...props}
            />
        </>
    );
};

export default ApproveTrusteeKycComponent;
