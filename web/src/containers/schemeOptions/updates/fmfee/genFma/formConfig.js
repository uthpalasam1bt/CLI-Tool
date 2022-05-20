/* 
This is a functional configuration for creating a form which contains upload generate fields.
Developers can pass this configuration to the tabs configuration  as a formFieldFunction property 

*/
import React from 'react';
import { required } from 'redux-form-validators'; // required validator
import _ from 'lodash';

import { UPLOAD_FILE_TYPES } from '../../../../../UILibrary/constants/fileUploaderConstants';
import { STATUS_DOCUMENT_UPLOAD_PROCESSED } from '../../../../workflows/constants/workflowConstant';
import PDFViewer from '../../../../../components/scheme/registration/PDFViewer';
import { documentGenConstant } from '../../../../../config/constants';
import constants from '../../../../../UILibrary/constants';
import { DOC_NAMES } from './constants';
const { FORM_TEMPLATES } = constants;
const { ROW } = FORM_TEMPLATES;
const { PDF } = UPLOAD_FILE_TYPES; // document types allowed to upload

export const formFields = props => {
    const doc_url = _.get(props, 'dataset.documents.FMA.url', null);
    const FMAdocumentStatus = _.get(props, 'data.documents.FMA.documentStatus', null);
    return [
        {
            label: 'Generate $ima$', //label to display in the form
            field: {
                name: DOC_NAMES.FMA, // a name to the  form
                options: {
                    accept: [PDF], // can specify what are the types of document  that the  user allowed to upload
                    isPublic: false // specifyingto upload the document to the public bucket or the private bucket
                },
                validate: [required({ message: 'Required' })], // validate the field to be required
                disabled: FMAdocumentStatus === STATUS_DOCUMENT_UPLOAD_PROCESSED, // boolean value to disable the field and not allowing to upload a document
                disableduploadonly: doc_url ? true : false,
                generate: true, // boolean value to enable the generate option
                isMultiple: false, // to determine whether the user can upload a single document or multiple documents
                generateoptions: {
                    // ***at the moment file generation not working***
                    // contains the configuration for generate document
                    step: _.get(props, 'step.stepKey', null),
                    flowKey: props.workflowKey,
                    tenant: documentGenConstant.TENENT,
                    schemeId: _.get(props, 'entityId', null),
                    docName: documentGenConstant.IMA,
                    disabled: FMAdocumentStatus === STATUS_DOCUMENT_UPLOAD_PROCESSED,
                    templateKey: documentGenConstant.FMA,
                    userId: _.get(props, `loggedUser.${'custom:userId'}`, null),
                    time: 12,
                    signatories: _.get(props, 'dataset.signatories', {})
                }
            }
        },
        ...(doc_url
            ? [
                  {
                      type: ROW,
                      rawComponent: (
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
