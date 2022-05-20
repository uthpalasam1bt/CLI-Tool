/*
     This step template can be used to create simple forms.
     To create form fields a form field configuration (either in JSON or functional format) should pass to this component.
 
*/
import React from 'react';

import FormTemplate from '../../../../workflows/templates/stepTemplates/forms';
import constants from '../../../../../UILibrary/constants';
import { formFields } from './formConfig';
import { FORM_NAME, FORM_TITLE, FORM_I_ICON, SUCCESS_MESSAGE } from './constants';
import { OnSubmitHook } from './hooks';

const { FORM_TYPE_SINGLE_PAGE, BUTTON_TITLE_CONTINUE, ON_SAVE_MESSAGE } = constants;

let SimpleForm = props => {
    return (
        <>
            <FormTemplate
                formName={FORM_NAME} // name of the form
                formFieldFunction={formFields} //Use to pass functional configuration
                formType={FORM_TYPE_SINGLE_PAGE} //Use to get formType single or tab
                formHooks={{
                    ...OnSubmitHook
                }}
                options={{
                    //Use to mention other neccerssary properties need to be pass to create form
                    title: FORM_TITLE, // Use display a title in the header
                    titleIicon: FORM_I_ICON, //The value of the tooltip icon in the header
                    saveButton: false,
                    submitButton: {
                        //Display name of the submit button
                        title: BUTTON_TITLE_CONTINUE
                    },
                    onSubmitMessage: SUCCESS_MESSAGE, //Use to add message that display when submit form data
                    onSaveMessage: ON_SAVE_MESSAGE, //Use to add message that display when save form data
                    fetchEntityDataAfterSubmit: false, //Use when need scheme data after submiting
                    navigateAfterSubmit: false // Use to stop navigate to another place after submit form data
                }}
                {...props}
            />
        </>
    );
};

export default SimpleForm;
