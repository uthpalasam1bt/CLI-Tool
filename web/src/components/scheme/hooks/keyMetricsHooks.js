import _ from 'lodash';
import moment from 'moment';
import React from 'react';
import { Modal, Col, Row, Tooltip } from 'antd';
import { history } from '../../../redux/store';
import { Select, DatePicker } from 'antd';
import { DEFAULT_VALUE } from '../../../constants/keyMetricsConstants';

const { Option } = Select;

const onChangeHandler = (record, columnId, e, action, renderConfig) => {
    if (!e) return;
    const transformedMsg = renderConfig.message.replace(/{\w+}/g, function(all) {
        return record[all.replace('{', '').replace('}', '')] || all;
    });

    if (moment.isMoment(e)) e = e.format(renderConfig.dateFormat);

    Modal.confirm({
        title: transformedMsg,
        okText: 'Yes',
        okType: 'warning',
        onOk: () => {
            action({ schemeId: record.schemeId, columnId, data: e });
        },
        cancelText: 'No'
    });
};

const navigate = (placeholderMappingObj, navigationPath) => {
    const transformedNavigationPath = navigationPath.replace(/{\w+}/g, function(all) {
        return placeholderMappingObj[all.replace('{', '').replace('}', '')] || all;
    });

    history.push(transformedNavigationPath);
};

const updateIsFavourite = (record, action) => {
    action(record);
};

const keyMetricsHooks = {
    TABLE: {
        sorter: {
            STRING: (columnConfig, a, b) => {
                return (a ? a : '').localeCompare(b ? b : '');
            },
            NUMBER: (columnConfig, a, b) => {
                a =
                    typeof a === 'string'
                        ? a.match(/[+-]?([0-9]*[.])?[0-9]+/g)
                            ? a.match(/[+-]?([0-9]*[.])?[0-9]+/g).join()
                            : 0
                        : a;
                b =
                    typeof b === 'string'
                        ? b.match(/[+-]?([0-9]*[.])?[0-9]+/g)
                            ? b.match(/[+-]?([0-9]*[.])?[0-9]+/g).join()
                            : 0
                        : b;
                return a - b;
            },
            DATETIME: (columnConfig, a, b) => {
                //just a static filler for making it easy for sorting when no values are found
                const olderMoment = moment().subtract(200, 'years');
                return (a === DEFAULT_VALUE
                    ? olderMoment
                    : moment(a, _.get(columnConfig, 'sortConfig.dateFormat'))
                ).diff(b === DEFAULT_VALUE ? olderMoment : moment(b, _.get(columnConfig, 'sortConfig.dateFormat')));
            },
            BOOLEAN: (columnConfig, a, b) => {
                return (a ? 1 : 0) - (b ? 1 : 0);
            }
        },
        render: {
            DATACHANGE: {
                SELECT: (columnId, renderConfig, text, record, index, actions) => (
                    <Select
                        disabled={_.has(renderConfig, `hasClaim`) ? !renderConfig.hasClaim : false}
                        style={{ width: 120 }}
                        value={text}
                        onSelect={e =>
                            onChangeHandler(record, columnId, JSON.parse(e), actions.schemeDataChange, renderConfig)
                        }
                    >
                        {/* <Option value={JSON.stringify({ optionIndex: -1, option: text })}>{text}</Option> */}
                        {renderConfig.options.map((option, optionIndex) => (
                            <Option value={JSON.stringify({ optionIndex, option })}>{option}</Option>
                        ))}
                    </Select>
                    // <>{text}</>
                ),
                DATETIME: (columnId, renderConfig, text, record, index, actions) => (
                    <DatePicker
                        disabled={_.has(renderConfig, `hasClaim`) ? !renderConfig.hasClaim : false}
                        format={renderConfig.dateFormat}
                        value={moment(text, renderConfig.dateFormat)}
                        onChange={e => onChangeHandler(record, columnId, e, actions.schemeDataChange, renderConfig)}
                    />
                    // <>{text}</>
                )
            },
            NAVIGATE: {
                GENERAL_NAVIGATION: (columnId, renderConfig, text, record, index) => (
                    <div
                        className="w-203-content td-word-wrap text-link"
                        onClick={() => navigate(record, renderConfig.options.navigationPath)}
                    >
                        {text}
                    </div>
                ),
                SCHEME_NAVIGATION: (columnId, renderConfig, text, record, index, actions) => (
                    <Row type="flex">
                        <Col>
                            <div className="w-203-content td-word-wrap text-link">
                                <i
                                    onClick={() => updateIsFavourite(record, actions.updateIsFavourite)}
                                    className={`fa fa-icon ${record.isFavorite ? 'fa-star selected' : 'fa-star-o'}`}
                                ></i>
                            </div>
                        </Col>
                        <Col>
                            {text.length > 15 ? (
                                <Tooltip placement="topLeft" title={text}>
                                    <div
                                        className="w-203-content td-word-wrap text-link"
                                        onClick={() => navigate(record, renderConfig.options.navigationPath)}
                                    >
                                        {text.substr(0, 15)}...
                                    </div>
                                </Tooltip>
                            ) : (
                                <div
                                    className="w-203-content td-word-wrap text-link"
                                    onClick={() => navigate(record, renderConfig.options.navigationPath)}
                                >
                                    {text}
                                </div>
                            )}
                        </Col>
                    </Row>
                )
            },
            RENDER: {
                DISPLAY_DOT: (columnId, renderConfig, text, record, index, actions) => (
                    <Row type="flex">
                        <Col>
                            <div className="w-203-content td-word-wrap text-link">
                                <span
                                    className="dot"
                                    style={(() => {
                                        const found = _.get(renderConfig, `colorMap`, []).find(x => {
                                            if (_.has(renderConfig, `dataPath`)) {
                                                if (x.key == _.get(record, `fullRecord.${renderConfig.dataPath}`)) {
                                                    console.log('-- here --');
                                                    return true;
                                                } else {
                                                    return false;
                                                }
                                            } else if (x.key == text) {
                                                return true;
                                            } else {
                                                return false;
                                            }
                                        });
                                        if (found) {
                                            return { backgroundColor: found.colorCode };
                                        } else {
                                            return { backgroundColor: null };
                                        }
                                    })()}
                                ></span>
                            </div>
                        </Col>
                        <Col>
                            <div style={{ ..._.get(renderConfig, `styles.text`, {}) }}>{text}</div>
                        </Col>
                    </Row>
                )
            }
        }
    }
};

export default keyMetricsHooks;
