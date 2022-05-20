import config from 'appConfig';
import moment from 'moment';
import constants from '../../../../../UILibrary/constants';
import connectApi from '../../../../../middlewares/connectApi';
import { ADMIN_FORM_SECTION } from './constants';
import ClaimHelper from '../../../../../helpers/claimHelper';
import wfConstants from '../../../../workflows/constants';
import _ from 'lodash';

const { bucket: privateBucket, publicBucket, generateBucket } = config;
const { STEP_ACTION_PROCEED } = wfConstants;
const { FORM_TEMPLATES, FORM_FIELDS, UPLOAD_FILE_TYPES } = constants;
const {
    INPUT_FIELD,
    NUMBER_FIELD,
    SELECT_OPTION,
    MONTH_DATE_PICKER,
    TEXTAREA,
    BUTTON_GROUP,
    MULTIPLE_FILE_UPLOADER,
    INDIVIDUAL_TRUSTEE_SECTION,
    CORPORATE_TRUSTEE_SECTION,
    DATE_PICKER,
    PHONE_NUMBER_FIELD
} = FORM_FIELDS;
const { FULL_CONTAINER, FULL_VIEW_CONTAINER, LABEL } = FORM_TEMPLATES;
const { riaa, addtrst } = config.uploads;
const { PDF } = UPLOAD_FILE_TYPES;
const {
    FEE_PAYMENT_METHOD,
    TRUSTEE_BANK_ACC_NAME,
    TRUSTEE_BANK_ACC_NUMBER,
    TRUSTEE_BANK_NAME,
    SCHEME_HAVE_AVC,
    TRUSTEE_BANK_ACCOUNT_SHORT_CODE,
    SCHEME_YEAR_END_DATE_FOR_ANNUAL_REPORT,
    NAME_OF_AVC_PROVIDER,
    DESCRIBE_TYPE_OF_AVC_FUNDS_HELD,
    TYPE_OF_AVC_FUND_HELD,
    SCHEME_FIRM_NAME,
    SCHEME_INDIVIUAL_NAME,
    SCHEME_ACTUARY_EMAIL,
    SCHEME_ACTUARY_CONTACT_NUMBER
} = ADMIN_FORM_SECTION.FIELD_KEYS;
const yesNoOption = [{ title: 'Yes', value: 'yes' }, { title: 'No', value: 'no' }];

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
            label: 'Manager account number',
            field: {
                name: `${namePrefix}.invesmentManagerAccountNumber`,

                className: 'form-control',
                component: INPUT_FIELD,
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
            label: 'Primary contact',
            field: {
                name: `${namePrefix}.invesmentManagerPimaryContact`,

                className: 'form-control',
                component: PHONE_NUMBER_FIELD,
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
            label: 'Contact email address',
            field: {
                name: `${namePrefix}.invesmentManagerEmail`,

                className: 'form-control',
                component: INPUT_FIELD,
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
            label: 'Contact phone number',
            field: {
                name: `${namePrefix}.invesmentManagerContactNumber`,
                className: 'form-control',

                component: PHONE_NUMBER_FIELD,
                validationModules: [
                    {
                        moduleName: 'RequiredValidate'
                    }
                ]
            }
        }
    ];
};

