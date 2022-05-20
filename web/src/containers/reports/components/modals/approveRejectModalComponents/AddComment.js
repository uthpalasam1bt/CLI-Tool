import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Field, reduxForm, initialize, reset } from 'redux-form';
import { required } from 'redux-form-validators';
import { TextArea } from '../../../../../UILibrary/components/forms/fields';
import { COMMENT_FORM } from '../../../constants/adminReportViewConstant';

function AddComment({ commentValue, handleSubmit }) {
    useEffect(() => {
        initialize(COMMENT_FORM, { comment: commentValue });
    }, [commentValue]);
    return (
        <form onSubmit={handleSubmit}>
            <div className="add-comment-container field-wrapper">
                <Field
                    name="comment"
                    className="form-control input-comment mt-4"
                    type="text"
                    placeholder=""
                    component={TextArea}
                    validate={required({ msg: 'Required' })}
                />
                <button className="tpip-btn-blue regular" type="submit">
                    Add Comment
                </button>
            </div>
        </form>
    );
}

const Form = reduxForm({
    form: COMMENT_FORM,
    destroyOnUnmount: true // a unique identifier for this form
})(AddComment);

export default ({ saveComment, ...rest }) => {
    const dispatch = useDispatch();
    //reset dosent get rid of errors, stopsubmit does get rid of errors
    return (
        <Form
            {...rest}
            onSubmit={formData => dispatch(reset(COMMENT_FORM)) && saveComment((formData || {}).comment || null)}
        />
    );
};
