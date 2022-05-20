import React from 'react';
import { BoxViewChart } from '@excubed/excubed-charts';

const CurrentMarketView = props => {
    const { doFetch, onValidationError, callDoFetch } = props;

    return (
        <BoxViewChart
            className="wrapper chart-wrapper graph-container"
            height="350"
            maxWidth="580"
            templateName="current_market_views"
            params={{
                // title: title
                title: 'LGIM Market Views'
            }}
            doFetch={doFetch}
            onValidationError={onValidationError}
            callDoFetch={callDoFetch}
        />
    );
};

export default CurrentMarketView;
