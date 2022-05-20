/* This step template can be used to create scheme activation container using simple form
   There are three main scheme activation types :
           1. ACTIVATION_TYPE_DEFAULT
           2. ACTIVATION_TYPE_USING_FORM
           3. ACTIVATION_TYPE_USING_FORM_TABS

 Second and third approches can be written either using Functional configuration or JSON configuration for create form fields
 In this index file use Functional configuration for create form fields
*/
import React from 'react';
import { formFields } from './formConfig';
import CreateActivateSection from '../../../../workflows/templates/stepTemplates/activations';
import uiLibConstants from '../../../../../UILibrary/constants';
import constants from '../../../../workflows/constants';
import { FORM_NAME, FORM_TITLE, ON_ACTIVATE_MESSAGE, FORM_I_ICON } from './constants';

const { ACTIVATION_TYPE_USING_FORM } = uiLibConstants;
const { BUTTON_TITLE_ACTIVATE } = constants;

let ActiveMandate = props => {
    return (
        <>
            <CreateActivateSection
                activationType={ACTIVATION_TYPE_USING_FORM} //Use to specify the scheme activation type (simple form)
                formFieldFunction={formFields} //Use to pass Functional configuration to create form fields
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

export default ActiveMandate;
