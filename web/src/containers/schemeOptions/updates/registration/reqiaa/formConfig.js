import React from 'react';
import config from 'appConfig';
import _ from 'lodash';

import BaseTemplate from '../../../../../UILibrary/components/forms/formBase/FormBase';
import constants from '../../../../../UILibrary/constants';
import connectApi from '../../../../../middlewares/connectApi';
import { INVALID_ENTRY_MESSAGE } from '../../../constants/schemeOptionConstants';
import { IAA_FORM_SECTION } from './constants';
import moment from 'moment';
import ClaimHelper from '../../../../../helpers/claimHelper';
import wfConstants from '../../../../workflows/constants';

const { bucket: privateBucket } = config;
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
const { FULL_CONTAINER, FULL_VIEW_CONTAINER, ADD_MORE_CONTAINER } = FORM_TEMPLATES;
const { riaa, addtrst } = config.uploads;
const { STEP_ACTION_PROCEED } = wfConstants;

const { PDF } = UPLOAD_FILE_TYPES;

const incumbentManagerForm = namePrefix => {
    return [
        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Name of external invesment manager',
            field: {
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
                name: `${namePrefix}.invesmentManagerEmail`,
                className: 'form-control',
                component: INPUT_FIELD,
                isEmail: true,

                validationModules: [
                    {
                        moduleName: 'RequiredValidate',
                        options: { message: 'Required' }
                    },
                    {
                        moduleName: 'EmailValidate',
                        options: {
                            message: 'Invalid email address.'
                        }
                    }
                ]
            }
        },

        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Contact phone number',
            field: {
                name: `${namePrefix}.invesmentManagerContactNumber`,
                className: 'form-control',
                component: PHONE_NUMBER_FIELD,
                placeholder: '+',
                validationModules: []
            }
        }
    ];
};

