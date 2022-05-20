import React from 'react';
import { BarBalloonChart } from '@excubed/excubed-charts';

const FundingLevelRisk = props => {
    const { doFetch, onValidationError, callDoFetch } = props;

    return (
        <BarBalloonChart
            className="wrapper chart-wrapper chart-wrapper-label graph-container"
            height="350"
            maxWidth="570"
            templateName="funding_level_risk"
            params={{
                // title: title
                title: 'Funding Level Risk'
            }}
            doFetch={doFetch}
            onValidationError={onValidationError}
            callDoFetch={callDoFetch}
        />
    );
};

export default FundingLevelRisk;
