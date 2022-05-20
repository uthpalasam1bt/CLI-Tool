/* 
this file contains all the constants that are used in this simple form data dowa=nload template creation using functional config
*/

import React from 'react';

export const FORM_NAME = 'avcDetailsForm'; // name for the form
export const FORM_TITLE = 'Approve AVC information'; // a title to display in the template header component

export const FORM_I_ICON = ( // a decription to the icon in the header component
    <p>
        Review the information provided. If anything looks incorrect then edit it below, or else abort the process to
        send the form back to the client so that they can resubmit.
    </p>
);

export const DOWNLOAD_ZIP_NAME = 'avc_update'; // name to the downloading zip file
export const EXCEL_TAB_NAME = 'Update AVC Information'; // name to the excel sheet tab that you downloaded
export const ON_SUBMIT_AVC_INFORMATION_SECOND = 'Update to AVC details approved.';

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