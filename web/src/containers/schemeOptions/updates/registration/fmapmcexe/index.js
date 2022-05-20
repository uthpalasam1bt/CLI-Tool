import React from 'react';

import { FORM_TITLE, FORM_I_ICON } from './constants';
import CreateExecutionSection from '../../../../workflows/templates/stepTemplates/execution';
import constants from '../../../../workflows/constants';
import uiLibraryConstants from '../../../../../UILibrary/constants';
import signatoryConfig from './signatoryConfig.json';

const { BUTTON_TITLE_CONTINUE, SIGNATORY_TABLE_EXECUTION } = constants;
const { SIGN_CONTINUE_REQUEST_SUCCESS } = uiLibraryConstants;

let SignIMA = props => {
    return (
        <CreateExecutionSection
            signatoryConfig={signatoryConfig}
            executionType={SIGNATORY_TABLE_EXECUTION}
            options={{
                title: FORM_TITLE,
                titleIicon: FORM_I_ICON,
                saveButton: true,
                submitButton: {
                    title: BUTTON_TITLE_CONTINUE
                },
                onSubmitMessage: SIGN_CONTINUE_REQUEST_SUCCESS
            }}
            {...props}
        />
    );
};

export default SignIMA;
