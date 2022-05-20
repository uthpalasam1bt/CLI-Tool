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
    ReportStatus
} from '../../../utility';

import { TableHandlers } from '../../../constants/commonConstatnt';

const PublishedContainer = props => {
    const {
        tabId,
        getStepData_inProgress,
        getStepData,
        getStepData_error,
        getStepReportData,
        urlParams,
        downloadReport_inProgress
    } = props;

    const { reportName } = urlParams;

    const [publishedDataSource, setPublishedDataSource] = useState([]);

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
        if (!viewModalVisible && reportName === tabId) {
            if (getStepData_inProgress || getStepData_error) {
                setPublishedDataSource([]);
            } else if (getStepData && getStepData.length) {
                let schemesDataSource = [];

                schemesDataSource = getStepData
                .sort((schm1, schm2) => {
                    let prev = schm1.updatedAt
                    ? moment(schm1.updatedAt, OUT_TIME_FORMAT)
                    : moment(schm1.createdAt, OUT_TIME_FORMAT),
                  next = schm2.updatedAt
                    ? moment(schm2.updatedAt, OUT_TIME_FORMAT)
                    : moment(schm2.createdAt, OUT_TIME_FORMAT);
                return next.diff(prev);
                   
                })
                    .map(scheme => {
                        if (scheme.reportStatus === ReportStatus.PUBLISHED) {
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
                                publishedDate: scheme.updatedAt,
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
                        ? setPublishedDataSource([...dataSource])
                        : setPublishedDataSource([]);
                }
            } else {
                setPublishedDataSource([]);
            }
        }
    }, [getStepData]);

    const publishedColumns = [
        {
            ...tableColumns.schemeNameColumn({ publishedColumn: true })
        },
        {
            ...tableColumns.startDateColumn()
        },
        {
            ...tableColumns.endDateColumn()
        },
        {
            ...tableColumns.publishedDateColumn()
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
                        visibleView={key.reportStatus === ReportStatus.PUBLISHED}
                        visibleDownload={key.reportStatus === ReportStatus.PUBLISHED}
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

    return (
        <>
            <Spin spinning={getStepData_inProgress || downloadReport_inProgress}>
                <BaseTableComponent
                    tableKey={'published'}
                    tableClassName="table-wrap publish-table"
                    columns={publishedColumns}
                    dataSource={publishedDataSource}
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

export default PublishedContainer;
