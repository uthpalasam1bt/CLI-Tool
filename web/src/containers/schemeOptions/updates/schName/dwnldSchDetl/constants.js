import React from 'react';
export const FORM_TITLE = 'Review scheme details';

export const IICON_TEXT = 'It doesn’t seem to be possible to update some of this information';
export const TAB_KEYS = {
    SCHEME_FORM: 'schemeNameChangeForm',
    ADMIN_FORM: 'schemeNameChangeAdminForm'
};

export const FORM_I_ICON = (
    <p>
    Review the scheme details provided and approve once all necessary KYC and AML checks have been completed.
    <br />
    <br />
    If there is a problem then the workflow can be aborted to send the form back to the client so that they can enter
    new information.
  </p>
);
export const FORM_NAME = 'SchemeForDataDownload';

export const FORM_DRAFT_KEY = 'schemeNameChangeDraft';
export const FORM_DATA_KEY = 'schemeFormData';
export const DEFAULT_DATA_KEY = 'schName';
export const TRUSTEE_TYPE_CORPORATE = "CORPORATE";

export const INDIVIDUAL_TRUSTEE_DETAILS_FIELD_LABELS = {
    TITLE: 'Primary trustee details',
    NAME: 'Primary trustee name',
    FIRST_NAME: 'Primary trustee first name',
    LAST_NAME: 'Primary trustee last name',
    EMAIL: 'Primary trustee contact e-mail',
    PHONE: 'Primary trustee contact phone number',
    OTHER_TRUSTEES: {
        TITLE: 'Other trustees details',
        NAME: 'Name of other trustee',
        FIRST_NAME: 'First name of other trustee',
        LAST_NAME: 'Last name of other trustee',
        EMAIL: 'Email of other trustee',
        PHONE: 'Contact number of other trustee'
    }
};

export const COPORATE_TRUSTEE_DETAILS_FIELD_LABELS = {
    TITLE: 'Authorised signatory details',
    NAME: 'Authorised signatory name',
    FIRST_NAME: 'Authorised signatory first name',
    LAST_NAME: 'Authorised signatory last name',
    EMAIL: 'Authorised signatory contact e-mail',
    PHONE: 'Authorised signatory contact phone number',
    OTHER_TRUSTEES: {
        TITLE: 'Other authorised signatory details',
        NAME: 'Authorised signatory name',
        FIRST_NAME: 'Authorised signatory first name',
        LAST_NAME: 'Authorised signatory last name',
        EMAIL: 'Authorised signatory e-mail',
        PHONE: 'Authorised signatory phone number'
    }
};
export const SCHEME_FORM_FIELD_NAMES = {
    NAME: 'Scheme',
    SCHEME_NAME: 'schemeName',
    CORPORATEORINDIVIDUAL: 'coporateOrIndividual',
    COPORATE_TRUSTEE_ENTITY_NAME: 'coporateTrusteeEntityName',
    UPLOAD_LATEST_DEED_OF_TRUSTEE_APPOINTMENT: 'trustDeed',
    UPLOAD_HMRC_REGISTERATION: 'hmrcDocument',
    UPLOAD_LATEST_SCHEME_ACCOUNTS: 'schemeAccount',
    DATE_OF_TRUST_DEED: 'dateOfTrustDeed',
    NUMBER_OF_MEMBERS: 'numberOfMembers',
    ADDRESS_LINE1: 'addressLine1',
    ADDRESS_LINE2: 'addressLine2',
    ADDRESS_LINE3: 'addressLine3',
    CITY: 'city',
    POSTCODE: 'postCode',
    CERTIFICATE_OF_INCORPATION: 'certificateOfIncorporation',
    PRIMARY_TRUSTEE_CONTACT: 'primaryTrusteeContact',
    PRIMARY_TRUSTEE_CONTACT_EMAIL: 'primaryTrusteeContactEmail',
    PRIMARY_TRUSTEE_CONTACT_PHONE: 'primaryTrusteeContactPhone',

    PRIMARY_CONTACT_FIRST_NAME: 'primaryContactFirstName',
    PRIMARY_CONTACT_LAST_NAME: 'primaryContactLastName',

    OTHER_TRUSTEES: 'otherTrustees',
    OTHER_TRUSTEE_NAME: 'otherTrusteeName',
    OTHER_TRUSTEE_FIRST_NAME: 'otherTrusteeFirstName',
    OTHER_TRUSTEE_LAST_NAME: 'otherTrusteeLastName',
    OTHER_TRUSTEE_EMAIL: 'otherTrusteeEmail',
    OTHER_TRUSTEE_PHONE: 'otherTrusteePhone',
    NUMBER_OF_TRUSTEES: 'numberOfTrustees',
    ADDRESS_OF_TRUSTEES_FOR_CORRESPONDENCE: 'addressOfTrusteesForCorrespondence',
    HOLD_LESS_LIQUUD_ASSETS: 'avoidLessLiquidAssets',
    FULLY_ESG_PORTFOLIO: 'fullyEsgPortfolio',
    UPLOAD_OTHER_DOCUMENTS_REGISTERATION: 'otherDocuments'
};

