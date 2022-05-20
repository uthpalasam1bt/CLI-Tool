import React from 'react';

export const FORM_NAME = 'requestIAAForm';
export const FORM_TITLE = 'Provide scheme regulatory information';

export const IAA_FORM_SECTION = {
    KEY: 'iaaForm',
    NAME: 'Information'
};
export const TRUSTEES_FORM_SECTION = {
    KEY: 'trustees',
    NAME: 'Signatories'
};

export const TRUSTEES_PICKER_SECTION = {
    KEY: 'trusteesPicker',
    NAME: 'Signatories'
};

export const REQUEST_A_FORMAL_PROPOSAL_FROM_US = (
    <p>
        Please provide us with the formal scheme information and documents requested below. We need this information to
        carry out due diligence prior to being appointed. <br />
        <br />
        Please also provide us with the complete list of scheme trustees, and upload the deed of appointment which
        confirms this. <br />
        <br />
        The trustee e-mail addresses provided are important, as trustees will use the e-mail address supplied below to
        log into this site, and to approve and digitally sign legal documents. Please confirm e-mail addresses with
        individual trustees before submitting the information below.
        <br />
        <br />
        Once you have submitted the required information, we will review it and prepare legal documents for you to
        review and sign. You will receive a notification when these are available and will be able to access them at the
        next step.
        <br />
        All pension schemes have unique governance documentation structures so we may have questions or require
        additional information in order to complete our checks. If this is the case you will receive a notification
        request to provide additional information. The field at the bottom of the screen entitled "Upload any supporting
        documents requested" will enable you to add this additional information if needed in pdf format.
    </p>
);

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
