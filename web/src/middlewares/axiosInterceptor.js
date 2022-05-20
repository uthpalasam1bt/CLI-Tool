//interceptor for axios
import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import BrowserStorage from './storage';
import store from '../redux/store';
import { updateLoggedUser } from '../containers/layout/actions';
const moment = require('moment');

const storage = BrowserStorage.getInstance();

// Function that will be called to refresh authorization when ever request gets authorized denied
const refreshAuthLogic = failedRequest => {
    const { data } = storage.getUserSession();
    const { idToken, accessToken, refreshToken } = data;

    const url = 'https://cognito-idp.eu-west-2.amazonaws.com/';
    const options = {
        method: 'POST',
        headers: {
            'X-Amz-Target': 'AWSCognitoIdentityProviderService.InitiateAuth',
            'Content-Type': 'application/x-amz-json-1.1'
        },
        mode: 'cors',
        cache: 'no-cache',
        data: JSON.stringify({
            ClientId: accessToken.payload.client_id,
            AuthFlow: 'REFRESH_TOKEN_AUTH',
            AuthParameters: {
                REFRESH_TOKEN: refreshToken.token
            }
        }),
        url
    };
    return axios(options).then(tokenRefreshResponse => {
        const { data, loggedUser } = storage.getUserSession();
        let {
            data: {
                AuthenticationResult: { AccessToken, ExpiresIn, IdToken }
            }
        } = tokenRefreshResponse;

        const session = {
            data: {
                ...data,
                accessToken: {
                    ...accessToken,
                    jwtToken: AccessToken,
                    idToken: { ...idToken, jwtToken: IdToken }
                }
            },
            loggedUser: {
                ...loggedUser,
                jwtToken: IdToken
            }
        };

        const expMoment = moment()
            .add((+ExpiresIn - 600) / 60, 'minutes')
            .format('YYYY-MM-DD HH:mm');
        session.loggedUser.expMoment = expMoment;
        store.dispatch(updateLoggedUser(session));
        failedRequest.response.config.headers['Authorization'] = 'Bearer ' + AccessToken;
        return Promise.resolve();
    });
};

export const setTokenRenewInterceptor = axiosInstance => {
    createAuthRefreshInterceptor(axiosInstance, refreshAuthLogic, {
        statusCodes: [401, 403] // default: [ 401 ]
    });

    // const getAccessToken = () => {
    //     const sessionUser = storage.getUserSession();
    //     if (sessionUser !== null) {
    //         const { accessToken } = sessionUser.data;
    //         return accessToken.jwtToken;
    //     }
    //     return null;
    // };

    // Obtain the fresh token each time the function is called
    function getIdToken() {
        const sessionUser = storage.getUserSession();
        if (sessionUser !== null && sessionUser) {
            const { jwtToken } = sessionUser.loggedUser;
            return jwtToken;
        }
        return null;
    }

    // Use interceptor to inject the token to requests
    axiosInstance.interceptors.request.use(request => {
        // if(request.url.includes('user/logout')){
        //   if (getAccessToken() && request.headers['Authorization'])
        //     request.headers['Authorization'] = `Bearer ${getAccessToken()}`;
        // }else{
        if (getIdToken() && request.headers['Authorization'])
            request.headers['Authorization'] = `Bearer ${getIdToken()}`;
        // }
        return request;
    });
};
