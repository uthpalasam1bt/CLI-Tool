import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Icon, Spin, Tooltip } from 'antd';

import BaseTableComponent from '../../../reportTable/BaseTableComponent';
import { tableColumns, handleSearch, handleReset, handleChange } from '../../../reportTable/columns';

import SearchTextInput from '../../../reportTable/SearchTextInput';
import UserAssignComponent from '../../../../../components/userAssign';
import ApproveRejectModal from '../../../components/modals/ApproveRejectModal';
import TableActions from '../../../reportTable/ModalOptions';
import DeleteModal from '../../../components/modals/DeleteModal';

import {
    downloadReport,
    handleReportName,
    handleReportStatus,
    handleVisibleModal,
    onCloseVisibleModal,
    OUT_TIME_FORMAT,
    ReportStatus,
    SORTING_TIME_FORMAT
} from '../../../utility';

import NotificationHelper from '../../../../../helpers/NotificationHelper';

import {
    RA_COMMENT,
    RA_DATA_CHANGE,
    RA_REPORT_AUTHORIZE,
    RA_REPORT_DELETE,
    TableHandlers
} from '../../../constants/commonConstatnt';
import { TABS } from '../../../constants/adminReportViewConstant';
const { PENDING_APPROVAL } = TABS;

const PendingApprovalContainer = props => {
    const {
        getStepData_inProgress,
        getStepData,
        getStepData_error,
        getStepReportData,
        proceedSelectedReports,
        updatedStepData,
        tabId,
        updateStepAction,
        updateStepData_inProgress,
        urlParams,
        loggedUser,
        downloadReport_inProgress
    } = props;

    const { reportName } = urlParams;
    const [pendingApprovalDataSource, setPendingApprovalDataSource] = useState([]);
    const [assigneeList, setAssigneeList] = useState([]);

    const [approveRejectModalVisibile, setApproveRejectModalVisible] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);
    const [selectedViewUrl, setSelectedViewUrl] = useState(null);

    const [deleteModalVisible, setDeleteModalVisible] = useState(false);

    const [reportStatus, setReportStatus] = useState(null);
    const [commentList, setCommentList] = useState(null);

    useEffect(() => {
        const { reportName } = urlParams;
        if (tabId && !getStepData_inProgress && getStepReportData && reportName === tabId) {
            getStepReportData(tabId);
        }
    }, [getStepReportData, tabId, urlParams]);

    useEffect(() => {
        if (!getStepData_inProgress && updatedStepData && reportName === tabId) {
            getStepReportData(tabId);
        }
    }, [updatedStepData]);

    useEffect(() => {
        if (reportName === tabId) {
            if (getStepData_inProgress || getStepData_error) {
                setPendingApprovalDataSource([]);
                setAssigneeList([]);
            } else if (getStepData && getStepData.length) {
                let schemesDataSource = [];
                let notifyAssignees = [];
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
                        if (scheme.reportStatus === ReportStatus.PENDING_APPROVAL) {
                            if (
                                scheme &&
                                scheme.assignedTo &&
                                scheme.assignedTo.length &&
                                scheme.assignedTo[0].newAssignee &&
                                !scheme.assignedTo[0].newAssignee.sentNotification
                            ) {
                                scheme.tab = tabId;
                                notifyAssignees.push(scheme);
                            }

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
                                approvers: scheme.selectedApprovers,
                                assigneeId:
                                    scheme.assignedTo && scheme.assignedTo.length && scheme.assignedTo[0].newAssignee,
                                comments:
                                    scheme.comments && scheme.comments.commentThread.comments
                                        ? scheme.comments.commentThread.comments
                                        : [],
                                commentThreadId: scheme.comments && scheme.comments.commentThread.threadId
                            };
                        }
                    });

                let approvers = getStepData
                    .filter(
                        reports => reports.selectedApprovers && reports.reportStatus === ReportStatus.PENDING_APPROVAL
                    )
                    .map(approver => approver.selectedApprovers);
                let arr = [];
                if (approvers && approvers.length) {
                    for (const approver of approvers) {
                        if (approver && approver.length) {
                            arr = [
                                ...approver.map(obj => {
                                    return {
                                        value: obj.userId,
                                        text: `${obj.firstName} ${obj.lastName}`,
                                        FiratName: obj.firstName,
                                        LastName: obj.lastName,
                                        email: obj.email,
                                        UserId: obj.userId
                                    };
                                })
                            ];
                        }
                    }
                }
                if (arr.length) {
                    setAssigneeList([...arr]);
                }
                if (schemesDataSource.length > 0) {
                    let dataSource = schemesDataSource.filter(r => r !== undefined);
                    dataSource && dataSource.length > 0
                        ? setPendingApprovalDataSource([...dataSource])
                        : setPendingApprovalDataSource([]);
                }

                if (notifyAssignees.length) {
                    proceedSelectedReports(notifyAssignees, [PENDING_APPROVAL.TAB_KEY]);
                }
            } else {
                setPendingApprovalDataSource([]);
            }
        }
    }, [
        getStepData,
        selectedReport
    ]);

    const assigneeSelected = (assigned, record) => {
        if (assigned && record && record.approvers && record.approvers.length) {
            let assignee = record.approvers.find(approver => approver.userId === assigned);

            if (assignee) {
                let data = [
                    {
                        reportId: record.ReportId,
                        assignedTo: {
                            senderEmail: assignee.email
                        }
                    }
                ];
                updateStepAction({
                    action: RA_DATA_CHANGE,
                    tabId,
                    data,
                    cb: () => {
                        NotificationHelper.getInstance().success('User assignment successful.');
                    }
                });
            }
        }
    };

    const pendingApprovalColumns = [
        {
            ...tableColumns.schemeNameColumn({ pendingApprovalTab: true })
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
            key: 'assigneeId',
            title: 'Assign to',
            dataIndex: 'assigneeId',
            render: (assigneeId, record, index) => {
                return (
                    assigneeList &&
                    assigneeList.length > 0 && (
                        <UserAssignComponent
                            report={true}
                            dataSource={assigneeList}
                            assineeEnabled={true}
                            isTextDisabled={true}
                            changeValue={assignee => {
                                assigneeSelected(assignee, record);
                                setSelectedReport(record);
                            }}
                            submitValue={assignee => {}}
                            assignUserValue={assigneeId && `${assigneeId.firstName} ${assigneeId.lastName}`}
                        />
                    )
                );
            },
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <SearchTextInput
                    // concurrencyModalVisibility={!concurrencyModalVisibility}
                    placeholder="Search by Assignee name"
                    onReset={() => handleReset(setSelectedKeys, clearFilters)}
                    onSearch={searchText =>
                        handleSearch(setSelectedKeys, selectedKeys, confirm, 'assigneeId', searchText)
                    }
                    onChange={value => {
                        handleChange(value, setSelectedKeys, clearFilters);
                    }}
                />
            ),
            filterIcon: filtered => (
                <Tooltip placement="topLeft" visible={false}>
                    <Icon
                        type="search"
                        title="Search"
                        style={{ color: filtered ? '#1890ff' : undefined, left: '69px' }}
                    ></Icon>
                </Tooltip>
            ),
            onFilter: (value, record) => {
                let assignee;
                if (record.assigneeId) {
                    assignee = assigneeList.find(user => user.UserId === record.assigneeId.userId);
                }

                if (!assignee) return false;
                return `${assignee.text}`
                    .trim()
                    .toLowerCase()
                    .includes(
                        value
                            .toString()
                            .trim()
                            .toLowerCase()
                    );
            }
        },
        {
            key: 'approval',
            title: '',
            dataIndex: '',
            render: schemeData => (
                <button
                    className="tpip-btn-blue regular btn-generate btn-approval"
                    onClick={() => {
                        onClickActionHandler(TableHandlers.APPROVE_REJECT, schemeData);
                    }}
                >
                    Approval
                </button>
            )
        },

        {
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
                        visibleDelete={key.reportStatus === ReportStatus.PENDING_APPROVAL}
                        visibleDownload={key.reportStatus === ReportStatus.PENDING_APPROVAL}
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
    ];

    const onClickActionHandler = (type, schemeData) => {
        if (schemeData) {
            setSelectedReport(schemeData);
            setSelectedViewUrl(schemeData.url);
        }
        switch (type) {
            case TableHandlers.APPROVE_REJECT:
                handleVisibleModal(approveRejectModalVisibile, setApproveRejectModalVisible);
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

    const onApproveClicked = data => {
        if (selectedReport && loggedUser && data && data.status && data.approved) {
            setApproveRejectModalVisible(false);
            setSelectedViewUrl(null);
            let payload = {};
            if (data.comment) {
                payload = {
                    reportId: selectedReport.ReportId,
                    entityId: selectedReport.schemeId,
                    approver: {
                        users: [
                            {
                                userId: loggedUser.userId,
                                email: loggedUser.email,
                                userType: loggedUser.userType,
                                userRole: loggedUser.primaryRole,
                                imageUrl: loggedUser.imageUrl,
                                status: data.status ? data.status : 'A'
                            }
                        ]
                    },
                    commentThread: {
                        content: data.comment
                    }
                };
                if (selectedReport.commentThreadId) payload.commentThread.threadId = selectedReport.commentThreadId

            } else {
                payload = {
                        reportId: selectedReport.ReportId,
                        entityId: selectedReport.schemeId,
                        approver: {
                            users: [
                                {
                                    userId: loggedUser.userId,
                                    email: loggedUser.email,
                                    userType: loggedUser.userType,
                                    userRole: loggedUser.primaryRole,
                                    imageUrl: loggedUser.imageUrl,
                                    status: data.status ? data.status : 'A'
                                }
                            ]
                        },
                        commentThread: null
                    };
            }

            updateStepAction({
                action: RA_REPORT_AUTHORIZE,
                tabId,
                data: [payload],
                cb: () => {
                    NotificationHelper.getInstance().success(
                        "Approved. Report available in the 'Pending Publishing' tab."
                    );
                }
            });
        }
    };
    const onRejectClicked = data => {
        if (selectedReport && loggedUser && data && data.status && data.rejected) {
            if (data.comment !== '' && !data.comment) return;
            setApproveRejectModalVisible(false);
            setSelectedViewUrl(null);
            let payload = {};

            if (data.comment) {
                payload = {
                            reportId: selectedReport.ReportId,
                            entityId: selectedReport.schemeId,
                            approver: {
                                users: [
                                    {
                                        userId: loggedUser.userId,
                                        email: loggedUser.email,
                                        userType: loggedUser.userType,
                                        userRole: loggedUser.primaryRole,
                                        imageUrl: loggedUser.imageUrl,
                                        status: data.status ? data.status : 'R'
                                    }
                                ]
                            },
                            commentThread: {
                                content: data.comment
                            }
                        }
                if (selectedReport.commentThreadId) payload.commentThread.threadId = selectedReport.commentThreadId;

                updateStepAction({
                    action: RA_REPORT_AUTHORIZE,
                    tabId,
                    data: [payload],
                    cb: () => {
                        NotificationHelper.getInstance().success('Rejected.');
                    }
                });
            }
        }
    };

    const saveComment = comment => {
        let payload;

        if (comment && selectedReport) {
            if (selectedReport.commentThreadId) {
                payload = [
                    {
                        reportId: selectedReport.ReportId,
                        commentThread: {
                            content: comment,
                            threadId: selectedReport.commentThreadId
                        }
                    }
                ];
            } else {
                payload = [
                    {
                        reportId: selectedReport.ReportId,
                        commentThread: {
                            content: comment
                        }
                    }
                ];
            }

            updateStepAction({ action: RA_COMMENT, tabId, data: payload });
        }
    };
    return (
        <>
            <Spin spinning={getStepData_inProgress || updateStepData_inProgress || downloadReport_inProgress}>
                <BaseTableComponent
                    tableKey={'pending-approval'}
                    columns={pendingApprovalColumns}
                    dataSource={pendingApprovalDataSource}
                    description="No Schemes"
                />

                {selectedReport && selectedViewUrl && (
                    <ApproveRejectModal
                        visible={approveRejectModalVisibile}
                        onClose={() => {
                            onCloseVisibleModal(setApproveRejectModalVisible, { setViewUrl: setSelectedViewUrl });
                        }}
                        url={selectedViewUrl}
                        approvalStatus={selectedReport.status}
                        report={selectedReport}
                        commentComponentVisibility={true}
                        addCommentVisibility={true}
                        approveClaim={loggedUser}
                        onApproveClicked={onApproveClicked}
                        onRejectClicked={onRejectClicked}
                        saveComment={saveComment}
                        comments={commentList}
                    />
                )}

                {selectedReport && (
                    <DeleteModal
                        onClose={() => {
                            onCloseVisibleModal(setDeleteModalVisible);
                        }}
                        onProceed={handleDeleteReport}
                        visible={deleteModalVisible}
                    />
                )}
            </Spin>
        </>
    );
};

export default PendingApprovalContainer;
