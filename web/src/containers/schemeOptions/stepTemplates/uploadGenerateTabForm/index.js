/* 
This step template can be used to create a tabs form which contains upload & generate button fields in the tabs form
To create upload & generate form fields in a particular tab,
a form field configuration (either in JSON or functional format) should pass to this component
Also with this template, a custom component can be displayed in a particular form tab
*/

import React from 'react';

import CreateDocumentGeneration from '../../../workflows/templates/stepTemplates/uploadGenarate'; // base component of the document generation
import { formFields } from './formConfig'; // form functinal configuration to create the fields in the component and desplay it in the form
import { OnSubmitHook } from './hooks';
import PickUsersTemplate from '../../../workflows/templates/stepTemplates/pickUsers';
import constants from '../../../workflows/constants'; // constants that are commonly used
import {
    FORM_NAME,
    FORM_TITLE,
    FORM_I_ICON,
    SUBMITTED_MESSAGE,
    SAVED_MESSAGE,
    PICK_USER_I_ICON,
    PICK_USER_TITLE,
    TABS
} from './constants';

const { tab1, tab2 } = TABS; // each tab has a unique tabKey and tabName they  are defined as constants
const { GENERATOR_TYPE_WITH_TABS, BUTTON_TITLE_SAVE, BUTTON_TITLE_REQUEST } = constants; // button constants and the component type

let TabUploadGeneration = props => {
    const formTabs = [
        /* 
 this array contains the tabs configuration to create the tabs in the component
 each tab object has a unique tabKey and a tab name and the way of passing components 
 there are two ways you can pass the components to the tabs configuration
 1. passing a jsx react component directly as a component property
 2.passing the functional configuration as formFieldFunction property
*/
        {
            tabKey: tab1.tabKey,
            tabName: tab1.tabName,
            // developer can pass the jsx component as component property
            component: (
                <PickUsersTemplate
                    pickerTitle={PICK_USER_TITLE} // title to display in the pick user components header
                    pickeriIconText={PICK_USER_I_ICON} // description to display in the tooltip icon in the header
                    maxCount={1} // maximum number of approvers or signatories the user can select
                    userType={'signatories'} // 'signatories' or 'approvers'
                    document={'IAA'} // document to pick users
                    alias={'admin'} // alias can be 'admin / client / clientTeam'. Required only if userType is 'signatories.
                    {...props}
                />
            )
        },
        {
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
                    saveButton: {
                        // contains the properties to the save button in the header
                        title: BUTTON_TITLE_SAVE // save button text
                    },
                    submitButton: {
                        //contains the properties to the submit button in the header
                        title: BUTTON_TITLE_REQUEST // submit button text
                    },
                    onSubmitMessage: SUBMITTED_MESSAGE, // a message to be displyed if the submittion successfully completed
                    onSaveMessage: SAVED_MESSAGE // a message to be displayed after saving the form data
                }}
                {...props} // props are passed down to the child components
            />
        </>
    );
};

export default TabUploadGeneration;
