import _, { values } from 'lodash';
import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { Row, Input, DatePicker, Checkbox, Button, Select, Col, Typography, Tooltip } from 'antd';

import CreateSchemeModal from '../../components/modals/CreateSchemeModal';
import InputFlagConfirmModel from '../../components/modals/InputFlagConfirmModel.js';
import SchemeTable from '../../components/scheme/SchemeTable';
import { doCreateScheme, getSchemes, doUpdateIsFavourite, doUpdateSchemeFlag } from '../scheme/actions/schemeActions';
import {
    filterSchemes,
    getKeyMetricsConfig,
    getMyViews,
    getMyCurrentAppliedView,
    removeMyCurrentAppliedView,
    getMyDefaultOrgGroups,
    schemeDataChange
} from '../../containers/scheme/keyMetrics/actions/keyMetricsActions';

import { getChartDateList } from '../schemeOptions/charts/actions';
import { DownOutlined } from '@ant-design/icons';
import filterIconEnable from '../../assets/images/scheme/key-metrics/filterEnabled.svg';
import filterIconDisable from '../../assets/images/scheme/key-metrics/filterDisabled.svg';
import clearEnabled from '../../assets/images/scheme/key-metrics/clearEnabled.svg';
import {
    createScheme_inProgress,
    createScheme_data,
    createScheme_error,
    getSchemes_inProgress,
    getSchemes_data,
    getSchemes_error,
    updateSchemeIsFavourite_inProgress,
    updateSchemeIsFavourite_data,
    updateSchemeIsFavourite_error,
    getUpdateSchemeFlag_inProgress
} from '../scheme/selectors/schemeSelectors';
import {
    filterSchemes_data,
    filterSchemes_inProgress,
    getKeyMetricsConfig_data,
    getMyCurrentAppliedView_data,
    getMyCurrentAppliedView_inProgress,
    removeMyCurrentAppliedView_inProgress,
    getKeyMetricsConfig_inProgress,
    getMyViews_inProgress,
    getMyDefaultOrgGroups_inProgress
} from '../../containers/scheme/keyMetrics/selectors/keyMetricsSelectors';

import { getChartDateListFromRedux } from '../schemeOptions/charts/selectors';

import NotificationHelper from '../../helpers/NotificationHelper';

import { SCHEME_SELECTIN_TYPE_ALL } from '../../config/constants';
import { UserRole } from '../../constants/userConstants';
import AwsIotSingleton from '../../helpers/awsIot';
import { validateGovernUser } from '../../helpers/validateUser';
import { requestGetCommonClaims } from '../dashboard/UserManagement/actions';
import ExcelWorkbook from '../../UILibrary/helpers/ExcelWorkbook';
import { saveAs } from 'file-saver';
import { csvFormatHook } from './download/dataHook';
import FilterModel from '../../components/modals/FilterModel';
import Filter from '../../components/scheme/filter';
import clear from '../../assets/images/scheme/key-metrics/clearDisabled.svg';
import { DEFAULT_VALUE } from '../../constants/keyMetricsConstants';

export const IOT_TYPES = {
    SCHEMES_REFRESH: 'SCHEMES_REFRESH'
};

class SchemeContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showCreateSchemeModal: false,
            showFilterSchemeModal: false,
            showInputFlagConfirmModal: false,
            flagName: null,
            flagValue: null,
            flagChangedSchemeId: null,
            flagChangedSchemeName: null,

            createScheme_inProgress: false,
            createScheme_data: false,
            createScheme_error: null,

            getSchemes_inProgress: true,
            getSchemes_data: null,
            getSchemes_error: null,

            updateSchemeIsFavourite_inProgress: false,
            updateSchemeIsFavourite_data: null,
            updateSchemeIsFavourite_error: null,

            getSchemes_dataClone: {
                active: [],
                inRegistration: []
            },
            latest: true,
            searchValueActive: '',
            searchValueReg: '',
            dateList: [],
            searchedSchemes: [],
            searchedvalue: null,

            filterSchemes_inProgress: false,
            filterSchemes_data: [],
            filterSchemes_error: null,

            getKeyMetricsConfig_data: null,

            selectedView: null,
            filterData: null,
            showMore: false,
            selectedUserType: null,

            pageSize: 10,

            selectedValuationDate: null
        };
        this.elementRef = React.createRef(null);

        this.getSchemes = this.getSchemes.bind(this);
        this.getKeyMetricsConfig = this.getKeyMetricsConfig.bind(this);
        this.filterSchemes = this.filterSchemes.bind(this);
        this.cloneSchemeData = this.cloneSchemeData.bind(this);
        this.handleSearchScheme = this.handleSearchScheme.bind(this);

        this.handleShowCreateSchemeModal = this.handleShowCreateSchemeModal.bind(this);
        this.handleShowInputFlagConfirmModal = this.handleShowInputFlagConfirmModal.bind(this);
        this.handleSubmitCreateScheme = this.handleSubmitCreateScheme.bind(this);
        this.handleSubmitSchemeIsFavourite = this.handleSubmitSchemeIsFavourite.bind(this);
        this.updateSchemeFlag = this.updateSchemeFlag.bind(this);
        this.handleSubmitInputFlag = this.handleSubmitInputFlag.bind(this);
        this.dateChange = this.dateChange.bind(this);
        this.download = this.download.bind(this);
        this.handleShowFilterSchemeModal = this.handleShowFilterSchemeModal.bind(this);

        this.setSelectedViewCb = this.setSelectedViewCb.bind(this);
        this.setFilterDataCb = this.setFilterDataCb.bind(this);
        this.handleSelectedViewRemove = this.handleSelectedViewRemove.bind(this);
        this.setHandleShowModel = this.setHandleShowModel.bind(this);
        this.setSelectedUserTypeCb = this.setSelectedUserTypeCb.bind(this);
        this.setSelectedValuationDate = this.setSelectedValuationDate.bind(this);
        this.setSearchedValue = this.setSearchedValue.bind(this);
        this.handleSchemeDataChange = this.handleSchemeDataChange.bind(this);
    }

    componentDidMount() {
        const { email, rimaryRole: userType } = this.props.loggedUser;
        this.props.getChartDateList();
        this.getKeyMetricsConfig();

        this.getMyCurrentAppliedView();
        this.filterSchemes({ all: true });
        this.setState({ selectedUserType: this.props.loggedUser.primaryRole });

        this.setState({ latest: true });

        AwsIotSingleton.getPayloadFromSocket(`/${email}/me`, message => {
            let {
                payload: { type }
            } = message;
            if (type === IOT_TYPES.SCHEMES_REFRESH) {
                this.getSchemes();
            }
        });
        //refresh scheme list when new scheme is added
        if (validateGovernUser(this.props.loggedUser))
            AwsIotSingleton.getPayloadFromSocket('/schemes', message => {
                let {
                    payload: { type }
                } = message;
                if (type === IOT_TYPES.SCHEMES_REFRESH) {
                    this.getSchemes();
                }
            });

        //fetch common user claims
        this.props.requestGetCommonClaims({ email, userType });
    }

    componentWillUnmount() {
        const { email } = this.props.loggedUser;
        AwsIotSingleton.unsubscribeSocket(`/${email}/me`);
        if (validateGovernUser(this.props.loggedUser)) AwsIotSingleton.unsubscribeSocket(`/schemes`);
    }

    UNSAFE_componentWillReceiveProps(np, nc) {
        console.log('-- np --', np);
        console.log('-- nc --', nc);
        const {
            createScheme_inProgress,
            getSchemes_inProgress,
            updateSchemeIsFavourite_inProgress,
            filterSchemes_inProgress
        } = this.state;

        if (
            (!np.dateList || np.dateList.length === 0) &&
            np.getChartDateListFromRedux &&
            np.getChartDateListFromRedux.length > 0
        ) {
            const convertedDateList = [];
            for (const dt of np.getChartDateListFromRedux) {
                let date = new Date(0, 0, _.get(dt, '0000.LGIM_ValDates') - 1, 0, -new Date(0).getTimezoneOffset(), 0);
                convertedDateList.push(moment(date));
            }

            if (convertedDateList.length && convertedDateList[0] && convertedDateList[convertedDateList.length - 1]) {
                this.setState({
                    startDate: convertedDateList[0],
                    endDate: convertedDateList[convertedDateList.length - 1],
                    dateList: convertedDateList
                });
            }
        }

        if (JSON.stringify(np) === JSON.stringify(this.props)) return;
        if (np.createScheme_inProgress !== null && createScheme_inProgress !== np.createScheme_inProgress) {
            this.setState({ createScheme_inProgress: np.createScheme_inProgress });
        }

        if (np.getSchemes_inProgress !== null && getSchemes_inProgress !== np.getSchemes_inProgress) {
            this.setState({ getSchemes_inProgress: np.getSchemes_inProgress });
        }
        if (np.getSchemes_data !== null) {
            this.setState({ getSchemes_data: np.getSchemes_data }, () => {
                this.cloneSchemeData();
            });
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

        if (np.filterSchemes_inProgress !== null && filterSchemes_inProgress !== np.filterSchemes_inProgress) {
            this.setState({ filterSchemes_inProgress: np.filterSchemes_inProgress });
        }

        if (np.filterSchemes_data !== null) {
            this.setState({ filterSchemes_data: np.filterSchemes_data }, () => {
                this.handleSearchScheme(this.state.searchedvalue);
            });
        }

        if (np.getMyCurrentAppliedView_data !== null) {
            if (!this.state.filterData && !this.state.selectedView) {
                this.setState({
                    selectedView: np.getMyCurrentAppliedView_data.view,
                    selectedUserType: np.getMyCurrentAppliedView_data.view.associatedRole
                        ? np.getMyCurrentAppliedView_data.view.associatedRole
                        : 'custom',
                    filterData: np.getMyCurrentAppliedView_data.view.view.columns
                });
                if (np.getMyCurrentAppliedView_data.view.associatedRole) {
                    this.getMyViews({ userType: np.getMyCurrentAppliedView_data.view.associatedRole });
                    this.getKeyMetricsConfig({ userType: np.getMyCurrentAppliedView_data.view.associatedRole });
                    this.doGetMyDefaultOrgGroups({ organizationId: this.props.loggedUser.organizationId });
                } else {
                    this.getMyViews();
                    this.getKeyMetricsConfig();
                }
                if (!this.state.filterData && !this.state.selectedView) {
                    this.filterSchemes({
                        columns: np.getMyCurrentAppliedView_data.view.view.columns,
                        valuationDate: this.state.selectedValuationDate
                    });
                }
            }
        }

        // if (np.filterSchemes_error !== null) {
        //     this.setState({ filterSchemes_error: np.filterSchemes_error }, () => {
        //         NotificationHelper.getInstance().error(np.filterSchemes_error.message);
        //     });
        // }
    }

    getSchemes(valuationDate) {
        const { email: userEmail, primaryRole: userType, organizationId } = this.props.loggedUser;
        this.props.getSchemes({
            userEmail,
            userType,
            organizationId,
            isFavorite: SCHEME_SELECTIN_TYPE_ALL,
            withContributeSchemes: true,
            withAnalytics: true,
            valuationDate
        });
    }

    getKeyMetricsConfig(payload = null) {
        this.props.doGetKeyMetricsConfig(payload);
    }

    filterSchemes(payload) {
        this.props.doFilterSchemes(payload);
    }

    getMyViews(payload) {
        this.props.doGetMyViews(payload);
    }

    getMyCurrentAppliedView() {
        this.props.doGetMyCurrentAppliedView();
    }

    removeMyCurrentAppliedView() {
        this.props.doRemoveMyCurrentAppliedView();
    }

    doGetMyDefaultOrgGroups(payload) {
        this.props.doGetMyDefaultOrgGroups(payload);
    }

    cloneSchemeData() {
        const { getSchemes_data } = this.state;
        const getSchemes_dataClone = {
            active: [],
            inRegistration: []
        };
        if (getSchemes_data === null) return;

        if (getSchemes_data.activeSchemes && getSchemes_data.activeSchemes.length > 0) {
            getSchemes_dataClone.active = getSchemes_data.activeSchemes;
        }

        if (getSchemes_data.inProgressSchemes && getSchemes_data.inProgressSchemes.length > 0) {
            getSchemes_dataClone.inRegistration = getSchemes_data.inProgressSchemes;
        }

        this.setState({ getSchemes_dataClone, tempSchemes_data: getSchemes_dataClone }, () => {
            this.state.searchValueActive && this.handleSearchScheme('active', this.state.searchValueActive);
            this.state.searchValueReg && this.handleSearchScheme('inRegistration', this.state.searchValueReg);
        });
    }

    // handleSearchScheme(type, value) {
    //     const { tempSchemes_data } = this.state;
    //     if (!tempSchemes_data) return;
    //     const dataList = tempSchemes_data[type];

    //     if (!dataList || dataList.length <= 0) return;

    //     if (!value || value === '') {
    //         return this.setState({ getSchemes_dataClone: tempSchemes_data });
    //     }

    //     let results = dataList.filter(scheme => scheme.schemeName.match(new RegExp(value, 'ig')));

    //     if (results.length <= 0) results = [];
    //     this.setState({ getSchemes_dataClone: { ...tempSchemes_data, [type]: results } });
    //     this.setState(type === 'active' ? { searchValueActive: value } : { searchValueReg: value });
    // }

    handleSearchScheme(value) {
        const { filterSchemes_data } = this.state;
        this.setState({ searchedvalue: value });

        if (!value || value === ' ') {
            this.setState({ filterSchemes_data: this.props.filterSchemes_data });
            this.setState({ searchedSchemes: [] });
            return;
        }
        if (!filterSchemes_data || filterSchemes_data.length <= 0) return;
        let results = filterSchemes_data.filter(s => s.schemeName.match(new RegExp(value, 'ig')));

        if (results.length <= 0) results = [];
        this.setState({ searchedSchemes: results });
    }

    handleShowCreateSchemeModal() {
        const { showCreateSchemeModal } = this.state;
        this.setState({ showCreateSchemeModal: !showCreateSchemeModal });
    }

    handleShowFilterSchemeModal() {
        const { showFilterSchemeModal } = this.state;
        this.setState({ showFilterSchemeModal: !showFilterSchemeModal });
        this.setState({ showMore: false });
    }
    handleSubmitCreateScheme(formData) {
        const { organizationId } = this.props.loggedUser;
        let hasManagers =
            formData.hasManagers === 'true' ? true : formData.schemeCategory === 'pooledFund' ? true : false;
        // const trusteeType = formData.trusteeType ? formData.trusteeType : 'individual_trustee';
        const schemeUserRole = formData.schemeUserRole ? formData.schemeUserRole : 'other';
        const schemeClassification = 'Unclassified';
        this.props.doCreateScheme(
            {
                organizationId,
                ...formData,
                hasManagers,
                schemeUserRole,
                schemeClassification,
                selectedView: this.state.selectedView,
                filterData: this.state.filterData
            },
            (error, message) => {
                //when scheme created: patch fix
                if (error) {
                    NotificationHelper.getInstance().error(message);
                } else {
                    NotificationHelper.getInstance().success(message);
                    this.handleShowCreateSchemeModal();
                    this.getSchemes();
                }
            }
        );
    }

    handleSubmitSchemeIsFavourite(scheme) {
        const { updateSchemeIsFavourite_inProgress, filterData, selectedValuationDate } = this.state;
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
                            : userType,
                    columns: filterData,
                    valuationDate: selectedValuationDate
                },
                (error, message) => {
                    if (error) {
                        NotificationHelper.getInstance().error(message);
                    } else {
                        NotificationHelper.getInstance().success(message);
                    }

                    this.getSchemes();
                }
            );
    }

    handleShowInputFlagConfirmModal() {
        const { showInputFlagConfirmModal } = this.state;
        this.setState({ showInputFlagConfirmModal: !showInputFlagConfirmModal });
    }

    handleSubmitInputFlag() {
        const { flagName, flagValue, flagChangedSchemeId } = this.state;
        this.props.doUpdateSchemeFlag(flagChangedSchemeId, flagName, flagValue, (error, message) => {
            if (error) {
                NotificationHelper.getInstance().error(message);
            } else {
                this.setState({ showInputFlagConfirmModal: false });
                NotificationHelper.getInstance().success(message);
            }

            this.getSchemes();
        });
    }

    updateSchemeFlag(flagChangedSchemeId, flagName, flagValue, flagChangedSchemeName) {
        const { updateSchemeFlag_inProgress } = this.props;

        if (!updateSchemeFlag_inProgress) {
            const { showInputFlagConfirmModal } = this.state;
            this.setState({
                showInputFlagConfirmModal: !showInputFlagConfirmModal,
                flagName,
                flagValue,
                flagChangedSchemeId,
                flagChangedSchemeName
            });
        }
    }

    dateChange(date) {
        if (date) {
            let dateStr = date.format('DD-MM-YYYY'); // This date format should be same as the date format you defined in the keymetrics column config for the valuationDate
            this.setSelectedValuationDate(dateStr);
            if (this.state.filterData) {
                this.filterSchemes({ valuationDate: dateStr, columns: this.state.filterData });
            } else {
                this.filterSchemes({ all: true, valuationDate: dateStr });
            }
            this.setState({ latest: false });
        } else {
            this.setSelectedValuationDate(null, true);
            if (this.state.filterData) {
                this.filterSchemes({ columns: this.state.filterData });
            } else {
                this.filterSchemes({ all: true });
            }
            this.setState({ latest: true });
        }
        this.setSearchedValue(null);
    }

    async download(schemeType) {
        const { searchedSchemes, filterSchemes_data } = this.state;
        const { getKeyMetricsConfig_data } = this.props;
        let sheetData = [];
        let tempArr = [];

        if (searchedSchemes.length) {
            searchedSchemes.forEach(scheme => {
                let sheetObj = {};
                for (const [key] of Object.entries(scheme)) {
                    tempArr.push(key);

                    sheetObj[key] = scheme[key];
                }
                sheetData.push(sheetObj);
            });
        } else {
            filterSchemes_data.forEach(scheme => {
                let sheetObj = {};
                for (const [key] of Object.entries(scheme)) {
                    tempArr.push(key);

                    sheetObj[key] = scheme[key];
                }
                sheetData.push(sheetObj);
            });
        }

        const rawSchemeFormData = [
            {
                name: 'Schemes',
                data: sheetData,
                columns: csvFormatHook(tempArr, getKeyMetricsConfig_data)
            }
        ];
        //   const zip = new JSZip();
        const sheetDataScheme = new ExcelWorkbook().getExcelData(rawSchemeFormData);
        //   await zip.file('schemese.xlsx', sheetDataScheme);
        //   const content = await zip.generateAsync({ type: 'blob' });
        saveAs(sheetDataScheme, 'schemes.xlsx');
    }

    setSelectedViewCb(selectedView) {
        this.setState({ selectedView: selectedView });
    }

    setFilterDataCb(_filterData) {
        this.setState({ filterData: _filterData });
    }

    handleSelectedViewRemove() {
        this.setState({ selectedView: null, filterData: null });
        this.getKeyMetricsConfig();
        this.setState({ selectedUserType: this.props.loggedUser.primaryRole });
        this.removeMyCurrentAppliedView();
        this.filterSchemes({ all: true });
        this.setState({ latest: true });
        this.setState({ showMore: false });
        this.setSelectedValuationDate(null, true);
        this.setSearchedValue(null);
    }

    setHandleShowModel() {
        const { showFilterSchemeModal } = this.state;
        this.setState({ showFilterSchemeModal: !showFilterSchemeModal });
    }

    setSelectedUserTypeCb(userType) {
        this.setState({ selectedUserType: userType });
    }

    setSelectedValuationDate(date, force = false) {
        if (this.state.selectedView && !force) {
            if (date) {
                this.setState({ selectedValuationDate: date });
            }
        } else {
            this.setState({ selectedValuationDate: date });
        }
    }

    setSearchedValue(value) {
        this.setState({ searchedvalue: value });
    }

    handleSchemeDataChange(payload) {
        const newPayload = {
            ...payload,
            columns: this.state.filterData,
            valuationDate: this.state.selectedValuationDate
        };

        this.props.doSchemeDateChange(newPayload);
    }

    render() {
        const {
            showCreateSchemeModal,
            createScheme_inProgress,
            getSchemes_inProgress,
            latest,
            showInputFlagConfirmModal,
            flagName,
            flagChangedSchemeName,
            showFilterSchemeModal,
            filterSchemes_inProgress,
            filterSchemes_data,
            showMore,
            pageSize,
            removeMyCurrentAppliedView_inProgress,
            getKeyMetricsConfig_inProgress,
            getMyViews_inProgress,
            getMyDefaultOrgGroups_inProgress
        } = this.state;
        const { updateSchemeFlag_inProgress, loggedUser } = this.props;
        const { primaryRole: userType } = loggedUser;
        const activeSchemeTableWidth = userType === UserRole.GOVERN_USER ? '5310px' : '2700px';
        return (
            <>
                <div className="tab-scheme-wrap">
                    <div className="flex">
                        {/* <div className="container">
                            <button className="btn btn-green button-scheme" onClick={this.handleShowCreateSchemeModal}>
                                <i className="fa fa-plus fa-icon"></i>
                                Create Scheme
                            </button>
                        </div> */}
                        {/* <Tabs defaultActiveKey="1">
                            <TabPane tab="Active" key="1"> */}
                        <div className="scheme">
                            <div className="scheme-wrap">
                                <div className="container">
                                    <div className="active-wrap">
                                        <div className="title-wrap active-title-wrap">
                                            <p className="title">Schemes</p>
                                            <div className="wrap-right">
                                                {/* <Popover
                                                    trigger={this.state.selectedView ? 'hover' : ''}
                                                    defaultVisible={false}
                                                    content={
                                                        this.state.selectedView ? (
                                                            <CloseCircleFilled
                                                                style={{
                                                                    color: 'gray',
                                                                    marginLeft: '5px',
                                                                    marginRight: '5px'
                                                                }}
                                                                onClick={this.handleSelectedViewRemove}
                                                            />
                                                        ) : null
                                                    }
                                                    placement="topRight"
                                                    style={{ marginTop: '5rem' }}
                                                > */}
                                                <Select
                                                    defaultValue={10}
                                                    className="km-page-size"
                                                    onChange={e => this.setState({ pageSize: e })}
                                                >
                                                    <Select.Option value={10}>10 / page</Select.Option>
                                                    <Select.Option value={20}>20 / page</Select.Option>
                                                    <Select.Option value={30}>30 / page</Select.Option>
                                                    <Select.Option value={50}>50 / page</Select.Option>
                                                    <Select.Option value={100}>100 / page</Select.Option>
                                                </Select>
                                                <Button
                                                    type=""
                                                    style={{
                                                        border: this.state.filterData ? '1px solid  #1691C5' : null
                                                    }}
                                                    onClick={this.handleShowFilterSchemeModal}
                                                    className="km-show-all-btn"
                                                    disabled={
                                                        getKeyMetricsConfig_inProgress ||
                                                        getMyViews_inProgress ||
                                                        filterSchemes_inProgress ||
                                                        getMyDefaultOrgGroups_inProgress
                                                    }
                                                >
                                                    <Row type="flex" align="middle" justify="center">
                                                        <Col span={18}>
                                                            {this.state.selectedView &&
                                                            this.state.selectedView.viewName.length > 10 ? (
                                                                <Tooltip
                                                                    placement="topLeft"
                                                                    title={
                                                                        this.state.selectedView
                                                                            ? this.state.selectedView.viewName
                                                                            : null
                                                                    }
                                                                >
                                                                    <Typography.Text
                                                                        className="km-show-views"
                                                                        style={{
                                                                            color: this.state.filterData
                                                                                ? '#1691C5'
                                                                                : null
                                                                        }}
                                                                    >
                                                                        {' '}
                                                                        {this.state.selectedView ? (
                                                                            <>
                                                                                {this.state.selectedView.viewName.substr(
                                                                                    0,
                                                                                    10
                                                                                )}
                                                                                ...
                                                                            </>
                                                                        ) : (
                                                                            'Filter views'
                                                                        )}{' '}
                                                                    </Typography.Text>
                                                                </Tooltip>
                                                            ) : (
                                                                <Typography.Text
                                                                    className="km-show-views"
                                                                    style={{
                                                                        color: this.state.filterData ? '#1691C5' : null
                                                                    }}
                                                                >
                                                                    {' '}
                                                                    {this.state.selectedView
                                                                        ? this.state.selectedView.viewName
                                                                        : 'Filter views'}{' '}
                                                                </Typography.Text>
                                                            )}
                                                        </Col>
                                                        <Col span={6}>
                                                            {this.state.selectedView ? (
                                                                <img src={filterIconEnable} />
                                                            ) : null}
                                                        </Col>
                                                    </Row>
                                                </Button>
                                                <Button
                                                    className="km-clear"
                                                    style={{
                                                        border: this.state.filterData ? '1px solid  #1691C5' : null
                                                    }}
                                                    onClick={
                                                        this.state.selectedView ? this.handleSelectedViewRemove : null
                                                    }
                                                    disabled={
                                                        getKeyMetricsConfig_inProgress ||
                                                        getMyViews_inProgress ||
                                                        filterSchemes_inProgress ||
                                                        getMyDefaultOrgGroups_inProgress
                                                    }
                                                >
                                                    <img
                                                        src={this.state.selectedView ? clearEnabled : clear}
                                                        alt="clear"
                                                        className="km-clear-icon"
                                                    />
                                                </Button>

                                                {/* </Popover> */}

                                                <DatePicker
                                                    className="date-picker"
                                                    onChange={date => this.dateChange(date)}
                                                    disabled={!this.state.dateList.length || filterSchemes_inProgress}
                                                    disabledDate={current => {
                                                        const fountEle = this.state.dateList.find(ele =>
                                                            ele.isSame(current, 'day')
                                                        );
                                                        if (fountEle) {
                                                            return false;
                                                        }
                                                        return true;
                                                    }}
                                                    value={
                                                        this.state.selectedValuationDate
                                                            ? moment(this.state.selectedValuationDate, 'DD-MM-YYYY')
                                                            : null
                                                    }
                                                />
                                                <span className="checkboxWrapper">
                                                    <Checkbox disabled={true} checked={latest}>
                                                        Latest
                                                    </Checkbox>
                                                </span>
                                                <Input.Search
                                                    prefix={<span />}
                                                    suffix={<span />}
                                                    disabled={
                                                        getSchemes_inProgress ||
                                                        updateSchemeFlag_inProgress ||
                                                        filterSchemes_inProgress
                                                    }
                                                    className="input-search"
                                                    placeholder="Search scheme by name"
                                                    onChange={e => {
                                                        // this.handleSearchScheme('active', e.target.value);
                                                        this.handleSearchScheme(e.target.value);
                                                    }}
                                                    value={this.state.searchedvalue ? this.state.searchedvalue : null}
                                                />
                                                <button
                                                    className="tpip-btn-blue btn-download"
                                                    onClick={() => this.download('A')}
                                                >
                                                    <i className="fa fa-icon fa-download"></i>
                                                </button>
                                                <button
                                                    className="btn btn-green km-create-scheme"
                                                    onClick={this.handleShowCreateSchemeModal}
                                                >
                                                    <i className="fa fa-plus fa-icon"></i>
                                                    Create Scheme
                                                </button>
                                            </div>
                                        </div>
                                        <Row>
                                            <Col span={22}>
                                                {/* <div
                                                    style={{
                                                        height: showMore ? this.elementRef.current.scrollHeight : '35px',
                                                        overflow: 'hidden'
                                                    }}
                                                    ref={this.elementRef}
                                                > */}
                                                {this.state.filterData &&
                                                this.props.getKeyMetricsConfig_data &&
                                                this.props.getKeyMetricsConfig_data.length ? (
                                                    <div
                                                        style={{
                                                            height: showMore
                                                                ? this.elementRef.current.scrollHeight
                                                                : '35px',
                                                            overflow: 'hidden',
                                                            margin: '10px 0px'
                                                        }}
                                                        ref={this.elementRef}
                                                    >
                                                        {this.state.filterData.map(col => {
                                                            const found = this.props.getKeyMetricsConfig_data
                                                                .filter(f => _.has(f, `filterConfig`))
                                                                .find(kmc => kmc.columnName === col.name);

                                                            return col.data ? (
                                                                <Filter
                                                                    config={{
                                                                        filterConfig: found.filterConfig,
                                                                        displayName: found.displayName.toUpperCase(),
                                                                        columnName: col.name,
                                                                        data: col.data,
                                                                        isEditable: false,
                                                                        showEdit: false,
                                                                        styleConfig: {
                                                                            buttonColor: '#1899cc',
                                                                            fontColor: 'white',
                                                                            marginLeft: '5px',
                                                                            marginTop: '1rem',
                                                                            fontSize: '13px',
                                                                            iconStyle: true
                                                                        }
                                                                    }}
                                                                    setHandleShowModelCb={this.setHandleShowModel}
                                                                />
                                                            ) : null;
                                                        })}
                                                    </div>
                                                ) : null}
                                            </Col>

                                            {this.elementRef.current ? (
                                                <>
                                                    {this.elementRef.current.scrollHeight > 35 ? (
                                                        <>
                                                            <Col span={2}>
                                                                <Button
                                                                    className="km-show-more-btn"
                                                                    onClick={() => {
                                                                        this.setState({ showMore: !showMore });
                                                                        console.log('ref', this.elementRef);
                                                                    }}
                                                                >
                                                                    <Row type="flex" justify="space-around">
                                                                        <Col span={21}>
                                                                            <Typography>
                                                                                <Typography.Text className="km-show-more-text">
                                                                                    {' '}
                                                                                    SEE MORE
                                                                                </Typography.Text>
                                                                            </Typography>
                                                                        </Col>
                                                                        <Col span={3}>
                                                                            <DownOutlined className="km-show-more-text-icon" />
                                                                        </Col>
                                                                    </Row>
                                                                </Button>
                                                            </Col>
                                                        </>
                                                    ) : null}
                                                </>
                                            ) : null}
                                        </Row>

                                        <Row className="content-wrap nobg">
                                            <SchemeTable
                                                loading={
                                                    filterSchemes_inProgress ||
                                                    updateSchemeFlag_inProgress ||
                                                    removeMyCurrentAppliedView_inProgress
                                                }
                                                type="Active"
                                                scroll={{ x: activeSchemeTableWidth, y: 'calc(100vh - 350px)' }}
                                                dataArray={
                                                    this.state.searchedSchemes.length > 0 ||
                                                    (this.state.searchedvalue && this.state.searchedvalue.length > 0)
                                                        ? this.state.searchedSchemes
                                                        : filterSchemes_data
                                                }
                                                updateIsFavourite={this.handleSubmitSchemeIsFavourite}
                                                updateSchemeFlag={this.updateSchemeFlag}
                                                loggedUser={this.props.loggedUser}
                                                keyMetricsConfig={this.props.getKeyMetricsConfig_data}
                                                pageSize={pageSize}
                                                schemeDataChange={this.handleSchemeDataChange}
                                            />
                                        </Row>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* </TabPane>
                        </Tabs> */}
                    </div>
                </div>
                {showInputFlagConfirmModal && (
                    <InputFlagConfirmModel
                        show={showInputFlagConfirmModal}
                        handleShow={this.handleShowInputFlagConfirmModal}
                        flagName={flagName}
                        schemeName={flagChangedSchemeName}
                        onSubmit={this.handleSubmitInputFlag}
                        inProgress={updateSchemeFlag_inProgress}
                    />
                )}
                {showCreateSchemeModal && (
                    <CreateSchemeModal
                        show={showCreateSchemeModal}
                        inProgress={createScheme_inProgress}
                        handleShow={this.handleShowCreateSchemeModal}
                        handleSubmit={this.handleSubmitCreateScheme}
                    />
                )}
                {showFilterSchemeModal && (
                    <FilterModel
                        show={showFilterSchemeModal}
                        handleShow={this.handleShowFilterSchemeModal}
                        setSelectedViewCb={this.setSelectedViewCb}
                        setFilterDataCb={this.setFilterDataCb}
                        selectedView={this.state.selectedView}
                        filterData={this.state.filterData}
                        loggedUser={loggedUser}
                        setSelectedUserTypeCb={this.setSelectedUserTypeCb}
                        selectedUserType={this.state.selectedUserType}
                        setSelectedValuationDateCb={this.setSelectedValuationDate}
                        selectedValuationDate={this.state.selectedValuationDate}
                        setSearchedValueCb={this.setSearchedValue}
                    />
                )}
            </>
        );
    }
}

