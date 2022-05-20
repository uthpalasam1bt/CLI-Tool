import config from 'appConfig';
import axios from 'axios';
import moment from 'moment';

import BrowserStorage from './storage';
import { setTokenRenewInterceptor } from './axiosInterceptor';

setTokenRenewInterceptor(axios);

const storage = BrowserStorage.getInstance();
const { domains, prefix, apiVersion } = config.api;
const {
    user: userDomain,
    contactUs: contactUsDomain,
    scheme: schemeDomain,
    workflow: workflowDomain,
    utility: utilityDomain,
    notification: notificationDomain,
    dashboard: dashboardDomain,
    tasks: tasksDomain,
    documentInfo: documentInfoDomain,
    auditTrail: auditTrailDomain,
    chatBot: chatBotDomain,
    generate: generateDomain,
    analytic: analyticDomain,
    analyticManagementDomain,
    reports: reportsDomain,
    taskManager: tasksManagerDomain,
    fm: fmDomain,
    artifactName: artifactDomain
} = domains;

const {
    user: userVersion,
    contactUs: contactUsVersion,
    scheme: schemeVersion,
    workflow: workflowVersion,
    utility: utilityVersion,
    notification: notificationVersion,
    dashboard: dashboardVersion,
    tasks: tasksVersion,
    documentInfo: documentInfoVersion,
    auditTrail: auditTrailVersion,
    chatBot: chatBotVersion,
    generate: generateVersion,
    analytic: analyticVersion,
    analyticManagementDomain: analyticManagementDomainVersion,
    taskManager: taskManagerVersion,
    fm: fmVersion,
    artifactName: artifactVersion,
    reports: reportsVersion
} = apiVersion;

const getAccessToken = () => {
    const sessionUser = storage.getUserSession();
    if (sessionUser !== null) {
        const { accessToken } = sessionUser.data;
        return { Authorization: accessToken.jwtToken };
    }

    return null;
};

const appendAccessToken = () => {
    const sessionUser = storage.getUserSession();
    if (sessionUser !== null && sessionUser) {
        const { accessToken } = sessionUser.data;
        const { jwtToken } = sessionUser.loggedUser;
        return { Authorization: jwtToken, 'x-api-key': accessToken.jwtToken };
    }

    return null;
};

const getIdToken = () => {
    const sessionUser = storage.getUserSession();
    if (sessionUser !== null && sessionUser) {
        const { jwtToken } = sessionUser.loggedUser;
        return { Authorization: jwtToken };
    }

    return null;
};

