import _ from 'lodash';

export const OnSignatoryChangeHook = {
    whenChangeSignatories: (formData, dataset, handleChangeDataset) => {
        if (_.get(dataset, 'signatories.IAA.client', null)) {

            if (_.get(dataset, 'signatories.PMCProposal', null)) {
                dataset.signatories.PMCProposal.client = _.get(dataset, 'signatories.IAA.client', null);
            } else {
                dataset.signatories.PMCProposal = { client: _.get(dataset, 'signatories.IAA.client', null) }
            }
            if (_.get(dataset, 'signatories.FMA', null)) {
                dataset.signatories.FMA.client = _.get(dataset, 'signatories.IAA.client', null);
            } else {
                dataset.signatories.FMA = { client: _.get(dataset, 'signatories.IAA.client', null) }
            }
            handleChangeDataset(dataset);
        } else {
            return;
        }
    }
};
