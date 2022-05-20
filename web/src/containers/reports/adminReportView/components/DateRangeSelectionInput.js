import React from 'react';
import { DatePicker } from 'antd';
import { TIME_FORMAT } from '../../utility';
import moment from 'moment';

const { RangePicker } = DatePicker;

const DateRangeSelectionInput = props => {
    const { disabled, dateList, key, adHocSelectedDate, setAdHocSelectedDate } = props;
    return (
        <>
            <RangePicker
                dropdownClassName="report-range-picker"
                format={TIME_FORMAT}
                key={key}
                disabled={disabled || !dateList}
                value={adHocSelectedDate}
                onChange={value => {
                    if(value&&value.length===0){
                        setAdHocSelectedDate(null)
                    }
                    if(value&&value.length>0) setAdHocSelectedDate(value);
                }}
                disabledDate={current => {
                    if (current && current > moment().startOf('day')) return true;


                    const fountEle = dateList.find(ele => moment(ele, TIME_FORMAT).isSame(current, 'day'));
                    if (fountEle) {
                        return false;
                    }
                    return true;
                }}
            />
        </>
    );
};

export default DateRangeSelectionInput;
