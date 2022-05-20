import { FUNDING_FORM_SECTION, DEFICIT_CONTRIBUTION } from './constants';
import constants from '../../../../../UILibrary/constants';
import config from 'appConfig';
import connectApi from '../../../../../middlewares/connectApi';

const { FORM_TEMPLATES, FORM_FIELDS } = constants;
const { BUTTON_GROUP, SELECT_OPTION, FILE_DOWNLOADER, FILE_UPLOADER, DEFICIT_CONTRIBUTION_SECTION } = FORM_FIELDS;
const { FULL_CONTAINER, FULL_VIEW_CONTAINER } = FORM_TEMPLATES;
const {
    WANT_US_TO_UPLOAD_DCES,
    TEMPLATE_DOWNLOAD,
    DCFS_ATTACHMENT,
    WANT_US_TO_MODEL_DC
} = FUNDING_FORM_SECTION.FIELD_KEYS;
const { bucket: privateBucket } = config;
const { deficitContribution } = config.templates;
const { dc } = config.uploads;

const YESNOBUTTONOPTION = [{ title: 'Yes', value: 'yes' }, { title: 'No', value: 'no' }];

export const formFields = props => {
    return [
        {
            type: FULL_CONTAINER,
            label: DEFICIT_CONTRIBUTION.MODEL_DEFICIT,
            bool: true,
            field: {
                __order: 'a',
                name: WANT_US_TO_MODEL_DC,
                className: 'form-control',
                component: BUTTON_GROUP,
                options: YESNOBUTTONOPTION,

                validationModules: [{ moduleName: 'RequiredValidate' }]
            },
            when: [
                {
                    bool: props[WANT_US_TO_MODEL_DC] === 'yes', // When this condition become true functional configurations in side of the childComponent array will be display
                    childComponents: [
                        {
                            type: FULL_CONTAINER,
                            bool: props[WANT_US_TO_MODEL_DC] === 'yes',
                            label: DEFICIT_CONTRIBUTION.UPLOAD_LABEL,
                            iIcon: DEFICIT_CONTRIBUTION.UPLOAD_LABEL_iIcon,
                            field: [
                                {
                                    __order: 'b',
                                    name: WANT_US_TO_UPLOAD_DCES,
                                    className: 'form-control',
                                    bool: props[WANT_US_TO_MODEL_DC] === 'yes',
                                    component: SELECT_OPTION,
                                    options: {
                                        defaultValue: 'Select',
                                        name: 'deficit-dropdown',
                                        dataList: [
                                            { value: 'On Screen', key: 'onScreen' },
                                            { value: 'Upload File', key: 'uploadFile' }
                                        ]
                                    },
                                    validationModules: [{ moduleName: 'RequiredValidate' }]
                                },
                                {
                                    className: 'form-control',
                                    name: TEMPLATE_DOWNLOAD,
                                    component: FILE_DOWNLOADER,
                                    bool: props[WANT_US_TO_MODEL_DC] === 'yes',
                                    disabled:
                                        props[WANT_US_TO_UPLOAD_DCES] === undefined ||
                                        props[WANT_US_TO_UPLOAD_DCES] === 'onScreen' ||
                                        props[WANT_US_TO_UPLOAD_DCES] === '',
                                    url: deficitContribution,
                                    fileName: 'deficit-contributions.xlsx',
                                    bucketNameProp: privateBucket,
                                    api: connectApi
                                }
                            ],
                            when: [
                                {
                                    bool: props[WANT_US_TO_UPLOAD_DCES] === 'onScreen',
                                    childComponents: [
                                        {
                                            type: FULL_VIEW_CONTAINER, //  form template type
                                            bool: props[WANT_US_TO_UPLOAD_DCES] === 'onScreen',
                                            label: '',
                                            field: {
                                                __order: 'c',
                                                name: DEFICIT_CONTRIBUTION.SCREEN_DEFICIT,
                                                className: 'form-control',
                                                component: DEFICIT_CONTRIBUTION_SECTION //component that use in the field
                                            }
                                        }
                                    ]
                                },
                                {
                                    bool: props[WANT_US_TO_UPLOAD_DCES] === 'uploadFile',
                                    childComponents: [
                                        {
                                            type: FULL_CONTAINER,
                                            label: DEFICIT_CONTRIBUTION.UPLOAD_FILE_LABEL,
                                            iIcon: DEFICIT_CONTRIBUTION.UPLOAD_FILE_LABEL_iICON,
                                            bool: props[WANT_US_TO_UPLOAD_DCES] === 'uploadFile',
                                            field: {
                                                __order: 'd',
                                                name: DCFS_ATTACHMENT,
                                                className: 'form-control',
                                                component: FILE_UPLOADER,
                                                options: {
                                                    accept: ['.xlsx'],
                                                    manual: true,
                                                    params: [props.schemeId],
                                                    url: dc.generateDC,
                                                    bucketName: privateBucket,
                                                    api: connectApi
                                                },
                                                validationModules: [
                                                    { moduleName: 'RequiredValidate', options: { message: 'Required' } }
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
    ];
};
