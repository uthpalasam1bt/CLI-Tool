import _ from 'lodash';
import constants from '../../../constants';
import { AddressValidateKeys } from '../fields/AddressField/constants';
import { AssetValueValidateKeys } from '../fields/AssetsValueSeparator/constants';
const { FORM_TEMPLATES, FORM_FIELDS } = constants;
const { ADDRESS_FIELD, DEFICIT_CONTRIBUTION_SECTION, ASSETS_VALUE_SEPARATOR } = FORM_FIELDS;

export const validateComponents = {
    [ADDRESS_FIELD]: (data, options = {}) => {
        let _data = data;

        AddressValidateKeys.map(key => {
            _data = _.omit(_data, `${key}`);
        });

        return _data;
    },
    [DEFICIT_CONTRIBUTION_SECTION]: (data, options = {}) => {
        const { prefix = null } = options;
        let _data = data;
        const key = prefix ? `${prefix}.screenDificitContribution` : 'screenDificitContribution';

        _data = _.omit(_data, `${key}`);
        return _data;
    },
    [ASSETS_VALUE_SEPARATOR]: (data, options = {}) => {
        const { prefix = null, currentAssetAT = null } = options;
        let _data = data;

        AssetValueValidateKeys[currentAssetAT].map(key => {
            const KEY = prefix ? `${prefix}.${key}` : `${key}`;
            _data = _.omit(_data, `${KEY}`);
        });

        return _data;
    }
};
