import React from 'react';

import { FORM_TITLE, FORM_I_ICON, FORM_NAME } from './constants';
import CreateActivateSection from '../../../../workflows/templates/stepTemplates/activations';
import constants from '../../../../workflows/constants';
import { formFields } from './formConfig';
import { OnSubmitHook } from './hooks';

const { BUTTON_TITLE_ACTIVATE, ACTIVATION_TYPE_USING_FORM } = constants;

let SchemeNameActiveMandate = props => {
    return (
        <>
            <CreateActivateSection
                activationType={ACTIVATION_TYPE_USING_FORM}
                formFieldFunction={formFields} //Use to pass Functional configuration to create form fields
                formName={FORM_NAME} //Name of the form
                options={{
                    title: FORM_TITLE,
                    titleIicon: FORM_I_ICON,
                    saveButton: false,
                    submitButton: {
                        title: BUTTON_TITLE_ACTIVATE
                    },
                    onSubmitMessage: 'Mandate change is now effective.',
                    fetchEntityDataAfterSubmit: false,
                    navigateAfterSubmit: 'scheme'
                }}
                formHooks={{
                    ...OnSubmitHook
                }}
                {...props}
            />
        </>
    );
};

export default SchemeNameActiveMandate;
