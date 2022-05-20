import React, { Suspense, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { Spin } from 'antd';
import _ from 'lodash';
import Loading from 'components/Loading';

import { history } from '../../redux/store';
import UtilsHelper from '../../helpers/UtilsHelper';
import NotificationHelper from '../../helpers/NotificationHelper';

import { setSchemeData, setSchemeContributors } from './actions/schemeOptionActions';
import { requestGetClaimsForLoggedUser } from './userManagement/actions';
import { getScheme } from '../scheme/actions/schemeActions';
import { getContributors } from './userManagement/actions';

import api from '../../middlewares/connectApi';

import { getScheme_inProgress, getScheme_data, getScheme_error } from '../scheme/selectors/schemeSelectors';
import {
    getLoggedUserClaims_data,
    getContributors_inProgress,
    getContributors_data,
    getContributors_error
} from './userManagement/selector';
import {
    USER_MANAGEMENT_TAB_INFORMATION,
    USER_MANAGEMENT_TAB_USER_MANAGEMENT,
    USER_MANAGEMENT_TAB_DASHBOARD,
    PORTFOLIO_ANALYZER_TAB,
    USER_MANAGEMENT_TAB_UPDATES
} from '../../config/constants';
import { STEP_FUNC_CONFIG } from './constants/schemeOptionConstants';

const retry = UtilsHelper.getInstance().retry;

// lazy load tab components
const Dashboard = React.lazy(() => retry(() => import('./charts/dashboard')));
const UserManagementContainer = React.lazy(() => retry(() => import('./userManagement')));
const InformationContainer = React.lazy(() => retry(() => import('./informations')));
const Updates = React.lazy(() => retry(() => import('./updates')));
const PortfolioAnalyzerContainer = React.lazy(() => retry(() => import('../schemeOptions/charts/portfolioBuilder')));

class SchemeOptionsContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            path: '',
            tabs: [],

            getScheme_inProgress: false,
            getScheme_data: null,
            getScheme_error: null,

            getContributors_inProgress: false,
            getContributors_data: [],
            getContributors_error: null,

            getLoggedUserClaims_data: null,

            showPortFolioTab: false,
            workflowKey: 'registration',
            workflowStep: null,
            workflows: null
        };

        this.updateSelectedTab = this.updateSelectedTab.bind(this);
        this.handleChangeContainer = this.handleChangeContainer.bind(this);
        this.getSchemeDetails = this.getSchemeDetails.bind(this);
    }

    componentDidMount() {
        const { schemeId } = this.props.match.params;
        const userEmail = this.props.loggedUser ? this.props.loggedUser.email : null;
        if (schemeId) this.props.requestGetClaimsForLoggedUser({ schemeId, userEmail });
    }

    componentWillUnmount() {
        this.props.setSchemeData(null);
        this.props.setSchemeContributors([]);
    }

    UNSAFE_componentWillMount() {
        this.getSchemeDetails();
    }

    UNSAFE_componentWillReceiveProps(np, nc) {
        if (JSON.stringify(np) === JSON.stringify(this.props)) return;

        const { getScheme_inProgress, getContributors_inProgress, getScheme_data } = this.state;
        if (np.getScheme_inProgress !== null && getScheme_inProgress !== np.getSchemes_inProgress) {
            this.setState({ getSchemes_inProgress: np.getSchemes_inProgress });
        }
        if (np.getScheme_data !== null && JSON.stringify(np.getScheme_data) !== JSON.stringify(getScheme_data)) {
            if (np.getScheme_data.status === 'D') {
                history.replace('/scheme');
                return;
            }
            this.setState({ getScheme_data: np.getScheme_data }, () => {
                this.props.setSchemeData(np.getScheme_data);
                this.props.getContributors({
                    schemeId: np.getScheme_data.schemeId,
                    userEmail: np.getScheme_data.userEmail
                });

                const { params } = this.props.match;
                const uri = `/scheme/options/${params.container}/`;
                this.handleChangeContainer(uri);
            });
        }
        if (np.getScheme_error) {
            this.setState({ getScheme_error: np.getScheme_error }, () => {
                NotificationHelper.getInstance().error(np.getScheme_error.message);
                history.goBack();
            });
        }

        if (np.getContributors_inProgress !== null && getContributors_inProgress !== np.getContributors_inProgress) {
            this.setState({ getContributors_inProgress: np.getContributors_inProgress });
        }
        if (np.getContributors_data !== null) {
            this.setState({ getContributors_data: np.getContributors_data }, () => {
                this.props.setSchemeContributors(np.getContributors_data);
            });
        }
        if (np.getContributors_error) {
            this.setState({ getContributors_error: np.getContributors_error }, () => {
                NotificationHelper.getInstance().error(np.getContributors_error.message);
            });
        }

        if (np.getLoggedUserClaims_data !== null) {
            this.setState({ getLoggedUserClaims_data: np.getLoggedUserClaims_data });
        }
    }

    updateSelectedTab() {
        const { path, getScheme_data } = this.state;

        const tabs = [
            {
                name: USER_MANAGEMENT_TAB_INFORMATION,
                active: UtilsHelper.getInstance().matchRuleShort(path, '/scheme/options/information/*'),
                uri: `/scheme/options/information/`
            }
        ];

        tabs.push({
            name: USER_MANAGEMENT_TAB_UPDATES,
            active: UtilsHelper.getInstance().matchRuleShort(path, '/scheme/options/active-workflow/*'),
            uri: `/scheme/options/active-workflow/`
        });

        if (!getScheme_data.transitionStatus && getScheme_data.status === 'A') {
            tabs.push({
                name: USER_MANAGEMENT_TAB_DASHBOARD,
                active: UtilsHelper.getInstance().matchRuleShort(path, '/scheme/options/dashboard/*'),
                uri: `/scheme/options/dashboard/`
            });
        }

        tabs.push({
            name: USER_MANAGEMENT_TAB_USER_MANAGEMENT,
            active: UtilsHelper.getInstance().matchRuleShort(path, '/scheme/options/user-management/*'),
            uri: `/scheme/options/user-management/`
        });

        tabs.push({
            name: PORTFOLIO_ANALYZER_TAB,
            active: UtilsHelper.getInstance().matchRuleShort(path, '/scheme/options/portfolio-builder/*'),
            uri: `/scheme/options/portfolio-builder/`
        });

        this.setState({ tabs });
    }

    async handleChangeContainer(uri) {
        const { params } = this.props.match;
        const { getScheme_data, workflowStep, workflowKey } = this.state;
        const path = `/scheme/options/${params.container}/`;

        if (uri === `/scheme/options/portfolio-builder/` && workflowStep && workflowKey) {
            const Obj = STEP_FUNC_CONFIG[`${workflowKey}_${workflowStep}`];

            const { data: result = {} } = await api.getStepFunctionStatus({
                schemeId: getScheme_data.schemeId,
                step: Obj.step ? Obj.step : null,
                functionName: Obj.function
            });

            if (!_.get(result, 'content.complete'))
                return NotificationHelper.getInstance().error('Data generation is not completed.');
        }

        if (uri == `/scheme/options/information/`) {
            this.getSchemeDetails();
        }

        const _uri = `${uri}${getScheme_data.schemeId}/${getScheme_data.schemeName}${this.props.location.search}`;
        if (path !== _uri) history.replace(_uri);

        this.setState({ path: uri }, () => {
            this.updateSelectedTab();
        });
    }

    getSchemeDetails() {
        const { getScheme } = this.props;
        const { params } = this.props.match;
        getScheme({ schemeId: params.schemeId });
    }

    isProtfolioAvailable = workflows => {
        console.log('workflows', workflows);
        const { getScheme_data } = this.state;

        let enablePortFolio = false;
        let workflowStep = null;
        let workflowKey = null;

        if (!getScheme_data || !workflows) return;

        const paEnableData = workflows.find(workflow => workflow.isPortFolioEnable && workflow.paEnableSection);

        if (paEnableData) {
            enablePortFolio = true;
            workflowStep = paEnableData.paEnableSection;
            workflowKey = paEnableData.workflowKey;
        }

        this.setState({
            showPortFolioTab: enablePortFolio,
            workflowStep,
            workflowKey,
            workflows
        });
    };

    render() {
        const {
            tabs,
            getScheme_inProgress,
            getScheme_data,
            getLoggedUserClaims_data,
            workflowKey,
            workflowStep,
            workflows,
            showPortFolioTab
        } = this.state;

        const { schemeId } = this.props.match.params;
        const { loggedUser, artifacts } = this.props;

        return (
            <section className="active-scheme-options">
                {getScheme_inProgress || !getScheme_data ? (
                    <div className="empty-container">
                        <Spin />
                    </div>
                ) : getScheme_data ? (
                    <>
                        <div className="header clearfix">
                            <div className="container">
                                <div className="div-back">
                                    <span
                                        className="back-text"
                                        onClick={() => {
                                            history.goBack();
                                        }}
                                    >
                                        <i className="fa fa-chevron-left fa-icon"></i>Back
                                    </span>
                                    <span className="user-name">{getScheme_data.schemeName}</span>
                                </div>
                                <div className="list">
                                    {tabs.map((tab, tKey) => {
                                        if (tab.name === PORTFOLIO_ANALYZER_TAB && !showPortFolioTab) {
                                        } else {
                                            return (
                                                <span
                                                    className={`list-items ${tab.active ? 'active' : ''}`}
                                                    key={tKey}
                                                    onClick={() => {
                                                        this.handleChangeContainer(tab.uri);
                                                    }}
                                                >
                                                    {tab.name}
                                                </span>
                                            );
                                        }
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="content clearfix">
                            <div className="container">
                                <Suspense fallback={<Loading />}>
                                    {tabs.map((tab, tKey) =>
                                        tab.name === USER_MANAGEMENT_TAB_DASHBOARD && tab.active ? (
                                            <Dashboard
                                                key={tKey}
                                                getScheme_data={getScheme_data}
                                                schemeId={getScheme_data.schemeId}
                                                schemeName={getScheme_data.schemeName}
                                                loggedUser={loggedUser}
                                                active_code={
                                                    getScheme_data.activationCode ? getScheme_data.activationCode : null
                                                }
                                            />
                                        ) : tab.name === USER_MANAGEMENT_TAB_USER_MANAGEMENT && tab.active ? (
                                            <UserManagementContainer
                                                schemeId={schemeId}
                                                schemeName={getScheme_data.schemeName}
                                                loggedUser={loggedUser}
                                                key={tKey}
                                                getLoggedUserClaims_data={getLoggedUserClaims_data}
                                            />
                                        ) : tab.name === USER_MANAGEMENT_TAB_INFORMATION && tab.active ? (
                                            <InformationContainer
                                                key={tKey}
                                                loggedUser={this.props.loggedUser}
                                                // registration={getWorkflowData}
                                                schemeId={schemeId}
                                            />
                                        ) : tab.name === USER_MANAGEMENT_TAB_UPDATES && tab.active ? (
                                            <Updates
                                                key={tKey}
                                                schemeId={schemeId}
                                                loggedUser={loggedUser}
                                                schemeName={getScheme_data.schemeName}
                                                schemeType={getScheme_data.trusteeType}
                                                schemeData={getScheme_data}
                                                handleChangeContainer={this.handleChangeContainer}
                                                getLoggedUserClaims_data={getLoggedUserClaims_data}
                                                artifacts={artifacts}
                                                fetchedWorkFlowTriggerFunction={this.isProtfolioAvailable}
                                            />
                                        ) : tab.name === PORTFOLIO_ANALYZER_TAB && tab.active ? (
                                            <PortfolioAnalyzerContainer
                                                key={tKey}
                                                schemeId={schemeId}
                                                loggedUser={loggedUser}
                                                schemeName={getScheme_data.schemeName}
                                                schemeType={getScheme_data.trusteeType}
                                                schemeData={getScheme_data}
                                                workFlow={workflowKey}
                                                workFlowStep={workflowStep}
                                                isProtfolioAvailable={this.isProtfolioAvailable}
                                                workflows={workflows}
                                                showPortFolioTab={showPortFolioTab}
                                                handleChangeContainer={this.handleChangeContainer}
                                            />
                                        ) : null
                                    )}
                                </Suspense>
                            </div>
                        </div>
                    </>
                ) : null}
            </section>
        );
    }
}

SchemeOptionsContainer.propTypes = {
    getScheme_inProgress: PropTypes.bool,
    getScheme_data: PropTypes.object,
    getScheme_error: PropTypes.object,

    getContributors_inProgress: PropTypes.bool,
    getContributors_data: PropTypes.array,
    getContributors_error: PropTypes.object
};

SchemeOptionsContainer.defaultProps = {
    getScheme_inProgress: false,
    getScheme_data: null,
    getScheme_error: null,

    getContributors_inProgress: false,
    getContributors_data: [],
    getContributors_error: null
};

const mapStateToProps = createStructuredSelector({
    getScheme_inProgress: getScheme_inProgress(),
    getScheme_data: getScheme_data(),
    getScheme_error: getScheme_error(),

    getContributors_inProgress: getContributors_inProgress(),
    getContributors_data: getContributors_data(),
    getContributors_error: getContributors_error(),
    getLoggedUserClaims_data: getLoggedUserClaims_data()
});

const mapDispatchToProps = dispatch => ({
    getScheme: data => {
        dispatch(getScheme(data));
    },
    setSchemeData: data => {
        dispatch(setSchemeData(data));
    },
    getContributors: payload => {
        dispatch(getContributors(payload));
    },
    setSchemeContributors: payload => {
        dispatch(setSchemeContributors(payload));
    },
    requestGetClaimsForLoggedUser: payload => {
        dispatch(requestGetClaimsForLoggedUser(payload));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SchemeOptionsContainer);
