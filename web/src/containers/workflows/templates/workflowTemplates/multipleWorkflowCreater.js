import React, { useEffect, useState, Suspense } from 'react';
import { connect } from 'react-redux';
import { Col, Row, Menu, Steps, Spin, Modal } from 'antd';
import _ from 'lodash';
import UUID from 'uuid/v1';

import Loading from '../../../../components/Loading';
import EmptyScreen from '../stepTemplates/emptyScreen';

import { multipleWorkflowStepMap, stepIcon } from './worker';
import ellipseIcon from '../../../../assets/images/threedots.svg';

import { getWorkFlows } from '../../actions/workflowActions';
import { getWorkflowStep_request, updateWorkflowStep_request } from '../../actions/stepDataActions';

import { workflows_data, get_workflows_inprogress, abortWorkflow_inProgress } from '../../selectors/workflowSelectors';
import {
    getWorkflowStep_data,
    getWorkflowStep_inProgress,
    updateWorkflowStep_inProgress,
    updateWorkflowStep_data,
    internal_stepAction_inProgress
} from '../../selectors/workflowStepSelectors';

import { listenToWorkflowSatusChange, unsubscribeWorkflowChangeListener } from '../../../../helpers/workflowHelper';
import { UserRole } from '../../../../constants/userConstants';
import wfConstants from '../../constants';
import AbortPopup from './components/AbortPopup';
import UserAssign from './components/UserAssign';
import { convertArtifacts } from '../../../../UILibrary/helpers/ArtifactConverter';
import { getPrimaryRole } from '../../../../helpers/validateUser';
import ClaimHelper from '../../../../helpers/claimHelper';
import { history } from '../../../../redux/store';

const {
    STEP_ACTION_DATA_CHANGE,
    STEP_ACTION_ACTIVATE,
    STEP_ACTION_COMMENT,
    STEP_ACTION_PROCEED,
    STEP_ACTION_DOC_UPLOAD,
    STEP_ACTION_SIGN,
    ABORT_WORKFLOW_ACTION,
    STEP_ACTION_TERMINATE_MANDATE,
    STEP_ACTION_ASSIGNEE,
    STEP_ACTION_UPLOD_PUBLISH,
    STEP_ACTION_AUTHORIZE,
    STEP_ACTION_AUTHORIZE_MULTICLIENT,
    STEP_ACTION_PUBLISH_MULTICLIENT,
    STEP_ACTION_PUBLISH,
    STEP_ACTION_UPDATE,
    STEP_ACTION_AUTHORIZE_MANDATE
} = wfConstants;

