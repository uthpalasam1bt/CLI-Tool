import moment from 'moment';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import _ from 'lodash';
import ExcelWorkbook from './ExcelWorkbook';
import { readFile } from '../components/forms/fields/FileDownloader';
import { validateDataSet } from '../components/forms/formBase/FormBase';
import constants from '../constants';
import {
    simpleAssetAllocationFields,
    detailAssetAllocationFields,
    ASSET_ALLOCATION_TOTAL,
    SIMPLE_ASSET_ALLOCATION_TOTAL,
    DETAIL_ASSET_ALLOCATION_TOTAL
} from '../components/forms/fields/AssetsValueSeparator/constants';
import { AddressFieldlabelsMap } from '../components/forms/fields/AddressField/constants';
import { DeficitFieldlabelsMap } from '../components/forms/fields/DificitContribution/constants';
import {
    CorptrusteeFieldsLabelsMap,
    IndvtrusteeFieldsLabelsMap
} from '../components/forms/fields/TrusteeFields/common/AddTrustee/constants';
import { monthMap } from '../components/forms/fields/MonthDatePicker/constants';
import { convertArtifacts } from './ArtifactConverter';
import { element } from 'prop-types';

const { FORM_TEMPLATES, FORM_FIELDS, DOWNLOAD_FILE_TYPES } = constants;
const {
    ASSETS_VALUE_SEPARATOR,
    ADDRESS_FIELD,
    INDIVIDUAL_TRUSTEE_SECTION,
    CORPORATE_TRUSTEE_SECTION,
    DEFICIT_CONTRIBUTION_SECTION
} = FORM_FIELDS;
const { FULL_VIEW_CONTAINER } = FORM_TEMPLATES;

const fullViewContainerLabelMap = {
    [ASSETS_VALUE_SEPARATOR]: (element, name) => {
        if (name.includes('.')) {
            let spilitedName = name.split('.');
            name = spilitedName[spilitedName.length - 1];
        }
        if (_.get(element, 'field.options.currentAssetAT', 'simple') == 'simple') {
            if (SIMPLE_ASSET_ALLOCATION_TOTAL == name) {
                return { label: 'Total', __order: 'h' };
            } else {
                const labelField = simpleAssetAllocationFields.find(x => x.field == name);

                if (labelField) return labelField;
            }
        } else {
            if (DETAIL_ASSET_ALLOCATION_TOTAL == name) {
                return { label: 'Total', __order: 'o' };
            } else {
                const labelField = detailAssetAllocationFields.find(x => x.field == name);
                if (labelField) return labelField;
            }
        }
    },
    [DEFICIT_CONTRIBUTION_SECTION]: (element, name) => {
        if (name.includes('.')) {
            let spilitedName = name.split('.');
            name = spilitedName[spilitedName.length - 1];
        }
        const labelField = DeficitFieldlabelsMap.find(x => x.field == name);
        if (labelField) return labelField;
    },
    [ADDRESS_FIELD]: (element, name) => {
        const labelField = AddressFieldlabelsMap.find(x => x.field == name);
        if (labelField) return labelField;
    },
    [INDIVIDUAL_TRUSTEE_SECTION]: (element, name) => {
        const labelField = IndvtrusteeFieldsLabelsMap.find(x => x.field == name);
        if (labelField) return labelField;
    },
    [CORPORATE_TRUSTEE_SECTION]: (element, name) => {
        const labelField = CorptrusteeFieldsLabelsMap.find(x => x.field == name);
        if (labelField) return labelField;
    }
};

const getLabels = (formFields, labelOverRide, fieldNameInDataset) => {
    let label;
    let __order;
    let positionPrefix = '';
    let innerLabel;
    let forceFileNameLabel;

    if (labelOverRide && labelOverRide[fieldNameInDataset]) {
        label = labelOverRide[fieldNameInDataset];
    } else {
        for (const field of formFields) {
            function mapper(element, index, data, prefix = '') {
                if (_.get(element, 'field.name') == fieldNameInDataset) {
                    label = _.get(element, 'label');
                    __order = _.get(element, 'field.__order');
                    positionPrefix = prefix;
                    forceFileNameLabel = _.get(element, 'field.options.forceFileNameLabel', false);
                }
                if (_.get(element, 'name') == fieldNameInDataset) {
                    label = innerLabel;
                    __order = _.get(element, '__order');
                }
                if (!label && Array.isArray(element.field)) {
                    innerLabel = element.label;
                    element.field.map(mapper);
                }
                if (!label && Array.isArray(element.childComponents)) {
                    element.childComponents.map(mapper);
                }
                if (!label && Array.isArray(element.when)) {
                    element.when.map(w => w.childComponents.map(mapper));
                }
                if (!label && Array.isArray(element.tabs)) {
                    element.tabs.map(w => {
                        w.childComponents.map(mapper);
                    });
                }
                if (!label && _.has(element, 'downloadFieldConfig')) {
                    element.downloadFieldConfig.map((field, index, data) =>
                        mapper(field, index, data, _.get(element, '__order'))
                    );
                }
                if (!label && element.type == FULL_VIEW_CONTAINER) {
                    if (_.has(fullViewContainerLabelMap, `${element.field.component}`)) {
                        const labelFromComponent = fullViewContainerLabelMap[element.field.component](
                            element,
                            fieldNameInDataset
                        );
                        if (labelFromComponent) {
                            label = labelFromComponent.label;
                            __order = labelFromComponent.__order;
                            positionPrefix = _.get(element, 'field.__order');
                        }
                    }
                }
            }
            mapper(field);
            if (label) break;
        }
    }
    return { label, position: __order, positionPrefix, forceFileNameLabel };
};

