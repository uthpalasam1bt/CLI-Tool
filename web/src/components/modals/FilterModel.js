/* eslint-disable react-hooks/exhaustive-deps */
import _ from 'lodash';
import { connect, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import React, { useEffect, useState, useCallback } from 'react';
import { Row, Col, Button, Modal, Dropdown, Menu, Typography, Spin, Tooltip } from 'antd';
import FilterContainer from '../../containers/scheme/keyMetrics/filterContainer';
import FilterSelectionContainer from '../../containers/scheme/keyMetrics/filterContainer/filterSelectionContainer';
import { DownOutlined } from '@ant-design/icons';
import NotificationHelper from '../../helpers/NotificationHelper';

import {
    deleteView,
    filterSchemes,
    getMyViews,
    saveView,
    updateView,
    editView,
    getMyDefaultOrgGroups,
    saveGlobalView,
    updateGlobalView,
    editGlobalView,
    deleteGlobalView,
    getKeyMetricsConfig,
    saveMyCurrentAppliedView,
    removeMyCurrentAppliedView
} from '../../containers/scheme/keyMetrics/actions/keyMetricsActions';
import {
    getKeyMetricsConfig_data,
    getKeyMetricsConfig_inProgress,
    getMyViews_data,
    getMyViews_inProgress,
    getMyDefaultOrgGroups_data,
    updateGlobalView_inProgress,
    updateView_inProgress,
    getMyDefaultOrgGroups_inProgress
} from '../../containers/scheme/keyMetrics/selectors/keyMetricsSelectors';
import { commonUserClaims } from '../../containers/dashboard/UserManagement/selector';
import { transformData } from '../../helpers/keyMetricsHelper';
import ViewContainer from '../../containers/scheme/keyMetrics/viewContainer';
import FilterCommonModal from './FilterCommonModal';

import { MODAL, CLAIMS } from '../../constants/keyMetricsConstants';

const { Text } = Typography;
const HeaderContainer = props => {
    const {
        filters,
        views,
        changeFilterVisibility,
        handleViewChangeCb,
        hideModal,
        handleViewSaveCb,
        selectedView,
        doDeleteView,
        groups,
        loggedUser,
        doDeleteGlobalView,
        selectedUserType,
        updateGlobalView_inProgress,
        updateView_inProgress,
        setSelectedViewCb,
        setFilterDataCb,
        doFilterSchemes,
        selectedValuationDate
    } = props;

    const [visible, setVisible] = useState(false);
    const [isSaveFilterAsModelVisible, setIsSaveFilterAsModelVisible] = useState(false);
    const [isSaveFilterModelVisible, setIsSaveFilterModelVisible] = useState(false);
    const [isEditFilterModelVisible, setIsEditFilterModelVisible] = useState(false);

    const commonUserClaims_data = useSelector(state => commonUserClaims(state));

    const handleDropdownVisibility = () => {
        setVisible(!visible);
    };

    const saveModelHide = () => {
        setIsSaveFilterModelVisible(false);
    };

    const saveAsModelHide = () => {
        setIsSaveFilterAsModelVisible(false);
    };

    const showSaveAsFilterModel = () => {
        setIsSaveFilterAsModelVisible(true);
    };

    const showEditFilterMode = () => {
        setIsEditFilterModelVisible(true);
    };

    const saveEditModelHide = () => {
        setIsEditFilterModelVisible(false);
    };

    const handleSaveButtonClick = () => {
        if (selectedView.userId) {
            handleViewSaveCb(null, selectedView.viewId ? selectedView.viewId : null);
        } else {
            handleViewSaveCb(null, selectedView.viewId ? selectedView.viewId : null, selectedView.groups);
        }
    };

    const handleOnClickDeleteView = view => {
        Modal.confirm({
            title: `Do you want to delete view ${view.viewName} ?`,
            okText: 'Yes',
            okType: 'danger',
            onOk: () => {
                if (selectedView.userId) {
                    doDeleteView({ viewId: view.viewId });
                } else {
                    doDeleteGlobalView({
                        viewId: view.viewId,
                        ...(selectedUserType !== 'custom' ? { userType: selectedUserType } : {})
                    });
                }
                setSelectedViewCb(null);
                setFilterDataCb(null);

                doFilterSchemes({ all: true, valuationDate: selectedValuationDate });
            },
            cancelText: 'No',
            centered: true
        });
    };

    return (
        <Row>
            <Col xl={19} md={18}>
                <Row type="flex">
                    <Col>
                        {selectedView ? (
                            selectedView.viewName.length > 10 ? (
                                <Tooltip placement="topLeft" title={selectedView.viewName}>
                                    <Typography>
                                        <Text className="km-filter-text">
                                            {selectedView.viewName.substr(0, 15)}...{' '}
                                            {selectedView.isSeeded ? (
                                                <Text className="km-filter-text-in"> (System Defined)</Text>
                                            ) : (
                                                ''
                                            )}
                                        </Text>
                                    </Typography>
                                </Tooltip>
                            ) : (
                                <Typography>
                                    <Text className="km-filter-text">
                                        {selectedView.viewName}{' '}
                                        {selectedView.isSeeded ? (
                                            <Text className="km-filter-text-in"> (System Defined)</Text>
                                        ) : (
                                            ''
                                        )}
                                    </Text>
                                </Typography>
                            )
                        ) : null}
                    </Col>
                    <Col>
                        {selectedView ? (
                            <>
                                <Button
                                    type="btn-outline-primary"
                                    className="km-filter-model-button"
                                    onClick={showSaveAsFilterModel}
                                >
                                    Save as
                                </Button>
                                {!selectedView.userId &&
                                commonUserClaims_data &&
                                commonUserClaims_data.includes(CLAIMS.MANAGE_KEY_METRICS_GLOBAL_VIEWS_CLAIM) &&
                                !selectedView.isSeeded &&
                                selectedUserType !== 'custom' ? (
                                    <>
                                        <Button
                                            type="btn-outline-gray"
                                            className="km-filter-model-button"
                                            onClick={handleSaveButtonClick}
                                        >
                                            {updateGlobalView_inProgress ? <Spin size="small" /> : `Save`}
                                        </Button>
                                        <Button
                                            type="btn-outline-gray"
                                            className="km-filter-model-button"
                                            onClick={showEditFilterMode}
                                        >
                                            Edit
                                        </Button>

                                        <Button
                                            type="btn-outline-primary"
                                            className="km-filter-model-button"
                                            onClick={() => {
                                                handleOnClickDeleteView(selectedView);
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </>
                                ) : selectedView.userId ? (
                                    <>
                                        <Button
                                            type="btn-outline-gray"
                                            className="km-filter-model-button"
                                            onClick={handleSaveButtonClick}
                                        >
                                            {updateView_inProgress ? <Spin size="small" /> : `Save`}
                                        </Button>
                                        <Button
                                            type="btn-outline-gray"
                                            className="km-filter-model-button"
                                            onClick={showEditFilterMode}
                                        >
                                            Edit
                                        </Button>

                                        <Button
                                            type="btn-outline-primary"
                                            className="km-filter-model-button"
                                            onClick={() => {
                                                handleOnClickDeleteView(selectedView);
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </>
                                ) : null}
                            </>
                        ) : null}
                    </Col>
                </Row>
            </Col>

            <Col xl={5} md={6}>
                {selectedView ? (
                    <Dropdown
                        overlay={
                            <Menu className="lgim-styles-wrapper dp-menu">
                                <FilterSelectionContainer
                                    filters={filters}
                                    views={views}
                                    changeFilterVisibility={changeFilterVisibility}
                                    handleViewChangeCb={handleViewChangeCb}
                                    handleDropdownVisibility={handleDropdownVisibility}
                                    hideModal={hideModal}
                                    handleViewSaveCb={handleViewSaveCb}
                                    selectedView={selectedView}
                                />
                            </Menu>
                        }
                        className="km-filter-drop-down"
                        overlayClassName="km-filter-drop-down"
                        placement="bottomRight"
                        trigger={['click']}
                        visible={visible}
                        onVisibleChange={handleDropdownVisibility}
                    >
                        <Button onClick={() => setVisible(!visible)} className="ant-btn-default-km">
                            <Row type="flex" justify="space-around">
                                <Col span={20}>
                                    <Typography>
                                        <Text className="km-filter-text-views">Filters</Text>
                                    </Typography>
                                </Col>
                                <Col span={4}>
                                    <DownOutlined className="km-drpdwn-filter" />
                                </Col>
                            </Row>
                        </Button>
                    </Dropdown>
                ) : null}
            </Col>

            {isSaveFilterAsModelVisible && (
                <FilterCommonModal
                    show={isSaveFilterAsModelVisible}
                    handleShow={saveAsModelHide}
                    views={views}
                    hideModal={hideModal}
                    handleViewSaveCb={handleViewSaveCb}
                    groupArr={groups}
                    loggedUser={loggedUser}
                    selectedView={selectedView}
                    action={MODAL.ACTIONS.SAVE_AS}
                    selectedUserType={selectedUserType}
                />
            )}

            {isSaveFilterAsModelVisible && (
                <FilterCommonModal
                    show={isSaveFilterAsModelVisible}
                    handleShow={saveAsModelHide}
                    views={views}
                    hideModal={hideModal}
                    handleViewSaveCb={handleViewSaveCb}
                    groupArr={groups}
                    loggedUser={loggedUser}
                    selectedView={selectedView}
                    action={MODAL.ACTIONS.SAVE_AS}
                    selectedUserType={selectedUserType}
                />
            )}

            {isSaveFilterModelVisible && (
                <FilterCommonModal
                    show={isSaveFilterModelVisible}
                    handleShow={saveModelHide}
                    views={views}
                    hideModal={hideModal}
                    handleViewSaveCb={handleViewSaveCb}
                    groupArr={groups}
                    loggedUser={loggedUser}
                    selectedView={selectedView}
                    action={MODAL.ACTIONS.SAVE}
                    selectedUserType={selectedUserType}
                />
            )}

            {isEditFilterModelVisible && (
                <FilterCommonModal
                    show={isEditFilterModelVisible}
                    handleShow={saveEditModelHide}
                    views={views}
                    hideModal={hideModal}
                    handleViewSaveCb={handleViewSaveCb}
                    groupArr={groups}
                    loggedUser={loggedUser}
                    selectedView={selectedView}
                    action={MODAL.ACTIONS.EDIT}
                    selectedUserType={selectedUserType}
                />
            )}
        </Row>
    );
};

const FilterModel = props => {
    const {
        show,
        handleShow,
        getKeyMetricsConfig_data,
        getMyViews_data,
        getKeyMetricsConfig_inProgress = true,
        getMyViews_inProgress = true,
        doFilterSchemes,
        doGetMyViews,
        doSaveView,
        doUpdateView,
        doEditView,
        setSelectedViewCb,
        setFilterDataCb,
        filterData,
        doDeleteView,
        loggedUser,
        doGetMyDefaultOrgGroups,
        getMyDefaultOrgGroups_data = [],
        doSaveGlobalView,
        doUpdateGlobalView,
        doEditGlobalView,
        doDeleteGlobalView,
        doGetKeyMetricsConfig,
        updateGlobalView_inProgress,
        updateView_inProgress,
        setSelectedUserTypeCb,
        doSaveMyCurrentAppliedView,
        doRemoveMyCurrentAppliedView,
        getMyDefaultOrgGroups_inProgress,
        setSelectedValuationDateCb,
        selectedValuationDate,
        setSearchedValueCb
    } = props;

    const [dataArr, setDataArr] = useState(filterData ? filterData : []);
    const [filters, setFilters] = useState([]);
    const [views, setViews] = useState([]);
    const [selectedView, setSelectedView] = useState(props.selectedView || null);
    const [selectedUserType, setSelectedUserType] = useState(props.selectedUserType);

    const [isForceSaveModalVisible, setIsForceSaveModalVisible] = useState(false);
    const [latestSavedViewName, setLatestSavedViewName] = useState(null);

    const commonUserClaims_data = useSelector(state => commonUserClaims(state));

    useEffect(() => {
        if (!filterData) {
            doGetMyViews();
            doGetMyDefaultOrgGroups({ organizationId: loggedUser.organizationId });
            setSelectedUserTypeCb(selectedUserType);
            if (commonUserClaims_data && commonUserClaims_data.includes(CLAIMS.MANAGE_KEY_METRICS_GLOBAL_VIEWS_CLAIM))
                handleUserType(selectedUserType, true);
        }
    }, []);

    useEffect(() => {
        if (getKeyMetricsConfig_data && filterData) {
            // if (!filterData.length) {
            //     setFilters([
            //         ...getKeyMetricsConfig_data
            //             .filter(f => _.has(f, `filterConfig`))
            //             .map(f => ({ ...f, ...(f.default ? { visible: true } : { visible: false }) }))
            //     ]);
            //     return;
            // }

            setFilters([
                ...getKeyMetricsConfig_data
                    .filter(f => _.has(f, `filterConfig`))
                    .map(f => ({
                        ...f,
                        ...(_.has(filterData.find(fd => fd.name === f.columnName), `data`)
                            ? { data: _.get(filterData.find(fd => fd.name === f.columnName), `data`), visible: true }
                            : {})
                    }))
            ]);

            setDataArr([...filterData]);
        }
    }, [filterData]);

    useEffect(() => {
        if (views.length && selectedView && !filterData) handleViewChangeCb(selectedView.viewId);
    }, [selectedView, views]);

    useEffect(() => {
        if (latestSavedViewName !== null) {
            const latestSavedViewId = views.find(f => f.viewName === latestSavedViewName);

            if (latestSavedViewId) handleViewChangeCb(latestSavedViewId.viewId);
        }
    }, [latestSavedViewName, views]);
    useEffect(() => {
        if (getKeyMetricsConfig_data && !filterData) {
            // setFilters(
            //     getKeyMetricsConfig_data
            //         .filter(f => _.has(f, `filterConfig`))
            //         .map(f => ({ ...f, ...(f.default ? { visible: true } : { visible: false }) }))
            // );

            // setDataArr([
            //     ...getKeyMetricsConfig_data
            //         .filter(f => _.has(f, `filterConfig`))
            //         .filter(f => f.default)
            //         .map(f => ({
            //             name: f.columnName,
            //             data: null
            //         }))
            // ]);
            setFilters(
                getKeyMetricsConfig_data.filter(f => _.has(f, `filterConfig`)).map(f => ({ ...f, visible: false }))
            );
        }
        if (getMyViews_data) setViews(getMyViews_data);
    }, [getKeyMetricsConfig_data, getMyViews_data]);

    const callback = useCallback(
        (name, data) => {
            const index = dataArr.findIndex(x => x.name === name);
            if (index !== -1) {
                dataArr[index] = { name, data: data ? transformData(name, data, getKeyMetricsConfig_data) : data };
                setDataArr([...dataArr]);
            } else {
                dataArr.push({ name, data: data ? transformData(name, data, getKeyMetricsConfig_data) : data });
                setDataArr([...dataArr]);
            }
        },
        [dataArr]
    );

    const changeFilterVisibility = useCallback(
        (columnName, value = null) => {
            //Remove invisible item data in filter array
            filters.filter(f => f.columnName === columnName).map(f => delete f.data);

            if (value === null) {
                const previousVisibility = filters[filters.findIndex(f => f.columnName === columnName)].visible;

                filters[filters.findIndex(f => f.columnName === columnName)].visible = !previousVisibility;
                if (!previousVisibility) {
                    callback(columnName, null);
                } else {
                    const idx = dataArr.findIndex(i => {
                        if (i.name === columnName) {
                            return true;
                        }
                    });
                    dataArr.splice(idx, 1);
                    setDataArr([...dataArr]);
                }
            } else {
                filters[filters.findIndex(f => f.columnName === columnName)].visible = value;
                if (value) {
                    callback(columnName, null);
                } else {
                    dataArr.splice(dataArr.findIndex(i => i.name === columnName), 1);
                    setDataArr([...dataArr]);
                }
            }

            // remove invisible items from the dataArr
            setDataArr([...dataArr.filter(x => filters.find(f => f.columnName === x.name).visible === true)]);

            setFilters([...filters]);
        },

        [filters]
    );

    const handleViewChangeCb = viewId => {
        setSelectedView(null);

        // if (viewId === 'default-filters') {
        //     setFilters([
        //         ...getKeyMetricsConfig_data
        //             .filter(f => _.has(f, `filterConfig`))
        //             .map(f => ({ ...f, ...(f.default ? { visible: true } : { visible: false }) }))
        //     ]);

        //     setDataArr([
        //         ...getKeyMetricsConfig_data
        //             .filter(f => _.has(f, `filterConfig`))
        //             .filter(f => f.default)
        //             .map(f => ({
        //                 name: f.columnName,
        //                 data: null
        //             }))
        //     ]);
        //     return;
        // }
        const view = views.find(v => v.viewId === viewId);

        if (!view) return;
        const tempArr = [];
        filters.forEach(f => changeFilterVisibility(f.columnName, false));
        const tempFilterArr = filters.map(f => {
            _.unset(f, `data`);
            return f;
        });

        setFilters([...tempFilterArr]);
        view.view.columns.forEach(col => {
            changeFilterVisibility(col.name, true);
            filters[filters.findIndex(f => f.columnName === col.name)].data = col.data;
            setFilters([...filters]);

            tempArr.push({ name: col.name, data: col.data });
        });
        setDataArr([...tempArr]);

        setSelectedView(view);
    };

    /**
     * If the viewName provided, it's determine as a new view save with the provided view name.
     * If the viewId provided, it's determine as a view update of provided viewId.
     * @param {string} viewName The view name you need to save.
     * @param {UUID} viewId The viewId you need to update.
     **/
    const handleViewSaveCb = (viewName = null, viewId = null, selectedGroups = null) => {
        if (selectedGroups) {
            if (viewName && viewId) {
                doEditGlobalView({
                    viewId,
                    viewName,
                    groups: selectedGroups,
                    ...(selectedUserType !== 'custom' ? { userType: selectedUserType } : {})
                });
                setLatestSavedViewName(viewName);
            } else if (viewName) {
                doSaveGlobalView({
                    viewName,
                    view: {
                        columns: dataArr
                    },
                    groups: selectedGroups,
                    ...(selectedUserType !== 'custom' ? { userType: selectedUserType } : {})
                });
                setLatestSavedViewName(viewName);
            } else if (viewId) {
                doUpdateGlobalView({
                    viewId,
                    view: {
                        columns: dataArr
                    },
                    groups: selectedGroups,
                    ...(selectedUserType !== 'custom' ? { userType: selectedUserType } : {})
                });
                setFilterDataCb(null);
            }
        } else {
            if (viewName && viewId) {
                doEditView({
                    viewId,
                    viewName
                });
                setLatestSavedViewName(viewName);
            } else if (viewName) {
                doSaveView({
                    viewName,
                    view: {
                        columns: dataArr
                    }
                });
                setLatestSavedViewName(viewName);
            } else if (viewId) {
                doUpdateView({
                    viewId,
                    view: {
                        columns: dataArr
                    }
                });
                setFilterDataCb(null);
            }
        }
    };

    const handleOnClick = e => {
        if (!selectedView) {
            NotificationHelper.getInstance().error('Please select a view');
            return;
        }
        // if (selectedUserType !== 'custom' && selectedUserType !== props.loggedUser.primaryRole) {
        //     NotificationHelper.getInstance().error('You can not search from views belongs to other user types');
        //     return;
        // }
        if (
            selectedView &&
            JSON.stringify(dataArr) !== JSON.stringify(selectedView.view.columns) &&
            !selectedView.userId &&
            (commonUserClaims_data
                ? !commonUserClaims_data.includes(CLAIMS.MANAGE_KEY_METRICS_GLOBAL_VIEWS_CLAIM)
                : true)
        ) {
            showForceSaveModal();
        } else {
            if (dataArr.length) {
                // TODO: This code block should be enhanced - Thivanka
                if (JSON.stringify(dataArr) !== JSON.stringify(selectedView.view.columns) && selectedView.userId) {
                    Modal.confirm({
                        title: `Do you want to save view ${selectedView.viewName} ?`,
                        okText: 'Yes',
                        okType: 'warning',
                        onOk: () => {
                            const selectedViewWithUpdatedColumns = selectedView;
                            selectedViewWithUpdatedColumns.view.columns = dataArr;
                            doSaveMyCurrentAppliedView(selectedViewWithUpdatedColumns);
                            doUpdateView({
                                viewId: selectedView.viewId,
                                view: {
                                    columns: dataArr
                                }
                            });
                            doFilterSchemes({
                                columns: dataArr,
                                hiddenColumns: selectedView.hiddenColumns ? selectedView.hiddenColumns : []
                            });
                            setSelectedViewCb(selectedView);
                            setFilterDataCb(dataArr);

                            setSelectedValuationDateCb(null, true);
                            setSearchedValueCb(null);

                            handleShow();
                        },
                        onCancel: () => {
                            const selectedViewWithUpdatedColumns = selectedView;
                            selectedViewWithUpdatedColumns.view.columns = dataArr;
                            doSaveMyCurrentAppliedView(selectedViewWithUpdatedColumns);
                            doFilterSchemes({
                                columns: dataArr,
                                hiddenColumns: selectedView.hiddenColumns ? selectedView.hiddenColumns : []
                            });
                            setSelectedViewCb(selectedView);
                            setFilterDataCb(dataArr);

                            setSelectedValuationDateCb(null, true);
                            setSearchedValueCb(null);

                            handleShow();
                        },
                        cancelText: 'No'
                    });
                } else {
                    const selectedViewWithUpdatedColumns = selectedView;
                    selectedViewWithUpdatedColumns.view.columns = dataArr;
                    doSaveMyCurrentAppliedView(selectedViewWithUpdatedColumns);
                    doFilterSchemes({
                        columns: dataArr,
                        hiddenColumns: selectedView.hiddenColumns ? selectedView.hiddenColumns : []
                    });
                    setSelectedViewCb(selectedView);
                    setFilterDataCb(dataArr);

                    handleShow();
                }
                // TODO: This code block should be enhanced - Thivanka
            } else {
                doFilterSchemes({ all: true });
                setSelectedViewCb(null);
                setFilterDataCb([]);
            }
            setSelectedValuationDateCb(null, true);
            setSearchedValueCb(null);
        }
    };

    const handleOnCancle = e => {
        handleShow();
        // doGetKeyMetricsConfig();
        // setSelectedUserTypeCb(props.loggedUser.primaryRole);
        // doFilterSchemes({ all: true });
    };

    const handleUserType = (userType, initialHandle = false) => {
        // setSelectedView(null);
        doRemoveMyCurrentAppliedView();
        setSelectedViewCb(null);
        setFilterDataCb(null);
        setDataArr([]);
        setFilters([]);
        if (userType === 'custom') {
            setSelectedUserType(userType);
            doGetKeyMetricsConfig();
            doGetMyViews();
            if (initialHandle) {
                doFilterSchemes({ all: true, valuationDate: selectedValuationDate });
            } else {
                setSelectedValuationDateCb(null, true);
                setSearchedValueCb(null);
                doFilterSchemes({ all: true });
            }

            // TODO: Custom view name saving should be implemented.
        } else {
            setSelectedUserType(userType);
            doGetKeyMetricsConfig({ userType });
            doGetMyViews({ userType });
            if (initialHandle) {
                doFilterSchemes({ all: true, userType, valuationDate: selectedValuationDate });
            } else {
                setSelectedValuationDateCb(null, true);
                setSearchedValueCb(null);
                doFilterSchemes({ all: true });
            }
        }
        setSelectedUserTypeCb(userType);
    };

    const hideForceSaveModal = () => {
        setIsForceSaveModalVisible(false);
    };

    const showForceSaveModal = () => {
        setIsForceSaveModalVisible(true);
    };

    const viewsSpinLoader = () => {
        if (
            updateGlobalView_inProgress ||
            updateView_inProgress ||
            getKeyMetricsConfig_inProgress ||
            getMyViews_inProgress ||
            getMyDefaultOrgGroups_inProgress
        ) {
            return true;
        }
    };

    const handleLatestSavedViewName = () => {
        setLatestSavedViewName(null);
    };

    return (
        <>
            <Modal
                title={
                    <Typography>
                        <Text className="km-filter-text-title">Filter Views</Text>
                    </Typography>
                }
                className="lgim-styles-wrapper km-filter-model"
                visible={show}
                maskClosable={false}
                width={1200}
                onCancel={handleOnCancle}
                footer={
                    !viewsSpinLoader()
                        ? [
                              <div className="lgim-styles-wrapper km-div-filter-cm">
                                  <Button
                                      key="cancel"
                                      onClick={handleOnCancle}
                                      className=" lgim-styles-wrapper km-footer-btn-model-cancel"
                                  >
                                      <Typography.Text className="km-footer-btn-cancel-text">Cancel</Typography.Text>
                                  </Button>
                                  <Button
                                      key="submit"
                                      onClick={handleOnClick}
                                      className=" lgim-styles-wrapper km-footer-btn-model"
                                  >
                                      <Typography.Text className="km-footer-btn-text">Done</Typography.Text>
                                  </Button>
                              </div>
                          ]
                        : null
                }
            >
                {!viewsSpinLoader() ? (
                    <>
                        <Row>
                            <Col span={5} className="lgim-styles-wrapper km-col-container">
                                <ViewContainer
                                    filters={filters}
                                    views={
                                        commonUserClaims_data &&
                                        commonUserClaims_data.includes(CLAIMS.MANAGE_KEY_METRICS_GLOBAL_VIEWS_CLAIM) &&
                                        selectedUserType !== 'custom'
                                            ? views.filter(v => !v.userId)
                                            : views
                                    }
                                    changeFilterVisibility={changeFilterVisibility}
                                    handleViewChangeCb={handleViewChangeCb}
                                    hideModal={handleOnCancle}
                                    handleViewSaveCb={handleViewSaveCb}
                                    selectedView={selectedView}
                                    setSelectedView={setSelectedView}
                                    selectedUserType={selectedUserType}
                                    handleUserType={handleUserType}
                                    loggedUser={loggedUser}
                                    latestSavedViewName={latestSavedViewName}
                                    handleLatestSavedViewName={handleLatestSavedViewName}
                                />
                            </Col>

                            <Col span={19}>
                                <div className="km-filter-content">
                                    {!viewsSpinLoader() ? (
                                        <HeaderContainer
                                            filters={filters}
                                            views={views}
                                            changeFilterVisibility={changeFilterVisibility}
                                            handleViewChangeCb={handleViewChangeCb}
                                            hideModal={handleOnCancle}
                                            handleViewSaveCb={handleViewSaveCb}
                                            selectedView={selectedView}
                                            doDeleteView={doDeleteView}
                                            groups={getMyDefaultOrgGroups_data}
                                            loggedUser={loggedUser}
                                            doDeleteGlobalView={doDeleteGlobalView}
                                            selectedUserType={selectedUserType}
                                            updateGlobalView_inProgress={updateGlobalView_inProgress}
                                            updateView_inProgress={updateView_inProgress}
                                            setSelectedViewCb={setSelectedViewCb}
                                            setFilterDataCb={setFilterDataCb}
                                            doFilterSchemes={doFilterSchemes}
                                            selectedValuationDate={selectedValuationDate}
                                        />
                                    ) : null}
                                </div>
                                <div className="km-filter-content-items">
                                    {selectedView ? (
                                        <>
                                            <Typography className="km-filter-content-title ">
                                                <Text className="km-title-text">FILTER VALUES OR RANGES</Text>
                                            </Typography>
                                            <div style={{ overflowY: 'scroll', height: '320px' }}>
                                                {' '}
                                                <FilterContainer filters={filters} callback={callback} />
                                            </div>
                                        </>
                                    ) : null}
                                </div>
                            </Col>
                        </Row>
                    </>
                ) : (
                    <Row type="flex" align="middle" justify="center" className="lgim-styles-wrapper km-filter-spin">
                        <Spin />
                    </Row>
                )}
            </Modal>
            {isForceSaveModalVisible && (
                <FilterCommonModal
                    show={isForceSaveModalVisible}
                    handleShow={hideForceSaveModal}
                    views={views}
                    hideModal={handleOnCancle}
                    handleViewSaveCb={handleViewSaveCb}
                    groupArr={getMyDefaultOrgGroups_data}
                    loggedUser={loggedUser}
                    selectedView={selectedView}
                    action={MODAL.ACTIONS.FORCE_SAVE}
                    selectedUserType={selectedUserType}
                />
            )}
        </>
    );
};

const mapStateToProps = createStructuredSelector({
    getKeyMetricsConfig_data: getKeyMetricsConfig_data(),
    getKeyMetricsConfig_inProgress: getKeyMetricsConfig_inProgress(),
    getMyViews_data: getMyViews_data(),
    getMyViews_inProgress: getMyViews_inProgress(),
    getMyDefaultOrgGroups_data: getMyDefaultOrgGroups_data(),
    updateGlobalView_inProgress: updateGlobalView_inProgress(),
    updateView_inProgress: updateView_inProgress(),
    getMyDefaultOrgGroups_inProgress: getMyDefaultOrgGroups_inProgress()
});

const mapDispatchToProps = dispatch => ({
    doFilterSchemes: payload => {
        dispatch(filterSchemes(payload));
    },
    doGetMyViews: payload => {
        dispatch(getMyViews(payload));
    },
    doSaveView: payload => {
        dispatch(saveView(payload));
    },
    doUpdateView: payload => {
        dispatch(updateView(payload));
    },
    doEditView: payload => {
        dispatch(editView(payload));
    },
    doDeleteView: payload => {
        dispatch(deleteView(payload));
    },
    doGetMyDefaultOrgGroups: payload => {
        dispatch(getMyDefaultOrgGroups(payload));
    },
    doSaveGlobalView: payload => {
        dispatch(saveGlobalView(payload));
    },
    doUpdateGlobalView: payload => {
        dispatch(updateGlobalView(payload));
    },
    doEditGlobalView: payload => {
        dispatch(editGlobalView(payload));
    },
    doDeleteGlobalView: payload => {
        dispatch(deleteGlobalView(payload));
    },
    doGetKeyMetricsConfig: payload => {
        dispatch(getKeyMetricsConfig(payload));
    },
    doSaveMyCurrentAppliedView: payload => {
        dispatch(saveMyCurrentAppliedView(payload));
    },
    doRemoveMyCurrentAppliedView: payload => {
        dispatch(removeMyCurrentAppliedView(payload));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FilterModel);
