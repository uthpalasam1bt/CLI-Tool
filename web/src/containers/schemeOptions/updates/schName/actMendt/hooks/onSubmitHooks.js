import _ from 'lodash';
import moment from 'moment';
export const OnSubmitHook = {
    whenSubmitDataFormat: (data, props) => {
        let formData;
        formData = { ...data, searchableSchemeName: _.get(props, 'dataset.formData.schemeName', '').toLowerCase() };
        return formData;
    }
};
