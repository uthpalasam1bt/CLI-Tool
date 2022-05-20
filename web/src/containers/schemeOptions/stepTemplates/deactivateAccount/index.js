/* This step template can be used to create
deactivate account step template 
In the content, you can display a simple form
*/
import React from 'react';
import { formFields } from './formConfig';
import CreateActivateSection from '../../../workflows/templates/stepTemplates/activations';
import uiLibConstants from '../../../../UILibrary/constants';
import { FORM_NAME, FORM_TITLE, ON_DEACTIVATE_MESSAGE, FORM_I_ICON, BUTTON_TITLE } from './constants';
import { OnSubmitHook } from './hooks';

const { DEACTIVATE_ACCOUNT, FORM_ACTION_TYPES } = uiLibConstants;

let ActiveMandate = props => {
    return (
        <>
            <CreateActivateSection
                activationType={DEACTIVATE_ACCOUNT} //Use to specify the scheme activation type (simple form)
                formFieldFunction={formFields} //Use to pass Functional configuration to create form fields
                formName={FORM_NAME} //Name of the form
                formHooks={{
                    ...OnSubmitHook
                }}
                options={{
                    //Use to mention other neccerssary properties need to be pass to create form
                    title: FORM_TITLE, // Use display a title in the header
                    titleIicon: FORM_I_ICON, //The value of the tooltip icon in the header
                    submitButton: {
                        // Display name of the save button
                        title: BUTTON_TITLE,
                        type: FORM_ACTION_TYPES.REJECT
                    },
                    onSubmitMessage: ON_DEACTIVATE_MESSAGE, //Use to add a message when scheme is activated
                    fetchEntityDataAfterSubmit: false, //Use when need scheme data after submiting
                    navigateAfterSubmit: false // Use to stop navigate to another place after submit form data
                }}
                {...props}
            />
        </>
    );
};

export default ActiveMandate;
