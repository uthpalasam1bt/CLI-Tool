import Store from '../redux/store';
import { getLoggedUserClaims_data } from '../containers/schemeOptions/userManagement/selector';
import { commonUserClaims } from '../containers/dashboard/UserManagement/selector';
import _ from 'lodash';

class ClaimHelper {
    static getPermission(loggedUserClaims = [], claimsObject = {}, claimDescription) {
        // console.log('loggedUserClaims..........', loggedUserClaims);
        // console.log('claimsObject..........', claimsObject);
        // console.log('claimDescription..........', claimDescription);
        if (loggedUserClaims && loggedUserClaims.length && claimsObject && claimDescription) {
            if (Object.entries(claimsObject.claims) == 0) return true;
            if (!_.has(claimsObject, `claims.${claimDescription}`)) return true;

            return loggedUserClaims.includes(claimsObject.claims[claimDescription]);
        } else {
            return false;
        }
        // return true;
    }

    /* 
  PARAMS 
  claimId: claim to be checked
  
  RETURNS
  bool: user has the claim or not
  */
    static checkIfUserHasClaim(claimId) {
        const storeItems = Store.getState();
        const loggedUserClaims = getLoggedUserClaims_data()(storeItems) || [];

        return loggedUserClaims.includes(claimId);

        //return true;
    }

    static checkIfAdminUserHasCommonClaim(claimId) {
        const storeItems = Store.getState();
        const loggedUserClaims = commonUserClaims(storeItems) || [];

        return loggedUserClaims.includes(claimId);
    }
}

export default ClaimHelper;
