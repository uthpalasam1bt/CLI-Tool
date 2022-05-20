import React from 'react';

import CreateDocumentGeneration from '../../../../workflows/templates/stepTemplates/uploadGenarate';
import { formFields } from './formConfig';
import { OnSubmitHook, OnSignatoryChangeHook } from './hooks';
import PickUsersTemplate from '../../../../workflows/templates/stepTemplates/pickUsers';
import constants from '../../../../workflows/constants';
import {
    FORM_NAME,
    FORM_TITLE,
    FORM_I_ICON,
    ACCEPTANCE_FORM_SECTION,
    IAA_SIGNATORIES_FORM_SECTION,
    IMA_PMC_SIGNATORIES_FORM_SECTION,
    GENERATE_DOC_FORM_SECTION
} from './constants';
import { BUTTON_TITLE_CONTINUE } from '../../../../workflows/constants/workflowConstant';

const { GENERATOR_TYPE_WITH_TABS, ON_CONTINUE_UPLOAD_MESSAGE, ON_SUBMIT_MESSAGE } = constants;

let SchemeNameGenerateDocuments = props => {
    const formTabs = [
        {
            tabKey: ACCEPTANCE_FORM_SECTION.KEY,
            tabName: ACCEPTANCE_FORM_SECTION.NAME,
            component: (
                <PickUsersTemplate
                    pickerTitle={ACCEPTANCE_FORM_SECTION.TITLE}
                    maxCount={1}
                    userType={'signatories'}
                    document={'IAA'}
                    alias={'clientTeam'}
                    {...props}
                />
            )
        },
        {
            tabKey: IAA_SIGNATORIES_FORM_SECTION.KEY,
            tabName: IAA_SIGNATORIES_FORM_SECTION.NAME,
            component: (
                <PickUsersTemplate
                    pickerTitle={IAA_SIGNATORIES_FORM_SECTION.TITLE}
                    // maxCount={2}
                    userType={'signatories'}
                    document={'IAA'}
                    alias={'admin'}
                    {...props}
                />
            )
        },
        {
            tabKey: IMA_PMC_SIGNATORIES_FORM_SECTION.KEY,
            tabName: IMA_PMC_SIGNATORIES_FORM_SECTION.NAME,
            component: (
                <PickUsersTemplate
                    pickerTitle={IMA_PMC_SIGNATORIES_FORM_SECTION.TITLE}
                    // maxCount={2}
                    userType={'signatories'}
                    document={'FMA'}
                    alias={'admin'}
                    {...props}
                />
            )
        },
        {
            tabKey: GENERATE_DOC_FORM_SECTION.KEY,
            tabName: GENERATE_DOC_FORM_SECTION.NAME,
            formFieldFunction: formFields
        }
    ];

    return (
        <>
            <CreateDocumentGeneration
                formType={GENERATOR_TYPE_WITH_TABS}
                formTabs={formTabs}
                formName={FORM_NAME}
                formHooks={{
                    ...OnSubmitHook,
                    ...OnSignatoryChangeHook
                }}
                options={{
                    title: FORM_TITLE,
                    titleIicon: FORM_I_ICON,
                    saveButton: false,
                    submitButton: {
                        title: BUTTON_TITLE_CONTINUE
                    }
                }}
                {...props}
            />
        </>
    );
};

export default SchemeNameGenerateDocuments;