SchemeContainer.propTypes = {
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
SchemeContainer.defaultProps = {
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
const mapStateToProps = createStructuredSelector({
    createScheme_inProgress: createScheme_inProgress(),
    createScheme_data: createScheme_data(),
    createScheme_error: createScheme_error(),

    getSchemes_inProgress: getSchemes_inProgress(),
    updateSchemeFlag_inProgress: getUpdateSchemeFlag_inProgress(),
    getSchemes_data: getSchemes_data(),
    getSchemes_error: getSchemes_error(),

    updateSchemeIsFavourite_inProgress: updateSchemeIsFavourite_inProgress(),
    updateSchemeIsFavourite_data: updateSchemeIsFavourite_data(),
    updateSchemeIsFavourite_error: updateSchemeIsFavourite_error(),
    getChartDateListFromRedux: getChartDateListFromRedux(),

    filterSchemes_data: filterSchemes_data(),
    filterSchemes_inProgress: filterSchemes_inProgress(),

    getKeyMetricsConfig_data: getKeyMetricsConfig_data(),

    getMyCurrentAppliedView_data: getMyCurrentAppliedView_data(),
    getMyCurrentAppliedView_inProgress: getMyCurrentAppliedView_inProgress(),
    removeMyCurrentAppliedView_inProgress: removeMyCurrentAppliedView_inProgress(),

    getKeyMetricsConfig_inProgress: getKeyMetricsConfig_inProgress(),
    getMyViews_inProgress: getMyViews_inProgress(),
    getMyDefaultOrgGroups_inProgress: getMyDefaultOrgGroups_inProgress()
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
    getChartDateList: payload => {
        dispatch(getChartDateList(payload));
    },

    doUpdateSchemeFlag: (schemeId, flagName, flagValue, callback) => {
        dispatch(doUpdateSchemeFlag(schemeId, flagName, flagValue, callback));
    },
    requestGetCommonClaims: payload => {
        dispatch(requestGetCommonClaims(payload));
    },
    doFilterSchemes: payload => {
        dispatch(filterSchemes(payload));
    },
    doGetKeyMetricsConfig: () => {
        dispatch(getKeyMetricsConfig());
    },
    doGetMyViews: payload => {
        dispatch(getMyViews(payload));
    },
    doGetMyCurrentAppliedView: () => {
        dispatch(getMyCurrentAppliedView());
    },
    doRemoveMyCurrentAppliedView: () => {
        dispatch(removeMyCurrentAppliedView());
    },
    doGetMyDefaultOrgGroups: payload => {
        dispatch(getMyDefaultOrgGroups(payload));
    },
    doSchemeDateChange: payload => {
        dispatch(schemeDataChange(payload));
    }
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SchemeContainer);