export const simpleFormDataDownloader = async (
    formData,
    formFields,
    api,
    bucketName = null,
    labelOverRide = {},
    zipName = 'scheme',
    excelFileName = 'request',
    excelTabName = 'tab1',
    attachmentArray = [],
    artifacts
) => {
    let sheetData = [];

    const attachments = [];
    let filteredData = validateDataSet(formData, formFields);

    _.mapKeys(filteredData, function dataMapper(data, obj, objData, prefix, positionSuffix = '') {
        if (typeof data === 'string') {
            if (DOWNLOAD_FILE_TYPES.includes(data.split('.').pop())) {
                let { label, forceFileNameLabel = false } = prefix
                    ? getLabels(formFields, labelOverRide, prefix)
                    : getLabels(formFields, labelOverRide, obj);

                attachments.push({
                    key: label && forceFileNameLabel ? `${label}.${data.split('.').pop()}` : `${data.split('/').pop()}`,
                    url: data
                });
            } else {
                let { label, position = '', positionPrefix = '' } = prefix
                    ? getLabels(formFields, labelOverRide, prefix)
                    : getLabels(formFields, labelOverRide, obj);

                if (label) {
                    sheetData.push({
                        key: convertArtifacts(label, artifacts),
                        value:
                            moment(data, 'YYYY-MM-DD', true).isValid() && isNaN(data)
                                ? moment(data).format('DD-MM-YYYY')
                                : data,
                        position: positionPrefix + positionSuffix + position
                    });
                }
            }
        }
        if (typeof data === 'number') {
            let { label, position, positionPrefix = '' } = prefix
                ? getLabels(formFields, labelOverRide, prefix)
                : getLabels(formFields, labelOverRide, obj);
            if (label) {
                sheetData.push({
                    key: convertArtifacts(label, artifacts),
                    value: data,
                    position: positionPrefix + positionSuffix + position
                });
            }
        }
        if (typeof data === 'object' && !Array.isArray(data)) {
            let { label, position, positionPrefix = '' } = prefix
                ? getLabels(formFields, labelOverRide, prefix)
                : getLabels(formFields, labelOverRide, obj);
            if (label) {
                sheetData.push({
                    key: convertArtifacts(label, artifacts),
                    value:
                        _.has(data, 'month') && _.has(data, 'date')
                            ? `${monthMap[_.get(data, 'month', '')]}-` + _.get(data, 'date', '')
                            : '',
                    position: positionPrefix + positionSuffix + position
                });
            }
            _.mapKeys(data, function(x, y) {
                dataMapper(x, y, data, `${obj}.${y}`);
            });

            // for (const name in data) {

            //     let values = data[name];
            //     let { label, position } =
            //         getLabels(formFields, labelOverRide, `${obj}.${name}`) ||
            //         getLabels(formFields, labelOverRide, name);
            //     if (label) {
            //         sheetData.push({
            //             key: label,
            //             value: moment(values).isValid() && isNaN(values) ? moment(values).format('DD-MM-YYYY') : values,
            //             position
            //         });
            //     }
            // }
        }
        if (Array.isArray(data)) {
            for (const [m, item] of data.entries()) {
                if (_.has(item, 'uid') && _.has(item, 'url') && attachmentArray.includes(obj)) {
                    attachments.push({
                        key:
                            `${labelOverRide[obj] ? labelOverRide[obj] : obj.split(' ').join('-')}_` +
                            item.url.split('/').pop(),
                        url: item.url
                    });
                } else {
                    _.mapKeys(item, function arrayDataInnerMap(x, y) {
                        if (Array.isArray(x)) {
                            for (const [n, val] of x.entries()) {
                                _.mapKeys(val, function innerArrayDataInnerMap(a, b) {
                                    dataMapper(a, b, val, `${y}.${b}`, `${m}${n}`);
                                });
                            }
                        } else {
                            dataMapper(x, y, item, `${obj}.${y}`, `${m}`);
                        }
                    });

                    // _.mapKeys(item, function arrayDataInnerMap(x, y) {
                    //     if (Array.isArray(x)) {
                    //         for (const [n, val] of x.entries()) {
                    //             dataMapper(x, y, val, `${obj}.${y}`, `${m}${n}`);
                    //         }
                    //     } else {
                    //         dataMapper(x, y, item, `${obj}.${y}`, `${m}`);
                    //     }
                    // });

                    // if (sheetData.length > 0 && data.indexOf(item) == 0) {
                    //     sheetData.push({
                    //         key: '',
                    //         value: ''
                    //     });
                    // }
                    // x= data y = field name iyem = array element obj=incubmanagers.email

                    // for (const index in item) {
                    //     let values = item[index];
                    //     if (typeof(values) === 'string' || typeof(values) === 'number') {
                    //         let { label, position } =
                    //         getLabels(formFields, labelOverRide, `${obj}.${index}`) ||
                    //         getLabels(formFields, labelOverRide, index);
                    //         if (label) {
                    //             sheetData.push({
                    //                 key: label,
                    //                 value:
                    //                     moment(values).isValid() && isNaN(values)
                    //                         ? moment(values).format('DD-MM-YYYY')
                    //                         : values,
                    //                 // position: position
                    //             });
                    //         }
                    //     } else if (Array.isArray(values)) {

                    //     }
                    // }
                    // sheetData.push({
                    //     key: '',
                    //     value: ''
                    // });
                }
            }
        }
    });

    if (sheetData.length > 0) {
        sheetData = _.orderBy(sheetData, ['position'], ['asc']);
        for (const data of sheetData) {
            if (data.position) delete data.position;
        }
    }

    const sheets = [
        {
            name: excelTabName,
            data: sheetData,
            columns: [{ label: 'Label', value: 'key' }, { label: 'Value', value: 'value' }]
        }
    ];

    const sheetDatam = new ExcelWorkbook().getExcelData(sheets);
    const fileDataMap = [];

    for (let attachment of attachments) {
        const fileSource = await readFile({
            url: attachment.url,
            bucketNameProp: bucketName,
            api: api
        });

        fileDataMap.push({ name: attachment.key, source: fileSource });
    }

    const zip = new JSZip();
    zip.file(`${excelFileName.split(' ').join('-')}.xlsx`, sheetDatam);
    if (fileDataMap.length > 0) {
        for (let file of fileDataMap) {
            zip.file(file.name, file.source);
        }
    }

    zip.generateAsync({ type: 'blob' }).then(function(content) {
        saveAs(content, `${zipName.split(' ').join('-')}.zip`);
    });
};

