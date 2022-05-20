import _ from 'lodash';
import React from 'react';
import config from 'appConfig';
import moment from 'moment';

import BaseTemplate from '../../../../../UILibrary/components/forms/formBase/FormBase';
import constants from '../../../../../UILibrary/constants';
import connectApi from '../../../../../middlewares/connectApi';
import { INVALID_ENTRY_MESSAGE } from '../../../constants/schemeOptionConstants';
import { TrusteeTypes } from './constants';

const { bucket: privateBucket, publicBucket, generateBucket } = config;
const { FORM_TEMPLATES, FORM_FIELDS, UPLOAD_FILE_TYPES } = constants;
const {
    INPUT_FIELD,
    ADDRESS_FIELD,
    NUMBER_FIELD,
    CURRENCY_FIELD,
    MULTIPLE_FILE_UPLOADER,
    DATE_PICKER,
    INDIVIDUAL_TRUSTEE_SECTION,
    CORPORATE_TRUSTEE_SECTION,
    PHONE_NUMBER_FIELD
} = FORM_FIELDS;
const { FULL_CONTAINER, FULL_VIEW_CONTAINER, ADD_MORE_CONTAINER, ROW } = FORM_TEMPLATES;
const { riaa, addtrst } = config.uploads;
const { PDF } = UPLOAD_FILE_TYPES;
let corpTrusteeCompanyName = false;

const incumbentManagerForm = namePrefix => {
    return [
        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Name of external invesment manager',
            field: {
                __order: 'a',
                name: `${namePrefix}.invesmentManagerName`,
                className: 'form-control',
                component: INPUT_FIELD,
                validationModules: [{ moduleName: 'RequiredValidate', options: { message: 'Required' } }]
            }
        },
        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Manager account number',
            field: {
                __order: 'b',
                name: `${namePrefix}.invesmentManagerAccountNumber`,
                className: 'form-control',
                component: INPUT_FIELD,
                validationModules: [{ moduleName: 'RequiredValidate', options: { message: 'Required' } }]
            }
        },
        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Primary contact',
            field: {
                __order: 'c',
                name: `${namePrefix}.invesmentManagerPimaryContact`,
                className: 'form-control',
                component: PHONE_NUMBER_FIELD,
                placeholder: '+',
                validationModules: [{ moduleName: 'RequiredValidate', options: { message: 'Required' } }]
            }
        },

        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Contact email address',
            field: {
                __order: 'd',
                name: `${namePrefix}.invesmentManagerEmail`,
                className: 'form-control',
                component: INPUT_FIELD,
                validationModules: [{ moduleName: 'RequiredValidate', options: { message: 'Required' } }]
            }
        },

        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Contact phone number',
            field: {
                __order: 'e',
                name: `${namePrefix}.invesmentManagerContactNumber`,
                className: 'form-control',
                component: PHONE_NUMBER_FIELD,
                placeholder: '+',
                validationModules: [{ moduleName: 'RequiredValidate', options: { message: 'Required' } }]
            }
        }
    ];
};

