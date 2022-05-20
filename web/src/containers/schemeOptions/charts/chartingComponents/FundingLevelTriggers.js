import React, { useEffect } from 'react';
import { LineBannerChart } from '@excubed/excubed-charts';

const FundingLevelTriggers = props => {
    const { doFetch, onValidationError, callDoFetch } = props;

    useEffect(() => {});

    return (
        <LineBannerChart
            className="wrapper chart-wrapper graph-container"
            height="350"
            maxWidth="570"
            templateName="funding_level_triggers"
            params={{
                // title: title
                title: 'Funding Level Triggers'
            }}
            doFetch={doFetch}
            onValidationError={onValidationError}
            callDoFetch={callDoFetch}
        />
    );
};

export default FundingLevelTriggers;