export const ADMIN_FORM_FIELD_NAMES = {
    NAME: 'Administration',
    FEE_PAYMENT_METHOD: 'feePaymentMethod',
    TRUSTEE_BANK_ACCOUNT_NAME: 'trusteeBankAccountName',
    TRUSTEE_BANK_ACCOUNT_NUMBER: 'trusteeBankAccountNumber',
    TRUSTEE_BANK_ACCOUNT_SORT_CODE: 'trusteeBankAccountShortCode',
    TRUSTEE_BANK_NAME: 'trusteeBankName',
    SCHEME_YEAR_END_DATE_ANUAL_REPORT: 'SchemeYearEndDateForAnnualReport',
    SCHEME_HAVE_AVCS: 'doesSchemeHaveAVC',
    NAME_OF_AVC_PROVIDER: 'nameOfAVCProvider',
    DESCRIBE_AVC_FUNDS_HELD: 'describeTypeOfAVCFundsHeld',
    WISH_TO_DELIGATE_AUTHORITY: 'wishToDelegateAuthority',
    NAME_OF_ADMIN_COMPANY: 'nameOfAdminCompany',
    PRIMARY_CONTACT_NAME: 'primaryContactName',

    PRIMARY_CONTACT_EMAIL: 'primaryContactEmail',
    PRIMARY_CONTACT_PHONE: 'primaryContactPhone',
    AUTHORIZED_INDIVIDUAL_NAME: 'name',
    AUTHORIZED_INDIVIDUAL_DISINVESTMENT_LIMIT: 'disinvestmentLimit',
    AUTHORIZED_INDIVIDUAL_CONTACT_MAIL: 'contactEmail',
    AUTHOZED_INDIDUAL_CONTACT_NUMBER: 'contactPhoneNumber',
    UPLOAD_LETTER_AUTH_REQ_DISINVEST: 'uploadLetterAuthReDisInvest',
    UPLOAD_LETER_CONFIRM_AUTH_INDI: 'uploadLetterConfirmAuthIndi',
    ADMIN_LIST: 'adminList',
    ACTURAY_COMPANY: 'actuaryCompany',
    ACTUARY_NAME: 'actuaryName',
    ACTUARY_EMAIL: 'actuaryEmail',
    ACTUARY_PHONE: 'actuaryPhone'
};

