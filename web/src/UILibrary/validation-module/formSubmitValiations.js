import _ from 'lodash';

export const userPickerValidations = (dataset, pathsToevaluate = []) => {
    let errors = {};
    for (const key of pathsToevaluate) {
        const users = _.get(dataset, key.pathToCheck, []);
        if (users.length == 0) {
            errors = { message: key.errorMessage || 'Please select the list of users before submit' };
            break;
        }
    }
    return errors;
};