export const tabFormDataDownloader = async (
    formData,
    api,
    formTabs,
    bucketName = null,
    labelOverRide = {},
    zipName = 'scheme',
    excelFileName = 'request',
    attachmentArray = [],
    artifacts
) => {
    const attachments = [];

    const sheets = formTabs.map(tab => {
        let sheetData = [];

        const formFields = tab.formFieldFunction
            ? tab.formFieldFunction(formData)
            : tab.formFieldData
            ? tab.formFieldData
            : [];

        let filteredData = validateDataSet(formData[tab.tabKey], formFields);

        _.mapKeys(filteredData, function dataMapper(valuesOfObj, obj, objData, prefix, positionSuffix = '') {
            // for (let obj in data) {
            //     let valuesOfObj = data[obj];

            if (typeof valuesOfObj === 'string') {
                if (DOWNLOAD_FILE_TYPES.includes(valuesOfObj.split('.').pop())) {
                    let { label, forceFileNameLabel = false } = prefix
                        ? getLabels(formFields, labelOverRide, prefix)
                        : getLabels(formFields, labelOverRide, obj);

                    attachments.push({
                        key:
                            label && forceFileNameLabel
                                ? `${label}.${valuesOfObj.split('.').pop()}`
                                : `${valuesOfObj.split('/').pop()}`,
                        url: valuesOfObj
                    });
                } else {
                    let { label, position = '', positionPrefix = '' } = prefix
                        ? getLabels(formFields, labelOverRide, prefix)
                        : getLabels(formFields, labelOverRide, obj);

                    if (label) {
                        sheetData.push({
                            key: convertArtifacts(label, artifacts),
                            value:
                                moment(valuesOfObj, 'YYYY-MM-DD', true).isValid() && isNaN(valuesOfObj)
                                    ? moment(valuesOfObj).format('DD-MM-YYYY')
                                    : valuesOfObj,
                            position: positionPrefix + positionSuffix + position
                        });
                    }
                }
            }
            if (typeof valuesOfObj === 'number') {
                let { label, position, positionPrefix = '' } = prefix
                    ? getLabels(formFields, labelOverRide, prefix)
                    : getLabels(formFields, labelOverRide, obj);

                if (label) {
                    sheetData.push({
                        key: convertArtifacts(label, artifacts),
                        value: valuesOfObj,
                        position: positionPrefix + positionSuffix + position
                    });
                }
            }

            if (typeof valuesOfObj === 'object' && !Array.isArray(valuesOfObj)) {
                let { label, position, positionPrefix = '' } = prefix
                    ? getLabels(formFields, labelOverRide, prefix)
                    : getLabels(formFields, labelOverRide, obj);
                if (label) {
                    sheetData.push({
                        key: convertArtifacts(label, artifacts),
                        value:
                            _.has(valuesOfObj, 'month') && _.has(valuesOfObj, 'date')
                                ? `${monthMap[_.get(valuesOfObj, 'month', '')]}-` + _.get(valuesOfObj, 'date', '')
                                : '',
                        position: positionPrefix + positionSuffix + position
                    });
                }
                _.mapKeys(valuesOfObj, function(x, y) {
                    dataMapper(x, y, valuesOfObj, `${obj}.${y}`);
                });

                // for (const name in valuesOfObj) {
                //     let values = valuesOfObj[name];
                //     let { label, position } =
                //         getLabels(formFields, labelOverRide, `${obj}.${name}`) ||
                //         getLabels(formFields, labelOverRide, name);
                //     if (label) {
                //         sheetData.push({
                //             key: label,
                //             value:
                //                 moment(values).isValid() && isNaN(values) ? moment(values).format('DD-MM-YYYY') : values,
                //             position
                //         });
                //     }
                // }
            }
            if (Array.isArray(valuesOfObj)) {
                for (const [m, item] of valuesOfObj.entries()) {
                    if (_.has(item, 'uid') && _.has(item, 'url') && attachmentArray.includes(obj)) {
                        attachments.push({
                            key:
                                `${labelOverRide[obj] ? labelOverRide[obj] : obj.split(' ').join('-')}_` +
                                item.url.split('/').pop(),
                            url: item.url
                        });
                    } else {
                        _.mapKeys(item, function arrayDataInnerMap(x, y) {
                            if (Array.isArray(x)) {
                                for (const [n, val] of x.entries()) {
                                    _.mapKeys(val, function innerArrayDataInnerMap(a, b) {
                                        dataMapper(a, b, val, `${y}.${b}`, `${m}${n}`);
                                    });
                                }
                            } else {
                                dataMapper(x, y, item, `${obj}.${y}`, `${m}`);
                            }
                        });
                        // if (sheetData.length > 0 && valuesOfObj.indexOf(item) == 0) {
                        //     sheetData.push({
                        //         key: '',
                        //         value: ''
                        //     });
                        // }
                        // for (const index in item) {
                        //     let values = item[index];
                        //     let { label, position } =
                        //         getLabels(formFields, labelOverRide, `${obj}.${index}`) ||
                        //         getLabels(formFields, labelOverRide, index);
                        //     if (label) {
                        //         sheetData.push({
                        //             key: label,
                        //             value:
                        //                 moment(values).isValid() && isNaN(values)
                        //                     ? moment(values).format('DD-MM-YYYY')
                        //                     : values,
                        //             position
                        //         });
                        //     }
                        // }
                        // sheetData.push({
                        //     key: '',
                        //     value: ''
                        // });
                    }
                }
            }
        });

        if (sheetData.length > 0) {
            sheetData = _.orderBy(sheetData, ['position'], ['asc']);
            for (const data of sheetData) {
                if (data.position) delete data.position;
            }
        }

        return {
            name: convertArtifacts(tab.tabName, artifacts),
            data: sheetData,
            columns: [{ label: 'Label', value: 'key' }, { label: 'Value', value: 'value' }]
        };
    });

    const sheetDatam = new ExcelWorkbook().getExcelData(sheets.filter(sheet => sheet.data.length > 0));

    const fileDataMap = [];

    for (let attachment of attachments) {
        const fileSource = await readFile({
            url: attachment.url,
            bucketNameProp: bucketName,
            api
        });
        fileDataMap.push({ name: attachment.key, source: fileSource });
    }

    const zip = new JSZip();
    zip.file(`${excelFileName.split(' ').join('-')}.xlsx`, sheetDatam);
    if (fileDataMap.length > 0) {
        for (let file of fileDataMap) {
            zip.file(file.name, file.source);
        }
    }

    zip.generateAsync({ type: 'blob' }).then(function(content) {
        saveAs(content, `${zipName.split(' ').join('-')}.zip`);
    });
};
