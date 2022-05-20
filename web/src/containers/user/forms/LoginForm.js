import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { InputField, PasswordVisibileField } from '../../../UILibrary/components/forms/fields';
import { required, email } from 'redux-form-validators';

let LoginForm = props => {
    const { inProgress, handleSubmit, handleShowForgotPasswordModal } = props;

    return (
        <form className="login-form" onSubmit={handleSubmit}>
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
            <div className="form-group input-wrap">
                <label className="input-title" htmlFor="password">
                    Password
                </label>
                <Field
                    name="userPassword"
                    component={PasswordVisibileField}
                    validate={[required({ message: 'Required' })]}
                />
            </div>
            <span className="login-form-forgot text-link" onClick={handleShowForgotPasswordModal}>
                Forgot your password?
            </span>
            <button className="btn-submit tpip-btn-blue regular" type="submit" disabled={inProgress}>
                Sign In {inProgress && <i className="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>}
            </button>
        </form>
    );
};

LoginForm = reduxForm({
    form: 'loginForm'
})(LoginForm);

export default LoginForm;
