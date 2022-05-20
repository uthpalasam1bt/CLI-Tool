import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { required } from 'redux-form-validators';

import { TextArea } from '../../../../../UILibrary/components/forms/fields';
import constants from '../../../constants';

const { SIMPLE_COMMENT_FORM } = constants;

const CommentSection = ({ submitting, handleSubmit, isCommentInProgress, saveComment }) => {
    return (
        <form className="add-comment-container" onSubmit={handleSubmit(saveComment)}>
            <Field
                name="comment"
                disabled={isCommentInProgress}
                className="form-control review-comment-input"
                type="text"
                placeholder="Stakeholders of the scheme will be able to reply to this comment"
                component={TextArea}
                validate={required({ message: 'Required' })}
            />
            <button type="submit" disabled={submitting} className="tpip-btn-blue regular">
                Add Comment {isCommentInProgress && <i className="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>}
            </button>
        </form>
    );
};

export default reduxForm({
    form: SIMPLE_COMMENT_FORM
})(CommentSection);
