/* This step template can be used to create scheme activation container using tab form
   There are three main scheme activation types :
           1. ACTIVATION_TYPE_DEFAULT
           2. ACTIVATION_TYPE_USING_FORM
           3. ACTIVATION_TYPE_USING_FORM_TABS

 Second and third approches can be written either using Functional configuration or JSON configuration for create form fields
 In this index file use JSON configuration for create form fields
*/
import React from 'react';

import formFields from './formConfigOne';
import formFieldTwo from './formConfigTwo';
import CreateActivateSection from '../../../workflows/templates/stepTemplates/activations';
import uiLibConstants from '../../../../UILibrary/constants';
import constants from '../../../workflows/constants';
import { FORM_NAME, FORM_TITLE, FORM_I_ICON, TABONE, TABTWO, ON_ACTIVATE_MESSAGE } from './constants';

const { ACTIVATION_TYPE_USING_FORM_TABS } = uiLibConstants;
const { BUTTON_TITLE_ACTIVATE, FORM_SECTION_INCLUDE_NEW } = constants;

let ActiveMandateTabForm = props => {
    const formTabs = [
        /*  This formTabs array use to include tabs that we want to use.
            For each and every tab include type, tabKey, tabName and formfieldData
        */

        /* 
             There are 2 tab types:
                 1.FORM_SECTION_INCLUDE_NEW           - Use to build a form in a particular tab
                 2.FORM_SECTION_INCLUDE_COMPONENT     - Use to build a component that pass to a particular tab 
        */

        {
            type: FORM_SECTION_INCLUDE_NEW, //Use to mention the tab type
            tabKey: TABONE.KEY, //A unique key for each tab
            tabName: TABONE.NAME, //Tab header display name
            formFieldData: formFields //Use to pass JSON configuration
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
            <CreateActivateSection
                activationType={ACTIVATION_TYPE_USING_FORM_TABS} //Use to specify the scheme activation type (Tab form)
                formTabs={formTabs} // Use to specify tab configuration
                formName={FORM_NAME} //Name of the form
                options={{
                    //Use to mention other neccerssary properties need to be pass to create form
                    title: FORM_TITLE, // Use display a title in the header
                    titleIicon: FORM_I_ICON, //The value of the tooltip icon in the header
                    saveButton: true, // use to make the save button visible or invisible
                    submitButton: {
                        // Display name of the save button
                        title: BUTTON_TITLE_ACTIVATE
                    },
                    onSubmitMessage: ON_ACTIVATE_MESSAGE, //Use to add a message when scheme is activated
                    fetchEntityDataAfterSubmit: false, //Use when need scheme data after submiting
                    navigateAfterSubmit: false // Use to stop navigate to another place after submit form data
                }}
                {...props}
            />
        </>
    );
};

export default ActiveMandateTabForm;
