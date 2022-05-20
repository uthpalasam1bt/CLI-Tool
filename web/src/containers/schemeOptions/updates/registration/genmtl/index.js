import React from 'react';

import CreateDocumentGeneration from '../../../../workflows/templates/stepTemplates/uploadGenarate';
import { formFields } from './formConfig';
import constants from '../../../../workflows/constants';
import { BUTTON_TITLE_CONTINUE } from '../../../../workflows/constants/workflowConstant';
import { FORM_NAME, FORM_TITLE, SUBMITTED_MESSAGE } from './constants';

const { GENERATOR_TYPE_SINGLE_PAGE } = constants;

let GenerateMTL = props => {
    return (
        <>
            <CreateDocumentGeneration
                formType={GENERATOR_TYPE_SINGLE_PAGE}
                formFieldFunction={formFields}
                formName={FORM_NAME}
                options={{
                    title: FORM_TITLE,
                    saveButton: false,
                    submitButton: {
                        title: BUTTON_TITLE_CONTINUE
                    },
                    onSubmitMessage: SUBMITTED_MESSAGE
                }}
                {...props}
            />
        </>
    );
};

export default GenerateMTL;
