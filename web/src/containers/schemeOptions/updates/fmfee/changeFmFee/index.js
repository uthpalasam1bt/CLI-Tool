/*
     This step template can be used to create Tab forms.
     To create form fields a form field configuration (either in JSON or functional format) should pass to this component.
 
*/
import React, { useState } from 'react';
import _ from 'lodash';

import FormTemplate from '../../../../workflows/templates/stepTemplates/forms';
import constants from '../../../../../UILibrary/constants';
import { formFields } from './formConfig';
import { FORM_NAME, FORM_TITLE, FORM_I_ICON, TABONE, TABTWO, ON_SUBMIT_MESSAGE } from './constants';
import PickUsersTemplate from '../../../../workflows/templates/stepTemplates/pickUsers';
import { TRUSTEE_USER_PICKER } from '../../../../workflows/constants/pickUserConstants';
import { OnSubmitHook } from './hooks';

const {
    FORM_TYPE_WITH_TABS,
    BUTTON_TITLE_UPDATE,
    FORM_SECTION_INCLUDE_NEW,
    FORM_SECTION_INCLUDE_COMPONENT,
    ON_SAVE_MESSAGE,
} = constants;

let TabForm = props => {
    const [activeTrusteeTab, setActiveTrusteeTab] = useState('individual');

    const onchangeTrusteeTabs = tabKey => {
        setActiveTrusteeTab(tabKey);
    };

    const showSignatoryPicker = () => {
        const isCorpEntity = _.get(props, 'dataset.userPool.signatories.FMA.client', []).find(
            entity =>
                entity &&
                entity.trusteeEntityType == 'CORPORATE' &&
                entity.entityName &&
                entity.entityName.length &&
                Array.isArray(entity.trustees) &&
                entity.trustees.length > 0
        );
        if (isCorpEntity) return true;
        return false;
    };

    const formTabs = [
        {
            type: FORM_SECTION_INCLUDE_NEW, //Use to mention the tab type
            tabKey: TABONE.KEY, //A unique key for each tab
            tabName: TABONE.NAME, //Tab header display name
            formFieldFunction: formFields //Use to pass functional configuration
        },
        ...(showSignatoryPicker()
        ? [
            {
                type: FORM_SECTION_INCLUDE_COMPONENT,
                tabKey: TABTWO.KEY,
                tabName: TABTWO.NAME,
                formSection: (
                    <PickUsersTemplate
                        type={TRUSTEE_USER_PICKER}
                        pickerTitle={'Select signatories'}
                        userType={'signatories'}
                        document={'FMA'}
                        alias={'client'}
                        {...props}
                    />
                )
            }
          ]
        : [])
    ];

    return (
        <>
            <FormTemplate
                formTabs={formTabs} // Use to specify tab configuration
                formName={FORM_NAME} // Use to specify form name
                formType={FORM_TYPE_WITH_TABS} //Use to add form type
                formHooks={{
                    ...OnSubmitHook
                }}
                options={{
                    //Use to mention other neccerssary properties need to be pass to create form
                    title: FORM_TITLE, // Use to add title to form
                    titleIicon: FORM_I_ICON, //The value of the tooltip icon in the header
                    saveButton: false,
                    submitButton: {
                        //Display name of the submit button
                        title: BUTTON_TITLE_UPDATE
                    },
                    onSubmitMessage: ON_SUBMIT_MESSAGE, //Use to add message that display when submit form data
                    onSaveMessage: ON_SAVE_MESSAGE, //Use to add message that display when save form data
                    fetchEntityDataAfterSubmit: false, //Use to get submited scheme data
                    navigateAfterSubmit: false // Use to stop navigate to another place after submit form
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

export default TabForm;
