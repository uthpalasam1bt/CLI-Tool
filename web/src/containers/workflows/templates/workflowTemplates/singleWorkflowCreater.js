import React, { useEffect, useState, Suspense } from 'react';
import { connect } from 'react-redux';
import { Col, Row, Spin, Steps } from 'antd';
import UUID from 'uuid/v1';

import Loading from '../../../../components/Loading';
import { singleWorkflowInitialStepMap, stepIcon, stepMap } from './worker';
import ellipseIcon from '../../../../assets/images/threedots.svg';

import { getWorkFlows } from '../../actions/workflowActions';
import { getWorkflowStep_request, updateWorkflowStep_request } from '../../actions/stepDataActions';

import { workflows_data, get_workflows_inprogress } from '../../selectors/workflowSelectors';
import {
    getWorkflowStep_data,
    getWorkflowStep_inProgress,
    updateWorkflowStep_inProgress,
    updateWorkflowStep_data
} from '../../selectors/workflowStepSelectors';

const SingleWorkflowCreator = props => {
    const {
        workflows_data = {},
        get_workflows_inprogress,
        loggedUser,
        StepConfig,
        getWorkFlows,
        workflowKey,
        getWorkflowStep_inProgress,
        updateWorkflowStep_inProgress,
        entityId
    } = props;
    const [steps, setSteps] = useState([]);
    const [activeStep, setActiveStep] = useState({ index: -1, step: {} });
    const [dataset, setDataset] = useState({});
    const [session, setSession] = useState(UUID());

    useEffect(() => {
        getWorkFlows();
    }, []);

    useEffect(() => {
        if (workflows_data) {
            const workflowStep = singleWorkflowInitialStepMap({ ...workflows_data, doSort: true, loggedUser });
            if (workflowStep) {
                const { steps, activeStep } = workflowStep;
                setSteps(steps);
                setActiveStep(activeStep);
            }
        }
    }, [workflows_data]);

    const changeActiveStep = forceStep => {
        //     const { store_currentWorkflowPosition } = this.props;

        let currentStep = null;

        if (!steps.length) return;

        if (forceStep) {
            currentStep = forceStep;
            // } else if (store_currentWorkflowPosition) {
            //   const { stepKey } = store_currentWorkflowPosition.step;

            //   const workflowStep = workflow.find(wf => wf.stepKey === stepKey);
            //   if (!workflowStep) {
            //     currentStep = activeStep;
            //   } else if (workflowStep.enabled) {
            //     currentStep = store_currentWorkflowPosition;
            //   } else {
            //     currentStep = activeStep;
            //   }
        } else {
            currentStep = activeStep;
        }
        if (JSON.stringify(activeStep) !== JSON.stringify(currentStep)) setActiveStep(currentStep);
    };

    const handleChangeStep = step => {
        const workflowStep = stepMap({ steps, currentPosition: step.stepKey, loggedUser });
        if (workflowStep && workflowStep.activeStep.step.enabled) {
            changeActiveStep(workflowStep.activeStep);
        }
    };

    /** get workflow step data */
    // const getWorkflowStepData = payload => {
    //     // getWorkflowStep_request({ ...payload });
    // };

    /** action trigger */
    const updateWorkflowStepData = (action, payload, cb, rest) => {
        const { step: currentStep = {} } = activeStep;
        const { stepKey } = currentStep;

        const params = {
            ...dataset,
            ...payload,
            documents: { iaa: 'adsasda', fma: 'addasdas', pmc: 'asdasdas' },
            approvals: { fma: { client: [], clientTeam: [], governUser: [] } }
        };

        updateWorkflowStep_request(
            { entityId, step: stepKey, action, datasetMap: params, rest, session, workflowKey },
            data => {
                if (cb) cb(data);
            }
        );
    };

    const { index: currentIndex, step: currentStep = {} } = activeStep;
    const { stepKey } = currentStep;
    return (
        <section className="proposal-registration-section">
            {get_workflows_inprogress ? (
                <div className="loading-wrapper">
                    <Spin />
                </div>
            ) : null}
            <Row gutter={20}>
                <Col xl={8} lg={8} xs={24}>
                    <div className="tasks-navigator">
                        <div className="card card-wrap">
                            <div className="header">
                                <span className="title">Registration Steps</span>
                                <span
                                    className="more-text pull-right"
                                    onClick={() => {
                                        // this.props.showAbortModalHandler();
                                    }}
                                    // hidden={!this.props.isAbortPopupAccessible}
                                >
                                    <img className="icon clickable-icon" src={ellipseIcon} />
                                </span>
                            </div>
                            <div className="content">
                                <Steps className="stepsList" direction="vertical" size="small" current={currentIndex}>
                                    {steps &&
                                        steps.map((step, tKey) => (
                                            <Steps.Step
                                                title={step.title}
                                                key={tKey}
                                                icon={
                                                    <img
                                                        src={stepIcon(step, 'simpleForm')}
                                                        width="20"
                                                        height="20"
                                                    ></img>
                                                }
                                                onClick={() => {
                                                    handleChangeStep(step);
                                                }}
                                            />
                                        ))}
                                </Steps>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xl={16} lg={16} xs={24}>
                    <Suspense fallback={<Loading />}>
                        <div className="root-form-wrapper mt-30">
                            <div className="card card-wrapper">
                                <div className="assign-user-component-reg">
                                    {/* {claims &&
              claims[VIEW_ASSIGN_USER] &&
              getLoggedUserClaims_data &&
              getLoggedUserClaims_data.length
                ? getLoggedUserClaims_data.includes(claims[VIEW_ASSIGN_USER]) &&
                  getPrimaryRole(loggedUser) === UserRole.GOVERN_USER && (
                    <div className="assign-user">
                      <UserAssignComponent
                        claimId={claims[VIEW_ASSIGN_USER]}
                        loggedUser={loggedUser}
                        schemeId={schemeId}
                        step={step}
                        removeDataSet={() => {
                          this.removeDataSet(this);
                        }}
                      />
                    </div>
                  )
                : null} */}
                                </div>
                                <Suspense fallback={<Loading />}>
                                    {StepConfig[stepKey] &&
                                        StepConfig[stepKey]({
                                            step: currentStep,
                                            get_workflows_inprogress,
                                            loggedUser,
                                            entityId,
                                            getWorkflowStep_inProgress,
                                            updateWorkflowStep_inProgress,
                                            dataset,
                                            updateWorkflowStepData
                                        })}
                                </Suspense>
                            </div>
                        </div>
                    </Suspense>
                </Col>
            </Row>
        </section>
    );
};

const mapStateToProps = state => ({
    workflows_data: workflows_data()(state),
    get_workflows_inprogress: get_workflows_inprogress()(state),
    getWorkflowStep_data: getWorkflowStep_data()(state),
    getWorkflowStep_inProgress: getWorkflowStep_inProgress()(state),
    updateWorkflowStep_inProgress: updateWorkflowStep_inProgress()(state),
    updateWorkflowStep_data: updateWorkflowStep_data()(state)
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
)(SingleWorkflowCreator);
