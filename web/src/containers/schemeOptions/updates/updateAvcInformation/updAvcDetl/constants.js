/* 
      This file contains all the constants required in the index.js of the step
 
*/

import React from 'react';

export const FORM_NAME = 'avcDetailsForm'; // name for the redux form
export const FORM_TITLE = 'Input AVC information'; // Text for title to display in the header
export const TOGGLEBUTTONGROUP = 'buttonGroup'; // Button Group name
export const ENTERVALUE = 'enterValue'; // Button Group
export const ON_SUBMIT_AVC_INFORMATION_First = 'Update to AVC details requested.';

//The value of the tooltip icon in the header
export const FORM_I_ICON = (
    <p>
        This workflow can be used to notify us of a change of AVC details, which will then be updated in the Statement
        of Investment Principles
    </p>
);

export const AVC_DETAILS_FORM_DATA_FIELD_KEYS = {
    SCHEME_HAVE_AVC: 'doesSchemeHaveAVC',
    PROVIDER_NAME: 'nameOfAVCProvider',
    TYPE_OF_AVC_FUNDS: 'describeTypeOfAVCFundsHeld'
  };

export const AVC_DETAILS_FORM_FIELDS_LABLES = {
    [AVC_DETAILS_FORM_DATA_FIELD_KEYS.SCHEME_HAVE_AVC]: 'Does the scheme have AVCs?',
    [AVC_DETAILS_FORM_DATA_FIELD_KEYS.PROVIDER_NAME]: 'Name of the AVC provider',
    [AVC_DETAILS_FORM_DATA_FIELD_KEYS.TYPE_OF_AVC_FUNDS]: 'Describe the type of AVC funds held'
};