const { SubMenu } = Menu;
const session = UUID();
const MultipleWorkflowCreator = props => {
    const {
        workflows_data = {},
        get_workflows_inprogress,
        loggedUser,
        StepConfig,
        getWorkFlows,
        getWorkflowStep_request,
        updateWorkflowStep_request,
        getWorkflowStep_data,
        getWorkflowStep_inProgress,
        updateWorkflowStep_inProgress,
        updateWorkflowStep_data,
        getLoggedUserClaims_data,
        commonUserClaims,
        artifacts,
        abortWorkflow_inProgress,
        internal_stepAction_inProgress,
        fetchedWorkFlowTriggerFunction,
        schemeData,
        isMultiClient,
        workflowCreatorTitle = "Information updates"
    } = props;

    const { schemeClassification } = schemeData || {};

    const [activeWorkflow, setActiveWorkflow] = useState(null);
    const [activeWorkflowStep, setActiveWorkflowStep] = useState({
        workflow: null,
        step: null,
        index: -1
    });
    const [dataset, setDataset] = useState({});
    const [datasetVersion, setDatasetVersion] = useState(1);
    const [configuredWorkflowKeys, setConfiguredWorkflowKeys] = useState([]);
    const [socketData, setSocketData] = useState({});
    const [showAbortPopup, setShowAbortPopup] = useState(false);
    const [activeWorkflowList, setActiveWorkflowList] = useState([]);
    const [abortableSectionList, setAbortableSectionList] = useState([]);
    const [abortableWFList, setAbortableWFList] = useState([]);
    const [openWorkFlowsList, setOpenWorkFlowsList] = useState([]);
    const [clasification, setClasification] = useState("");
    const [temClearWorkflow, setTemClearWorkflow] = useState(false);
    const [entityId, setEntityId] = useState(props.entityId);

    useEffect(() => {
        getWorkFlows({ loggedUser, doFilter: true, entityId, isMultiClient });

        // begin socket for concurrent update
        listenToWorkflowSatusChange(entityId, data => {
            if (data) setSocketData({ ...data });
        });
    }, [0]);

    useEffect(() => {

        return () => {
            // terminate socket
            unsubscribeWorkflowChangeListener(entityId);
            Modal.destroyAll();
            setDataset({});
        };
    }, []);

    useEffect(() => {
        if (!isMultiClient && schemeClassification && schemeClassification !== clasification && get_workflows_inprogress) {
            setTemClearWorkflow(true);
            setClasification(schemeClassification)
        }
        if (!get_workflows_inprogress) {
            setTemClearWorkflow(get_workflows_inprogress);
        }
    }, [schemeClassification, get_workflows_inprogress, isMultiClient]);

    useEffect(() => {
        if (updateWorkflowStep_data && updateWorkflowStep_data.datasetMap) {
            setDataset(updateWorkflowStep_data.datasetMap);
            setDatasetVersion(updateWorkflowStep_data.datasetVersion);
        }
    }, [updateWorkflowStep_data]);

    useEffect(() => {
        if (getWorkflowStep_data && getWorkflowStep_data.data) {
            setDataset(getWorkflowStep_data.data);
            setDatasetVersion(getWorkflowStep_data.datasetVersion);
        }
    }, [getWorkflowStep_data]);

    useEffect(() => {
        if (activeWorkflowStep.step) {
            const stepKey = _.get(activeWorkflowStep, 'step.stepKey', null);
            const workflowKey = _.get(activeWorkflowStep, 'workflow.workflowKey', null);
            getWorkflowStepData({ workflow: workflowKey, entityId, step: stepKey });
        }
    }, [activeWorkflowStep]);

    useEffect(() => {
        if (workflows_data && workflows_data.workflows) {
            if (StepConfig) {
                const configuredWorkflows = Object.keys(StepConfig);
                setConfiguredWorkflowKeys(configuredWorkflows);

                // set active wfs for abort
                const activeWorkflows = workflows_data.workflows.filter(
                    wf => wf.active === true && configuredWorkflows.includes(wf.workflowKey)
                );
                setActiveWorkflowList(activeWorkflows);
            }

            const currentWorkflow = workflows_data.workflows.find(
                wf => wf.enabled && wf.visible && wf.workflowKey == activeWorkflow
            );
            if (currentWorkflow && currentWorkflow.steps) {
                let currentStep;
                if (currentWorkflow.currentPosition)
                    currentStep = currentWorkflow.steps.find(stp => stp.stepKey == currentWorkflow.currentPosition);
                else
                    currentStep = currentWorkflow.steps.find(
                        stp => stp.stepKey == _.get(activeWorkflowStep, 'step.stepKey', null)
                    ); // when no current step, get latest data of same step
                if (currentStep) changeStep({ step: currentStep, workflow: currentWorkflow });
            } else {
                // if current active wf is not visible or enabled, display empty screen
                setActiveWorkflow(null);
                setActiveWorkflowStep({
                    workflow: null,
                    step: null,
                    index: -1
                });
            }

            if (openWorkFlowsList.length > 0) {
                let tempOpenWfs = [];
                for (const oWf of openWorkFlowsList) {
                    const wfData = workflows_data.workflows.find(wf => wf.workflowKey == oWf);
                    if (wfData && wfData.enabled) tempOpenWfs.push(oWf);
                }
                setOpenWorkFlowsList(tempOpenWfs);
            }

            if (fetchedWorkFlowTriggerFunction) fetchedWorkFlowTriggerFunction(workflows_data.workflows);
        }
    }, [workflows_data]);

    useEffect(() => {
        if (socketData) {
            handleSocketEffect();
        }
    }, [socketData]);

    /**socket for concurrent update */
    const handleSocketEffect = () => {
        if (!socketData.payload) return;
        const {
            payload: {
                userType,
                name,
                workflowId: socketWf,
                stepId: socketStep,
                socketAction,
                sessionId,
                email: emailFromSckot,
                datasetVersion: version,
                abortWfIds = [],
                skipConcurrentPopup = false
            }
        } = socketData;

        // no action for same session
        if (session === sessionId) return;

        const workflowKey = _.get(activeWorkflowStep, 'workflow.workflowKey', null);
        const stepKey = _.get(activeWorkflowStep, 'step.stepKey', null);

        // data save action
        if ([STEP_ACTION_DATA_CHANGE, STEP_ACTION_DOC_UPLOAD].includes(socketAction)) {
            if (dataset) {
                if (socketStep === stepKey && !skipConcurrentPopup) {
                    if (!emailFromSckot || emailFromSckot !== loggedUser.email || isMultiClient) {
                        Modal.destroyAll();
                        let displayName =
                            loggedUser.primaryRole === UserRole.ADMIN
                                ? `${name}`
                                : userType === UserRole.ADMIN
                                ? UserRole.ADMIN
                                : `${name}`;
                        Modal.confirm({
                            title: 'Step Updated',
                            cancelText: 'Reject',
                            okText: 'Accept',
                            content: (
                                <div>
                                    {`${displayName} updated this step.  Accepting their changes will override your changes.  Rejecting their changes will preserve your work and ignore their changes.`}
                                </div>
                            ),
                            onCancel() {
                                setDatasetVersion(version);
                                setDataset({ ...dataset });
                            },
                            onOk() {
                                getWorkflowStepData({ workflow: workflowKey, entityId, step: stepKey });
                            }
                        });
                    }
                } else {
                    getWorkFlows({ loggedUser, doFilter: true, entityId, isMultiClient });
                }
            }

            // step complete action
        } else if ([STEP_ACTION_PROCEED, STEP_ACTION_UPLOD_PUBLISH,STEP_ACTION_UPDATE, STEP_ACTION_PUBLISH, STEP_ACTION_PUBLISH_MULTICLIENT].includes(socketAction)) {
            if (socketStep === stepKey) {
               
                if (!emailFromSckot || emailFromSckot !== loggedUser.email) {
                    Modal.destroyAll();
                    let displayName =
                        loggedUser.primaryRole === UserRole.ADMIN
                            ? `${name}`
                            : userType === UserRole.ADMIN
                            ? UserRole.ADMIN
                            : `${name}`;
                    Modal.warning({
                        title: 'Workflow Updated',
                        content: (
                            <div>
                                {`This step has been completed by ${displayName}.  Any changes you have made may have been lost. Click ‘OK’ to get current status.`}
                            </div>
                        ),
                        onOk() {
                            getWorkFlows({ loggedUser, doFilter: true, entityId, isMultiClient });
                        },
                        onCancel() {
                            getWorkFlows({ loggedUser, doFilter: true, entityId, isMultiClient });
                        }
                    });
                } else {
                    getWorkFlows({ loggedUser, doFilter: true, entityId, isMultiClient });
                }
            } else {
                if (STEP_ACTION_UPLOD_PUBLISH) getWorkflowStepData({ workflow: workflowKey, entityId, step: stepKey });
                getWorkFlows({ loggedUser, doFilter: true, entityId, isMultiClient });
            }
        } else if ([STEP_ACTION_COMMENT, STEP_ACTION_ASSIGNEE, STEP_ACTION_AUTHORIZE, STEP_ACTION_SIGN, STEP_ACTION_AUTHORIZE_MULTICLIENT].includes(socketAction)) {
            if (socketStep === stepKey) getWorkflowStepData({ workflow: workflowKey, entityId, step: stepKey });
            if ([STEP_ACTION_AUTHORIZE, STEP_ACTION_PUBLISH, STEP_ACTION_UPDATE, STEP_ACTION_AUTHORIZE_MULTICLIENT].includes(socketAction)) getWorkFlows({ loggedUser, doFilter: true, entityId, isMultiClient });
        } else if (socketAction === STEP_ACTION_ACTIVATE) {
            if (socketWf == workflowKey) {
                setActiveWorkflow(null);
                setActiveWorkflowStep({
                    workflow: null,
                    step: null,
                    index: -1
                });
                if (openWorkFlowsList.length > 0 && openWorkFlowsList.includes(workflowKey))
                    setOpenWorkFlowsList(openWorkFlowsList.filter(wf => wf != workflowKey));
            }
            getWorkFlows({ loggedUser, doFilter: true, entityId, isMultiClient });
        } else if (socketAction === ABORT_WORKFLOW_ACTION) {
            if ((!emailFromSckot || emailFromSckot !== loggedUser.email) && abortWfIds.includes(workflowKey) && !isMultiClient) {
                Modal.destroyAll();
                Modal.info({
                    title: 'Workflow aborted',
                    content: 'Current workflow has been aborted',
                    okText: 'OK',
                    onOk: () => {
                        getWorkFlows({ loggedUser, doFilter: true, entityId, isMultiClient });
                    }
                });
            }
             else if (abortWfIds.includes(workflowKey) && isMultiClient) {
                let displayName =
                        loggedUser.primaryRole === UserRole.ADMIN
                            ? `${name}`
                            : userType === UserRole.ADMIN
                            ? UserRole.ADMIN
                            : `${name}`;
                Modal.destroyAll();
                Modal.info({
                    title: 'Workflow aborted',
                    content: `Workflow aborted by ${displayName}`,
                    okText: 'OK',
                    onOk: () => {
                        getWorkFlows({ loggedUser, doFilter: true, entityId, isMultiClient });
                    }
                });
            } 
            else {
                getWorkFlows({ loggedUser, doFilter: true, entityId, isMultiClient });
            }
        } else if ([STEP_ACTION_TERMINATE_MANDATE, STEP_ACTION_AUTHORIZE_MANDATE].includes(socketAction)) {
            getWorkFlows({ loggedUser, doFilter: true, entityId, isMultiClient });
            if (socketAction === STEP_ACTION_TERMINATE_MANDATE) history.push('scheme');
        } else {
            getWorkFlows({ loggedUser, doFilter: true, entityId, isMultiClient });
        }
    };

    /**set open workflow keys */
    const openWorkflow = wfs => {
        setOpenWorkFlowsList(wfs);
    };

    /**when change  workflow step set those data */
    const changeStep = ({ step, workflow }) => {
        setEntityId(isMultiClient ? workflow.workflowKey : props.entityId);
        if (step.enabled || step.rejected) {
            setDataset({});
            setActiveWorkflow(workflow.workflowKey);
            setActiveWorkflowStep({
                step,
                workflow,
                index: multipleWorkflowStepMap({ workflow, positionStep: step.stepKey })
            });
        }
    };

    /**when change  workflow  set those data */
    const changeWorkflow = ({ workflow }) => {
        setActiveWorkflow(workflow.workflowKey);
        setEntityId(isMultiClient ? workflow.workflowKey : props.entityId);

        if (isMultiClient) {
            // begin socket for concurrent update
            listenToWorkflowSatusChange(workflow.workflowKey, data => {
                if (data) setSocketData({ ...data });
            });
        }

        setActiveWorkflowStep({
            step: workflow.steps.find(step => step.stepKey === workflow.currentPosition) || null,
            workflow,
            index: multipleWorkflowStepMap({ workflow })
        });
    };

    /**get current step index for the  workflow  */
    const getCurrent = workflow => {
        if (activeWorkflowStep.workflow && activeWorkflowStep.workflow.workflowKey === workflow.workflowKey) {
            return activeWorkflowStep.index;
        }
        return -1;
    };

    /** get workflow step data */
    const getWorkflowStepData = payload => {
        getWorkflowStep_request({ ...payload });
    };

    /** action trigger */
    const updateWorkflowStepData = (action, payload, cb, rest, updateType) => {
        const stepKey = _.get(activeWorkflowStep, 'step.stepKey', null);
        const workflowKey = _.get(activeWorkflowStep, 'workflow.workflowKey', null);

        const params = {
            ...dataset,
            ...payload
        };

        updateWorkflowStep_request(
            {
                entityId,
                stepId: stepKey,
                action,
                datasetMap: params,
                rest,
                session,
                workflowId: workflowKey,
                datasetVersion,
                loggedUser,
                updateType, 
                isMultiClient
            },
            data => {
                if (cb) cb(data);
            }
        );
    };

    const handleChangeDataset = (changedDataset, cb) => {
        setDataset({ ...dataset, ...changedDataset });
    };

    /**render component related to current step and workflow  */
    const renderCurrentFormForStep = () => {
        const workflowKey = _.get(activeWorkflowStep, 'workflow.workflowKey', null);
        const stepKey = _.get(activeWorkflowStep, 'step.stepKey', null);
        const generateContent = _.get(StepConfig, `${workflowKey}.${stepKey}`, null);

        return workflowKey && stepKey && generateContent ? (
            generateContent({
                step: _.get(activeWorkflowStep, 'step', null),
                get_workflows_inprogress,
                loggedUser,
                entityId,
                getWorkflowStep_inProgress,
                updateWorkflowStep_inProgress,
                dataset,
                updateWorkflowStepData,
                getLoggedUserClaims_data,
                isMultiClient,
                commonUserClaims,
                handleChangeDataset,
                artifacts,
                workflowKey,
                stepKey
            })
        ) : (
            <EmptyScreen />
        );
    };

    const handleAbortPopup = () => {
        setShowAbortPopup(!showAbortPopup);
    };

    return (
        <section className="proposal-information-section information-update-wrapper">
            <Spin
                spinning={
                    get_workflows_inprogress ||
                    getWorkflowStep_inProgress ||
                    updateWorkflowStep_inProgress ||
                    abortWorkflow_inProgress ||
                    internal_stepAction_inProgress
                }
                className="loading-wrapper-dark"
            >
                <AbortPopup
                    showPopup={showAbortPopup}
                    activeWorkflows={activeWorkflowList}
                    pullAbortableSectionList={sections => setAbortableSectionList(sections)}
                    pullAbortableWFList={wfs => setAbortableWFList(wfs)}
                    handleClose={handleAbortPopup}
                    entityId={entityId}
                    onSuccess={() => getWorkFlows({ loggedUser, doFilter: true, entityId, isMultiClient })}
                    isMultiClient={isMultiClient}
                />
                <Row gutter={20} className="activeWorkflowWrapper">
                    <Col xl={8} lg={8} xs={24}>
                        <div className="information-navigator">
                            <div className="card card-wrap">
                                <div className="header">
                                    <span className="title">
                                        <b>{workflowCreatorTitle}</b>
                                    </span>
                                    {(abortableWFList.length > 0 || abortableSectionList.length > 0) && (
                                        <span className="more-text pull-right" onClick={() => handleAbortPopup()}>
                                            <img className="icon clickable-icon" src={ellipseIcon} />
                                        </span>
                                    )}
                                </div>
                                <div className="content">
                                    {/**
                                     * openKeys for view steps need to set workflowKey
                                     */}
                                    <Menu mode="inline" openKeys={openWorkFlowsList} onOpenChange={openWorkflow}>
                                        {!temClearWorkflow && workflows_data &&
                                            workflows_data.workflows.map(
                                                (workflow, i) =>
                                                    configuredWorkflowKeys.includes(workflow.workflowKey) &&
                                                    workflow.visible && (
                                                        <SubMenu
                                                            title={
                                                                <span>
                                                                    <span
                                                                        className={
                                                                            workflow.active ? 'font-weight-bold' : ''
                                                                        }
                                                                    >
                                                                        {convertArtifacts(workflow.title, artifacts)}
                                                                    </span>
                                                                </span>
                                                            }
                                                            disabled={!workflow.enabled}
                                                            key={workflow.workflowKey}
                                                            onTitleClick={m => {
                                                                if (workflow.enabled) {
                                                                    if (workflow.workflowKey !== activeWorkflow)
                                                                        changeWorkflow({ workflow });
                                                                    else {
                                                                        setActiveWorkflow(null);
                                                                        setActiveWorkflowStep({
                                                                            workflow: null,
                                                                            step: null,
                                                                            index: -1
                                                                        });
                                                                    }
                                                                }
                                                            }}
                                                        >
                                                            <Steps
                                                                direction="vertical"
                                                                size="small"
                                                                className="active-workflow-menu"
                                                                /**
                                                                 * this is for draw line
                                                                 */
                                                                current={getCurrent(workflow)}
                                                            >
                                                                {workflow.steps &&
                                                                    workflow.steps.length &&
                                                                    workflow.steps.map(
                                                                        (step, k) =>
                                                                            step.visible && (
                                                                                <Steps.Step
                                                                                    title={convertArtifacts(
                                                                                        step.title,
                                                                                        artifacts
                                                                                    )}
                                                                                    className="ant-step-cursor"
                                                                                    icon={
                                                                                        <img
                                                                                            src={stepIcon(
                                                                                                step,
                                                                                                workflow.currentPosition
                                                                                            )}
                                                                                            width="20"
                                                                                            height="20"
                                                                                        ></img>
                                                                                    }
                                                                                    key={step.key}
                                                                                    onClick={() => {
                                                                                        changeStep({ step, workflow });
                                                                                    }}
                                                                                />
                                                                            )
                                                                    )}
                                                            </Steps>
                                                        </SubMenu>
                                                    )
                                            )}
                                    </Menu>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xl={16} lg={16} xs={24}>
                        <Suspense fallback={<Loading />}>
                            <div className="root-form-wrapper mt-30">
                                <div className="card card-wrapper">
                                    <div className="assign-user-component-reg">
                                        {//                         claims &&
                                        //   claims[VIEW_ASSIGN_USER] &&
                                        //   getLoggedUserClaims_data &&
                                        //   getLoggedUserClaims_data.length
                                        //     ? getLoggedUserClaims_data.includes(claims[VIEW_ASSIGN_USER]) &&
                                        activeWorkflowStep.step &&
                                            getPrimaryRole(loggedUser) === UserRole.ADMIN &&
                                            _.get(activeWorkflowStep, 'step.hasAssignees', false) &&
                                            ClaimHelper.getPermission(
                                                props.isMultiClient ? commonUserClaims : getLoggedUserClaims_data,
                                                _.get(activeWorkflowStep, 'step', null),
                                                STEP_ACTION_ASSIGNEE
                                            ) && (
                                                <div className="assign-user">
                                                    <UserAssign
                                                        dataset={dataset}
                                                        step={_.get(activeWorkflowStep, 'step', null)}
                                                        handleUpdate={updateWorkflowStepData}
                                                    />
                                                </div>
                                            )}
                                    </div>
                                    <Suspense fallback={<Loading />}>{renderCurrentFormForStep()}</Suspense>
                                </div>
                            </div>
                        </Suspense>
                    </Col>
                </Row>
            </Spin>
        </section>
    );
};

const mapStateToProps = state => ({
    workflows_data: workflows_data()(state),
    get_workflows_inprogress: get_workflows_inprogress()(state),
    getWorkflowStep_data: getWorkflowStep_data()(state),
    getWorkflowStep_inProgress: getWorkflowStep_inProgress()(state),
    updateWorkflowStep_inProgress: updateWorkflowStep_inProgress()(state),
    updateWorkflowStep_data: updateWorkflowStep_data()(state),
    abortWorkflow_inProgress: abortWorkflow_inProgress()(state),
    internal_stepAction_inProgress: internal_stepAction_inProgress()(state)
});

const mapDispatchToProps = dispatch => ({
    getWorkFlows: payload => {
        dispatch(getWorkFlows(payload));
    },
    getWorkflowStep_request: payload => {
        dispatch(getWorkflowStep_request(payload));
    },
    updateWorkflowStep_request: (payload, callback) => {
        dispatch(updateWorkflowStep_request(payload, callback));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MultipleWorkflowCreator);
