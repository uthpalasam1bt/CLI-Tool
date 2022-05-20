/*
    This file contains constants required in the index.js of the step
*/

import React from 'react';

export const FORM_TITLE = 'Review $iaa$ and send for signing';

export const FORM_NAME = 'APPROVE_REJECT_IAA_DOC'; // name of the form

export const TAB_ONE = {
    //details of the tab
    KEY: 'assetFsKey',
    NAME: '$advagt$',
    DOC: 'IAA'
};
export const TAB_TWO = {
    KEY: 'assetFsKey1',
    NAME: 'Manager Letters',
    DOC: 'AuthorisingManagers'
};

//value of the tooltip icon in the header
export const FORM_I_ICON = (
    <p>
        Please review the Investment Advisory Agreement below, which will appoint LGIM as the scheme’s investment
        advisor. The document can be downloaded below if you wish to send it to be reviewed by others.
        <br />
        <br />
        If you are satisfied with the Investment Advisory Agreement then please select ‘Approve’. We will then e-mail
        final copies for the trustees to sign.
        <br />
        <br />
        If the scheme currently has assets held with managers other than LGIM, then please inform them that we are being
        appointed as your investment consultant, and that they are authorised to provide us with information about your
        mandates. Template notification letters can be downloaded below.
        <br />
        <br />
        Next steps: Once the Investment Advisory Agreement has been signed we will be able to provide formal investment
        advice. Following review of that advice, the trustees will be asked to sign an Investment Management Agreement
        so that LGIM can manage the assets.
    </p>
);
