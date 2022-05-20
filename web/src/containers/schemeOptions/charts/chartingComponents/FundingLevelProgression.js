import React from 'react';
import { LineChart } from '@excubed/excubed-charts';

const FundingLevelProgression = props => {
    const { doFetch, onValidationError, callDoFetch } = props;

    return (
        <LineChart
            className="wrapper chart-wrapper graph-container"
            height="350"
            maxWidth="580"
            templateName="funding_level_progression"
            params={{
                // title: title
                title: 'Funding Level'
            }}
            doFetch={doFetch}
            onValidationError={onValidationError}
            callDoFetch={callDoFetch}
        />
    );
};

export default FundingLevelProgression;
