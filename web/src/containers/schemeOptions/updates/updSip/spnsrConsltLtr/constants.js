/* 
this file contains all the constants that are used in this simple form data dowa=nload template creation using functional config
*/

import React from 'react';

export const FORM_NAME = 'SAMPLE_FORM_ONE'; // name for the form
export const FORM_TITLE = 'Confirm Sponsor Consultation'; // a title to display in the template header component

export const FORM_I_ICON = ( // a decription to the icon in the header component
    <p>Please confirm that the sponsor has been consulted regarding the updated Statement of Investment Principles.</p>
);

export const DOWNLOAD_ZIP_NAME = 'SimpleFormData'; // name to the downloading zip file
export const EXCEL_TAB_NAME = 'form-data'; // name to the excel sheet tab that you downloaded

export const FIELD_NAME = {
    SPONSOR_CONSULTATION: 'Sponsor consultation status',
    INPUT_FIELD: 'inputField',
    HAS_SPONSOR_CONSULTED: 'Has the sponsor been consulted?',
    HAS_SPONSOR_CONSULTED_FIELD: 'hasSponcerConsulted'
};
