import React from 'react';
export const FORM_NAME = 'ADMINISTRATION_FORM';
export const FORM_TITLE = 'Provide Administration information';

// classifications
export const FM = 'FM';
export const LDI = 'LDI';
export const LDI_FM = 'LDI_FM';

export const ADMIN_FORM_FIELD_NAMES = {
    FEE_PAYMENT_METHOD: 'feePaymentMethod',
    TRUSTEE_BANK_ACCOUNT_NAME: 'trusteeBankAccountName',
    TRUSTEE_BANK_ACCOUNT_NUMBER: 'trusteeBankAccountNumber',
    TRUSTEE_BANK_ACCOUNT_SORT_CODE: 'trusteeBankAccountSortCode',
    TRUSTEE_BANK_NAME: 'trusteeBankName',
    SCHEME_YEAR_END_DATE_ANUAL_REPORT: 'schemeYearEndDateAnnualReport',
    SCHEME_HAVE_AVCS: 'doesSchemeHaveAcs',
    NAME_OF_AVC_PROVIDER: 'nameOfAvcProvider',
    DESCRIBE_AVC_FUNDS_HELD: 'describeAvcFundsHeld',
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

export const ADMIN_FORM_FIELD_LABELS = {
    [ADMIN_FORM_FIELD_NAMES.FEE_PAYMENT_METHOD]: 'Fee payment method',
    [ADMIN_FORM_FIELD_NAMES.TRUSTEE_BANK_ACCOUNT_NAME]: 'Trustee bank account name',
    [ADMIN_FORM_FIELD_NAMES.TRUSTEE_BANK_ACCOUNT_NUMBER]: 'Trustee bank account number',
    [ADMIN_FORM_FIELD_NAMES.TRUSTEE_BANK_ACCOUNT_SORT_CODE]: 'Trustee bank account sort code',
    [ADMIN_FORM_FIELD_NAMES.TRUSTEE_BANK_NAME]: 'Trustee bank name',
    [ADMIN_FORM_FIELD_NAMES.SCHEME_YEAR_END_DATE_ANUAL_REPORT]: 'Scheme year end date for annual report',
    [ADMIN_FORM_FIELD_NAMES.SCHEME_HAVE_AVCS]: 'Does this scheme have AVCs?',
    [ADMIN_FORM_FIELD_NAMES.NAME_OF_AVC_PROVIDER]: 'Name of AVC proider',
    [ADMIN_FORM_FIELD_NAMES.DESCRIBE_AVC_FUNDS_HELD]: 'Describe the type of AVC funds held',
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

export const LDI_ADMIN_FORM_FIELD_NAMES = {
    FEE_PAYMENT_METHOD: 'feePaymentMethod',
    SCHEME_YEAR_END_DATE_ANUAL_REPORT: 'schemeYearEndDateAnnualReport',
    SCHEME_HAVE_AVCS: 'doesSchemeHaveAcs',
    NAME_OF_AVC_PROVIDER: 'nameOfAvcProvider',
    DESCRIBE_AVC_FUNDS_HELD: 'describeAvcFundsHeld',
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

export const LDI_ADMIN_FORM_FIELD_LABELS = {
    [ADMIN_FORM_FIELD_NAMES.FEE_PAYMENT_METHOD]: 'Fee payment method(LDI)',
    [ADMIN_FORM_FIELD_NAMES.SCHEME_YEAR_END_DATE_ANUAL_REPORT]: 'Scheme year end date for annual report (LDI)',
    [ADMIN_FORM_FIELD_NAMES.SCHEME_HAVE_AVCS]: 'Does this scheme(LDI) have AVCs?',
    [ADMIN_FORM_FIELD_NAMES.NAME_OF_AVC_PROVIDER]: 'Name of AVC proider',
    [ADMIN_FORM_FIELD_NAMES.DESCRIBE_AVC_FUNDS_HELD]: 'Describe the type of AVC funds held',
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
    [ADMIN_FORM_FIELD_NAMES.ACTURAY_COMPANY]: 'Scheme (LDI) actuary firm name',
    [ADMIN_FORM_FIELD_NAMES.ACTUARY_NAME]: 'Scheme (LDI) actuary individual name',
    [ADMIN_FORM_FIELD_NAMES.ACTUARY_EMAIL]: 'Scheme (LDI) actuary email',
    [ADMIN_FORM_FIELD_NAMES.ACTUARY_PHONE]: 'Scheme (LDI) actuary contact name'
};
