import React, { useState } from 'react';

import { schemeformFields } from './schemeConfig';
import { adminFormFields } from './adminConfig';

import constants from '../../../../../UILibrary/constants';
import DownloadUiTemplate from '../../../../workflows/templates/stepTemplates/downloads';
import connectApi from '../../../../../middlewares/connectApi';
import {
    FORM_NAME,
    FORM_TITLE,
    FORM_I_ICON,
    SCHEME_FORM_FIELD_NAMES,
    ADMIN_FORM_FIELD_NAMES,
    DOWNLOAD_ZIP_NAME,
    TAB_KEYS,
    EXCEL_FILE_NAME
} from './constants';

const { BUTTON_TITLE_CONTINUE, FORM_SECTION_INCLUDE_NEW, DOWNLOAD_FORM_DATA_ZIP_TYPE_TABS } = constants;

let DownloadSchemeDetails = props => {
    const [activeTrusteeTab, setActiveTrusteeTab] = useState('individual');

    const onchangeTrusteeTabs = tabKey => {
        setActiveTrusteeTab(tabKey);
    };
    const formTabs = [
        {
            type: FORM_SECTION_INCLUDE_NEW,
            tabKey: TAB_KEYS.SCHEME_FORM,
            tabName: SCHEME_FORM_FIELD_NAMES.NAME,
            formFieldFunction: schemeformFields
        },
        {
            type: FORM_SECTION_INCLUDE_NEW,
            tabKey: TAB_KEYS.ADMIN_FORM,
            tabName: ADMIN_FORM_FIELD_NAMES.NAME,
            formFieldFunction: adminFormFields
        }
    ];

    return (
        <>
            <DownloadUiTemplate
                downloadType={DOWNLOAD_FORM_DATA_ZIP_TYPE_TABS}
                formTabs={formTabs}
                formName={FORM_NAME}
                options={{
                    title: FORM_TITLE,
                    titleIicon: FORM_I_ICON,
                    submitButton: {
                        title: BUTTON_TITLE_CONTINUE
                    },
                    labelOverRide: {
                        numOfMembers: 'number of members',
                        trustDeed: 'Deed_Of_Trustee',
                        schemeAccount: 'Scheme_Accounts',
                        otherDocuments: 'Other_Documents',
                        hmrcDocument: 'Hmrc_Reg',
                        certificateOfIncorporation: 'certificate_of_incorporation'
                    },
                    zipName: DOWNLOAD_ZIP_NAME,
                    excelFileName: EXCEL_FILE_NAME,
                    attachmentArray: [
                        'trustDeed',
                        'schemeAccount',
                        'otherDocuments',
                        'hmrcDocument',
                        'certificateOfIncorporation'
                    ]
                }}
                downloadOptions={{
                    api: connectApi
                }}
                metaProps={{
                    // these props will be used in form configs and hooks
                    activeTrusteeTab: activeTrusteeTab,
                    onchangeTrusteeTab: onchangeTrusteeTabs
                }}
                disabled={true}
                {...props}
            />
        </>
    );
};

export default DownloadSchemeDetails;
