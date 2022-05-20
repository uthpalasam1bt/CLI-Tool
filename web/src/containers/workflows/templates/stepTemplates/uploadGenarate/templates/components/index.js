import React from 'react';
import { reduxForm, getFormValues } from 'redux-form';
import { compose } from 'redux';
import { connect, useSelector } from 'react-redux';

import SimpleFileUploadBase from './simpleFileUploadBase';
import uiLibConstants from '../../../../../../../UILibrary/constants';

const { GENERATE_FORMS_TYPE_SIMPLE, GENERATE_FORMS_TYPE_WITH_CHILDREN } = uiLibConstants;

const simpleFileUploadFormat = props => {
    const { handleSubmit, formFieldData, className, formHooks, onSubmit, name, data, artifacts } = props;

    return (
        <form className={className} onSubmit={handleSubmit}>
            <div className="form-body">
                <SimpleFileUploadBase
                    formFields={formFieldData}
                    formHooks={formHooks}
                    formSubmit={onSubmit}
                    formName={name}
                    dataset={data}
                    artifacts={artifacts}
                    {...props}
                />
            </div>
        </form>
    );
};

const fileUploadWithChildrenFormat = props => {
    const { handleSubmit, children, className } = props;
    return (
        <form className={className} onSubmit={handleSubmit}>
            {children}
        </form>
    );
};

let FileUploadBase = props => {
    const { formType = GENERATE_FORMS_TYPE_SIMPLE, name } = props;

    const dirtyFormValues = useSelector(getFormValues(name));

    return formType === GENERATE_FORMS_TYPE_SIMPLE ? (
        simpleFileUploadFormat({ dirtyFormValues, ...props })
    ) : formType === GENERATE_FORMS_TYPE_WITH_CHILDREN ? (
        fileUploadWithChildrenFormat({ dirtyFormValues, ...props })
    ) : (
        <></>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
        form: ownProps.name
    };
};

export default compose(
    connect(mapStateToProps),
    reduxForm({})
)(FileUploadBase);
