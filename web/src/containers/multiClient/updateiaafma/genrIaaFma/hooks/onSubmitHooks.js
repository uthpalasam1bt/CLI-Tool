import React from 'react';
import _ from 'lodash';
import { DOC_TYPES, FORM_FIELD_NAMES } from '../constants';

export const OnSubmitHook = {
    whenSubmitDataFormat: (formData, props) => {
        const data = _.cloneDeep(formData);

        if (data) {
            let docType;
            let uploadedDocument;
            let IAADOC
            let FMADOC
            let selectedDocType = _.get(data, 'radio', null);
       
            if (_.has(data, selectedDocType)) {
                uploadedDocument = _.get(data, selectedDocType);
            }
            if(_.has(data,FORM_FIELD_NAMES.DOC_NAME_IAA)){
                IAADOC=_.get(data,FORM_FIELD_NAMES.DOC_NAME_IAA)
            }
            if(_.has(data,FORM_FIELD_NAMES.DOC_NAME_IMA)){
                FMADOC=_.get(data,FORM_FIELD_NAMES.DOC_NAME_IMA)
            }


            if(selectedDocType){
                return { ...data, docType,selectedDocType,uploadedDocument, 
                    'IAA':IAADOC ? [{'url':IAADOC}]:[],
                    'FMA':FMADOC ? [{'url':FMADOC}]:[]
                 };

            }else{
                return data
            }
        }
    },

    whenSubmitValidation: (formData, asyncErr, dataset) => {
        const errors = {};
        if (formData) {
            let selectedDocType = _.get(formData, 'radio', null);
            if (!selectedDocType) {
                _.set(errors, 'message', 'select a document');
            }
            if (!_.has(formData, `${selectedDocType}`) || !_.get(formData,selectedDocType,null)) {
                _.set(errors, 'message', 'Please upload Document to proceed to document approval.');
            }
            return errors;
        }
    }
};
