import React from 'react';
import { reduxForm } from 'redux-form';

let InitialProposalForm = props => {
    const { handleSubmit, children } = props;
    return (
        <form className="initial-proposal-form" onSubmit={handleSubmit}>
            {children}
        </form>
    );
};

InitialProposalForm = reduxForm({
    form: 'initialProposalForm'
})(InitialProposalForm);

export default InitialProposalForm;
