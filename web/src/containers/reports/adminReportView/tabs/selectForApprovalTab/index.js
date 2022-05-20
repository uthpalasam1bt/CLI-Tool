import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import moment from 'moment';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import BaseTableComponent from '../../../reportTable/BaseTableComponent';
import { tableColumns } from '../../../reportTable/columns';
import TableActions from '../../../reportTable/ModalOptions';
import ViewModal from '../../../components/modals/ViewModal';
import UploadModal from '../../../components/modals/UploadModal';
import NotificationHelper from '../../../../../helpers/NotificationHelper';
import DeleteModal from '../../../components/modals/DeleteModal';

import { getReportUploadUrl_inProgress, getUploadUrl, getUploadUrl_error } from '../../selectors';
import { getUploadReportUrl } from '../../action';

import {
    ApprovalStatus,
    downloadReport,
    getReportStatusMsg,
    handleReportName,
    handleReportStatus,
    handleUpload,
    handleVisibleModal,
    onCloseVisibleModal,
    OUT_TIME_FORMAT,
    ReportStatus,
    SORTING_TIME_FORMAT
} from '../../../utility';

import { RA_REPORT_DELETE, RA_UPLOAD_PROCEED, TableHandlers } from '../../../constants/commonConstatnt';
import { TABS } from '../../../constants/adminReportViewConstant';
const { SELECT_FOR_APPROVAL } = TABS;

