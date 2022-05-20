import React, { Fragment } from 'react';
import { Row, Col, Tabs } from 'antd';
import _ from 'lodash';

import constants from '../../../constants';
import { FullContainer, HalfContainer, PublishCheckbox, AddMoreContainer, FullViewContainer } from '../fieldContainers';
import MultiPublishContainer from '../../multiPublish';
import { FormField } from '../fields';
import ValidationModule from '../../../validation-module';
import { convertArtifacts } from '../../../helpers/ArtifactConverter';
import { validateComponents } from './validateComponents';
import { validateType } from './validateType';

const { TabPane } = Tabs;
const { FORM_TEMPLATES } = constants;

const {
    ROW,
    COL,
    DIV,
    FIELD,
    LABEL,
    FULL_CONTAINER,
    HALF_CONTAINER,
    PUBLISH_CHECKBOX,
    ADD_MORE_CONTAINER,
    PUBLISH_MULTI_CHECKBOX_CONTAINER,
    FULL_VIEW_CONTAINER
} = FORM_TEMPLATES;

const DynamicComponent = ({ element, disabled, children, formHooks, artifacts }) => {
    if (typeof element.bool !== 'undefined' && element.bool === false) {
        return null;
    } else if (typeof element.bool === 'string' && !formHooks) {
        return null;
    } else if (typeof element.bool === 'string' && formHooks && !formHooks[element.bool]) {
        return null;
    }
    // set validations to the form if use JSON config
    if (element.field && element.field.validationModules) {
        const validations = ValidationModule.formFieldValidations(element.field.validationModules);
        if (validations) {
            delete element.field.validationModules;
            element.field.validate = validations;
        }
    }
    if (element.field && Array.isArray(element.field)) {
        element.field.forEach((field, i) => {
            if (field && field.validationModules) {
                const validations = ValidationModule.formFieldValidations(field.validationModules);
                if (validations) {
                    delete element.field[i].validationModules;
                    element.field[i].validate = validations;
                }
            }
        });
    }
    if (element.type === FIELD && element.props) {
        const validations = ValidationModule.formFieldValidations(element.props.validationModules);
        if (validations) {
            delete element.props.validationModules;
            element.props.validate = validations;
        }
    }
    if (element.childComponents) {
        element.childComponents.map((data, key) => {
            if (data.field && data.field.validationModules) {
                const validations = ValidationModule.formFieldValidations(data.field.validationModules);
                if (validations) {
                    delete element.childComponents[key].field.validationModules;
                    element.childComponents[key].field.validate = validations;
                }
            }
        });
    }
    // set onchange function to the form if use JSON config
    if (element.field && element.field.onChange && formHooks && formHooks[element.field.onChange]) {
        const onChangeHookName = element.field.onChange;
        delete element.field.onChange;
        element.field.onChange = e => {
            formHooks[`${onChangeHookName}`](e.target.value);
        };
    }

    // set field options to the form if use JSON config
    if (element.field && element.field.options && formHooks && formHooks[element.field.options]) {
        const optionsHookName = element.field.options;
        delete element.field.options;
        element.field.options = formHooks[optionsHookName];
    }

    // set field generate options to the form if use JSON config
    if (element.field && element.field.generateoptions && formHooks && formHooks[element.field.generateoptions]) {
        const generateOptionsHookName = element.field.generateoptions;
        delete element.field.generateoptions;
        element.field.generateoptions = formHooks[generateOptionsHookName];
    }

    return element.type === ROW ? (
        <Row {...element.props}>
            {element.removeBubble && element.removeBubble.bool && !disabled && (
                <i {...element.removeBubble.actions} className="remove-icon  fa fa-times" aria-hidden="true"></i>
            )}
            {element.rawComponents ? element.rawComponents : children ? children : null}
        </Row>
    ) : element.type === COL ? (
        <Col {...element.props}>{children}</Col>
    ) : element.type === DIV ? (
        <div {...element.props}>{children}</div>
    ) : element.type === FIELD ? (
        <FormField {...element.props} disabled={disabled} />
    ) : element.type === LABEL ? (
        <label {...element.props}>{convertArtifacts(element.value, artifacts)}</label>
    ) : element.type === FULL_CONTAINER ? (
        <FullContainer
            label={element.label}
            field={element.field}
            classN={element.className}
            rawComponents={element.rawComponents}
            blockComponent={element.blockComponent}
            disabled={disabled}
            iIcon={element.iIcon ? element.iIcon : null}
            hide={element.hide}
            artifacts={artifacts}
        />
    ) : element.type === FULL_VIEW_CONTAINER ? (
        <FullViewContainer
            field={element.field}
            classN={element.className}
            rawComponents={element.rawComponents}
            blockComponent={element.blockComponent}
            disabled={disabled}
            iIcon={element.iIcon ? element.iIcon : null}
            hide={element.hide}
        />
    ) : element.type === HALF_CONTAINER ? (
        <HalfContainer childComponents={element.childComponents} disabled={disabled} artifacts={artifacts} />
    ) : element.type === PUBLISH_CHECKBOX ? (
        <PublishCheckbox
            label={element.label}
            name={element.name}
            resourceName={element.resourceName}
            resourceUrl={element.resourceUrl}
            props={element.props}
            disabled={disabled}
            bucketName={element.bucketName}
            artifacts={artifacts}
            api={element.api}
        />
    ) : element.type === ADD_MORE_CONTAINER ? (
        <AddMoreContainer element={element} artifacts={artifacts} />
    ) : element.type === PUBLISH_MULTI_CHECKBOX_CONTAINER ? (
        <MultiPublishContainer
            rows={element.data}
            formName={element.formName}
            bucketName={element.bucketName}
            api={element.api}
        />
    ) : null;
};

