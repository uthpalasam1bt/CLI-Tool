import React from 'react';
import { required, numericality, email } from 'redux-form-validators';
import moment from 'moment';
import config from 'appConfig';
import _ from 'lodash';
import { Col, Divider, Row, Tooltip } from 'antd';
import { Field } from 'redux-form';

import { PhoneNumberField } from '../../../../../UILibrary/components/forms/fields';
import BaseTemplate from '../../../../../UILibrary/components/forms/formBase/FormBase';
import connectApi from '../../../../../middlewares/connectApi';
import { GREATER_THAN_ZERO_MESSAGE } from '../../../constants/schemeOptionConstants';
import constants from '../../../../../UILibrary/constants';
import { USER_ROLE_INDIVIDUAL_TRUSTEE } from '../../../../../config/constants';
import {
    TrusteeTypes,
    I_ICON_AUTHORIZED_PERSON_DETAILS,
    I_ICON_OTP_NUMBER_DETAILS,
    I_ICON_OTP_NUMBER_NOT_MATCH_DETAILS,
    INDIVIDUAL_TRUSTEE_DETAILS_FIELD_LABELS,
    COPORATE_TRUSTEE_DETAILS_FIELD_LABELS
} from './constants';

const { bucket: privateBucket, publicBucket, generateBucket } = config;
const { FORM_TEMPLATES, FORM_FIELDS, UPLOAD_FILE_TYPES } = constants;
const { PDF } = UPLOAD_FILE_TYPES;
const {
    DATE_PICKER,
    INPUT_FIELD,
    NUMBER_FIELD,
    MULTIPLE_FILE_UPLOADER,
    PHONE_NUMBER_FIELD,
    BUTTON_GROUP,
    CURRENCY_FIELD
} = FORM_FIELDS;
const { FULL_CONTAINER, ADD_MORE_CONTAINER, ROW } = FORM_TEMPLATES;
const { riaa, addtrst } = config.uploads;

