import React from 'react';

export const FORM_NAME = 'TAB_FILE_GENERATOR';
export const FORM_TITLE = 'Generate $iaa$ and manager letters';

export const FORM_I_ICON = (
    <p>
        Select which LGIM Directors will be asked to sign the Investment Advisory Agreement.
        <br />
        <br />
        Review the Investment Advisory Agreement generated to check that everything is correct. If there are problems
        with the information entered then abort the workflow, correct and resubmit. To edit the document text then
        download the Word document, make any necessary changes or additions, and upload a final pdf. Select ‘continue’
        to send the final document for internal review.
        <br />
        <br />
        If a scheme currently has assets managed externally, at this stage you can also provide the trustees with draft
        letters instructing the external managers to liaise with LGIM for the purposes of arranging the asset
        transition.
    </p>
);

export const TABS = {
    tab1: { tabKey: 'acceptance', tabName: 'Acceptance' },
    tab2: { tabKey: 'signatories', tabName: 'Signatories' },
    tab3: { tabKey: 'generateDocuments', tabName: 'Generate documents' }
};
export const SUBMITTED_MESSAGE = 'submitted.';
export const PICK_USER_TITLE_ACCEPTANCE = 'Select LGIM staff to confirm document accepted once client has signed';
export const PICK_USER_TITLE_SIGNATORIES = 'Select LGIM Directors to sign $iaa$';
export const DOC_NAMES = { IAA: 'IAA', AuthorisingManagers: 'AuthorisingManagers' };
