import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { reduxForm, Field, formValueSelector, change } from 'redux-form';
import { useSelector } from 'react-redux';
import { Row, Col, Button } from 'antd';
import _ from 'lodash';

import { InputField, CheckboxGroup } from '../../../../UILibrary/components/forms/fields';
import { getUserGroupsNotifications, getClaimToNoficationMap } from '../selector';
import { required, length } from 'redux-form-validators';

import { TXT_REQUIRED } from '../../../../config/constants';
import { ADD_CLAIMS_GROUP_FORM, SELECT_AT_LEAST_ONE_NOTI_AND_CLAIM } from '../constants';
import NotificationHelper from '../../../../helpers/NotificationHelper';

let AddGroupForm = props => {
    const { inProgress, handleShow, handleSubmit, groupId, claims, notifications } = props;

    const [allowTabStatus, setAllowTabStatus] = useState('permissions');
    const dispatch = useDispatch();
    const lgimUserClaims = useSelector(state => state.userManagementReducer.claimData);
    const lgimUserGroupNotifications = useSelector(state => getUserGroupsNotifications(state));
    const cliamToNotificationsMap = useSelector(state => getClaimToNoficationMap(state));
    const sortedLgimData = _.sortBy(lgimUserClaims, 'label');
    const sortedNotificationData = _.sortBy(lgimUserGroupNotifications, 'label');

    const buttonGroupClass = tab => {
        return allowTabStatus === tab ? 'primary' : 'default';
    };

    const changeAllowToggle = tabIndex => {
        setAllowTabStatus(tabIndex);
    };

    const submitForm = e => {
        e.preventDefault();
        if (!claims || claims.length < 1) {
            changeAllowToggle('permissions');
            NotificationHelper.getInstance().error(SELECT_AT_LEAST_ONE_NOTI_AND_CLAIM);
            return;
        } else if (!notifications || notifications.length < 1) {
            changeAllowToggle('notifications');
            NotificationHelper.getInstance().error(SELECT_AT_LEAST_ONE_NOTI_AND_CLAIM);
            return;
        }

        //handleSubmit(e);
    };

    const onClaimsChange = (...[, newvalue, previous]) => {
        const claimId = _.difference(newvalue, previous)[0];
        if (!claimId) return;

        const map = cliamToNotificationsMap[claimId];
        if (!map) return;
        const populatedNotifications = _.uniq([...(notifications || []), ...map]);
        dispatch(change(ADD_CLAIMS_GROUP_FORM, 'notifications', populatedNotifications));
    };

    return (
        <form
            onSubmit={e => {
                submitForm(e);
                handleSubmit(e);
            }}
        >
            <h4 className="title">{groupId ? 'Update' : 'Add New'} Group</h4>
            <div className="create-scheme-form">
                <Row className="input-row first-row">
                    <Col xs={24}>
                        <label htmlFor="groupName" className="input-title">
                            Group name
                        </label>
                    </Col>
                    <Col xs={24}>
                        <Field
                            name="name"
                            className="form-control"
                            component={InputField}
                            validate={[required({ message: TXT_REQUIRED }), length({ max: 200 })]}
                        />
                    </Col>
                </Row>
                <Row className="input-row">
                    <Col className="column-pad-right" lg={12} xs={24}>
                        <Row>
                            <Button.Group>
                                <Button
                                    onClick={() => changeAllowToggle('permissions')}
                                    type={buttonGroupClass('permissions')}
                                    value="large"
                                >
                                    Permissions
                                </Button>
                                <Button
                                    onClick={() => changeAllowToggle('notifications')}
                                    type={buttonGroupClass('notifications')}
                                    value="default"
                                >
                                    Notifications
                                </Button>
                            </Button.Group>
                        </Row>
                    </Col>
                </Row>
                <Row className="input-row" hidden={allowTabStatus === 'permissions' ? false : true}>
                    <Col xs={24}>
                        <Field
                            name="claims"
                            options={sortedLgimData}
                            component={CheckboxGroup}
                            validate={[
                                required({ message: ' ' }), //tp2-1863
                                length({ minimum: 1, message: ' ' })
                            ]}
                            onChange={onClaimsChange}
                        />
                    </Col>
                </Row>
                <Row className="-row" hidden={allowTabStatus === 'notifications' ? false : true}>
                    <Col xs={24}>
                        <Field
                            name="notifications"
                            options={sortedNotificationData}
                            component={CheckboxGroup}
                            validate={[required({ message: ' ' }), length({ minimum: 1, message: ' ' })]}
                        />
                    </Col>
                </Row>
                <div className="footer">
                    <button className="btn-grey-o regular btn-close" type="button" onClick={() => handleShow(false)}>
                        Close
                    </button>
                    <button className="tpip-btn-blue regular" type="submit" disabled={inProgress}>
                        {groupId ? 'Update' : 'Add'} Group{' '}
                        {inProgress && <i className="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>}
                    </button>
                </div>
            </div>
        </form>
    );
};

const selector = formValueSelector(ADD_CLAIMS_GROUP_FORM);

AddGroupForm = connect(state => {
    const groupId = selector(state, 'groupId');
    const claims = selector(state, 'claims');
    const notifications = selector(state, 'notifications');

    return { groupId, claims, notifications };
})(AddGroupForm);

AddGroupForm = reduxForm({
    form: ADD_CLAIMS_GROUP_FORM
})(AddGroupForm);

export default AddGroupForm;
