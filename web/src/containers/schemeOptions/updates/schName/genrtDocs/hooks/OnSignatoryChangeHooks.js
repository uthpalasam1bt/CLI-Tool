import _ from 'lodash';

export const OnSignatoryChangeHook = {
    whenChangeSignatories: (formData, dataset, handleChangeDataset) => {
        if (_.get(dataset, 'signatories.IAA.clientTeam', null) && _.get(dataset, 'signatories.FMA', null)) {
            dataset.signatories.FMA.clientTeam = _.get(dataset, 'signatories.IAA.clientTeam', null);
            handleChangeDataset(dataset);
        } else {
            return;
        }
    }
};
