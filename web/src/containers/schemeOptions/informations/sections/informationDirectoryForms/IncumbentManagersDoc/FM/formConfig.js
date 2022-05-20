import React from 'react';
import { Empty } from 'antd';
import _ from 'lodash';
import constants from '../../../../../../../UILibrary/constants';
import {
    NAME_OF_EIM,
    MANAGER_ACCOUNT_NUMBER,
    PRIMARY_CONTACT,
    PRIMARY_CONTACT_EMAIL,
    PRIMARY_CONTACT_PHONE_NUMBER,
    NAME_OF_EIM_LABEL,
    MANAGER_ACCOUNT_NUMBER_LABEL,
    PRIMARY_CONTACT_LABEL,
    PRIMARY_CONTACT_EMAIL_LABEL,
    PRIMARY_CONTACT_PHONE_NUMBER_LABEL
} from './constants';
import BaseTemplate from '../../../../../../../UILibrary/components/forms/formBase/FormBase';

const { FORM_TEMPLATES, FORM_FIELDS } = constants;
const { INPUT_FIELD, NUMBER_FIELD, PHONE_NUMBER_FIELD } = FORM_FIELDS;
const { FULL_CONTAINER, ROW, ADD_MORE_CONTAINER } = FORM_TEMPLATES;

export const formFields = (props = {}) => {
    const incumbentManagerForm = namePrefix => {
        return [
            {
                type: FULL_CONTAINER,
                label: NAME_OF_EIM_LABEL,
                field: {
                    name: `${namePrefix}.${NAME_OF_EIM}`,
                    className: 'form-control',
                    component: INPUT_FIELD
                }
            },
            {
                type: FULL_CONTAINER,
                label: MANAGER_ACCOUNT_NUMBER_LABEL,
                field: {
                    name: `${namePrefix}.${MANAGER_ACCOUNT_NUMBER}`,
                    className: 'form-control',
                    component: INPUT_FIELD
                }
            },
            {
                type: FULL_CONTAINER,
                label: PRIMARY_CONTACT_LABEL,
                field: {
                    name: `${namePrefix}.${PRIMARY_CONTACT}`,
                    className: 'form-control',
                    component: PHONE_NUMBER_FIELD
                }
            },
            {
                type: FULL_CONTAINER,
                label: PRIMARY_CONTACT_EMAIL_LABEL,
                field: {
                    name: `${namePrefix}.${PRIMARY_CONTACT_EMAIL}`,
                    className: 'form-control',
                    component: INPUT_FIELD,
                    isEmail: true
                }
            },
            {
                type: FULL_CONTAINER,
                label: PRIMARY_CONTACT_PHONE_NUMBER_LABEL,
                field: {
                    name: `${namePrefix}.${PRIMARY_CONTACT_PHONE_NUMBER}`,
                    className: 'form-control',
                    component: PHONE_NUMBER_FIELD
                }
            }
        ];
    };
    return [
        ...(_.get(props, `dirtyFormValues.hasManagers`, 'no') === 'yes' &&
        _.get(props, `dirtyFormValues.incumbentManagers`, null)
            ? [
                  {
                      type: ADD_MORE_CONTAINER,
                      bool: _.get(props, `dirtyFormValues.hasManagers`, 'no') === 'yes',
                      title: 'Incumbent Managers',
                      titleClass: 'pb-4',
                      name: 'incumbentManagers',
                      border: true,
                      maxLimit: 100,
                      divider: false,
                      showRemoveButton: false,
                      addMoreButtonVisible: false,
                      completed: true,
                      addMoreButtonText: '+ Add more',
                      downloadFieldConfig: incumbentManagerForm('incumbentManagers'),
                      repeatingComponent: namePrefix => (
                          <BaseTemplate data={incumbentManagerForm(namePrefix)} disabled={true} />
                      )
                  }
              ]
            : [
                  {
                      type: ROW,
                      rawComponents: (
                          <Empty
                              description={
                                  <span>
                                      {'The category you selected has no uploaded documents or no details entered yet.'}
                                  </span>
                              }
                          />
                      )
                  }
              ])
    ];
};
