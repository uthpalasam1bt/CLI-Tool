import React from 'react';
import _ from 'lodash';
import {
    IM_FEE_FORM_SECTION
} from '../constants';

export const OnApproveHooks = {
    onApproveHook: (dataset, dirtyFormValues, handleChangeDataset) => {
        let isImError = false;
        let imError = 'Please enter ';

        const overrideStandardFees = _.get(dirtyFormValues, 'imFee.overrideStandardFees', null);
        const fmFee = _.get(dirtyFormValues, 'imFee.fmfee', null);
        const fmFeePercentage = _.get(dirtyFormValues, 'imFee.fmFeePercentage', null);

        if (!overrideStandardFees) {
            isImError = true;
            imError = imError + `override standard fees`;
        }
        if (!fmFee && fmFee !== 0 && overrideStandardFees === 'yes') {
            imError = isImError
                ? imError + `,investment management fee for scheme`
                : imError + `investment management fee for scheme`;
            isImError = true;
        }
        if (!fmFeePercentage && overrideStandardFees === 'yes') {
            imError = isImError
                ? imError + `,investment management fee for scheme (% element)`
                : imError + `investment management fee for scheme (% element)`;
            isImError = true;
        }

        if (isImError) {
            imError = imError + '.';
            return { error: { message: imError, navigateTo: IM_FEE_FORM_SECTION.KEY } };
        }
        if (dataset && dirtyFormValues && handleChangeDataset) {
            dataset.formData = dirtyFormValues;
            handleChangeDataset(dataset);
        }
        return null;

    }
};
