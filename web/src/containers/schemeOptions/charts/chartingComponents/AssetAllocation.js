import React from 'react';
import { PieChart } from '@excubed/excubed-charts';

const AssetAllocation = props => {
    const { doFetch, onValidationError, title, callDoFetch } = props;
    return (
        <PieChart
            className="wrapper chart-wrapper graph-container"
            height="350"
            maxWidth="570"
            templateName="asset_allocation"
            params={{
                title: title
            }}
            doFetch={doFetch}
            onValidationError={onValidationError}
            callDoFetch={callDoFetch}
        />
    );
};

export default AssetAllocation;
