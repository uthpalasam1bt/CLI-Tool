import React from 'react';
import { LineChart } from '@excubed/excubed-charts';

const BuyOutPricesBO = props => {
    const { doFetch, onValidationError, callDoFetch } = props;

    return (
        <LineChart
            className="wrapper chart-wrapper graph-container"
            height="350"
            maxWidth="570"
            templateName="BO_buy_out_tracker"
            params={{
                title: 'Buy out tracker-BO'
            }}
            doFetch={doFetch}
            onValidationError={onValidationError}
            callDoFetch={callDoFetch}
        />
    );
};

export default BuyOutPricesBO;