export const formFields = props => {
    let disabled = true;
    const { hasManagers } = props;
    const corpTrustees = _.get(props, 'trusteeEntities', []).filter(x => x && x.trusteeEntityType == 'CORPORATE');

    return [
        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Please upload the HMRC registration confirmation',
            field: {
                name: 'hmrcDocument',
                className: 'form-control',
                disabled: disabled,
                component: MULTIPLE_FILE_UPLOADER,
                options: {
                    accept: PDF,
                    url: riaa.requestIAA,
                    bucketName: privateBucket,
                    api: connectApi,
                    params: [props.entityId, 'iaa']
                },
                validationModules: [{ moduleName: 'RequiredValidate', options: { message: 'Required' } }]
            }
        },
        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Please upload the latest scheme accounts',
            field: {
                name: 'schemeAccount',
                className: 'form-control',
                disabled: disabled,
                component: MULTIPLE_FILE_UPLOADER,
                options: {
                    accept: PDF,
                    url: riaa.requestIAA,
                    bucketName: privateBucket,
                    api: connectApi,
                    params: [props.entityId, 'iaa']
                },
                validationModules: [{ moduleName: 'RequiredValidate', options: { message: 'Required' } }]
            }
        },
        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Upload any supporting documents requested',
            field: {
                name: 'otherDocuments',
                className: 'form-control',
                disabled: disabled,
                component: MULTIPLE_FILE_UPLOADER,
                options: {
                    accept: PDF,
                    url: riaa.requestIAA,
                    bucketName: privateBucket,
                    api: connectApi,
                    params: [props.entityId, 'iaa']
                },
                validationModules: [{ moduleName: 'RequiredValidate' }]
            }
        },
        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Approximate number of members in the scheme',
            field: {
                __order: 'a',
                name: 'numberOfMembers',
                disabled: disabled,
                className: 'form-control',
                component: CURRENCY_FIELD,
                options: {
                    props: {
                        precision: 0,
                        className: 'form-control'
                    }
                },
                validationModules: [
                    { moduleName: 'RequiredValidate' },
                    { moduleName: 'NumericalValidate', options: { message: INVALID_ENTRY_MESSAGE } }
                ]
            }
        },

        {
            type: FULL_VIEW_CONTAINER,
            bool: true,
            field: {
                __order: 'b',
                name: 'addressField',
                disabled: disabled,
                className: 'form-control',
                component: ADDRESS_FIELD,
                options: {
                    title: 'Address of trustees for correspondence',
                    disabled: disabled
                }
            }
        },
        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Upload latest deed of trustee appointment and removal',
            field: {
                disabled: disabled,
                name: 'trustDeed',
                className: 'form-control',
                component: MULTIPLE_FILE_UPLOADER,
                options: {
                    accept: PDF,
                    url: addtrst.addTrustee,
                    bucketName: privateBucket,
                    api: connectApi,
                    params: [props.entityId, 'iaa']
                },
                validationModules: [{ moduleName: 'RequiredValidate', options: { message: 'Required' } }]
            }
        },
        ...(corpTrustees.length
            ? [
                  {
                      type: FULL_CONTAINER,
                      bool: corpTrustees.length > 0 && corpTrusteeCompanyName,
                      label: 'Certificate of incorporation (for corporate trustees)',
                      field: {
                          disabled: disabled,
                          name: 'certificateOfIncorporation',
                          className: 'form-control',
                          component: MULTIPLE_FILE_UPLOADER,
                          options: {
                              accept: PDF,
                              url: riaa.requestIAA,
                              bucketName: privateBucket,
                              api: connectApi,
                              params: [props.entityId, 'iaa']
                          },
                          validationModules: [
                              {
                                  moduleName: 'RequiredValidate'
                              }
                          ]
                      }
                  }
              ]
            : []),

        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Date of trust deed',
            field: {
                __order: 'c',
                disabled: disabled,
                name: 'dateOfTrustDeed',
                className: 'form-control',
                component: DATE_PICKER,
                options: {
                    disabledDate: current => current && current > moment().startOf('day')
                },
                validationModules: [{ moduleName: 'RequiredValidate', options: { message: 'Required' } }]
            }
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
                            __order: 'd',
                            type: FULL_VIEW_CONTAINER,
                            props: { className: 'input-row' },
                            bool: true,
                            field: {
                                __order: 'd',
                                className: 'form-control',
                                component: INDIVIDUAL_TRUSTEE_SECTION,

                                options: {
                                    disabled: true,
                                    formName: props.formOptions.formName,
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
                            __order: 'e',
                            type: FULL_VIEW_CONTAINER,
                            bool: true,
                            field: {
                                __order: 'e',
                                className: 'form-control',
                                component: CORPORATE_TRUSTEE_SECTION,

                                options: {
                                    disabled: true,
                                    formName: props.formOptions.formName,
                                    hideTrusteeCardActions: true
                                }
                            }
                        }
                    ]
                }
            ]
        },

        ...(_.get(props, 'hasManagers', 'no') === 'yes'
            ? [
                  {
                      type: ADD_MORE_CONTAINER,
                      bool: hasManagers && hasManagers === 'yes',
                      title: 'Incumbent Managers',
                      titleClass: 'pb-4',
                      name: 'incumbentManagers',
                      __order: 'f',
                      border: true,
                      maxLimit: 100,
                      divider: false,
                      showRemoveButton: !disabled,
                      addMoreButtonVisible: !disabled,
                      completed: true,
                      addMoreButtonText: '+ Add more',
                      downloadFieldConfig: incumbentManagerForm('incumbentManagers'),
                      repeatingComponent: namePrefix => (
                          <BaseTemplate data={incumbentManagerForm(namePrefix)} disabled={disabled} />
                      )
                  }
              ]
            : [])
    ];
};
