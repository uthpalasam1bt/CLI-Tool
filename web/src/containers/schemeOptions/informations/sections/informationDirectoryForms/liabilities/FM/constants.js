import React from 'react';
export const FORM_NAME = 'LIABILITIES_FORM';
export const FORM_TITLE = 'Provide Liabilities information';

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
export const LIABILITIES_FORM_SECTION = {
    KEY: 'liabilities',
    NAME: 'Liabilities',
    FIELD_KEYS: {
        KNOW_LIABILITY_DURATION: 'knowLiabilityDuration',
        LIABILITY_DURATION: 'liabilityDuration',
        KNOW_PERCENT_LLTF: 'knowPercentLLTF', //- Do you know the % of liabilities linked to inflation?
        PROPORTION_OF_LLTF: 'proportionOfLLTF', //- Proportion of liabilities linked to inflation
        HAVE_PAST_SLC_TO_UPLOAD: 'havePastSLCToUpload', //- Do you have a set of past service liability cashflows that you can upload?
        CASHFLOW_TYPE_TO_UPLOAD: 'cashflowTypeToUpload', //- Do you want to upload overall cashflows or do you want to upoad you cashflows as real and fixed seperately?
        CASHFLOW_ATTACHMENT_OVERALL: 'cashflowAttachmentOverall', //- Upload overall / fixed & real cashflow
        CASHFLOW_ATTACHMENT_FNR: 'cashflowAttachmentFnR', //- Upload overall / fixed & real cashflow
        DATE_CASHFLOWS_PRODUCED: 'dataCashflowsProduced', //- At what date have these cashflows been produced?
        KNOW_LIABILITY_VALUE_MDT: 'knowLiabilityValueMDT', //- Do you know your liability value, margin date and type?
        LIABILITY_VALUE: 'liabilityValue',
        AVG_MARGIN_LDR_AND_GY: 'avgMarginLDRAndGY', //- What is the average margin between the liability discount rate and a gilt yield?
        DATE_VALUE_PROVIDED: 'dataValueProvided', //- At what date has this value been provided?
        BASIS_VALUE_PROVIDED: 'basisValueProvided', //- What basis has this value been provided on?
        PROPOSAL_NAME: 'proposalName'
    }

};

export const LIABILITIES_FORM_LABELS_SECTION = {
    KEY: 'liabilities',
    NAME: 'Liabilities',
    FIELD_LABELS: {
        KNOW_LIABILITY_DURATION: 'knowLiabilityDuration',
        LIABILITY_DURATION_LABEL: 'Liability duration',
        KNOW_PERCENT_LLTF_LABEL: 'knowPercentLLTF', //- Do you know the % of liabilities linked to inflation?
        PROPORTION_OF_LLTF_LABEL: 'Proportion of liabilities linked to inflation',
        HAVE_PAST_SLC_TO_UPLOAD_LABEL: 'Do you have a set of liability cashflows to upload?',
        CASHFLOW_TYPE_TO_UPLOAD_LABEL: 'cashflowTypeToUpload', //- Do you want to upload overall cashflows or do you want to upoad you cashflows as real and fixed seperately?
        CASHFLOW_ATTACHMENT_OVERALL_LABEL: 'cashflowAttachmentOverall', //- Upload overall / fixed & real cashflow
        CASHFLOW_ATTACHMENT_FNR_LABEL: 'cashflowAttachmentFnR', //- Upload overall / fixed & real cashflow
        DATE_CASHFLOWS_PRODUCED_LABEL: 'dataCashflowsProduced', //- At what date have these cashflows been produced?
        KNOW_LIABILITY_VALUE_MDT_LABEL: 'Do you have a liability value and details of the valuation basis?',
        LIABILITY_VALUE_LABEL: 'Liability value',
        AVG_MARGIN_LDR_AND_GY_LABEL:
            'What is the average margin between the liability discount rate and an appropriate reference gilt yield?',
        DATE_VALUE_PROVIDED_LABEL: 'At what date has this value been provided?',
        BASIS_VALUE_PROVIDED_LABEL: 'What sort of liability valuation basis does this value represent?',
        PROXY_ADOPTION_DATE_INPUT_LABEL: 'From what date should this new liability measure be used?'
    }

};
export default { LIABILITIES_FORM_SECTION, LIABILITIES_FORM_LABELS_SECTION };