export const SCHEME_FORM_FIELD_LABELS = isCoporate => ({
    [SCHEME_FORM_FIELD_NAMES.SCHEME_NAME]: 'Scheme name',
    [SCHEME_FORM_FIELD_NAMES.CORPORATEORINDIVIDUAL]: 'Does the scheme have a corporate trustee or individual trustees?',
    [SCHEME_FORM_FIELD_NAMES.COPORATE_TRUSTEE_ENTITY_NAME]: 'Corporate Trustee Entity Name',
    [SCHEME_FORM_FIELD_NAMES.UPLOAD_LATEST_DEED_OF_TRUSTEE_APPOINTMENT]:
        'Upload latest Deed of Trustee Appointment and Removal',
    [SCHEME_FORM_FIELD_NAMES.UPLOAD_HMRC_REGISTERATION]: 'Upoad HMRC registration confirmation',
    [SCHEME_FORM_FIELD_NAMES.UPLOAD_OTHER_DOCUMENTS_REGISTERATION]: 'Upload any supporting documents requested',
    [SCHEME_FORM_FIELD_NAMES.UPLOAD_LATEST_SCHEME_ACCOUNTS]: 'Upload latest scheme accounts',
    [SCHEME_FORM_FIELD_NAMES.DATE_OF_TRUST_DEED]: 'Date of Trust Deed',
    [SCHEME_FORM_FIELD_NAMES.NUMBER_OF_MEMBERS]: 'Approximate number of members in the scheme',
    [SCHEME_FORM_FIELD_NAMES.ADDRESS_LINE1]: 'Address',
    [SCHEME_FORM_FIELD_NAMES.CITY]: 'City',
    [SCHEME_FORM_FIELD_NAMES.POSTCODE]: 'Postcode',
    [SCHEME_FORM_FIELD_NAMES.HOLD_LESS_LIQUUD_ASSETS]:
        'Do you want to avoid holding less liquid assets, such as property?',
    [SCHEME_FORM_FIELD_NAMES.FULLY_ESG_PORTFOLIO]:
        'Do you want to fully integrate Environmental, Social and Governance (ESG) themes within your portfolio allocation?',
    [SCHEME_FORM_FIELD_NAMES.CERTIFICATE_OF_INCORPATION]: 'Certificate of incorporation (for corporate trustees)',
    PRIMARY_TRUSTEE_DETAILS_TITLE: INDIVIDUAL_TRUSTEE_DETAILS_FIELD_LABELS.TITLE,
    [SCHEME_FORM_FIELD_NAMES.PRIMARY_TRUSTEE_CONTACT]: INDIVIDUAL_TRUSTEE_DETAILS_FIELD_LABELS.NAME,
    [SCHEME_FORM_FIELD_NAMES.PRIMARY_TRUSTEE_CONTACT_EMAIL]: isCoporate
        ? COPORATE_TRUSTEE_DETAILS_FIELD_LABELS.EMAIL
        : INDIVIDUAL_TRUSTEE_DETAILS_FIELD_LABELS.EMAIL,
    [SCHEME_FORM_FIELD_NAMES.PRIMARY_TRUSTEE_CONTACT_PHONE]: isCoporate
        ? COPORATE_TRUSTEE_DETAILS_FIELD_LABELS.PHONE
        : INDIVIDUAL_TRUSTEE_DETAILS_FIELD_LABELS.PHONE,
    OTHER_TRUSTEE_TITLE: INDIVIDUAL_TRUSTEE_DETAILS_FIELD_LABELS.OTHER_TRUSTEES.TITLE,
    [SCHEME_FORM_FIELD_NAMES.OTHER_TRUSTEE_NAME]: INDIVIDUAL_TRUSTEE_DETAILS_FIELD_LABELS.OTHER_TRUSTEES.NAME,
    [SCHEME_FORM_FIELD_NAMES.OTHER_TRUSTEE_FIRST_NAME]: isCoporate
        ? COPORATE_TRUSTEE_DETAILS_FIELD_LABELS.OTHER_TRUSTEES.FIRST_NAME
        : INDIVIDUAL_TRUSTEE_DETAILS_FIELD_LABELS.OTHER_TRUSTEES.FIRST_NAME,
    [SCHEME_FORM_FIELD_NAMES.OTHER_TRUSTEE_LAST_NAME]: isCoporate
        ? COPORATE_TRUSTEE_DETAILS_FIELD_LABELS.OTHER_TRUSTEES.LAST_NAME
        : INDIVIDUAL_TRUSTEE_DETAILS_FIELD_LABELS.OTHER_TRUSTEES.LAST_NAME,
    [SCHEME_FORM_FIELD_NAMES.OTHER_TRUSTEE_EMAIL]: isCoporate
        ? COPORATE_TRUSTEE_DETAILS_FIELD_LABELS.OTHER_TRUSTEES.EMAIL
        : INDIVIDUAL_TRUSTEE_DETAILS_FIELD_LABELS.OTHER_TRUSTEES.EMAIL,
    [SCHEME_FORM_FIELD_NAMES.OTHER_TRUSTEE_PHONE]: isCoporate
        ? COPORATE_TRUSTEE_DETAILS_FIELD_LABELS.OTHER_TRUSTEES.PHONE
        : INDIVIDUAL_TRUSTEE_DETAILS_FIELD_LABELS.OTHER_TRUSTEES.PHONE,
    [SCHEME_FORM_FIELD_NAMES.NUMBER_OF_TRUSTEES]: 'Number of trustees',
    [SCHEME_FORM_FIELD_NAMES.ADDRESS_OF_TRUSTEES_FOR_CORRESPONDENCE]: 'Address of trustees for correspondence',
    [SCHEME_FORM_FIELD_NAMES.PRIMARY_CONTACT_FIRST_NAME]: isCoporate
        ? COPORATE_TRUSTEE_DETAILS_FIELD_LABELS.FIRST_NAME
        : INDIVIDUAL_TRUSTEE_DETAILS_FIELD_LABELS.FIRST_NAME,
    [SCHEME_FORM_FIELD_NAMES.PRIMARY_CONTACT_LAST_NAME]: isCoporate
        ? COPORATE_TRUSTEE_DETAILS_FIELD_LABELS.LAST_NAME
        : INDIVIDUAL_TRUSTEE_DETAILS_FIELD_LABELS.LAST_NAME,
    [SCHEME_FORM_FIELD_NAMES.OTHER_TRUSTEES]: INDIVIDUAL_TRUSTEE_DETAILS_FIELD_LABELS.OTHER_TRUSTEES.TITLE,
    CORPORATE_TRUSTEE: { ...COPORATE_TRUSTEE_DETAILS_FIELD_LABELS }
});

