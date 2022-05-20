import React from 'react';

import CreateUploadSelect from '../../../workflows/templates/stepTemplates/uploadSelect';
import { formFields } from './formConfig';
import { FORM_TITLE, FORM_NAME } from './constants';
import constants from '../../../workflows/constants';
import { FORM_FIELD_NAMES } from './constants';
import { OnSubmitHook, OnFormDataChangeHook } from './hooks';

const { ON_SUBMIT_MESSAGE, BUTTON_TITLE_CONTINUE, UPLOAD_SELECT_TYPE_SINGLE_PAGE } = constants;

const uploadFma = props => {
    return (
        <>
            <CreateUploadSelect
                formName={FORM_NAME}
                formFieldFunction={formFields}
                formType={UPLOAD_SELECT_TYPE_SINGLE_PAGE}
                defaultSelectedDocType={FORM_FIELD_NAMES.DOC_NAME_IAA}
                options={{
                    title: FORM_TITLE,
                    submitButton: {
                        title: BUTTON_TITLE_CONTINUE
                    },
                    onSubmitMessage: ON_SUBMIT_MESSAGE
                }}
                formHooks={{ ...OnSubmitHook, ...OnFormDataChangeHook }}
                {...props}
            />
        </>
    );
};

export default uploadFma;
