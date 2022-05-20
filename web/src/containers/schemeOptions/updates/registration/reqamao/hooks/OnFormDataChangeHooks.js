import _ from 'lodash';
import { change } from 'redux-form';
import store from '../../../../../../redux/store';
import { ADMINISTRATION_FORM_SECTION, FORM_NAME } from '../constants';

export const OnFormDataChangeHook = {
    whenFormDataChange: (formData, dataset, handleChangeDataset) => {
        const tabData = formData[ADMINISTRATION_FORM_SECTION.KEY];
        const trusteeEntities = _.get(tabData, 'trusteeEntities', []);
        const certiOfIncorpField = _.get(tabData, 'certificateOfIncorporation', []);

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
                let _dataset = _.cloneDeep(dataset);

                // only corp. entities with qniue names will display in signatories tab
                const corpEntitiesWithUniqueNames = corpEntitiesWithTrustees.filter(
                    (v, i, a) => a.findIndex(t => t.entityName === v.entityName) === i
                );
                // setting userpool
                _.setWith(_dataset, '[userPool][signatories][FMA][client]', corpEntitiesWithUniqueNames, Object);

                /**
                 * updating signatories based on userpool
                 * if trustee removed from userpool, that also need to remove from signatories
                 */
                let signatoryEntities = _.get(_dataset, 'signatories.FMA.client', []);

                for (const [x, signatoryEntity] of signatoryEntities.entries()) {
                    const isExistEntity= corpEntitiesWithUniqueNames.find((copEntity)=> copEntity.entityName === _.get(signatoryEntity,'entityName',null) );

                    if(isExistEntity){
                        const entityTrustees = _.get(signatoryEntity, 'trustees', []);
                        for (const [y, trustee] of entityTrustees.entries()) {
                            const matchedEntity = corpEntitiesWithUniqueNames.find(
                                entity => entity.entityName === signatoryEntity.entityName
                            );
                            const matchedTrusteeIdx = _.get(matchedEntity, 'trustees', []).findIndex(
                                usr => usr.email == trustee.email
                            );
                            if (matchedTrusteeIdx === -1) {
                                entityTrustees.splice(y, 1);
                                signatoryEntity.trustees = entityTrustees;

                                if (_.get(signatoryEntity, 'trustees', []).length == 0) {
                                    signatoryEntities.splice(x, 1);
                                }
                            }
                        }
                    }else{
                        signatoryEntities.splice(x, 1);
                    }
                }

                // setting updated signatories
                _.setWith(_dataset, '[signatories][FMA][client]', signatoryEntities, Object);
                _.setWith(_dataset, '[signatories][PMCProposal][client]', signatoryEntities, Object);

                // update userpool/ signatories in dataset
                handleChangeDataset(_dataset);
            } else {
                let _dataset = _.cloneDeep(dataset);
                _.setWith(_dataset, '[userPool]', {}, Object);
                _.setWith(_dataset, '[signatories]', {}, Object);
                handleChangeDataset(_dataset);

                // deleting values in certificateOfIncorporation field
                if (Array.isArray(certiOfIncorpField) && certiOfIncorpField.length > 0) {
                    store.dispatch(
                        change(FORM_NAME, `${ADMINISTRATION_FORM_SECTION.KEY}.certificateOfIncorporation`, null)
                    );
                }
            }
        } else {
            let _dataset = _.cloneDeep(dataset);
            _.setWith(_dataset, '[userPool]', {}, Object);
            _.setWith(_dataset, '[signatories]', {}, Object);
            handleChangeDataset(_dataset);

            // deleting values in certificateOfIncorporation field
            if (Array.isArray(certiOfIncorpField) && certiOfIncorpField.length > 0) {
                store.dispatch(
                    change(FORM_NAME, `${ADMINISTRATION_FORM_SECTION.KEY}.certificateOfIncorporation`, null)
                );
            }
        }
    }
};
