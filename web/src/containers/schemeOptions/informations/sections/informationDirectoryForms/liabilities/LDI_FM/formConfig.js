import React from 'react';
import moment from 'moment';
import { Divider } from 'antd';
import constants from '../../../../../../../UILibrary/constants';

import {
    LIABILITIES_FORM_SECTION,
    LIABILITY_VALUE_AND_DETAILS_OF_THE_VALUATION_BASIS,
    LIABILITIES_FORM_LABELS_SECTION,
    LDI_LIABILITIES_DETAILS
} from './constants';
const {
    LIABILITY_DURATION,
    PROPORTION_OF_LLTF,
    HAVE_PAST_SLC_TO_UPLOAD,
    KNOW_LIABILITY_VALUE_MDT,
    LIABILITY_VALUE,
    AVG_MARGIN_LDR_AND_GY,
    DATE_VALUE_PROVIDED,
    BASIS_VALUE_PROVIDED
} = LIABILITIES_FORM_SECTION.FIELD_KEYS;
const {
    LIABILITY_DURATION_LABEL,
    PROPORTION_OF_LLTF_LABEL,
    LIABILITY_VALUE_LABEL,
    KNOW_LIABILITY_VALUE_MDT_LABEL,
    BASIS_VALUE_PROVIDED_LABEL,
    HAVE_PAST_SLC_TO_UPLOAD_LDI_LABEL,
    LIABILITY_DURATION_LDI_LABEL,
    HAVE_PAST_SLC_TO_UPLOAD_LABEL,
    KNOW_LIABILITY_VALUE_MDT_LDI_LABEL,
    LIABILITY_VALUE_LDI_LABEL,
    AVG_MARGIN_LDR_AND_GY_LABEL,
    DATE_VALUE_PROVIDED_LABEL
} = LIABILITIES_FORM_LABELS_SECTION.FIELD_LABELS;

const { FORM_TEMPLATES, FORM_FIELDS } = constants;
const { DATE_PICKER, BUTTON_GROUP, SELECT_OPTION, NUMBER_FIELD, CURRENCY_FIELD } = FORM_FIELDS;
const yesNoOption = [{ title: 'Yes', value: 'yes' }, { title: 'No', value: 'no' }];
const { FULL_CONTAINER, ROW } = FORM_TEMPLATES;
const conditionTrue = true;

