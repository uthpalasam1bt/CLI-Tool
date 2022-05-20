import React from 'react';

import { formFields } from './formConfig';
import PickUsersTemplate from '../../../../workflows/templates/stepTemplates/pickUsers';
import FormTemplate from '../../../../workflows/templates/stepTemplates/forms';
import constants from '../../../../../UILibrary/constants';
import { OnSubmitHook } from './hooks';
import {
    FORM_NAME,
    FORM_TITLE,
    FORM_I_ICON,
    TABONE,
    TABTWO,
    PICKER_TITLE,
    ON_SAVE_MESSAGE,
    ON_SUBMIT_MESSAGE
} from './constants';

import { TRUSTEE_USER_PICKER } from '../../../../workflows/constants/pickUserConstants';

const {
    FORM_TYPE_WITH_TABS,
    BUTTON_TITLE_SAVE,
    BUTTON_TITLE_REQUEST,
    FORM_SECTION_INCLUDE_NEW,
    FORM_SECTION_INCLUDE_COMPONENT
} = constants;

let TabForm = props => {
    const formTabs = [
        {
            type: FORM_SECTION_INCLUDE_NEW, //Use to mention the tab type
            tabKey: TABONE.KEY, //A unique key for each tab
            tabName: TABONE.NAME, //Tab header display name
            formFieldFunction: formFields //Use to pass functional configuration
        },
        {
            type: FORM_SECTION_INCLUDE_COMPONENT,
            tabKey: TABTWO.KEY,
            tabName: TABTWO.NAME,
            formSection: (
                <PickUsersTemplate
                    pickerTitle={PICKER_TITLE}
                    type={TRUSTEE_USER_PICKER}
                    pickIndividual={true}
                    maxCount={1}
                    userType={'signatories'}
                    document={'FMA'}
                    alias={'client'}
                    {...props}
                />
            )
        }
    ];

    return (
        <>
            <FormTemplate
                formTabs={formTabs} // Use to specify tab configuration
                formName={FORM_NAME} // Use to specify form name
                formType={FORM_TYPE_WITH_TABS} //Use to add form type
                formHooks={{
                    // custom hooks to handle validation before submitting the form
                    ...OnSubmitHook
                }}
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
