import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { schemeFormFields } from './schemeConfig';
import { adminFormFields } from './adminConfig';
import FormTemplate from '../../../../workflows/templates/stepTemplates/forms';
import constants from '../../../../../UILibrary/constants';
import { OnSubmitHook, OnSignatoryChangeHook } from './hooks';

import {
    FORM_NAME,
    FORM_TITLE,
    FORM_I_ICON,
    SCHEME_FORM_FIELD_NAMES,
    ADMIN_FORM_FIELD_NAMES,
    TAB_KEYS,
    TRUSTEES_PICKER_SECTION,
    PICK_USER_I_ICON,
    SYSTEM_MESSAGE_REQUESTED
} from './constants';
import { getFormValues } from 'redux-form';
import _ from 'lodash';
import { FORM_SECTION_INCLUDE_COMPONENT } from '../../../../../UILibrary/constants/formConstants';
import { TRUSTEE_USER_PICKER } from '../../../../workflows/constants/pickUserConstants';
import PickUsersTemplate from '../../../../workflows/templates/stepTemplates/pickUsers';


const {
    FORM_TYPE_WITH_TABS,
    BUTTON_TITLE_SAVE,
    BUTTON_TITLE_CONTINUE,
    BUTTON_TITLE_REQUEST,
    FORM_SECTION_INCLUDE_NEW,
    ON_SAVE_MESSAGE,
    ON_SUBMIT_MESSAGE
} = constants;

let TabForm = props => {
    const formValues = useSelector(getFormValues(FORM_NAME));
    const verifingSchemeName = useSelector(state => state.schemeOptionsReducer.checkingSchemeNameValidity);
    const [avilable, setAvilable] = useState(null);
    const [validateSchemeName, setValidateSchemeName] = useState(false);
    const [buttonDisable, setButtonDisable] = useState(false);
    const [activeTrusteeTab, setActiveTrusteeTab] = useState('individual');
    const [activeTab, setActiveTab] = useState(null);

    const onchangeTrusteeTabs = tabKey => {
        setActiveTrusteeTab(tabKey);
    };
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

    const schemeNameValidate = (value, props, schemeAvailable = avilable) => {
        if (formValues) {
            if (value !== _.get(props, `dataset.formData.schemeNameChangeForm.schemeName`) && !schemeAvailable) {
                setValidateSchemeName(false);
                setButtonDisable(false);
            } else {
                setValidateSchemeName(true);
                setAvilable(true);
                setButtonDisable(true);
            }
        }
    };

    const tabChange = tabKey => {
        setActiveTab(tabKey);
    }

    const formTabs = [
        {
            type: FORM_SECTION_INCLUDE_NEW,
            tabKey: TAB_KEYS.SCHEME_FORM,
            tabName: SCHEME_FORM_FIELD_NAMES.NAME,
            formFieldFunction: schemeFormFields
        },
        {
            type: FORM_SECTION_INCLUDE_NEW,
            tabKey: TAB_KEYS.ADMIN_FORM,
            tabName: ADMIN_FORM_FIELD_NAMES.NAME,
            formFieldFunction: adminFormFields
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
                formTabs={formTabs}
                formName={FORM_NAME}
                formType={FORM_TYPE_WITH_TABS}
                options={{
                    title: FORM_TITLE,
                    titleIicon: FORM_I_ICON,
                    saveButton: {
                        title: BUTTON_TITLE_SAVE
                    },
                    submitButton: {
                        title: activeTab === TAB_KEYS.SCHEME_FORM ? BUTTON_TITLE_CONTINUE : BUTTON_TITLE_REQUEST,
                        disabled: buttonDisable
                    },
                    onSubmitMessage: SYSTEM_MESSAGE_REQUESTED,
                    onSaveMessage: ON_SAVE_MESSAGE,
                    fetchEntityDataAfterSubmit: false,
                    navigateAfterSubmit: false,
                    avilable: avilable,
                    verifingSchemeName: verifingSchemeName,
                    formDataChangeCallback: schemeNameValidate,
                    validateSchemeName: validateSchemeName,
                    setAvilable: setAvilable
                }}
                formHooks={{
                    ...OnSubmitHook,
                    ...OnSignatoryChangeHook,
                }}
                metaProps={{
                    // these props will be used in form configs and hooks
                    activeTrusteeTab: activeTrusteeTab,
                    onchangeTrusteeTab: onchangeTrusteeTabs
                }}
                callBacks={{
                    tabchangeCallback: (tabKey) => tabChange(tabKey)
                }}
                {...props}
            />
        </>
    );
};

export default TabForm;
