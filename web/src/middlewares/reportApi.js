import config from 'appConfig';
import axios from 'axios';
import moment from 'moment';

import BrowserStorage from './storage';
import store from '../redux/store';
// axios.defaults.withCredentials = true;
import { getError } from '../helpers/apiHelper';

import { updateLoggedUser } from '../containers/layout/actions';

const storage = BrowserStorage.getInstance();
const { domains, prefix, apiVersion } = config.api;
const { reports: reportsDomains } = domains;
const { reports: reportsVersion } = apiVersion;


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

const reportApi = {
    //new apis-2022
    getReportTypes: () => {
        const url = `${reportsDomains}${prefix}${reportsVersion}/report-meta-data`;
        return axios.get(url, {
            headers: getIdToken()
        });
    },

    getUploadReportTypeData: data => {
        let url;
        console.log('report info ', data);
        if (data) {
            url = `${reportsDomains}${prefix}${reportsVersion}/report-upload-step-data?reportType=${data.reportType}&startDate=${data.startDate}&endDate=${data.endDate}&tabId=${data.tabId}`;
        }
        if (url) {
            return axios.get(url, {
                headers: getIdToken()
            });
        } else {
            return [];
        }
    },
  
    getReportUploadUrl: data => {
        let url;
        if (data && data.entityId && data.reportType) {
            url = `${reportsDomains}${prefix}${reportsVersion}/report-upload-url?entityId=${data.entityId}&reportType=${
                data.reportType
            }&startDate=${data.startDate}&endDate=${data.endDate}&reportId=${data.reportId ? data.reportId : null}`;
        }

        return axios.get(url, {
            headers: getIdToken()
        });
    },
    updateReportStepData: data => {
        const url = `${reportsDomains}${prefix}${reportsVersion}/report-action`;
        return axios.post(url, data, {
            headers: getIdToken()
        });
    },
    getStepReportData: data => {
        const url = `${reportsDomains}${prefix}${reportsVersion}/report/rp-step/${data}`;
        return axios.get(url, {
            headers: getIdToken()
        });
    },
    generateReportValidation:data=>{
        const url=`${reportsDomains}${prefix}${reportsVersion}/generated-report-validation`
        return axios.post(url,data,{
            headers: getIdToken()
        })
    },
    generateReport:(data)=>{
        const url=`${reportsDomains}${prefix}${reportsVersion}/generate-report`
        return axios.post(url,data,{
            headers: getIdToken()
        })
    }

};

export default reportApi;
