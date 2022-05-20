import React from 'react';

export const FORM_NAME = 'schemeNameGenerateDocs';
export const FORM_TITLE = 'Generate documents';

export const FORM_I_ICON = (
    <p>
        Select which PMC Directors will be asked to sign the Investment Management Agreement.
        <br />
        <br />
        Review the documents to check that everything is correct. To edit the document text, download the Word
        documents, make any necessary changes or additions, and upload a final pdf.
        <br />
        <br />
        Select ‘continue’ to send the final documents for internal review.
    </p>
);

export const FORM_FIELDS = {
    GENERATE_IAA: 'IAA',
    GENERATE_FMA: 'FMA',
    GENERATE_PMC: 'PMCProposal',
    GENERATE_SIP: 'SIP',
    SPONSOR_CONSULTATION_LETTER: 'ConsultationSponsor'
};

export const ACCEPTANCE_FORM_SECTION = {
    KEY: 'acceptance',
    NAME: 'Acceptance',
    TITLE: 'Select LGIM staff to confirm document accepted once client has signed'
};
export const IAA_SIGNATORIES_FORM_SECTION = {
    KEY: 'iaaSignatories',
    NAME: '$iaa$ Signatories',
    TITLE: 'Select LGIM Directors to sign $iaa$'
};
export const IMA_PMC_SIGNATORIES_FORM_SECTION = {
    KEY: 'pmcSignatories',
    NAME: '$ima$ and $pmc$ Signatories',
    TITLE: 'Select $pmc$ Directors to sign legal documents'
};
export const GENERATE_DOC_FORM_SECTION = {
    KEY: 'generateDoc',
    NAME: 'Generate/Upload'
};
