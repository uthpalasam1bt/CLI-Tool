import _ from 'lodash';
import { INDIVIDUAL } from '../constants';

export const checkTrusteeAvailability = (values, allEntities) => {
    let isExistingTrustee = false;
    for (const trustee of allEntities) {
        if (!trustee || Object.entries(trustee) == 0 || !_.get(trustee, 'trusteeEntityType')) continue;
        else if (_.get(trustee, 'trusteeEntityType') != INDIVIDUAL) {
            const isExisting = _.get(trustee, 'trustees', []).find(x => x.email == values.email);
            if (isExisting) {
                isExistingTrustee = true;
                break;
            }
        } else {
            if (trustee['trustees'][0].email == values.email) {
                isExistingTrustee = true;
                break;
            }
        }
    }
    return isExistingTrustee;
};
