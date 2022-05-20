import config from 'appConfig';
import axios from 'axios';
import moment from 'moment';

import BrowserStorage from './storage';
import store from '../redux/store';
import { getError } from '../helpers/apiHelper';

import { updateLoggedUser } from '../containers/layout/actions';

const storage = BrowserStorage.getInstance();
const { domains, prefix, apiVersion } = config.api;
const { multiClient: multiClientDomain } = domains;
const { multiClient: multiClientVersion } = apiVersion;

const getIdToken = () => {
    const sessionUser = storage.getUserSession();
    if (sessionUser !== null) {
        const { jwtToken } = sessionUser.loggedUser;
        return { Authorization: jwtToken };
    }

    return null;
};

const renewToken = async () => {
    const { data, loggedUser } = storage.getUserSession();
    const { idToken, accessToken, refreshToken } = data;

    try {
        let result = await fetch('https://cognito-idp.eu-west-2.amazonaws.com/', {
            headers: {
                'X-Amz-Target': 'AWSCognitoIdentityProviderService.InitiateAuth',
                'Content-Type': 'application/x-amz-json-1.1'
            },
            mode: 'cors',
            cache: 'no-cache',
            method: 'POST',
            body: JSON.stringify({
                ClientId: accessToken.payload.client_id,
                AuthFlow: 'REFRESH_TOKEN_AUTH',
                AuthParameters: {
                    REFRESH_TOKEN: refreshToken.token
                }
            })
        }).then(data => data.json());

        if (result.AuthenticationResult) {
            const { AccessToken, IdToken, ExpiresIn } = result.AuthenticationResult;
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

            return session;
        } else {
            getError({ error: { response: { data: { message: 'The incoming token has expired' } } } });
        }

        return null;
    } catch (error) {
        // console.log(error);
    }
};

axios.interceptors.request.use(
    async function(config) {
        const session = storage.getUserSession();
        if (!session) return config;

        const { loggedUser } = session;
        if (!loggedUser) return config;

        const now = moment().format('YYYY-MM-DD HH:mm');
        const expMoment = loggedUser.expMoment;

        if (moment(now).isAfter(expMoment)) {
            const _session = await renewToken();
            if (_session) config.headers.Authorization = _session.loggedUser.jwtToken;
        }

        return config;
    },
    function(error) {
        // console.log(error);
        return Promise.reject(error);
    }
);

const graphQlRequest = schema => {
    const url = `${multiClientDomain}${prefix}/query`;
    return axios.post(url, { query: schema });
};

const multiClientApi = {
    // getMultiClientWorkflows: () => {
    //   return axios.post(`${multiClientDomain}${prefix}${multiClientVersion}/multiClientWorkflow/workflows`, {
    //       headers: getIdToken()
    //     }
    //   );
    // },
    getMultiClientWorkflows: () => {
        return axios.get(`${multiClientDomain}${prefix}${multiClientVersion}/mlc/workflows`, {
            headers: getIdToken()
        });
    },
    getWorkFlowData: data => {
        let payload = data.payload;
        return axios.post(
            `${multiClientDomain}${prefix}${multiClientVersion}/mlc/workflow/data`,
            { ...payload },
            { headers: getIdToken() }
        );
    },
    approveReject: data => {
        let payload = data.payload;
        return axios.post(
            `${multiClientDomain}${prefix}${multiClientVersion}/mlc/workflow/authorization`,
            { ...payload },
            { headers: getIdToken() }
        );
    },
    getApproveReject: data => {
        let payload = data.payload;
        return axios.post(
            `${multiClientDomain}${prefix}${multiClientVersion}/mlc/workflow/getAuthorization`,
            { ...payload },
            { headers: getIdToken() }
        );
    },
    saveData: action => {
        let { payload } = action;
        let url = `${multiClientDomain}${prefix}${multiClientVersion}/mlc/workflow/upload`;
        return axios.post(url, { ...payload }, { headers: getIdToken() });
    },
    draftData: action => {
        let { payload } = action;
        let url = `${multiClientDomain}${prefix}${multiClientVersion}/mlc/workflow/draft`;
        return axios.post(url, { ...payload }, { headers: getIdToken() });
    },
    publishSchemes: action => {
        let { payload } = action;
        let url = `${multiClientDomain}${prefix}${multiClientVersion}/mlc/workflow/publish`;
        return axios.post(url, { ...payload }, { headers: getIdToken() });
    },
    abortWorkflow: action => {
        let { payload } = action;
        return axios.delete(`${multiClientDomain}${prefix}${multiClientVersion}/mlc/workflow`, {
            data: payload,
            headers: getIdToken()
        });
    },
    updateAssignUserMcl: action => {
        let { payload } = action;
        let url = `${multiClientDomain}${prefix}${multiClientVersion}/mlc/workflow/workflow-user`;
        return axios.post(url, { ...payload }, { headers: getIdToken() });
    }
};

export default multiClientApi;
