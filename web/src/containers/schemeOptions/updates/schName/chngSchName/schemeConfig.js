import React from 'react';

import config from 'appConfig';
import moment from 'moment';
import { LoadingOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Alert, Divider } from 'antd';

import BaseTemplate from '../../../../../UILibrary/components/forms/formBase/FormBase';
import constants from '../../../../../UILibrary/constants';

import {
    SCHEME_FORM_FIELD_NAMES,
    SCHEME_FORM_FIELD_LABELS as SCHEME_FORM_FIELD_LABELS_MAP,
    IICON_TEXT,
    TAB_KEYS,
    TRUSTEE_TYPE_CORPORATE
} from './constants';
import connectApi from '../../../../../middlewares/connectApi';
import _ from 'lodash';

const { bucket: privateBucket, publicBucket, generateBucket } = config;
const { FORM_TEMPLATES, FORM_FIELDS, UPLOAD_FILE_TYPES } = constants;
const {
    INPUT_FIELD,
    PHONE_NUMBER_FIELD,
    INDIVIDUAL_TRUSTEE_SECTION,
    CORPORATE_TRUSTEE_SECTION,
    NUMBER_FIELD,
    ADDRESS_FIELD,
    ANT_INPUT_FIELD,
    BUTTON_GROUP,
    MULTIPLE_FILE_UPLOADER,
    SELECT_OPTION,
    DATE_PICKER
} = FORM_FIELDS;
const { FULL_CONTAINER, FULL_VIEW_CONTAINER, ADD_MORE_CONTAINER, ROW } = FORM_TEMPLATES;
const { activeWorkFlow, riaa, addtrst } = config.uploads;
const { PDF, JPEG, JPG } = UPLOAD_FILE_TYPES;
const yesNoOption = [{ title: 'Yes', value: 'yes' }, { title: 'No', value: 'no' }];

const trusteeContainerForm = () => {
    return [
        {
            type: FULL_VIEW_CONTAINER,
            bool: true,
            field: {
                name: 'addressField',
                className: 'form-control',
                component: ADDRESS_FIELD,
                options: {
                    title: 'Address of trustees for correspondence'
                }
            }
        }
    ];
};
const trusteeType = props => {
    const fromProps = _.get(props, 'formWithTabsData.schemeNameChangeForm.trusteeEntities', null);
    const fromDirtyValues = _.get(props, 'schemeNameChangeForm.trusteeEntities', null);
    const allTrustees = fromProps ? fromProps : fromDirtyValues ? fromDirtyValues : [];

    return allTrustees.find(trustee => trustee.trusteeEntityType === TRUSTEE_TYPE_CORPORATE) ? true : false;
};

