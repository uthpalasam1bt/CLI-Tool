/* 
     This is the functional configuration for creating simple forms
     In this approach developers can pass javaScript Objects as configuration parameters.
     Inside this configuration we can specify the form labels and respective form fields to display in the form

 */
import React from 'react';
import { Divider } from 'antd';
import _ from 'lodash';

import { TOGGLEBUTTONGROUP, ENTERVALUE } from './constants';
import constants from '../../../../../UILibrary/constants';
import config from 'appConfig';
import PDFViewer from '../../../../../components/scheme/registration/PDFViewer';

const { FORM_TEMPLATES, FORM_FIELDS, UPLOAD_FILE_TYPES } = constants;
const { PDF } = UPLOAD_FILE_TYPES; // document types allowed to upload
const {
    INPUT_FIELD,
    DATE_PICKER,
    CURRENCY_FIELD,
    FILE_UPLOADER,
    NUMBER_FIELD,
    MULTIPLE_FILE_UPLOADER,
    BUTTON_GROUP
} = FORM_FIELDS;
const { FULL_CONTAINER, HALF_CONTAINER, ROW } = FORM_TEMPLATES;
const { bucket: privateBucket } = config;
const YESNOBUTTONOPTION = [{ title: 'Yes', value: 'yes' }, { title: 'No', value: 'no' }];

const { riaa } = config.uploads;
/* Form Templates
     
           FULL_CONTAINER - Include one label and one field
           HALF_CONTAINER - Divides a row into two columns, each column contains a label and a field
           FULL_VIEW_CONTAINER -  It gives full width to display a raw component
     */

export const formFields = props => {
    const doc_url = _.get(props, 'dataset.documents.ConsultationSponsor.url');
    return [
        {
            type: FULL_CONTAINER,
            label: 'Has the sponsor been consulted?',
            bool: true,
            field: {
                // __order: 'f',
                name: 'hasSponsorBeenConsulted',
                className: 'form-control',
                component: BUTTON_GROUP,
                options: YESNOBUTTONOPTION,

                // validationModules: [{ moduleName: 'RequiredValidate' }]
            }
        },
        ...(doc_url
            ? [
                  {
                      type: ROW,
                      rawComponents: (
                          <div className="doc-preview-container">
                              <div>
                                  <PDFViewer documentURL={doc_url} />
                              </div>
                          </div>
                      )
                  }
              ]
            : [])
    ];
};
