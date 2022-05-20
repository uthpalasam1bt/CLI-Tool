import React from 'react';
import { Col, Radio, Row } from 'antd';
import { DISPLAY_TYPES } from '../../constants/adminReportViewConstant';
import QuarterlySelectionInput from './QuarterlySelectionInput';
import DateRangeSelectionInput from './DateRangeSelectionInput';

const reportBaseLayout = (row, reportType, handleReportTypeSelect, props) => {
    return (
        row && (
            <Col xl={12} xs={24}>
                <Row>
                    <Col xl={9} xs={12}>
                        <Radio
                            onClick={e => {
                                handleReportTypeSelect(e.target.value);
                            }}
                            checked={reportType && reportType === row.report}
                            value={row.report}
                        >
                            <span className="custom-text">{row.displayName}</span>
                        </Radio>
                    </Col>
                    {row.displayType === DISPLAY_TYPES.QuarterUI ? (
                        <Col xl={15} xs={12}>
                            <QuarterlySelectionInput
                                quarters={row.quarters}
                                disabled={reportType !== row.report}
                                {...props}
                            />
                        </Col>
                    ) : row.displayType === DISPLAY_TYPES.DateRange ? (
                        <Col xl={10} xs={12}>
                            <DateRangeSelectionInput disabled={reportType !== row.report} {...props} />
                        </Col>
                    ) : null}
                </Row>
            </Col>
        )
    );
};

const reportLayout = (rows, reportType, handleReportTypeSelect, props) => {
    // console.log('dddd', Math.ceil(rows.length / 2), rows);
    let row1 = [];
    let row2 = [];
    for (let first = 0, second = Math.ceil(rows.length / 2); first < Math.ceil(rows.length / 2); first++, second++) {
        let firstColumn = rows[first];
        let secondColumn = rows[second];
        if (firstColumn !== undefined) {
            row1.push(firstColumn);
        }
        if (secondColumn !== undefined) {
            row2.push(secondColumn);
        }
    }

    // console.log('ererer', row1, row2);
    if (row1.length || row2.length) {
        return (
            <>
                <Row gutter={20} className="custom-row mt-30">
                    {row1.length > 0 &&
                        row1.map(row => {
                            return reportBaseLayout(row, reportType, handleReportTypeSelect, props);
                        })}
                </Row>
                <Row gutter={20} className="custom-row">
                    {row2.length &&
                        row2.map(row => {
                            return reportBaseLayout(row, reportType, handleReportTypeSelect, props);
                        })}
                </Row>
            </>
        );
    }
};
const BaseReportType = props => {
    const { reports, handleReportTypeSelect, reportType } = props;
    return <>{reports && reportLayout(reports, reportType, handleReportTypeSelect, props)}</>;
};

export default BaseReportType;
