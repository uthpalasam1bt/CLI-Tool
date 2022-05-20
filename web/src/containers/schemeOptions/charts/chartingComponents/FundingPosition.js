import React from 'react';
import { BarBalloonChart } from '@excubed/excubed-charts';

const FundingPosition = props => {
    const { doFetch, onValidationError, callDoFetch } = props;

    return (
        <BarBalloonChart
            className="wrapper chart-wrapper chart-wrapper-label graph-container"
            height="350"
            maxWidth="580"
            templateName="funding_postion"
            params={{
                // title: title
                title: 'Assets and Liabilities'
            }}
            doFetch={doFetch}
            onValidationError={onValidationError}
            callDoFetch={callDoFetch}
        />
    );
};

export default FundingPosition;
