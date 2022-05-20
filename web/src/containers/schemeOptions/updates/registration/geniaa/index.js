import React from 'react';

import CreateDocumentGeneration from '../../../../workflows/templates/stepTemplates/uploadGenarate';
import { formFields } from './formConfig';
import { OnSubmitHook } from './hooks';
import PickUsersTemplate from '../../../../workflows/templates/stepTemplates/pickUsers';
import constants from '../../../../workflows/constants';
import { BUTTON_TITLE_CONTINUE } from '../../../../workflows/constants/workflowConstant';
import {
    FORM_NAME,
    FORM_TITLE,
    FORM_I_ICON,
    SUBMITTED_MESSAGE,
    TABS,
    PICK_USER_TITLE_ACCEPTANCE,
    PICK_USER_TITLE_SIGNATORIES
} from './constants';

const { tab1, tab2, tab3 } = TABS;
const { GENERATOR_TYPE_WITH_TABS } = constants;

let TabUploadGeneration = props => {
    const formTabs = [
        {
            tabKey: tab1.tabKey,
            tabName: tab1.tabName,
            component: (
                <PickUsersTemplate
                    pickerTitle={PICK_USER_TITLE_ACCEPTANCE}
                    maxCount={1}
                    userType={'signatories'}
                    document={'IAA'}
                    alias={'clientTeam'}
                    {...props}
                />
            )
        },
        {
            tabKey: tab2.tabKey,
            tabName: tab2.tabName,
            component: (
                <PickUsersTemplate
                    pickerTitle={PICK_USER_TITLE_SIGNATORIES}
                    userType={'signatories'}
                    document={'IAA'}
                    alias={'admin'}
                    {...props}
                />
            )
        },
        {
            tabKey: tab3.tabKey,
            tabName: tab3.tabName,
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

export default TabUploadGeneration;
