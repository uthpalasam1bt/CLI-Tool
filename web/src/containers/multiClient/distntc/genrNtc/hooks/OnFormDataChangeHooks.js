import _ from 'lodash';
import { DATA_SAVE_ACTION } from '../../../../../UILibrary/constants/commonConstant';
import { DOCUMENT_NAME } from '../constants';

export const OnFormDataChangeHook = {
    whenFormDataChange: (formData, dataset, handleChangeDataset,props) => {

        //when the user upload a file 
        if(Object.entries(formData).length && _.has(formData,'uploadNotice') && (dataset.formData && (_.get(dataset.formData,'uploadNotice',null) !== _.get(formData,'uploadNotice',null)))){
            const formSubmit=_.get(props,'handleFormSubmit',null)

            if(formSubmit){
                formSubmit(DATA_SAVE_ACTION,{formData:formData},() => {
                },
                null,true)
            }
        }
        
        const url = formData['uploadNotice'];
        const _dataset = _.cloneDeep(dataset);
        _.set(_dataset, `documents.${DOCUMENT_NAME}.url`, url);
        handleChangeDataset(_dataset);
    }
};
