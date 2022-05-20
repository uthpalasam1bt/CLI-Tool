import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Modal, Radio, Spin } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import { submit, initialize, reset, SubmissionError } from 'redux-form';

import api from '../../../../middlewares/connectApi';
import AwsIotSingleton from '../../../../helpers/awsIot';
import { getInitialValues, rejectInitialProposal, paAnalyzeRequest, setInitialValues } from './actions';
import { executeStepfunctionRequest } from '../actions';
import store from '../../../../redux/store';
import CustomLoader from '../../../../components/CustomLoader';

import { stepFunctionConstants } from '../../../../config/constants';
import PortFolioForm from './form';
import NotificationHelper from '../../../../helpers/NotificationHelper';
import {
    PA_AVAILABLE_WORKFLOW_STEPS,
    PA_REJECT_WARNING_MESSAGE,
    PA_REJECT_WARNING_MESSAGE_TITLE,
    INVALID_TARGET_RETURN_MESSAGE,
    REJECT_DISABLED_TARGET_RETURN_CHANGED_ERROR_MESSAGE,
    PORTFOLIO_FORM
} from './constants';
import {
    renderPieChart,
    renderLineChart,
    renderProjectionLineChart,
    renderSpecialProjectionLineChart,
    renderLineChartB,
    renderLineChartC
} from './pacharts';

const {
    STEP_PORTFOLIO_ANALYZER,
    PORTFOLIO_REJECT_FUNCTION_NAME,
    PORTFOLIO_ANALYZE_FUNCTION_NAME
} = stepFunctionConstants;

