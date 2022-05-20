import React from 'react';
import { MultipleColumnChart } from '@excubed/excubed-charts';

const InflationRateSensetive = props => {
    const { doFetch, onValidationError, callDoFetch } = props;

    return (
        <MultipleColumnChart
            className="wrapper chart-wrapper graph-container"
            height="350"
            maxWidth="570"
            templateName="inflation_sensitivity"
            params={{
                title: 'Inflation Sensitivity'
            }}
            doFetch={doFetch}
            onValidationError={onValidationError}
            callDoFetch={callDoFetch}
        />
    );
};

export default InflationRateSensetive;