export const formFields = props => {
    let stepCompleted = props.step && props.step.completed;
    const dontHaveClaim = _.get(props, 'options.submitButton.showButton', true);
    const { iaaForm } = props;

    const corpTrustees = _.get(props, 'iaaForm.trusteeEntities', []).filter(
        x => x && x.trusteeEntityType == 'CORPORATE'
    );
    let corpTrusteeCompanyName = false;
    const isHasTrustee = corpTrustees.find(
        entity =>
            entity &&
            entity.trusteeEntityType == 'CORPORATE' &&
            entity.entityName &&
            entity.entityName.length &&
            Array.isArray(entity.trustees) &&
            entity.trustees.length > 0
    );
    if (isHasTrustee) corpTrusteeCompanyName = true;

    return [
        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Please upload the HMRC registration confirmation',
            field: {
                __order: 'a',
                name: 'hmrcDocument',
                className: 'form-control',
                component: MULTIPLE_FILE_UPLOADER,
                options: {
                    accept: PDF,
                    url: riaa.requestIAA,
                    bucketName: privateBucket,
                    api: connectApi,
                    params: [props.entityId, 'iaa']
                },
                validationModules: [{ moduleName: 'RequiredValidate', options: { message: 'Required' } }],
                disabled: stepCompleted || !dontHaveClaim
            }
        },
        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Please upload the latest scheme accounts',
            field: {
                __order: 'b',
                name: 'schemeAccount',
                className: 'form-control',
                component: MULTIPLE_FILE_UPLOADER,
                options: {
                    accept: PDF,
                    url: riaa.requestIAA,
                    bucketName: privateBucket,
                    api: connectApi,
                    params: [props.entityId, 'iaa']
                },
                validationModules: [{ moduleName: 'RequiredValidate', options: { message: 'Required' } }],
                disabled: stepCompleted || !dontHaveClaim
            }
        },
        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Upload any supporting documents requested',
            field: {
                __order: 'b',
                name: 'otherDocuments',
                className: 'form-control',
                component: MULTIPLE_FILE_UPLOADER,
                options: {
                    accept: PDF,
                    url: riaa.requestIAA,
                    bucketName: privateBucket,
                    api: connectApi,
                    params: [props.entityId, 'iaa']
                },
                disabled: stepCompleted || !dontHaveClaim
            }
        },
        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Approximate number of members in the scheme',
            field: {
                __order: 'c',
                name: 'numberOfMembers',
                className: 'form-control',
                component: CURRENCY_FIELD,
                options: {
                    props: {
                        precision: 0,
                        className: 'form-control'
                    }
                },
                validationModules: [
                    { moduleName: 'RequiredValidate', options: { message: 'Required' } },
                    { moduleName: 'NumericalValidate', options: { '>=': 1, message: INVALID_ENTRY_MESSAGE } }
                ]
            }
        },

        {
            type: FULL_VIEW_CONTAINER,
            bool: true,
            field: {
                name: 'addressField',
                __order: 'd',
                className: 'form-control',
                component: ADDRESS_FIELD,
                options: {
                    title: 'Address of trustees for correspondence',
                    disabled: stepCompleted
                }
            }
        },
        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Upload latest deed of trustee appointment and removal',
            field: {
                __order: 'e',
                disabled: stepCompleted || !dontHaveClaim,
                name: 'trustDeed',
                className: 'form-control',
                component: MULTIPLE_FILE_UPLOADER,
                options: {
                    accept: PDF,
                    url: addtrst.addTrustee,
                    bucketName: privateBucket,
                    api: connectApi,
                    params: [props.entityId, 'addtrst']
                },
                validationModules: [{ moduleName: 'RequiredValidate', options: { message: 'Required' } }]
            }
        },

        ...(corpTrustees.length
            ? [
                  {
                      type: FULL_CONTAINER,
                      bool: corpTrusteeCompanyName,
                      label: 'Certificate of incorporation (for corporate trustees)',
                      field: {
                          __order: 'e',
                          bool: corpTrusteeCompanyName,
                          disabled: stepCompleted || !dontHaveClaim,
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
                                  moduleName: 'RequiredValidate',
                                  options: { message: 'Required' }
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
                __order: 'i',
                disabled: stepCompleted,
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
                            type: FULL_VIEW_CONTAINER,
                            props: { className: 'input-row' },
                            bool: true,
                            field: {
                                name: 'individual',
                                className: 'form-control',
                                component: INDIVIDUAL_TRUSTEE_SECTION,
                                options: {
                                    disabled:
                                        stepCompleted ||
                                        !ClaimHelper.getPermission(
                                            props.getLoggedUserClaims_data,
                                            props.step,
                                            STEP_ACTION_PROCEED
                                        ),
                                    tabKey: IAA_FORM_SECTION.KEY,
                                    formName: props.formName,
                                    hideTrusteeCardActions:
                                        stepCompleted ||
                                        !ClaimHelper.getPermission(
                                            props.getLoggedUserClaims_data,
                                            props.step,
                                            STEP_ACTION_PROCEED
                                        ),
                                    stepCompleted
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
                            bool: true,
                            field: {
                                name: 'corporate',
                                className: 'form-control',
                                component: CORPORATE_TRUSTEE_SECTION,
                                options: {
                                    disabled:
                                        stepCompleted ||
                                        !ClaimHelper.getPermission(
                                            props.getLoggedUserClaims_data,
                                            props.step,
                                            STEP_ACTION_PROCEED
                                        ),
                                    tabKey: IAA_FORM_SECTION.KEY,
                                    formName: props.formName,
                                    hideTrusteeCardActions:
                                        stepCompleted ||
                                        !ClaimHelper.getPermission(
                                            props.getLoggedUserClaims_data,
                                            props.step,
                                            STEP_ACTION_PROCEED
                                        ),
                                    stepCompleted
                                }
                            }
                        }
                    ]
                }
            ]
        },

        ...(_.get(iaaForm, 'hasManagers', 'no') === 'yes'
            ? [
                  {
                      type: ADD_MORE_CONTAINER,
                      bool: iaaForm && iaaForm.hasManagers && iaaForm.hasManagers === 'yes',
                      title: 'Incumbent Managers',
                      titleClass: 'pb-4',
                      name: 'incumbentManagers',
                      border: true,
                      maxLimit: 100,
                      repeatTimes: !_.get(iaaForm, 'incumbentManagers', []).length ? 1 : null,
                      divider: false,
                      showRemoveButton: _.get(iaaForm, 'incumbentManagers', []).length > 1,
                      addMoreButtonVisible: !stepCompleted,
                      completed: stepCompleted,
                      addMoreButtonText: '+ Add more',
                      repeatingComponent: namePrefix => (
                          <BaseTemplate data={incumbentManagerForm(namePrefix)} disabled={stepCompleted} />
                      )
                  }
              ]
            : [])
    ];
};
