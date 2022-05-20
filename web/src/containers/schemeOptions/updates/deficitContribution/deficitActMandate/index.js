/* This step template can be used to create default scheme activation container 
   
There are three main scheme activation types :
           1. ACTIVATION_TYPE_DEFAULT
           2. ACTIVATION_TYPE_USING_FORM
           3. ACTIVATION_TYPE_USING_FORM_TABS

 Second and third approches can be written either using Functional configuration or JSON configuration for create form fields
*/
import React from 'react';

import { TEXT, FORM_TITLE, FORM_I_ICON } from './constants';
import CreateActivateSection from '../../../../workflows/templates/stepTemplates/activations';
import uiLibConstants from '../../../../../UILibrary/constants';
import constants from '../../../../workflows/constants';

const { ACTIVATION_TYPE_DEFAULT } = uiLibConstants;
const { BUTTON_TITLE_ACTIVATE } = constants;

let ActiveMandate = props => {
    return (
        <>
            <CreateActivateSection
                activationType={ACTIVATION_TYPE_DEFAULT} //Use to specify the scheme activation type (default)
                text={TEXT} //The text that use to display in default scheme activation
                options={{
                    //Use to mention other neccerssary properties need to be pass to create form
                    title: FORM_TITLE, // Use display a title in the header
                    titleIicon: FORM_I_ICON, //The value of the tooltip icon in the header
                    saveButton: false, // use to make the save button visible or invisible
                    submitButton: {
                        // Display name of the save button
                        title: BUTTON_TITLE_ACTIVATE
                    },
                    onSubmitMessage: 'Mandate change is now effective.', //Use to add a message when click on activate button
                    fetchEntityDataAfterSubmit: false //Use when need scheme data after submiting
                }}
                {...props}
            />
        </>
    );
};

export default ActiveMandate;
