import React from 'react';

export const FORM_NAME = 'GENERATE_ADVICE';
export const FORM_TITLE = 'Generate advice and $pmc$ legal docs';

export const FORM_I_ICON = (
    <p>
        Select which PMC Directors will be asked to sign the Investment Management Agreement.
        <br />
        <br />
        Review the Investment Advisory Report, Investment Management Agreement and supporting documents generated to
        check that everything is correct. If there are problems with the information entered then abort the workflow,
        correct and resubmit. To edit the document text then download the Word documents, make any necessary changes or
        additions, and upload a final pdf. Select ‘continue’ to send the final documents for internal review.
        <br />
        <br />
        At this stage you can also provide the trustees with a draft sponsor consultation letter and a draft letter to
        inform the Scheme Actuary of the changes proposed. These should be uploaded as Word documents.
    </p>
);

export const ACCEPTANCE_FORM_SECTION = {
    KEY: 'acceptance',
    NAME: 'Acceptance',
    TITLE: 'Select LGIM staff to confirm document accepted once client has signed'
};
export const SIGNATORIES_FORM_SECTION = {
    KEY: 'signatories',
    NAME: 'Signatories',
    TITLE: 'Select $pmc$ Directors to sign legal documents'
};
export const GENERATE_DOC_FORM_SECTION = {
    KEY: 'generateDoc',
    NAME: 'Generate documents'
};
export const ANALYTICAL_MODULES = {
    KEY: 'fileOutPut',
    NAME: 'Analytical Modules'
};

export const DOC_NAMES = {
    ADVISORY_REPORT: 'AdvisoryReport',
    FMA: 'FMA',
    PMCPROPOSAL: 'PMCProposal',
    CONSULTATION_SPONSOR: 'ConsultationSponsor',
    CONSULTATION_ACTUARY: 'ConsultationActuary'
};
