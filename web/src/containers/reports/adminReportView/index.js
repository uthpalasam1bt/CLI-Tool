import React, { useState } from 'react';
import { Tabs } from 'antd';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { history } from '../../../redux/store';

import GenerateReportContainer from './tabs/generateReportTab';
import UploadReportContainer from './tabs/uploadReportTab';
import SelectApprovalContainer from './tabs/selectForApprovalTab';
import PendingApprovalContainer from './tabs/pendingApprovalTab';
import PendingPublishingContainer from './tabs/pendingPublishingTab';
import PublishedContainer from './tabs/publishedTab';
import { ReportTypes } from '../utility';
import PublishModal from '../components/modals/PublishModal';
import ConcurrencyApproveModal from '../components/modals/ConcurrencyApproveModal';
import GenerateReportModal from '../components/modals/GenerateReportModal';

import { generateReportError, generateReportSuccess, generateReport_inProgress, getAdminReportTypes, getReportTypes_inProgress } from './selectors';
import { downloadReportProgress, uploadReportProgress } from '../selectors';
import { generateReport, getReportTypes } from './action';

import NotificationHelper from '../../../helpers/NotificationHelper';
import { listenToReportWorkflowSatusChange, unsubscribeReportWorkflowChangeListener } from '../reportWorkflowHelper';

import { RA_NOTIFY_REPORT, RA_PROCEED, RA_PUBLISH, RA_REPORT_DELETE, RA_REPORT_UPLOAD } from '../constants/commonConstatnt';
import { StepAction_Success_Msgs, TABS } from '../constants/adminReportViewConstant';

const { TabPane } = Tabs;
const { GENERATE_REPORTS, UPLOAD, SELECT_FOR_APPROVAL, PENDING_APPROVAL, PENDING_PUBLISHING, PUBLISHED } = TABS;

