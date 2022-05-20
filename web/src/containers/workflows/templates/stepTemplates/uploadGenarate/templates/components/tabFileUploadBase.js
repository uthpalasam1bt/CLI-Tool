import React from 'react';
import { getFormValues } from 'redux-form';
import { useSelector } from 'react-redux';

import SimpleFileUploadBase from './simpleFileUploadBase';
import { FormField } from '../../../../../../../UILibrary/components/forms/fields';

const TabFileUploadBase = props => {
    const { formName, formSectionName, formHooks, onSubmit, artifacts, data, ...rest } = props;
    const dirtyFormValues = useSelector(getFormValues(formName));

    return (
        <>
            {rest.formFieldFunction || rest.formFieldData ? (
                <SimpleFileUploadBase
                    formFields={
                        rest.formFieldData
                            ? rest.formFieldData
                            : rest.formFieldFunction
                            ? rest.formFieldFunction({ ...rest.onClickGenerate, ...dirtyFormValues, ...props })
                            : null
                    }
                    formHooks={formHooks}
                    formSubmit={onSubmit}
                    formName={formName}
                    dataset={data}
                    artifacts={artifacts}
                    props={{...props}}
                />
            ) : rest.fieldComponent ? (
                <FormField {...rest.fieldComponent} disabled={false} />
            ) : rest.component ? (
                <>{rest.component}</>
            ) : null}
        </>
    );
};

export default TabFileUploadBase;
