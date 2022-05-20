import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';

import {
    downloadReport,
    handleReportName,
    handleReportStatus,
    handleVisibleModal,
    onCloseVisibleModal,
    ReportStatus
} from '../utility';
import TableActions from '../reportTable/ModalOptions';
import { tableColumns } from '../reportTable/columns';
import ViewModal from '../components/modals/ViewModal';
import BaseTableComponent from '../reportTable/BaseTableComponent';

import { downloadReportProgress, uploadReportProgress } from '../selectors';

import { TableHandlers } from '../constants/commonConstatnt';

const ClientReportView = props => {
    const {
        getStepData_inProgress,
        getStepData,
        getStepData_error,
        getStepReportData,
        downloadReport_inProgress
    } = props;

    const [publishedDataSource, setPublishedDataSource] = useState([]);

    const [selectedReport, setSelectedReport] = useState(null);
    const [selectedViewUrl, setSelectedViewUrl] = useState(null);
    const [viewModalVisible, setViewModalVisible] = useState(false);
    const [commentList, setCommentList] = useState(null);
    useEffect(() => {
        if (getStepReportData) {
            getStepReportData('publish');
        }
    }, []);

    useEffect(() => {
        if (getStepData_inProgress || getStepData_error) {
            setPublishedDataSource([]);
        }
        if (getStepData && getStepData.length) {
            let schemesDataSource = [];

            schemesDataSource = getStepData
                .sort((schm1, schm2) => {
                    return moment(schm1.updatedAt).diff(moment(schm2.updatedAt));
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
                            reportType: handleReportName(scheme.reportType),
                            ReportType: scheme.reportType,
                            modifiedDate: scheme.updatedAt,
                            reportStatus: scheme.reportStatus,
                            status: handleReportStatus(scheme.reportStatus),
                            reportSource: scheme.reportSource,
                            uploadPath: scheme.reportUpload && scheme.reportUpload.path,
                            assigneeId: scheme.assigneTo,
                            approvedDate: scheme.updatedAt,
                            publishedDate: scheme.updatedAt,
                            approvedBy: scheme.approver && scheme.approver.length > 0 && scheme.approver[0].approvedBy
                        };
                    }
                });

            if (schemesDataSource.length > 0) {
                let dataSource = schemesDataSource.filter(r => r !== undefined);
                dataSource && dataSource.length > 0
                    ? setPublishedDataSource([...dataSource])
                    : setPublishedDataSource([]);
            }

            // schemesDataSource.length>0? setPublishedDataSource([...schemesDataSource]):setPublishedDataSource([]);
        } else {
            setPublishedDataSource([]);
        }
    }, [getStepData]);

    const publishedColumns = [
        {
            ...tableColumns.schemeNameColumn({ clientReportView: true })
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
            ...tableColumns.reportTypeColumn({ clientReportView: true })
        },

        {
            key: 'action',
            title: '',
            dataIndex: '',
            render: key => {
                if (selectedReport && selectedReport.ReportId === key.ReportId) {
                    if (key.comments && key.comments.length) {
                        setCommentList(key.comments);
                    } else {
                        setCommentList(null);
                    }
                }
                return (
                    <TableActions
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
        <div className="card">
            <div className="card-header">
                <div className="heading-row">
                    <div className="pull-left div-left">
                        <h4 className="title">Performance Reports</h4>
                    </div>
                </div>
            </div>
            <Spin spinning={getStepData_inProgress || downloadReport_inProgress}>
                <div className="card-content">
                    <div className="custom-row table-row">
                        <>
                            <BaseTableComponent
                                tableKey={'client-published'}
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
                                            onCloseVisibleModal(setViewModalVisible, {
                                                setViewUrl: setSelectedViewUrl
                                            });
                                        }}
                                        report={selectedReport}
                                        url={selectedViewUrl}
                                        approvalStatus={selectedReport.status}
                                        commentComponentVisibility={true}
                                        comments={commentList}
                                    />
                                </>
                            )}
                        </>
                    </div>
                </div>
            </Spin>
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    uploadReport_inProgress: uploadReportProgress(),
    downloadReport_inProgress: downloadReportProgress()
});

export default connect(
    mapStateToProps,
    null
)(ClientReportView);
