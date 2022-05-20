import React from 'react';
import { getFormValues } from 'redux-form';
import { useSelector } from 'react-redux';
import { AssetFormSection } from './assetFormSection';
import { LiabilitiesFormSection } from './liabilitiesFormSection';
import { FundingFormSection } from './fundingFormSection';
import { ImFormSection } from './imFormSection';
import DownloadUiTemplate from '../../../../workflows/templates/stepTemplates/downloads';
import connectApi from '../../../../../middlewares/connectApi';
import constants from '../../../../../UILibrary/constants';
import PickUsersTemplate from '../../../../workflows/templates/stepTemplates/pickUsers';
import {
    FORM_NAME,
    FORM_TITLE,
    ASSETS_FORM_SECTION,
    IM_FEE_FORM_SECTION,
    LIABILITIES_FORM_SECTION,
    FUNDING_FORM_SECTION,
    APPROVAL_FORM_SECTION,
    REVIEW_FORMAL_PROPOSAL_INFO
} from './constants';
import { BUTTON_TITLE_CONTINUE } from '../../../../workflows/constants/workflowConstant';

const {
    FORM_TYPE_WITH_TABS,
    BUTTON_TITLE_SAVE,
    FORM_SECTION_INCLUDE_NEW,
    FORM_SECTION_INCLUDE_COMPONENT,
    ON_SAVE_MESSAGE,
    ON_SUBMIT_MESSAGE,
    DOWNLOAD_FORM_DATA_ZIP_TYPE_SIMPLE_WITH_DATA_CHANGE
} = constants;

const { KNOW_LIABILITY_VALUE_MDT } = LIABILITIES_FORM_SECTION.FIELD_KEYS;

let ReviewFormalProposal = props => {
    const { step } = props;
    const dirtyFormValues = useSelector(getFormValues(FORM_NAME));

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
        {
            type: FORM_SECTION_INCLUDE_NEW,
            tabKey: IM_FEE_FORM_SECTION.KEY,
            tabName: IM_FEE_FORM_SECTION.NAME,
            formFieldFunction: ImFormSection
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
                    maxCount={1}
                    userType={'approvers'}
                    document={'Investment'}
                    pickerDisabled={true}
                    {...props}
                />
            )
        }
    ];
    return (
        <>
            <DownloadUiTemplate
                downloadType={DOWNLOAD_FORM_DATA_ZIP_TYPE_SIMPLE_WITH_DATA_CHANGE}
                formTabs={formTabs}
                formName={FORM_NAME}
                formType={FORM_TYPE_WITH_TABS}
                options={{
                    title: FORM_TITLE,
                    titleIicon: REVIEW_FORMAL_PROPOSAL_INFO,
                    saveButton: {
                        title: BUTTON_TITLE_SAVE
                    },
                    submitButton: {
                        title: BUTTON_TITLE_CONTINUE
                    },
                    onSubmitMessage: false,
                    onSaveMessage: ON_SAVE_MESSAGE,
                    fetchEntityDataAfterSubmit: false,
                    navigateAfterSubmit: false,
                    zipName: 'initial proposal data',
                    excelFileName: 'registration details'
                }}
                downloadOptions={{
                    api: connectApi,
                    isPublicBucket: false
                }}
                disabled={(step && step.completed) || (step && step.rejected)}
                {...props}
            />
        </>
    );
};

export default ReviewFormalProposal;
