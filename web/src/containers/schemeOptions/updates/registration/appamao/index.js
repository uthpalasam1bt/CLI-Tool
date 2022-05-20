import React, { useState } from 'react';

import ApproveRejectContainer from '../../../../workflows/templates/stepTemplates/approveReject';
import {
    FORM_TITLE,
    FORM_I_ICON,
    FORM_NAME,
    INVESTMENT_FORM_SECTION,
    ADMIN_FORM_SECTION,
    IM_FEE_FORM_SECTION
} from './constants';
import constants from '../../../../workflows/constants';
import { InvestmentFormSection } from './investmentFormSection';
import { AdminFormSection } from './adminFormSection';
import { ImFormSection } from './imFormSection';
import { OnApproveHooks } from './hooks';

const {
    APPROVE_REJECT_TYPE_TABS,
    BUTTON_TITLE_APPROVE,
    BUTTON_TITLE_REJECT,
    BUTTON_TITLE_DOWNLOAD,
    ON_APPROVE_MESSAGE,
    ON_REJECT_MESSAGE
} = constants;

let ApproveRejectTabForm = props => {
    const [activeTrusteeTab, setActiveTrusteeTab] = useState('individual');

    const formTabs = [
        {
            tabKey: INVESTMENT_FORM_SECTION.KEY,
            tabName: INVESTMENT_FORM_SECTION.NAME,
            formFieldFunction: InvestmentFormSection,
            disabled: true
        },
        {
            tabKey: ADMIN_FORM_SECTION.KEY,
            tabName: ADMIN_FORM_SECTION.NAME,
            formFieldFunction: AdminFormSection,
            disabled: true
        },
        {
            tabKey: IM_FEE_FORM_SECTION.KEY,
            tabName: IM_FEE_FORM_SECTION.NAME,
            formFieldFunction: ImFormSection
        }
    ];

    const onchangeTrusteeTabs = tabKey => {
        setActiveTrusteeTab(tabKey);
    };

    return (
        <>
            <ApproveRejectContainer
                formType={APPROVE_REJECT_TYPE_TABS}
                baseDocument={'TRUSTEE'}
                formTabs={formTabs}
                formName={FORM_NAME}
                formHooks={{ ...OnApproveHooks }}
                options={{
                    title: FORM_TITLE,
                    titleIicon: FORM_I_ICON,
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
                    zipName: 'Provide_data_for_investment_advice',
                    excelFileName: 'Provide_data_for_investment_advice',
                    attachmentArray: ['certificateOfIncorporation', 'trustDeed'],
                    labelOverRide: {
                        trustDeed: 'Deed_Of_Trustee',
                        certificateOfIncorporation: 'certificate_of_incorporation'
                    },
                    forceFormDataChange: true
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

export default ApproveRejectTabForm;
