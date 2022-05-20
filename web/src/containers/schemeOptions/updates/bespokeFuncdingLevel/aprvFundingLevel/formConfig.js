import { FORM_NAME } from './constants';
import constants from '../../../../../UILibrary/constants';

const { FORM_TEMPLATES, FORM_FIELDS } = constants;
const { FUNDING_LEVEL_TRIGGERS_FIELD } = FORM_FIELDS;
const { FULL_VIEW_CONTAINER } = FORM_TEMPLATES;

export const formFields = props => {
    console.log('props', props);
    return [
        {
            type: FULL_VIEW_CONTAINER,
            bool: true,
            field: {
                className: 'form-control',
                component: FUNDING_LEVEL_TRIGGERS_FIELD,
                options: {
                    formName: FORM_NAME,
                    hasPermissionToManage: true,
                    disabled: false
                }
            }
        }
    ];
};
