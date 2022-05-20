import React from 'react';

export const FORM_NAME = 'requestIAAForm';
export const FORM_TITLE = 'Approve trustees';

export const I_ICON_PRIMARY_CONTACT_DETAILS =
    'Please note primary contact will not be considered an authorised person.  Authorised persons, who can  approve and sign documents on behalf of the Corporate Trustee are should be entered in section below';

export const I_ICON_AUTHORIZED_PERSON_DETAILS =
    'Minimum of two persons who are authorised to approve and sign on behalf of the corporate trustee.';

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

export const INDIVIDUAL_TRUSTEE_DETAILS_FIELD_LABELS = {
    TITLE: 'Primary trustee details',
    NAME: 'Primary trustee name',
    FIRST_NAME: 'Primary trustee first name',
    LAST_NAME: 'Primary trustee last name',
    EMAIL: 'Primary trustee contact e-mail',
    PHONE: 'Primary trustee contact phone number',
    OTP_SIGN_DOCUMENT: 'Do you want to be able to sign documents digitally?',
    OTP_PHONE: 'Primary trustee mobile phone number',
    OTHER_TRUSTEES: {
        TITLE: 'Other trustees details',
        NAME: 'Name of other trustee',
        FIRST_NAME: 'First name of other trustee',
        LAST_NAME: 'Last name of other trustee',
        EMAIL: 'Email of other trustee',
        PHONE: 'Contact number of other trustee',
        OTP_SIGN_DOCUMENT: 'Do you want to be able to sign documents digitally?',
        OTP_PHONE: 'Mobile phone number of other trustee'
    }
};

export const COPORATE_TRUSTEE_DETAILS_FIELD_LABELS = {
    TITLE: 'Authorised signatory details',
    NAME: 'Authorised signatory name',
    FIRST_NAME: 'Authorised signatory first name',
    LAST_NAME: 'Authorised signatory last name',
    EMAIL: 'Authorised signatory contact e-mail',
    PHONE: 'Authorised signatory contact phone number',
    OTP_SIGN_DOCUMENT: 'Do you want to be able to sign documents digitally?',
    OTP_PHONE: 'Authorised signatory mobile phone number',
    OTHER_TRUSTEES: {
        TITLE: 'Other authorised signatory details',
        NAME: 'Authorised signatory name',
        FIRST_NAME: 'Authorised signatory first name',
        LAST_NAME: 'Authorised signatory last name',
        EMAIL: 'Authorised signatory e-mail',
        PHONE: 'Authorised signatory phone number',
        OTP_SIGN_DOCUMENT: 'Do you want to be able to sign documents digitally?',
        OTP_PHONE: 'Authorised signatory mobile phone number'
    }
};

export const USER_ROLE_CLIENT = 'client';
