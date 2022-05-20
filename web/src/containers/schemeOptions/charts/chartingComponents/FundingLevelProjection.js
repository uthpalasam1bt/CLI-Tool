import React, { useEffect } from 'react';
import { ProjectionLineChart } from '@excubed/excubed-charts';

const FundingLevelProjection = props => {
    const { doFetch, onValidationError, callDoFetch } = props;

    useEffect(() => {});

    return (
        <ProjectionLineChart
            className="wrapper chart-wrapper graph-container"
            height="350"
            maxWidth="580"
            templateName="funding_level_projection"
            params={{
                // title: title
                title: 'Funding Level Projection'
            }}
            doFetch={doFetch}
            onValidationError={onValidationError}
            callDoFetch={callDoFetch}
        />
    );
};

export default FundingLevelProjection;
