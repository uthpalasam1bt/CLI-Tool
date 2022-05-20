import _ from 'lodash';
import { change } from 'redux-form';
import store from '../../../../../../redux/store';
import { FORM_NAME } from '../constants';
// IAA_FORM_SECTION

export const OnFormDataChangeHook = {
    whenFormDataChange: (formData, dataset, handleChangeDataset) => {
        // const tabData = formData[IAA_FORM_SECTION.KEY];
        const trusteeEntities = _.get(formData, 'trusteeEntities', []);
        const certiOfIncorpField = _.get(formData, 'certificateOfIncorporation', []);

        if (trusteeEntities.length > 0) {
            const corpEntities = trusteeEntities.filter(x => x && x.trusteeEntityType == 'CORPORATE');

            const corpEntitiesWithTrustees = corpEntities.filter(
                entity =>
                    entity &&
                    entity.entityName &&
                    entity.entityName.length &&
                    Array.isArray(entity.trustees) &&
                    entity.trustees.length > 0
            );

            if (corpEntitiesWithTrustees.length > 0) {
            } else {
                // deleting values in certificateOfIncorporation field
                if (Array.isArray(certiOfIncorpField) && certiOfIncorpField.length > 0) {
                    store.dispatch(change(FORM_NAME, `certificateOfIncorporation`, null));
                }
            }
        } else {
            // deleting values in certificateOfIncorporation field
            if (Array.isArray(certiOfIncorpField) && certiOfIncorpField.length > 0) {
                store.dispatch(change(FORM_NAME, `certificateOfIncorporation`, null));
            }
        }
    }
};
