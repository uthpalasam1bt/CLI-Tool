/* 
this file contains all the constants that are used in this template creation using Function config
*/

import React from 'react';

export const FORM_NAME = 'SAMPLE_FORM_THREE'; // from name
export const FORM_TITLE = 'Tab Download Form Data Using Function'; // title to display in the header

export const FORM_I_ICON = ( // icon description to display in the header
    <p>
        Please provide us with information regarding your scheme’s assets and liabilities, along with details of any
        expected contributions. We will use this information to prepare risk analysis and a funding level projection,
        and to design a bespoke portfolio for your scheme. We can only provide this service to UK defined benefit
        pension schemes with assets of more than £10m.
        <br />
        <br />
        You will also need to tell us who you would like to be responsible for approving or commenting on the proposal
        that we make. You can just select yourself, or if you would like to add others then you can do this through the
        ‘User Management’ tab above. If you do decide to appoint us you will be asked to provide full trustee details at
        that stage.
        <br />
        <br />
        Once you have submitted the required information, we will review it and prepare a formal proposal for you to
        review. You will receive a notification when this is available and will be able to access it at the next step.
    </p>
);

export const IICON_TEXT = 'It doesn’t seem to be possible to update some of this information';

export const DOWNLOAD_ZIP_NAME = 'TabFormData'; // name to the downloading zip file
export const EXCEL_TAB_NAME = 'tab-form-data-function'; // name to the excel sheet tab that you downloaded

export const TAB_KEYS = {
    // unique key for each tab and to get the form values from the props in the configuration
    TAB_ONE_FORM: 'tab_one_form',
    TAB_TWO_FORM: 'tab_two_form',
    TAB_THREE_FORM: 'tab_three_form'
};
export const TAB_NAME = {
    // tab name to display
    TAB_ONE: 'Tab One',
    TAB_TWO: 'Tab Two',
    TAB_THREE: 'Tab Three'
};

export const TAB_ONE_FORM_LABELS = {
    // contains the label to tab one configuration file
    SCHEME_NAME: 'Scheme name',
    UPLOAD_HMRC_REGISTERATION: 'Upoad HMRC registration confirmation',
    UPLOAD_LATEST_SCHEME_ACCOUNTS: 'Upload latest scheme accounts',
    NUMBER_OF_MEMBERS: 'Approximate number of members in the scheme',
    NUMBER_OF_TRUSTEES: 'Number of trustees'
};
export const TAB_ONE_FORM_FIELD_NAMES = {
    // contains the field names to tab one configuration file
    SCHEME_NAME: 'schemeName',
    UPLOAD_HMRC_REGISTERATION: 'uploadHmrcReg',
    UPLOAD_LATEST_SCHEME_ACCOUNTS: 'latestSchemeAccounts',
    NUMBER_OF_MEMBERS: 'numOfMembers',
    NUMBER_OF_TRUSTEES: 'numberOfTrustees'
};

export const TAB_TWO_FORM_LABELS = {
    // contains the label to tab two configuration file

    TRUSTEE_BANK_ACCOUNT_NAME: 'Trustee bank account name',
    TRUSTEE_BANK_ACCOUNT_SORT_CODE: 'Trustee bank account sort code',
    SCHEME_YEAR_END_DATE_ANUAL_REPORT: 'Scheme year end date for annual report',
    ACTURAY_COMPANY: 'Scheme actuary firm name',
    ACTUARY_NAME: 'Scheme actuary individual name',
    ACTUARY_EMAIL: 'Scheme actuary email',
    ACTUARY_PHONE: 'Scheme actuary contact name'
};
export const TAB_TWO_FORM_FIELD_NAMES = {
    // contains the label to tab one configuration file

    TRUSTEE_BANK_ACCOUNT_NAME: 'trusteeBankAccountName',
    TRUSTEE_BANK_ACCOUNT_SORT_CODE: 'trusteeBankAccountSortCode',
    SCHEME_YEAR_END_DATE_ANUAL_REPORT: 'schemeYearEndDateAnnualReport',
    ACTURAY_COMPANY: 'actuaryCompany',
    ACTUARY_NAME: 'actuaryName',
    ACTUARY_EMAIL: 'actuaryEmail',
    ACTUARY_PHONE: 'actuaryPhone'
};

export const COMPONENT_TEXT_AREA_NAME = 'schemeTextArea'; // field name to the component that passing to the form tabs as formSection
export const COMPONENT_TEXT_AREA_LABEL = 'Does this scheme have AVCs?'; // field label to component text area
