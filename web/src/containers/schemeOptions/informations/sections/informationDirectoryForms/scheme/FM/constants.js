export const FORM_NAME = 'SCHEME_FORM';
export const FORM_TITLE = 'Provide scheme regulatory information';

// form data field names
export const SCHEMES_FORM_SECTION = {
    KEY: 'schemes',
    NAME: 'schemes',
    FIELD_KEYS: {
        SCHEME_NAME: 'schemeName',
        TRUSTEE_TYPE: 'trusteeType',
        DATE_TRUST_DEED: 'dateOfTrustDeed',
        SCHEME_MEMBER: 'schemeMember',
        ADDRESS_FIELD_NAME: 'addressField',
        NUMBER_OF_TRUSTEES: 'numberOfTrustees',
        NUMBER_OF_TRUSTEES_APPROVE: 'numberOfTrusteesApprove',
        NUMBER_OF_TRUSTEES_SIGN: 'numberOfTrusteesSign',
        PRIMARY_TRUSTEE_NAME: 'primaryTrusteeName',
        PRIMARY_TRUSTEE_EMAIL: 'primaryTrusteeEmail',
        PRIMARY_TRUSTEE_CONTACT: 'primaryTrusteeContact',

        LDI_SCHEME_NAME: 'LDISchemeName',
        LDI_TRUSTEE_TYPE: 'LDITrusteeType'
    }
};
// form labels
export const SCHEMES_FORM_LABELS_SECTION = {
    KEY: 'schemes',
    NAME: 'schemes',
    FIELD_LABELS: {
        SCHEME_NAME_LABEL: 'Scheme name',
        TRUSTEE_TYPE_LABEL: 'Does the scheme have a corporate trustee or individual trustees ?',
        DATE_TRUST_DEED_LABEL: 'Date of trust deed',
        SCHEME_MEMBER_LABEL: 'Approximate number of members in the scheme',
        NUMBER_OF_TRUSTEES_LABEL: 'Number of trustees',
        NUMBER_OF_TRUSTEES_APPROVE_LABEL: 'Number of trustees required to approve strategy change',
        NUMBER_OF_TRUSTEES_SIGN_LABEL: 'Number of trustees required to sign a legal document',
        PRIMARY_TRUSTEE_LABEL: 'Primary trustee  name',
        PRIMARY_TRUSTEE_EMAIL_LABEL: 'Primary trustee contact e-mail',
        PRIMARY_TRUSTEE_CONTACT_LABEL: 'Primary trustee contact phone number',

        LDI_SCHEME_NAME_LABEL: 'LDI Scheme name',
        LDI_TRUSTEE_TYPE_LABEL: 'Does the LDI scheme have a corporate trustee or individual trustees ?'
    }
};
// form titles
export const SCHEMES_FORM_TITLES_SECTION = {
    KEY: 'schemes',
    NAME: 'schemes',
    FIELD_TITLES: {
        ADDRESS_FIELD_TITLE: 'Address of trustees for correspondence',
        PRIMARY_TRUSTEE_DETAILS_TITLE: 'Primary trustee details',
        LDI_PRIMARY_TRUSTEE_DETAILS_TITLE: 'LDI Primary trustee details',
        LDI_SCHEME_DETAILS_TITLE: 'LDI Scheme details '
    }
};
export default { SCHEMES_FORM_SECTION, SCHEMES_FORM_LABELS_SECTION, SCHEMES_FORM_TITLES_SECTION };
