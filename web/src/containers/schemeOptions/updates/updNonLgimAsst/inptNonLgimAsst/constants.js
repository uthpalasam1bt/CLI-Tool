/* 
      This file contains all the constants required in the index.js of the step
 
*/

import React from 'react';

export const FORM_NAME = 'nonLgimAssetForm'; // name for the redux form
export const FORM_TITLE = 'Input assets'; // Text for title to display in the header
export const FIELD_NAME = 'inptNonLgimAsst';

//The value of the tooltip icon in the header
export const FORM_I_ICON = (
    <p>
        If the scheme holds assets which are not managed by LGIM, details can be entered here. This information will be
        used for tracking the funding level, and also for overall portfolio risk analysis and funding level projections.
        <br />
        <br />
        Enter the value of assets held at different dates. We will roll the asset value forward in an approximate manner
        between dates provided
        <br />
        <br />
        By default any asset values provided will be treated as cash for both funding level tracking and risk analysis
        purposes. However, if you click on ‘Edit details’ for a given asset value then you will be able to provide a
        breakdown of the value by fund and asset class. If this information is provided then we will roll forward the
        asset value in line with index returns for the relevant asset class, and will include the external assets within
        overall portfolio risk analysis.
        <br />
        <br />
        Once you have entered the breakdown of the asset value at one date, this breakdown will be carried forward to
        subsequent dates by default, unless you choose to edit the detail within these later dates (for example,
        following a significant change in the portfolio). This enables you to quickly update the value of non-LGIM
        assets without having to re-enter the underlying detail at every date.
    </p>
);
