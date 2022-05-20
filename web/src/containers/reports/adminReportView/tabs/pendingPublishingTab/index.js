import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import moment from 'moment';

import BaseTableComponent from '../../../reportTable/BaseTableComponent';
import { tableColumns } from '../../../reportTable/columns';
import TableActions from '../../../reportTable/ModalOptions';
import ViewModal from '../../../components/modals/ViewModal';

import {
    downloadReport,
    handleReportName,
    handleReportStatus,
    handleVisibleModal,
    onCloseVisibleModal,
    OUT_TIME_FORMAT,
    ReportStatus,
    SORTING_TIME_FORMAT,
    TIME_FORMAT
} from '../../../utility';

import { TableHandlers } from '../../../constants/commonConstatnt';
import { TABS } from '../../../constants/adminReportViewConstant';
const { PENDING_PUBLISHING } = TABS;
const PendingPublishingContainer = props => {
    const {
        tabId,
        updateStepData_inProgress,
        updatedStepData,
        getStepData_inProgress,
        getStepData,
        getStepData_error,
        getStepReportData,
        proceedSelectedReports,
        urlParams,
        downloadReport_inProgress
    } = props;

    const { reportName } = urlParams;

    const [pendingPublishingDataSource, setPendingPublishingDataSource] = useState([]);
    const [selectedReport, setSelectedReport] = useState(null);
    const [selectedViewUrl, setSelectedViewUrl] = useState(null);

    const [viewModalVisible, setViewModalVisible] = useState(false);
    const [commentList, setCommentList] = useState(null);

    useEffect(() => {
        const { reportName } = urlParams;
        if (!viewModalVisible && !getStepData_inProgress && getStepReportData && tabId && reportName === tabId) {
            getStepReportData(tabId);
        }
    }, [urlParams]);

    useEffect(() => {
        if (!getStepData_inProgress && updatedStepData && reportName === tabId) {
            getStepReportData(tabId);
        }
    }, [updatedStepData]);

    useEffect(() => {
        if (!viewModalVisible && reportName === tabId) {
            if (getStepData_inProgress || getStepData_error) {
                setPendingPublishingDataSource([]);
            } else if (getStepData && getStepData.length) {
                let schemesDataSource = [];

                schemesDataSource = getStepData
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
                        if (scheme.reportStatus === ReportStatus.PENDING_PUBLISH) {
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
                                assigneeId:
                                    scheme.assignedTo && scheme.assignedTo.length && scheme.assignedTo[0].newAssignee,
                                approvedDate: scheme.updatedAt,
                                approvedBy:
                                    scheme.approver && scheme.approver.length > 0 && scheme.approver[0].approvedBy,
                                comments:
                                    scheme.comments && scheme.comments.commentThread.comments
                                        ? scheme.comments.commentThread.comments
                                        : []
                            };
                        }
                    });

                if (schemesDataSource.length > 0) {
                    let dataSource = schemesDataSource.filter(r => r !== undefined);
                    dataSource && dataSource.length > 0
                        ? setPendingPublishingDataSource([...dataSource])
                        : setPendingPublishingDataSource([]);
                }
            } else {
                setPendingPublishingDataSource([]);
            }
        }
    }, [getStepData]);

    const pendingPublishingColumns = [
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
            key: 'approvedDate',
            title: 'Approved Date',
            dataIndex: 'approvedDate',

            sorter: (schemeReportPrev, schemeReportNext, sortOrder) => {
                const next = schemeReportNext.approveDate || '';
                const prev = schemeReportPrev.approveDate || '';
                return next.localeCompare(prev);
            },
            render: text =>
                text ? <span>{moment(text, OUT_TIME_FORMAT).format(TIME_FORMAT)}</span> : <span> N/A </span>
        },
        {
            ...tableColumns.reportTypeColumn()
        },
        {
            ...tableColumns.approvedByColumn()
        },
        {
            key: 'action',
            title: '',
            dataIndex: '',
            render: key => {
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
                        visibleView={key.reportStatus === ReportStatus.PENDING_PUBLISH}
                        visibleDownload={key.reportStatus === ReportStatus.PENDING_PUBLISH}
                        onView={() => {
                            onClickActionHandler(TableHandlers.VIEW, key);
                        }}
                        onDownload={() => {
                            onClickActionHandler(TableHandlers.DOWNLOAD, key);
                        }}
                    />
                );
            }
        }
    ];

    const onClickActionHandler = (type, schemeData) => {
        if (schemeData) {
            setSelectedReport(schemeData);
            setSelectedViewUrl(schemeData.url);
        } else {
            setSelectedReport(null);
            setSelectedViewUrl(null);
        }

        switch (type) {
            case TableHandlers.VIEW:
                handleVisibleModal(viewModalVisible, setViewModalVisible);
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

    const pendingPublishingRowHandler = {
        onChange: (selectedRowKeys, selectedRows) => {
            if (selectedRows.length > 0) {
                // setSelectedReportsToProceed([...selectedRows]);
                proceedSelectedReports(selectedRows, [PENDING_PUBLISHING.TAB_KEY]);
            } else {
                proceedSelectedReports([], [PENDING_PUBLISHING.TAB_KEY]);
                // setSelectedReportsToProceed([]);
            }
        },
        getCheckboxProps: record => ({
            disabled: record.reportStatus !== ReportStatus.PENDING_PUBLISH
        })
    };
    return (
        <>
            <Spin spinning={getStepData_inProgress || updateStepData_inProgress || downloadReport_inProgress}>
                <BaseTableComponent
                    tableKey={'pending-publishing'}
                    columns={pendingPublishingColumns}
                    dataSource={pendingPublishingDataSource}
                    rowSelection={pendingPublishingRowHandler}
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
            </Spin>
        </>
    );
};

export default PendingPublishingContainer;
