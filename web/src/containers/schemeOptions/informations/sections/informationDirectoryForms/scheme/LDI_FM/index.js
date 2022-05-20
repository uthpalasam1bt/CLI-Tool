import React from 'react';
import { FORM_NAME } from './constants';
import { formFields } from './formConfig';
import InformationDirectoryFormTemplate from '../../informationDirectoryFormTemplate';

let LDI_FMSchemeForm = props => {
    const { information_directory_form_data } = props;
    return (
        <>
            <InformationDirectoryFormTemplate
                formName={FORM_NAME}
                formField={formFields}
                formData={information_directory_form_data.scheme}
            />
        </>
    );
};

export default LDI_FMSchemeForm;
