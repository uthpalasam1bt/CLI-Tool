import React from 'react';

import { formFields } from './formConfig';
import { OnSubmitHook } from './hooks';
import { FORM_NAME, FORM_TITLE, FORM_I_ICON, ON_SAVE_MESSAGE } from './constants';
import CreateDocumentGeneration from '../../../../workflows/templates/stepTemplates/uploadGenarate';
import constants from '../../../../workflows/constants';
import PickUsersTemplate from '../../../../workflows/templates/stepTemplates/pickUsers';

const { GENERATOR_TYPE_WITH_TABS, BUTTON_TITLE_CONTINUE, ON_SUBMIT_MESSAGE } = constants;

let TabFileGeneration = props => {
    const formTabs = [
        {
            tabKey: 'assetFsKey1',
            tabName: 'Acceptance',
            component: (
                <PickUsersTemplate
                    pickerTitle={'Select LGIM staff to confirm document accepted once client has signed'}
                    // pickeriIconText={'Pick LGIM Directors'}
                    // maxCount={1}
                    userType={'signatories'}
                    document={'FMA'}
                    alias={'clientTeam'}
                    {...props}
                />
            )
        },
        {
            tabKey: 'liabilitiesFsKey',
            tabName: 'Generate/Upload',
            formFieldFunction: formFields
        }
    ];

    return (
        <>
            <CreateDocumentGeneration
                formTabs={formTabs}
                formName={FORM_NAME}
                formType={GENERATOR_TYPE_WITH_TABS}
                formHooks={{
                    ...OnSubmitHook
                }}
                options={{
                    title: FORM_TITLE,
                    titleIicon: FORM_I_ICON,
                    saveButton: false,
                    submitButton: {
                        title: BUTTON_TITLE_CONTINUE
                    },
                    onSubmitMessage: '',
                    onSaveMessage: ON_SAVE_MESSAGE
                }}
                {...props}
            />
        </>
    );
};

export default TabFileGeneration;