export const schemeFormFields = (props, entityId, disabled) => {
    const formValues = props[TAB_KEYS.SCHEME_FORM];

    let isCoporate =
        trusteeType(props) ||
        (formValues && formValues[SCHEME_FORM_FIELD_NAMES.CORPORATEORINDIVIDUAL] === 'corporate_trustee');

    let SCHEME_FORM_FIELD_LABELS = SCHEME_FORM_FIELD_LABELS_MAP(isCoporate);

    return [
        {
            type: ROW,
            bool: props && props.options && props.options.validateSchemeName,
            rawComponents: <Alert message="Please review scheme name" type="error" style={{ marginBottom: '20px' }} />
        },
        {
            type: FULL_CONTAINER,
            label: SCHEME_FORM_FIELD_LABELS[SCHEME_FORM_FIELD_NAMES.SCHEME_NAME],
            field: {
                name: SCHEME_FORM_FIELD_NAMES.SCHEME_NAME,
                className: 'default-font-size',
                component: ANT_INPUT_FIELD,
                addonAfter:
                    props && props.options && props.options.verifingSchemeName ? (
                        <LoadingOutlined />
                    ) : props && props.options && props.options.avilable ? (
                        <CloseCircleOutlined />
                    ) : (
                        <CheckCircleOutlined />
                    ),
                validationModules: [
                    { moduleName: 'RequiredValidate', options: { message: 'Required' } },
                    {
                        moduleName: 'LengthValidate',
                        options: {
                            in: [2, 200],
                            message: 'Character limit should be withing 2 - 200 characters.'
                        }
                    },
                    {
                        moduleName: 'SpecialCharacterValidate'
                    }
                ]
            }
        },
        {
            type: FULL_CONTAINER,
            label: SCHEME_FORM_FIELD_LABELS[SCHEME_FORM_FIELD_NAMES.UPLOAD_LATEST_DEED_OF_TRUSTEE_APPOINTMENT],
            iIcon: IICON_TEXT,
            field: {
                name: SCHEME_FORM_FIELD_NAMES.UPLOAD_LATEST_DEED_OF_TRUSTEE_APPOINTMENT,
                className: 'pull-left resource-wrapper',
                component: MULTIPLE_FILE_UPLOADER,
                disabled: true,
                options: {
                    accept: [PDF],
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
            label: SCHEME_FORM_FIELD_LABELS[SCHEME_FORM_FIELD_NAMES.UPLOAD_HMRC_REGISTERATION],
            field: {
                name: SCHEME_FORM_FIELD_NAMES.UPLOAD_HMRC_REGISTERATION,
                className: 'form-control',
                component: MULTIPLE_FILE_UPLOADER,
                options: {
                    accept: [PDF, JPEG, JPG],
                    url: activeWorkFlow.hmrcDoc,
                    manual: true,
                    bucketName: privateBucket,
                    api: connectApi,
                    params: [props.entityId]
                },
                validationModules: [{ moduleName: 'RequiredValidate', options: { message: 'Required' } }]
            }
        },
        {
            type: FULL_CONTAINER,
            label: SCHEME_FORM_FIELD_LABELS[SCHEME_FORM_FIELD_NAMES.UPLOAD_LATEST_SCHEME_ACCOUNTS],
            field: {
                name: SCHEME_FORM_FIELD_NAMES.UPLOAD_LATEST_SCHEME_ACCOUNTS,
                className: 'form-control',
                component: MULTIPLE_FILE_UPLOADER,
                options: {
                    accept: [PDF],
                    url: activeWorkFlow.schemeAccounts,
                    manual: true,
                    bucketName: privateBucket,
                    api: connectApi,
                    params: [props.entityId]
                },
                validationModules: [{ moduleName: 'RequiredValidate', options: { message: 'Required' } }]
            }
        },
        {
            type: FULL_CONTAINER,
            label: SCHEME_FORM_FIELD_LABELS[SCHEME_FORM_FIELD_NAMES.CERTIFICATE_OF_INCORPATION],
            bool: isCoporate || props[SCHEME_FORM_FIELD_NAMES.CORPORATEORINDIVIDUAL] === 'corporate_trustee',
            field: {
                name: SCHEME_FORM_FIELD_NAMES.CERTIFICATE_OF_INCORPATION,
                className: 'form-control',
                component: MULTIPLE_FILE_UPLOADER,
                options: {
                    accept: [PDF],
                    url: activeWorkFlow.certificateOfIncorpation,
                    manual: true,
                    bucketName: privateBucket,
                    api: connectApi,
                    params: [props.entityId]
                },
                validationModules: [{ moduleName: 'RequiredValidate', options: { message: 'Required' } }]
            }
        },
        {
            type: FULL_CONTAINER,
            label: SCHEME_FORM_FIELD_LABELS[SCHEME_FORM_FIELD_NAMES.UPLOAD_OTHER_DOCUMENTS_REGISTERATION],
            field: {
                name: SCHEME_FORM_FIELD_NAMES.UPLOAD_OTHER_DOCUMENTS_REGISTERATION,
                className: 'form-control',
                component: MULTIPLE_FILE_UPLOADER,
                options: {
                    accept: [PDF],
                    url: activeWorkFlow.schemeAccounts,
                    manual: true,
                    bucketName: privateBucket,
                    api: connectApi,
                    params: [props.entityId]
                },
                validationModules: [{ moduleName: 'RequiredValidate', options: { message: 'Required' } }]
            }
        },
        {
            type: FULL_CONTAINER,
            label: SCHEME_FORM_FIELD_LABELS[SCHEME_FORM_FIELD_NAMES.DATE_OF_TRUST_DEED],
            iIcon: IICON_TEXT,
            field: {
                __order: 'eb',
                name: SCHEME_FORM_FIELD_NAMES.DATE_OF_TRUST_DEED,
                className: 'form-control',
                component: DATE_PICKER, //Before today
                disabled: true,
                options: {
                    disabledDate: current => current && current > moment().startOf('day')
                },
                validationModules: [{ moduleName: 'RequiredValidate', options: { message: 'Required' } }]
            }
        },
        {
            type: FULL_CONTAINER,
            label: SCHEME_FORM_FIELD_LABELS[SCHEME_FORM_FIELD_NAMES.NUMBER_OF_MEMBERS],
            iIcon: IICON_TEXT,
            field: {
                name: SCHEME_FORM_FIELD_NAMES.NUMBER_OF_MEMBERS,
                className: 'form-control',
                component: NUMBER_FIELD,
                validationModules: [
                    { moduleName: 'RequiredValidate', options: { message: 'Required' } },
                    {
                        moduleName: 'GreaterThanZeroValidate'
                    }
                ]
            }
        },

        ...trusteeContainerForm(disabled, isCoporate),

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
                                    disabled: true,
                                    formName: props.formName,
                                    hideTrusteeCardActions: true,
                                    tabKey: TAB_KEYS.SCHEME_FORM
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
                                    disabled: true,
                                    formName: props.formName,
                                    hideTrusteeCardActions: true,
                                    tabKey: TAB_KEYS.SCHEME_FORM
                                }
                            }
                        }
                    ]
                }
            ]
        },

        {
            type: FULL_CONTAINER,
            label: SCHEME_FORM_FIELD_LABELS[SCHEME_FORM_FIELD_NAMES.HOLD_LESS_LIQUUD_ASSETS],
            bool: true,
            field: {
                name: SCHEME_FORM_FIELD_NAMES.HOLD_LESS_LIQUUD_ASSETS,
                className: 'form-control',
                component: BUTTON_GROUP,
                options: yesNoOption,
                validationModules: [{ moduleName: 'RequiredValidate', options: { message: 'Required' } }]
            }
        },
        {
            type: FULL_CONTAINER,
            label: SCHEME_FORM_FIELD_LABELS[SCHEME_FORM_FIELD_NAMES.FULLY_ESG_PORTFOLIO],
            bool: true,
            field: {
                name: SCHEME_FORM_FIELD_NAMES.FULLY_ESG_PORTFOLIO,
                className: 'form-control',
                component: BUTTON_GROUP,
                options: yesNoOption,
                validationModules: [{ moduleName: 'RequiredValidate', options: { message: 'Required' } }]
            }
        }
    ];
};
