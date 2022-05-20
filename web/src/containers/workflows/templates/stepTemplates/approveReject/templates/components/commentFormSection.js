import React from 'react';
import { Row } from 'antd';
import { Field, reduxForm } from 'redux-form';
import { required } from 'redux-form-validators';

import { TextArea } from '../../../../../../../UILibrary/components/forms/fields';
import constants from '../../../../../constants';

const { APPROVE_REJECT_CONFIRM_COMMENT_FORM } = constants;

const CommentForm = ({ handleSubmit, handleHide, isSubmitInProgress, isRequired, isApprove }) => {
    return (
        <form className="approve-comment-form" onSubmit={handleSubmit}>
            <label className="comment-form-label">
                Comment {!isApprove && <span className="required-star">*</span>}
            </label>
            <Field
                name="comment"
                className="form-control input-comment"
                type="text"
                placeholder=""
                component={TextArea}
                validate={isRequired ? required({ msg: 'Required' }) : null}
            />
            <Row className="form-btn-container" type="flex" justify="end">
                <button className="btn btn-grey-o regular btn-close" type="button" onClick={handleHide}>
                    Close
                </button>
                <button
                    type="submit"
                    className={`btn btn-${isApprove ? 'green' : 'red'} regular`}
                    disabled={isSubmitInProgress}
                >
                    {isApprove ? 'Approve' : 'Reject'}{' '}
                    {isSubmitInProgress && <i className="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>}
                </button>
            </Row>
        </form>
    );
};

export default reduxForm({
    form: APPROVE_REJECT_CONFIRM_COMMENT_FORM
})(CommentForm);
