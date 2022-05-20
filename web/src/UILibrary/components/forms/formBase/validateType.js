import _ from 'lodash';
import constants from '../../../constants';
const { FORM_TEMPLATES } = constants;
const { ADD_MORE_CONTAINER } = FORM_TEMPLATES;

export const validateType = {
    [ADD_MORE_CONTAINER]: (data, element) => {
        const { name } = element;
        let _data = data;
        _data = name && _.omit(_data, `${name}`);

        return _data;
    }
};
