import React from 'react';
import { reduxForm, getFormValues } from 'redux-form';
import { compose } from 'redux';
import { connect, useSelector } from 'react-redux';

import UploadPublishBase from './uploadPublishBase';
import uiLibConstants from '../../../../../../../UILibrary/constants';

const { GENERATE_FORMS_TYPE_SIMPLE, GENERATE_FORMS_TYPE_WITH_CHILDREN } = uiLibConstants;

const simpleUploadPublishFormat = props => {
    const {
        handleSubmit,
        formFieldFunction,
        className,
        onSubmit,
        formName,
        dataset,
        artifacts,
        documentName,
        setDocumentURL,
        documentUrl,
        disabled
    } = props;

    return (
        <form className={className} onSubmit={handleSubmit}>
            <div className="form-body">
                <UploadPublishBase
                    formFieldFunction={formFieldFunction}
                    formSubmit={onSubmit}
                    formName={formName}
                    dataset={dataset}
                    artifacts={artifacts}
                    documentName={documentName}
                    setDocumentURL={setDocumentURL}
                    documentUrl={documentUrl}
                    disabled={disabled}
                />
            </div>
        </form>
    );
};

const uploadPublishWithChildrenFormat = props => {
    const { handleSubmit, children, className } = props;
    return (
        <form className={className} onSubmit={handleSubmit}>
            {children}
        </form>
    );
};

let UploadPublishGenerator = props => {
    const { formType = GENERATE_FORMS_TYPE_SIMPLE, formName } = props;

    const dirtyFormValues = useSelector(getFormValues(formName));

    return formType === GENERATE_FORMS_TYPE_SIMPLE ? (
        simpleUploadPublishFormat({ dirtyFormValues, ...props })
    ) : formType === GENERATE_FORMS_TYPE_WITH_CHILDREN ? (
        uploadPublishWithChildrenFormat({ dirtyFormValues, ...props })
    ) : (
        <></>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
        form: ownProps.formName
    };
};

export default compose(
    connect(mapStateToProps),
    reduxForm({})
)(UploadPublishGenerator);
