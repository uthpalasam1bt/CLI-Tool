
import React from 'react';
import { Divider } from 'antd';
import _ from 'lodash';
import { FORM_FIELD_NAMES,FORM_FIELD_LABELS} from './constants';
import constants from '../../../../../UILibrary/constants';
import config from 'appConfig';
import moment from 'moment';
import ClaimHelper from '../../../../../helpers/claimHelper';
import connectApi from '../../../../../middlewares/connectApi';
import wfConstants from '../../../../workflows/constants';
import BaseTemplate from '../../../../../UILibrary/components/forms/formBase/FormBase';
import { INVALID_ENTRY_MESSAGE } from '../../../constants/schemeOptionConstants';
const { FORM_TEMPLATES, FORM_FIELDS, UPLOAD_FILE_TYPES } = constants;
const { PDF } = UPLOAD_FILE_TYPES; // document types allowed to upload
const { activeWorkFlow, addtrst } = config.uploads;
const {
    INPUT_FIELD,
    DATE_PICKER,
    CURRENCY_FIELD,
    FILE_UPLOADER,
    NUMBER_FIELD,
    ADDRESS_FIELD,
    MULTIPLE_FILE_UPLOADER,
    BUTTON_GROUP,
    INDIVIDUAL_TRUSTEE_SECTION,
    CORPORATE_TRUSTEE_SECTION,
    PHONE_NUMBER_FIELD,
} = FORM_FIELDS;
const { STEP_ACTION_PROCEED } = wfConstants;
const { FULL_CONTAINER, FULL_VIEW_CONTAINER, HALF_CONTAINER, ROW,  ADD_MORE_CONTAINER  } = FORM_TEMPLATES;
const { bucket: privateBucket } = config;
const YESNOBUTTONOPTION = [{ title: 'Yes', value: 'yes' }, { title: 'No', value: 'no' }];
const { riaa } = config.uploads;

const incumbentManagerForm = namePrefix => {
    return [
        {
            type: FULL_CONTAINER,
            bool: true,
            label: FORM_FIELD_LABELS.INCUBENT_MANAGER_FORM.NAME_OF_EXTERNAL_INVESTMENT_MANAGER,
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
            label: FORM_FIELD_LABELS.INCUBENT_MANAGER_FORM.MANAGER_ACCOUNT_NUMBER,
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
            label: FORM_FIELD_LABELS.INCUBENT_MANAGER_FORM.PRIMARY_CONTACT,
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
            label: FORM_FIELD_LABELS.INCUBENT_MANAGER_FORM.CONTACT_EMAIL_ADDRESS,
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
            label: FORM_FIELD_LABELS.INCUBENT_MANAGER_FORM.CONTACT_PHONE_NUMBER,
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
    console.log("form with props------------------------------------",props)
    let stepCompleted = props.step && props.step.completed;
    const corpTrustees = _.get(props, 'trusteeEntities', []).filter(x => x && x.trusteeEntityType == 'CORPORATE');
    const dontHaveClaim = _.get(props, 'options.submitButton.showButton', true);
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
    // // const formValues = props[STRETOGY_UPDATE_FORM_SECTION.KEY];
    console.log("donthave----------------------------------",dontHaveClaim );
    console.log("ishas----------------------------------",isHasTrustee);
    console.log("corpTrustees----------------------------------",corpTrustees.length);
    return [
        {
            type: FULL_CONTAINER,
            bool: true,
            label: FORM_FIELD_LABELS[FORM_FIELD_NAMES.HMRC_DOCUMENTS],
            field: {
                __order: 'a',
                name: FORM_FIELD_NAMES.HMRC_DOCUMENTS,
                className: 'form-control',
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
            label:FORM_FIELD_LABELS[FORM_FIELD_NAMES.SCHEME_ACCOUNT],
            field: {
                __order: 'b',
                name: FORM_FIELD_NAMES.SCHEME_ACCOUNT,
                className: 'form-control',
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
            label: FORM_FIELD_LABELS[FORM_FIELD_NAMES.OTHER_DOCUMENTS],
            field: {
                __order: 'b',
                name: FORM_FIELD_NAMES.OTHER_DOCUMENTS,
                className: 'form-control',
                component: MULTIPLE_FILE_UPLOADER,
                options: {
                    accept: PDF,
                    url: riaa.requestIAA,
                    bucketName: privateBucket,
                    api: connectApi,
                    params: [props.entityId, 'iaa']
                }
            }
        },
        {
            type: FULL_CONTAINER,
            bool: true,
            label: FORM_FIELD_LABELS[FORM_FIELD_NAMES.NUMBER_OF_MEMBERS],
            field: {
                __order: 'c',
                name: FORM_FIELD_NAMES.NUMBER_OF_MEMBERS,
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
                name: FORM_FIELD_NAMES.ADDRESS_FIELD,
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
            label: FORM_FIELD_LABELS[FORM_FIELD_NAMES.TRUSTEE_DEED],
            field: {
                __order: 'e',
                disabled: stepCompleted || !dontHaveClaim,
                name: FORM_FIELD_NAMES.TRUSTEE_DEED,
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
        {
            type: FULL_CONTAINER,
            bool: corpTrustees.length > 0 && corpTrusteeCompanyName,
            label: FORM_FIELD_LABELS[FORM_FIELD_NAMES.CERTIFICATE_OF_INCORPORATION],
            field: {
                __order: 'e',
                disabled: stepCompleted || !dontHaveClaim,
                name: FORM_FIELD_NAMES.CERTIFICATE_OF_INCORPORATION,
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
        },


            {
                type: FULL_CONTAINER,
                bool: true,
                label: FORM_FIELD_LABELS[FORM_FIELD_NAMES.DATE_OF_TRUST_DEED],
                field: {
                    __order: 'i',
                    disabled: stepCompleted,
                    name: FORM_FIELD_NAMES.DATE_OF_TRUST_DEED,
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
                                        // tabKey: IAA_FORM_SECTION.KEY,
                                        formName: props.formName,
                                        hideTrusteeCardActions:
                                            stepCompleted ||
                                            !ClaimHelper.getPermission(
                                                props.getLoggedUserClaims_data,
                                                props.step,
                                                STEP_ACTION_PROCEED
                                            )
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
                                        // tabKey: IAA_FORM_SECTION.KEY,
                                        formName: props.formName,
                                        hideTrusteeCardActions:
                                            stepCompleted ||
                                            !ClaimHelper.getPermission(
                                                props.getLoggedUserClaims_data,
                                                props.step,
                                                STEP_ACTION_PROCEED
                                            )
                                    }
                                }
                            }
                        ]
                    }
                ]
            },
            ...(_.get( props, 'hasManagers', 'no') === 'yes'
            ? [
                  {
                      type: ADD_MORE_CONTAINER,
                      bool: props && props.hasManagers && props.hasManagers === 'yes',
                      title: 'Incumbent Managers',
                      titleClass: 'pb-4',
                      name: 'incumbentManagers',
                      border: true,
                      maxLimit: 100,
                      repeatTimes: !_.get(props, 'incumbentManagers', []).length ? 1 : null,
                      divider: false,
                      showRemoveButton: _.get(props, 'incumbentManagers', []).length > 1,
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
