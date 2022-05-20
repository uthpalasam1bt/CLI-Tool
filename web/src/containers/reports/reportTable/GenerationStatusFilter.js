import React, { useState } from 'react';
import { Checkbox } from 'antd';
import { GenerationStatus, GenerationDropBoxStatus } from '../utility';

const GenerationStatusFilter = ({ concurrencyModalVisibility = true, onReset, onOk ,onChange}) => {
    const [checkboxValue, setCheckboxValue] = useState('');
    // const [checked, setChecked] = useState(true);

    const handleChange = value => {
        onChange(value)
        setCheckboxValue(value);
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
                <Checkbox.Group style={{ width: '100%' }} onChange={handleChange} value={checkboxValue}>
                    <Checkbox checked={true} value={GenerationStatus.GENERATION_PENDING}>
                        {GenerationStatus.GENERATION_PENDING}{' '}
                    </Checkbox>
                    <br />
                    <Checkbox checked={true} value={GenerationStatus.GENERATION_INPROGRESS}>
                        {GenerationStatus.GENERATION_INPROGRESS}
                    </Checkbox>
                    <br />
                    <Checkbox checked={true} value={GenerationStatus.GENERATION_FAILED}>
                        {GenerationDropBoxStatus.GENERATION_FAILED}
                    </Checkbox>
                    <br />
                </Checkbox.Group>
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

export default GenerationStatusFilter;
