import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Input, Empty, Spin } from 'antd';
import PropTypes from 'prop-types';

import { history } from '../../redux/store';
import CreateSchemeModal from '../../components/modals/CreateSchemeModal';
import SchemeCardComponent from '../../components/scheme/SchemeCard';

import { doCreateScheme, getSchemes, doUpdateIsFavourite } from '../scheme/actions/schemeActions';
import { getPrimaryRole } from '../../helpers/validateUser';
import NotificationHelper from '../../helpers/NotificationHelper';
import { UserRole } from '../../constants/userConstants';
import TaskNavigator from './TaskNavigator';
import UserManagementContainer from './UserManagement';
import AnalyticsManagementContainer from './analyticsManagement';
import ValuationStatusContainer from './processesStatus';
import { FILE_MANAGEMENT_CLAIM } from './analyticsManagement/constants';
import { requestGetCommonClaims } from './UserManagement/actions';
import { updateSchemeIsFavourite_inProgress } from '../scheme/selectors/schemeSelectors';
import { organizationUMClaims } from '../../config/constants';
import { getTasksCount } from './actions/taskManagerActions';
import { getTaskManagerCount, getTaskManagerTasksCount_InProgress } from './selectors/taskManagerSelectors';

const SCHEME_TYPES = { ACTIVE: 'Active', IN_REGISTRATION: 'In-Registration' };

class DashboardContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchScheme: '',
            showCreateSchemeModal: false,
            schemeType: SCHEME_TYPES.ACTIVE,

            createScheme_inProgress: false,
            createScheme_data: false,
            createScheme_error: null,

            getSchemes_inProgress: false,
            getSchemes_data: null,
            getSchemes_error: null,

            updateSchemeIsFavourite_inProgress: false,
            updateSchemeIsFavourite_data: null,
            updateSchemeIsFavourite_error: null,

            getSchemes_dataClone: [],

            isShowCreateTask: false,
            selectedIndex: 1,

            commonUserClaims: null,
            commonUserClaimIds: null
        };

        this.getSchemes = this.getSchemes.bind(this);
        this.cloneSchemeData = this.cloneSchemeData.bind(this);
        this.handleSearchScheme = this.handleSearchScheme.bind(this);

        this.handleShowCreateSchemeModal = this.handleShowCreateSchemeModal.bind(this);
        this.handleSchemeTab = this.handleSchemeTab.bind(this);
        this.handleSubmitCreateScheme = this.handleSubmitCreateScheme.bind(this);
        this.handleSubmitSchemeIsFavourite = this.handleSubmitSchemeIsFavourite.bind(this);
    }

    componentDidMount() {
        const { email, primaryRole: userType } = this.props.loggedUser;
        this.props.requestGetCommonClaims({ email, userType });
        this.getSchemes();
        this.props.getTasksCount();
    }

    UNSAFE_componentWillReceiveProps(np, nc) {
        if (JSON.stringify(np) === JSON.stringify(this.props)) return;
        const { createScheme_inProgress, getSchemes_inProgress } = this.state;
        if (np.createScheme_inProgress !== null && createScheme_inProgress !== np.createScheme_inProgress) {
            this.setState({ createScheme_inProgress: np.createScheme_inProgress });
        }
        // if (np.createScheme_data !== null) {
        //   this.setState({ createScheme_data: np.createScheme_data }, () => {
        //     NotificationHelper.getInstance().success(np.createScheme_data.message);
        //     this.handleShowCreateSchemeModal();
        //     history.push('/scheme');
        //   });
        // }
        // if (np.createScheme_error) {
        //   this.setState({ createScheme_error: np.createScheme_error }, () => {
        //     NotificationHelper.getInstance().error(np.createScheme_error.message);
        //     this.handleShowCreateSchemeModal();
        //   });
        // }

        if (np.getSchemes_inProgress !== null && getSchemes_inProgress !== np.getSchemes_inProgress) {
            this.setState({ getSchemes_inProgress: np.getSchemes_inProgress });
        }
        if (np.getSchemes_data !== null) {
            this.setState(
                {
                    getSchemes_data: np.getSchemes_data,
                    getSchemes_dataClone: np.getSchemes_data,
                    // schemeType:
                    //     np.getSchemes_data &&
                    //     np.getSchemes_data.activeSchemes &&
                    //     np.getSchemes_data.activeSchemes.length > 0
                    //         ? SCHEME_TYPES.ACTIVE
                    //         : SCHEME_TYPES.IN_REGISTRATION
                },
                () => {
                    this.cloneSchemeData();
                    this.autoDefaultTo(np.getSchemes_data);
                }
            );
        }
        if (np.getSchemes_error) {
            this.setState({ getSchemes_error: np.getSchemes_error }, () => {
                NotificationHelper.getInstance().error(np.getSchemes_error.message);
            });
        }

        if (
            np.updateSchemeIsFavourite_inProgress !== null &&
            updateSchemeIsFavourite_inProgress !== np.updateSchemeIsFavourite_inProgress
        ) {
            this.setState({ updateSchemeIsFavourite_inProgress: np.updateSchemeIsFavourite_inProgress });
        }
        // if (np.updateSchemeIsFavourite_data !== null) {
        //   this.setState({ updateSchemeIsFavourite_data: np.updateSchemeIsFavourite_data }, () => {
        //     NotificationHelper.getInstance().success(np.updateSchemeIsFavourite_data.message);
        //     this.getSchemes();
        //   });
        // }
        // if (np.updateSchemeIsFavourite_error) {
        //   this.setState({ updateSchemeIsFavourite_error: np.updateSchemeIsFavourite_error }, () => {
        //     NotificationHelper.getInstance().error(np.updateSchemeIsFavourite_error.message);
        //   });
        // }
    }

    autoDefaultTo(schemes) {
        if (!schemes) return;
        let activeFavSchemes = schemes.activeSchemes.filter(scheme => scheme.isFavorite);
        let regFavSchemes = schemes.inProgressSchemes.filter(scheme => !scheme.isFavorite);
        if (!activeFavSchemes.length && !regFavSchemes.length) return;

        if (!activeFavSchemes.length) this.handleSchemeTab(SCHEME_TYPES.IN_REGISTRATION);
    }

    getSchemes() {
        const { email: userEmail, primaryRole: userType, organizationId } = this.props.loggedUser;
        this.props.getSchemes({
            userEmail,
            isFavorite: 'true',
            userType,
            organizationId,
            withAnalytics: true
        });
    }

    handleSchemeTab(schemeType) {
        this.setState({ schemeType, searchScheme: '' }, () => {
            this.cloneSchemeData();
        });
    }

    cloneSchemeData() {
        const { schemeType, getSchemes_data } = this.state;
        let data = [];

        if (getSchemes_data === null) {
            data = [];
        } else if (
            schemeType === SCHEME_TYPES.ACTIVE &&
            getSchemes_data.activeSchemes &&
            getSchemes_data.activeSchemes.length > 0
        ) {
            data = getSchemes_data.activeSchemes;
        } else if (
            schemeType === SCHEME_TYPES.IN_REGISTRATION &&
            getSchemes_data.inProgressSchemes &&
            getSchemes_data.inProgressSchemes.length > 0
        ) {
            data = getSchemes_data.inProgressSchemes;
        }

        this.setState({ getSchemes_dataClone: data, tempSchemes_data: data });
    }

    handleSearchScheme(value) {
        const { tempSchemes_data } = this.state;

        if (!tempSchemes_data || tempSchemes_data.length <= 0) return;

        if (!value) {
            return this.setState({ getSchemes_dataClone: tempSchemes_data, searchScheme: value });
        }

        let results = tempSchemes_data.filter(scheme => scheme.schemeName.match(new RegExp(value, 'ig')));

        if (results.length <= 0) results = [];
        this.setState({ getSchemes_dataClone: results, searchScheme: value });
    }

    handleShowCreateSchemeModal() {
        const { showCreateSchemeModal } = this.state;
        this.setState({ showCreateSchemeModal: !showCreateSchemeModal });
    }

    handleSubmitCreateScheme(formData) {
        const { organizationId } = this.props.loggedUser;
        let hasManagers =
            formData.hasManagers === 'true' ? true : formData.schemeCategory === 'pooledFund' ? true : false;
        // const trusteeType = formData.trusteeType ? formData.trusteeType : 'individual_trustee';
        const schemeUserRole = formData.schemeUserRole ? formData.schemeUserRole : 'other';
        const schemeClassification = 'Unclassified';
        this.props.doCreateScheme(
            { organizationId, ...formData, hasManagers, schemeUserRole, schemeClassification },
            (error, message) => {
                //patch fix
                if (error) {
                    NotificationHelper.getInstance().error(message);
                } else {
                    NotificationHelper.getInstance().success(message);
                    this.handleShowCreateSchemeModal();
                    history.push('/scheme');
                }
            }
        );
    }

    handleSubmitSchemeIsFavourite(scheme) {
        const { updateSchemeIsFavourite_inProgress } = this.state;
        const { email, primaryRole: userType, organizationId } = this.props.loggedUser;
        const { schemeId, schemeName, isFavorite, userEmail } = scheme;

        if (!updateSchemeIsFavourite_inProgress)
            this.props.doUpdateIsFavourite(
                {
                    schemeId,
                    schemeName,
                    organizationId,
                    isFavorite: !isFavorite,
                    userEmail: email,
                    userType:
                        userType === UserRole.GOVERN_USER
                            ? UserRole.GOVERN_USER
                            : userEmail !== email
                            ? UserRole.CONTRIBUTOR
                            : userType
                },
                (error, message) => {
                    if (error) {
                        NotificationHelper.getInstance().error(message);
                    } else {
                        NotificationHelper.getInstance().success(message);
                        this.getSchemes();
                    }
                }
            );
    }

    visibleCreateTask = status => {
        this.setState({
            isShowCreateTask: status
        });
    };

    changeTabs = tabIndex => {
        this.setState({ selectedIndex: tabIndex });
    };

    showUserManagement = () => {
        const { loggedUser } = this.props;
        return getPrimaryRole(loggedUser) !== 'client';
    };

    render() {
        //states from local
        const {
            searchScheme,
            showCreateSchemeModal,
            schemeType,
            createScheme_inProgress,
            getSchemes_inProgress,
            getSchemes_data,
            getSchemes_dataClone,
            selectedIndex
        } = this.state;
        //props from other class
        const { loggedUser, commonUserClaims, getTaskManagerCount, getTaskMgrTasksCount_InProgress } = this.props;

        const claimArray =
            commonUserClaims &&
            organizationUMClaims.filter(function(item) {
                return commonUserClaims.includes(item);
            });

        const favoriteSchemes =
            getSchemes_dataClone.length &&
            getSchemes_dataClone.filter(function(item) {
                return item.isFavorite;
            });

        const hasClaim = commonUserClaims && claimArray && claimArray.length;

        const hasClaim_FM = commonUserClaims && commonUserClaims.includes(FILE_MANAGEMENT_CLAIM);

        return (
            <>
                <div className="dashboard-main-wrap">
                    <div className="dashboard-header clearfix">
                        <div className="container">
                            {this.showUserManagement() && (
                                <div className="list">
                                    <span
                                        className={`list-items ${selectedIndex === 1 && 'active'}`}
                                        onClick={() => this.changeTabs(1)}
                                    >
                                        Dashboard
                                    </span>

                                    <span
                                        className={`list-items ${selectedIndex === 2 && 'active'}`}
                                        onClick={() => this.changeTabs(2)}
                                    >
                                        User Management
                                    </span>

                                    {hasClaim_FM && (
                                        <span
                                            className={`list-items ${selectedIndex === 3 && 'active'}`}
                                            onClick={() => this.changeTabs(3)}
                                        >
                                            File Management
                                        </span>
                                    )}
                                    {hasClaim_FM && (
                                        <span
                                        className={`list-items ${selectedIndex === 4 && 'active'}`}
                                        onClick={() => this.changeTabs(4)}
                                        >
                                        Analytical Processes
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="my-navigator-wrap">
                        <div className="container">
                            {selectedIndex === 1 ? (
                                <Row gutter={20} className="scheme-row">
                                    <Col xl={16} lg={16} xs={24} className="navigator-column">
                                        <div className="card mt-45">
                                            <div className="card-header">
                                                <div className="heading-row">
                                                    <div className="pull-left div-left">
                                                        <h4 className="title">Your Favourite Schemes</h4>
                                                    </div>
                                                    <div className="pull-right text-right div-right">
                                                        <div className="header-content">
                                                            <Input.Search
                                                                prefix={<span />}
                                                                suffix={<span />}
                                                                value={searchScheme}
                                                                className="input-search"
                                                                placeholder="Search"
                                                                onChange={e => {
                                                                    this.handleSearchScheme(e.target.value);
                                                                }}
                                                            ></Input.Search>
                                                            <button
                                                                className="btn-create btn-green"
                                                                onClick={this.handleShowCreateSchemeModal}
                                                            >
                                                                {' '}
                                                                <i className="fa fa-plus fa-icon"></i>Create Scheme{' '}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <div className="detail-div clearfix">
                                                    {schemeType === 'In-Registration' && (
                                                        <div className="pull-left">
                                                            <div className="icon-details">
                                                                <div className="inline-div">
                                                                    <span className="dot orange-dot" />
                                                                    Pending
                                                                </div>
                                                                <div className="inline-div">
                                                                    <span className="dot grey-dot" />
                                                                    Underway-Scheme
                                                                </div>
                                                                <div className="inline-div">
                                                                    <span className="dot blue-dot" />
                                                                    Underway-LGIM
                                                                </div>
                                                                <div className="inline-div">
                                                                    <span className="dot green-dot" />
                                                                    Completed
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    <div className="pull-right text-right menu-items">
                                                        <span
                                                            className={`menu ${schemeType === 'Active' && 'active'}`}
                                                            onClick={() => {
                                                                this.handleSchemeTab('Active');
                                                            }}
                                                        >
                                                            Active
                                                        </span>
                                                        <span
                                                            className={`menu ${schemeType === 'In-Registration' &&
                                                                'active'}`}
                                                            onClick={() => {
                                                                this.handleSchemeTab('In-Registration');
                                                            }}
                                                        >
                                                            In-registration
                                                        </span>
                                                    </div>
                                                </div>
                                                <Row
                                                    gutter={20}
                                                    className={
                                                        getSchemes_inProgress ||
                                                        (favoriteSchemes && favoriteSchemes.length <= 0)
                                                            ? 'full-height-div'
                                                            : ''
                                                    }
                                                >
                                                    {getSchemes_inProgress ? (
                                                        <div className="loading-div">
                                                            <Spin className="text-center" />
                                                        </div>
                                                    ) : favoriteSchemes && favoriteSchemes.length > 0 ? (
                                                        favoriteSchemes.map((scheme, sKey) =>
                                                            scheme.isFavorite ? (
                                                                <SchemeCardComponent
                                                                    type={schemeType}
                                                                    scheme={scheme}
                                                                    updateIsFavourite={
                                                                        this.handleSubmitSchemeIsFavourite
                                                                    }
                                                                    key={sKey}
                                                                />
                                                            ) : null
                                                        )
                                                    ) : (
                                                        <Empty
                                                            description={
                                                                <span>
                                                                    Schemes selected as "Favourite" will appear here
                                                                    <br />( Click{' '}
                                                                    <i className="fa fa-icon fa-star-o"></i> in schemes
                                                                    to select )
                                                                </span>
                                                            }
                                                        />
                                                    )}
                                                </Row>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xl={8} lg={8} xs={24} className="navigator-column">
                                        <TaskNavigator
                                            loggedUser={loggedUser}
                                            getTaskManagerCount={getTaskManagerCount}
                                            loading={getTaskMgrTasksCount_InProgress}
                                            history={this.props.history}
                                        />
                                    </Col>
                                </Row>
                            ) : selectedIndex === 2 ? (
                                <UserManagementContainer loggedUser={loggedUser} hasClaim={hasClaim} />
                            ) : selectedIndex === 3 ? (
                                <AnalyticsManagementContainer loggedUser={loggedUser} schemes={getSchemes_data} />
                            ) : (
                                <ValuationStatusContainer loggedUser={loggedUser} schemes={getSchemes_data} />
                            )}
                        </div>
                    </div>
                </div>
                {showCreateSchemeModal && (
                    <CreateSchemeModal
                        show={showCreateSchemeModal}
                        inProgress={createScheme_inProgress}
                        handleShow={this.handleShowCreateSchemeModal}
                        handleSubmit={this.handleSubmitCreateScheme}
                    />
                )}
            </>
        );
    }
}

DashboardContainer.propTypes = {
    createScheme_inProgress: PropTypes.bool,
    createScheme_data: PropTypes.object,
    createScheme_error: PropTypes.object,

    getSchemes_inProgress: PropTypes.bool,
    getSchemes_data: PropTypes.object,
    getSchemes_error: PropTypes.object,
    updateSchemeIsFavourite_inProgress: PropTypes.bool,
    updateSchemeIsFavourite_data: PropTypes.object,
    updateSchemeIsFavourite_error: PropTypes.object
};
DashboardContainer.defaultProps = {
    createScheme_inProgress: false,
    createScheme_data: null,
    createScheme_error: null,

    getSchemes_inProgress: false,
    getSchemes_data: null,
    getSchemes_error: null,

    updateSchemeIsFavourite_inProgress: false,
    updateSchemeIsFavourite_data: null,
    updateSchemeIsFavourite_error: null
};

const mapStateToProps = state => ({
    createScheme_inProgress: state.schemeReducer.createScheme_inProgress,
    createScheme_data: state.schemeReducer.createScheme_data,
    createScheme_error: state.schemeReducer.createScheme_error,

    getSchemes_inProgress: state.schemeReducer.getSchemes_inProgress,
    getSchemes_data: state.schemeReducer.getSchemes_data,
    getSchemes_error: state.schemeReducer.getSchemes_error,

    updateSchemeIsFavourite_inProgress: state.schemeReducer.updateSchemeIsFavourite_inProgress,
    updateSchemeIsFavourite_data: state.schemeReducer.updateSchemeIsFavourite_data,
    updateSchemeIsFavourite_error: state.schemeReducer.updateSchemeIsFavourite_error,

    commonUserClaims: state.lgimUserManagementReducer.commonUserClaims,
    getTaskManagerCount: getTaskManagerCount()(state),
    getTaskMgrTasksCount_InProgress: getTaskManagerTasksCount_InProgress()(state)
});

const mapDispatchToProps = dispatch => ({
    doCreateScheme: (payload, callback) => {
        dispatch(doCreateScheme(payload, callback));
    },
    getSchemes: payload => {
        dispatch(getSchemes(payload));
    },
    doUpdateIsFavourite: (payload, callback) => {
        dispatch(doUpdateIsFavourite(payload, callback));
    },
    requestGetCommonClaims: payload => {
        dispatch(requestGetCommonClaims(payload));
    },
    getTasksCount: () => {
        dispatch(getTasksCount());
    }
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardContainer);