const AdminReportView = props => {
    const {
        urlParams,
        getReportTypes,
        updateStepAction,
        updatedStepData = {},
        session,
        getStepReportData,
        generateReport_inProgress,
        generateReportSuccess = {},
        generateReportError,
        generateReport,
        loggedUser,
        getStepData_inProgress
    } = props;

    const { reportName } = urlParams;

    const [activeTabKey, setActiveTabKey] = useState(null);
    const [progressButtonName, setProgressButtonName] = useState(GENERATE_REPORTS.BUTTON_NAME);
    const [title, setTitle] = useState(GENERATE_REPORTS.TITLE);
    const [selectedReportToContinue, setSelectedReportToContinue] = useState({});
    const [publisModalVisible, setPublishModalVisible] = useState(false);
    const [socketData, setSocketData] = useState(null);
    const [concurrencyModalVisibility, setConcurrencyModalVisibility] = useState(false);
    const [getConcurrentUploadData, setGetConcurrentUploadData] = useState(false);
    const [generateModalVisible,setGenerateModalVisible]=useState(false)

    useEffect(() => {
        getReportTypes();

        return () => {
            unsubscribeReportWorkflowChangeListener(activeTabKey);
        };
    }, []);

    useEffect(()=>{
        if (generateReportSuccess) {
            proceedSelectedReports([], [GENERATE_REPORTS.TAB_KEY]);
        }
    }, [JSON.stringify(generateReportSuccess)])


    useEffect(() => {
        if (updatedStepData && activeTabKey) {
            proceedSelectedReports([], [activeTabKey]);
        }
    }, [JSON.stringify(updatedStepData)]);


    useEffect(() => {
        if (reportName) {
            setActiveTabKey(reportName);
        } else {
            setActiveTabKey(GENERATE_REPORTS.TAB_KEY);
        }
    }, [reportName]);

    useEffect(() => {
        if (activeTabKey) {
            handleTabChange(activeTabKey);

            // begin socket for concurrent update
            listenToReportWorkflowSatusChange(activeTabKey, data => {
                if (data && (!socketData || (socketData && JSON.stringify(socketData) !== JSON.stringify(data)))) setSocketData({ ...data });
            });

            history.push(`/reports/${activeTabKey}`);
        }
    }, [activeTabKey]);

    useEffect(() => {
        if (socketData) {
            console.log({ socketData });

            handleSocketEffect(socketData);
        }
    }, [socketData]);

    const handleTabChange = activeTabKey => {

        let activeKey = activeTabKey ? activeTabKey : GENERATE_REPORTS.TAB_KEY;
        let buttonName = '';
        let title = '';

        if (generateReport_inProgress || getStepData_inProgress) return;

        switch (activeKey) {
            case UPLOAD.TAB_KEY:
                buttonName = UPLOAD.BUTTON_NAME;
                title = UPLOAD.TITLE;
                break;
            case SELECT_FOR_APPROVAL.TAB_KEY:
                buttonName = SELECT_FOR_APPROVAL.BUTTON_NAME;
                title = SELECT_FOR_APPROVAL.TITLE;
                break;
            case PENDING_APPROVAL.TAB_KEY:
                buttonName = PENDING_APPROVAL.BUTTON_NAME;
                title = PENDING_APPROVAL.TITLE;
                break;
            case PENDING_PUBLISHING.TAB_KEY:
                buttonName = PENDING_PUBLISHING.BUTTON_NAME;
                title = PENDING_PUBLISHING.TITLE;
                break;
            case PUBLISHED.TAB_KEY:
                title = PUBLISHED.TITLE;
                break;
            case GENERATE_REPORTS.TAB_KEY:
            default:
                buttonName = GENERATE_REPORTS.BUTTON_NAME;
                title = GENERATE_REPORTS.TITLE;
                break;
        }
        setProgressButtonName(buttonName);
        setTitle(title);
        setActiveTabKey(activeKey);
    };

    const handleSocketEffect = socketData => {
        if (!socketData.payload) return;
        if (socketData.payload) {
            const { tabId, sessionId, nextTabId, previousTabId } = socketData.payload;

            if (session === sessionId) return;

            if (tabId === activeTabKey && activeTabKey !== GENERATE_REPORTS.TAB_KEY) {
                setConcurrencyModalVisibility(true);
            }

            if (nextTabId && nextTabId === activeTabKey && activeTabKey !== GENERATE_REPORTS.TAB_KEY) {
                setConcurrencyModalVisibility(true);
            }

            if (previousTabId && previousTabId === activeTabKey && activeTabKey !== GENERATE_REPORTS.TAB_KEY) {
                setConcurrencyModalVisibility(true);
            }
        }
    };

    const proceedSelectedReports = (data, specifyTab = [], from) => {
        if (specifyTab.length) {
            const newObj = {};
            specifyTab.map((tab) => {
                newObj[tab] = data;
            });
            setSelectedReportToContinue({ ...selectedReportToContinue, ...newObj });
        } else if (activeTabKey) {
            setSelectedReportToContinue({ ...selectedReportToContinue, [activeTabKey]: data });
        }
    };

    const isProceedButtonDisabled = () => {
        let isDisabled = false;
        let reports = false;

        if (selectedReportToContinue && selectedReportToContinue[activeTabKey] && selectedReportToContinue[activeTabKey].length) {

            reports = selectedReportToContinue[activeTabKey].find(report => report.tab === activeTabKey);

            switch (activeTabKey) {
                case GENERATE_REPORTS.TAB_KEY:

                    if (reports) {
                        isDisabled = true;
                    } else {
                        isDisabled = false;
                    }
                    break

                case UPLOAD.TAB_KEY:
                    if (reports) {
                        isDisabled = true;
                    } else {
                        isDisabled = false;
                    }
                    break
                case SELECT_FOR_APPROVAL.TAB_KEY:
                    if (reports) {
                        isDisabled = true;
                    } else {
                        isDisabled = false;
                    }

                    break;
                case PENDING_APPROVAL.TAB_KEY:
                    if (reports) {
                        isDisabled = true;
                    } else {
                        isDisabled = false;
                    }

                    break;
                case PENDING_PUBLISHING.TAB_KEY:
                    if (reports) {
                        isDisabled = true;
                    } else {
                        isDisabled = false;
                    }

                    break;
                default:
                    isDisabled = false;
                    break;
            }
        }
        return !isDisabled;
    };

    const updateProceedAction = (selectedReportToContinue, tabKey, action, cb) => {
        let slectedReportIds = [];
        if (tabKey !== PENDING_APPROVAL.TAB_KEY && selectedReportToContinue[tabKey]) {
            selectedReportToContinue[tabKey].map(report => {
                if (report.tab === tabKey) {
                    slectedReportIds.push({ reportId: report.ReportId });
                }
            });
        } else if (tabKey === PENDING_APPROVAL.TAB_KEY && selectedReportToContinue[tabKey]) {
            slectedReportIds = selectedReportToContinue[tabKey];
        }

        updateStepAction({
            action: action ? action : RA_PROCEED,
            tabId: tabKey,
            data: slectedReportIds,
            cb: cb ? cb : null
        });

    };

    const onClickProceedAction = tabKey => {
        switch (tabKey) {
            case GENERATE_REPORTS.TAB_KEY:
                if (selectedReportToContinue && selectedReportToContinue[tabKey] && selectedReportToContinue[tabKey].length) {
                    if (selectedReportToContinue[tabKey][0].ReportType === ReportTypes.QUARTER) {
                        setGenerateModalVisible(true)
                    }else{
                        const schemeData = selectedReportToContinue[tabKey].map(sch => ({ schemeId: sch.schemeId, docName: sch.docName }))
                        const data={
                            userId: loggedUser.userId,
                            startDate: selectedReportToContinue[tabKey][0].startDate,
                            schemeData: schemeData,
                            endDate: selectedReportToContinue[tabKey][0].endDate,
                            reportType: selectedReportToContinue[tabKey][0].ReportType,
                            sessionId:session,
                            tabId:GENERATE_REPORTS.TAB_KEY
                        }
                        generateReport({data})
                    }


                }
                break;
            case UPLOAD.TAB_KEY:
                if (selectedReportToContinue && selectedReportToContinue[tabKey] && selectedReportToContinue[tabKey].length) {
                    updateProceedAction(selectedReportToContinue, tabKey, null, () => {
                        NotificationHelper.getInstance().success(StepAction_Success_Msgs.UPLOAD);
                    });
                }
                break;
            case SELECT_FOR_APPROVAL.TAB_KEY:
                if (selectedReportToContinue && selectedReportToContinue[tabKey] && selectedReportToContinue[tabKey].length) {
                    updateProceedAction(selectedReportToContinue, tabKey, null, () => {
                        NotificationHelper.getInstance().success(StepAction_Success_Msgs.SELECT_FOR_APPROVAL);
                    });
                }

                break;
            case PENDING_APPROVAL.TAB_KEY:
                if (selectedReportToContinue && selectedReportToContinue[tabKey] && selectedReportToContinue[tabKey].length) {
                    let data = [];
                    selectedReportToContinue[tabKey].map(report => {
                        data.push({
                            reportId: report.reportId,
                            assignedTo: {
                                senderEmail:
                                    report.assignedTo &&
                                    report.assignedTo.length &&
                                    report.assignedTo[0] &&
                                    report.assignedTo[0].newAssignee.senderEmail
                            }
                        });
                    });
                    if (data.length) {
                        selectedReportToContinue[tabKey] = data;
                        updateProceedAction(selectedReportToContinue, tabKey, RA_NOTIFY_REPORT, () => {
                            NotificationHelper.getInstance().success(StepAction_Success_Msgs.PENDING_APPROVAL);
                        });
                    }
                }

                break;
            case PENDING_PUBLISHING.TAB_KEY:
                if (selectedReportToContinue && selectedReportToContinue[tabKey] && selectedReportToContinue[tabKey].length) {
                    setPublishModalVisible(true);
                }

                break;
            default:
                break;
        }
    };

    const onClose = () => {
        setPublishModalVisible(false);
    };

    const handlePublishReportProceed = () => {
        onClose();
        updateProceedAction(selectedReportToContinue, PENDING_PUBLISHING.TAB_KEY, RA_PUBLISH, () => {
            NotificationHelper.getInstance().success(StepAction_Success_Msgs.PENDING_PUBLISHING);
        });
    };

    const handleGenerateProcced = () => {
        setGenerateModalVisible(false);
        if (selectedReportToContinue && selectedReportToContinue[GENERATE_REPORTS.TAB_KEY] && selectedReportToContinue[GENERATE_REPORTS.TAB_KEY].length) {
            const schemeData = selectedReportToContinue[GENERATE_REPORTS.TAB_KEY].map(sch => ({ schemeId: sch.schemeId, docName: sch.docName }))
            const data={
                userId: loggedUser.userId,
                startDate: selectedReportToContinue[GENERATE_REPORTS.TAB_KEY][0].startDate,
                schemeData: schemeData,
                endDate: selectedReportToContinue[GENERATE_REPORTS.TAB_KEY][0].endDate,
                reportType: selectedReportToContinue[GENERATE_REPORTS.TAB_KEY][0].ReportType,
                sessionId:session,
                tabId: GENERATE_REPORTS.TAB_KEY
            }
            generateReport({data})
        }

    };

    const handleConcurrencyUpdate = () => {
        setConcurrencyModalVisibility(false);

        if (activeTabKey && socketData && socketData.payload) {
            if (
                activeTabKey === UPLOAD.TAB_KEY &&
                (socketData.payload.socketAction === RA_PROCEED || socketData.payload.socketAction === RA_REPORT_DELETE||socketData.payload.socketAction === RA_REPORT_UPLOAD)
            ) {
                setGetConcurrentUploadData(true);
            } else {
                if (socketData.payload.nextTabId === activeTabKey && activeTabKey !== GENERATE_REPORTS.TAB_KEY) {
                    getStepReportData(socketData.payload.nextTabId);
                }
                if (socketData.payload.previousTabId === activeTabKey && activeTabKey !== GENERATE_REPORTS.TAB_KEY) {
                    getStepReportData(socketData.payload.previousTabId);
                }
             if(socketData.payload.tabId === activeTabKey && activeTabKey!==GENERATE_REPORTS.TAB_KEY){
                getStepReportData(activeTabKey);

             }



            }
        }
    };

    return (
        <div className="card">
            <div className="card-header">
                <div className="heading-row">
                    <div className="pull-left div-left">
                        <h4 className="title">{title}</h4>
                    </div>
                    {activeTabKey !== PUBLISHED.TAB_KEY && (
                        <div className="pull-right text-right div-right">
                            <button
                                className="tpip-btn-blue regular btn-generate"
                                disabled={isProceedButtonDisabled() || (generateReport_inProgress && [GENERATE_REPORTS.TAB_KEY].includes(activeTabKey))}
                                onClick={() => onClickProceedAction(activeTabKey)} //TODO
                            >
                                {progressButtonName}
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className="card-content">
                <div className="tab-content">
                    <Tabs type="card" className="report-tab" activeKey={activeTabKey} onChange={handleTabChange}>
                        <TabPane
                            className="report-tab-content generate-tab-content"
                            tab={GENERATE_REPORTS.TAB_NAME}
                            key={GENERATE_REPORTS.TAB_KEY}
                            forceRender={true}
                            disabled={generateReport_inProgress || getStepData_inProgress}
                        >
                            <GenerateReportContainer
                                {...props}
                                tabId={GENERATE_REPORTS.TAB_KEY}
                                concurrencyModalVisibility={concurrencyModalVisibility}
                                proceedSelectedReports={proceedSelectedReports}
                                socketData={socketData}
                                getConcurrentUploadData={getConcurrentUploadData}
                                setGetConcurrentUploadData={setGetConcurrentUploadData}
                                setConcurrencyModalVisibility={setConcurrencyModalVisibility}
                                generateReportError={generateReportError}
                                generateReportSuccess={generateReportSuccess}
                                generateReport_inProgress={generateReport_inProgress}
                                setSocketData={setSocketData}
                                session={session}


                            />
                        </TabPane>
                        <TabPane tab={UPLOAD.TAB_NAME} key={UPLOAD.TAB_KEY} disabled={generateReport_inProgress || getStepData_inProgress} >
                            <UploadReportContainer
                                {...props}
                                tabId={UPLOAD.TAB_KEY}
                                proceedSelectedReports={proceedSelectedReports}
                                concurrencyModalVisibility={concurrencyModalVisibility}
                                socketData={socketData}
                                getConcurrentUploadData={getConcurrentUploadData}
                                setGetConcurrentUploadData={setGetConcurrentUploadData}
                                setConcurrencyModalVisibility={setConcurrencyModalVisibility}
                                loggedUser={loggedUser}
                            />
                        </TabPane>
                        <TabPane tab={SELECT_FOR_APPROVAL.TAB_NAME} key={SELECT_FOR_APPROVAL.TAB_KEY} disabled={generateReport_inProgress || getStepData_inProgress} >
                            <SelectApprovalContainer
                                {...props}
                                tabId={SELECT_FOR_APPROVAL.TAB_KEY}
                                proceedSelectedReports={proceedSelectedReports}
                                concurrencyModalVisibility={concurrencyModalVisibility}
                                socketData={socketData}
                                setConcurrencyModalVisibility={setConcurrencyModalVisibility}
                            />
                        </TabPane>
                        <TabPane tab={PENDING_APPROVAL.TAB_NAME} key={PENDING_APPROVAL.TAB_KEY} disabled={generateReport_inProgress || getStepData_inProgress} >
                            <PendingApprovalContainer
                                {...props}
                                tabId={PENDING_APPROVAL.TAB_KEY}
                                proceedSelectedReports={proceedSelectedReports}
                                concurrencyModalVisibility={concurrencyModalVisibility}
                                socketData={socketData}
                                setConcurrencyModalVisibility={setConcurrencyModalVisibility}
                            />
                        </TabPane>
                        <TabPane tab={PENDING_PUBLISHING.TAB_NAME} key={PENDING_PUBLISHING.TAB_KEY} disabled={generateReport_inProgress || getStepData_inProgress} >
                            <PendingPublishingContainer
                                {...props}
                                tabId={PENDING_PUBLISHING.TAB_KEY}
                                proceedSelectedReports={proceedSelectedReports}
                                concurrencyModalVisibility={concurrencyModalVisibility}
                                socketData={socketData}
                                setConcurrencyModalVisibility={setConcurrencyModalVisibility}
                            />
                        </TabPane>
                        <TabPane tab={PUBLISHED.TAB_NAME} key={PUBLISHED.TAB_KEY} disabled={generateReport_inProgress || getStepData_inProgress} >
                            <PublishedContainer
                                {...props}
                                tabId={PUBLISHED.TAB_KEY}
                                proceedSelectedReports={proceedSelectedReports}
                                concurrencyModalVisibility={concurrencyModalVisibility}
                                socketData={socketData}
                                setConcurrencyModalVisibility={setConcurrencyModalVisibility}
                            />
                        </TabPane>
                    </Tabs>
                </div>
            </div>

            <PublishModal
                visible={publisModalVisible}
                onClose={() => onClose()}
                onCancel={() => onClose()}
                onProceed={() => handlePublishReportProceed()}
                concurrencyModalVisibility={concurrencyModalVisibility}

            />
            <GenerateReportModal
                  visible={generateModalVisible}
                  onClose={() => {setGenerateModalVisible(false)}}
                  onProceed={() => handleGenerateProcced()}
                  concurrencyModalVisibility={concurrencyModalVisibility}

            />

            <ConcurrencyApproveModal visible={concurrencyModalVisibility} onProceed={handleConcurrencyUpdate} />
        </div>
    );
};
const mapStateToProps = createStructuredSelector({
    getReportType_inProgress: getReportTypes_inProgress(),
    report_types: getAdminReportTypes(),
    uploadReport_inProgress: uploadReportProgress(),
    downloadReport_inProgress: downloadReportProgress(),
    generateReport_inProgress:generateReport_inProgress(),
    generateReportSuccess:generateReportSuccess(),
    generateReportError:generateReportError()

});

const mapDispatchToProps = dispatch => ({
    getReportTypes: () => dispatch(getReportTypes()),
    generateReport:(data)=>dispatch(generateReport(data))
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminReportView);
