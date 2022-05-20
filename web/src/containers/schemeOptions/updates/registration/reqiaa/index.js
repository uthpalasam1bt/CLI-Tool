import React, { useState } from 'react';
import _ from 'lodash';

import FormTemplate from '../../../../workflows/templates/stepTemplates/forms';
import uiLibconstants from '../../../../../UILibrary/constants';
import constants from '../../../../workflows/constants';
import PickUsersTemplate from '../../../../workflows/templates/stepTemplates/pickUsers';
import { formFields } from './formConfig';
import { OnSubmitHook, OnFormDataChangeHook, OnSaveHook } from './hooks';
import {
    FORM_NAME,
    FORM_TITLE,
    IAA_FORM_SECTION,
    REQUEST_A_FORMAL_PROPOSAL_FROM_US,
    TRUSTEES_PICKER_SECTION
} from './constants';

const {
    FORM_SECTION_INCLUDE_NEW,
    FORM_TYPE_WITH_TABS,
    BUTTON_TITLE_SAVE,
    BUTTON_TITLE_REQUEST,
    ON_SAVE_MESSAGE,
    FORM_SECTION_INCLUDE_COMPONENT,
    REQUEST_IAA_DATA_REQUEST_SUCCESS
} = uiLibconstants;

const { TRUSTEE_USER_PICKER } = constants;

let SimpleForm = props => {
    const [activeTrusteeTab, setActiveTrusteeTab] = useState('individual');

    const showSignatoryPicker = () => {
        const isCorpEntity = _.get(props, 'dataset.userPool.signatories.IAA.client', []).find(
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

    const onchangeTrusteeTabs = tabKey => {
        setActiveTrusteeTab(tabKey);
    };

    const formTabs = [
        {
            type: FORM_SECTION_INCLUDE_NEW,
            tabKey: IAA_FORM_SECTION.KEY,
            tabName: IAA_FORM_SECTION.NAME,
            formFieldFunction: formFields
        },
        ...(showSignatoryPicker()
            ? [
                  {
                      type: FORM_SECTION_INCLUDE_COMPONENT,
                      tabKey: TRUSTEES_PICKER_SECTION.KEY,
                      tabName: TRUSTEES_PICKER_SECTION.NAME,
                      formSection: (
                          <PickUsersTemplate
                              type={TRUSTEE_USER_PICKER}
                              pickerTitle={'Select signatories'}
                              userType={'signatories'}
                              document={'IAA'}
                              alias={'client'}
                              pickeriIconText={null}
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
                formName={FORM_NAME}
                formTabs={formTabs}
                formType={FORM_TYPE_WITH_TABS}
                formHooks={{
                    ...OnSubmitHook,
                    ...OnFormDataChangeHook,
                    ...OnSaveHook
                }}
                options={{
                    title: FORM_TITLE,
                    titleIicon: REQUEST_A_FORMAL_PROPOSAL_FROM_US,
                    saveButton: {
                        title: BUTTON_TITLE_SAVE
                    },
                    submitButton: {
                        title: BUTTON_TITLE_REQUEST
                    },
                    onSubmitMessage: REQUEST_IAA_DATA_REQUEST_SUCCESS,
                    onSaveMessage: ON_SAVE_MESSAGE,
                    fetchEntityDataAfterSubmit: false,
                    navigateAfterSubmit: false
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

export default SimpleForm;