const BaseTemplate = ({ data: json, disabled, formHooks, artifacts }) => (
    <>
        {json.map(function mapper(element, eKey) {
            return (
                <Fragment key={eKey}>
                    <DynamicComponent
                        element={element}
                        {...element.props}
                        disabled={disabled}
                        formHooks={formHooks}
                        artifacts={artifacts}
                    >
                        {Array.isArray(element.childComponents) ? element.childComponents.map(mapper) : null}
                    </DynamicComponent>
                    {Array.isArray(element.when)
                        ? element.when.map(w =>
                              w.bool !== 'undefined' && w.bool === true ? w.childComponents.map(mapper) : null
                          )
                        : null}
                    {Array.isArray(element.tabs) ? (
                        <Tabs {...element.tabOptions}>
                            {element.tabs.map((tab, tKey) => (
                                <TabPane tab={tab.title} key={tab.tabKey}>
                                    {Array.isArray(tab.childComponents) ? tab.childComponents.map(mapper) : null}
                                </TabPane>
                            ))}
                        </Tabs>
                    ) : null}
                </Fragment>
            );
        })}
    </>
);

// const getFieldsInJSON = (json) => {
//     let fields = [];
//     json.map(function mapper(element) {
//         if (Array.isArray(element.childComponents)) {
//              element.childComponents.map(mapper)
//         }
//
//         if (Array.isArray(element.when)) {
//              element.when.map(w =>  w.childComponents.map(mapper))
//         }
//
//         if (element.field) {
//             if (Array.isArray(element.field)) {
//                 for (let field of element.field) {
//                     fields.push(field.name);
//                 }
//             } else {
//                 fields.push(element.field.name);
//             }
//         }
//     });
//
//     fields = _.uniqWith(fields, _.isEqual);
//     return fields;
// };

