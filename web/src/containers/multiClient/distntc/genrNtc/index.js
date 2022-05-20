import React from 'react';

import FormTemplate from '../../../workflows/templates/stepTemplates/forms';
import { formFields } from './formConfig';
import { FORM_TITLE, FORM_NAME } from './constants';
import constants from '../../../workflows/constants';

import { OnFormDataChangeHook } from './hooks';

const { ON_SUBMIT_MESSAGE, FORM_TYPE_SINGLE_PAGE, BUTTON_TITLE_CONTINUE } = constants;

const uploadNotice = props => {
    return (
        <>
            <FormTemplate
                formName={FORM_NAME}
                formFieldFunction={formFields}
                formType={FORM_TYPE_SINGLE_PAGE}
                options={{
                    title: FORM_TITLE,
                    submitButton: {
                        title: BUTTON_TITLE_CONTINUE
                    },
                    onSubmitMessage: ON_SUBMIT_MESSAGE
                }}
                formHooks={{
                    ...OnFormDataChangeHook
                }}
                {...props}
            />
        </>
    );
};

export default uploadNotice;
