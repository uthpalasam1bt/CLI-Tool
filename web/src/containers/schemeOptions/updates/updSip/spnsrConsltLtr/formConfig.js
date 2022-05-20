/* 
     This is the functional configuration for creating simple forms
     In this approach developers can pass javaScript Objects as configuration parameters.
     Inside this configuration we can specify the form labels and respective form fields to display in the form

 */
import React from 'react';
import _ from 'lodash';
import { FIELD_NAME } from './constants';
import constants from '../../../../../UILibrary/constants';
import PDFViewer from '../../../../../components/scheme/registration/PDFViewer';
const { FORM_TEMPLATES, FORM_FIELDS } = constants;
const { BUTTON_GROUP } = FORM_FIELDS;
const { FULL_CONTAINER, ROW } = FORM_TEMPLATES;
const YESNOBUTTONOPTION = [{ title: 'Yes', value: 'yes' }, { title: 'No', value: 'no' }];

export const formFields = props => {
    const docUrl = _.get(props, `dataset.documents.ConsultationSponsor.url`, null);
    return [
        {
            type: FULL_CONTAINER,
            label: FIELD_NAME.HAS_SPONSOR_CONSULTED,
            bool: true,
            field: {
                __order: 'a',
                name: FIELD_NAME.HAS_SPONSOR_CONSULTED_FIELD,
                className: 'form-control',
                component: BUTTON_GROUP,
                options: YESNOBUTTONOPTION
            }
        },

        ...(docUrl
            ? [
                  {
                      type: ROW,
                      rawComponents: (
                          <div className="doc-preview-container">
                              <div>
                                  <PDFViewer documentURL={docUrl} />
                              </div>
                          </div>
                      )
                  }
              ]
            : [])
    ];
};