const SelectApprovalContainer = props => {
    const {
        updateStepAction,
        tabId,
        updateStepData_inProgress,
        updatedStepData,
        getStepData_inProgress,
        getStepData,
        getStepData_error,
        getStepReportData,
        proceedSelectedReports,
        urlParams,
        uploadReport_inProgress,
        downloadReport_inProgress,
        getUploadReportUrl,
        upload_url,
        uploadUrl_error,
        uploadUrl_inProgress,
        concurrencyModalVisibility,
        socketData = {}
    } = props;

  
    const { reportName } = urlParams;

    const [selectApprovalDataSource, setSelectApprovalDataSource] = useState([]);
    const [selectedReport, setSelectedReport] = useState(null);
    const [selectedViewUrl, setSelectedViewUrl] = useState(null);

    const [viewModalVisible, setViewModalVisible] = useState(false);
    const [uploadModalVisible, setUploadModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [selectedReportsToProceed, setSelectedReportsToProceed] = useState([]);
    const [isDisabled, setIsDisabled] = useState(true);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [commentList, setCommentList] = useState(null);

    const [deleteFile, setDeleteFile] = useState(null);
    const [deleteUploadedFile, setDeleteUploadedFile] = useState(false);

    const [stepData, setStepData] = useState([]);

    useEffect(() => {
        const { reportName } = urlParams;
        if (!viewModalVisible && !downloadReport_inProgress && !uploadUrl_inProgress && !getStepData_inProgress && getStepReportData && tabId && reportName === tabId) {
            getStepReportData(tabId);
        }
    }, [urlParams]);

    useEffect(() => {
        if (!getStepData_inProgress && updatedStepData && reportName === tabId) {
            setSelectedReportsToProceed([]);
            getStepReportData(tabId);

        }
    }, [updatedStepData]);

    useEffect(() => {
        if (!viewModalVisible && reportName === tabId) {
            if (getStepData_inProgress || getStepData_error) {
                setSelectApprovalDataSource([]);
                setStepData([]);
            } else if (getStepData && getStepData.length) {
                setStepData(getStepData);
            } else {
                setSelectApprovalDataSource([]);
                setStepData([]);
            }
        }
    }, [getStepData, getStepData_inProgress]);

    useEffect(() => {
        if (stepData && stepData.length) {
            let schemesDataSource = [];

            schemesDataSource = stepData
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
                    if ([ReportStatus.SELECT_FOR_APPROVAL, ReportStatus.REPORT_REJECTED, ReportStatus.GENERATION_FAILED].includes(scheme.reportStatus)) {
                        return {
                            key: scheme.reportId,
                            ReportId: scheme.reportId,
                            schemeId: scheme.entityId,
                            schemeName: scheme.schemeName,
                            inceptionDate: scheme.inceptionDate,
                            classification: scheme.schemeClassification,
                            startDate: scheme.startDate,
                            endDate: scheme.endDate,
                            url: scheme.reportUpload && scheme.reportUpload.url,
                            tab: tabId,
                            reportType: `${handleReportName(scheme.reportType)} (${scheme.reportSource})`,
                            ReportType: scheme.reportType,
                            modifiedDate: scheme.updatedAt,
                            reportStatus: scheme.reportStatus,
                            status: handleReportStatus(scheme.reportStatus),
                            reportSource: scheme.reportSource,
                            uploadPath: scheme.reportUpload && scheme.reportUpload.path,
                            reportUploaded: scheme.reportUpload,
                            comments:
                                scheme.comments && scheme.comments.commentThread.comments
                                    ? scheme.comments.commentThread.comments
                                    : [],
                            commentThreadId: scheme.comments && scheme.comments.commentThread.threadId,
                            uploadStatus:
                                scheme.reportStatus && `${handleReportName(scheme.reportType)} (${scheme.reportSource})`
                        };
                    }
                });

            if (schemesDataSource.length) {
                let dataSource = schemesDataSource.filter(r => r !== undefined);
                dataSource && dataSource.length
                    ? setSelectApprovalDataSource([...dataSource])
                    : setSelectApprovalDataSource([]);
            }
        } else {
            setSelectApprovalDataSource([]);
        }
    }, [stepData]);

    useEffect(() => {

        if (
            reportName===tabId && tabId === SELECT_FOR_APPROVAL.TAB_KEY &&
            socketData &&
            socketData.payload &&
            (socketData.payload.socketAction==='reportGenerate' && SELECT_FOR_APPROVAL.TAB_KEY === socketData.payload.nextTabId ) &&
            !getStepData_inProgress
        ) {
            getStepReportData(tabId);
        }

    }, [JSON.stringify(socketData)])

    const getValidColoredIconForReportStatus = status => {
      
        if (status == ApprovalStatus.REJECTED||status == ApprovalStatus.GENERATION_FAILED) return 'black-dot';
        else return 'yellow-dot';
    };

    const SelectApprovalColumns = [
        {
            ...tableColumns.schemeNameColumn()
        },
        {
            ...tableColumns.startDateColumn()
        },
        {
            ...tableColumns.endDateColumn()
        },
        {
            ...tableColumns.modifiedDateColumn()
        },
        {
            ...tableColumns.reportTypeColumn()
        },
        {
            key: 'status',
            title: 'Status',
            dataIndex: 'status',
            render: text => {
                if(reportName===tabId){
                    return (
                        <span className="italic-text">
                            <span className={`dot ${getValidColoredIconForReportStatus(text)}`}></span>
                            {text}
                        </span>
                    )
                }
               },
            sorter: (schemeReportPrev, schemeReportNext, sortOrder) => {
                const prevStatus = schemeReportPrev && schemeReportPrev.status ? schemeReportPrev.status : '';
                const nextStatus = schemeReportNext && schemeReportNext.status ? schemeReportNext.status : '';
                return prevStatus.localeCompare(nextStatus);
            }
        },
        {
            title: '',
            dataIndex: '',
            render: key => {
                if (key) {
                    if (selectedReport && selectedReport.ReportId === key.ReportId) {
                        if (key.comments.length) {
                            setCommentList(key.comments);
                        } else {
                            setCommentList(null);
                        }
                    }
           
                    return (
                        <TableActions
                            tab={tabId}
                            visibleView={
                                key.reportStatus === ReportStatus.SELECT_FOR_APPROVAL ||
                                key.reportStatus === ReportStatus.REPORT_REJECTED
                                
                            }
                            visibleUpload={
                                key.reportSource=='Uploaded'&&(key.reportStatus == ReportStatus.SELECT_FOR_APPROVAL ||
                                key.reportStatus == ReportStatus.REPORT_REJECTED)
                            }
                            visibleDelete={key.reportStatus}
                            visibleDownload={
                                key.reportStatus === ReportStatus.SELECT_FOR_APPROVAL ||
                                key.reportStatus === ReportStatus.REPORT_REJECTED
                            }
                            onView={() => {
                                onClickActionHandler(TableHandlers.VIEW, key);
                            }}
                            onUpload={() => {
                                onClickActionHandler(TableHandlers.UPLOAD, key);
                            }}
                            onDelete={() => {
                                onClickActionHandler(TableHandlers.DELETE, key);
                            }}
                            onDownload={() => {
                                onClickActionHandler(TableHandlers.DOWNLOAD, key);
                            }}
                        />
                    );
                }
            }
        }
    ];

    useEffect(()=>{
        if (reportName === tabId) {

            if(concurrencyModalVisibility){
                uploadModalVisible&& setUploadModalVisible(false)
             }
        }
        
    },[concurrencyModalVisibility])

    useEffect(() => {
        setUploadModalVisible(false);
        if (reportName === tabId) {
            if (uploadUrl_error) {
                setUploadModalVisible(false);
            }

            if (!viewModalVisible && upload_url && upload_url.isContinue) {
                setUploadModalVisible(true);
            } else {
                if (upload_url && upload_url.reportPendingStatus) {
                    NotificationHelper.getInstance().error(getReportStatusMsg(upload_url.reportPendingStatus[0]));
                }
            }
        }
    }, [upload_url]);

    const onClickActionHandler = (type, schemeData) => {
        if (schemeData) {
            setSelectedReport(schemeData);
            setSelectedViewUrl(schemeData.url);
        } else {
            setSelectedReport(null);
            setSelectedViewUrl(null);
        }

        switch (type) {
            case TableHandlers.UPLOAD:
                setUploadModalVisible(false);
                if (schemeData.uploadPath) {
                    getUploadReportUrl({
                        entityId: schemeData.schemeId,
                        reportType: schemeData.ReportType,
                        startDate: schemeData.startDate,
                        endDate: schemeData.endDate,
                        reportId: schemeData.ReportId
                    });
                }

                break;
            case TableHandlers.VIEW:
                handleVisibleModal(viewModalVisible, setViewModalVisible);
                break;
            case TableHandlers.DELETE:
                handleVisibleModal(deleteModalVisible, setDeleteModalVisible);
                break;
            case TableHandlers.DOWNLOAD:
                if (schemeData && schemeData.url) {
                    downloadReport(schemeData.url, schemeData);
                }
                break;
            default:
                break;
        }
    };

    const handleUploadFile = () => {
        if (selectedReport && uploadedFile) {
            if (upload_url) {
                setUploadModalVisible(false);

                handleUpload(selectedReport, upload_url, uploadedFile, tabId, updateStepAction, RA_UPLOAD_PROCEED);
                setDeleteUploadedFile(true);
            }
        }
    };

    const getUploadData = data => {
        if (data) {
            return {
                schemeName: data.schemeName,
                startDate: data.startDate,
                endDate: data.endDate,
                uploadStatus: data.reportType ? data.reportType : `${handleReportName(data.ReportType)}(Pending Upload)`
            };
        }
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
                }
            });
        }
    };

    const selectApprovalRowHandler = {
        onChange: (selectedRowKeys, selectedRows) => {
            if (selectedRows.length > 0 &&selectedRowKeys&&selectedRowKeys.length) {
                setSelectedReportsToProceed([...selectedRowKeys]);
                proceedSelectedReports(selectedRows, [SELECT_FOR_APPROVAL.TAB_KEY]);
            } else {
                proceedSelectedReports([], [SELECT_FOR_APPROVAL.TAB_KEY]);
                setSelectedReportsToProceed([]);
            }
        },
        getCheckboxProps: record => ({
            disabled: record.reportStatus !== ReportStatus.SELECT_FOR_APPROVAL
        }),
        selectedRowKeys: selectedReportsToProceed
    };
    return (
        <>
            <Spin
                spinning={
                    getStepData_inProgress ||
                    updateStepData_inProgress ||
                    downloadReport_inProgress ||
                    uploadReport_inProgress ||
                    uploadUrl_inProgress
                }
            >
                <BaseTableComponent
                    tableKey={'select-approval'}
                    columns={SelectApprovalColumns}
                    dataSource={selectApprovalDataSource}
                    rowSelection={selectApprovalRowHandler}
                    description="No Schemes"
                />

                {selectedReport && (
                    <>
                        <ViewModal
                            visible={viewModalVisible}
                            onClose={() => {
                                onCloseVisibleModal(setViewModalVisible, { setViewUrl: setSelectedViewUrl });
                            }}
                            report={selectedReport}
                            url={selectedViewUrl}
                            approvalStatus={selectedReport.status}
                            commentComponentVisibility={true}
                            comments={commentList}
                        />
                    </>
                )}

                {selectedReport && (
                    <>
                        <UploadModal
                            isDisabled={isDisabled}
                            visible={uploadModalVisible}
                            onClose={() => {
                                setDeleteUploadedFile(true);
                                onCloseVisibleModal(setUploadModalVisible);
                            }}
                            onProceed={handleUploadFile}
                            schemeData={getUploadData(selectedReport)}
                            setDeleteFile={setDeleteFile}
                            setIsDisabled={setIsDisabled}
                            setUploadedFile={setUploadedFile}
                            setDeleteUploadedFile={setDeleteUploadedFile}
                            deleteUploadedFile={deleteUploadedFile}
                            deleteFile={deleteFile}
                        />{' '}
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
            </Spin>
        </>
    );
};

const mapStateToProps = createStructuredSelector({
    upload_url: getUploadUrl(),
    uploadUrl_error: getUploadUrl_error(),

    uploadUrl_inProgress: getReportUploadUrl_inProgress()
});

const mapDispatchToProps = dispatch => ({
    getUploadReportUrl: data => dispatch(getUploadReportUrl(data))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SelectApprovalContainer);
