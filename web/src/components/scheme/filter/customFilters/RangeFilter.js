import React, { useState } from 'react';
import { InputNumber, Row, Col, Typography } from 'antd';

const RangeFilter = props => {
    const [data, setData] = useState(props.defaultValue);
    const [value1, setValue1] = useState(props.defaultValue ? props.defaultValue[0] : 0);
    const [value2, setValue2] = useState(props.defaultValue ? props.defaultValue[1] : 0);

    const handleOnChange = (compKey, e) => {
        if (compKey === 1) {
            setValue1(e);
            props.onChange([e, value2]);
        } else if (compKey === 2) {
            setValue2(e);
            props.onChange([value1, e]);
        }
        setData([value1, value2]);
    };

    return (
        <>
            <Row>
                <Col span={11}>
                    <InputNumber
                        style={{ width: 79 }}
                        defaultValue={data ? data[0] : null}
                        onChange={e => handleOnChange(1, e)}
                        disabled={props.disabled}
                        precision={props.precision}
                        placeholder={props.placeholder}
                    />
                </Col>
                <Col span={2}>
                    <Typography style={{ textAlign: 'center', marginLeft: '2px' }}>-</Typography>
                </Col>
                <Col span={11}>
                    <InputNumber
                        style={{ width: 79 }}
                        defaultValue={data ? data[1] : null}
                        onChange={e => handleOnChange(2, e)}
                        disabled={props.disabled}
                        precision={props.precision}
                        placeholder={props.placeholder}
                    />
                </Col>
            </Row>
        </>
    );
};

export default RangeFilter;
