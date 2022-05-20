import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import PickUsersContainer from '../../../../../../UILibrary/components/pickUsers';
import uiLibConstants from '../../../../../../UILibrary/constants';
import claimHelper from '../../../../../../helpers/claimHelper';
import constants from '../../../../constants';
import NotificationHelper from '../../../../../../UILibrary/helpers/NotificationHelper';

const { PICK_USER_TYPE_SIMPLE } = uiLibConstants;
const { STEP_ACTION_DATA_CHANGE } = constants;

let PickUsersTemplate = props => {
    const {
        pickerTitle,
        pickeriIconText,
        maxCount,
        dataset,
        step,
        updateWorkflowStepData,
        userType,
        document,
        alias,
        getLoggedUserClaims_data,
        pickerHooks,
        otherDocsToCopySelectedUsers: otherDocs,
        pickerDisabled = false,
        artifacts = {},
        showSelectButtons = false
    } = props;

    let getPath = `userPool.${userType}.${document}.${userType == 'approvers' ? 'users' : alias}`;
    let setPath = `${userType}.${document}.${userType == 'approvers' ? 'users' : alias}`;

    const [stepData, setStepData] = useState(null);

    useEffect(() => {
        if (dataset) setStepData(dataset);
    }, [dataset]);

    const hasPermission = () => {
        const stepActions = _.get(step, 'claims', {});
        if (Object.entries(stepActions).length == 0) return true;
        else {
            for (const SA in stepActions) {
                const hasClaim = claimHelper.getPermission(getLoggedUserClaims_data, step, SA);
                if (hasClaim) return true;
            }
            return false;
        }
    };

    const handleSaveDataset = data => {
        let _dataset = _.cloneDeep(data);
        let errors = {};

        if (otherDocs) {
            const selectedUsers = _.get(_dataset, setPath, {});
            if (typeof otherDocs == 'string' && otherDocs !== document) {
                _.set(_dataset, `${userType}.${otherDocs}.${userType == 'approvers' ? 'users' : alias}`, selectedUsers);
            } else if (Array.isArray(otherDocs)) {
                otherDocs.forEach(doc => {
                    if (doc !== document)
                        _.set(
                            _dataset,
                            `${userType}.${doc}.${userType == 'approvers' ? 'users' : alias}`,
                            selectedUsers
                        );
                });
            }
        }

        if (pickerHooks && pickerHooks.whenSaveDataFormat) _dataset = pickerHooks.whenSaveDataFormat(_dataset, props);
        if (pickerHooks && pickerHooks.whenSaveValidation) errors = pickerHooks.whenSaveValidation(_dataset, props);

        if (errors.message) {
            return NotificationHelper.getInstance().error(errors.message);
        }

        updateWorkflowStepData(STEP_ACTION_DATA_CHANGE, _dataset, () => {}, {});
    };

    return (
        <>
            <PickUsersContainer
                pickUserType={PICK_USER_TYPE_SIMPLE}
                title={pickerTitle}
                iIconText={pickeriIconText}
                maxCount={maxCount}
                dataset={stepData}
                handleChangeDataset={handleSaveDataset}
                disabled={step.completed || step.rejected || pickerDisabled}
                artifacts={artifacts}
                subPathToGet={getPath}
                subPathToSet={setPath}
                showSelectBtns={hasPermission() || showSelectButtons}
            />
        </>
    );
};

export default PickUsersTemplate;
