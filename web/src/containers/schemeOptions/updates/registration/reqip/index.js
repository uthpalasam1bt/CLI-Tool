import React, { useState } from 'react';
import { getFormValues } from 'redux-form';
import { useSelector } from 'react-redux';

import { AssetFormSection } from './assetFormSection';
import { LiabilitiesFormSection } from './liabilitiesFormSection';
import { FundingFormSection } from './fundingFormSection';
import InformationModal from './InformationModal';
import FormTemplate from '../../../../workflows/templates/stepTemplates/forms';
import PickUsersTemplate from '../../../../workflows/templates/stepTemplates/pickUsers';

import {
    FORM_NAME,
    FORM_TITLE,
    REQUEST_A_FORMAL_PROPOSAL_FROM_US,
    ASSETS_FORM_SECTION,
    LIABILITIES_FORM_SECTION,
    FUNDING_FORM_SECTION,
    APPROVAL_FORM_SECTION,
    BUTTON_TITLE_REQUEST,
    ASSET_VALUE_WARNING
} from './constants';
import constants from '../../../../../UILibrary/constants';
const {
    FORM_TYPE_WITH_TABS,
    BUTTON_TITLE_SAVE,
    FORM_SECTION_INCLUDE_NEW,
    FORM_SECTION_INCLUDE_COMPONENT,
    ON_SAVE_MESSAGE,
    PROPOSAL_REQUESTED
} = constants;

const { KNOW_LIABILITY_VALUE_MDT } = LIABILITIES_FORM_SECTION.FIELD_KEYS;

let RequestFormalProposal = props => {
    const dirtyFormValues = useSelector(getFormValues(FORM_NAME));
    const [showInformationModal, setShowInformationModal] = useState(false);

    const formTabs = [
        {
            type: FORM_SECTION_INCLUDE_NEW,
            tabKey: ASSETS_FORM_SECTION.KEY,
            tabName: ASSETS_FORM_SECTION.NAME,
            formFieldFunction: AssetFormSection
        },
        {
            type: FORM_SECTION_INCLUDE_NEW,
            tabKey: LIABILITIES_FORM_SECTION.KEY,
            tabName: LIABILITIES_FORM_SECTION.NAME,
            formFieldFunction: LiabilitiesFormSection
        },

        ...(dirtyFormValues &&
        dirtyFormValues.liabilities &&
        dirtyFormValues.liabilities[KNOW_LIABILITY_VALUE_MDT] === 'yes'
            ? [
                  {
                      type: FORM_SECTION_INCLUDE_NEW,
                      tabKey: FUNDING_FORM_SECTION.KEY,
                      tabName: FUNDING_FORM_SECTION.NAME,
                      formFieldFunction: FundingFormSection
                  }
              ]
            : []),
        {
            type: FORM_SECTION_INCLUDE_COMPONENT,
            tabKey: APPROVAL_FORM_SECTION.KEY,
            tabName: APPROVAL_FORM_SECTION.NAME,
            formSection: (
                <PickUsersTemplate
                    pickerTitle={'Select client users for approval'}
                    userType={'approvers'}
                    document={'Investment'}
                    {...props}
                />
            )
        }
    ];

    const handleChangeAssetValue = (value) => {
        if (value < 10000000) setShowInformationModal(true);
    }
    return (
        <>
            <FormTemplate
                formTabs={formTabs}
                formName={FORM_NAME}
                formType={FORM_TYPE_WITH_TABS}
                options={{
                    title: FORM_TITLE,
                    titleIicon: REQUEST_A_FORMAL_PROPOSAL_FROM_US,
                    saveButton: {
                        title: BUTTON_TITLE_SAVE
                    },
                    submitButton: {
                        title: BUTTON_TITLE_REQUEST
                    },
                    onSaveMessage: ON_SAVE_MESSAGE,
                    onSubmitMessage: PROPOSAL_REQUESTED,
                    fetchEntityDataAfterSubmit: false,
                    navigateAfterSubmit: false
                }}
                handleChangeAssetValue={handleChangeAssetValue}
                {...props}
            />
            {
                showInformationModal ? (
                    <InformationModal
                        show={showInformationModal}
                        handleShow={() => setShowInformationModal(!showInformationModal)}
                        content={ASSET_VALUE_WARNING}
                    />) : null
            }
        </>
    );
};

export default RequestFormalProposal;
