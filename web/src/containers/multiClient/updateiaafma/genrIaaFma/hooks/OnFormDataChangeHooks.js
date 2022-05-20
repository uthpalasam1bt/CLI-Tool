import _ from 'lodash';
import { DATA_SAVE_ACTION } from '../../../../../UILibrary/constants/commonConstant';
import { STEP_ACTION_DATA_CHANGE } from '../../../../workflows/constants/workflowConstant';
import { FORM_FIELD_NAMES } from '../constants';
import {DOCUMENT_NAME} from "../../../cngfmfees/genrFmFee/constants";

export const OnFormDataChangeHook = {
    whenFormDataChange: (formData, dataset, handleChangeDataset,props) => {

        const radioBtn=_.get(props,'simpleFormData.radio','');
        const subTypeIAA=_.get(props,'simpleFormData.fileTypeIAA','');
        const subTypeFMA=_.get(props,'simpleFormData.fileTypeFMA','');
        let subDocTypeKey;
        if(radioBtn==='IAA_DOC'){ subDocTypeKey=`IAA_${subTypeIAA}`; }
        else if(radioBtn==='FMA_DOC'){subDocTypeKey=`FMA_${subTypeFMA}`;}
        else{subDocTypeKey=``;}

        //when the user upload a file
        if(Object.entries(formData).length && (_.has(formData,FORM_FIELD_NAMES.DOC_NAME_IMA) && (dataset.formData && (_.get(dataset.formData,FORM_FIELD_NAMES.DOC_NAME_IMA,null) !== _.get(formData,FORM_FIELD_NAMES.DOC_NAME_IMA,null)))) || 
        (_.has(formData,FORM_FIELD_NAMES.DOC_NAME_IAA) && (dataset.formData && (_.get(dataset.formData,FORM_FIELD_NAMES.DOC_NAME_IAA,null) !== _.get(formData,FORM_FIELD_NAMES.DOC_NAME_IAA,null))))
        ){
            const formSubmit=_.get(props,'handleFormSubmit',null)

            if(formSubmit){
                formSubmit(STEP_ACTION_DATA_CHANGE,{
                    formData:{
                        ...formData
                }},() => {
                },
                null,true)
            }
        }

        const urlFMA = formData[FORM_FIELD_NAMES.DOC_NAME_IMA];
        const urlIAA = formData[FORM_FIELD_NAMES.DOC_NAME_IAA];

        const _dataset = _.cloneDeep(dataset);

        // if (urlFMA || urlIAA) {
        //     _.set(_dataset, `documents.${'FMA'}.url`, urlFMA);
        //     _.set(_dataset, `documents.${'IAA'}.url`, urlIAA);

        //     handleChangeDataset(_dataset);
        // }
        
        if (!_.isUndefined(urlFMA) || !_.isUndefined(urlIAA)) {
            _.set(_dataset,'formData',formData)
            _.set(_dataset, `formData.subDocTypeKey`, subDocTypeKey);
            _.set(_dataset, `documents.${'FMA'}.url`, urlFMA);
            _.set(_dataset, `documents.${'IAA'}.url`, urlIAA);
           // _.set(_dataset, `formData.subDocTypeKey`, `${DOCUMENT_NAME}_fmaAttachment6`);
            handleChangeDataset(_dataset);
        }
    }
};
