import React from 'react';
import { BarBalloonChart } from '@excubed/excubed-charts';

const Risk = props => {
    const { doFetch, onValidationError, title, callDoFetch } = props;

    return (
        <BarBalloonChart
            className="wrapper chart-wrapper chart-wrapper-label graph-container"
            height="350"
            maxWidth="570"
            templateName="risk"
            params={{
                title: title
            }}
            doFetch={doFetch}
            onValidationError={onValidationError}
            callDoFetch={callDoFetch}
        />
    );
};

export default Risk;
