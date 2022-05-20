import _ from 'lodash';
import { useSelector } from 'react-redux';
import React, { useState, useRef } from 'react';
import { Modal, Button, Input, Select, Typography } from 'antd';

import NotificationHelper from '../../helpers/NotificationHelper';

import { UserRole } from '../../constants/userConstants';
import { MODAL, CLAIMS } from '../../constants/keyMetricsConstants';

import { commonUserClaims } from '../../containers/dashboard/UserManagement/selector';

const { ADMIN, ADVISORY, SPECIAL_ADVISORY } = UserRole;

const FilterCommonModal = props => {
    const {
        show,
        handleShow,
        handleViewSaveCb,
        groupArr = [],
        loggedUser,
        selectedView = null,
        action,
        selectedUserType
    } = props;
    const [viewName, setViewName] = useState(
        _.has(selectedView, `viewName`) && action !== 'save-as' && action !== 'force-save'
            ? _.get(selectedView, `viewName`, '')
            : ''
    );
    const [selectedGroups, setSelectedGroups] = useState(
        _.has(selectedView, `groups`) && action !== 'save-as' ? _.get(selectedView, `groups`, []) : []
    );

    const viewNameRef = useRef('');

    const commonUserClaims_data = useSelector(state => commonUserClaims(state));

    const handleOnButtonClick = () => {
        if (!viewName || viewName === '') {
            NotificationHelper.getInstance().error('Please enter view name');
            viewNameRef.current.focus();
            return;
        }
        if (action === MODAL.ACTIONS.FORCE_SAVE) {
            handleViewSaveCb(viewName);
        } else {
            if (!selectedView.userId) {
                if (action === MODAL.ACTIONS.SAVE_AS) {
                    if (
                        loggedUser.primaryRole === ADMIN &&
                        commonUserClaims_data &&
                        commonUserClaims_data.includes(CLAIMS.MANAGE_KEY_METRICS_GLOBAL_VIEWS_CLAIM) &&
                        selectedUserType !== 'custom'
                    ) {
                        handleViewSaveCb(viewName, null, selectedGroups);
                    } else {
                        handleViewSaveCb(viewName);
                    }
                } else if (action === MODAL.ACTIONS.SAVE) {
                    handleViewSaveCb(null, selectedView.viewId ? selectedView.viewId : null, selectedGroups);
                } else if (action === MODAL.ACTIONS.EDIT) {
                    handleViewSaveCb(viewName, selectedView.viewId ? selectedView.viewId : null, selectedGroups);
                }
            } else {
                if (action === MODAL.ACTIONS.SAVE_AS) {
                    handleViewSaveCb(viewName);
                } else if (action === MODAL.ACTIONS.SAVE) {
                    handleViewSaveCb(null, selectedView.viewId ? selectedView.viewId : null);
                } else if (action === MODAL.ACTIONS.EDIT) {
                    handleViewSaveCb(viewName, selectedView.viewId ? selectedView.viewId : null);
                }
            }
        }
        handleShow();
    };

    const handleOnCancle = e => {
        handleShow();
    };

    function handleChange(value) {
        setSelectedGroups([
            ...value
                .toString()
                .split(',')
                .map(x => parseInt(x))
        ]);
    }

    return (
        <>
            <Modal
                title={
                    action === MODAL.ACTIONS.SAVE_AS ? (
                        <Typography.Text className="lgim-styles-wrapper km-cm-title">
                            Save view as a{' '}
                            {selectedUserType === ADMIN &&
                            commonUserClaims_data &&
                            commonUserClaims_data.includes(CLAIMS.MANAGE_KEY_METRICS_GLOBAL_VIEWS_CLAIM)
                                ? 'LGIM view'
                                : selectedUserType === ADVISORY &&
                                  commonUserClaims_data &&
                                  commonUserClaims_data.includes(CLAIMS.MANAGE_KEY_METRICS_GLOBAL_VIEWS_CLAIM)
                                ? 'Advisor view'
                                : selectedUserType === SPECIAL_ADVISORY &&
                                  commonUserClaims_data &&
                                  commonUserClaims_data.includes(CLAIMS.MANAGE_KEY_METRICS_GLOBAL_VIEWS_CLAIM)
                                ? 'Special Advisor view'
                                : selectedUserType === 'client' &&
                                  commonUserClaims_data &&
                                  commonUserClaims_data.includes(CLAIMS.MANAGE_KEY_METRICS_GLOBAL_VIEWS_CLAIM)
                                ? 'Client view'
                                : 'Custom view'}
                        </Typography.Text>
                    ) : action === MODAL.ACTIONS.SAVE ? (
                        <Typography.Text className="lgim-styles-wrapper km-cm-title">Save view</Typography.Text>
                    ) : action === MODAL.ACTIONS.EDIT ? (
                        <Typography.Text className="lgim-styles-wrapper km-cm-title">Edit view</Typography.Text>
                    ) : action === MODAL.ACTIONS.FORCE_SAVE ? (
                        <Typography.Text className="lgim-styles-wrapper km-cm-title">
                            Save Modification as a Custom View
                        </Typography.Text>
                    ) : (
                        ''
                    )
                }
                className="lgim-styles-wrapper km-filter-common"
                visible={show}
                onCancel={handleOnCancle}
                footer={[
                    <div>
                        <Button
                            key="cancel"
                            onClick={handleOnCancle}
                            className=" lgim-styles-wrapper km-filter-cm-btn-cancel"
                        >
                            <Typography.Text className="km-cm-btn-text-cansel-cn">Cancel</Typography.Text>
                        </Button>
                        <Button
                            key="submit"
                            onClick={handleOnButtonClick}
                            className="lgim-styles-wrapper  km-filter-cm-btn"
                        >
                            {action === MODAL.ACTIONS.SAVE_AS ? (
                                <Typography.Text className="km-cm-btn-text-cn">Save</Typography.Text>
                            ) : action === MODAL.ACTIONS.SAVE ? (
                                <Typography.Text className="km-cm-btn-text-cn">Save</Typography.Text>
                            ) : action === MODAL.ACTIONS.EDIT ? (
                                <Typography.Text className="km-cm-btn-text-cn">Update</Typography.Text>
                            ) : action === MODAL.ACTIONS.FORCE_SAVE ? (
                                <Typography.Text className="km-cm-btn-text-cn">Save</Typography.Text>
                            ) : (
                                ''
                            )}
                        </Button>
                    </div>
                ]}
                width={380}
                centered
            >
                <>
                    <div className="km-filter-cm-tb-space ">
                        <Typography className="km-view-name">
                            {action === MODAL.ACTIONS.FORCE_SAVE ? `New custom view name` : 'New view name'}
                        </Typography>
                        <Input
                            placeholder="View Name"
                            value={viewName}
                            onChange={e => {
                                setViewName(e.target.value);
                            }}
                            className="km-cm-input"
                            ref={viewNameRef}
                        />
                    </div>

                    {loggedUser.primaryRole === ADMIN &&
                    commonUserClaims_data &&
                    commonUserClaims_data.includes(CLAIMS.MANAGE_KEY_METRICS_GLOBAL_VIEWS_CLAIM) &&
                    !selectedView.userId &&
                    selectedUserType === ADMIN &&
                    action !== MODAL.ACTIONS.FORCE_SAVE ? (
                        <>
                            <div className="km-filter-cm-tb-space ">
                                <Typography className="km-view-name">Assign groups</Typography>
                                <Select
                                    mode="multiple"
                                    className="lgim-styles-wrapper km-filter-cm-tb-space km-cm-select"
                                    placeholder="select group"
                                    onChange={handleChange}
                                    showArrow
                                    defaultValue={selectedGroups}
                                >
                                    {groupArr.map((res, k) => {
                                        return (
                                            <Select.Option key={res.groupId} value={res.groupId}>
                                                <Typography.Text className="km-select-user-option">
                                                    {res.groupName}
                                                </Typography.Text>
                                            </Select.Option>
                                        );
                                    })}
                                </Select>
                            </div>
                        </>
                    ) : null}
                </>
            </Modal>
        </>
    );
};

export default FilterCommonModal;