export const AdminFormSection = props => {
    let stepCompleted = props.step && props.step.completed;
    const { administration } = props;
    const corpTrustees = _.get(administration, 'trusteeEntities', []).filter(
        x => x && x.trusteeEntityType == 'CORPORATE'
    );
    return [
        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Upload latest deed of trustee appointment and removal',
            field: {
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
                      bool: true,
                      label: 'Certificate of incorporation (for corporate trustees)',
                      field: {
                          disabled: stepCompleted,
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
                __order: 'a',
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
                                __order: 'b',
                                name: 'individual',
                                className: 'form-control',
                                component: INDIVIDUAL_TRUSTEE_SECTION,
                                options: {
                                    disabled: true,
                                    tabKey: ADMIN_FORM_SECTION.KEY,
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
                            bool: true,
                            field: {
                                __order: 'b',
                                name: 'corporate',
                                className: 'form-control',
                                component: CORPORATE_TRUSTEE_SECTION,
                                options: {
                                    disabled: true,
                                    tabKey: ADMIN_FORM_SECTION.KEY,
                                    formName: props.formName,
                                    hideTrusteeCardActions: true
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
                __order: 'd',
                name: FEE_PAYMENT_METHOD,
                className: 'form-control',
                component: SELECT_OPTION,
                options: {
                    defaultValue: 'Select',
                    dataList: [{ key: '1', value: 'Encashment of units' }, { key: '2', value: 'Separate invoice' }]
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
            label: '$ttbkac$ name',
            field: {
                __order: 'e',
                name: TRUSTEE_BANK_ACC_NAME,
                className: 'form-control',
                component: INPUT_FIELD,
                validationModules: [
                    {
                        moduleName: 'RequiredValidate'
                    }
                ]
            }
        },
        {
            type: FULL_CONTAINER,
            label: '$ttbkac$ number',
            bool: true,
            field: {
                __order: 'f',
                name: TRUSTEE_BANK_ACC_NUMBER,
                className: 'form-control',
                component: NUMBER_FIELD,
                options: {
                    allowNegative: false,
                    allowLeadingZeros: true,
                    maxLength: 20
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
            label: 'Trustee bank name',
            field: {
                __order: 'g',
                name: TRUSTEE_BANK_NAME,
                className: 'form-control',
                component: INPUT_FIELD,
                validationModules: [
                    {
                        moduleName: 'RequiredValidate'
                    }
                ]
            }
        },
        {
            type: FULL_CONTAINER,
            label: '$ttbkac$ sort code',
            field: {
                __order: 'h',
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
                title: props[TRUSTEE_BANK_ACCOUNT_SHORT_CODE] || ''
            },

            validationModules: [
                {
                    moduleName: 'RequiredValidate'
                },
                {
                    moduleName: 'LengthValidate',
                    options: {
                        is: 6,
                        message: 'Sort Code should have six digits.  Please re-enter'
                    }
                },
                {
                    moduleName: 'FormatValidate',
                    message: 'Only allows 99-99-99 format'
                }
            ]
        },
        {
            type: FULL_CONTAINER,
            label: 'Scheme year end date for annual report',
            field: {
                __order: 'i',
                name: SCHEME_YEAR_END_DATE_FOR_ANNUAL_REPORT,
                className: 'form-control',
                component: MONTH_DATE_PICKER,
                options: {
                    disabledDate: current => current && current > moment().startOf('day'),
                    orderReverse: true
                }
            },
            validationModules: [
                {
                    moduleName: 'RequiredValidate'
                }
            ]
        },

        {
            type: FULL_CONTAINER,
            label: 'Does the scheme have AVCs?',
            bool: true,
            field: {
                __order: 'j',
                name: SCHEME_HAVE_AVC,
                className: 'form-control',
                component: BUTTON_GROUP,
                options: yesNoOption,

                validationModules: [
                    {
                        moduleName: 'RequiredValidate'
                    }
                ]
            },

            when: [
                {
                    bool: administration && props.administration[SCHEME_HAVE_AVC] === 'yes',
                    childComponents: [
                        {
                            type: FULL_CONTAINER,
                            bool: administration && administration[SCHEME_HAVE_AVC] === 'yes',
                            label: 'Name of $avc$ provider',
                            field: {
                                __order: 'k',
                                name: NAME_OF_AVC_PROVIDER,
                                className: 'form-control',
                                component: INPUT_FIELD,
                                validationModules: [
                                    {
                                        moduleName: 'RequiredValidate'
                                    }
                                ]
                            }
                        },
                        {
                            type: FULL_CONTAINER,
                            bool: administration && administration[SCHEME_HAVE_AVC] === 'yes',
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
                                        moduleName: 'RequiredValidate'
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
                __order: 'm',
                name: SCHEME_FIRM_NAME,
                className: 'form-control',
                component: INPUT_FIELD,
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
            label: 'Scheme actuary individual name',
            field: {
                __order: 'n',
                name: SCHEME_INDIVIUAL_NAME,
                className: 'form-control',
                component: INPUT_FIELD,
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
            label: 'Scheme actuary email',
            field: {
                __order: 'o',
                name: SCHEME_ACTUARY_EMAIL,
                className: 'form-control',
                component: INPUT_FIELD,
                validationModules: [
                    {
                        moduleName: 'RequiredValidate'
                    }
                ]
            }
        },
        {
            type: FULL_CONTAINER,
            label: 'Scheme actuary contact number',
            bool: true,
            field: {
                __order: 'p',
                name: SCHEME_ACTUARY_CONTACT_NUMBER,
                className: 'form-control',
                component: PHONE_NUMBER_FIELD
            }
        }
    ];
};
