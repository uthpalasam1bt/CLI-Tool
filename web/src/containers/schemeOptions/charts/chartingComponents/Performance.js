import React, { useEffect } from 'react';
import { LineBalloonChart } from '@excubed/excubed-charts';

const Performance = props => {
    const { doFetch, onValidationError, callDoFetch } = props;

    useEffect(() => {});

    return (
        <LineBalloonChart
            className="wrapper chart-wrapper graph-container"
            height="350"
            maxWidth="570"
            templateName="performance"
            params={{
                // title: title
                title: 'Asset and Liability Performance'
            }}
            doFetch={doFetch}
            onValidationError={onValidationError}
            callDoFetch={callDoFetch}
        />
    );
};

export default Performance;
