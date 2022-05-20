import React from 'react';
import { PieChart, LineScatterChart, ProjectionLineChart, LineChart } from '@excubed/excubed-charts';

export const renderPieChart = (callDoFetch, doFetch) => {
    return (
        <>
            <PieChart
                className="wrapper chart-wrapper graph-container"
                height="350"
                maxWidth="700"
                templateName="asset_allocation_pa"
                params={{
                    title: 'Proposed portfolio'
                }}
                doFetch={doFetch}
                callDoFetch={callDoFetch}
                // onValidationError={onValidationError}
            />
        </>
    );
};

export const renderLineChart = (callDoFetch, doFetch) => {
    return (
        <>
            <LineScatterChart
                className="wrapper chart-wrapper graph-container"
                height="350"
                maxWidth="700"
                templateName="funding_risk_pa"
                params={{
                    title: 'Funding Risk'
                }}
                doFetch={doFetch}
                callDoFetch={callDoFetch}

                // onValidationError={onValidationError}
            />
        </>
    );
};
export const renderProjectionLineChart = (callDoFetch, doFetch) => {
    return (
        <>
            <LineChart
                className="wrapper chart-wrapper graph-container"
                height="350"
                maxWidth="700"
                templateName="funding_level_projection_line_pa"
                params={{
                    title: 'Funding level projection'
                }}
                doFetch={doFetch}
                callDoFetch={callDoFetch}
                // onValidationError={onValidationError}
            />
        </>
    );
};
export const renderSpecialProjectionLineChart = (callDoFetch, doFetch) => {
    return (
        <>
            <ProjectionLineChart
                className="wrapper chart-wrapper graph-container"
                height="350"
                maxWidth="700"
                templateName="funding_level_projection_pa"
                params={{
                    title: 'Funding level projection'
                }}
                doFetch={doFetch}
                callDoFetch={callDoFetch}
                // onValidationError={onValidationError}
            />
        </>
    );
};
export const renderLineChartB = (callDoFetch, doFetch) => {
    return (
        <>
            <LineScatterChart
                className="wrapper chart-wrapper graph-container"
                height="350"
                maxWidth="700"
                templateName="deficit_risk_pa"
                params={{
                    title: 'Deficit Risk'
                }}
                doFetch={doFetch}
                callDoFetch={callDoFetch}

                // onValidationError={onValidationError}
            />
        </>
    );
};
export const renderLineChartC = (callDoFetch, doFetch) => {
    return (
        <>
            <LineScatterChart
                className="wrapper chart-wrapper graph-container"
                height="350"
                maxWidth="700"
                templateName="risk_pa"
                params={{
                    title: 'Risk'
                }}
                doFetch={doFetch}
                callDoFetch={callDoFetch}

                // onValidationError={onValidationError}
            />
        </>
    );
};

export const charts = {
    renderPieChart,
    renderLineChart,
    renderProjectionLineChart,
    renderSpecialProjectionLineChart,
    renderLineChartB,
    renderLineChartC
};
