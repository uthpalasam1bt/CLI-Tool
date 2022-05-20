import { pickerValidator } from '../../../../../workflows/templates/stepTemplates/pickUsers/pickerValidations';
import _ from 'lodash';

const getFunds = (fullArray, requestedIndex) => {
    let copiedFunds = {};
    for (let i = requestedIndex; i < fullArray.length; i++) {
        if (fullArray[i + 1] && fullArray[i + 1].funds && fullArray[i + 1].total) {
            console.log('object');
            copiedFunds = { funds: fullArray[i + 1].funds, total: fullArray[i + 1].total };
            break;
        } else if (!fullArray[i + 1]) {
            copiedFunds = {
                funds: [{ fundName: 'cash', fundType: 'cash', allocation: '100' }],
                total: '100'
            };
        }
    }
    return copiedFunds;
};

const setSavedKey = params => {
    const newRecords = params.filter(a => a && !a.funds);
    for (let a in params) {
        const index = typeof a !== 'number' ? parseInt(a) : a;
        if (params[index] && params[index].funds && newRecords && newRecords.length) {
            params[index] = { ...params[index], new: false };
        } else if (params[index] && !params[index].funds) {
            const fromCopied = getFunds(_.cloneDeep(params), index);
            const total = fromCopied.total;
            const funds = fromCopied.funds;
            params[index] = { ...params[index], new: true, total, funds };
        }
    }
    return params;
};

const dateSort = datesArray => {
    let sortedDirtyFormValues = datesArray.dates.slice().sort((date1, date2) => {
        return new Date(date2.date) - new Date(date1.date);
    });

    sortedDirtyFormValues = sortedDirtyFormValues.map((data, index) => {
        let obj = { ...data };
        if (!data.value) obj.value = 0;
        if (!data.total) obj.total = 0;
        return obj;
    });

    return sortedDirtyFormValues;
};

export const onSaveHooks = {
    whenSaveValidation: (documents, dataset, asyncErrors) => {
        return {};
    },
    whenSaveDataFormat: formData => {
        const formDataCopy = _.cloneDeep(formData);
        let withSavedKey = [];
        if (formDataCopy && formDataCopy.dates && formDataCopy.dates.length) {
            const sortedArray = dateSort(formDataCopy);
            withSavedKey = setSavedKey(_.cloneDeep(sortedArray));
        }
        formDataCopy.dates = withSavedKey;
        return formDataCopy;
    }
};
