import React from 'react';
import { getFormValues } from 'redux-form';
import { useSelector } from 'react-redux';

import CreateDocumentGeneration from '../../../../workflows/templates/stepTemplates/uploadGenarate';
import { formFields } from './formConfig';
import { OnSubmitHook } from './hooks';
import PickUsersTemplate from '../../../../workflows/templates/stepTemplates/pickUsers';
import constants from '../../../../workflows/constants';
import { OutputFilesForm } from '../../../../workflows/components';

import {
    FORM_NAME,
    FORM_TITLE,
    FORM_I_ICON,
    ACCEPTANCE_FORM_SECTION,
    SIGNATORIES_FORM_SECTION,
    GENERATE_DOC_FORM_SECTION,
    ANALYTICAL_MODULES
} from './constants';

const {
    GENERATOR_TYPE_WITH_TABS,
    BUTTON_TITLE_SAVE,
    FORM_SECTION_INCLUDE_COMPONENT,
    BUTTON_TITLE_CONTINUE,
    ON_SAVE_MESSAGE,
    ON_SUBMIT_MESSAGE
} = constants;

let GenerateAdvice = props => {
    const formValues = useSelector(getFormValues(FORM_NAME));

    const formTabs = [
        {
            tabKey: ACCEPTANCE_FORM_SECTION.KEY,
            tabName: ACCEPTANCE_FORM_SECTION.NAME,
            component: (
                <PickUsersTemplate
                    pickerTitle={ACCEPTANCE_FORM_SECTION.TITLE}
                    maxCount={1}
                    userType={'signatories'}
                    document={'FMA'}
                    alias={'clientTeam'}
                    {...props}
                />
            )
        },
        {
            tabKey: SIGNATORIES_FORM_SECTION.KEY,
            tabName: SIGNATORIES_FORM_SECTION.NAME,
            component: (
                <PickUsersTemplate
                    pickerTitle={SIGNATORIES_FORM_SECTION.TITLE}
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
        },
        {
            type: FORM_SECTION_INCLUDE_COMPONENT,
            tabKey: ANALYTICAL_MODULES.KEY,
            tabName: ANALYTICAL_MODULES.NAME,
            component: (
                <OutputFilesForm
                    schemeId={props.entityId}
                    step={'appamao'} // need to set stepfunction executed step
                    functionName={'adhoc_docGen'}
                    workflow={'registration'}
                />
            )
        }
    ];

    return (
        <>
            <CreateDocumentGeneration
                formType={GENERATOR_TYPE_WITH_TABS}
                formTabs={formTabs}
                formName={FORM_NAME}
                formHooks={{
                    ...OnSubmitHook
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

export default GenerateAdvice;