class PortFolio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataGenerationInprogress: true,
            LIABFLAG: null,
            PROJECTFLAG: null,
            OPTION: 1,
            OPTION2: 1,
            initialTargetReturn: null,
            submissionType: null,
            workFlow: null,
            workFlowStep: null,
            form: null,
            getInitialValueInprogress: false,
            executeInitialStepFunctionInprogress: false,
            portfolioData: null,
            minRange: null,
            maxRange: null,
            stepFunctionpaInprogress: false,
            userEnteredTargetReturnValue: null,
            adAnualContribution: 0,
            paymentPeriod: 0,
            paError: false
            // hasTargetReturnSliderValueChanged: false
        };

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.renderSubmit = this.renderSubmit.bind(this);
    }

    componentDidMount() {
        const {
            schemeId,
            isProtfolioAvailable,
            workFlow,
            workFlowStep,
            reset,
            showPortFolioTab,
            schemeData,
            handleChangeContainer,
            workflows
        } = this.props;
        const { getInitialValueInprogress, paError } = this.state;

        reset();

        if (workflows) isProtfolioAvailable(workflows);

        if (!showPortFolioTab && schemeData && schemeData.status === 'A')
            handleChangeContainer(`/scheme/options/active-workflow/`);

        if (workFlow && workFlowStep) {
            this.setState(
                {
                    workFlow,
                    workFlowStep
                },
                () => {
                    this.getInitialValuesHandler(schemeId);
                }
            );
        }

        AwsIotSingleton.getPayloadFromSocket(`/notification/${schemeId}/portfolioAnalyzer`, data => {
            if (data.payload.complete && !getInitialValueInprogress) {
                this.getInitialValuesHandler(schemeId);
                this.setState({
                    stepFunctionpaInprogress: false
                });
            } else if (!data.payload.complete && data.payload.error && !getInitialValueInprogress && !paError) {
                this.setState({ paError: true });
                NotificationHelper.getInstance().error('Unexpected error. Please contact system administrator.');
            }

            this.setState({
                executeInitialStepFunctionInprogress: false
            });
        });
    }

    UNSAFE_componentWillReceiveProps(np, nc) {
        const { workFlow, workFlowStep, executeInitialStepFunctionInprogress, portfolioData } = this.state;
        const { isProtfolioAvailable } = this.props;

        console.log('np.workflows', np.workflows);
        if (np.portfolioData) {
            this.setState({
                getInitialValueInprogress: false
            });
        }

        if (
            np.portfolioData &&
            np.portfolioData.data &&
            (!portfolioData || JSON.stringify(portfolioData) !== JSON.stringify(np.portfolioData.data))
        ) {
            const {
                targetReturn,
                adAnualContribution,
                paymentPeriod,
                dataGenerationInprogress,
                dataGenerationComplete,
                dataFlags,
                otherData,
                applied,
                userEnteredTargetReturnValue,
                aborted
            } = np.portfolioData.data;

            this.setState(
                {
                    initialTargetReturn: targetReturn,
                    dataGenerationInprogress,
                    getInitialValueInprogress: false,
                    portfolioData: np.portfolioData.data,
                    userEnteredTargetReturnValue,
                    adAnualContribution,
                    paymentPeriod
                },
                () => {
                    if (
                        !dataGenerationInprogress &&
                        dataGenerationComplete &&
                        !executeInitialStepFunctionInprogress &&
                        (_.isEmpty(otherData) || applied || aborted)
                    ) {
                        this.executeStepfunction();
                    }
                }
            );

            if (dataFlags) {
                this.setState({
                    LIABFLAG: _.get(np.portfolioData.data, ['dataFlags', '0000.LIABFLAG'], null),
                    PROJECTFLAG: _.get(np.portfolioData.data, ['dataFlags', '0001.PROJECTFLAG'], null)
                });
            }

            if (targetReturn || targetReturn === 0) {
                store.dispatch(
                    initialize(
                        'PORTFOLIO_FORM',
                        {
                            targetReturnValue: targetReturn,
                            additionalContribution: adAnualContribution ? adAnualContribution : null,
                            timePeriod: paymentPeriod ? paymentPeriod : null
                        },
                        false
                    )
                );
            } else {
                store.dispatch(
                    initialize(
                        'PORTFOLIO_FORM',
                        {
                            targetReturnValue: null,
                            additionalContribution: adAnualContribution ? adAnualContribution : null,
                            timePeriod: paymentPeriod ? paymentPeriod : null
                        },
                        false
                    )
                );
            }

            if (otherData) {
                this.getTargetReturnRange(otherData);
            }
        }

        if (np.workflows) isProtfolioAvailable(np.workflows);

        if (np.workFlow && np.workFlow !== workFlow && np.workFlowStep && np.workFlowStep !== workFlowStep) {
            this.setState(
                {
                    workFlow: np.workFlow,
                    workFlowStep: np.workFlowStep
                },
                () => {
                    this.getInitialValuesHandler(this.props.schemeId);
                }
            );
        }
    }

    componentWillUnmount() {
        const { schemeId, setInitialValues, reset } = this.props;
        setInitialValues();
        reset();
        AwsIotSingleton.unsubscribeSocket(`/notification/${schemeId}/portfolioAnalyzer`);
    }

    getTargetReturnRange(data) {
        var sortable = [];
        for (var item in data) {
            sortable.push(data[item]);
        }
        const sortedArray = _.sortBy(sortable);

        if (sortedArray.length) {
            this.setState({
                minRange: sortedArray[0],
                maxRange: sortedArray[sortedArray.length - 1]
            });
        }
    }

    /**
     * stepfunction executor
     */

    executeStepfunction() {
        const { schemeId, executeStepfunctionRequest } = this.props;
        const {
            workFlow,
            workFlowStep,
            initialTargetReturn,
            adAnualContribution,
            paymentPeriod,
            userEnteredTargetReturnValue
        } = this.state;

        const stepFunctionPayload = {
            schemeId,
            step: STEP_PORTFOLIO_ANALYZER,
            functionName: PORTFOLIO_ANALYZE_FUNCTION_NAME,
            description: 'pa anlyze',
            tenant: 'LGIM',
            targetReturn: parseFloat(initialTargetReturn) / 100,
            addContFlag: 'N',
            annualDeficit: 0,
            YearDeficit: 0,
            workFlow,
            workFlowStep,
            userReturn: userEnteredTargetReturnValue || userEnteredTargetReturnValue === 0 ? 'Y' : 'N',
            activationDate: moment().format('YYYYMMDD'), //TODO:GET ACTUAL ACTIVATION DATE FOR ACTIVATED SCHEMES
            adAnualContribution,
            paymentPeriod
        };

        this.setState({ executeInitialStepFunctionInprogress: true, paError: false }, () => {
            executeStepfunctionRequest(stepFunctionPayload);
        });
    }

    warning = props => {
        Modal.confirm({
            className: 'lgim-styles-wrapper graph-warning-modal',
            title: PA_REJECT_WARNING_MESSAGE_TITLE,
            content: PA_REJECT_WARNING_MESSAGE,
            cancelText: 'No',
            okText: 'Yes',
            onOk: () => {
                this.Apply(props);
            },
            onCancel: () => {}
        });
    };

    /**
     * get initial values
     */
    getInitialValuesHandler = () => {
        const { schemeId, getInitialValues } = this.props;
        const { workFlow, workFlowStep } = this.state;
        const payload = {
            schemeId,
            step: STEP_PORTFOLIO_ANALYZER,
            workFlow,
            workFlowStep
        };
        this.setState({ getInitialValueInprogress: true }, () => {
            getInitialValues(payload);
        });
    };

    doFetch = async (templateName, params, success, failure) => {
        const { schemeData } = this.props;
        const today = moment().toDate();

        try {
            const { data: result = {} } = await api.getChartData({
                name: templateName,
                tenant: 'LGIM',
                schemeId: schemeData.schemeId,
                scheme: schemeData.status === 'A' ? schemeData.activationCode : schemeData.scheme,
                title: params.title,
                startDate: moment(today).format('YYYYMMDD'),
                endDate: moment(today).format('YYYYMMDD'),
                callDoFetch: false
            });

            if (result && result.content) {
                const datam = result.content;
                success(datam);
            } else {
                let noData = {
                    message: 'No data available for the chart',
                    color: '#86898A',
                    fontSize: 20
                };
                success(noData);
            }
        } catch (error) {
            failure(error);
        }
    };

    Apply = form => {
        const { schemeId, rejectInitialProposal, schemeName, schemeData } = this.props;
        const { workFlow, workFlowStep, minRange, maxRange } = this.state;

        const { targetReturnValue, additionalContribution, timePeriod } = form;

        if (minRange < parseFloat(targetReturnValue) / 100 && maxRange > parseFloat(targetReturnValue) / 100) {
            const payload = {
                schemeId,
                step: STEP_PORTFOLIO_ANALYZER,
                targetReturn: parseFloat(targetReturnValue) / 100,
                functionName: PORTFOLIO_REJECT_FUNCTION_NAME,
                flowKey: schemeData.status === 'A' ? 'active-workflow' : 'registration',
                workFlow,
                workFlowStep,
                schemeName,
                adAnualContribution: additionalContribution,
                paymentPeriod: timePeriod
            };
            rejectInitialProposal(payload);
        } else {
            NotificationHelper.getInstance().error(INVALID_TARGET_RETURN_MESSAGE);
        }
    };

    Analyze = form => {
        this.setState({
            callDoFetch: true
        });

        const { schemeId, paAnalyzeRequest } = this.props;
        const { workFlow, workFlowStep, minRange, maxRange } = this.state;

        const { additionalContribution = '0', targetReturnValue, timePeriod = '0', additionalContributionsType } = form;
        if (minRange <= parseFloat(targetReturnValue) / 100 && maxRange > parseFloat(targetReturnValue) / 100) {
            const payload = {
                schemeId,
                step: STEP_PORTFOLIO_ANALYZER,
                functionName: PORTFOLIO_ANALYZE_FUNCTION_NAME,
                description: 'pa anlyze',
                tenant: 'LGIM',
                targetReturn: parseFloat(targetReturnValue) / 100,
                workFlow,
                workFlowStep,
                addContFlag: additionalContributionsType,
                annualDeficit: parseFloat(additionalContribution),
                YearDeficit: parseFloat(timePeriod),
                userReturn: 'Y',
                activationDate: moment().format('YYYYMMDD'), //TODO:GET ACTUAL ACTIVATION DATE FOR ACTIVATED SCHEMES
                paymentPeriod: timePeriod,
                adAnualContribution: additionalContribution
            };
            paAnalyzeRequest(payload);
            this.setState({
                stepFunctionpaInprogress: true
                // hasTargetReturnSliderValueChanged: false
            });
        } else {
            NotificationHelper.getInstance().error(INVALID_TARGET_RETURN_MESSAGE);
        }
    };

    /// MARK :: Charts rendering helper functions
    /// MARK :: Charts collection rendering helper functions based on scenarios
    /// NOTE :: Helper functions return an array of required charts depending on defined scenarios

    // PA Scenario (A) ==> LIABFLAG = 'Y' | PROJECTFLAG = 'Y' | User Selected : X => FLR (left) & Stochastic (right)

    renderChartsCollectionForPAScenario_A = (callDoFetch, doFetch) => {
        return [
            renderSpecialProjectionLineChart(callDoFetch, doFetch),
            renderLineChart(callDoFetch, doFetch),
            renderPieChart(callDoFetch, doFetch)
        ];
    };

    // PA Scenario (B) ==> LIABFLAG = 'Y' | PROJECTFLAG = 'Y' | User Selected : Y => VaR (left) & Deterministic (right)
    renderChartsCollectionForPAScenario_B = (callDoFetch, doFetch) => {
        return [
            renderSpecialProjectionLineChart(callDoFetch, doFetch),
            renderLineChartB(callDoFetch, doFetch),
            renderPieChart(callDoFetch, doFetch)
        ];
    };

    // implement Tim's Feedback
    renderChartsCollectionForPAScenario_E = (callDoFetch, doFetch) => {
        return [
            renderProjectionLineChart(callDoFetch, doFetch),
            renderLineChart(callDoFetch, doFetch),
            renderPieChart(callDoFetch, doFetch)
        ];
    };

    // PA Scenario (B) ==> LIABFLAG = 'Y' | PROJECTFLAG = 'Y' | User Selected : Y => VaR (left) & Deterministic (right)
    renderChartsCollectionForPAScenario_F = (callDoFetch, doFetch) => {
        return [
            renderProjectionLineChart(callDoFetch, doFetch),
            renderLineChartB(callDoFetch, doFetch),
            renderPieChart(callDoFetch, doFetch)
        ];
    };
    // end

    // PA Scenario (C) ==> LIABFLAG = 'Y' | PROJECTFLAG = 'N'
    renderChartsCollectionForPAScenario_C = (callDoFetch, doFetch) => {
        return [
            renderPieChart(callDoFetch, doFetch),
            renderLineChart(callDoFetch, doFetch),
            renderLineChartB(callDoFetch, doFetch)
        ];
    };

    // PA Scenario (D) ==> LIABFLAG = 'N'
    renderChartsCollectionForPAScenario_D = (callDoFetch, doFetch) => {
        return [renderPieChart(callDoFetch, doFetch), renderLineChartC(callDoFetch, doFetch)];
    };

    // PA Scenario Empty
    renderChartsCollectionForPAScenario_Empty = () => {
        return [<div></div>];
    };

    /// MARK :: PA Scenario determining function
    renderChartsCollection = () => {
        const { PROJECTFLAG, OPTION, LIABFLAG, callDoFetch, OPTION2 } = this.state;

        let determinedScenario = null;

        if (LIABFLAG === 'Y' && PROJECTFLAG === 'Y' && OPTION === 1 && OPTION2 === 1) {
            determinedScenario = 'A';
        }
        if (LIABFLAG === 'Y' && PROJECTFLAG === 'Y' && OPTION === 1 && OPTION2 === 2) {
            determinedScenario = 'B';
        }
        if (LIABFLAG === 'Y' && PROJECTFLAG === 'N') {
            determinedScenario = 'C';
        }
        if (LIABFLAG === 'N') {
            determinedScenario = 'D';
        }

        // implement Tim's feedback
        if (LIABFLAG === 'Y' && PROJECTFLAG === 'Y' && OPTION === 2 && OPTION2 === 1) {
            determinedScenario = 'E';
        }
        if (LIABFLAG === 'Y' && PROJECTFLAG === 'Y' && OPTION === 2 && OPTION2 === 2) {
            determinedScenario = 'F';
        }

        let returnedChartsCollection;

        if (determinedScenario === 'A') {
            returnedChartsCollection = this.renderChartsCollectionForPAScenario_A(callDoFetch, this.doFetch);
        } else if (determinedScenario === 'B') {
            returnedChartsCollection = this.renderChartsCollectionForPAScenario_B(callDoFetch, this.doFetch);
        } else if (determinedScenario === 'C') {
            returnedChartsCollection = this.renderChartsCollectionForPAScenario_C(callDoFetch, this.doFetch);
        } else if (determinedScenario === 'D') {
            returnedChartsCollection = this.renderChartsCollectionForPAScenario_D(callDoFetch, this.doFetch);
        } else if (determinedScenario === 'E') {
            returnedChartsCollection = this.renderChartsCollectionForPAScenario_E(callDoFetch, this.doFetch);
        } else if (determinedScenario === 'F') {
            returnedChartsCollection = this.renderChartsCollectionForPAScenario_F(callDoFetch, this.doFetch);
        } else {
            returnedChartsCollection = this.renderChartsCollectionForPAScenario_Empty(callDoFetch, this.doFetch);
        }

        return (
            <>
                <div className="card mb-30">
                    <div className="card-content">
                        <Row className="content-graph">
                            <Col key={`item-chart`} span="24" className="input-row">
                                <div className="graph-container">{returnedChartsCollection[0]}</div>
                            </Col>
                        </Row>
                    </div>
                </div>

                {/* A 3rd chart is not visible in PA Scenario 'D' */}
                {returnedChartsCollection[2] && (
                    <div className="card mb-30">
                        <div className="card-content">
                            <Row className="content-graph">
                                <Col key={`item-chart`} span="24" className="input-row">
                                    <div className="graph-container">{returnedChartsCollection[2]}</div>
                                    {/* <div className="graph-container">{returnedChartsCollection[1]}</div> */}
                                </Col>
                            </Row>
                        </div>
                    </div>
                )}

                <div className="card mb-30">
                    <div className="card-content">
                        <Row className="content-graph">
                            <Col key={`item-chart`} span="24" className="input-row">
                                <div className="graph-container">{returnedChartsCollection[1]}</div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </>
        );
    };

    onFormSubmit = form => {
        const { submissionType, initialTargetReturn } = this.state;

        if (
            submissionType === 'analyse' &&
            form.additionalContributionsType === 'Y' &&
            (!form.additionalContribution || !form.timePeriod)
        ) {
            const error = {};
            if (!form.additionalContribution) {
                error.additionalContribution = 'required.';
            }

            if (!form.timePeriod) {
                error.timePeriod = 'required.';
            }
            throw new SubmissionError(error);
        } else if (
            submissionType === 'apply' &&
            form.additionalContributionsType === 'Y' &&
            (!form.additionalContribution || !form.timePeriod)
        ) {
            store.dispatch(reset(PORTFOLIO_FORM));
        }

        const formData = {
            ...form,
            additionalContributionsType: form.additionalContributionsType ? form.additionalContributionsType : 'N'
        };
        this.setState({ form: formData });

        if (submissionType === 'apply') {
            if (formData.targetReturnValue && formData.targetReturnValue !== initialTargetReturn) {
                NotificationHelper.getInstance().error(REJECT_DISABLED_TARGET_RETURN_CHANGED_ERROR_MESSAGE);
            } else {
                this.warning(formData);
            }
        } else if (submissionType === 'analyse') {
            this.Analyze(formData);
        }
    };

    // TEMP: Not in use => TargetReturnSliderValueChanged setting to state due to rerendering issue
    onChangeTargetRetunSliderValueHandler = () => {
        // this.setState({ hasTargetReturnSliderValueChanged: true });
    };

    radioOptionChangehandler = e => {
        this.setState({ OPTION: e.target.value });
    };

    radioOptionChangehandler_RiskCharts = e => {
        this.setState({ OPTION2: e.target.value });
    };

    renderSubmit(submissionType) {
        this.setState({ submissionType }, () => {
            this.props.submitForm();
        });
    }

    render() {
        let { paAnalyzeState_inProgress, paAbort_inProgress } = this.props;
        let { stepFunctionpaInprogress, LIABFLAG, PROJECTFLAG } = this.state;

        const {
            getInitialValueInprogress,
            executeInitialStepFunctionInprogress,
            portfolioData,
            minRange,
            maxRange,
            initialTargetReturn,
            adAnualContribution,
            paymentPeriod,
            workFlowStep
        } = this.state;

        return (
            <div className="lgim-styles-wrapper portfoloio-wrapper">
                {executeInitialStepFunctionInprogress || stepFunctionpaInprogress ? (
                    <CustomLoader timeDuration={15} />
                ) : null}
                <div className="content">
                    <Row gutter={30}>
                        <Col xl={8} xs={24}>
                            <PortFolioForm
                                onSubmit={this.onFormSubmit}
                                minRange={minRange}
                                maxRange={maxRange}
                                initialTargetReturn={initialTargetReturn}
                                adAnualContribution={adAnualContribution}
                                paymentPeriod={paymentPeriod}
                                stepFunctionpaInprogress={
                                    stepFunctionpaInprogress || executeInitialStepFunctionInprogress
                                }
                                LIABFLAG={LIABFLAG}
                                PROJECTFLAG={PROJECTFLAG}
                                // onChangeTRSliderValue={this.onChangeTargetRetunSliderValueHandler}
                            />
                            <div className="card mb-30">
                                <div className="card-content">
                                    <div className="content">
                                        <Row className="button-wrap">
                                            <Col span={24} className="label-wrapper">
                                                <button
                                                    className="btn-red regular btn-apply"
                                                    onClick={() => this.renderSubmit('apply')}
                                                    disabled={
                                                        getInitialValueInprogress ||
                                                        executeInitialStepFunctionInprogress ||
                                                        stepFunctionpaInprogress
                                                    }
                                                >
                                                    {workFlowStep === PA_AVAILABLE_WORKFLOW_STEPS.REVIEW_PROPOSAL
                                                        ? 'Update proposal'
                                                        : 'Update report'}
                                                    {paAbort_inProgress && (
                                                        <i
                                                            className="fa fa-circle-o-notch fa-spin"
                                                            aria-hidden="true"
                                                        ></i>
                                                    )}
                                                </button>
                                                <button
                                                    className="tpip-btn-blue regular btn-alayse"
                                                    type="submit"
                                                    disabled={
                                                        getInitialValueInprogress ||
                                                        executeInitialStepFunctionInprogress ||
                                                        stepFunctionpaInprogress
                                                    }
                                                    onClick={() => this.renderSubmit('analyse')}
                                                >
                                                    Analyse
                                                    {paAnalyzeState_inProgress && (
                                                        <i
                                                            className="fa fa-circle-o-notch fa-spin"
                                                            aria-hidden="true"
                                                        ></i>
                                                    )}
                                                </button>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </div>
                            {PROJECTFLAG === 'Y' && LIABFLAG === 'Y' ? (
                                <div className="card mb-30">
                                    <div className="card-content">
                                        <div className="content radio-content">
                                            <span className="title">Change View</span>
                                            <Row className="button-wrap">
                                                <Col span={24} className="label-wrapper">
                                                    <Radio.Group
                                                        defaultValue={1}
                                                        className="radio-wrap"
                                                        onChange={e => {
                                                            this.radioOptionChangehandler(e);
                                                        }}
                                                    >
                                                        <Radio value={1}>Stochastic</Radio>
                                                        <Radio value={2}>Deterministic</Radio>
                                                    </Radio.Group>
                                                </Col>
                                            </Row>
                                            <Row className="button-wrap">
                                                <Col span={24} className="label-wrapper">
                                                    <Radio.Group
                                                        defaultValue={1}
                                                        className="radio-wrap"
                                                        onChange={e => {
                                                            this.radioOptionChangehandler_RiskCharts(e);
                                                        }}
                                                    >
                                                        <Radio value={1}>Funding Risk</Radio>
                                                        <Radio value={2}>Deficit Risk</Radio>
                                                    </Radio.Group>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <></>
                            )}
                        </Col>
                        <Col key={`item-chart`} xl={16} xs={24} className="input-row">
                            <div className="graph-container">
                                {!getInitialValueInprogress &&
                                    !executeInitialStepFunctionInprogress &&
                                    portfolioData &&
                                    portfolioData.dataGenerationComplete &&
                                    !stepFunctionpaInprogress &&
                                    this.renderChartsCollection()}
                                {getInitialValueInprogress ||
                                executeInitialStepFunctionInprogress ||
                                stepFunctionpaInprogress ? (
                                    <div className="loading-wrapper">
                                        <Spin />
                                    </div>
                                ) : null}
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        portfolioData: state.portfolioReducer,
        isExecuting: state.portfolioReducer.isExecuting,
        paAnalyzeState_inProgress: state.portfolioReducer.paAnalyzeState_inProgress,
        paAbort_inProgress: state.portfolioReducer.PaAbort_inprogress
    };
};

const mapDispatchToProps = dispatch => ({
    submitForm: () => {
        dispatch(submit('PORTFOLIO_FORM'));
    },
    reset: () => {
        dispatch(reset('PORTFOLIO_FORM'));
    },
    executeStepfunctionRequest: payload => {
        dispatch(executeStepfunctionRequest(payload));
    },
    getInitialValues: payload => {
        dispatch(getInitialValues(payload));
    },
    paAnalyzeRequest: payload => {
        dispatch(paAnalyzeRequest(payload));
    },
    rejectInitialProposal: payload => {
        dispatch(rejectInitialProposal(payload));
    },
    setInitialValues: payload => {
        dispatch(setInitialValues(payload));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PortFolio);
