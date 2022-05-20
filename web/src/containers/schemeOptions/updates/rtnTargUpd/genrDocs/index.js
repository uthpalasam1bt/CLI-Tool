/* 
This step template can be used to create a tabs form which contains upload & generate button fields in the tabs form
To create upload & generate form fields in a particular tab,
a form field configuration (either in JSON or functional format) should pass to this component
Also with this template, a custom component can be displayed in a particular form tab
*/

import React from 'react';

import CreateDocumentGeneration from '../../../../workflows/templates/stepTemplates/uploadGenarate'; // base component of the document generation
import { formFields } from './formConfig'; // form functinal configuration to create the fields in the component and desplay it in the form
import { OnSubmitHook } from './hooks';
import PickUsersTemplate from '../../../../workflows/templates/stepTemplates/pickUsers';
import constants from '../../../../workflows/constants'; // constants that are commonly used
import { FORM_NAME, FORM_TITLE, FORM_I_ICON, TABS, PICKER_TITLE, CONTINUED_MESSAGE } from './constants';

const { tab1, tab2 } = TABS; // each tab has a unique tabKey and tabName they  are defined as constants
const { GENERATOR_TYPE_WITH_TABS, FORM_SECTION_INCLUDE_NEW, BUTTON_TITLE_CONTINUE } = constants; // button constants and the component type

let TabUploadGeneration = props => {
    const formTabs = [
        {
            // type: FORM_SECTION_INCLUDE_COMPONENT,
            // tabKey: TABTWO.KEY,
            // tabName: TABTWO.NAME,
            tabKey: tab1.tabKey,
            tabName: tab1.tabName,
            component: (
                <PickUsersTemplate
                    pickerTitle={PICKER_TITLE}
                    maxCount={1}
                    userType={'signatories'}
                    document={'FMA'}
                    alias={'clientTeam'}
                    {...props}
                />
            )
        },
        {
            type: FORM_SECTION_INCLUDE_NEW,
            tabKey: tab2.tabKey,
            tabName: tab2.tabName,
            formFieldFunction: formFields // passing the functional configuration as a formFieldFunction property
        }
    ];

    return (
        <>
            <CreateDocumentGeneration
                formType={GENERATOR_TYPE_WITH_TABS} // specifying the component type to be tabs form component
                formTabs={formTabs} // contanins the tab configuration
                formName={FORM_NAME} // a form name to identify
                formHooks={{
                    // custom hooks to handle validation before submitting the form
                    ...OnSubmitHook
                }}
                options={{
                    // contains the properties used in the header component
                    title: FORM_TITLE, // form title to be displayed in the header
                    titleIicon: FORM_I_ICON, // an icon description to be shown when the user hover the icon
                    saveButton: false,
                    submitButton: {
                        //contains the properties to the submit button in the header
                        title: BUTTON_TITLE_CONTINUE // submit button text
                    },
                    onSaveMessage: CONTINUED_MESSAGE // a message to be displyed if the submittion successfully completed
                    // onSaveMessage: SAVED_MESSAGE // a message to be displayed after saving the form data
                }}
                {...props} // props are passed down to the child components
            />
        </>
    );
};

export default TabUploadGeneration;
