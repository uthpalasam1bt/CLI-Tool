import React, { useState } from 'react';
import { FORM_NAME } from './constants';
import { formFields } from './formConfig';
import InformationDirectoryFormTemplate from '../../informationDirectoryFormTemplate';

let FMSchemeForm = props => {
    const { information_directory_form_data } = props;

    const [activeTrusteeTab, setActiveTrusteeTab] = useState('individual');

    const onchangeTrusteeTabs = tabKey => {
        setActiveTrusteeTab(tabKey);
    };

    return (
        <>
            <InformationDirectoryFormTemplate
                formName={FORM_NAME}
                formField={formFields}
                formData={information_directory_form_data.scheme}
                metaProps={{
                    // these props will be used in form configs and hooks
                    activeTrusteeTab: activeTrusteeTab,
                    onchangeTrusteeTab: onchangeTrusteeTabs
                }}
            />
        </>
    );
};

export default FMSchemeForm;