export const formFields = (dirtyFormValues = {}) => {
    return [
        {
            type: FULL_CONTAINER,
            bool: true,
            label: HAVE_PAST_SLC_TO_UPLOAD_LABEL,
            field: {
                __order: 'a',
                name: HAVE_PAST_SLC_TO_UPLOAD,
                className: 'form-control',
                component: BUTTON_GROUP,
                options: yesNoOption,
                validate: []
            },
            when: [
                {
                    bool: true,
                    childComponents: [
                        {
                            type: FULL_CONTAINER,
                            label: LIABILITY_DURATION_LABEL,
                            bool: true,
                            field: {
                                __order: 'b',
                                name: LIABILITY_DURATION,
                                className: 'form-control',
                                component: NUMBER_FIELD,
                                suffix: 'Years',
                                options: {
                                    decimalScale: 0,
                                    placeholder: '1 - 50',
                                    min: 1,
                                    max: 50,
                                    allowNegative: false
                                },
                                validate: []
                            }
                        }
                    ]
                },
                ...(conditionTrue
                    ? [
                          {
                              bool: true,
                              childComponents: [
                                  {
                                      type: FULL_CONTAINER,
                                      label: PROPORTION_OF_LLTF_LABEL,
                                      bool: true,
                                      field: {
                                          __order: 'd',
                                          name: PROPORTION_OF_LLTF,
                                          className: 'form-control',
                                          component: NUMBER_FIELD,
                                          suffix: '%', //Percent 0-100
                                          options: {
                                              decimalScale: 2,
                                              placeholder: '0 - 100',
                                              min: 0,
                                              max: 100,
                                              allowNegative: false
                                          },
                                          validate: []
                                      }
                                  }
                              ]
                          }
                      ]
                    : [])
            ]
        },
        {
            type: FULL_CONTAINER,
            iIcon: LIABILITY_VALUE_AND_DETAILS_OF_THE_VALUATION_BASIS,
            label: KNOW_LIABILITY_VALUE_MDT_LABEL,
            bool: true,
            field: {
                __order: 'f',
                name: KNOW_LIABILITY_VALUE_MDT,
                className: 'form-control',
                component: BUTTON_GROUP,
                options: yesNoOption
            },
            when: [
                {
                    bool: true,
                    childComponents: [
                        {
                            type: FULL_CONTAINER,
                            bool: true,
                            label: LIABILITY_VALUE_LABEL,
                            field: {
                                __order: 'g',
                                name: LIABILITY_VALUE,
                                className: 'form-control',
                                component: CURRENCY_FIELD,
                                options: {
                                    prefix: '£',
                                    props: {
                                        precision: 0,
                                        className: 'form-control',
                                        placeholder: '10,000,000'
                                    }
                                },
                                title: ''
                            }
                        },
                        {
                            type: FULL_CONTAINER,
                            bool: true,
                            iIcon:
                                "If entering a value less than 1.00, please enter '0' before the decimal point e.g. 0.25.",
                            label: AVG_MARGIN_LDR_AND_GY_LABEL,
                            field: {
                                __order: 'h',
                                name: AVG_MARGIN_LDR_AND_GY,
                                className: 'form-control',
                                component: NUMBER_FIELD,
                                suffix: '%',
                                options: {
                                    decimalScale: 2,
                                    placeholder: '-5 - 5',
                                    min: -5,
                                    max: 5
                                },
                                validate: []
                            }
                        },
                        {
                            type: FULL_CONTAINER,
                            label: DATE_VALUE_PROVIDED_LABEL,
                            bool: true,
                            field: {
                                __order: 'i',
                                name: DATE_VALUE_PROVIDED,
                                className: 'form-control',
                                component: DATE_PICKER,
                                options: {
                                    disabledDate: current => current && current > moment().startOf('day')
                                }
                            }
                        },
                        {
                            type: FULL_CONTAINER,
                            label: BASIS_VALUE_PROVIDED_LABEL,
                            bool: true,
                            field: {
                                __order: 'j',
                                name: BASIS_VALUE_PROVIDED,
                                className: 'form-control',
                                component: SELECT_OPTION,
                                options: {
                                    defaultValue: 'Select',
                                    dataList: [
                                        { key: 'technicalProvisions', value: 'Technical Provisions' },
                                        { key: 'giltBasis', value: 'Gilts Basis' },
                                        { key: 'accountingBasis', value: 'Accounting Basis' },
                                        { key: 'solvency', value: 'Solvency Basis' }
                                    ]
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            type: ROW,
            rawComponents: <Divider type="horizontal" />
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
                                            {LDI_LIABILITIES_DETAILS}
                                        </label>
                                    </div>
                                </div>
                            )
                        },
                        {
                            type: FULL_CONTAINER,
                            bool: true,
                            label: HAVE_PAST_SLC_TO_UPLOAD_LDI_LABEL,
                            field: {
                                __order: 'a',
                                name: HAVE_PAST_SLC_TO_UPLOAD,
                                className: 'form-control',
                                component: BUTTON_GROUP,
                                options: yesNoOption,
                                validate: []
                            },
                            when: [
                                {
                                    bool: true,
                                    childComponents: [
                                        {
                                            type: FULL_CONTAINER,
                                            label: LIABILITY_DURATION_LDI_LABEL,
                                            bool: true,
                                            field: {
                                                __order: 'b',
                                                name: LIABILITY_DURATION,
                                                className: 'form-control',
                                                component: NUMBER_FIELD,
                                                suffix: 'Years',
                                                options: {
                                                    decimalScale: 0,
                                                    placeholder: '1 - 50',
                                                    min: 1,
                                                    max: 50,
                                                    allowNegative: false
                                                },
                                                validate: []
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            type: FULL_CONTAINER,
                            iIcon: LIABILITY_VALUE_AND_DETAILS_OF_THE_VALUATION_BASIS,
                            label: KNOW_LIABILITY_VALUE_MDT_LDI_LABEL,
                            bool: true,
                            field: {
                                __order: 'f',
                                name: KNOW_LIABILITY_VALUE_MDT,
                                className: 'form-control',
                                component: BUTTON_GROUP,
                                options: yesNoOption
                            },
                            when: [
                                {
                                    bool: true,
                                    childComponents: [
                                        {
                                            type: FULL_CONTAINER,
                                            bool: true,
                                            label: LIABILITY_VALUE_LDI_LABEL,
                                            field: {
                                                __order: 'g',
                                                name: LIABILITY_VALUE,
                                                className: 'form-control',
                                                component: CURRENCY_FIELD,
                                                options: {
                                                    prefix: '£',
                                                    props: {
                                                        precision: 0,
                                                        className: 'form-control',
                                                        placeholder: '10,000,000'
                                                    }
                                                },
                                                title: ''
                                            }
                                        },
                                        {
                                            type: FULL_CONTAINER,
                                            bool: true,
                                            iIcon:
                                                "If entering a value less than 1.00, please enter '0' before the decimal point e.g. 0.25.",
                                            label: AVG_MARGIN_LDR_AND_GY_LABEL,
                                            field: {
                                                __order: 'h',
                                                name: AVG_MARGIN_LDR_AND_GY,
                                                className: 'form-control',
                                                component: NUMBER_FIELD,
                                                suffix: '%',
                                                options: {
                                                    decimalScale: 3,
                                                    placeholder: '-1.000 - 5.000',
                                                    min: -1,
                                                    max: 5,
                                                    allowNegative: false
                                                },
                                                validate: []
                                            }
                                        },
                                        {
                                            type: FULL_CONTAINER,
                                            label: DATE_VALUE_PROVIDED_LABEL,
                                            bool: true,
                                            field: {
                                                __order: 'i',
                                                name: DATE_VALUE_PROVIDED,
                                                className: 'form-control',
                                                component: DATE_PICKER,
                                                options: {
                                                    disabledDate: current =>
                                                        current && current > moment().startOf('day')
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ];
};
