import React from 'react';
import { BarChart } from '@excubed/excubed-charts';

const LiabilityCashFlows = props => {
    const { doFetch, onValidationError, authToken, userName, callDoFetch } = props;

    return (
        <BarChart
            className="wrapper chart-wrapper graph-container"
            height="350"
            maxWidth="570"
            templateName="liability_cashflow"
            params={{
                user_name: userName,
                auth_token: authToken,
                // title: title
                title: 'Liability Cashflows'
            }}
            doFetch={doFetch}
            onValidationError={onValidationError}
            callDoFetch={callDoFetch}
        />
    );
};

export default LiabilityCashFlows;
