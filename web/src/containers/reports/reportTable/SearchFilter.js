import React, { useState } from 'react';
import { Checkbox } from 'antd';
import PropTypes from 'prop-types';
import { handleReportName, ReportTypes, searchFilterValues } from '../utility';

const SearchFilter = ({ concurrencyModalVisibility = true, onReset, onOk, clientReportView = false,onChange }) => {
    const [checkboxValue, setCheckboxValue] = useState('');
    // const [checked, setChecked] = useState(true);

    const handleChange = value => {
        setCheckboxValue(value);
        onChange(value)

    };

    const handleSearch = () => {
        onOk(checkboxValue);
    };

    const handleReset = () => {
        onReset();
        setCheckboxValue('');
    };

    return (
        concurrencyModalVisibility && (
            <div className="report-dropdown-input">
                {!clientReportView && (
                    <Checkbox.Group style={{ width: '100%' }} onChange={handleChange} value={checkboxValue}>
                        <Checkbox value={searchFilterValues.adHocReportGenerated} checked={true}>
                            {searchFilterValues.adHocReportGenerated}
                        </Checkbox>
                        <br />
                        <Checkbox value={searchFilterValues.quarterlyReportGenerated} checked={true}>
                            {searchFilterValues.quarterlyReportGenerated}
                        </Checkbox>
                        <br />

                        <Checkbox value={searchFilterValues.quarterlyReportUploaded} checked={true}>
                            {searchFilterValues.quarterlyReportUploaded}
                        </Checkbox>
                        <br />
                        <Checkbox value={searchFilterValues.adHocReportUploaded} checked={true}>
                            {searchFilterValues.adHocReportUploaded}
                        </Checkbox>
                        <br />
                        <Checkbox value={searchFilterValues.longFormReportUploaded} checked={true}>
                            {searchFilterValues.longFormReportUploaded}
                        </Checkbox>
                        <br />
                    </Checkbox.Group>
                )}

                {clientReportView && (
                    <Checkbox.Group style={{ width: '100%' }} onChange={handleChange} value={checkboxValue}>
                        <Checkbox value={handleReportName(ReportTypes.QUARTER)} checked={true}>
                            Quarterly
                        </Checkbox>
                        <br />
                        <Checkbox value={handleReportName(ReportTypes.ADHOC)} checked={true}>
                            Ad hoc
                        </Checkbox>
                        <br />
                        <Checkbox value={handleReportName(ReportTypes.LONG_FORM)} checked={true}>
                            Long form
                        </Checkbox>
                        <br />
                    </Checkbox.Group>
                )}
                <div className="mt-3">
                    <button onClick={handleReset} className="btn-reset btn-grey-o regular">
                        Reset
                    </button>
                    <button className="btn-search tpip-btn-blue" onClick={handleSearch}>
                        OK
                    </button>
                </div>
            </div>
        )
    );
};

SearchFilter.propTypes = {
    onReset: PropTypes.func.isRequired
};

export default SearchFilter;
