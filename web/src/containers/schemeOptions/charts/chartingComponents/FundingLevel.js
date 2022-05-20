import React from 'react';

import { ResponsiveLine } from '@nivo/line';

import Loading from 'components/Loading';

const getXValues = data => {
    let getDateList = data.map(item => item.x);

    let firstDate = getDateList.shift();
    let lastDate = getDateList.pop();

    let selectedDates = [];
    let devideValue = 4;
    if (getDateList.length % 4 <= 2) {
        devideValue = 3;
    }
    let incrementValue = Math.floor(getDateList.length / devideValue);

    let i = 0;
    let j = incrementValue;
    while (i < 4) {
        if (getDateList[j + incrementValue * i]) {
            selectedDates.push(getDateList[j + incrementValue * i]);
        }
        i++;
        j++;
    }

    return [firstDate, ...selectedDates, lastDate];
};

const FundingLevel = props => {
    if (props.loading) return <Loading />;
    if (props.data.chartData.length < 3 && !props.loading)
        return (
            <div>
                Please select a date range which comprises at least three valuation dates in order to plot the funding
                level progression
            </div>
        );
    const data = [
        {
            id: 'fundingLevel',
            color: 'hsl(200, 73%, 56%)',
            data: props.data.chartData
        }
    ];
    return (
        <ResponsiveLine
            data={data}
            margin={{ top: 30, right: 20, bottom: 50, left: 50 }}
            xScale={{ type: 'point' }}
            yScale={{ type: 'linear', stacked: true, min: 40, max: 70 }}
            curve="monotoneX"
            lineWidth={3}
            axisTop={null}
            axisRight={null}
            gridYValues={[40, 50, 60, 70]}
            colors={d => d.color}
            axisBottom={{
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: -33,
                legendOffset: 36,
                ...(props.data.chartData.length > 6 && { tickValues: getXValues(props.data.chartData) }),
                legendPosition: 'middle'
            }}
            axisLeft={{
                orient: 'left',
                tickValues: [40, 50, 60, 70],
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legendOffset: -40,
                legendPosition: 'middle'
            }}
            enableGridX={false}
            useMesh={true}
            legends={[]}
        />
    );
};

FundingLevel.defaultProps = {
    data: {
        chartData: []
    }
};

export default FundingLevel;
