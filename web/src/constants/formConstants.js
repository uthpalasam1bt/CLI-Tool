export const FORM_STOP_SUBMIT = '@@redux-form/STOP_SUBMIT';
export const FORM_SET_SUBMIT_SUCCEEDED = '@@redux-form/SET_SUBMIT_SUCCEEDED';

export const PROPOSAL_STATUS = {
    PENDING: 'P',
    SUBMITTED: 'S',
    DOWNLOADED: 'D',
    DOCUMENT_PUBLISHED: 'DP',
    REJECTED: 'R',
    APPROVED: 'A',
    COMPLETED: 'C'
};

export const EXECUTION_STATUS = {
    S: { key: 'Signed', className: 'green-dot' },
    P: { key: 'Pending', className: 'orange-dot' },
    R: { key: 'Rejected', className: 'red-dot' }
};

export default {
    FORM_STOP_SUBMIT,
    FORM_SET_SUBMIT_SUCCEEDED,
    EXECUTION_STATUS
};