const otherTrusteeForm = (namePrefix, props) => {
    const { options } = props;

    let disabled = true;

    const getNameFromEmail = (value, firstNameField, lastNameField, val, doNotClear, emailField) => {
        if (options && options.getFirstNameLastNameEvent && value) {
            options.getFirstNameLastNameEvent(value, firstNameField, lastNameField, val, doNotClear, emailField);
        }
    };

    return [
        {
            type: FULL_CONTAINER,
            bool: true,
            label:
                props && props.trusteeType === USER_ROLE_INDIVIDUAL_TRUSTEE
                    ? INDIVIDUAL_TRUSTEE_DETAILS_FIELD_LABELS.OTHER_TRUSTEES.EMAIL
                    : COPORATE_TRUSTEE_DETAILS_FIELD_LABELS.OTHER_TRUSTEES.EMAIL,
            field: {
                name: `${namePrefix}.otherTrusteeEmail`,
                disabled: disabled,
                className: 'form-control',
                component: INPUT_FIELD,
                isEmail: true,
                validationModules: [
                    { moduleName: 'RequiredValidate', options: { message: 'Required' } },
                    { moduleName: 'EmailValidate' }
                ],

                // validate: [required({ message: 'Required' }), email()],
                onChange: e => {
                    getNameFromEmail(
                        e && e.target && e.target.value ? e.target.value : null,
                        `${namePrefix}.otherTrusteeFirstName`,
                        `${namePrefix}.otherTrusteeLastName`,
                        `${namePrefix}.otherTrusteeContact`,
                        true,
                        `${namePrefix}.otherTrusteeEmail`
                    );
                }
            }
        },
        {
            type: FULL_CONTAINER,
            bool: true,
            label:
                props && props.trusteeType === USER_ROLE_INDIVIDUAL_TRUSTEE
                    ? INDIVIDUAL_TRUSTEE_DETAILS_FIELD_LABELS.OTHER_TRUSTEES.FIRST_NAME
                    : COPORATE_TRUSTEE_DETAILS_FIELD_LABELS.OTHER_TRUSTEES.FIRST_NAME,
            field: {
                name: `${namePrefix}.otherTrusteeFirstName`,
                // disabled: disabled || (options && options.disabledFields[`${namePrefix}.otherTrusteeFirstName`]),
                disabled: disabled,
                className: 'form-control',
                component: INPUT_FIELD,
                validationModules: [{ moduleName: 'RequiredValidate', options: { message: 'Required' } }],
                placeholder: 'First name'
            }
        },
        {
            type: FULL_CONTAINER,
            bool: true,
            label:
                props && props.trusteeType === USER_ROLE_INDIVIDUAL_TRUSTEE
                    ? INDIVIDUAL_TRUSTEE_DETAILS_FIELD_LABELS.OTHER_TRUSTEES.LAST_NAME
                    : COPORATE_TRUSTEE_DETAILS_FIELD_LABELS.OTHER_TRUSTEES.LAST_NAME,
            field: {
                name: `${namePrefix}.otherTrusteeLastName`,
                // disabled: disabled || (options && options.disabledFields[`${namePrefix}.otherTrusteeLastName`]),
                disabled: disabled,
                className: 'form-control',
                component: INPUT_FIELD,
                validationModules: [{ moduleName: 'RequiredValidate', options: { message: 'Required' } }],
                placeholder: 'Last name'
            }
        },

        {
            type: FULL_CONTAINER,
            bool: true,
            label:
                props && props.trusteeType === USER_ROLE_INDIVIDUAL_TRUSTEE
                    ? INDIVIDUAL_TRUSTEE_DETAILS_FIELD_LABELS.OTHER_TRUSTEES.PHONE
                    : COPORATE_TRUSTEE_DETAILS_FIELD_LABELS.OTHER_TRUSTEES.PHONE,
            field: {
                name: `${namePrefix}.otherTrusteeContact`,
                disabled: disabled,
                className: 'form-control',
                component: PHONE_NUMBER_FIELD,
                placeholder: '+',
                validationModules: [{ moduleName: 'RequiredValidate', options: { message: 'Required' } }]
            }
        },
        {
            type: FULL_CONTAINER,
            bool: true,
            label:
                props && props.trusteeType === USER_ROLE_INDIVIDUAL_TRUSTEE
                    ? INDIVIDUAL_TRUSTEE_DETAILS_FIELD_LABELS.OTHER_TRUSTEES.OTP_SIGN_DOCUMENT
                    : COPORATE_TRUSTEE_DETAILS_FIELD_LABELS.OTHER_TRUSTEES.OTP_SIGN_DOCUMENT,
            field: {
                __order: 'm',
                name: `${namePrefix}.otherTrusteeOtpYesNo`,
                disabled: disabled,
                className: 'form-control',
                component: BUTTON_GROUP,
                options: [{ title: 'Yes', value: 'yes' }, { title: 'No', value: 'no' }],
                defaultValue: 'yes'
            }
        },
        ...([null, 'yes'].includes(_.get(props, `${namePrefix}.primaryTrusteeOtpYesNo`, null))
            ? [
                  //   {
                  //       type: FULL_CONTAINER,
                  //       bool: true,
                  //       label:
                  //           props && props.trusteeType === USER_ROLE_INDIVIDUAL_TRUSTEE
                  //               ? INDIVIDUAL_TRUSTEE_DETAILS_FIELD_LABELS.OTHER_TRUSTEES.OTP_PHONE
                  //               : COPORATE_TRUSTEE_DETAILS_FIELD_LABELS.OTHER_TRUSTEES.OTP_PHONE,
                  //       iIcon: I_ICON_OTP_NUMBER_DETAILS,
                  //       field: {
                  //           __order: 'm',
                  //           name: `${namePrefix}.otherTrusteeOtpNum`,
                  //           disabled: disabled,
                  //           className: 'form-control',
                  //           component: PHONE_NUMBER_FIELD,
                  //           placeholder: '+',
                  //   validationModules: [{ moduleName: 'RequiredValidate', options: { message: 'Required' } }]
                  //       }
                  //   },
                  {
                      type: ROW,
                      bool: true,
                      rawComponents: (
                          <Row
                              className={`input-row ${
                                  props && props.newOtpNumbers[_.get(props, `${namePrefix}.otherTrusteeEmail`, null)]
                                      ? 'highlight-input-row'
                                      : null
                              }`}
                          >
                              <Col xl={14} lg={12} xs={24} className="label-wrapper">
                                  <label className="input-title">
                                      {props && props.trusteeType === USER_ROLE_INDIVIDUAL_TRUSTEE
                                          ? INDIVIDUAL_TRUSTEE_DETAILS_FIELD_LABELS.OTHER_TRUSTEES.OTP_PHONE
                                          : COPORATE_TRUSTEE_DETAILS_FIELD_LABELS.OTHER_TRUSTEES.OTP_PHONE}
                                  </label>
                                  <Tooltip placement="top" title={I_ICON_OTP_NUMBER_DETAILS}>
                                      <span className="i-icon">
                                          <i className="fa fa-info-circle"></i>
                                      </span>
                                  </Tooltip>
                                  {props &&
                                  props.newOtpNumbers[_.get(props, `${namePrefix}.otherTrusteeEmail`, null)] ? (
                                      <Tooltip placement="top" title={I_ICON_OTP_NUMBER_NOT_MATCH_DETAILS}>
                                          <span className="i-icon-red">
                                              <i className="fa fa-info-circle"></i>
                                          </span>
                                      </Tooltip>
                                  ) : null}
                              </Col>
                              <Col xl={10} lg={12} xs={24} className="input-wrapper">
                                  <Field
                                      disabled={disabled}
                                      name={`${namePrefix}.otherTrusteeOtpNum`}
                                      className="form-control"
                                      component={PhoneNumberField}
                                      placeholder="+44567891011"
                                      validate={[required({ message: 'Required' })]} // can't use validation modules for raw components
                                  />
                              </Col>
                          </Row>
                      )
                  }
              ]
            : []),
        {
            type: ROW,
            bool: props && props.trusteeType === TrusteeTypes.CORPORATE_TRUSTEE,
            rawComponents: <Divider type="horizontal" />
        }
    ];
};
const TrusteeForm = props => {
    const { iaaForm, options } = props;

    let disabled = true;
    return [
        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Upload latest deed of trustee appointment and removal',
            field: {
                __order: 'e',
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
        {
            type: FULL_CONTAINER,
            bool: props && props.trusteeType !== TrusteeTypes.INDIVIDUAL_TRUSTEE,
            label: 'Certificate of incorporation (for corporate trustees)',
            field: {
                __order: 'e',
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
                validationModules: [{ moduleName: 'RequiredValidate', options: { message: 'Required' } }]
            }
        },
        {
            type: FULL_CONTAINER,
            bool: props && props.trusteeType === TrusteeTypes.INDIVIDUAL_TRUSTEE,
            label: 'Number of trustees',
            field: {
                __order: 'f',
                disabled: disabled,
                name: 'numberOfTrustees',
                className: 'form-control',
                component: CURRENCY_FIELD,
                options: { props: { precision: 0, className: 'form-control' } },
                validationModules: [
                    { moduleName: 'RequiredValidate', options: { message: 'Required' } },
                    { moduleName: 'NumericalValidate', options: { '>': 0, message: GREATER_THAN_ZERO_MESSAGE } }
                ]
            }
        },
        // {
        //     type: FULL_CONTAINER,
        //     bool: props&&props.trusteeType === TrusteeTypes.INDIVIDUAL_TRUSTEE,
        //     label: 'Number of trustees required to approve a strategy change',
        //     field: {
        //         __order: 'g',
        // disabled: disabled,
        //         name: 'numberOfTrusteeAppCh',
        //         className: 'form-control',
        //         component: NUMBER_FIELD,
        // validationModules: [
        //     { moduleName: 'RequiredValidate', options: { message: 'Required' } },
        //     { moduleName: 'NumericalValidate', options: { '>': 0, message: GREATER_THAN_ZERO_MESSAGE } }
        // ]
        //     }
        // },
        {
            type: FULL_CONTAINER,
            bool: props && props.trusteeType === TrusteeTypes.INDIVIDUAL_TRUSTEE,
            label: 'Number of trustees required to sign a legal document',
            field: {
                __order: 'f',
                name: 'dynamicSignatoryCount',
                disabled: disabled,
                className: 'form-control',
                component: CURRENCY_FIELD,
                options: { props: { precision: 0, className: 'form-control' } },
                validationModules: [
                    { moduleName: 'RequiredValidate', options: { message: 'Required' } },
                    { moduleName: 'NumericalValidate', options: { '>': 0, message: GREATER_THAN_ZERO_MESSAGE } }
                ]
            }
        },
        {
            type: FULL_CONTAINER,
            bool: props && props.trusteeType !== TrusteeTypes.INDIVIDUAL_TRUSTEE,
            label: 'Corporate trustee entity name',
            field: {
                __order: 'h',
                disabled: disabled,
                name: 'trusteeEntityName',
                className: 'form-control',
                component: INPUT_FIELD,
                validationModules: [{ moduleName: 'RequiredValidate', options: { message: 'Required' } }]
            }
        },
        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Date of trust deed',
            field: {
                __order: 'i',
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
            type: 'NOTHING',
            when: [
                {
                    bool: true,
                    childComponents: [
                        {
                            type: ROW,
                            rawComponents: (
                                <div className="input-row">
                                    <div className="label-wrapper">
                                        <label className="input-title active-heading font-weight-bold text-dark">
                                            {props && props.trusteeType === USER_ROLE_INDIVIDUAL_TRUSTEE
                                                ? INDIVIDUAL_TRUSTEE_DETAILS_FIELD_LABELS.TITLE
                                                : COPORATE_TRUSTEE_DETAILS_FIELD_LABELS.TITLE}
                                            {props && props.trusteeType === TrusteeTypes.CORPORATE_TRUSTEE ? (
                                                <Tooltip placement="top" title={I_ICON_AUTHORIZED_PERSON_DETAILS}>
                                                    <span className="i-icon">
                                                        <i className="fa fa-info-circle"></i>
                                                    </span>
                                                </Tooltip>
                                            ) : null}
                                        </label>
                                    </div>
                                </div>
                            )
                        },
                        {
                            type: FULL_CONTAINER,
                            bool: true,
                            label:
                                props && props.trusteeType === USER_ROLE_INDIVIDUAL_TRUSTEE
                                    ? INDIVIDUAL_TRUSTEE_DETAILS_FIELD_LABELS.EMAIL
                                    : COPORATE_TRUSTEE_DETAILS_FIELD_LABELS.EMAIL,
                            field: {
                                __order: 'j',
                                disabled: disabled,
                                name: 'primaryTrusteeEmail',
                                isEmail: true,
                                ignoreCharacterValidation: true,
                                className: 'form-control',
                                component: INPUT_FIELD,
                                validationModules: [
                                    { moduleName: 'RequiredValidate', options: { message: 'Required' } },
                                    { moduleName: 'EmailValidate' }
                                ],
                                onChange: e => {
                                    options &&
                                        options.getFirstNameLastNameEvent(
                                            e && e.target && e.target.value ? e.target.value : null,
                                            'primaryTrusteeFirstName',
                                            'primaryTrusteeLastName',
                                            'primaryTrusteeContact',
                                            true,
                                            'primaryTrusteeEmail'
                                        );
                                }
                            }
                        },
                        {
                            type: FULL_CONTAINER,
                            bool: true,
                            label:
                                props && props.trusteeType === USER_ROLE_INDIVIDUAL_TRUSTEE
                                    ? INDIVIDUAL_TRUSTEE_DETAILS_FIELD_LABELS.FIRST_NAME
                                    : COPORATE_TRUSTEE_DETAILS_FIELD_LABELS.FIRST_NAME,
                            field: {
                                __order: 'k',
                                // disabled: disabled || (options && options.disabledFields['primaryTrusteeFirstName']),
                                disabled: disabled,
                                name: 'primaryTrusteeFirstName',
                                className: 'form-control',
                                component: INPUT_FIELD,
                                validationModules: [
                                    { moduleName: 'RequiredValidate', options: { message: 'Required' } }
                                ],
                                placeholder: 'First name'
                            }
                        },
                        {
                            type: FULL_CONTAINER,
                            bool: true,
                            label:
                                props && props.trusteeType === USER_ROLE_INDIVIDUAL_TRUSTEE
                                    ? INDIVIDUAL_TRUSTEE_DETAILS_FIELD_LABELS.LAST_NAME
                                    : COPORATE_TRUSTEE_DETAILS_FIELD_LABELS.LAST_NAME,

                            field: {
                                __order: 'l',
                                name: 'primaryTrusteeLastName',
                                // disabled: disabled || (options && options.disabledFields['primaryTrusteeLastName']),
                                disabled: disabled,
                                className: 'form-control',
                                component: INPUT_FIELD,
                                validationModules: [
                                    { moduleName: 'RequiredValidate', options: { message: 'Required' } }
                                ],
                                placeholder: 'Last name'
                            }
                        },
                        {
                            type: FULL_CONTAINER,
                            bool: true,
                            label:
                                props && props.trusteeType === USER_ROLE_INDIVIDUAL_TRUSTEE
                                    ? INDIVIDUAL_TRUSTEE_DETAILS_FIELD_LABELS.PHONE
                                    : COPORATE_TRUSTEE_DETAILS_FIELD_LABELS.PHONE,
                            field: {
                                __order: 'm',
                                disabled: disabled,
                                name: 'primaryTrusteeContact',
                                className: 'form-control',
                                component: PHONE_NUMBER_FIELD,
                                placeholder: '+'
                            }
                        },
                        {
                            type: FULL_CONTAINER,
                            bool: true,
                            label:
                                props && props.trusteeType === USER_ROLE_INDIVIDUAL_TRUSTEE
                                    ? INDIVIDUAL_TRUSTEE_DETAILS_FIELD_LABELS.OTP_SIGN_DOCUMENT
                                    : COPORATE_TRUSTEE_DETAILS_FIELD_LABELS.OTP_SIGN_DOCUMENT,
                            field: {
                                __order: 'm',

                                name: 'primaryTrusteeOtpYesNo',
                                className: 'form-control',
                                component: BUTTON_GROUP,
                                options: [{ title: 'Yes', value: 'yes' }, { title: 'No', value: 'no' }],
                                defaultValue: 'yes'
                            }
                        },
                        ...([null, 'yes'].includes(_.get(props, `primaryTrusteeOtpYesNo`, null))
                            ? [
                                  {
                                      type: FULL_CONTAINER,
                                      bool: true,
                                      label:
                                          props && props.trusteeType === USER_ROLE_INDIVIDUAL_TRUSTEE
                                              ? INDIVIDUAL_TRUSTEE_DETAILS_FIELD_LABELS.OTP_PHONE
                                              : COPORATE_TRUSTEE_DETAILS_FIELD_LABELS.OTP_PHONE,
                                      iIcon: I_ICON_OTP_NUMBER_DETAILS,
                                      field: {
                                          disabled: disabled,
                                          __order: 'm',
                                          name: 'primaryTrusteeOtpNum',
                                          className: 'form-control',
                                          component: PHONE_NUMBER_FIELD,
                                          placeholder: '+',
                                          validationModules: [
                                              { moduleName: 'RequiredValidate', options: { message: 'Required' } }
                                          ]
                                      }
                                  }
                              ]
                            : [])
                    ]
                }
            ]
        },
        {
            type: ROW,
            rawComponents: <Divider type="horizontal" />
        },
        (props && props.trusteeType === USER_ROLE_INDIVIDUAL_TRUSTEE && props['numberOfTrustees'] > 1) ||
        (props && props.trusteeType !== USER_ROLE_INDIVIDUAL_TRUSTEE)
            ? {
                  type: ADD_MORE_CONTAINER,
                  bool:
                      (props && props.trusteeType === USER_ROLE_INDIVIDUAL_TRUSTEE && props['numberOfTrustees'] > 1) ||
                      (props && props.trusteeType !== USER_ROLE_INDIVIDUAL_TRUSTEE),
                  title:
                      props && props.trusteeType === USER_ROLE_INDIVIDUAL_TRUSTEE
                          ? INDIVIDUAL_TRUSTEE_DETAILS_FIELD_LABELS.OTHER_TRUSTEES.TITLE
                          : COPORATE_TRUSTEE_DETAILS_FIELD_LABELS.OTHER_TRUSTEES.TITLE,
                  titleClass: 'pb-4',
                  name: 'otherTrustee',
                  //   name: 'otherTrusteeDetails', // need to verify

                  border: true,
                  maxLimit:
                      props && props.trusteeType === USER_ROLE_INDIVIDUAL_TRUSTEE ? props['numberOfTrustees'] - 1 : 100,
                  repeatTimes: 0,
                  divider: true,
                  showRemoveButton: !disabled,
                  addMoreButtonVisible: !disabled,
                  completed: false,
                  addMoreButtonText: '+ Add more',
                  repeatingComponent: namePrefix => (
                      <BaseTemplate data={otherTrusteeForm(namePrefix, props)} disabled={disabled} />
                  )
              }
            : {}
    ];
};

export default TrusteeForm;