// const getChildComponents = (fieldsJSON, field) => {
//     let childComponents = [];
//
//     const mapComponents = (f, element) => {
//         if (f.name === field) {
//             if (element.when)
//                 element.when.map(e => { childComponents = _.concat(childComponents, e.childComponents) })
//         }
//     };
//
//     fieldsJSON.map(function mapper(element) {
//         if ((Array.isArray(element.childComponents))) {
//             element.childComponents.map(mapper)
//         }
//false
//         if ((Arrafalsey.isArray(element.when))) {
//             elemefalsent.when.map((w) => w.childComponents.map(mapper))
//         }
//
//         if (element.field) {
//             if (Array.isArray(element.field)) {
//                 for (let f of element.field) {
//                     mapComponents(f, element);
//                 }
//                 return;
//             }
//             mapComponents(element.field, element);
//         }
//     });
//
//     return childComponents;
// };
export const validateDataSet = (data, fieldsJSON) => {
    let _data = data;

    fieldsJSON.map(function mapper(element) {
        if (element.bool === false) {
            if (element.field && !Array.isArray(element.field) && element.field.name) {
                const result = _.omit(_data, `${element.field.name}`);
                _data = result;
            }
            if (element.field && Array.isArray(element.field)) {
                element.field.map(f => {
                    const result = f.name && _.omit(_data, `${f.name}`);
                    _data = result;
                });
            }

            if (element.type && validateType[element.type]) {
                _data = validateType[element.type](_data, element);
            }

            if (element.field && element.field.component && validateComponents[element.field.component]) {
                _data = validateComponents[element.field.component](_data, element.field.options);
            }
        }

        if (Array.isArray(element.childComponents)) {
            element.childComponents.map(mapper);
        }

        if (Array.isArray(element.when)) {
            element.when.map(w => {
                w.childComponents.map(mapper);
            });
        }
    });
    return _data;
};

export const validateFields = (data, fieldsJSON) => {
    const fields = [];
    const errors = {};

    const pushFieldData = element => {
        fields.push({
            __order: element.field.__order,
            name: element.field.name,
            label: typeof element.label === 'object' ? element.label.value : element.label
        });
    };

    const doValidate = ({ validations, field: { name } }) => {
        if (validations && validations.length > 0) {
            const value = data[name];
            const validateField = _.compact(validations.map(rule => rule(value)));
            if (validateField.length > 0) {
                errors[name] = validateField[0];
            }
        }
    };

    const pushFieldDataChild = element => {
        fields.push({
            __order: element.__order,
            name: element.name,
            label: typeof element.label === 'object' ? element.label.value : element.label
        });
    };

    const doValidateChild = ({ name, validations }) => {
        if (validations && validations.length > 0) {
            const value = data[name];
            const validateField = _.compact(validations.map(rule => rule(value)));
            if (validateField.length > 0) {
                errors[name] = validateField[0];
            }
        }
    };

    fieldsJSON.map(function mapper(element) {
        if (Array.isArray(element.childComponents)) {
            element.childComponents.map(mapper);
        }

        if (Array.isArray(element.when)) {
            element.when.map(w => {
                if (w.bool === undefined || w.bool) {
                    w.childComponents.map(mapper);
                }

                return null;
            });
        }

        if ((element.bool === undefined || element.bool) && element.field) {
            if (Array.isArray(element.field)) {
                element.field.map(e => {
                    pushFieldDataChild(e);
                    doValidateChild(e);
                });
            } else {
                pushFieldData(element);
                doValidate(element);
            }
        }

        return null;
    });

    return { fields, errors };
};

//Looks at the formJson, figures out inter dependencies and removes keys from objects that shouldnt be there
export const obeyDynamicDependencies = (formData, formJson, fillWith) => {
    let data = {};
    Object.keys(formData).forEach(key => {
        if (shouldKeyBeIncluded(key, formJson)) {
            data[key] = formData[key];
        } else if (fillWith !== undefined) {
            data[key] = fillWith;
        }
    });

    return data;
};

