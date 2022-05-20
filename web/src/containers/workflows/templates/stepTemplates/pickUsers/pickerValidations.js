import _ from 'lodash';
import { userPickerValidations } from '../../../../../UILibrary/validation-module/formSubmitValiations';
import { UserRole } from '../../../../../../src/constants/userConstants';

// simple picker validator
export const pickerValidator = (dataset, userType, document, alias = [], errMsg = null) => {
    let checkList = [];
    if (userType == 'approvers') {
        checkList.push({
            pathToCheck: `approvers.${document}.users`,
            errorMessage: errMsg || `Please select approvers for ${document} document.`
        });
    } else if (userType == 'signatories') {
        alias.forEach(x => {
            if (typeof x == 'string') {
                checkList.push({
                    pathToCheck: `signatories.${document}.${x}`,
                    errorMessage:
                        errMsg ||
                        `Please select the list of signatories from ${document} ${
                            x == UserRole.ADMIN ? 'directors.' : 'Client Team.'
                        }`
                });
            } else if (typeof x == 'object') {
                checkList.push({
                    pathToCheck: `signatories.${document}.${x.alias}`,
                    errorMessage:
                        errMsg ||
                        x.errorMessage ||
                        `Please select the list of signatories from ${document} ${
                            x.alias == UserRole.ADMIN ? 'directors.' : 'Client Team.'
                        }`
                });
            }
        });
    }
    return userPickerValidations(dataset, checkList);
};

// trustee picker validator
export const trusteePickerValidator = (dataset, userType, document, alias = [], minTrusteesPerEntity) => {
    let errors = {};
    const _dataset = _.cloneDeep(dataset);
    if (userType == 'approvers') {
        errors = checkEntityAndTrusteeCount(_dataset, `approvers.${document}.users`, minTrusteesPerEntity);
    } else if (userType == 'signatories') {
        for (const role of alias) {
            errors = checkEntityAndTrusteeCount(
                _dataset,
                `signatories.${document}.${role}`,
                minTrusteesPerEntity,
                'CORPORATE'
            );
            if (errors.message) break;
        }
    }
    return errors;
};

const checkEntityAndTrusteeCount = (dataset, path, minTrustees, entityType = 'CORPORATE') => {
    const entities = _.get(dataset, path, []);
    if (typeof minTrustees == 'number' && minTrustees > -1) {
        const entitiesWithLowTrustees = entities.find(
            entity => entity.trusteeEntityType === entityType && _.get(entity, 'trustees', []).length < minTrustees
        );
        if (entitiesWithLowTrustees)
            return {
                message: `At least ${minTrustees} trustees must be selected per corporate trustee entity in signatories.`
            };
    }
    return {};
};
