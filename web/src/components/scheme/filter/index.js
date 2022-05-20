import moment from 'moment';
import React, { useState, useEffect, useRef } from 'react';
import { InputNumber, DatePicker, Slider, Checkbox, Dropdown, Menu, Button, Typography, Row, Col } from 'antd';
import { RangeFilter } from './customFilters';
import { DownOutlined } from '@ant-design/icons';
import { FILTER } from '../../../constants/keyMetricsConstants';

const { Text } = Typography;
const { RangePicker } = DatePicker;
const CheckboxGroup = Checkbox.Group;

const Filter = props => {
    const { config, callback, setHandleShowModelCb, filters } = props;

    const {
        filterConfig: { filterType, dateFormat, precision, options, placeholder },
        displayName,
        columnName,
        data: _data = null,
        isEditable = true,
        styleConfig = {},
        showValue
    } = config;

    const [visible, setVisible] = useState(false);
    const [data, setData] = useState(_data);

    const dataRef = useRef(null);

    useEffect(() => {
        setData(_data);
        dataRef.current = _data;
    }, [_data]);

    const handleVisibleChange = e => {
        setVisible(!visible);
    };

    const handleDataChange = e => {
        if (typeof e === FILTER.DATA_TYPE.NUMBER) {
            let fixedValue = Number(e).toFixed(precision);
            dataRef.current = fixedValue;
        } else {
            if (Array.isArray(e) && !e.length) {
                dataRef.current = null;
            } else {
                if (Array.isArray(e)) {
                    if (typeof e[0] === FILTER.DATA_TYPE.NUMBER && typeof e[1] === FILTER.DATA_TYPE.NUMBER) {
                        const fixedValue1 = Number(e[0]).toFixed(precision);
                        const fixedValue2 = Number(e[1]).toFixed(precision);
                        dataRef.current = [fixedValue1, fixedValue2];
                    } else if (typeof e[0] === FILTER.DATA_TYPE.NUMBER) {
                        const fixedValue1 = Number(e[0]).toFixed(precision);
                        dataRef.current = [fixedValue1, e[1]];
                    } else if (typeof e[1] === FILTER.DATA_TYPE.NUMBER) {
                        const fixedValue2 = Number(e[1]).toFixed(precision);
                        dataRef.current = [e[0], fixedValue2];
                    } else {
                        dataRef.current = e;
                    }
                } else {
                    dataRef.current = e;
                }
            }
        }

        if (filterType === FILTER.FILTER_TYPE.RANGE) {
            if (e[0] === 0 && e[1] === 0) {
                dataRef.current = null;
            }
        }

        filters[filters.findIndex(f => f.columnName === columnName)].data = dataRef.current;
    };

    const handleCloseButton = e => {
        if (!data) dataRef.current = null;
        setVisible(false);
    };

    const handleResetButton = () => {
        dataRef.current = null;
        filters[filters.findIndex(f => f.columnName === columnName)].data = dataRef.current;
        setData(null);
        callback(columnName, dataRef.current);
        setVisible(false);
    };

    const handleDoneButton = e => {
        setVisible(false);
        setData(dataRef.current);
        callback(columnName, dataRef.current);
    };

    const ComponentBuilder = props => (
        <Dropdown
            onVisibleChange={handleVisibleChange}
            overlay={
                <Menu>
                    <Row>
                        <Col className="lgim-styles-wrapper km-col-tb">{props.comp}</Col>
                    </Row>
                    <Row type="flex" justify="center">
                        {isEditable ? (
                            <>
                                <Col className="lgim-styles-wrapper km-col-tb">
                                    <Button onClick={handleCloseButton} size="small">
                                        Close
                                    </Button>
                                </Col>
                                <Col className="lgim-styles-wrapper km-col-tb">
                                    <Button onClick={handleResetButton} size="small">
                                        Clear
                                    </Button>
                                </Col>
                                <Col className="lgim-styles-wrapper km-col-tb">
                                    <Button
                                        onClick={handleDoneButton}
                                        type="primary"
                                        size="small"
                                        className="km-filter-cm-btn"
                                    >
                                        Done
                                    </Button>
                                </Col>
                            </>
                        ) : (
                            <Col span={24} className="km-border-top">
                                <Button
                                    onClick={() => {
                                        handleVisibleChange();
                                        setHandleShowModelCb();
                                    }}
                                    size="small"
                                    //style={{ width: '100%', borderRadius: 0, height: '33px', color: '#1899cc' }}
                                    className="lgim-styles-wrapper km-filter-cm-btn-edit"
                                >
                                    Edit
                                </Button>
                            </Col>
                        )}
                    </Row>
                </Menu>
            }
            overlayClassName="km-main-dropdown"
            trigger={['click']}
            visible={visible}
        >
            <Button
                type="text"
                onClick={e => e.preventDefault()}
                style={{
                    backgroundColor: styleConfig.buttonColor ? styleConfig.buttonColor : data ? '#1899cc' : '#fafafa',
                    marginLeft: styleConfig.marginLeft ? styleConfig.marginLeft : null,
                    marginTop: styleConfig.mmarginTop ? styleConfig.marginTop : null,
                    fontSize: styleConfig.fontSize ? styleConfig.fontSize : null,
                    color: styleConfig.fontColor ? styleConfig.fontColor : data ? 'white' : 'black',
                    borderRadius: '15px'
                }}
            >
                <Row type="flex" align="middle" justify="center">
                    <Row type="flex" align="middle" justify="center">
                        <Text
                            style={{
                                fontSize: 12,
                                color: styleConfig.fontColor ? styleConfig.fontColor : data ? 'white' : 'black'
                            }}
                        >
                            {displayName}
                        </Text>
                    </Row>
                    {showValue && data ? (
                        <Col>
                            :{' '}
                            {Array.isArray(data)
                                ? data.map(x => (moment.isMoment(x) ? x.format(dateFormat) : x)).join(', ')
                                : moment.isMoment(data)
                                ? data.format(dateFormat)
                                : data}
                        </Col>
                    ) : null}

                    <DownOutlined
                        style={{
                            fontSize: styleConfig.iconStyle ? '14px' : '10px',
                            marginLeft: 10,
                            marginTop: styleConfig.iconStyle ? null : 3
                        }}
                    />
                </Row>
            </Button>
        </Dropdown>
    );

    return (
        <>
            <div className="lgim-styles-wrapper km-filter-cm">
                {filterType === FILTER.FILTER_TYPE.NUMBERFIELD ? (
                    <ComponentBuilder
                        comp={
                            <InputNumber
                                className="km-filter-cm-input-Number"
                                defaultValue={data ? data : null}
                                onChange={handleDataChange}
                                disabled={!isEditable}
                                precision={precision}
                                placeholder={placeholder}
                            />
                        }
                    />
                ) : filterType === FILTER.FILTER_TYPE.RANGE ? (
                    <ComponentBuilder
                        comp={
                            <RangeFilter
                                className="km-filter-cm-range"
                                defaultValue={data ? [data[0], data[1]] : null}
                                onChange={handleDataChange}
                                disabled={!isEditable}
                                precision={precision}
                                placeholder={placeholder}
                            />
                        }
                    />
                ) : filterType === FILTER.FILTER_TYPE.DATETIME ? (
                    <ComponentBuilder
                        comp={
                            <DatePicker
                                defaultValue={data ? moment(data, dateFormat) : null}
                                onChange={handleDataChange}
                                disabled={!isEditable}
                            />
                        }
                    />
                ) : filterType === FILTER.FILTER_TYPE.DATETIME_RANGE ? (
                    <ComponentBuilder
                        comp={
                            <RangePicker
                                defaultValue={
                                    data && data.length
                                        ? [moment(data[0], dateFormat), moment(data[1], dateFormat)]
                                        : null
                                }
                                onChange={handleDataChange}
                                disabled={!isEditable}
                            />
                        }
                    />
                ) : filterType === FILTER.FILTER_TYPE.CHECKBOX_GROUP ? (
                    <ComponentBuilder
                        comp={
                            <CheckboxGroup
                                className="km-filter-cm-ck-grp"
                                options={options ? options : []}
                                defaultValue={data ? data : []}
                                onChange={handleDataChange}
                                disabled={!isEditable}
                            />
                        }
                    />
                ) : (
                    <></>
                )}
            </div>
        </>
    );
};

export default Filter;
