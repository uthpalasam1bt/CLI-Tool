import React from 'react';

export const FORM_NAME = 'SAMPLE_FORM_THREE';
export const FORM_TITLE = 'Request a formal proposal from us';

export const BUTTON_TITLE_REQUEST = 'Request Proposal';

export const REQUEST_A_FORMAL_PROPOSAL_FROM_US = (
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

export const THE_CURRENT_ANNUAL_COST_OF_NEW_BENEFIT_ACCRUAL = (
    <p>
        Please enter the £ value of liabilities that are expected to be accrued by active members over the next year.
        This future service liability value should be supplied on the same liability basis that you have supplied the
        past service liabilities. For example, if you have supplied the value of past service liabilities on a ‘gilts
        basis’, then please also provide the value of 1 year of accrual on a ‘gilts basis’. Consult your Scheme Actuary
        if you’re unsure.
        <br />
        <br />
        Note that we would usually expect the contributions paid in respect of future accrual to be of a similar order
        of magnitude to the value of liabilities accrued. If the liability value has been provided on a gilts basis
        rather than a Technical Provisions basis then typically the contributions will be slightly lower than the value
        of liabilities accrued.
    </p>
);
export const THE_SCHEME_OPEN_TO_FUTURE_ACCRUAL_OF_NEW_BENEFITS = (
    <p>
        If your scheme is open to new accrual then this means that it contains active members who are still accruing
        pension benefits, and ongoing contributions will be being paid by the scheme sponsor and by members to cover the
        cost of this accrual. If so, we can take approximate account of this in our projections of the funding position,
        as long as you can provide us with the value of new liabilities that will be accrued in the next year, and the
        total contributions that will be paid in the next year by members and the sponsor to cover the cost of this
        accrual. If you’re unsure about these numbers, your Scheme Actuary should be able to supply an estimate.
        <br />
        <br />
        If you’re unsure, you can select ‘No’, and we will still be able to provide you with an approximate funding
        level projection.
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

export const ASSET_VALUE_WARNING = "Our service is suitable for UK DB pension schemes with assets over £10m and at least 50 members.";
export const ASSETS_FORM_SECTION = {
    KEY: 'assets',
    NAME: 'Assets',
    FIELD_KEYS: {
        PROPOSAL_NAME: 'proposalName',
        EXISTING_PROPOSALS: 'existingProposals',
        HAS_MANAGERS: 'hasManagers',
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
        FULLY_ESG_PORTFOLIO: 'fullyEsgPortfolio'
    }
};

export const LIABILITIES_FORM_SECTION = {
    KEY: 'liabilities',
    NAME: 'Liabilities',
    FIELD_KEYS: {
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
        BASIS_VALUE_PROVIDED: 'basisValueProvided'
    }
};

export const FUNDING_FORM_SECTION = {
    KEY: 'funding',
    NAME: 'Funding',
    FIELD_KEYS: {
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
        DATE_VALUE_PROVIDED: 'dataValueProvided',
        LIKE_TO_INCLUDE_FLT: 'likeToIncludeFLT'
    }
};

export const APPROVAL_FORM_SECTION = {
    KEY: 'approval',
    NAME: 'Approval',
    FIELD_KEYS: {
        USERS_FOR_APPROVAL: 'usersForApproval'
    }
};
