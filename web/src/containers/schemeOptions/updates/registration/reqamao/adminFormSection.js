import React from 'react';
import config from 'appConfig';
import moment from 'moment';
import constants from '../../../../../UILibrary/constants';
import { ADMINISTRATION_FORM_SECTION } from './constants';
import ClaimHelper from '../../../../../helpers/claimHelper';
import wfConstants from '../../../../workflows/constants';
import connectApi from '../../../../../middlewares/connectApi';
import _ from 'lodash';

const { bucket: privateBucket, publicBucket, generateBucket } = config;
const { riaa, addtrst } = config.uploads;
const { STEP_ACTION_PROCEED } = wfConstants;
const { FORM_TEMPLATES, FORM_FIELDS, UPLOAD_FILE_TYPES } = constants;
const { PDF } = UPLOAD_FILE_TYPES;
const {
    INPUT_FIELD,
    NUMBER_FIELD,
    SELECT_OPTION,
    MONTH_DATE_PICKER,
    DATE_PICKER,
    TEXTAREA,
    BUTTON_GROUP,
    INDIVIDUAL_TRUSTEE_SECTION,
    CORPORATE_TRUSTEE_SECTION,
    MULTIPLE_FILE_UPLOADER,
    PHONE_NUMBER_FIELD
} = FORM_FIELDS;
const { FULL_CONTAINER, FULL_VIEW_CONTAINER, LABEL } = FORM_TEMPLATES;

const yesNoOption = [{ title: 'Yes', value: 'yes' }, { title: 'No', value: 'no' }];

const {
    FEE_PAYMENT_METHOD,
    TRUSTEE_BANK_ACCOUNT_NAME,
    TRUSTEE_BANK_ACCOUNT_NO,
    TRUSTEE_BANK_ACCOUNT_SHORT_CODE,
    TRUSTEE_BANK_NAME,
    SCHEME_YEAR_END_DATE_FOR_ANNUAL_REPORT,
    DOES_SCHEME_HAVE_AVC,
    NAME_OF_AVC_PROVIDER,
    DESCRIBE_TYPE_OF_AVC_FUNDS_HELD,
    ACTUARY_COMPANY,
    ACTUARY_NAME,
    ACTUARY_EMAIL,
    ACTUARY_PHONE
} = ADMINISTRATION_FORM_SECTION.FIELD_KEYS;

