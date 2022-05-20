import _ from 'lodash';
import { DATA_SAVE_ACTION } from '../../../../../UILibrary/constants/commonConstant';
import { STEP_ACTION_DATA_CHANGE } from '../../../../workflows/constants/workflowConstant';
import { DOCUMENT_NAME } from '../constants';

export const OnFormDataChangeHook = {
    whenFormDataChange: (formData, dataset, handleChangeDataset,props) => {

        //when the user upload a file 
        if(Object.entries(formData).length && _.has(formData,'uploadFma') && (dataset.formData && (_.get(dataset.formData,'uploadFma',null) !== _.get(formData,'uploadFma',null)))){
            const formSubmit=_.get(props,'handleFormSubmit',null)

            if(formSubmit){
                formSubmit(DATA_SAVE_ACTION,{formData:formData},() => {
                },
                null,true)
            }
        }
        const url = formData['uploadFma'];
        const _dataset = _.cloneDeep(dataset);
        _.set(_dataset, `documents.${DOCUMENT_NAME}.url`, url);
        _.set(_dataset, `formData.subDocTypeKey`, `${DOCUMENT_NAME}_fmaAttachment6`);
        handleChangeDataset(_dataset);
    }
};
