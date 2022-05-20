
import React from 'react';

export const FORM_NAME = 'CHNG_TRUST'; // name for the redux form
export const FORM_TITLE = 'Change trustees'; // Text for title to display in the header
export const TOGGLEBUTTONGROUP = 'buttonGroup'; // Button Group name
export const ENTERVALUE = 'enterValue'; // Button Group

export const ERROR_NUMBER_OF_TRUSTEES = {
    INDIVIDUAL: 'There is a discrepancy in the number of trustees.',
    COPORATE: 'There is a discrepancy in the number of authorised persons.'
};
export const I_ICON_OTP_NUMBER_DETAILS =
    'We will send a text message to this number for verification purposes when you sign documents digitally.';

export const I_ICON_OTP_NUMBER_NOT_MATCH_DETAILS =
    'The mobile phone number of this Trustee does not match the mobile phone number saved in the platform. Please verify the new number with the Trustee.';

export const TrusteeTypes = {
    INDIVIDUAL_TRUSTEE: 'individual_trustee',
    CORPORATE_TRUSTEE: 'corporate_trustee'
};
export const PICK_USER_I_ICON = 'Pick signatories'; // icon discription
export const PICK_USER_TITLE = 'Pick signatories'; // title to display in  the pick user component header

export const ON_SUBMIT_MESSAGE = 'Change trustees requested.';
export const USER_ROLE_CLIENT = 'client';


export const FORM_FIELD_NAMES = {
    HMRC_DOCUMENTS: 'hmrcDocument',
    SCHEME_ACCOUNT: 'schemeAccount',
    OTHER_DOCUMENTS: 'otherDocuments',
    NUMBER_OF_MEMBERS: 'numberOfMembers',
    ADDRESS_FIELD: 'addressField',
    TRUSTEE_DEED: 'trustDeed',
    CERTIFICATE_OF_INCORPORATION: 'certificateOfIncorporation',
    DATE_OF_TRUST_DEED: 'dateOfTrustDeed',
}

export const FORM_FIELD_LABELS ={
    [FORM_FIELD_NAMES.HMRC_DOCUMENTS]: 'Please upload the HMRC registration confirmation',
    [FORM_FIELD_NAMES.SCHEME_ACCOUNT]: 'Please upload the latest scheme accounts',
    [FORM_FIELD_NAMES.OTHER_DOCUMENTS]: 'Upload any supporting documents requested',
    [FORM_FIELD_NAMES.NUMBER_OF_MEMBERS]: 'Approximate number of members in the scheme',
    [FORM_FIELD_NAMES.TRUSTEE_DEED]: 'Upload latest deed of trustee appointment and removal',
    [FORM_FIELD_NAMES.CERTIFICATE_OF_INCORPORATION]: 'Certificate of incorporation (for corporate trustees)',
    [FORM_FIELD_NAMES.DATE_OF_TRUST_DEED]: 'Date of trust deed',
    INCUBENT_MANAGER_FORM: {
        NAME_OF_EXTERNAL_INVESTMENT_MANAGER:'Name of external invesment manager',
        MANAGER_ACCOUNT_NUMBER: 'Manager account number',
        PRIMARY_CONTACT: 'Primary contact',
        CONTACT_EMAIL_ADDRESS:'Contact email address',
        CONTACT_PHONE_NUMBER: 'Contact phone number',
    }
}