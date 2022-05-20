import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import moment from 'moment';
import { QUARTER, QUARTER_KEYS, TIME_FORMAT } from '../../utility';
import { useRef } from 'react';

const { Option } = Select;

const QuarterlySelectionInput = props => {
    const { disabled, quarters, reportType, selectedQuarterValue, selectedYearValue, setStartDate, setEndDate } = props;
    const [selectedYear, setSelectedYear] = useState(null);
    const [selectedQuarter, setSelectedQuarter] = useState(null);
    const [years, setYears] = useState(null);
    const [quarter, setQuarter] = useState(quarters);

    const prevReportType = usePrevious(reportType);

    function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }

    useEffect(() => {
        const current = moment();
        const currentYear = current.year();
        const yearoffSet = 10;
        let dropdownYears = [];

        for (let i = currentYear - yearoffSet; i <= currentYear; i++) {
            dropdownYears.push(i);
        }
        if (current.quarter() === 1) {
            dropdownYears.splice(dropdownYears.length - 1);
        }

        setYears([...dropdownYears]);
        setQuarter(quarters);
        setSelectedYear(dropdownYears[dropdownYears.length - 1]);
        setSelectedQuarter(quarters[0].key);
    }, []);

    useEffect(() => {
        if (!disabled && prevReportType !== reportType && !selectedYearValue) {
            setStartDate && setStartDate(null);
            setEndDate && setEndDate(null);
            if (years && years.length > 0) setSelectedYear(years[years.length - 1]);
            if (quarters && quarters.length > 0) setSelectedQuarter(quarters[0].key);
            if (years && quarters.length) dateHandler(quarters[0].key, years[years.length - 1]);
        }
    }, [prevReportType, reportType]);

    useEffect(() => {
        if(reportType&&selectedYear){
            if (years && years.length > 0) setSelectedYear(years[years.length - 1]);
            if (quarters && quarters.length > 0) setSelectedQuarter(quarters[0].key);
        }
       

        if (!disabled && years && selectedQuarterValue && selectedYearValue) {
            setSelectedYear(selectedYearValue);

            setSelectedQuarter(QUARTER_KEYS[selectedQuarterValue]);
        }
    }, [years, quarters, reportType, selectedQuarterValue, selectedYearValue]);

    useEffect(() => {
        const current = moment();
        const currentQuarter = current.quarter();
        const currentQuarters = [];
        if (selectedYear === current.year()) {
            const qt = current.quarter();

            for (const i in quarters) {
                if (i < qt-1) {
                    currentQuarters.push(quarters[i]);
                }
            }
            if (currentQuarters.length > 0) {
                setQuarter(currentQuarters);

            }

            if(currentQuarters.length&&selectedYear===current.year()&& QUARTER[selectedQuarter] >= currentQuarter){
                setStartDate(null)
                setEndDate(null)
               setSelectedQuarter(currentQuarters[currentQuarters.length-1].key)
            }

        } else {
            setQuarter(quarters);

        }

        if (selectedQuarter && selectedYear) {
            dateHandler(selectedQuarter, selectedYear);
        }
    }, [selectedYear, selectedQuarter,reportType]);

    const dateHandler = (selectedQuarter, selectedYear) => {
        if (reportType) {
            let quarter = QUARTER[selectedQuarter];

            const current = moment();
            const currentQuarter = current.quarter();


            if (selectedYear === current.year() && quarter >= currentQuarter) {
                quarter = currentQuarter - 1;
                setSelectedQuarter(QUARTER_KEYS[quarter])
            }


            let date1 = moment()
              .quarter(quarter)
              .startOf('quarter')
              .format(TIME_FORMAT);
            let date2 = moment()
              .quarter(quarter)
              .endOf('quarter')
              .format(TIME_FORMAT);

            let startDate = date1.replace(date1.substring(6, 10), selectedYear);
            let endDate = date2.replace(date2.substring(6, 10), selectedYear);

            if (startDate && endDate && !disabled) {
                setStartDate && setStartDate(startDate);
                setEndDate && setEndDate(endDate);
            }
        }
    };

    const handleValueChange = (name, value) => {
        if (name === 'year') {

            setSelectedYear(value);

        }
        if (name === 'quarter') {

            setSelectedQuarter(value);

        }
    };
    return (
      <>
          <Select
            className="left-select"
            value={selectedYear}
            onChange={value => handleValueChange('year', value)}
            disabled={disabled}
          >
              {years && years.length > 0 && years.map(year => <Option value={year}>{year}</Option>)}
          </Select>
          <Select
            className="right-select"
            value={selectedQuarter}
            onChange={value => handleValueChange('quarter', value)}
            disabled={disabled}
          >
              {quarter &&
              quarter.length > 0 &&
              quarter.map(qt => (
                <Option key={qt.key} value={qt.key}>
                    {qt.value}
                </Option>
              ))}
          </Select>
      </>
    );
};

export default QuarterlySelectionInput;
