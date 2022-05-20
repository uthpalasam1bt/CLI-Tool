import React from 'react';
import moment from 'moment';
import { Divider } from 'antd';
import constants from '../../../../../../../UILibrary/constants';
import { SCHEMES_FORM_SECTION, SCHEMES_FORM_LABELS_SECTION, SCHEMES_FORM_TITLES_SECTION } from './constants';
import _ from 'lodash';

const {
    SCHEME_NAME,
    TRUSTEE_TYPE,
    DATE_TRUST_DEED,
    SCHEME_MEMBER,
    ADDRESS_FIELD_NAME,
    NUMBER_OF_TRUSTEES,
    NUMBER_OF_TRUSTEES_APPROVE,
    NUMBER_OF_TRUSTEES_SIGN,
    PRIMARY_TRUSTEE_NAME,
    PRIMARY_TRUSTEE_EMAIL,
    PRIMARY_TRUSTEE_CONTACT
} = SCHEMES_FORM_SECTION.FIELD_KEYS;
const {
    SCHEME_NAME_LABEL,
    TRUSTEE_TYPE_LABEL,
    DATE_TRUST_DEED_LABEL,
    SCHEME_MEMBER_LABEL,
    NUMBER_OF_TRUSTEES_LABEL,
    NUMBER_OF_TRUSTEES_APPROVE_LABEL,
    NUMBER_OF_TRUSTEES_SIGN_LABEL,
    PRIMARY_TRUSTEE_LABEL,
    PRIMARY_TRUSTEE_EMAIL_LABEL,
    PRIMARY_TRUSTEE_CONTACT_LABEL
} = SCHEMES_FORM_LABELS_SECTION.FIELD_LABELS;
const { ADDRESS_FIELD_TITLE, PRIMARY_TRUSTEE_DETAILS_TITLE } = SCHEMES_FORM_TITLES_SECTION.FIELD_TITLES;
const { FORM_TEMPLATES, FORM_FIELDS } = constants;
const {
    DATE_PICKER,
    INPUT_FIELD,
    ADDRESS_FIELD,
    NUMBER_FIELD,
    INDIVIDUAL_TRUSTEE_SECTION,
    CORPORATE_TRUSTEE_SECTION
} = FORM_FIELDS;
const { FULL_CONTAINER, FULL_VIEW_CONTAINER, ROW } = FORM_TEMPLATES;

export const formFields = (props = {}) => {
    const trustees = _.get(props, 'dirtyFormValues.trusteeEntities', []).filter(
        x => x && (x.trusteeEntityType === 'CORPORATE' || x.trusteeEntityType === 'INDIVIDUAL')
    );
    const showField = trustees.length > 0 ? true : false;

    const corpTrustees = _.get(props, 'dirtyFormValues.trusteeEntities', []).filter(
        x => x && x.trusteeEntityType == 'CORPORATE'
    );

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
        },

        {
            type: FULL_CONTAINER,
            bool: showField,
            label: DATE_TRUST_DEED_LABEL,
            field: {
                __order: 'c',
                name: DATE_TRUST_DEED,
                className: 'form-control',
                component: DATE_PICKER,
                options: {
                    disabledDate: current => current && current > moment().startOf('day')
                },
                validate: []
            }
        },
        {
            type: FULL_CONTAINER,
            bool: showField,
            label: SCHEME_MEMBER_LABEL,
            field: {
                __order: 'd',
                name: SCHEME_MEMBER,
                className: 'form-control',
                component: NUMBER_FIELD,
                validate: []
            }
        },
        {
            type: FULL_VIEW_CONTAINER,
            bool: showField,
            field: {
                name: ADDRESS_FIELD_NAME,
                __order: 'e',
                className: 'form-control',
                component: ADDRESS_FIELD,
                options: {
                    title: ADDRESS_FIELD_TITLE,
                    disabled: true
                }
            }
        },
        ...(trustees.length > 0
            ? [
                  {
                      type: ROW,
                      rawComponents: <Divider type="horizontal" />
                  },
                  {
                      tabOptions: {
                          activeKey: _.get(props, 'metaProps.activeTrusteeTab', 'individual'),
                          onChange: activeKey => props.metaProps.onchangeTrusteeTab(activeKey)
                      },
                      tabs: [
                          {
                              title: 'Individual Trustee',
                              tabKey: 'individual',
                              childComponents: [
                                  {
                                      type: FULL_VIEW_CONTAINER,
                                      props: { className: 'input-row' },
                                      bool: showField,
                                      field: {
                                          className: 'form-control',
                                          component: INDIVIDUAL_TRUSTEE_SECTION,
                                          options: {
                                              disabled: true,
                                              formName: props.formName,
                                              hideTrusteeCardActions: true
                                          }
                                      }
                                  }
                              ]
                          },
                          {
                              title: 'Corporate Trustee',
                              tabKey: 'corporate',
                              childComponents: [
                                  {
                                      type: FULL_VIEW_CONTAINER,
                                      bool: showField,
                                      field: {
                                          className: 'form-control',
                                          component: CORPORATE_TRUSTEE_SECTION,
                                          options: {
                                              disabled: true,
                                              formName: props.formName,
                                              hideTrusteeCardActions: true
                                          }
                                      }
                                  }
                              ]
                          }
                      ]
                  }
              ]
            : []),
        // {
        //     type: FULL_CONTAINER,
        //     bool: showField,
        //     label: NUMBER_OF_TRUSTEES_APPROVE_LABEL,
        //     field: {
        //         __order: 'h',
        //         name: NUMBER_OF_TRUSTEES_APPROVE,
        //         className: 'form-control',
        //         component: NUMBER_FIELD,
        //         validate: []
        //     }
        // },
        // {
        //     type: FULL_CONTAINER,
        //     bool: showField,
        //     label: NUMBER_OF_TRUSTEES_SIGN_LABEL,
        //     field: {
        //         __order: 'i',
        //         name: NUMBER_OF_TRUSTEES_SIGN,
        //         className: 'form-control',
        //         component: NUMBER_FIELD,
        //         validate: []
        //     }
        // }
    ];
};
