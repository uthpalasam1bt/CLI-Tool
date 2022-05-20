import React from 'react';

export const FORM_NAME = 'TAB_FORM';
export const FORM_TITLE = 'Provide data for $invadvsmpl$';

export const FORM_I_ICON = (
    <p>
        Please provide us with the information below so that we can provide you with formal investment advice and
        prepare your Investment Management Agreement.
        <br />
        <br />
        The asset and liability information provided at the proposal stage has been used to pre-populate the relevant
        fields below, but you can refine or adjust the inputs at this stage.
        <br />
        <br />
        The target return is a particularly important input, as this will determine the level of risk we take in the
        portfolio. However, you will have the opportunity to adjust this and consider the impact of alternative return
        targets once we have completed our analysis.
        <br />
        <br />
        Once you have submitted the required information, we will review it and prepare our formal investment advice for
        you to review. You will receive a notification when this is available and will be able to access it at the next
        step.
    </p>
);

export const LIABILITY_VALUE_AND_DETAILS_OF_THE_VALUATION_BASIS = (
    <p>
        If you can provide us with a liability value then we’ll be able to illustrate the potential impact of different
        investment strategies on your funding level. We’ll also need to understand how your Scheme Actuary has
        calculated the value - in particular we need to know how the average discount rate the Scheme Actuary has used
        in their valuation compares to the yield on government bonds (gilts).
        <br />
        <br />
        If the Scheme Actuary can provide a liability value on a ‘gilts basis’ this is likely to be best - the ‘margin’
        between the discount rate used and a gilt yield will be 0% in this case.
        <br />
        <br />
        If you would prefer us to consider your ‘Technical Provisions’ liabilities, then you can ask your Scheme Actuary
        to tell you what the average margin is in their basis relative to gilt yields. For example, a typical Technical
        Provisions liability measure might be calculated with a discount rate margin above gilt yields of 1%-2%.
    </p>
);

export const INVESTMENT_FORM_SECTION = {
    KEY: 'investment',
    NAME: 'Investment',
    FIELD_KEYS: {
        PROPOSAL_NAME: 'proposalName',
        EXISTING_PROPOSALS: 'existingProposals',
        ASSET_VALUE: 'assetValue',
        ASSET_VAL_DATE: 'assetValueDate',
        KNOW_TARGET_RETURN: 'knowTR',
        TARGET_RETURN: 'targetReturn',
        KNOW_CURRENT_ASSET_ALLOCATION: 'knowCAA',
        CURRENT_ASSET_ALLOCATION_TYPE: 'currentAssetAT',

        SIMPLE_EQUITIES: 'simpleEquities',
        SIMPLE_CORPORATE_BONDS: 'simpleCorporateBonds',
        SIMPLE_PROPERTY: 'simpleProperty',
        SIMPLE_GOVERNMENT_BONDS: 'simpleGovernmentBonds',
        SIMPLE_ALTERNATIVES: 'simpleAlternatives',
        SIMPLE_CASH: 'simpleCash',
        SIMPLE_DIVERSIFIED_GROWTH: 'simpleDiversifiedGrowth',
        SIMPLE_BUY_IN: 'simpleBuyIn',

        DETAIL_UK_EQUITY: 'detailEquity',
        DETAIL_DIVERSIFIED_GROWTH: 'detailDiversifiedGrowth',
        DETAIL_GLOBAL_EQUITY: 'detailGlobalEquity',
        DETAIL_CORPORATE_BONDS: 'detailCorporateBonds',
        DETAIL_EMERGING_MARKET_EQUITY: 'detailEmergingMarketEquity',
        DETAIL_OVERSEAS_SOVEREIGN_BONDS: 'detailOverseasSovereignBonds',
        DETAIL_HIGH_YIELD_BONDS: 'detailHighYieldBonds',
        DETAIL_NOMINAL_GILTS: 'detailNominalGilts',
        DETAIL_EMERGING_MARKET_DEBT: 'detailEmergingMarketDebt',
        DETAIL_INDEX_LINKED_GILTS: 'detailIndexLinkedGilts',
        DETAIL_PROPERTY: 'detailProperty',
        DETAIL_LDI: 'detailLDI',
        DETAIL_INFRASTRUCTURE: 'detailInfrastructure',
        DETAIL_CASH: 'detailCash',
        DETAIL_BUY_IN: 'detailBuyIn',

        ASSET_ALLOCATION_TOTAL: 'assetAllocationTotal',

        KNOW_LIABILITY_HEDGE_RATIO: 'knowLiabilityHR',
        INTEREST_RATE_HEDGE_RATIO: 'interestRateHR',
        INFLATION_HEDGE_RATIO: 'inflationHR',
        KNOW_TOTAL_AM_ICF: 'knowTotalAMICF',
        AM_AND_CF: 'amAndCf',
        INITIAL_PROPOSAL_NAME: 'initialProposalName',
        HOLD_LESS_LIQUUD_ASSETS: 'avoidLessLiquidAssets',
        FULLY_ESG_PORTFOLIO: 'fullyEsgPortfolio',

        KNOW_LIABILITY_DURATION: 'knowLiabilityDuration',
        LIABILITY_DURATION: 'liabilityDuration',
        KNOW_PERCENT_LLTF: 'knowPercentLLTF',
        PROPORTION_OF_LLTF: 'proportionOfLLTF',
        HAVE_PAST_SLC_TO_UPLOAD: 'havePastSLCToUpload',
        CASHFLOW_TYPE_TO_UPLOAD: 'cashflowTypeToUpload',
        CASHFLOW_ATTACHMENT_OVERALL: 'cashflowAttachmentOverall',
        CASHFLOW_ATTACHMENT_FNR: 'cashflowAttachmentFnR',
        DATE_CASHFLOWS_PRODUCED: 'dataCashflowsProduced',
        KNOW_LIABILITY_VALUE_MDT: 'knowLiabilityValueMDT',
        LIABILITY_VALUE: 'liabilityValue',
        AVG_MARGIN_LDR_AND_GY: 'avgMarginLDRAndGY',
        DATE_VALUE_PROVIDED: 'dataValueProvided',
        BASIS_VALUE_PROVIDED: 'basisValueProvided',

        LIKE_TO_SEE_PROJECTION_OYFP: 'likeToSeeProjectionOYFP',
        WANT_US_TO_MODEL_DC: 'wantUsToModelDC',
        WANT_US_TO_UPLOAD_DCES: 'wantUsToUploadDCES',
        DEFICIT_CONTRIBUTION_COUNT: 'deficitContributionCount',
        DEFICIT_CONTRIBUTION_VALUE: 'deficitContributionValue',
        DEFICIT_CONTRIBUTION_DATE: 'deficitContributionDate',
        DCFS_ATTACHMENT: 'dcfsAttachment',
        SCHEME_OPEN_TO_FUTURE_ACCRUAL: 'schemeOpenToFutureAccrual',
        CURRENT_ANNUAL_CA: 'currentAnnualCA',
        COMBINED_COMPANY_MC_RA: 'combinedCompanyMCRA',
        HAVE_TARGET_BUYOUT_VALUE: 'haveTargetBuyoutValue',
        TARGET_BUYOUT_VALUE: 'targetBuyoutValue',

        LIKE_TO_INCLUDE_FLT: 'likeToIncludeFLT',
        DEFICIT_CONTRIBUTION_SECTION: 'dificit contribution section ',
        THE_SCHEME_OPEN_TO_FUTURE_ACCRUAL_OF_NEW_BENEFITS: '',
        THE_CURRENT_ANNUAL_COST_OF_NEW_BENEFIT_ACCRUAL: ''
    }
};
export const TrusteeTypes = {
    INDIVIDUAL_TRUSTEE: 'individual_trustee',
    CORPORATE_TRUSTEE: 'corporate_trustee'
};
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

