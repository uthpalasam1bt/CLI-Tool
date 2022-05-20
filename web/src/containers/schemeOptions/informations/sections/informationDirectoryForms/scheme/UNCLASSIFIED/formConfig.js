import React from 'react';
import moment from 'moment';
import { Divider } from 'antd';
import constants from '../../../../../../../UILibrary/constants';
import { SCHEMES_FORM_SECTION, SCHEMES_FORM_LABELS_SECTION, SCHEMES_FORM_TITLES_SECTION } from './constants';
import _ from 'lodash';

const { SCHEME_NAME} = SCHEMES_FORM_SECTION.FIELD_KEYS;
const {SCHEME_NAME_LABEL} = SCHEMES_FORM_LABELS_SECTION.FIELD_LABELS;
const { FORM_TEMPLATES, FORM_FIELDS } = constants;
const {  INPUT_FIELD} = FORM_FIELDS;
const { FULL_CONTAINER } = FORM_TEMPLATES;

export const formFields = (props = {}) => {

    return [
        {
            type: FULL_CONTAINER,
            bool: true,
            label: SCHEME_NAME_LABEL,
            field: {
                __order: 'a',
                name: SCHEME_NAME,
                className: 'form-control',
                component: INPUT_FIELD,
                validate: []
            }
        }
    ];
};
