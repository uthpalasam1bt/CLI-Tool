import React from 'react';
import { PieChart } from '@excubed/excubed-charts';

const CovenantRisk = props => {
    const { doFetch, onValidationError, callDoFetch } = props;

    return (
        <PieChart
            className="wrapper chart-wrapper graph-container"
            height="350"
            maxWidth="570"
            templateName="pending_development"
            params={{
                title: 'No Chart Available'
            }}
            doFetch={doFetch}
            onValidationError={onValidationError}
            callDoFetch={callDoFetch}
        />
    );
};

export default CovenantRisk;
