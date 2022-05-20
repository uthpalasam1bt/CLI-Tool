/*
     This step template can be used to create Tab forms.
     To create form fields a form field configuration (either in JSON or functional format) should pass to this component.
     Here uses JSON configurations.
*/
import React from 'react';

import formFields from './formConfigOne';
import formFieldTwo from './formConfigTwo';
import FormTemplate from '../../../workflows/templates/stepTemplates/forms';
import constants from '../../../../UILibrary/constants';
import { FORM_NAME, FORM_TITLE, FORM_I_ICON, TABONE, TABTWO } from './constants';

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
            For each and every tab include type, tabKey, tabName and formfieldData
        */

        /* 
             There are 2 tab types:
                 1.FORM_SECTION_INCLUDE_NEW
                 2.FORM_SECTION_INCLUDE_COMPONENT 
        */

        {
            type: FORM_SECTION_INCLUDE_NEW, //Use to mention the tab type
            tabKey: TABONE.KEY, //A unique key for each tab
            tabName: TABONE.NAME, //Tab header display name
            formFieldData: formFields //Use to pass field configuration (JSON)
        },
        {
            type: FORM_SECTION_INCLUDE_NEW,
            tabKey: TABTWO.KEY,
            tabName: TABTWO.NAME,
            formFieldData: formFieldTwo
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
                    titleIicon: FORM_I_ICON,
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
