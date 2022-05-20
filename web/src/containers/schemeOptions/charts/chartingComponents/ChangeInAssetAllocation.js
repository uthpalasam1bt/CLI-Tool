import React from 'react';
import { FullyStackedAreaChart } from '@excubed/excubed-charts';

const ChangeInAssetAllocation = props => {
    const { doFetch, onValidationError, callDoFetch } = props;

    return (
        <FullyStackedAreaChart
            className="wrapper chart-wrapper graph-container"
            height="350"
            maxWidth="570"
            templateName="change_in_asset_allocation"
            params={{
                // title: title
                title: 'Change in Asset Allocation'
            }}
            doFetch={doFetch}
            onValidationError={onValidationError}
            callDoFetch={callDoFetch}
        />
    );
};

export default ChangeInAssetAllocation;
