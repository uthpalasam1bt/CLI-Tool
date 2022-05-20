/* 
      This file contains all the constants required in the index.js of the step
 
*/

import React from 'react';

export const FORM_NAME = 'SAMPLE_FORM_TWO'; // name for the redux form
export const FORM_TITLE = 'Input scheme information'; // Text for title to display in the header
export const TOGGLEBUTTONGROUP = 'buttonGroup'; // Button Group name
export const ENTERVALUE = 'enterValue'; // Button Group
export const ON_SUBMIT_MESSAGE = 'Update to scheme information details requested.';

export const FIELD_NAME = {
    POLICY_NO: 'Policy number',
    POLICY_NO_FIELD_NAME: 'policyNumber',
    HAS_POLICY_SUBSECTION: 'Has the scheme got policy subsections?',
    HAS_POLICY_SUBSECTION_FIELD_NAME: 'hasPolicySubsection',
    POLICY_SUBSECTION: 'policySubsections'
};

export const INFORMATION_UPDATE_FORM_DATA_FIELD_KEYS = {
    POLICY_NUMBER: 'policyNumber',
    HAS_POLICY_SUBSECTION: 'hasPolicySubsection',
    POLICY_SUBSECTION: 'policySubsection',
    WISH_TO_UPLORD_HAI: 'wishToUplordHAI',
    HOLD_ASSERTS_WITH_MANAGERS: 'holdAssertsWithManagers',
    WISH_TO_SET_FL_TRACK: 'wishToSetFlTrack',
    HAVE_LIABILITY_INFORMATION: 'haveLiabilityInformation'
};

export const FORM_FIELD_LABELS = {
    [INFORMATION_UPDATE_FORM_DATA_FIELD_KEYS.POLICY_NUMBER]: 'Policy number',
    [INFORMATION_UPDATE_FORM_DATA_FIELD_KEYS.HAS_POLICY_SUBSECTION]: 'Has the scheme got policy subsections?',
    [INFORMATION_UPDATE_FORM_DATA_FIELD_KEYS.POLICY_SUBSECTION]: 'Policy subsection',
    [INFORMATION_UPDATE_FORM_DATA_FIELD_KEYS.WISH_TO_UPLORD_HAI]: 'Do you wish to upload historical asset information?',
    [INFORMATION_UPDATE_FORM_DATA_FIELD_KEYS.HOLD_ASSERTS_WITH_MANAGERS]:
        'Does the scheme hold asserts with managers other than LGIM?',
    [INFORMATION_UPDATE_FORM_DATA_FIELD_KEYS.WISH_TO_SET_FL_TRACK]: 'Do you wish to set up funding level tracking?',
    [INFORMATION_UPDATE_FORM_DATA_FIELD_KEYS.HAVE_LIABILITY_INFORMATION]: 'Do you have scheme liability information'
};
