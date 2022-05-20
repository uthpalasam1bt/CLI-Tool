import React from 'react';

import FormTemplate from '../../../../workflows/templates/stepTemplates/forms';
import { formFields } from './formConfig';
import { FORM_TITLE, FORM_I_ICON, FORM_NAME } from './constants';
import constants from '../../../../workflows/constants';
import { OnSubmitHook } from './hooks';
const { ON_SUBMIT_MESSAGE, FORM_TYPE_SINGLE_PAGE, BUTTON_TITLE_CONTINUE } = constants;

const SponsorConsultationLetter = props => {
    return (
        <>
            <FormTemplate
                formName={FORM_NAME}
                formFieldFunction={formFields}
                formType={FORM_TYPE_SINGLE_PAGE}
                formHooks={{
                    ...OnSubmitHook
                }}
                options={{
                    title: FORM_TITLE,
                    titleIicon: FORM_I_ICON,
                    submitButton: {
                        title: BUTTON_TITLE_CONTINUE
                    },
                    onSubmitMessage: ON_SUBMIT_MESSAGE
                }}
                {...props}
            />
        </>
    );
};

export default SponsorConsultationLetter;
