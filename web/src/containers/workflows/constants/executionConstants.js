const SIGNATORY_TABLE_EXECUTION = 'SIGNATORY_TABLE_EXECUTION';

export const EXECUTION_STATUS_ERROR_MESSAGE_ALL_USERS_MUST_SIGN = 'One or more users have yet to sign the document.';

const EXECUTION_STATUS = {
    S: { key: 'Signed', className: 'green-dot' },
    P: { key: 'Pending', className: 'orange-dot' },
    R: { key: 'Rejected', className: 'red-dot' }
};

const DOCUMENT_STATUS = {
    SIGNED: 'SIGNED',
    PENDING: 'PENDING',
    UPLOADED: 'UPLOADED'
};

const SIGNATORY_STATUS = {
    SIGNED: 'S',
    PENDING: 'P'
};

const DOC_SIGNED_STATUS = 'SIGNED';
const DOC_SIGNED_UPDATE_TYPE = 'SIGN';

export {
    SIGNATORY_TABLE_EXECUTION,
    EXECUTION_STATUS,
    DOC_SIGNED_STATUS,
    DOC_SIGNED_UPDATE_TYPE,
    SIGNATORY_STATUS,
    DOCUMENT_STATUS
};
