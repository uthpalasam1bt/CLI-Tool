import React from 'react';
import { reduxForm } from 'redux-form';
import { INITIAL_PROPOSAL_FORM } from '../constants';

let InitialProposalForm = props => {
    const { handleSubmit, children } = props;
    return (
        <form className="initial-proposal-form" onSubmit={handleSubmit}>
            {children}
        </form>
    );
};

InitialProposalForm = reduxForm({
    form: INITIAL_PROPOSAL_FORM
})(InitialProposalForm);

export default InitialProposalForm;
