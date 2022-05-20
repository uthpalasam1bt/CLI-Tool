import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Icon, Spin, Tooltip } from 'antd';
import BaseReportTypeContainer from '../../components/BaseReportType';
import {
    getReportStatusMsg,
    handleReportName,
    handleUpload,
    handleVisibleModal,
    onCloseVisibleModal,
    OUT_TIME_FORMAT,
    ReportStatus,
    ReportTypes,
    SORTING_TIME_FORMAT,
    TIME_FORMAT
} from '../../../utility';
import {
    getUploadReportSchemes_inProgress,
    getUploadReportSchemes,
    getUploadSchemes_error,
    getUploadUrl,
    getReportUploadUrl_inProgress,
    getUploadUrl_error,
    getUploadedReports
} from '../../selectors';
import { getUploadReportSchemesData, getUploadReportUrl } from '../../action';
import _ from 'lodash';
import moment from 'moment';
import BaseTableComponent from '../../../reportTable/BaseTableComponent';
import { tableColumns, handleReset, handleSearch, handleChange } from '../../../reportTable/columns';
import SearchTextInput from '../../../reportTable/SearchTextInput';
import UploadModal from '../../../components/modals/UploadModal';
import NotificationHelper from '../../../../../helpers/NotificationHelper';
import ViewModal from '../../../components/modals/ViewModal';
import { RA_REPORT_DELETE, RA_REPORT_UPLOAD, RA_UPLOAD_PROCEED, RA_PROCEED, TableHandlers } from '../../../constants/commonConstatnt';
import DeleteModal from '../../../components/modals/DeleteModal';
import PublishedReuploadModal from '../../../components/modals/PublishedReuploadModal';
import TableActions from '../../../reportTable/ModalOptions';

import { TABS } from '../../../constants/adminReportViewConstant';
const { UPLOAD } = TABS;

