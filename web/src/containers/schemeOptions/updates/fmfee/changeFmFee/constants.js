/* 
      This file contains all the constants required in the index.js of the step
 
*/

import React from 'react';

export const FORM_NAME = 'changeImFeeForm'; // name for the redux form
export const FORM_TITLE = 'Change investment management fee'; // Text for title to display in the header

export const ON_SUBMIT_MESSAGE = 'IM fee updated.';

//The value of the tooltip icon in the header
export const FORM_I_ICON = (
    <p>
        This workflow can be used to update the portfolio management fee set out in the client’s Investment Management
        Agreement.
    </p>
);

export const TABONE = {
    KEY: 'changeImFeeTab',
    NAME: 'Update'
};

export const TABTWO = {
    KEY: 'signatoriesTab',
    NAME: 'Signatories'
};

export const FMFEE_FORM_DATA_FIELD_KEYS = {
    OVERRIDE_FEES: 'overrideStandardFees',
    FMFEE: 'fmFee',
    FMFEE_P: 'fmFeePercentage'
  };

export const FMFEE_FORM_FIELDS_LABLES = {
    [FMFEE_FORM_DATA_FIELD_KEYS.OVERRIDE_FEES]: 'Override standard fees?',
    [FMFEE_FORM_DATA_FIELD_KEYS.FMFEE]: 'Investment management fee for scheme (£ element)',
    [FMFEE_FORM_DATA_FIELD_KEYS.FMFEE_P]: 'Investment management fee for scheme (% element)'
};
