import moment from 'moment';
import { ASSETS_FORM_SECTION } from './constants';
import constants from '../../../../../UILibrary/constants';

const { FORM_TEMPLATES, FORM_FIELDS } = constants;
const { BUTTON_GROUP, DATE_PICKER, CURRENCY_FIELD, NUMBER_FIELD, ASSETS_VALUE_SEPARATOR } = FORM_FIELDS;
const { FULL_CONTAINER, FULL_VIEW_CONTAINER } = FORM_TEMPLATES;
const {
    ASSET_VALUE,
    ASSET_VAL_DATE,
    HAS_MANAGERS,
    KNOW_TARGET_RETURN,
    TARGET_RETURN,
    KNOW_CURRENT_ASSET_ALLOCATION,
    CURRENT_ASSET_ALLOCATION_TYPE,
    KNOW_LIABILITY_HEDGE_RATIO,
    INTEREST_RATE_HEDGE_RATIO,
    INFLATION_HEDGE_RATIO,
    KNOW_TOTAL_AM_ICF,
    AM_AND_CF,
    HOLD_LESS_LIQUUD_ASSETS,
    FULLY_ESG_PORTFOLIO
} = ASSETS_FORM_SECTION.FIELD_KEYS;

const yesNoOption = [{ title: 'Yes', value: 'yes' }, { title: 'No', value: 'no' }];