const UploadReportContainer = props => {
    const {
        report_types,
        getReportType_inProgress,
        getUploadReportSchemes_inProgress,
        getUploadSchemesData,
        uploadReportSchemes,
        uploadSchemes_error,
        getUploadReportUrl,
        upload_url,
        uploadUrl_error,
        updateStepAction,
        tabId,
        updateStepData_inProgress,
        updatedStepData,
        updateStepData_error,
        getStepData_inProgress,
        getStepData,
        getStepReportData,
        proceedSelectedReports,
        urlParams,
        uploadReport_inProgress,
        uploadUrl_inProgress,
        socketData,
        getConcurrentUploadData,
        setGetConcurrentUploadData,
        concurrencyModalVisibility,
        loggedUser

    } = props;

    const { reportName } = urlParams;
    const [reportTypes, setReportTypes] = useState(null);

    const [reportType, setReportType] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [uploadSchemesDataSource, setUploadSchemesDataSource] = useState([]);
    const [getUploadedReportData, setGetUploadedReportData] = useState([]);

    const [viewModalVisible, setViewModalVisible] = useState(false);
    const [uploadModalVisible, setUploadModalVisible] = useState(false);
    const [publishedReuploadModalVisible, setPublishedReuploadModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [deleteFile, setDeleteFile] = useState(null);

    const [isDisabled, setIsDisabled] = useState(true);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [selectedReport, setSelectedReport] = useState(null);
    const [selectedViewUrl, setSelectedViewUrl] = useState(null);
    const [deleteUploadedFile, setDeleteUploadedFile] = useState(false);

    const [selectedQuarterlyLongFormReports, setSelectedQuarterlyLongFormReports] = useState(null);
    const [selectedQuarterValue, setSelectedQuarterValue] = useState(null);
    const [selectedYearValue, setSelectedYearValue] = useState(null);

    const [selectedAdHocReport, setSelectedAdHocReport] = useState(null);

    const [dateList, setDateList] = useState(null);
    const [adHocSelectedDate, setAdHocSelectedDate] = useState(null);
    const [selectedAdHocReportKey, setSelectedAdHocReportKey] = useState(null);

    const [stopReloading, setStopReloading]=useState(false)

    useEffect(() => {
        if ( reportName === tabId) {
            setPublishedReuploadModalVisible(false);
            if (getStepReportData) {
                setSelectedAdHocReportKey(null);
                setAdHocSelectedDate(null)
                setSelectedQuarterlyLongFormReports(null)
                setUploadSchemesDataSource([]);

                getStepReportData(tabId);
            }
        }
        
    }, []);

    useEffect(() => {
        if ( reportName === tabId &&!stopReloading &&!viewModalVisible) {
            if (!reportType) {
                getStepReportData(tabId);

            }
            if (!getUploadReportSchemes_inProgress && reportType && reportType !== ReportTypes.ADHOC) {
                setSelectedQuarterlyLongFormReports(null)
                proceedSelectedReports([], [UPLOAD.TAB_KEY])

                getUploadSchemesData({ reportType, startDate, endDate, tabId });
            } else if (!getUploadReportSchemes_inProgress && reportType && reportType === ReportTypes.ADHOC) {

                getUploadSchemesData({ reportType, tabId });
                setAdHocSelectedDate(null)
            }
            
        }
    },[urlParams])

    
    useEffect(() => {

        if (getConcurrentUploadData && !viewModalVisible && reportName === tabId && socketData) {
            if (socketData.payload && socketData.payload.email === loggedUser.email && socketData.payload.socketAction === RA_REPORT_UPLOAD) {
                getStepReportData(tabId);

            }else if (!getUploadReportSchemes_inProgress && reportType && reportType === ReportTypes.ADHOC) {
                 
                    getUploadSchemesData({ reportType, tabId });
            } else if (!getUploadReportSchemes_inProgress && reportType && reportType !== ReportTypes.ADHOC) {
                   
    
                    getUploadSchemesData({ reportType, startDate, endDate, tabId });
             }
            

          
            setGetConcurrentUploadData(false);

            
        }
    }, [socketData, getConcurrentUploadData]);

    useEffect(() => {
        if (!viewModalVisible && report_types && report_types.Upload && report_types.Upload.reports) {
            setReportTypes(report_types.Upload.reports);
        }
    }, [report_types, report_types.Upload]);

    useEffect(() => {
        if (!viewModalVisible && reportName === tabId) {
            if (getStepData_inProgress) {
                setGetUploadedReportData([]);
                setSelectedAdHocReportKey(null);
                setSelectedAdHocReport(null); 
                setDateList(null);
                // setStartDate(null);
                // setEndDate(null);
                setAdHocSelectedDate(null)
                setPublishedReuploadModalVisible(false);
            }

            if (getStepData && getStepData.length) {
                const uplodedReport = [];
                const userUploadedReport = getStepData.filter(scheme => scheme.userId === loggedUser['custom:userId'] && scheme.reportStatus === 'UPLOADED')
                console.log("::uplod:",getStepData)
                if (userUploadedReport && userUploadedReport.length && loggedUser['custom:userId'] === userUploadedReport[0].userId) {
                    const UploadedReportType = userUploadedReport[0].reportType;
                    const selectedStartDate = userUploadedReport[0].startDate;
                    const selectedEndDate = userUploadedReport[0].endDate;
                    const quarter = moment(selectedStartDate, TIME_FORMAT).quarter();
                    const year = moment(selectedStartDate, TIME_FORMAT).year();
    
                    if (quarter && year) {
                        setSelectedQuarterValue(quarter);
                        setSelectedYearValue(year);
                    }
    
                    userUploadedReport.map(report => {
                        uplodedReport.push(report.reportId);
                    });

                    uplodedReport.length ? setGetUploadedReportData([...uplodedReport]) : setGetUploadedReportData([]);
                    if (UploadedReportType && selectedStartDate && selectedEndDate) {
                        // setReportType(null)
                        setReportType(UploadedReportType);
                        if (UploadedReportType !== ReportTypes.ADHOC) {
                            setStartDate(selectedStartDate);
                            setEndDate(selectedEndDate);
                        }
                        if(UploadedReportType === ReportTypes.ADHOC){
                            setAdHocSelectedDate([
                                moment(selectedStartDate, TIME_FORMAT),
                                moment(selectedEndDate, TIME_FORMAT)
                            ]);
                        }
                    }

                }
            
        
         
            } else {
                setAdHocSelectedDate(null);
                setSelectedQuarterValue(null);
                setSelectedYearValue(null);
                setGetUploadedReportData([]);
            }
        }
    }, [getStepData, getStepData_inProgress]);

    useEffect(() => {
        if(reportName===tabId){
            if (!getUploadReportSchemes_inProgress && !viewModalVisible && reportType && startDate && endDate && reportType !== ReportTypes.ADHOC) {
                getUploadSchemesData({ reportType, startDate, endDate,tabId });
            } else if (!getUploadReportSchemes_inProgress && reportType && reportType === ReportTypes.ADHOC) {
                getUploadSchemesData({ reportType, tabId });
            }
        }
      
    }, [reportType, startDate, endDate]);

    useEffect(() => {
        if (!viewModalVisible && selectedAdHocReport && selectedAdHocReport.schemeId &&selectedAdHocReportKey&& selectedAdHocReportKey.length) {
            if (selectedAdHocReportKey[0]===selectedAdHocReport.reportId && selectedAdHocReport.startDate && selectedAdHocReport.endDate) {
                setAdHocSelectedDate([
                    moment(selectedAdHocReport.startDate, TIME_FORMAT),
                    moment(selectedAdHocReport.endDate, TIME_FORMAT)
                ]);
                setDateList(null);
            }
            if (selectedAdHocReport.reportStatus === ReportStatus.UN_INITIATED) {
                getUploadReportUrl({
                    entityId: selectedAdHocReport.schemeId,
                    reportType: selectedAdHocReport.ReportType
                });
            }
        }
    }, [selectedAdHocReport]);

    useEffect(() => {
        if (urlParams && urlParams.reportName === tabId) {
            setPublishedReuploadModalVisible(false);
            if (uploadUrl_error) {
                // setDateList(null)
                setUploadModalVisible(false);
                setPublishedReuploadModalVisible(false);
            }

            if (!viewModalVisible && upload_url && upload_url.isContinue) {
                if (upload_url.reportPublished && selectedReport) {
                    setPublishedReuploadModalVisible(true);
                } else {
                    if (
                        upload_url.reportType === ReportTypes.ADHOC &&
                        selectedAdHocReport &&
                        selectedAdHocReport.reportStatus !== ReportStatus.UPLOADED
                    ) {
                        if (
                            upload_url.newReportData &&
                            upload_url.newReportData.getDateList 
                        ) {
                            setDateList(upload_url.newReportData.getDateList);
                        } else {
                            setDateList(null);
                        }
                    }
                    if (upload_url.startDate && upload_url.endDate) {
                        setUploadModalVisible(true);
                    }
                }
            } else if (upload_url && upload_url.reportPendingStatus) {

                const UploadStatus = [ReportStatus.SELECT_FOR_APPROVAL, ReportStatus.PENDING_PUBLISH, ReportStatus.PENDING_APPROVAL, ReportStatus.UPLOADED]
                const msgs = upload_url.reportPendingStatus.filter(status => {
                    return UploadStatus.includes(status)
                })
                 
                if (msgs.length === 1) {
                    NotificationHelper.getInstance().error(getReportStatusMsg(msgs[0]));
                } else {
                    NotificationHelper.getInstance().error(getReportStatusMsg('Report processed already.'));
                }
            }
        }
    }, [upload_url]);

    useEffect(() => {
        if (selectedAdHocReportKey && selectedAdHocReportKey.length && selectedAdHocReport) {
            if (
                selectedAdHocReport.reportId === selectedAdHocReportKey[0] &&
                selectedAdHocReport.reportStatus === ReportStatus.UPLOADED
            ) {
                const data = [];
                data.push(selectedAdHocReport);
                if (data.length) {
                    proceedSelectedReports(data, [UPLOAD.TAB_KEY]);
                }
            } else {
                proceedSelectedReports([], [UPLOAD.TAB_KEY]);
            }
        } else {
            proceedSelectedReports([], [UPLOAD.TAB_KEY]);
        }
    }, [selectedAdHocReportKey, selectedAdHocReport]);

    useEffect(() => {
      
            if (updatedStepData) {
               
                if (updatedStepData.currentUploadedReports && updatedStepData.currentUploadedReports.length === 0) {
                    setGetUploadedReportData([]);
                }

                if (updatedStepData.currentUploadedReports && updatedStepData.currentUploadedReports.length) {
                    let uploaded = [];
                    updatedStepData.currentUploadedReports.map(report => {
                        if(report.userId===loggedUser['custom:userId']) uploaded.push(report.reportId);
                    });
                    uploaded.length ? setGetUploadedReportData([...uploaded]) : setGetUploadedReportData([]);
                }

                if (selectedQuarterlyLongFormReports) {
                    setSelectedQuarterlyLongFormReports([]);
                }
                if (selectedAdHocReport) {
                    setSelectedAdHocReport(null);
                }

                if (!getUploadReportSchemes_inProgress && reportType && reportType !== ReportTypes.ADHOC && startDate && endDate) {
                    getUploadSchemesData({ reportType, startDate, endDate,tabId });
                } else if (!getUploadReportSchemes_inProgress && reportType && reportType === ReportTypes.ADHOC) {
                    getUploadSchemesData({ reportType,tabId });
                }
            }
        
    }, [updatedStepData, updateStepData_error]);

    useEffect(()=>{
        if (reportName === tabId && concurrencyModalVisibility) {
            uploadModalVisible && setUploadModalVisible(false);
            viewModalVisible && setViewModalVisible(false);
        }
    },[concurrencyModalVisibility])

    useEffect(() => {
    
        if (getUploadReportSchemes_inProgress || uploadSchemes_error || !reportType) {
            setUploadSchemesDataSource([]);
            setDateList(null)
            setAdHocSelectedDate(null)

        } else if (reportType && uploadReportSchemes && uploadReportSchemes.length) {
            let uploadedReport = [];
            let schemesDataSource = [];
    
            schemesDataSource = uploadReportSchemes
                .sort((schm1, schm2) => {
                    let prev = schm1.updatedAt
                        ? moment(schm1.updatedAt, SORTING_TIME_FORMAT)
                        : moment(schm1.createdAt, SORTING_TIME_FORMAT),
                        next = schm2.updatedAt
                            ? moment(schm2.updatedAt, SORTING_TIME_FORMAT)
                            : moment(schm2.createdAt, SORTING_TIME_FORMAT);
                    return next.diff(prev);

                })
                .map(scheme => {
                    if (reportType === ReportTypes.ADHOC && upload_url) {
                        if (upload_url.newReportData && upload_url.newReportData.reportId) {
                            setSelectedAdHocReportKey([upload_url.newReportData.reportId]);

                            if (scheme.reportId === upload_url.newReportData.reportId) {
                                scheme.tab = tabId;
                                scheme.ReportId = upload_url.newReportData.reportId;
                                setSelectedAdHocReport(scheme);
                            }
                        }
                    }
    
                    if (scheme.reportId && scheme.reportStatus === ReportStatus.UPLOADED && loggedUser['custom:userId'] === scheme.userId) {
                        uploadedReport.push(scheme.reportId);
                    }

                    return {
                        key: scheme.reportId
                            ? scheme.reportId
                            : scheme.schemeId
                                ? scheme.schemeId
                                : scheme.entityId,
                        ReportId: scheme.reportId,
                        reportId: scheme.reportId,
                        schemeId: scheme.schemeId ? scheme.schemeId : scheme.entityId,
                        schemeName: scheme.schemeName,
                        inceptionDate: scheme.inceptionDate,
                        classification: scheme.schemeClassification,
                        classificationDisplayName: scheme.classificationDisplayName,
                        reportStatus: scheme.reportStatus,
                        uploadStatus:
                            scheme.reportStatus &&
                            scheme.reportStatus !== ReportStatus.UN_INITIATED &&
                            reportType &&
                            `${handleReportName(scheme.reportType ? scheme.reportType : reportType)} (${scheme.reportSource})`,
                        startDate: scheme.startDate,
                        endDate: scheme.endDate,
                        url: scheme.reportUpload && scheme.reportUpload.url,
                        tab: tabId,
                        ReportType: scheme.reportType ? scheme.reportType : reportType,
                        reportSource: scheme.reportSource,
                        updatedAt: scheme.updatedAt,
                        uploadPath: scheme.reportUpload && scheme.reportUpload.path
                    };
                });

            if (uploadedReport.length) setGetUploadedReportData([...new Set([...getUploadedReportData, ...uploadedReport])]);

            schemesDataSource.length ? setUploadSchemesDataSource([...schemesDataSource]) : setUploadSchemesDataSource([]);

        } else {
            setUploadSchemesDataSource([]);
        }

        if (socketData && socketData.payload && [RA_REPORT_DELETE, RA_PROCEED].includes(socketData.payload.socketAction)) {
            if (socketData.payload.currentUploadedReports && socketData.payload.currentUploadedReports.length === 0) {
                setGetUploadedReportData([]);
            } else if (socketData.payload.currentUploadedReports && socketData.payload.currentUploadedReports.length) {
                let uploaded = [];
                socketData.payload.currentUploadedReports.map(report => {
                    if (loggedUser['custom:userId'] === report.userId) uploaded.push(report.reportId);
                });

                setGetUploadedReportData([...uploaded])
            }
        }
        
        
      
    }, [uploadReportSchemes, uploadSchemes_error, getUploadReportSchemes_inProgress, reportType]);

    const uploadColumns = [
        {
            key: 'schemeName',
            title: 'Scheme Name',
            dataIndex: 'schemeName',
            className: 'name-column',
            render: (schemeName, schemeReport) => {
                return reportType && reportType !== ReportTypes.ADHOC ? (
                    <>
                        <span className="fa-stack">
                            <a onClick={() => onClickActionHandler(TableHandlers.UPLOAD, schemeReport)}>
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
            width: 320,
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <SearchTextInput
                      concurrencyModalVisibility={!concurrencyModalVisibility}
                    placeholder="Search by scheme name"
                    onReset={() => handleReset(setSelectedKeys, clearFilters)}
                    onSearch={searchText =>
                        handleSearch(setSelectedKeys, selectedKeys, confirm, 'schemeName', searchText)
                    }
                    onChange={(value)=>{handleChange(value,setSelectedKeys,clearFilters)}}

                />
            ),
            filterIcon: filtered =>
                reportType && reportType !== ReportTypes.ADHOC ? (
                    <Tooltip placement="topLeft" visible={false}>
                        <Icon
                            type="search"
                            title="Search"
                            style={{ color: filtered ? '#1890ff' : undefined, left: '122px' }}
                        ></Icon>
                    </Tooltip>
                ) : (
                    <Tooltip placement="topLeft" visible={false}>
                        <Icon
                            type="search"
                            title="Search"
                            style={{ color: filtered ? '#1890ff' : undefined, left: '99px' }}
                        ></Icon>
                    </Tooltip>
                ),
            onFilter: (value, record) => {
                return record['schemeName']
                    .toString()
                    .toLowerCase()
                    .includes(value.toLowerCase());
            }
        },
        {
            ...tableColumns.classificationColumn()
        },
        {
            ...tableColumns.startDateColumn()
        },
        {
            ...tableColumns.endDateColumn()
        },
        {
            ...tableColumns.uploadStatusColumn()
        },
        ...[
            {
                key: 'action',
                title: '',
                dataIndex: '',
                render: key => {
                    if (
                        key.ReportType === ReportTypes.ADHOC &&
                        key.reportStatus !== ReportStatus.UPLOADED &&
                        adHocSelectedDate &&
                        selectedAdHocReportKey &&
                        key.ReportId === selectedAdHocReportKey[0]
                    ) {
                        return (
                            <span className="fa-stack table-upload-button">
                                <a
                                    onClick={() => {
                                        onClickActionHandler(TableHandlers.UPLOAD, key);
                                    }}
                                >
                                    <i className="fa fa-square fa-stack-2x" style={{ color: '#0099cc' }}></i>
                                    <i className="fa fa-upload fa-stack-1x fa-inverse" style={{ color: 'white' }}></i>
                                </a>
                            </span>
                        );
                    }
                    if (key.reportStatus === ReportStatus.UPLOADED) {
                        return (
                            <TableActions
                                tab={tabId}
                                visibleUpload={key.reportStatus === ReportStatus.UPLOADED}
                                visibleDelete={key.reportStatus === ReportStatus.UPLOADED}
                                visibleView={key.reportStatus === ReportStatus.UPLOADED}
                                onView={() => {
                                    onClickActionHandler(TableHandlers.VIEW, key);
                                }}
                                onUpload={() => {
                                    onClickActionHandler(TableHandlers.UPLOAD, key);
                                }}
                                onDelete={() => {
                                    onClickActionHandler(TableHandlers.DELETE, key);
                                }}
                            />
                        );
                    }
                }
            }
        ]
    ];

    const onClickActionHandler = (type, schemeData) => {
        if (!schemeData) {
            setSelectedReport(null);
        }
        setSelectedReport(schemeData);
        setSelectedViewUrl(schemeData.url);
        
        switch (type) {
            case TableHandlers.UPLOAD:
                setStopReloading(true)
                setUploadModalVisible(false);
                if (schemeData && reportType && reportType !== ReportTypes.ADHOC && startDate && endDate) {
                    if (schemeData.uploadPath) {
                        getUploadReportUrl({
                            entityId: schemeData.schemeId,
                            reportType: reportType,
                            startDate: startDate,
                            endDate: endDate,
                            reportId: schemeData.ReportId
                        });
                    } else {
                        getUploadReportUrl({
                            entityId: schemeData.schemeId,
                            reportType: reportType,
                            startDate: startDate,
                            endDate: endDate
                        });
                    }
                }
                 if (schemeData && reportType && reportType === ReportTypes.ADHOC ) {
                        setSelectedAdHocReport(schemeData);

                        const adHocstartDate = schemeData.startDate
                            ? schemeData.startDate
                            : adHocSelectedDate && adHocSelectedDate[0].format(TIME_FORMAT);
                        const adHocendDate = schemeData.endDate
                            ? schemeData.endDate
                            : adHocSelectedDate && adHocSelectedDate[1].format(TIME_FORMAT);

                        if (schemeData.uploadPath) {
                            getUploadReportUrl({
                                entityId: schemeData.schemeId,
                                reportType: schemeData.ReportType,
                                startDate: adHocstartDate,
                                endDate: adHocendDate,
                                reportId: schemeData.ReportId
                            });
                        } else {
                            getUploadReportUrl({
                                entityId: schemeData.schemeId,
                                reportType: schemeData.ReportType,
                                startDate: adHocstartDate,
                                endDate: adHocendDate
                            });
                        }
                    }
                

                break;
            case TableHandlers.VIEW:
                // setStopReloading(true)
                handleVisibleModal(viewModalVisible, setViewModalVisible);
              
                break;
            case TableHandlers.DELETE:
                setUploadModalVisible(false);
                handleVisibleModal(deleteModalVisible, setDeleteModalVisible);
                break;
            default:
                break;
        }
    };



    const handleReportTypeSelect = name => {

        if (getUploadedReportData.length > 0) {
            NotificationHelper.getInstance().warning(
                'Proceed with (or delete) uploaded reports prior to selecting another report type.'
            );
            return;
        }
        setSelectedAdHocReport(null);
        setSelectedAdHocReportKey(null);
        setAdHocSelectedDate(null);
        setDateList(null);
        setSelectedQuarterValue(null);
        setSelectedQuarterlyLongFormReports(null)
        setSelectedYearValue(null);
        setStartDate(null);
        setEndDate(null);
        proceedSelectedReports([], [UPLOAD.TAB_KEY])
        setReportType(name);
    };

  

    const handleUploadFile = () => {
        if (selectedReport && uploadedFile) {
            if (selectedReport.ReportType === ReportTypes.ADHOC) {
                if ((adHocSelectedDate || (selectedReport.startDate && selectedReport.endDate)) && upload_url) {
                    const startDate = selectedReport.startDate? selectedReport.startDate:adHocSelectedDate&& adHocSelectedDate[0].format(TIME_FORMAT);
                    const endDate = selectedReport.endDate? selectedReport.endDate:adHocSelectedDate&& adHocSelectedDate[1].format(TIME_FORMAT);
                    selectedReport.startDate = startDate;
                    selectedReport.endDate = endDate;
                    setUploadModalVisible(false);
                    setStopReloading(false)

                    handleUpload(selectedReport, upload_url, uploadedFile, tabId, updateStepAction);
                    setDeleteUploadedFile(true);
                }
            } else {
                if (upload_url) {
                    setUploadModalVisible(false);
                    setStopReloading(false)

                    handleUpload(selectedReport, upload_url, uploadedFile, tabId, updateStepAction);
                    setDeleteUploadedFile(true);
                }
            }
        }
    };

    const handlePublishedReuploadProceed = () => {
        setPublishedReuploadModalVisible(false);
        setUploadModalVisible(true);
    };

    const handleDeleteReport = () => {
        setDeleteModalVisible(false);

        if (selectedReport) {
            updateStepAction({
                action: RA_REPORT_DELETE,
                tabId,
                data: [
                    {
                        reportId: selectedReport.ReportId
                    }
                ],
                cb: () => {
                    NotificationHelper.getInstance().success('Deletion Successful.');
                    setDateList(null)
                }
            });
        }
    };

    const getUploadData = data => {
        if (data && data.ReportType !== ReportTypes.ADHOC) {
            return {
                schemeName: data.schemeName,
                startDate: data.startDate ? data.startDate : startDate,
                endDate: data.endDate ? data.endDate : endDate,
                uploadStatus: data.uploadStatus
                    ? data.uploadStatus
                    : `${handleReportName(data.ReportType)} (Pending Upload)`
            };
        } else {
            if (data && data.ReportType === ReportTypes.ADHOC ) {
                return {
                    schemeName: data.schemeName,
                    startDate:data.startDate?data.startDate:adHocSelectedDate && adHocSelectedDate[0].format(TIME_FORMAT),
                    endDate:data.endDate?data.endDate: adHocSelectedDate && adHocSelectedDate[1].format(TIME_FORMAT),
                    uploadStatus: data.uploadStatus
                        ? data.uploadStatus
                        : `${handleReportName(data.ReportType)} (Pending Upload)`
                };
            }
        }
    };

    const quarterAndLongFormRowHandler = {
        onChange: (selectedRowKeys, selectedRows) => {
            if (selectedRows && selectedRows.length > 0) {
                setSelectedQuarterlyLongFormReports([...selectedRowKeys]);
                proceedSelectedReports(selectedRows, [UPLOAD.TAB_KEY]);
            } else {
                proceedSelectedReports([], [UPLOAD.TAB_KEY]);
                setSelectedQuarterlyLongFormReports([]);
            }
        },
        getCheckboxProps: record => ({
            disabled: record.reportStatus === ReportStatus.UN_INITIATED
        }),
        selectedRowKeys: selectedQuarterlyLongFormReports
    };

    const adhocRowHandler = {
        onChange: (selectedRowKeys, selectedRow) => {
            if (selectedRow[0].reportStatus !== ReportStatus.UPLOADED) {
                setAdHocSelectedDate(null);
            }

            if (selectedRowKeys) {
                setSelectedAdHocReportKey(selectedRowKeys);
            }
            if (selectedRow && selectedRow.length) {
                setSelectedAdHocReport(selectedRow[0]);
            } else {
                setSelectedAdHocReport(null);
                setSelectedAdHocReportKey(null);
                proceedSelectedReports([], [UPLOAD.TAB_KEY]);
            }
        },
        selectedRowKeys: selectedAdHocReportKey
    };
    return (
        <>
            <Spin
                spinning={
                    getReportType_inProgress ||
                    getUploadReportSchemes_inProgress ||
                    updateStepData_inProgress ||
                    uploadReport_inProgress ||
                    uploadUrl_inProgress
                }
            >
                <>
                    {reportTypes && reportTypes.length > 0 && (
                        <BaseReportTypeContainer  
                            reports={reportTypes}
                            handleReportTypeSelect={handleReportTypeSelect}
                            reportType={reportType}
                            setStartDate={setStartDate}
                            setEndDate={setEndDate}
                            selectedQuarterValue={selectedQuarterValue}
                            selectedYearValue={selectedYearValue}
                            dateList={dateList}
                            adHocSelectedDate={adHocSelectedDate}
                            setAdHocSelectedDate={setAdHocSelectedDate}
                            selectedAdHocReport={selectedAdHocReport}
                        />
                    )}
                </>

                {
                    <BaseTableComponent
                        className="custom-row table-row mt-15 border-table"
                        tableKey={'upload'}
                        columns={uploadColumns}
                        dataSource={uploadSchemesDataSource}
                        rowSelection={
                            reportType !== ReportTypes.ADHOC
                                ? {
                                      type: 'checkbox',
                                      ...quarterAndLongFormRowHandler
                                  }
                                : {
                                      type: 'radio',
                                      ...adhocRowHandler
                                  }
                        }
                    />
                }

                {selectedReport && (
                    <UploadModal
                        isDisabled={isDisabled}
                        visible={uploadModalVisible}
                        onClose={() => {
                            setDeleteUploadedFile(true);
                            onCloseVisibleModal(setUploadModalVisible);
                            setStopReloading(false)
                        }}
                        onProceed={handleUploadFile}
                        schemeData={getUploadData(selectedReport)}
                        setDeleteFile={setDeleteFile}
                        setIsDisabled={setIsDisabled}
                        setUploadedFile={setUploadedFile}
                        setDeleteUploadedFile={setDeleteUploadedFile}
                        deleteUploadedFile={deleteUploadedFile}
                        deleteFile={deleteFile}
                    />
                )}
                {selectedReport && selectedViewUrl && (
                    <>
                        <ViewModal
                            visible={viewModalVisible}
                            onClose={() => {
                                onCloseVisibleModal(setViewModalVisible, { setViewUrl: setSelectedViewUrl });
                                // setStopReloading(false)

                            }}
                            report={selectedReport}
                            url={selectedViewUrl}
                        />
                    </>
                )}
                {selectedReport && (
                    <>
                        <DeleteModal
                            onClose={() => {
                                onCloseVisibleModal(setDeleteModalVisible);
                            }}
                            onProceed={handleDeleteReport}
                            visible={deleteModalVisible}
                        />
                    </>
                )}

                {upload_url && (
                    <PublishedReuploadModal
                        visible={publishedReuploadModalVisible}
                        onClose={() => {
                            setPublishedReuploadModalVisible(false);
                            setUploadModalVisible(false);
                        }}
                        onProceed={handlePublishedReuploadProceed}
                        title="Upload"
                        content="Selected document already published. Proceed to upload again."
                    />
                )}
            </Spin>
        </>
    );
};

const mapStateToProps = createStructuredSelector({
    getUploadReportSchemes_inProgress: getUploadReportSchemes_inProgress(),
    uploadReportSchemes: getUploadReportSchemes(),
    uploadSchemes_error: getUploadSchemes_error(),
    upload_url: getUploadUrl(),
    uploadUrl_error: getUploadUrl_error(),
    uploadedReports: getUploadedReports(),
    uploadUrl_inProgress: getReportUploadUrl_inProgress()
});

const mapDispatchToProps = dispatch => ({
    getUploadSchemesData: data => dispatch(getUploadReportSchemesData(data)),
    getUploadReportUrl: data => dispatch(getUploadReportUrl(data))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UploadReportContainer);
