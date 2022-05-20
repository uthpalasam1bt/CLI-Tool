import React from 'react';
import { LineChart } from '@excubed/excubed-charts';

const AssetAndLiabilityProgression = props => {
    const { doFetch, onValidationError, callDoFetch } = props;
    return (
        <LineChart
            className="wrapper chart-wrapper chart-wrapper-label graph-container"
            height="350"
            maxWidth="570"
            templateName="asset_and_liability_progression"
            params={{
                // title: title
                title: 'Asset and Liability Progression'
            }}
            doFetch={doFetch}
            onValidationError={onValidationError}
            callDoFetch={callDoFetch}
        />
    );
};

export default AssetAndLiabilityProgression;
