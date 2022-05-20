/* 
This step template can be used to create a single page form (simple form) which contains upload & generate button fields
To create upload & generate form fields,
a form field configuration ( functional format) should pass to this component
*/

import React from 'react';

import CreateDocumentGeneration from '../../../../workflows/templates/stepTemplates/uploadGenarate'; // base component where all the configuration has been passed
import { formFields } from './formConfig'; // form functinal configuration to create the fields in the component and desplay it in the form
import constants from '../../../../workflows/constants';
import { OnSubmitHook } from './hooks';
import { FORM_NAME, FORM_I_ICON, FORM_TITLE, SUBMITTED_MESSAGE, SAVED_MESSAGE, CONTINUED_MESSAGE } from './constants'; // constants that are used in this template

const { GENERATOR_TYPE_SINGLE_PAGE, BUTTON_TITLE_SAVE, BUTTON_TITLE_REQUEST, BUTTON_TITLE_CONTINUE } = constants; // constants that are commonly used in all other components

const DocumentUploadGeneration = props => {
    return (
        <CreateDocumentGeneration
            formType={GENERATOR_TYPE_SINGLE_PAGE} // specifying the component type to single page component
            formFieldFunction={formFields} // this property used to pass the functional form configuration to create the form fields
            formName={FORM_NAME} // a form name to identify
            formHooks={{
                ...OnSubmitHook
            }}
            options={{
                // contains the properties used in the header component
                title: FORM_TITLE, // form title to be displayed in the header
                titleIicon: FORM_I_ICON, // an icon description to be shown when the user hover the icon
                saveButton: false,
                submitButton: {
                    //contains the properties to the submit button in the header
                    // title: BUTTON_TITLE_REQUEST // submit button text
                    title: BUTTON_TITLE_CONTINUE
                },
                // onSubmitMessage: SUBMITTED_MESSAGE,
                onSubmitMessage: SUBMITTED_MESSAGE, // a message to be displyed if the submittion successfully completed
                onSaveMessage: SAVED_MESSAGE // a message to be displayed after saving the form data
            }}
            {...props} // props are passed down to the child components
        />
    );
};

export default DocumentUploadGeneration;
