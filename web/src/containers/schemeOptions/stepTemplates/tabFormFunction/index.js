/*
     This step template can be used to create Tab forms.
     To create form fields a form field configuration (either in JSON or functional format) should pass to this component.
 
*/
import React from 'react';

import { formFields } from './formConfigOne';
import { formFieldTwo } from './formConfigTwo';
import { formFieldsThree } from './formConfigThree';
import FormTemplate from '../../../workflows/templates/stepTemplates/forms';
import constants from '../../../../UILibrary/constants';
import { FORM_NAME, FORM_TITLE, FORM_I_ICON, TAB_KEYS, TAB_NAME } from './constants';

const {
    FORM_TYPE_WITH_TABS,
    BUTTON_TITLE_SAVE,
    BUTTON_TITLE_REQUEST,
    FORM_SECTION_INCLUDE_NEW,
    ON_SAVE_MESSAGE,
    ON_SUBMIT_MESSAGE
} = constants;

let TabForm = props => {
    const formTabs = [
        /*  This formTabs array use to include tabs that we want to use.
            For each and every tab include type, tabKey, tabName and formfieldfunction
        */

        /* 
             There are 2 tab types:
                 1.FORM_SECTION_INCLUDE_NEW
                 2.FORM_SECTION_INCLUDE_COMPONENT 
        */

        {
            type: FORM_SECTION_INCLUDE_NEW, //Use to mention the tab type
            tabKey: TAB_KEYS.TAB_ONE_FORM, //A unique key for each tab
            tabName:  TAB_NAME.TAB_ONE, //Tab header display name
            formFieldFunction: formFields //Use to pass functional configuration
        },
        {
            type: FORM_SECTION_INCLUDE_NEW,
            tabKey: TAB_KEYS.TAB_TWO_FORM,
            tabName: TAB_NAME.TAB_TWO,
            formFieldFunction: formFieldTwo
        },
        {
            type: FORM_SECTION_INCLUDE_NEW,
            tabKey: TAB_KEYS.TAB_THREE_FORM,
            tabName: TAB_NAME.TAB_THREE,
            formFieldFunction: formFieldsThree
        }
    ];

    return (
        <>
            <FormTemplate
                formTabs={formTabs} // Use to specify tab configuration
                formName={FORM_NAME} // Use to specify form name
                formType={FORM_TYPE_WITH_TABS} //Use to add form type
                options={{
                    //Use to mention other neccerssary properties need to be pass to create form
                    title: FORM_TITLE, // Use to add title to form
                    titleIicon: FORM_I_ICON, //The value of the tooltip icon in the header
                    saveButton: {
                        // Display name of the save button
                        title: BUTTON_TITLE_SAVE
                    },
                    submitButton: {
                        //Display name of the submit button
                        title: BUTTON_TITLE_REQUEST
                    },
                    onSubmitMessage: ON_SUBMIT_MESSAGE, //Use to add message that display when submit form data
                    onSaveMessage: ON_SAVE_MESSAGE, //Use to add message that display when save form data
                    fetchEntityDataAfterSubmit: false, //Use to get submited scheme data
                    navigateAfterSubmit: false // Use to stop navigate to another place after submit form
                }}
                {...props}
            />
        </>
    );
};

export default TabForm;
