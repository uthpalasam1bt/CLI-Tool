import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import PickUsersContainer from '../../../../../../UILibrary/components/pickUsers';
import uiLibConstants from '../../../../../../UILibrary/constants';
import claimHelper from '../../../../../../helpers/claimHelper';
import { CORPORATE, INDIVIDUAL } from '../../../../../../UILibrary/components/forms/fields/TrusteeFields/constants';
import constants from '../../../../constants';
import NotificationHelper from '../../../../../../UILibrary/helpers/NotificationHelper';

const { STEP_ACTION_DATA_CHANGE } = constants;
const { PICK_USER_TYPE_CATEGORY, SINGLE_CATEGORY, CATEGORY_WITH_SUB_CATEGORIES } = uiLibConstants;
const dataTemplate = [
    {
        type: SINGLE_CATEGORY,
        title: 'INDIVIDUAL TRUSTEE SECTION',
        users: []
    },
    {
        type: CATEGORY_WITH_SUB_CATEGORIES,
        title: 'CORPORATE TRUSTEE SECTION',
        subCategories: []
    }
];

const TrusteePicker = props => {
    const {
        pickerTitle,
        dataset,
        userType,
        document,
        alias,
        updateWorkflowStepData,
        pickerDisabled,
        pickeriIconText,
        step,
        getLoggedUserClaims_data,
        showSelectButtons,
        pickerHooks,
        otherDocsToCopySelectedUsers: otherDocs,
        artifacts = {},
        pickIndividual = false,
        handleChangeDataset
    } = props;
    let getPath = `userPool.${userType}.${document}.${userType == 'approvers' ? 'users' : alias}`;
    let setPath = `${userType}.${document}.${userType == 'approvers' ? 'users' : alias}`;

    const [data, setData] = useState([]);

    useEffect(() => {
        if (dataset) {
            const template = _.cloneDeep(dataTemplate);
            const rawTrustees = _.get(dataset, getPath, []);
            let _dataset = _.cloneDeep(dataset);
            const selectedPool = _.get(_dataset, setPath, []);
            for (const entity of rawTrustees) {
                if (entity.trusteeEntityType == CORPORATE) {
                    const matchedEntity = selectedPool.findIndex(x => x.entityName == entity.entityName);
                    if (matchedEntity === -1) {
                        selectedPool.push({
                            ...entity,
                            trustees: []
                        });

                        let subPathToSetArr = setPath.split('.');
                        subPathToSetArr = '[' + subPathToSetArr.join('][') + ']';
                        _.setWith(_dataset, subPathToSetArr, selectedPool, Object);
                        handleChangeDataset(_dataset);
                    }

                    template[1].subCategories.push({
                        title: entity.entityName,
                        users: entity.trustees.map(user => ({
                            ...user,
                            isSelected: isSelectedTrustee(CORPORATE, user.email)
                        }))
                    });
                }
                if (entity.trusteeEntityType == INDIVIDUAL && pickIndividual) {
                    template[0].users.push({
                        ...entity.trustees[0],
                        isSelected: isSelectedTrustee(INDIVIDUAL, entity.trustees[0].email)
                    });
                }
            }

            setData(template);
        }
    }, [dataset]);

    const isSelectedTrustee = (type, email) => {
        const selectedTrustees = _.get(dataset, setPath, []);
        if (selectedTrustees.length > 0) {
            if (type == INDIVIDUAL) {
                const isSelected = selectedTrustees.find(
                    x => x.trusteeEntityType == INDIVIDUAL && x.trustees[0].email == email
                );
                if (isSelected) return true;
            } else {
                const corpEntities = selectedTrustees.filter(x => x.trusteeEntityType == CORPORATE);
                for (const entity of corpEntities) {
                    const isSelected = entity.trustees.find(x => x.email == email);
                    if (isSelected) return true;
                }
            }
        }
        return false;
    };

    const handleSaveDataset = stepData => {
        let _dataset = _.cloneDeep(stepData);
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

    const handleChange = (user, cat, subCat) => {
        let _dataset = _.cloneDeep(dataset);
        const rawTrustees = _.get(_dataset, getPath, []);
        const selectedPool = _.get(_dataset, setPath, []);

        if (!user.isSelected) {
            if (cat.type == SINGLE_CATEGORY) {
                // individual
                const selectedEntity = rawTrustees.find(
                    x => x.trusteeEntityType == INDIVIDUAL && x.trustees[0].email == user.email
                );
                selectedPool.push(selectedEntity);
            } else {
                // corporate
                const selectedEntity = rawTrustees.find(
                    x => x.trusteeEntityType == CORPORATE && x.entityName == subCat.title
                );
                const selectedTrustee = selectedEntity.trustees.find(x => x.email == user.email);
                const isEntityExists = selectedPool.findIndex(
                    x => x.trusteeEntityType == CORPORATE && x.entityName == subCat.title
                );
                if (isEntityExists > -1) selectedPool[isEntityExists].trustees.push(selectedTrustee);
                else selectedPool.push({ ...selectedEntity, trustees: [selectedTrustee] });
            }
        } else {
            if (cat.type == SINGLE_CATEGORY) {
                // individual
                const entityIndex = selectedPool.findIndex(
                    x => x.trusteeEntityType == INDIVIDUAL && x.trustees[0].email == user.email
                );
                selectedPool.splice(entityIndex, 1);
            } else {
                // corporate
                for (const [i, entity] of selectedPool.entries()) {
                    if (entity.trusteeEntityType == CORPORATE) {
                        const trusteeIndex = entity.trustees.findIndex(x => x.email == user.email);
                        if (trusteeIndex > -1) {
                            selectedPool[i].trustees.splice(trusteeIndex, 1);
                            break;
                        }
                    }
                }
            }
        }

        let subPathToSetArr = setPath.split('.');
        subPathToSetArr = '[' + subPathToSetArr.join('][') + ']';
        _.setWith(_dataset, subPathToSetArr, selectedPool, Object);
        handleSaveDataset(_dataset);
    };

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

    return (
        <PickUsersContainer
            pickUserType={PICK_USER_TYPE_CATEGORY}
            mainTitle={pickerTitle}
            iIconText={pickeriIconText}
            categories={data}
            handleSelect={handleChange}
            disabled={step.completed || step.rejected || pickerDisabled}
            artifacts={artifacts}
            showSelectBtns={hasPermission() || showSelectButtons}
        />
    );
};

export default TrusteePicker;
