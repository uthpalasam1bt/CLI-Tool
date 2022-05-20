import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import constants from '../../../../constants';
import UserAssignComponent from '../../../../../../components/userAssign';

const { STEP_ACTION_ASSIGNEE } = constants;

const UserAssign = props => {
    const { dataset, step, disabled = false, handleUpdate } = props;
    const [dataSource, changeDataSource] = useState([]);
    const [assignUserValue, changeAssignUserValue] = useState(null);

    useEffect(() => {
        handleDataSource(_.get(dataset, 'assigneeList', []));
        changeAssignUserValue(_.get(dataset, 'assignee', ''));
    }, [dataset]);

    const handleDataSource = assignedUsers => {
        if (assignedUsers && assignedUsers.length) {
            const filteredData = [];
            assignedUsers.map(user => {

                const assigneeObj = {
                    value: user.email,
                    text: `${user.firstName} ${user.lastName} / ${user.email}`
                };

                if (filteredData.length) {
                    const isExist = filteredData.find(ob => ob.value === user.email);
                    if (!isExist) filteredData.push(assigneeObj);
                } else {
                    filteredData.push(assigneeObj);
                }
                return assigneeObj;
            });
            changeDataSource(filteredData);
        } else {
            changeDataSource([]);
        }
    };

    const submitValue = data => {
        changeAssignUserValue(data);
        handleUpdate(STEP_ACTION_ASSIGNEE, { assignee: data }, () => {}, {});
    };

    return (
        <UserAssignComponent
            submitValue={submitValue}
            assineeEnabled={!((step && (step.completed || step.rejected)) || disabled)}
            assignUserValue={step && step.completed ? null : assignUserValue}
            dataSource={dataSource}
        />
    );
};

export default UserAssign;
