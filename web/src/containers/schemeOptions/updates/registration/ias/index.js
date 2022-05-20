import React from 'react';
import { formFields } from './formConfig';
import CreateActivateSection from '../../../../workflows/templates/stepTemplates/activations';
import uiLibConstants from '../../../../../UILibrary/constants';
import constants from '../../../../workflows/constants';
import { FORM_NAME, FORM_TITLE, TITLE_I_ICON } from './constants';

const { ACTIVATION_TYPE_USING_FORM, ON_ACTIVATE_MESSAGE } = uiLibConstants;
const { BUTTON_TITLE_ACTIVATE } = constants;

let ActivateClient = props => {
    return (
        <>
            <CreateActivateSection
                activationType={ACTIVATION_TYPE_USING_FORM}
                formFieldFunction={formFields}
                formName={FORM_NAME}
                options={{
                    title: FORM_TITLE,
                    titleIicon: TITLE_I_ICON,
                    saveButton: false,
                    submitButton: {
                        title: BUTTON_TITLE_ACTIVATE
                    },
                    onSubmitMessage: ON_ACTIVATE_MESSAGE,
                    fetchEntityDataAfterSubmit: false,
                    navigateAfterSubmit: false
                }}
                {...props}
            />
        </>
    );
};

export default ActivateClient;
