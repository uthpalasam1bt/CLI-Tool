import _ from 'lodash';
import uiLibConstants from '../../../../../UILibrary/constants';
import { COLUMNS, FIELD_NAMES } from './constants';
const { FORM_TEMPLATES, FORM_FIELDS } = uiLibConstants;
const { TABLE_FIELD } = FORM_FIELDS;
const { FULL_VIEW_CONTAINER } = FORM_TEMPLATES;

export const formFields = props => {
    let dataSource = [
        {
            key: 1,
            name: _.get(props, `dataset.formData.${FIELD_NAMES.RESPONDED_BY}`),
            date: _.get(props, `dataset.formData.${FIELD_NAMES.DATE}`),
            status: _.get(props, `dataset.formData.${FIELD_NAMES.HAS_SBEEN_CONSULATED}`)
        }
    ];

    return [
        {
            type: FULL_VIEW_CONTAINER,
            bool: true,
            field: {
                name: 'inputField',
                className: 'form-control',
                component: TABLE_FIELD,
                options: {
                    title: 'Sponsor consultation status',
                    columns: COLUMNS,
                    dataSource: dataSource
                }
            }
        }
    ];
};