const onYesKnowLiabilityHedgeRatio = (isBool, order, disabled) => [
    {
        type: FULL_CONTAINER,
        label: 'Interest rate hedge ratio (as a % of assets)',
        bool: isBool,
        field: {
            __order: `${order}a`,
            name: INTEREST_RATE_HEDGE_RATIO,
            className: 'form-control',
            component: NUMBER_FIELD,
            suffix: '%',
            options: {
                decimalScale: 0,
                placeholder: 0,
                allowNegative: false,
                min: 0,
                max: 100
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
        label: 'Inflation hedge ratio (as a % of assets)',
        bool: isBool,
        field: {
            __order: `${order}b`,
            name: INFLATION_HEDGE_RATIO,
            className: 'form-control',
            component: NUMBER_FIELD,
            suffix: '%',
            options: {
                decimalScale: 0,
                placeholder: 0,
                allowNegative: false,
                min: 0,
                max: 100
            },
            validationModules: [
                {
                    moduleName: 'RequiredValidate',
                    options: { message: 'Required' }
                }
            ]
        }
    }
];

export const AssetFormSection = props => {
    const { assets } = props;

    return [
        {
            type: FULL_CONTAINER,
            label: 'Asset value',
            field: {
                __order: 'a',
                name: ASSET_VALUE,
                component: CURRENCY_FIELD,
                options: {
                    prefix: '£',
                    props: { precision: 0, className: 'form-control', placeholder: '10,000,000' }
                },
                title: (assets && assets[ASSET_VALUE]) || '',
                validationModules: [
                    {
                        moduleName: 'RequiredValidate',
                        options: { message: 'Required' }
                    },
                    {
                        moduleName: 'NumericalValidate',
                        options: { '>=': 1, message: 'Invalid entry.' }
                    }
                ]
            }
        },
        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Asset value date',
            field: {
                __order: 'b',
                name: ASSET_VAL_DATE,
                className: 'form-control',
                component: DATE_PICKER,
                options: {
                    disabledDate: current => current && current > moment().startOf('day')
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
            bool: true,
            label: 'Does the scheme hold assets with managers other than LGIM?',
            field: {
                __order: 'c',
                name: HAS_MANAGERS,
                className: 'form-control',
                component: BUTTON_GROUP,
                options: yesNoOption,
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
            bool: true,
            label: 'Do you know your target investment return above gilts?',
            hide: ['reqamao', 'appamao'].includes(props.step && props.step.stepKey),
            field: {
                __order: 'd',
                name: KNOW_TARGET_RETURN,
                className: 'form-control',
                component: BUTTON_GROUP,
                options: yesNoOption,
                validationModules: ['reqamao', 'appamao'].includes(props.step && props.step.stepKey)
                    ? []
                    : [
                          {
                              moduleName: 'RequiredValidate',
                              options: { message: 'Required' }
                          }
                      ]
            },

            when: [
                {
                    bool: assets && assets[KNOW_TARGET_RETURN] === 'yes',
                    childComponents: [
                        {
                            type: FULL_CONTAINER,
                            iIcon:
                                "If entering a value less than 1.00, please enter '0' before the decimal point e.g. 0.25.",
                            label: 'Target return above gilts (net of fees)',
                            bool: assets && assets[KNOW_TARGET_RETURN] === 'yes',
                            field: {
                                __order: 'e',
                                name: TARGET_RETURN,
                                className: 'form-control',
                                component: NUMBER_FIELD,
                                suffix: '%',
                                options: {
                                    decimalScale: 3,
                                    placeholder: '-1.000 - 5.000',
                                    allowNegative: true,
                                    min: -1,
                                    max: 5.0
                                },
                                validationModules: [
                                    {
                                        moduleName: 'RequiredValidate',
                                        options: { message: 'Required' }
                                    },
                                    {
                                        moduleName: 'NumericalValidate',
                                        options: { '>=': -1, '<=': 5.0, message: 'Invalid entry.' }
                                    }
                                ]
                            }
                        },
                        {
                            type: FULL_CONTAINER,
                            bool: assets && assets[KNOW_TARGET_RETURN] === 'yes',
                            label: 'Do you know your current asset allocation?',
                            field: {
                                __order: 'f',
                                name: KNOW_CURRENT_ASSET_ALLOCATION,
                                className: 'form-control',
                                component: BUTTON_GROUP,
                                options: yesNoOption,
                                validationModules: [
                                    {
                                        moduleName: 'RequiredValidate',
                                        options: { message: 'Required' }
                                    }
                                ]
                            },

                            ...((assets && assets[KNOW_CURRENT_ASSET_ALLOCATION] === 'yes') ||
                            (assets && assets[KNOW_TARGET_RETURN] !== 'no')
                                ? {
                                      when: [
                                          {
                                              bool: assets && assets[KNOW_CURRENT_ASSET_ALLOCATION] === 'yes',
                                              childComponents: [
                                                  {
                                                      type: FULL_CONTAINER,
                                                      bool: assets && assets[KNOW_CURRENT_ASSET_ALLOCATION] === 'yes',
                                                      label: 'How do you want to enter your current asset allocation?',
                                                      field: {
                                                          __order: 'g',
                                                          name: CURRENT_ASSET_ALLOCATION_TYPE,
                                                          className: 'form-control',
                                                          component: BUTTON_GROUP,
                                                          options: [
                                                              { title: 'Simple', value: 'simple' },
                                                              { title: 'Detail', value: 'detail' }
                                                          ],
                                                          validationModules: [
                                                              {
                                                                  moduleName: 'RequiredValidate',
                                                                  options: { message: 'Required' }
                                                              }
                                                          ]
                                                      },

                                                      when: [
                                                          {
                                                              bool:
                                                                  assets &&
                                                                  assets[CURRENT_ASSET_ALLOCATION_TYPE] === 'simple',
                                                              childComponents: [
                                                                  {
                                                                      type: FULL_VIEW_CONTAINER,
                                                                      bool: assets &&
                                                                          assets[CURRENT_ASSET_ALLOCATION_TYPE] === 'simple',
                                                                      field: {
                                                                          __order: 'h',
                                                                          name: 'assets',
                                                                          bool: assets &&
                                                                              assets[CURRENT_ASSET_ALLOCATION_TYPE] === 'simple',
                                                                          className: 'form-control',
                                                                          component: ASSETS_VALUE_SEPARATOR,
                                                                          options: {
                                                                              tabKey: ASSETS_FORM_SECTION.KEY,
                                                                              formName: props.formName,
                                                                              asyncFormData: assets,
                                                                              currentAssetAT: 'simple'
                                                                          }
                                                                      }
                                                                  }
                                                              ]
                                                          },
                                                          {
                                                              bool:
                                                                  assets &&
                                                                  assets[CURRENT_ASSET_ALLOCATION_TYPE] === 'detail',
                                                              childComponents: [
                                                                  {
                                                                      type: FULL_VIEW_CONTAINER,
                                                                      bool: assets &&
                                                                          assets[CURRENT_ASSET_ALLOCATION_TYPE] === 'detail',
                                                                      field: {
                                                                          __order: 'h',
                                                                          name: 'assets',
                                                                          className: 'form-control',
                                                                          component: ASSETS_VALUE_SEPARATOR,
                                                                          options: {
                                                                              tabKey: ASSETS_FORM_SECTION.KEY,
                                                                              formName: props.formName,
                                                                              asyncFormData: assets,
                                                                              currentAssetAT: 'detail'
                                                                          }
                                                                      }
                                                                  }
                                                              ]
                                                          }
                                                      ]
                                                  },
                                                  {
                                                      type: FULL_CONTAINER,
                                                      label: 'Do you know your liability hedge ratio?',
                                                      bool: assets && assets[KNOW_CURRENT_ASSET_ALLOCATION] === 'yes',
                                                      field: {
                                                          __order: 'i',
                                                          name: KNOW_LIABILITY_HEDGE_RATIO,
                                                          className: 'form-control',
                                                          component: BUTTON_GROUP,
                                                          options: yesNoOption,
                                                          validationModules: [
                                                              {
                                                                  moduleName: 'RequiredValidate',
                                                                  options: { message: 'Required' }
                                                              }
                                                          ]
                                                      },

                                                      when: [
                                                          {
                                                              bool:
                                                                  assets &&
                                                                  assets[KNOW_LIABILITY_HEDGE_RATIO] === 'yes',
                                                              childComponents: onYesKnowLiabilityHedgeRatio(
                                                                  assets &&
                                                                      assets[KNOW_LIABILITY_HEDGE_RATIO] === 'yes',
                                                                  'i'
                                                              )
                                                          }
                                                      ]
                                                  },
                                                  {
                                                      type: FULL_CONTAINER,
                                                      bool: assets && assets[KNOW_CURRENT_ASSET_ALLOCATION] === 'yes',
                                                      label:
                                                          'Do you know the impact of your current asset management and investment consulting fees?',
                                                      field: {
                                                          __order: 'j',
                                                          name: KNOW_TOTAL_AM_ICF,
                                                          className: 'form-control',
                                                          component: BUTTON_GROUP,
                                                          options: yesNoOption,
                                                          validationModules: [
                                                              {
                                                                  moduleName: 'RequiredValidate',
                                                                  options: { message: 'Required' }
                                                              }
                                                          ]
                                                      },

                                                      when: [
                                                          {
                                                              bool: assets && assets[KNOW_TOTAL_AM_ICF] === 'yes',
                                                              childComponents: [
                                                                  {
                                                                      type: FULL_CONTAINER,
                                                                      iIcon:
                                                                          "If entering a value less than 1.00, please enter '0' before the decimal point e.g. 0.25.",
                                                                      label:
                                                                          'Asset management and investment advisory fees (as a % of assets)',
                                                                      bool:
                                                                          assets && assets[KNOW_TOTAL_AM_ICF] === 'yes',
                                                                      field: {
                                                                          __order: 'k',
                                                                          name: AM_AND_CF,
                                                                          className: 'form-control',
                                                                          component: NUMBER_FIELD,
                                                                          suffix: '%',
                                                                          options: {
                                                                              decimalScale: 2,
                                                                              placeholder: '0.00 - 5.00',
                                                                              min: 0,
                                                                              max: 5.0,
                                                                              allowNegative: false
                                                                          },
                                                                          validationModules: [
                                                                              {
                                                                                  moduleName: 'RequiredValidate',
                                                                                  options: { message: 'Required' }
                                                                              },
                                                                              {
                                                                                  moduleName: 'NumericalValidate',
                                                                                  options: {
                                                                                      '>=': 0.0,
                                                                                      '<=': 5.0,
                                                                                      message: 'Invalid entry.'
                                                                                  }
                                                                              }
                                                                          ]
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
                                : {})
                        }
                    ]
                },
                ...((assets && assets[KNOW_TARGET_RETURN] === 'no') ||
                (assets && assets[KNOW_CURRENT_ASSET_ALLOCATION] !== 'yes')
                    ? [
                          {
                              bool: assets && assets[KNOW_TARGET_RETURN] === 'no',
                              childComponents: [
                                  {
                                      type: FULL_CONTAINER,
                                      label: 'How do you want to enter your current asset allocation?',
                                      bool: assets && assets[KNOW_TARGET_RETURN] === 'no',
                                      field: {
                                          __order: 'g',
                                          name: CURRENT_ASSET_ALLOCATION_TYPE,
                                          className: 'form-control',
                                          component: BUTTON_GROUP,
                                          options: [
                                              { title: 'Simple', value: 'simple' },
                                              { title: 'Detail', value: 'detail' }
                                          ],
                                          validationModules: [
                                              {
                                                  moduleName: 'RequiredValidate',
                                                  options: { message: 'Required' }
                                              }
                                          ]
                                      },

                                      when: [
                                          {
                                              bool: assets && assets[CURRENT_ASSET_ALLOCATION_TYPE] === 'simple',
                                              childComponents: [
                                                  {
                                                      type: FULL_VIEW_CONTAINER,
                                                      bool: assets && assets[CURRENT_ASSET_ALLOCATION_TYPE] === 'simple',
                                                      field: {
                                                          __order: 'h',
                                                          name: 'assets',
                                                          className: 'form-control',
                                                          component: ASSETS_VALUE_SEPARATOR,
                                                          options: {
                                                              tabKey: ASSETS_FORM_SECTION.KEY,
                                                              formName: props.formName,
                                                              asyncFormData: assets,
                                                              currentAssetAT: 'simple'
                                                          }
                                                      }
                                                  }
                                              ]
                                          },
                                          {
                                              bool: assets && assets[CURRENT_ASSET_ALLOCATION_TYPE] === 'detail',
                                              childComponents: [
                                                  {
                                                      type: FULL_VIEW_CONTAINER,
                                                      bool: assets && assets[CURRENT_ASSET_ALLOCATION_TYPE] === 'detail',
                                                      field: {
                                                          __order: 'h',
                                                          name: 'assets',
                                                          className: 'form-control',
                                                          component: ASSETS_VALUE_SEPARATOR,
                                                          options: {
                                                              tabKey: ASSETS_FORM_SECTION.KEY,
                                                              formName: props.formName,
                                                              asyncFormData: assets,
                                                              currentAssetAT: 'detail'
                                                          }
                                                      }
                                                  }
                                              ]
                                          }
                                      ]
                                  },
                                  {
                                      type: FULL_CONTAINER,
                                      bool: assets && assets[KNOW_TARGET_RETURN] === 'no',
                                      label: 'Do you know your liability hedge ratio?',
                                      field: {
                                          __order: 'j',
                                          name: KNOW_LIABILITY_HEDGE_RATIO,
                                          className: 'form-control',
                                          component: BUTTON_GROUP,
                                          options: yesNoOption,
                                          validationModules: [
                                              {
                                                  moduleName: 'RequiredValidate',
                                                  options: { message: 'Required' }
                                              }
                                          ]
                                      },

                                      when: [
                                          {
                                              bool: assets && assets[KNOW_LIABILITY_HEDGE_RATIO] === 'yes',
                                              childComponents: onYesKnowLiabilityHedgeRatio(
                                                  assets && assets[KNOW_LIABILITY_HEDGE_RATIO] === 'yes',
                                                  'j'
                                              )
                                          }
                                      ]
                                  },
                                  {
                                      type: FULL_CONTAINER,
                                      bool: assets && assets[KNOW_TARGET_RETURN] === 'no',
                                      label:
                                          'Do you know the impact of your current asset management and investment consulting fees?',
                                      field: {
                                          __order: 'k',
                                          name: KNOW_TOTAL_AM_ICF,
                                          className: 'form-control',
                                          component: BUTTON_GROUP,
                                          options: yesNoOption,
                                          validationModules: [
                                              {
                                                  moduleName: 'RequiredValidate',
                                                  options: { message: 'Required' }
                                              }
                                          ]
                                      },

                                      when: [
                                          {
                                              bool: assets && assets[KNOW_TOTAL_AM_ICF] === 'yes',
                                              childComponents: [
                                                  {
                                                      type: FULL_CONTAINER,
                                                      iIcon:
                                                          "If entering a value less than 1.00, please enter '0' before the decimal point e.g. 0.25.",
                                                      label:
                                                          'Asset management and investment advisory fees (as a % of assets)',
                                                      bool: assets && assets[KNOW_TOTAL_AM_ICF] === 'yes',
                                                      field: {
                                                          __order: 'l',
                                                          name: AM_AND_CF,
                                                          className: 'form-control',
                                                          component: NUMBER_FIELD,
                                                          suffix: '%',
                                                          options: {
                                                              decimalScale: 2,
                                                              placeholder: '0.00 - 5.00',
                                                              min: 0,
                                                              max: 5.0,
                                                              allowNegative: false
                                                          },
                                                          validationModules: [
                                                              {
                                                                  moduleName: 'RequiredValidate',
                                                                  options: { message: 'Required' }
                                                              },
                                                              {
                                                                  moduleName: 'NumericalValidate',
                                                                  options: {
                                                                      '>=': -1,
                                                                      '<=': 5.0,
                                                                      message: 'Invalid entry.'
                                                                  }
                                                              }
                                                          ]
                                                      }
                                                  }
                                              ]
                                          }
                                      ]
                                  }
                              ]
                          }
                      ]
                    : [])
            ]
        },
        {
            type: FULL_CONTAINER,
            label: 'Do you want to avoid holding less liquid assets, such as property?',
            field: {
                __order: 'm',
                name: HOLD_LESS_LIQUUD_ASSETS,
                className: 'form-control',
                component: BUTTON_GROUP,
                options: yesNoOption,
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
            label:
                'Do you want to fully integrate Environmental, Social and Governance (ESG) themes within your portfolio allocation?',

            field: {
                __order: 'n',
                name: FULLY_ESG_PORTFOLIO,
                className: 'form-control',
                component: BUTTON_GROUP,
                options: yesNoOption,
                validationModules: [
                    {
                        moduleName: 'RequiredValidate',
                        options: { message: 'Required' }
                    }
                ]
            }
        }
    ];
};
