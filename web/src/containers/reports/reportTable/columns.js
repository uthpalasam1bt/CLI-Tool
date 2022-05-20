import { Icon, Tooltip } from 'antd';
import moment from 'moment';
import React from 'react';
import SearchFilters from './SearchFilter';
import SearchTextInput from './SearchTextInput';

import { GenerationStatus, OUT_TIME_FORMAT, ReportStatus, ReportTypes, TIME_FORMAT } from '../utility';
import GenerationStatusFilter from './GenerationStatusFilter';

export const tableColumns = {
    schemeNameColumn: (props = {}) => {
        const { selectedReportType, pendingApprovalTab, publishedColumn, clientReportView ,concurrencyModalVisibility} = props;
        return {
            key: 'schemeName',
            title: 'Scheme Name',
            dataIndex: 'schemeName',
            className: clientReportView ? 'name-column-client' : 'name-column',
            render: (schemeName, schemeReportId) => {
                return selectedReportType && selectedReportType.reportType !== ReportTypes.ADHOC ? (
                    <>
                        <span class="fa-stack">
                            <a onClick={() => handleTableAction('UPLOAD', { schemeReportId, ...props })}>
                                <i className="fa fa-square fa-stack-2x" style={{ color: '#0099cc' }}></i>
                                <i className="fa fa-upload fa-stack-1x fa-inverse" style={{ color: 'white' }}></i>
                            </a>
                        </span>
                        <span className="scheme" title={schemeName}>
                            {schemeName}
                        </span>
                    </>
                ) : (
                    <span className="scheme" title={schemeName}>
                        {schemeName}
                    </span>
                );
            },
            width: publishedColumn ? 350 : 320,
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <SearchTextInput
                    //   concurrencyModalVisibility={!concurrencyModalVisibility}
                    placeholder="Search by scheme name"
                    onReset={() => handleReset(setSelectedKeys, clearFilters)}
                    onSearch={searchText =>
                        handleSearch(setSelectedKeys, selectedKeys, confirm, 'schemeName', searchText)
                    }
                    onChange={(value)=>{handleChange(value,setSelectedKeys,clearFilters)}}

                />
            ),
            filterIcon: filtered =>
                selectedReportType && selectedReportType.reportType !== ReportTypes.ADHOC ? (
                    <Tooltip placement="topLeft" visible={false}>
                        <Icon
                            type="search"
                            title="Search"
                            style={{ color: filtered ? '#1890ff' : undefined, left: '124px' }}
                        ></Icon>
                    </Tooltip>
                ) : (
                    <Tooltip placement="topLeft" visible={false}>
                        <Icon
                            type="search"
                            title="Search"
                            style={{
                                color: filtered ? '#1890ff' : undefined,
                                left: pendingApprovalTab || publishedColumn || clientReportView ? '125px' : '99px'
                            }}
                        ></Icon>
                    </Tooltip>
                ),
            onFilter: (value, record) => {
                return record['schemeName']
                    .toString()
                    .toLowerCase()
                    .includes(value.toLowerCase());
            }
        };
    },
    classificationColumn: (props = {}) => {
        const { concurrencyModalVisibility }=props
        return {
            title: 'Classification',
            dataIndex: 'classificationDisplayName',
            render: classification => (
                <span className="scheme" title={classification}>
                    {classification}
                </span>
            ),
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <SearchTextInput
                    // concurrencyModalVisibility={!concurrencyModalVisibility}
                    placeholder="Search by classification"
                    onReset={() => handleReset(setSelectedKeys, clearFilters)}
                    onSearch={searchText =>
                        handleSearch(setSelectedKeys, selectedKeys, confirm, 'classification', searchText)
                    }
                    onChange={(value)=>{handleChange(value,setSelectedKeys,clearFilters)}}

                />
            ),
            filterIcon: filtered => (
                <Tooltip placement="topLeft" visible={false}>
                    <Icon
                        type="search"
                        title="Search"
                        style={{ color: filtered ? '#1890ff' : undefined, left: '95px' }}
                    >
                        {' '}
                    </Icon>
                </Tooltip>
            ),
            onFilter: (value, record) => {
                return (
                    record['classificationDisplayName'] &&
                    record['classificationDisplayName']
                        .toString()
                        .toLowerCase()
                        .includes(value.toLowerCase())
                );
            }
        };
    },
    startDateColumn: (props = {}) => {
        return {
            key: 'startDate',
            title: 'Start Date',
            dataIndex: 'startDate',
            sorter: (startDatePrev, startDateNext, sortOrder) => {
                const prev = startDatePrev.startDate ? moment(startDatePrev.startDate, TIME_FORMAT) : moment();

                const next = startDateNext.startDate ? moment(startDateNext.startDate, TIME_FORMAT) : moment();

                return next.diff(prev);
            },
            render: text =>
                text ? (
                    text !== 'N/A' ? (
                        <span>{moment(text, TIME_FORMAT).format(TIME_FORMAT)}</span>
                    ) : (
                        <span> N/A </span>
                    )
                ) : (
                    <span> </span>
                )
        };
    },
    endDateColumn: (props = {}) => {
        return {
            key: 'endDate',
            title: 'End Date',
            dataIndex: 'endDate',
            sorter: (endDatePrev, endDateNext, sortOrder) => {

                const prev = endDatePrev.endDate ? moment(endDatePrev.endDate, TIME_FORMAT) : moment();

                const next = endDateNext.endDate ? moment(endDateNext.endDate, TIME_FORMAT) : moment();

                return next.diff(prev);

            
            },
            render: text =>
                text ? (
                    text !== 'N/A' ? (
                        <span>{moment(text, TIME_FORMAT).format(TIME_FORMAT)}</span>
                    ) : (
                        <span> N/A </span>
                    )
                ) : (
                    <span> </span>
                )
        };
    },
    uploadStatusColumn: (props = {}) => {
        return {
            key: 'uploadStatus',
            title: 'Upload Status',
            dataIndex: 'uploadStatus',
            sorter: (schemeReportPrev, schemeReportNext, sortOrder) => {
                const prevStatus = schemeReportPrev.uploadStatus ? schemeReportPrev.uploadStatus : '';
                const nextStatus = schemeReportNext.uploadStatus ? schemeReportNext.uploadStatus : '';

                return prevStatus.localeCompare(nextStatus);
            },

            render: text => <span className="grey-text italic-text">{text}</span>
        };
    },
    reportTypeColumn: (props = {}) => {
        const { clientReportView ,concurrencyModalVisibility } = props;
        return {
            key: 'reportType',
            title: 'Report Type',
            dataIndex: 'reportType',
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <SearchFilters
                    onOk={searchText => {
                        if (searchText.length) {
                            handleSearch(setSelectedKeys, selectedKeys, confirm, 'reportType', searchText);
                        }
                    }}
                    onReset={() => handleReset(setSelectedKeys, clearFilters)}
                    onChange={(value)=>{handleChange(value,setSelectedKeys,clearFilters)}}

                    clientReportView={clientReportView ? true : false}
                    // concurrencyModalVisibility={!concurrencyModalVisibility}
                />
            ),
            filterIcon: filtered => (
                <Icon type="filter" style={{ color: filtered ? '#1890ff' : undefined, left: '84px' }} theme="filled" />
            ),
            onFilter: (value, record) => {
                return value.find(element =>
                    element
                        .toString()
                        .trim()
                        .toLowerCase()
                        .includes(record.reportType.trim().toLowerCase())
                );
            },
            render: text => (
                <span className="grey-text italic-text">
                    {clientReportView && text.trim() === ReportTypes.LONG_FORM ? 'Long form' : text}
                </span>
            )
        };
    },
    modifiedDateColumn: (props = {}) => {
        return {
            key: 'modifiedDate',
            title: 'Modified Date',
            dataIndex: 'modifiedDate',
            sorter: (schemeReportPrev, schemeReportNext, sortOrder) => {
                const prev = schemeReportPrev.modifiedDate
                    ? moment(schemeReportPrev.modifiedDate, OUT_TIME_FORMAT)
                          .format(TIME_FORMAT)
                          .toString()
                    : '';

                const next = schemeReportNext.modifiedDate
                    ? moment(schemeReportNext.modifiedDate, OUT_TIME_FORMAT)
                          .format(TIME_FORMAT)
                          .toString()
                    : '';

                return next.localeCompare(prev);
            },
            render: text =>
                text ? <span>{moment(text, OUT_TIME_FORMAT).format(TIME_FORMAT)}</span> : <span> N/A </span>
        };
    },
    approvedByColumn: (props={}) => {
        const { concurrencyModalVisibility }=props
        return {
            key: 'approvedBy',
            title: 'Approved by',
            dataIndex: 'approvedBy',
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <SearchTextInput
                    placeholder="Approved by"
                    onReset={() => handleReset(setSelectedKeys, clearFilters)}
                    onSearch={searchText =>
                        handleSearch(setSelectedKeys, selectedKeys, confirm, 'approved', searchText)
                    }
                    onChange={(value)=>{handleChange(value,setSelectedKeys,clearFilters)}}
                    // concurrencyModalVisibility={!concurrencyModalVisibility}
                />
            ),
            filterIcon: filtered => (
                <Tooltip placement="topLeft" visible={false}>
                    <Icon
                        type="search"
                        title="Search"
                        style={{ color: filtered ? '#1890ff' : undefined, left: '87px' }}
                    ></Icon>
                </Tooltip>
            ),
            onFilter: (value, record) => {
                console.log('onfilter', value, 'record', record);
                const approvedBy = record['approvedBy'] === null ? '' : record['approvedBy'];
                return approvedBy
                    .toString()
                    .toLowerCase()
                    .includes(value.toLowerCase());
            },
            render: text => <span className="grey-text italic-text">{text}</span>
        };
    },
    publishedDateColumn: () => {
        return {
            key: 'publishedDate',
            title: 'Published Date',
            dataIndex: 'publishedDate',

            sorter: (schemeReportPrev, schemeReportNext, sortOrder) => {
                const prev = schemeReportPrev.publishedDate
                    ? moment(schemeReportPrev.publishedDate, OUT_TIME_FORMAT)
                          .format(TIME_FORMAT)
                          .toString()
                    : '';

                const next = schemeReportNext.publishedDate
                    ? moment(schemeReportNext.publishedDate, OUT_TIME_FORMAT)
                          .format(TIME_FORMAT)
                          .toString()
                    : '';
                return next.localeCompare(prev);
            },
            render: text =>
                text ? <span>{moment(text, OUT_TIME_FORMAT).format(TIME_FORMAT)}</span> : <span> N/A </span>
        };
    },
    generationStatusColumn: (props = {}) => {
        const { concurrencyModalVisibility }=props
        return {
            title: 'Generation Status',
            dataIndex: 'reportStatus',
            width: 320,
            render: text => (
                <span className="italic-text ">
                    <span className={`dot ${getValidColoredIconForReportStatus(text)}`} />
                    {text === 'Genaration Failed' ? 'Failed' : text === ReportStatus.UN_INITIATED ? 'No data' : text}
                </span>
            ),

            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <GenerationStatusFilter
                onChange={(value)=>{handleChange(value,setSelectedKeys,clearFilters)}}
                    onOk={searchText => {
                        if (searchText.length) {
                            console.log("sdsdsd",searchText);
                            handleSearch(setSelectedKeys, selectedKeys, confirm, 'reportStatus', searchText);
                        }
                    }}
                    onReset={() => handleReset(setSelectedKeys, clearFilters)}
                    //   concurrencyModalVisibility={!concurrencyModalVisibility}
                />
            ),

            filterIcon: filtered => (
                <Tooltip placement="topLeft" visible={false}>
                    <Icon
                        type="filter"
                        title="Filter"
                        theme="filled"
                        style={{ color: filtered ? '#1890ff' : undefined, left: '125px' }}
                    ></Icon>
                </Tooltip>
            ),
            onFilter: (value, record) => {
                return value.find(element =>
                    element
                        .toString()
                        .trim()
                        .toLowerCase()
                        .includes(record.reportStatus?record.reportStatus.trim().toLowerCase():"")
                );
            }
        };
    }
};

const getValidColoredIconForReportStatus = status => {
    switch (status) {
        case GenerationStatus.GENERATION_FAILED:
            return 'red-dot';
        case GenerationStatus.GENERATION_SUCCESS:
            return 'green-dot';
        case GenerationStatus.GENERATION_INPROGRESS:
            return 'blue-dot';
        case GenerationStatus.GENERATION_PENDING:
            return 'yellow-dot';
        default:
            return '';
    }
};

export const handleSearch = (setSelectedKeys, selectedKeys, handleConfirm, dataIndex, searchText) => {
    setSelectedKeys([searchText]);
    handleConfirm();
};

export const handleReset = (setSelectedKeys, clearFilters) => {
    setSelectedKeys([]);
    clearFilters();
};

export const handleChange=(value,setSelectedKeys, clearFilters)=>{
  
    if(!value||value.length===0){
        setSelectedKeys([]);
        clearFilters();
    }
    }
  
export const handleTableAction = (type, props) => {
    console.log('action', props);
};