export const ADMINISTRATION_FORM_SECTION = {
    KEY: 'administration',
    NAME: 'Administration',
    FIELD_KEYS: {
        FEE_PAYMENT_METHOD: 'feePaymentMethod',
        TRUSTEE_BANK_ACCOUNT_NAME: 'trusteeBankAccountName',
        TRUSTEE_BANK_ACCOUNT_NO: 'trusteeBankAccountNumber',
        TRUSTEE_BANK_ACCOUNT_SHORT_CODE: 'trusteeBankAccountShortCode',
        TRUSTEE_BANK_NAME: 'trusteeBankName',
        SCHEME_YEAR_END_DATE_FOR_ANNUAL_REPORT: 'SchemeYearEndDateForAnnualReport',
        DOES_SCHEME_HAVE_AVC: 'doesSchemeHaveAVC',
        NAME_OF_AVC_PROVIDER: 'nameOfAVCProvider',
        DESCRIBE_TYPE_OF_AVC_FUNDS_HELD: 'describeTypeOfAVCFundsHeld',
        DO_YOU_WISH_TO_DELEGATE_AUTHORITY_TO_REQUEST_DISINVESTMENTS:
            'doYouWishToDelegateAuthorityToRequestDisinvestments',
        NAME_OF_ADMINISTRATOR_COMPANY: 'nameOfAdministratorCompany',
        PRIMARY_CONTACT_NAME: 'primaryContactName',
        PRIMARY_CONTACT_EMAIL: 'primaryContactEmail',
        PRIMARY_CONTACT_PHONE: 'primaryContactPhone',
        AUTHORIZED_INDIVIDUAL_NAME: 'name',
        AUTHORIZED_INDIVIDUAL_DISINVESTMENT_LIMIT: 'disinvestmentLimit',
        AUTHORIZED_INDIVIDUAL_CONTACT_EMAIL: 'contactEmail',
        AUTHORIZED_INDIVIDUAL_CONTACT_PHONE_NUMBER: 'contactPhoneNumber',
        LADRD_DOCUMENT: 'ladrdDocumentAttachment',
        LACAI_DOCUMENT: 'lacaiDocumentAttachment',
        ACTUARY_COMPANY: 'actuaryCompany',
        ACTUARY_NAME: 'actuaryName',
        ACTUARY_EMAIL: 'actuaryEmail',
        ACTUARY_PHONE: 'actuaryPhone',
        AUTHORIZED_INDIVIDUALS: 'authorizedIndividuals'
    }
};

export const TRUSTEES_PICKER_SECTION = {
    KEY: 'trusteesPicker',
    NAME: 'Signatories'
};

export const PICK_USER_I_ICON = 'Pick signatories'; // icon discription
