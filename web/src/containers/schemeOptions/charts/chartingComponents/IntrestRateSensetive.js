import React from 'react';
import { MultipleColumnChart } from '@excubed/excubed-charts';

const IntrestRateSensetive = props => {
    const { doFetch, onValidationError, callDoFetch } = props;

    return (
        <MultipleColumnChart
            className="wrapper chart-wrapper graph-container"
            height="350"
            maxWidth="570"
            templateName="interest_rate_sensitivity"
            params={{
                title: 'Interest Rate Sensitivity'
            }}
            doFetch={doFetch}
            onValidationError={onValidationError}
            callDoFetch={callDoFetch}
        />
    );
};

export default IntrestRateSensetive;
