import React, { useEffect } from 'react';
import uiLibConstants from '../../../../../UILibrary/constants';
import { getSystemArtifacts } from '../../../../../helpers/artifactHelper';
import FormGenerator from '../../../../../UILibrary/components/forms/formBase';
import { getFormSyncErrors, getFormValues, initialize } from 'redux-form';
import { compose } from 'redux';
import { connect, useDispatch } from 'react-redux';

const { GENERATE_FORMS_TYPE_SIMPLE } = uiLibConstants;

let InformationDirectoryFormTemplate = props => {
    const { dirtyFormValues, formName, formField, formData } = props;
    const dispatch = useDispatch();

    useEffect(() => {
        if (formData) {
            dispatch(initialize(formName, formData));
        }
    }, [formData]);
    return (
        <>
            <FormGenerator
                className="generate-iaa-manager-letters-form"
                name={formName}
                formFieldData={formField({ dirtyFormValues, ...props })}
                formType={GENERATE_FORMS_TYPE_SIMPLE}
                disabled={true}
                artifacts={getSystemArtifacts()}
            />
        </>
    );
};

const mapStateToProps = (state, ownProps) => ({
    dirtyFormValues: getFormValues(ownProps.formName)(state),
    asyncErrors: getFormSyncErrors(ownProps.formName)(state)
});

export default compose(connect(mapStateToProps))(InformationDirectoryFormTemplate);