export const ADMIN_FORM_FIELD_LABELS = {
    [ADMIN_FORM_FIELD_NAMES.FEE_PAYMENT_METHOD]: 'Fee payment method',
    [ADMIN_FORM_FIELD_NAMES.TRUSTEE_BANK_ACCOUNT_NAME]: '$ttbkac$  name',
    [ADMIN_FORM_FIELD_NAMES.TRUSTEE_BANK_ACCOUNT_NUMBER]: '$ttbkac$ number',
    [ADMIN_FORM_FIELD_NAMES.TRUSTEE_BANK_ACCOUNT_SORT_CODE]: '$ttbkac$ sort code',
    [ADMIN_FORM_FIELD_NAMES.TRUSTEE_BANK_NAME]: 'Trustee bank name',
    [ADMIN_FORM_FIELD_NAMES.SCHEME_YEAR_END_DATE_ANUAL_REPORT]: 'Scheme year end date for annual report',
    [ADMIN_FORM_FIELD_NAMES.SCHEME_HAVE_AVCS]: 'Does this scheme have $avc$s?',
    [ADMIN_FORM_FIELD_NAMES.NAME_OF_AVC_PROVIDER]: 'Name of $avc$ provider',
    [ADMIN_FORM_FIELD_NAMES.DESCRIBE_AVC_FUNDS_HELD]: 'Describe the type of $avc$ funds held',
    [ADMIN_FORM_FIELD_NAMES.WISH_TO_DELIGATE_AUTHORITY]:
        'Do you wish to deligate authority to request disinvestements (e.g. to an administrator)',
    [ADMIN_FORM_FIELD_NAMES.NAME_OF_ADMIN_COMPANY]: 'Name of administrator Company (if applicable)',
    [ADMIN_FORM_FIELD_NAMES.PRIMARY_CONTACT_NAME]: 'Primary contact name',
    [ADMIN_FORM_FIELD_NAMES.PRIMARY_CONTACT_EMAIL]: 'Primary contact email',
    [ADMIN_FORM_FIELD_NAMES.PRIMARY_CONTACT_PHONE]: 'Primary contact phone',
    [ADMIN_FORM_FIELD_NAMES.AUTHORIZED_INDIVIDUAL_NAME]: 'Authorised individual name',
    [ADMIN_FORM_FIELD_NAMES.AUTHORIZED_INDIVIDUAL_DISINVESTMENT_LIMIT]: 'Authorised individual disinvestment limit (£)',
    [ADMIN_FORM_FIELD_NAMES.AUTHORIZED_INDIVIDUAL_CONTACT_MAIL]: 'Authorised indivudual contact email',
    [ADMIN_FORM_FIELD_NAMES.AUTHOZED_INDIDUAL_CONTACT_NUMBER]: 'Authorised individual contact phone number',
    [ADMIN_FORM_FIELD_NAMES.UPLOAD_LETTER_AUTH_REQ_DISINVEST]:
        'Please upload a copy of the letter authorising delegates to request disinvestments',
    [ADMIN_FORM_FIELD_NAMES.UPLOAD_LETER_CONFIRM_AUTH_INDI]:
        'Please upload a copy of the letter from the adminsitrator confirming the authorised individuals',
    ADMIN_CONTAINER_TITLE: 'Authorised individuals',
    PRIMARY_ADMIN_TITLE: 'Primary administrator details',
    [ADMIN_FORM_FIELD_NAMES.ACTURAY_COMPANY]: 'Scheme actuary firm name',
    [ADMIN_FORM_FIELD_NAMES.ACTUARY_NAME]: 'Scheme actuary individual name',
    [ADMIN_FORM_FIELD_NAMES.ACTUARY_EMAIL]: 'Scheme actuary email',
    [ADMIN_FORM_FIELD_NAMES.ACTUARY_PHONE]: 'Scheme actuary contact name'
};

export const ACTIONS = {
    CHECK_IF_SCHEME_EXISTS: 'CHECK_IF_SCHEME_EXISTS',
    CHECK_SCHEME_NAME_AVALIBILITY_SUCCESS: 'CHECK_SCHEME_NAME_AVALIBILITY_SUCCESS'
};

export const FEE_PAYMENT_METHOD_MAP = {
    directEnchashmentOfUnits: 'Encashment of units',
    invoiceWithSeperateCashSettlement: 'Separate Invoice'
};

export const NETWORK_ERROR = 'Error occurred while validating scheme name';

export const SYSTEM_MESSAGE_REQUESTED = 'Input scheme name requested.'; //'Change scheme name requested.';

export const SYSTEM_MESSAGE_DRAFT = 'Information saved.';

export const SELECT_SIGNATORIES_ERROR = 'Please select at least two signatories to continue.';

export const VALIDATING_SCHEME_NAME = 'Please wait until scheme name validation is complete.';

export const DOWNLOAD_ZIP_NAME = 'scheme_name_change';
export const EXCEL_FILE_NAME = 'Update_scheme_name_form';
