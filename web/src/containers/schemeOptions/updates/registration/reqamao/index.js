import React, { useState } from 'react';

import { InvestmentFormSection } from './investmentFormSection';
import { AdminFormSection } from './adminFormSection';
import FormTemplate from '../../../../workflows/templates/stepTemplates/forms';
import constants from '../../../../../UILibrary/constants';
import PickUsersTemplate from '../../../../workflows/templates/stepTemplates/pickUsers';
import {
    FORM_NAME,
    FORM_TITLE,
    FORM_I_ICON,
    INVESTMENT_FORM_SECTION,
    ADMINISTRATION_FORM_SECTION,
    TRUSTEES_PICKER_SECTION,
    PICK_USER_I_ICON
} from './constants';
import { OnFormDataChangeHook, OnSaveHook, OnSubmitHook } from './hooks';
import _ from 'lodash';
import { TRUSTEE_USER_PICKER } from '../../../../workflows/constants/pickUserConstants';

const {
    FORM_TYPE_WITH_TABS,
    BUTTON_TITLE_SAVE,
    BUTTON_TITLE_REQUEST_ADVICE,
    FORM_SECTION_INCLUDE_NEW,
    FORM_SECTION_INCLUDE_COMPONENT,
    ON_SAVE_MESSAGE,
    REQUEST_REQAMAO_REQUEST_SUCCESS
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
            type: FORM_SECTION_INCLUDE_NEW,
            tabKey: INVESTMENT_FORM_SECTION.KEY,
            tabName: INVESTMENT_FORM_SECTION.NAME,
            formFieldFunction: InvestmentFormSection
        },
        {
            type: FORM_SECTION_INCLUDE_NEW,
            tabKey: ADMINISTRATION_FORM_SECTION.KEY,
            tabName: ADMINISTRATION_FORM_SECTION.NAME,
            formFieldFunction: AdminFormSection
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
                              pickeriIconText={PICK_USER_I_ICON}
                              userType={'signatories'}
                              document={'FMA'}
                              alias={'client'}
                              otherDocsToCopySelectedUsers={'PMCProposal'}
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
                formHooks={{
                    ...OnSubmitHook,
                    ...OnFormDataChangeHook,
                    ...OnSaveHook
                }}
                options={{
                    title: FORM_TITLE,
                    titleIicon: FORM_I_ICON,
                    saveButton: {
                        title: BUTTON_TITLE_SAVE
                    },
                    submitButton: {
                        title: BUTTON_TITLE_REQUEST_ADVICE
                    },
                    onSubmitMessage: REQUEST_REQAMAO_REQUEST_SUCCESS,
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

export default TabForm;
