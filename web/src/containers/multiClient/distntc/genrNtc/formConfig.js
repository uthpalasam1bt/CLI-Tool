import React from 'react';
import PDFViewer from '../../../../components/scheme/registration/PDFViewer';

import constants from '../../../../UILibrary/constants';

import connectApi from '../../../../middlewares/connectApi';
import config from 'appConfig';
import { FORM_FIELD_NAMES, FORM_FIELD_LABELS } from './constants';
import { ON_CONTINUE_UPLOAD_MESSAGE } from '../../../workflows/constants/workflowConstant';
import NotificationHelper from '../../../../UILibrary/helpers/NotificationHelper';

const { FORM_TEMPLATES, FORM_FIELDS, UPLOAD_FILE_TYPES } = constants;
const { PDF } = UPLOAD_FILE_TYPES;
const { FILE_UPLOADER, DATE_PICKER } = FORM_FIELDS;
const { FULL_CONTAINER, ROW } = FORM_TEMPLATES;
const { multiClient } = config.uploads;
const { bucket: privateBucket } = config;

export const formFields = props => {
    return [
        {
            type: FULL_CONTAINER,
            bool: true,
            label: FORM_FIELD_LABELS.NOTICE,
            field: {
                __order: 'a',
                name: FORM_FIELD_NAMES.NOTICE,
                className: 'form-control',
                component: FILE_UPLOADER,
                options: {
                    accept: [PDF],
                    url: multiClient.generateNotice,
                    bucketName: privateBucket,
                    api: connectApi,
                    // params: [props.step.stepKey]
                    params: [props.entityId]
                },
                uploadSuccessCallback:()=>{ NotificationHelper.getInstance().success(ON_CONTINUE_UPLOAD_MESSAGE) },

                validationModules: [{ moduleName: 'RequiredValidate' }]
            }
        },

        ...(props[FORM_FIELD_NAMES.NOTICE]
            ? [
                  {
                      type: ROW,
                      rawComponents: (
                          <div className="doc-preview-container">
                              <div>
                                  <PDFViewer documentURL={props[FORM_FIELD_NAMES.NOTICE]} />
                              </div>
                          </div>
                      )
                  }
              ]
            : [])
    ];
};
