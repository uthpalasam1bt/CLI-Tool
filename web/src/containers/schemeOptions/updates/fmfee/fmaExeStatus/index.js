/*
     This step template can be used to create signatory table.
*/
import React from 'react';

import { FORM_TITLE, FORM_I_ICON } from './constants';
import CreateExecutionSection from '../../../../workflows/templates/stepTemplates/execution';
import constants from '../../../../workflows/constants';
import signatoryConfig from './signatoryConfig.json';

const { BUTTON_TITLE_CONTINUE, SIGNATORY_TABLE_EXECUTION } = constants;

let SignatoryTableExecution = props => {
    return (
        <CreateExecutionSection
            signatoryConfig={signatoryConfig} //Use to pass signatory config
            executionType={SIGNATORY_TABLE_EXECUTION} //Use to pass executionType.Here to process execution have to use SIGNATORY_TABLE_EXECUTION
            options={{
                //Use to mention other neccerssary properties need to be pass to create signatory table
                title: FORM_TITLE, // Use to add title to form
                titleIicon: FORM_I_ICON, //The value of the tooltip icon in the header
                saveButton: true, // use to make the save button visible or invisible
                submitButton: {
                    // Display name of the save button
                    title: BUTTON_TITLE_CONTINUE
                }
            }}
            {...props}
        />
    );
};

export default SignatoryTableExecution;