//WARNING: DO NOT TOUCH THIS CODE, recursively searching through the formJson used to create the form
//in order to figure out dependencies and whether to include them in the final formdata.
//cuz redux form dosent remove keys even though form fields get un registered
const shouldKeyBeIncluded = (key, fJson) => {
    //check if parent key
    const parentKey = fJson.find(f => f && f.field && f.field.name === key);
    if ((parentKey && parentKey.bool) || (parentKey && parentKey.bool == undefined)) return true;
    if (parentKey && parentKey.bool === false) return false;
    //this means its not a parent key, time to go deep
    let [field, parent] = recursivelyFindField(key, fJson, null);
    if (!field) {
        return false;
    }
    let p = parent;
    //traverse up the tree to see if parent is set to hidden
    while (p) {
        if (p.bool === false) {
            return false;
        }
        if (p.bool === false) return false;
        p = p.parent;
    }
    if (field.hasOwnProperty('bool')) return field.bool;

    return true;
};

//WARNINIG: DO NOT TOUCH THIS CODE, recursively searching through the formJson used to create the form
//in order to figure out dependencies and whether to include them in the final formdata.
//cuz redux form dosent remove keys even though form fields get un registered
const recursivelyFindField = (key, fJson, parent) => {
    let field = null;

    for (var i = 0; i < fJson.length; i++) {
        const f = fJson[i];
        if (!f) continue;
        if (f.field) {
            if (f.field.name === key) {
                return [f.field, parent];
            }
            if (Array.isArray(f.field)) {
                let [field, par] = recursivelyFindField(key, f.field, { ...f, parent });
                if (field) return [field, par];
            }
        }
        if (f.name === key) return [f, parent];
        if (f.when) {
            let [field, par] = recursivelyFindField(key, f.when, { ...f, parent });
            if (field) return [field, par];
        }
        if (f.childComponents) {
            let [field, par] = recursivelyFindField(key, f.childComponents, { ...f, parent });
            if (field) return [field, par];
        }
    }

    return [field, parent];
};

//recurvisely traverse the json tree(json used to build the form) and assign sort key to to each element name and return order map.
//used to order labels when writing to excel,
export const generateOrderMapWithFormJson = preBuildJson => {
    let refNum = { num: 0 };
    return recursivelyAssignOrderNumbersToElements(preBuildJson, {}, refNum);
};

const recursivelyAssignOrderNumbersToElements = (fields, orderMap, refNum) => {
    if (!fields) return orderMap;
    let localOrderMap = {};
    for (var i = 0; i < fields.length; i++) {
        let field = fields[i];
        if (!field) continue;
        if (field.field) {
            if (Array.isArray(field.field)) {
                let foundOrderMap = recursivelyAssignOrderNumbersToElements(field.field, orderMap, refNum);
                localOrderMap = { ...localOrderMap, ...foundOrderMap };
            } else {
                refNum.num = refNum.num + 1;
                let foundOrderMap = recursivelyAssignOrderNumbersToElements(
                    null,
                    { [field.field.name]: refNum.num, ...orderMap },
                    refNum
                );
                localOrderMap = { ...localOrderMap, ...foundOrderMap };
            }
        }
        if (field.name) {
            refNum.num = refNum.num + 1;
            let foundOrderMap = recursivelyAssignOrderNumbersToElements(
                null,
                { [field.name]: refNum.num, ...orderMap },
                refNum
            );
            localOrderMap = { ...localOrderMap, ...foundOrderMap };
        }
        if (field.when) {
            //refNum.num = refNum.num + 1;
            let foundOrderMap = recursivelyAssignOrderNumbersToElements(field.when, orderMap, refNum);
            localOrderMap = { ...localOrderMap, ...foundOrderMap };
        }
        if (field.childComponents) {
            //refNum.num = refNum.num + 1;
            let foundOrderMap = recursivelyAssignOrderNumbersToElements(field.childComponents, orderMap, refNum);
            localOrderMap = { ...localOrderMap, ...foundOrderMap };
        }
    }

    //refNum.num = refNum.num + 1;
    return recursivelyAssignOrderNumbersToElements(null, { ...localOrderMap, ...orderMap }, refNum);
};

export default BaseTemplate;