export const AdminFormSection = props => {
    let stepCompleted = props.step && props.step.completed;

    const { administration } = props;

    const corpTrustees = _.get(administration, 'trusteeEntities', []).filter(
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
            label: 'Upload latest deed of trustee appointment and removal',
            field: {
                __order: 'e',
                disabled: stepCompleted,
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
                          disabled: stepCompleted,
                          bool: corpTrusteeCompanyName,
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
                                    tabKey: ADMINISTRATION_FORM_SECTION.KEY,
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
                                    tabKey: ADMINISTRATION_FORM_SECTION.KEY,
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
        {
            type: FULL_CONTAINER,
            label: 'Fee payment method',
            bool: true,
            field: {
                __order: 'a',
                name: FEE_PAYMENT_METHOD,
                className: 'form-control',
                component: SELECT_OPTION,
                options: {
                    defaultValue: 'Select',
                    dataList: [
                        { key: 'directEnchashmentOfUnits', value: 'Encashment of units' },
                        { key: 'invoiceWithSeperateCashSettlement', value: 'Separate Invoice' }
                    ]
                },

                validationModules: [
                    {
                        moduleName: 'RequiredValidate',
                        options: { message: 'Required' }
                    },
                    {
                        moduleName: 'FormatValidate',
                        options: {
                            with: /^[a-z-0-9- ]+$/i,
                            message: 'Special characters are not allowed.'
                        }
                    }
                ]
            }
        },
        {
            type: FULL_CONTAINER,
            bool: true,
            label: '$ttbkac$ name',
            field: {
                __order: 'b',
                name: TRUSTEE_BANK_ACCOUNT_NAME,
                className: 'form-control',
                component: INPUT_FIELD,
                validationModules: [
                    {
                        moduleName: 'RequiredValidate',
                        options: { message: 'Required' }
                    }
                ]
            }
        },
        {
            type: FULL_CONTAINER,
            label: '$ttbkac$ number',
            bool: true,
            field: {
                __order: 'c',
                name: TRUSTEE_BANK_ACCOUNT_NO,
                className: 'form-control',
                component: NUMBER_FIELD,
                options: {
                    decimalScale: 0,
                    allowNegative: false,
                    min: 0
                },
                validationModules: [
                    {
                        moduleName: 'RequiredValidate',
                        options: { message: 'Required' }
                    }
                ]
            }
        },
        {
            type: FULL_CONTAINER,
            label: '$ttbkac$ sort code',
            bool: true,
            field: {
                __order: 'd',
                name: TRUSTEE_BANK_ACCOUNT_SHORT_CODE,
                className: 'form-control',
                component: NUMBER_FIELD,
                options: {
                    decimalScale: 0,
                    min: 0,
                    placeholder: '__-__-__',
                    format: '##-##-##',
                    mask: '__'
                },
                title: props[TRUSTEE_BANK_ACCOUNT_SHORT_CODE] || '',
                validationModules: [
                    {
                        moduleName: 'RequiredValidate',
                        options: { message: 'Required' }
                    },
                    {
                        moduleName: 'LengthValidate',
                        options: {
                            is: 6,
                            message: 'Sort Code should have six digits.  Please re-enter'
                        }
                    }
                ]
            }
        },
        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Trustee bank name',
            field: {
                __order: 'e',
                name: TRUSTEE_BANK_NAME,
                className: 'form-control',
                component: INPUT_FIELD,
                validationModules: [
                    {
                        moduleName: 'RequiredValidate',
                        options: { message: 'Required' }
                    },
                    {
                        moduleName: 'FormatValidate',
                        options: {
                            with: /^[a-z-0-9- ]+$/i,
                            message: 'Special characters are not allowed.'
                        }
                    }
                ]
            }
        },

        {
            type: FULL_CONTAINER,
            label: 'Scheme year end date for annual report',
            field: {
                __order: 'f',
                name: SCHEME_YEAR_END_DATE_FOR_ANNUAL_REPORT,
                className: 'form-control',
                component: MONTH_DATE_PICKER,
                options: {
                    disabledDate: current => current && current > moment().startOf('day'),
                    orderReverse: true
                },
                validationModules: [
                    {
                        moduleName: 'RequiredValidate',
                        options: { message: 'Required' }
                    }
                ]
            }
        },

        {
            type: FULL_CONTAINER,
            label: 'Does the scheme have AVCs?',
            bool: true,
            field: {
                __order: 'g',
                name: DOES_SCHEME_HAVE_AVC,
                className: 'form-control',
                component: BUTTON_GROUP,
                options: yesNoOption,

                validationModules: [
                    {
                        moduleName: 'RequiredValidate',
                        options: { message: 'Required' }
                    },
                    {
                        moduleName: 'FormatValidate',
                        options: {
                            with: /^[a-z-0-9- ]+$/i,
                            message: 'Special characters are not allowed.'
                        }
                    }
                ]
            },

            when: [
                {
                    bool: administration && administration[DOES_SCHEME_HAVE_AVC] === 'yes',
                    childComponents: [
                        {
                            type: FULL_CONTAINER,
                            bool: administration && administration[DOES_SCHEME_HAVE_AVC] === 'yes',
                            label: 'Name of $avc$ provider',
                            field: {
                                __order: 'h',
                                name: NAME_OF_AVC_PROVIDER,
                                className: 'form-control',
                                component: INPUT_FIELD,
                                validationModules: [
                                    {
                                        moduleName: 'RequiredValidate',
                                        options: { message: 'Required' }
                                    }
                                ]
                            }
                        },
                        {
                            type: FULL_CONTAINER,
                            bool: administration && administration[DOES_SCHEME_HAVE_AVC] === 'yes',
                            label: 'Describe the type of AVC funds held',
                            field: {
                                __order: 'l',
                                name: DESCRIBE_TYPE_OF_AVC_FUNDS_HELD,
                                className: 'form-control',
                                component: TEXTAREA,
                                props: {
                                    maxLength: 1500
                                },
                                validationModules: [
                                    {
                                        moduleName: 'RequiredValidate',
                                        options: { message: 'Required' }
                                    }
                                ]
                            },
                            blockComponent: true
                        }
                    ]
                }
            ]
        },

        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Scheme actuary firm name',
            field: {
                __order: 'q',
                name: ACTUARY_COMPANY,
                className: 'form-control',
                component: INPUT_FIELD
            }
        },
        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Scheme actuary individual name',
            field: {
                __order: 'r',
                name: ACTUARY_NAME,
                className: 'form-control',
                component: INPUT_FIELD
            }
        },
        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Scheme actuary email',
            field: {
                __order: 's',
                name: ACTUARY_EMAIL,
                className: 'form-control',
                component: INPUT_FIELD,
                isEmail: true,

                validationModules: [
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
            label: 'Scheme actuary contact number',
            bool: true,
            field: {
                __order: 't',
                name: ACTUARY_PHONE,
                className: 'form-control',
                component: PHONE_NUMBER_FIELD
            }
        }
    ];
};
