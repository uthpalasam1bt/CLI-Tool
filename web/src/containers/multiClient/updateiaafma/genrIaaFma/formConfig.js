import React from 'react';
import { FORM_FIELDSS, FORM_FIELD_LABELS, FORM_FIELD_NAMES } from './constants';
import connectApi from '../../../../middlewares/connectApi';
import constants from '../../../../UILibrary/constants';
import config from 'appConfig';
import _ from 'lodash';
import NotificationHelper from '../../../../UILibrary/helpers/NotificationHelper';
import { ON_CONTINUE_UPLOAD_MESSAGE } from '../../../workflows/constants/workflowConstant';

const { FORM_TEMPLATES, FORM_FIELDS, UPLOAD_FILE_TYPES } = constants;
const { PDF } = UPLOAD_FILE_TYPES;
const { FILE_UPLOADER, DATE_PICKER, SELECT_OPTION } = FORM_FIELDS;
const { FULL_CONTAINER, ROW } = FORM_TEMPLATES;

const { multiClient } = config.uploads;

export const formFields = props => {
    const { step } = props;
    return [
        {
            radioButtonName: FORM_FIELD_NAMES.DOC_NAME_IAA,
            label: FORM_FIELD_LABELS.IAA,
            disabled: _.get(props, 'step.completed', false),
            selectOptionField: {
                fieldName: FORM_FIELD_NAMES.FILETYPE_IAA,
                options: {
                    defaultValue: 'iaaAttachment1',
                    dataList: [
                        { key: 'iaaAttachment1', value: 'IAA Attachment 1' },
                        { key: 'iaaAttachment2', value: 'IAA Attachment 2' },
                        { key: 'iaaAttachment3', value: 'IAA Attachment 3' },
                        { key: 'iaaAttachment4', value: 'IAA Attachment 4' }
                    ],
                    className: 'select-width mr-3'
                },
                disabled: _.get(props, 'step.completed', false)
            },
            uploadField: {
                fieldName: FORM_FIELD_NAMES.DOC_NAME_IAA,
                options: {
                    accept: [PDF],
                    url: multiClient.generateIAA,
                    params: [step.stepKey]
                },
                generate: false,
                onChange: e => {},
                disabled: _.get(props, 'step.completed', false),
                uploadSuccessCallback:()=>{ NotificationHelper.getInstance().success(ON_CONTINUE_UPLOAD_MESSAGE) }
            }
        },

        {
            radioButtonName: FORM_FIELD_NAMES.DOC_NAME_IMA,
            label: FORM_FIELD_LABELS.IMA,
            disabled: _.get(props, 'step.completed', false),
            selectOptionField: {
                fieldName: FORM_FIELD_NAMES.FILETYPE_FMA,
                options: {
                    defaultValue: 'fmaAttachment4',
                    dataList: [
                        { key: 'fmaAttachment4', value: 'IMA Attachment 4' },
                        { key: 'fmaAttachment5', value: 'IMA Attachment 5' },
                        { key: 'fmaRiskDisClosuers', value: 'IMA Risk Disclosures' }
                    ],
                    className: 'select-width mr-3'
                },
                disabled: _.get(props, 'step.completed', false)
            },
            uploadField: {
                fieldName: FORM_FIELD_NAMES.DOC_NAME_IMA,
                options: {
                    accept: [PDF],
                    url: multiClient.generateFMA,
                    params: [_.get(props, 'step.stepKey')]
                },
                generate: false,
                onChange: e => {},
                disabled: _.get(props, 'step.completed', false),
                uploadSuccessCallback:()=>{ NotificationHelper.getInstance().success(ON_CONTINUE_UPLOAD_MESSAGE) }
            }
        }
    ];
};