const connectApi = {
    getResource: url => {
        return axios({
            url,
            method: 'GET',
            responseType: 'blob'
        });
    },

    getDownloadUrl: data => {
        return axios.post(`${fmDomain}${prefix}${fmVersion}/file-manager/fetch/signed/url`, data, {
            headers: getIdToken()
        });
    },

    getUploadUrl: data => {
        return axios.post(`${fmDomain}${prefix}${fmVersion}/file-manager/fetch/signed/put-url`, data, {
            headers: getIdToken()
        });
    },

    getDocumentConfig: payload => {
        const { schemeClassification, schemeId } = payload;
        // console.log('-- payload --', payload);
        return axios.get(
            `${fmDomain}${prefix}${fmVersion}/file-manager/documents/document-config?schemeClassification=${schemeClassification}&schemeId=${schemeId}`,
            {
                headers: getIdToken()
            }
        );
    },

    getReportConfig: payload => {
        const { schemeClassification, schemeId } = payload;
        // console.log('-- payload --', payload);
        return axios.get(
            `${reportsDomain}${prefix}${reportsVersion}/report/report-config?schemeClassification=${schemeClassification}&schemeId=${schemeId}`,
            {
                headers: getIdToken()
            }
        );
    },

    getInformationDirectoryConfigs: data => {
        const { schemeId } = data;
        return axios.get(
            `${workflowDomain}${prefix}${workflowVersion}/workflow-manager/information-directory-config/${schemeId}`,
            {
                headers: getIdToken()
            }
        );
    },
    getInformationDirectoryData: data => {
        const { schemeId } = data;
        return axios.get(`${schemeDomain}${prefix}${schemeVersion}/scheme/information-directory/${schemeId}`, {
            headers: getIdToken()
        });
    },

    downloadStatusUpdate: data => {
        const { payload } = data;
        return axios.post(
            `${utilityDomain}${prefix}${utilityVersion}/util/downloadStatusUpdate`,
            { ...payload },
            { headers: getIdToken() }
        );
    },

    updateAssignUser: data => {
        const { payload } = data;
        return axios.put(
            `${utilityDomain}${prefix}${utilityVersion}/util/workflow-user`,
            { ...payload },
            { headers: getIdToken() }
        );
    },

    updateAssignUserReg: data => {
        const { payload } = data;
        return axios.put(
            `${schemeDomain}${prefix}${schemeVersion}/scheme/workflow/assign-user`,
            { ...payload },
            { headers: getIdToken() }
        );
    },
    getAssignUser: action => {
        let {
            payload: { step, schemeId }
        } = action;
        return axios.get(`${schemeDomain}${prefix}${schemeVersion}/scheme/workflow/assign-user/${schemeId}/${step}`, {
            headers: getIdToken()
        });
    },

    uploadFile: ({ url, file }) => {
        let options = {
            headers: {
                'Content-Type': file.type
            }
        };

        // console.log(url, file, options);
        return axios.put(url, file, options);
    },

    doClearProfileImage: ({ payload }) => {
        return axios.post(
            `${userDomain}${prefix}${userVersion}/user/profile-picture`,
            { ...payload },
            { headers: getIdToken() }
        );
    },

    doSavePersonalDetails: data => {
        delete data.sendTasksEmail;

        return axios.put(`${userDomain}${prefix}${userVersion}/user`, { ...data }, { headers: getIdToken() });
    },

    doUpdatePassword: data => {
        return axios.put(
            `${userDomain}${prefix}${userVersion}/user/password`,
            { ...data },
            { headers: appendAccessToken() }
        );
    },

    getPersonalDetails: email => {
        return axios.get(`${userDomain}${prefix}${userVersion}/user/email?email=${email}`, {
            headers: getIdToken()
        });
    },

    uploadProfileImage: ({ payload }) => {
        const now = moment().format('YYYY-MM-DD HH:mm');
        return axios.put(`${userDomain}${prefix}${userVersion}/user`, { ...payload, now }, { headers: getIdToken() });
    },

    doLogin: data => {
        const { payload, fromLogin } = data;
        return axios.post(
            `${userDomain}${prefix}${userVersion}/user/verify`,
            {
                ...payload,
                fromLogin
            },
            { skipAuthRefresh: true }
        );
    },

    doLogout: data => {
        const { payload } = data;
        return axios.post(
            `${userDomain}${prefix}${userVersion}/user/logout`,
            { ...payload, accessToken: getAccessToken() },
            { headers: getIdToken() }
        );
    },

    doRegister: data => {
        const { payload } = data;
        return axios.post(`${userDomain}${prefix}${userVersion}/user/register`, { ...payload });
    },

    doConfirmUser: data => {
        const { payload } = data;
        return axios.post(`${userDomain}${prefix}${userVersion}/user/confirmation`, { ...payload });
    },

    resendUserConfirmationCode: data => {
        const { payload } = data;
        return axios.post(`${userDomain}${prefix}${userVersion}/user/confirm/resend`, { ...payload });
    },

    sendPasswordResetCode: data => {
        const { payload } = data;
        return axios.post(`${userDomain}${prefix}${userVersion}/user/forgot-password`, {
            ...payload
        });
    },

    doResetPassword: data => {
        const { payload } = data;
        return axios.post(`${userDomain}${prefix}${userVersion}/user/forgot-password/confirm`, {
            ...payload
        });
    },

    getUserName: data => {
        const { payload } = data;
        const { email } = payload;
        return axios.get(`${userDomain}${prefix}${userVersion}/user/name?email=${email}`, {
            headers: getIdToken()
        });
    },

    otpValidate: data => {
        const { payload } = data;
        return axios.post(
            `${userDomain}${prefix}${userVersion}/otp/validate`,
            { ...payload },
            { headers: getIdToken() }
        );
    },

    getLgimUsers: data => {
        const { payload } = data;
        const { organizationId } = payload;
        return axios.get(`${userDomain}${prefix}${userVersion}/users/organization?organizationId=${organizationId}`, {
            headers: getIdToken()
        });
    },

    addUserFromUserManagement: data => {
        const { payload } = data;
        return axios.put(
            `${userDomain}${prefix}${userVersion}/group/user-update`,
            { ...payload },
            { headers: getIdToken() }
        );
    },

    updateEmailNotificationFlag: data => {
        const { payload } = data;
        return axios.post(
            `${userDomain}${prefix}${userVersion}/user/email-flag`,
            { ...payload },
            { headers: getIdToken() }
        );
    },

    sendNotificationConfig: data => {
        const { payload } = data;
        return axios.post(
            `${userDomain}${prefix}${userVersion}/user/email-flag`,
            { ...payload },
            { headers: getIdToken() }
        );
    },

    doContactUs: data => {
        const { payload } = data;
        return axios.post(`${contactUsDomain}${prefix}${contactUsVersion}/contactUs/contact`, {
            ...payload
        });
    },

    updateIsFavourite: data => {
        const { payload } = data;
        return axios.post(
            `${userDomain}${prefix}${userVersion}/user/favorite-scheme`,
            { ...payload },
            { headers: getIdToken() }
        );
    },

    // TODO: Remove this after registration workflow is done
    getWorkflowPosition: data => {
        const { payload } = data;
        const { schemeId } = payload;
        return axios.get(`${schemeDomain}${prefix}${schemeVersion}/scheme/workflow/${schemeId}`, {
            headers: getIdToken()
        });
    },
    // TODO: get domain from config
    getWorkflow: data => {
        const { entityId, isMultiClient } = data;

        return axios.get(
            `${workflowDomain}${prefix}${workflowVersion}/${
                isMultiClient ? 'multiclinet-workflows' : `workflows/${entityId}`
            }`,
            {
                headers: getIdToken()
            }
        );
    },

    getWorkflowStep: data => {
        const { workflow, entityId, step } = data.payload;
        // const { workflow, entityId, step, datasetId, pq, needRejectedDate = 'true' } = data.payload;

        // let query = datasetId || pq || needRejectedDate ? '?' : false;
        // if (datasetId && pq && needRejectedDate)
        //     query += `datasetId=${datasetId}&pq=${pq}&needRejectedDate=${needRejectedDate}`;
        // else if (datasetId && pq) query += `datasetId=${datasetId}&pq=${pq}`;
        // else if (datasetId) query += `datasetId=${datasetId}`;
        // else if (pq) query += `pq=${pq}`;
        // else if (needRejectedDate) query += `needRejectedDate=${needRejectedDate}`;

        return axios.get(
            // `${schemeDomain}${prefix}${schemeVersion}/scheme/workflow/${schemeId}/${step}${query ? query : ''}`,
            `${workflowDomain}${prefix}${workflowVersion}/entity/${entityId}/workflow/${workflow}/step/${step}`,
            {
                headers: getIdToken()
            }
        );
    },

    filterWorkflowStep: data => {
        const { schemeId, step } = data.payload;

        return axios.post(
            `${schemeDomain}${prefix}${schemeVersion}/scheme/workflow/${schemeId}/${step}`,
            { ...data.payload },
            { headers: getIdToken() }
        );
    },

    updateWorkflowStep: data => {
        const { loggedUser, rest, ...payload } = data.payload;

        return axios.post(
            `${workflowDomain}${prefix}${workflowVersion}/step-action`,
            { ...payload },
            { headers: getIdToken() }
        );
    },

    createScheme: data => {
        const { payload } = data;
        return axios.post(
            `${schemeDomain}${prefix}${schemeVersion}/scheme/create`,
            { ...payload },
            { headers: getIdToken() }
        );
    },

    schemeInformationData: param => {
        const { data } = param;
        return axios.post(
            `${schemeDomain}${prefix}${schemeVersion}/scheme/information`,
            { ...data },
            { headers: getIdToken() }
        );
    },

    getSchemes: data => {
        const { withAnalytics, valuationDate } = data && data.payload ? data.payload : {};

        return axios.get(
            `${schemeDomain}${prefix}${schemeVersion}/scheme/all?withAnalytics=${withAnalytics}${
                valuationDate ? '&valuationDate=' + valuationDate : ''
            }`,
            {
                headers: getIdToken()
            }
        );
    },

    getContributors: data => {
        const { payload } = data;
        const { schemeId } = payload;
        return axios.get(`${userDomain}${prefix}${userVersion}/scheme/contributors/${schemeId}`, {
            headers: getIdToken()
        });
    },

    getSchemeByName: data => {
        const { payload } = data;
        const { schemeId, entityId } = payload;
        return axios.get(`${schemeDomain}${prefix}${schemeVersion}/scheme/${schemeId || entityId}`, {
            headers: getIdToken()
        });
    },

    getUserNotifications: data => {
        // const { maximumItem } = data; //payload,
        // if (maximumItem) {
        return axios.get(
            `${notificationDomain}${prefix}${notificationVersion}/notification/my`,
            // { ...payload, maximumItem }, // maximumItem parameter for limit the nmotification count
            { headers: getIdToken() }
        );
        // } else {
        //     return axios.get(
        //         `${notificationDomain}${prefix}${notificationVersion}/notification/my`,
        //         // { ...payload }, // maximumItem parameter for limit the nmotification count
        //         { headers: getIdToken() }
        //     );
        // }
    },
    resetRedDotNotification: data => {
        const { payload } = data;
        return axios.post(`${userDomain}${prefix}${userVersion}/user/setUserNotification`, payload, {
            headers: getIdToken()
        });
    },
    getNotificationsSearchResult: data => {
        const { key } = data;
        if (key) {
            return axios.get(`${notificationDomain}${prefix}${notificationVersion}/notification/my?content=${key}`, {
                headers: getIdToken()
            });
        }
    },

    setNotificationsMarkAsRead: data => {
        const { payload } = data;
        return axios.put(
            `${notificationDomain}${prefix}${notificationVersion}/notification`,
            { notificationId: payload },
            { headers: getIdToken() }
        );
    },

    deleteNotifications: data => {
        const { payload } = data;
        return axios.post(
            `${notificationDomain}${prefix}${notificationVersion}/notification/delete`,
            { notificationId: payload },
            { headers: getIdToken() }
        );
    },

    renewAwsSessionToken: () => {
        return axios.get(`${notificationDomain}${prefix}${notificationVersion}/iot/describe`, {
            headers: getIdToken()
        });
    },

    getUserGroupsNotifications: data => {
        const { payload } = data;
        const { userType, schemeId } = payload;
        return axios.get(
            `${notificationDomain}${prefix}${notificationVersion}/notification/list?userType=${userType}${
                schemeId ? `&schemeId=${schemeId}` : ``
            }`,
            { headers: getIdToken() }
        );
    },

    requestToChangeOtp: data => {
        const { payload } = data;
        return axios.post(
            `${notificationDomain}${prefix}${notificationVersion}/otp/change-request`,
            { ...payload },
            { headers: getIdToken() }
        );
    },

    // chart api
    getChartList: data => {
        const { payload } = data;
        return axios.post(
            `${dashboardDomain}${prefix}${dashboardVersion}/dashboard/getUserSpecificCharts`,
            { ...payload },
            { headers: getIdToken() }
        );
    },

    geDateList: data => {
        const { activationCode } = data;
        return axios.get(
            `${dashboardDomain}${prefix}${dashboardVersion}/dashboard/getDateList?activationCode=${activationCode}`,
            {
                headers: getIdToken()
            }
        );
    },

    updateChartsList: data => {
        return axios.post(
            `${dashboardDomain}${prefix}${dashboardVersion}/dashboard/updateUserSpecificCharts`,
            { ...data },
            { headers: getIdToken() }
        );
    },

    getChartData: data => {
        return axios.post(
            `${dashboardDomain}${prefix}${dashboardVersion}/dashboard/getSchemeChartData`,
            { ...data },
            { headers: getIdToken() }
        );
    },

    getChartListByScheme: data => {
        return axios.get(`${dashboardDomain}${prefix}${dashboardVersion}/dashboard/getChartConfig/${data.schemeId}`, {
            headers: getIdToken()
        });
    },

    // Sends a request to generate active scheme dashboard charts document
    requestActiveSchemeChartsDocumentGeneration: data => {
        return axios.post(
            `${generateDomain}${prefix}${generateVersion}/generate-charts`,
            { ...data },
            { headers: getIdToken() }
        );
    },

    // Sends a request to generate active scheme dashboard ad hoc report
    requestActiveSchemeAdHocReportGeneration: data => {
        return axios.post(
            `${generateDomain}${prefix}${generateVersion}/view-report`,
            { ...data },
            { headers: getIdToken() }
        );
    },

    getTasks: data => {
        const { payload } = data;
        return axios.post(
            `${tasksDomain}${prefix}${tasksVersion}/tasks/for-user`,
            { ...payload },
            { headers: getIdToken() }
        );
    },

    getSchemesListByUser: data => {
        const { payload } = data;
        return axios.post(
            `${tasksDomain}${prefix}${tasksVersion}/tasks/scheme/list`,
            { ...payload },
            { headers: getIdToken() }
        );
    },

    getSchemeUsersList: data => {
        const { payload } = data;
        return axios.post(
            `${tasksDomain}${prefix}${tasksVersion}/tasks/user-list`,
            { ...payload },
            { headers: getIdToken() }
        );
    },

    getLgimUsersList: () => {
        return axios.post(
            `${tasksDomain}${prefix}${tasksVersion}/tasks/admin/user-list`,
            {},
            { headers: getIdToken() }
        );
    },

    saveTask: data => {
        const { payload } = data;
        return axios.post(
            `${tasksDomain}${prefix}${tasksVersion}/tasks/save`,
            { ...payload },
            { headers: getIdToken() }
        );
    },

    getInformationDocumentData: data => {
        const { payload } = data;
        let { entityId, section, type } = payload;
        section = section === 'performancereports' ? 'report' : section;
        return axios.get(
            `${fmDomain}${prefix}${fmVersion}/file-manager/documents/document-info/${section}?entityId=${entityId}&type=${type}`,
            { headers: getIdToken() }
        );
    },

    getInformationReportData: data => {
        const { payload } = data;
        let { entityId, section, type } = payload;
        // section = section === 'performancereports' ? 'report' : section;
        return axios.get(
            `${reportsDomain}${prefix}${reportsVersion}/report/report-directory-data/${section}?entityId=${entityId}&type=${type}`,
            { headers: getIdToken() }
        );
    },

    getSelectedInformationDocumentData: data => {
        const { payload } = data;
        let { schemeId, section, type, documentId } = payload;
        section = section === 'performancereports' ? 'report' : section;
        return axios.get(
            `${fmDomain}${prefix}${fmVersion}/file-manager/documents/document-info/${section}?entityId=${schemeId}&type=${type}&documentId=${documentId}`,
            { headers: getIdToken() }
        );
    },

    deleteTask: data => {
        return axios.post(
            `${tasksDomain}${prefix}${tasksVersion}/tasks/delete`,
            { ...data },
            { headers: getIdToken() }
        );
    },

    updateMarkAsRead: data => {
        return axios.post(
            `${tasksDomain}${prefix}${tasksVersion}/tasks/mark-as-read`,
            { ...data },
            { headers: getIdToken() }
        );
    },

    sendEmailNotificationConfig: data => {
        const { payload } = data;
        return axios.post(
            `${tasksDomain}${prefix}${tasksVersion}/tasks/send/email/notification-config`,
            { ...payload },
            { headers: getIdToken() }
        );
    },

    getEmailNotificationConfig: data => {
        const { payload } = data;
        return axios.post(
            `${tasksDomain}${prefix}${tasksVersion}/tasks/get/email/notification-onfig`,
            { ...payload },
            { headers: getIdToken() }
        );
    },

    getUserClaims: data => {
        const { payload } = data;
        const { userType, schemeId } = payload;
        return axios.get(
            `${userDomain}${prefix}${userVersion}/claim/list?userType=${userType}${
                schemeId ? `&schemeId=${schemeId}` : ``
            }`,
            {
                headers: getIdToken()
            }
        );
    },

    saveSchemeGroup: data => {
        const { payload } = data;
        return axios.post(
            `${userDomain}${prefix}${userVersion}/group/scheme/create`,
            { ...payload },
            { headers: getIdToken() }
        );
    },

    getOrganizationGroups: data => {
        const { payload } = data;
        const { organizationId } = payload;
        return axios.get(`${userDomain}${prefix}${userVersion}/group/organization?organizationId=${organizationId}`, {
            headers: getIdToken()
        });
    },

    getSchemeGroups: data => {
        const { payload } = data;
        const { schemeId } = payload;
        return axios.get(`${userDomain}${prefix}${userVersion}/group/scheme?schemeId=${schemeId}`, {
            headers: getIdToken()
        });
    },

    saveGroup: data => {
        const { payload } = data;
        return axios.post(
            `${userDomain}${prefix}${userVersion}/group/organization/create`,
            { ...payload },
            { headers: getIdToken() }
        );
    },

    editGroup: data => {
        const { payload } = data;
        const { groupId } = payload;
        return axios.put(
            `${userDomain}${prefix}${userVersion}/group/${groupId}`,
            { ...payload },
            { headers: getIdToken() }
        );
    },

    deleteGroup: data => {
        const { payload } = data;
        return axios.delete(`${userDomain}${prefix}${userVersion}/group/${payload.userGroupId}`, {
            data: payload,
            headers: getIdToken()
        });
    },

    // Remove a scheme user from a scheme
    removeSchemeUserFromScheme: data => {
        const { payload } = data;
        return axios.put(
            `${userDomain}${prefix}${userVersion}/scheme/removeUserFromScheme`,
            { ...payload },
            { headers: getIdToken() }
        );
    },

    // DELETE users from system
    // Sends a list of user IDs of users to be deleted
    deleteUserFromSystem: idList => {
        return axios.delete(`${userDomain}${prefix}${userVersion}/user/deleteUser`, {
            data: { idList },
            headers: getIdToken()
        });
    },

    // GET pending scheme user delete account requests to reject/approve
    getSchemeUserDeleteAccountRequests: data => {
        return axios.get(`${userDomain}${prefix}${userVersion}/user/getDeletePendingUsers`, {
            headers: getIdToken()
        });
    },

    // PUT:: Reject scheme user delete account requests
    rejectSchemeUserDeleteAccountRequests: payload => {
        return axios.put(
            `${userDomain}${prefix}${userVersion}/user/rejectDeleteRequests`,
            { ...payload },
            { headers: getIdToken() }
        );
    },

    // GET schems user's delete account data
    getSchemeUserDeleteAccountData: data => {
        return axios.get(`${userDomain}${prefix}${userVersion}/user/deleteAccountDetails`, {
            headers: getIdToken()
        });
    },

    // PUT:: Send a user account deletion request as a scheme user
    sendSchemeUserDeleteAccountRequest: email => {
        return axios.put(`${userDomain}${prefix}${userVersion}/user/requestToDelete`, {
            headers: getIdToken()
        });
    },

    getClaimsForLoggedUser: data => {
        const { payload } = data;
        const { schemeId } = payload;
        return axios.get(`${userDomain}${prefix}/v2/claim/scheme/${schemeId}`, {
            headers: getIdToken()
        });
    },

    getOrganizations: data => {
        // const { payload } = data;
        if (!getIdToken()) return null;
        const status = 'A';
        return axios.get(`${userDomain}${prefix}${userVersion}/organization?status=${status}`, {
            headers: getIdToken()
        });
    },

    getCommonClaimsForUser: data => {
        if (!getIdToken()) return null;
        return axios.get(`${userDomain}${prefix}${userVersion}/claim/organization`, {
            headers: getIdToken()
        });
    },

    getUsersForSpecificClaim: data => {
        const { payload } = data;
        const { claimId, schemeId } = payload;
        return axios.get(`${userDomain}${prefix}/v2/claim/users/${claimId}?schemeId=${schemeId}`, {
            headers: getIdToken()
        });
    },

    getAuditTrail: action => {
        let {
            payload: { email, schemeId, primaryRole, start, end }
        } = action;
        return axios.get(
            `${auditTrailDomain}${prefix}${auditTrailVersion}/trail/activity-log?email=${email}&schemeId=${schemeId}&primaryRole=${primaryRole}&start=${start}&end=${end}`,
            {
                headers: getIdToken()
            }
        );
    },

    abort: data => {
        const { payload } = data;
        return axios.post(
            `${schemeDomain}${prefix}${schemeVersion}/scheme/abort`,
            { ...payload },
            { headers: getIdToken() }
        );
    },
    abortWorkflows: data => {
        const { isMultiClient } = data;
        return axios.post(
            `${workflowDomain}${prefix}${workflowVersion}/${
                isMultiClient ? 'multiclient-workflows' : 'workflows'
            }/abort`,
            { ...data },
            { headers: getIdToken() }
        );
    },

    getBotMessages: data => {
        return axios.post(`${chatBotDomain}${prefix}${chatBotVersion}/chat-bot/say`, data, {
            headers: getIdToken()
        });
    },

    // uploadFiles to S3
    uploadFiles: data => {
        return axios.post(`${analyticDomain}${prefix}${analyticVersion}/upload`, data, {
            headers: getIdToken()
        });
    },

    // getProcessedFiles from  to S3
    getProcessedFiles: data => {
        return axios.post(`${analyticDomain}${prefix}${analyticVersion}/processed-files`, data, {
            headers: getIdToken()
        });
    },

    // downloadFile from S3
    downloadFile: data => {
        return axios.post(`${analyticDomain}${prefix}${analyticVersion}/download`, data, {
            headers: getIdToken()
        });
    },

    getGeneratedDocumentRequest: data => {
        return axios.post(
            `${generateDomain}${prefix}${generateVersion}/generate-docx`,
            { ...data },
            { headers: getIdToken() }
        );
    },
    checkFileAvailability: data => {
        return axios.post(
            `${utilityDomain}${prefix}${utilityVersion}/file-manager/check-exist`,
            { ...data },
            { headers: getIdToken() }
        );
    },
    executeStepfunction: data => {
        return axios.post(
            `${analyticDomain}${prefix}${analyticVersion}/execute`,
            { ...data },
            { headers: getIdToken() }
        );
    },
    executeStepfunctionSet: data => {
        return axios.post(
            `${analyticDomain}${prefix}${analyticVersion}/executeSet`,
            { ...data },
            { headers: getIdToken() }
        );
    },
    convertDocumentRequest: data => {
        return axios.post(
            `${generateDomain}${prefix}${generateVersion}/docx-to-pdf`,
            { ...data },
            { headers: getIdToken() }
        );
    },
    getClaimToNotificationMap: () => {
        return axios.get(`${userDomain}${prefix}${userVersion}/group/claimNotificationMap`, {
            headers: getIdToken()
        });
    },
    sendDebugInfo: data => {
        return axios.post(
            // `${analyticsDomain}${prefix}/convertDocxToPDF`,
            `${utilityDomain}${prefix}${utilityVersion}/util/customMetric/chunkFail`,
            { ...data },
            { headers: getIdToken() }
        );
    },
    // Api for portfolio analyzer
    portfolioAnalyze: data => {
        return axios.post(
            `${analyticDomain}${prefix}${analyticVersion}/portfolio/analyze`,

            { ...data },
            { headers: getIdToken() }
        );
    },
    abortPortfolioAnalyze: data => {
        return axios.post(
            `${analyticDomain}${prefix}${analyticVersion}/abort/analyze`,
            { ...data },
            { headers: getIdToken() }
        );
    },
    getUpdatedTargerReturn: data => {
        return axios.post(
            `${analyticDomain}${prefix}${analyticVersion}/target-return`,

            { ...data },
            { headers: getIdToken() }
        );
    },
    rejectInitialProposal: data => {
        return axios.post(
            `${analyticDomain}${prefix}${analyticVersion}/portfolio/apply`,

            { ...data },
            { headers: getIdToken() }
        );
    },
    getStepFunctionStatus: data => {
        let { schemeId, step, functionName } = data;
        return axios.get(`${analyticDomain}${prefix}${analyticVersion}/status/${functionName}/${schemeId}/${step}`, {
            headers: getIdToken()
        });
    },
    fetchTasks: data => {
        const filters = data.payload;
        return axios.post(
            `${tasksManagerDomain}${prefix}${taskManagerVersion}/action-manager/getActions`,
            { filters },
            { headers: getIdToken() }
        );
    },
    fetchTaskMgrCount: data => {
        const filters = data.payload;
        return axios.post(
            `${tasksManagerDomain}${prefix}${taskManagerVersion}/action-manager/getActions`,
            { filters },
            { headers: getIdToken() }
        );
    },

    getOutputFiles: data => {
        // console.log('data ', data);
        // console.log('data.payload ', data.payload);
        const { functionName } = data.payload;
        const { schemeId } = data.payload;
        const { workflow } = data.payload;
        const { step } = data.payload;

        return axios.get(
            `${analyticDomain}${prefix}${analyticVersion}/outputs/${functionName}/${schemeId}/${workflow}/${step}`,
            {
                headers: getIdToken()
            }
        );
    },
    getListExecutions: data => {
        return axios.post(`${analyticDomain}${prefix}${analyticVersion}/analytic/details`, data, {
            headers: getIdToken()
        });
    },
    getAnalyticalFiles: data => {
        return axios.post(`${analyticDomain}${prefix}${analyticVersion}/analytic/files`, data, {
            headers: getIdToken()
        });
    },
    searchClientUsers: data => {
        return axios.post(`${userDomain}${prefix}${userVersion}/users/searchClientUsersWithSchemes`, data, {
            headers: getIdToken()
        });
    },
    getClientAutofillData: data => {
        return axios.post(`${userDomain}${prefix}${userVersion}/users/getClientAutofillData`, data, {
            headers: getIdToken()
        });
    },

    getKeyMetricsConfig: (data = null) => {
        const { userType } = data.payload || {};
        return axios.get(
            `${schemeDomain}${prefix}${schemeVersion}/scheme/key-metrics-config${
                userType ? `?userType=${userType}` : ``
            }`,
            {
                headers: getIdToken()
            }
        );
    },

    filterSchemes: data => {
        const { columns, all = false, userType, valuationDate, hiddenColumns = [] } = data.payload;
        return axios.post(
            `${schemeDomain}${prefix}${schemeVersion}/scheme/filter-schemes?all=${all}${
                userType ? `&userType=${userType}` : ``
            }${valuationDate ? `&valuationDate=${valuationDate}` : ``}`,
            { columns, hiddenColumns },
            {
                headers: getIdToken()
            }
        );
    },

    getMyViews: data => {
        const { userType } = data.payload || {};
        return axios.get(
            `${schemeDomain}${prefix}${schemeVersion}/scheme/get-my-views${userType ? `?userType=${userType}` : ``}`,
            {
                headers: getIdToken()
            }
        );
    },

    deleteView: data => {
        return axios.delete(`${schemeDomain}${prefix}${schemeVersion}/scheme/remove-view`, {
            data: data.payload,
            headers: getIdToken()
        });
    },

    saveView: data => {
        return axios.post(`${schemeDomain}${prefix}${schemeVersion}/scheme/save-view`, data.payload, {
            headers: getIdToken()
        });
    },

    updateView: data => {
        return axios.put(`${schemeDomain}${prefix}${schemeVersion}/scheme/update-view`, data.payload, {
            headers: getIdToken()
        });
    },

    schemeDataChange: data => {
        return axios.put(
            `${schemeDomain}${prefix}${schemeVersion}/scheme/key-metrics/scheme-data-change`,
            { ...data.payload },
            { headers: getIdToken() }
        );
    },

    saveGlobalView: data => {
        return axios.post(
            `${schemeDomain}${prefix}${schemeVersion}/scheme/key-metrics/save-global-view`,
            data.payload,
            {
                headers: getIdToken()
            }
        );
    },

    updateGlobalView: data => {
        return axios.put(
            `${schemeDomain}${prefix}${schemeVersion}/scheme/key-metrics/update-global-view`,
            data.payload,
            {
                headers: getIdToken()
            }
        );
    },

    deleteGlobalView: data => {
        return axios.delete(`${schemeDomain}${prefix}${schemeVersion}/scheme/key-metrics/remove-global-view`, {
            data: data.payload,
            headers: getIdToken()
        });
    },

    getDefaultOrganizationGroupsByOrgId: data => {
        const { organizationId } = data.payload;
        return axios.get(
            `${userDomain}${prefix}${userVersion}/group/get-default-organization-groups-by-orgId?organizationId=${organizationId}`,
            {
                headers: getIdToken()
            }
        );
    },

    getMyCurrentAppliedView: data => {
        return axios.get(`${schemeDomain}${prefix}${schemeVersion}/scheme/key-metrics/get-my-current-applied-view`, {
            headers: getIdToken()
        });
    },

    saveMyCurrentAppliedView: data => {
        return axios.post(
            `${schemeDomain}${prefix}${schemeVersion}/scheme/key-metrics/save-my-current-applied-view`,
            { view: data.payload },
            {
                headers: getIdToken()
            }
        );
    },

    removeMyCurrentAppliedView: data => {
        return axios.delete(
            `${schemeDomain}${prefix}${schemeVersion}/scheme/key-metrics/remove-my-current-applied-view`,
            {
                headers: getIdToken()
            }
        );
    },

    getArtifacts: version => {
        return axios.get(`${artifactDomain}${prefix}${artifactVersion}/artifact/${version}`);
    }
};

export default connectApi;
