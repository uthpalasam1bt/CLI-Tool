/* 
     This is the functional configuration for creating scheme activation simple forms
     In this approach developers can pass javaScript Objects as configuration parameters.
     Inside this configuration we can specify the form labels and respective form fields to display in the form

 */
import _ from 'lodash';

import uiLibConstants from '../../../../../UILibrary/constants';
import { COLUMNS } from './constants';
const { FORM_TEMPLATES, FORM_FIELDS } = uiLibConstants;
const { TABLE_FIELD } = FORM_FIELDS;
const { FULL_VIEW_CONTAINER } = FORM_TEMPLATES;

export const formFields = props => {
    const name = _.get(props, 'dataset.formData.userName', '');
    const date = _.get(props, 'dataset.formData.date', '');
    const status = _.get(props, 'dataset.formData.hasSponsorBeenConsulted', '');

    let dataSource = [
        {
            key: 1,
            name: name,
            date: date,
            status: status
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
                    dataSource: dataSource,
                    columns: COLUMNS
                }
            }
        }
    ];
};
