import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { required, email } from 'redux-form-validators';
import { InputField } from '../../../UILibrary/components/forms/fields';

let ForgotPasswordForm = props => {
    const { inProgress, handleSubmit } = props;

    return (
        <form className="forgot-password-form" onSubmit={handleSubmit}>
            <div className="form-group input-wrap">
                <label className="input-title" htmlFor="email">
                    Email
                </label>
                <Field
                    name="email"
                    className="form-control"
                    component={InputField}
                    validate={[required({ message: 'Required' }), email({ message: 'Invalid email address.' })]}
                    isEmail={true}
                />
            </div>
            <button className="btn-submit tpip-btn-blue regular" type="submit" disabled={inProgress}>
                Reset password {inProgress && <i className="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>}
            </button>
        </form>
    );
};

ForgotPasswordForm = reduxForm({
    form: 'forgotPasswordForm'
})(ForgotPasswordForm);

export default ForgotPasswordForm;
