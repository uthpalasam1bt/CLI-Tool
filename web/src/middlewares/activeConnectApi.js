import config from 'appConfig';
import axios from 'axios';

import BrowserStorage from './storage';
import { setTokenRenewInterceptor } from './axiosInterceptor';

setTokenRenewInterceptor(axios);

const storage = BrowserStorage.getInstance();
const { domains, prefix, apiVersion } = config.api;
const { activeWorkFlowContainer, activeWorkFlows, scheme, user } = domains;

const {
    activeWorkFlowContainer: activeWorkFlowContainerVersion,
    activeWorkFlow: activeWorkFlowVersion,
    activeWorkFlows: activeWorkFlowsVersion,
    scheme: schemeVersion,
    user: userVersion
} = apiVersion;

let urlMap = {
    reqCancelIaaFma: {
        cnclAcc: '/activeWorkflow/requestToCancel/cancelSchemeAccount',
        deactAcc: '/activeWorkflow/requestToCancel/deactivateAccount',
        procReq: '/activeWorkflow/requestToCancel/processCancelRequest',
        trustAprvl: '/activeWorkflow/requestToCancel/trusteeApproval'
    },
    advfee: {
        chngAdvFee: '/activeWorkflow/changeAdvisoryFee/updateAdvisoryFeeFlow',
        genrtIaa: '/activeWorkflow/changeAdvisoryFee/updateAdvisoryFeeFlow',
        aprvIaa: '/activeWorkflow/changeAdvisoryFee/trusteeApproval',
        iaaExcuStat: '/activeWorkflow/changeAdvisoryFee/updateAdvisoryFeeFlow',
        actMendt: '/activeWorkflow/changeAdvisoryFee/updateAdvisoryFeeFlow'
    },
    transReprt: {
        genrTrnsReprt: '/activeWorkflow/transitionReport/uploadTransitionReport',
        aprvTrnsReprt: '/activeWorkflow/transitionReport/approveTransitionReport',
        publTrnsReprt: '/activeWorkflow/transitionReport/publishTransitionReport'
    },
    fmfee: {
        changeFmFee: '/activeWorkflow/changeFMfee/updateFMfeeFlow',
        genFma: '/activeWorkflow/changeFMfee/updateFMfeeFlow',
        fmaExeStatus: '/activeWorkflow/changeFMfee/updateFMfeeFlow',
        actMandateFma: '/activeWorkflow/changeFMfee/updateFMfeeFlow'
    },
    trusBankAccDetlWf: {
        trustBankAccDetl: '/activeWorkflow/trusteeBankAccDetails/saveTrusteeBankAccDetails',
        actMendt: '/activeWorkflow/trusteeBankAccDetails/saveTrusteeBankAccDetails'
    },
    updSip: {
        genrSip: '/activeWorkflow/updateSip/updateSip',
        aprvSip: '/activeWorkflow/updateSip/updateSip',
        publSip: '/activeWorkflow/updateSip/updateSip',
        schAprvSip: '/activeWorkflow/updateSip/updateSip',
        actMendt: '/activeWorkflow/updateSip/updateSip',
        spnsrConsltLtr: '/activeWorkflow/updateSip/updateSip'
    },
    updAvcDetl: {
        avcDetl: '/activeWorkflow/updateAvcDetails/updateAvcDetails',
        dwnldAvcDetl: '/activeWorkflow/updateAvcDetails/updateAvcDetails',
        genrDocsAvc: '/activeWorkflow/updateAvcDetails/updateAvcDetails',
        // genrDocs: '/activeWorkflow/updateAvcDetails/updateAvcDetails',
        aprvAdvReprt: '/activeWorkflow/updateAvcDetails/updateAvcDetails',
        aprvSip: '/activeWorkflow/updateAvcDetails/updateAvcDetails',
        publDocsAvc: '/activeWorkflow/updateAvcDetails/updateAvcDetails',
        // publDocs: '/activeWorkflow/updateAvcDetails/updateAvcDetails',
        schAprvAdvReprt: '/activeWorkflow/updateAvcDetails/updateAvcDetails',
        schAprvSip: '/activeWorkflow/updateAvcDetails/updateAvcDetails',
        sponsrConsltLtr: '/activeWorkflow/updateAvcDetails/updateAvcDetails',
        actMendt: '/activeWorkflow/updateAvcDetails/updateAvcDetails'
    },
    liabUpd: {
        liabUpdForm: '/activeWorkflow/liabilityUpdate/liabilityUpdateForm',
        dwnldLiabUpd: '/activeWorkflow/liabilityUpdate/downloadLuContinue',
        genrtAdvFmaRprt: '/activeWorkflow/liabilityUpdate/generateAdvFma',
        publAdvFmaRprt: '/activeWorkflow/liabilityUpdate/publishAdvFma',
        luActMendt: '/activeWorkflow/liabilityUpdate/activateMandate',
        luLgimDocsExcuStat: '/activeWorkflow/liabilityUpdate/lgimExeStatus'
    },
    schName: {
        chngSchName: '/activeWorkflow/workflows/sncSchemeNameForm',
        dwnldSchDetl: '/activeWorkflow/workflows/downloadSncContinue',
        genrtDocs: '/activeWorkflow/workflows/sncGenerateDocs',
        publDocs: '/activeWorkflow/workflows/sncPublishDocs',
        spnsrConsltLtr: '/activeWorkflow/workflows/sncSponsrConsltLtrCnt',
        lgimDocsExcuStat: '/activeWorkflow/workflows/sncLgimLtrExeStatus',
        actMendt: '/activeWorkflow/workflows/sncActivateMandate'
    },
    addReprtInfo: {
        addtReprt: '/activeWorkflow/workflows/updateAdditionalReports',
        genrAddtReprt: '/activeWorkflow/workflows/updateAdditionalReports',
        publAddtReprt: '/activeWorkflow/workflows/updateAdditionalReports',
        rvwAddtReprt: '/activeWorkflow/workflows/updateAdditionalReports'
    },
    deficitContribution: {
        deficitActMandate: '/activeWorkflow/workflows/updateDeficitContribution',
        genAdvsryRprt: '/activeWorkflow/workflows/updateDeficitContribution',
        pubAdvsryRprt: '/activeWorkflow/workflows/updateDeficitContribution',
        defiContributionUpdate: '/activeWorkflow/workflows/updateDeficitContribution',
        schmeAprvAdvsryRprt: '/activeWorkflow/workflows/updateDeficitContribution',
        aprvAdvsryRprt: '/activeWorkflow/workflows/updateDeficitContribution',
        dwnDefiCntribn: '/activeWorkflow/workflows/updateDeficitContribution'
    },
    rtnTargUpd: {
        rtnTarg: '/activeWorkflow/returnTargetUpdate/returnTargetUpdate',
        dwnRtnTarg: '/activeWorkflow/returnTargetUpdate/returnTargetUpdate',
        genrDocs: '/activeWorkflow/returnTargetUpdate/returnTargetUpdate',
        aprvAdvReprt: '/activeWorkflow/returnTargetUpdate/returnTargetUpdate',
        aprvFma: '/activeWorkflow/returnTargetUpdate/returnTargetUpdate',
        aprvSip: '/activeWorkflow/returnTargetUpdate/returnTargetUpdate',
        publDocs: '/activeWorkflow/returnTargetUpdate/returnTargetUpdate',
        schAprvAdvReprt: '/activeWorkflow/returnTargetUpdate/returnTargetUpdate',
        schAprvFma: '/activeWorkflow/returnTargetUpdate/returnTargetUpdate',
        schAprvSip: '/activeWorkflow/returnTargetUpdate/returnTargetUpdate',
        spnsrConsltLtr: '/activeWorkflow/returnTargetUpdate/returnTargetUpdate',
        lgimFMAExcuStat: '/activeWorkflow/returnTargetUpdate/returnTargetUpdate',
        clientFMAExcuStat: '/activeWorkflow/returnTargetUpdate/returnTargetUpdate',
        actMendt: '/activeWorkflow/returnTargetUpdate/returnTargetUpdate'
    },
    flStrtgRevw: {
        updt: '/activeWorkflow/fullStrategyReview/fullStrategyReview',
        dwndStrtgRvw: '/activeWorkflow/fullStrategyReview/fullStrategyReview',
        genrDocs: '/activeWorkflow/fullStrategyReview/fullStrategyReview',
        aprvAdvReprt: '/activeWorkflow/fullStrategyReview/fullStrategyReview',
        aprvFma: '/activeWorkflow/fullStrategyReview/fullStrategyReview',
        aprvSip: '/activeWorkflow/fullStrategyReview/fullStrategyReview',
        publDocs: '/activeWorkflow/fullStrategyReview/fullStrategyReview',
        schAprvAdvReprt: '/activeWorkflow/fullStrategyReview/fullStrategyReview',
        schAprvFma: '/activeWorkflow/fullStrategyReview/fullStrategyReview',
        schAprvSip: '/activeWorkflow/fullStrategyReview/fullStrategyReview',
        spnsrConsltLtr: '/activeWorkflow/fullStrategyReview/fullStrategyReview',
        lgimFMAExcuStat: '/activeWorkflow/fullStrategyReview/fullStrategyReview',
        clientFMAExcuStat: '/activeWorkflow/fullStrategyReview/fullStrategyReview',
        actMendt: '/activeWorkflow/fullStrategyReview/fullStrategyReview'
    },
    trustees: {
        chngTrust: '/activeWorkflow/changeTrustee/changeTrusteeForm'
    },
    bspkFundLvlTrg: {
        fundLvlTrg: '/activeWorkflow/fltForm',
        mandateFlr: '/activeWorkflow/fltActiveMandate'
    },
    pfLiabUpd: {
        PFLiabUpdForm: '/activeWorkflow/PFLiabilityUpdate/PFLiabilityUpdate',
        PFDwnldLiabUpd: '/activeWorkflow/PFLiabilityUpdate/PFLiabilityUpdate',
        PFGenrtAdvFmaRprt: '/activeWorkflow/PFLiabilityUpdate/PFLiabilityUpdate',
        PFAprvAdvRprt: '/activeWorkflow/PFLiabilityUpdate/PFLiabilityUpdate',
        PFPublAdvFmaRprt: '/activeWorkflow/PFLiabilityUpdate/PFLiabilityUpdate',
        PFSchAprvAdvRprt: '/activeWorkflow/PFLiabilityUpdate/PFLiabilityUpdate',
        PFLuActMendt: '/activeWorkflow/PFLiabilityUpdate/PFLiabilityUpdate'
    },
    compReprtInfo: {
        compAnnReprt: '/activeWorkflow/workflows/updateCompnuAR',
        genrCompAnnReprt: '/activeWorkflow/workflows/updateCompnuAR',
        publCompAnnReprt: '/activeWorkflow/workflows/updateCompnuAR',
        rvwCompAnnReprt: '/activeWorkflow/workflows/updateCompnuAR'
    },
    tprSchRtnInfo: {
        tprSchRtn: '/activeWorkflow/workflows/updateTPR',
        genrTprSchRtn: '/activeWorkflow/workflows/updateTPR',
        publTprSchRtn: '/activeWorkflow/workflows/updateTPR',
        rvwTprSchRtn: '/activeWorkflow/workflows/updateTPR'
    },
    updNonLgimAsst: {
        inptNonLgimAsst: '/activeWorkflow/updateNonLgimAssets/updateNonLgimAssets',
        nonLgimAsstActMandate: '/activeWorkflow/updateNonLgimAssets/updateNonLgimAssets'
    },
    deficitContributionPF: {
        deficitActMandatePF: '/activeWorkflow/workflows/updateDeficitContributionPF',
        defiContributionUpdatePF: '/activeWorkflow/workflows/updateDeficitContributionPF',
        aprvDefiContributionPF: '/activeWorkflow/workflows/updateDeficitContributionPF'
    },
    bspkFundLvlTrgPF: {
        fundLvlTrgPF: '/activeWorkflow/fltFormPF',
        mandateFlrPF: '/activeWorkflow/fltActiveMandatePF'
    },
    pfSchemeInfo: {
        inputSchemeInfoPF: '/activeWorkflow/scheme-info/pf-update',
        schemeInfoActMandatePF: '/activeWorkflow/scheme-info/pf-update'
    }
};

const getIdToken = () => {
    const sessionUser = storage.getUserSession();
    if (sessionUser !== null) {
        const { jwtToken } = sessionUser.loggedUser;
        return { Authorization: jwtToken };
    }

    return null;
};

const activeConnectApi = {
    validateSchemeName: action => {
        // console.log('action', action);
        let payload = action.payload;
        // console.log('payload: ', payload);
        return axios.post(
            `${scheme}${prefix}${schemeVersion}/schemes/check-scheme-name`,
            { ...payload },
            {
                headers: getIdToken()
            }
        );
    },
    getActiveWorkflows: data => {
        return axios.post(
            `${activeWorkFlowContainer}${prefix}${activeWorkFlowContainerVersion}/activeWorkflow/workflows`,
            data,
            {
                headers: getIdToken()
            }
        );
    },
    getAdvisoryFee: data => {
        return axios.post(
            `${activeWorkFlowContainer}${prefix}${activeWorkFlowVersion}/activeWorkflow/workflow/data`,
            data,
            {
                headers: getIdToken()
            }
        );
    },
    saveAdvisoryFee: data => {
        return axios.post(
            `${activeWorkFlowContainer}${prefix}${activeWorkFlowVersion}/activeWorkflow/workflow/data`,
            data,
            {
                headers: getIdToken()
            }
        );
    },
    commonPublishRequest: data => {
        let { payload, documents } = data;
        let requestPayload = { ...payload, documents };
        return axios.post(
            `${activeWorkFlowContainer}${prefix}${activeWorkFlowVersion}/activeWorkflow/publishDocuments`,
            requestPayload,
            {
                headers: getIdToken()
            }
        );
    },
    getStepsForWorkflow: action => {
        const { payload } = action;
        return axios.post(
            `${activeWorkFlowContainer}${prefix}${activeWorkFlowContainerVersion}/activeWorkflow/workflow/steps`,
            payload,
            {
                headers: getIdToken()
            }
        );
    },
    processRequest: data => {
        let payload = data.payload;
        return axios.post(
            `${activeWorkFlowContainer}${prefix}${activeWorkFlowContainerVersion}/activeWorkflow/requestToCancel/processCancelRequest`,
            { ...payload },
            { headers: getIdToken() }
        );
    },
    trusteeApproval: data => {
        let payload = data.payload;
        return axios.post(
            `${activeWorkFlowContainer}${prefix}${activeWorkFlowContainerVersion}/activeWorkflow/requestToCancel/trusteeApproval`,
            { ...payload },
            { headers: getIdToken() }
        );
    },
    getSubmittedValues: data => {
        let payload = data.payload;
        return axios.post(
            `${activeWorkFlowContainer}${prefix}${activeWorkFlowContainerVersion}/activeWorkflow/workflow/data`,
            { ...payload },
            { headers: getIdToken() }
        );
    },
    //Saves form data (Submission)
    saveData: action => {
        let { payload, isUsingNewBaseUrl } = action;
        let { stepId, workflowId } = payload;

        // console.log('stepId.............', stepId);
        // console.log('workflowId.............', workflowId);
        // console.log('urlMap[workflowId][stepId].............', urlMap[workflowId][stepId]);

        let url = isUsingNewBaseUrl
            ? `${activeWorkFlows}${prefix}${activeWorkFlowsVersion}${urlMap[workflowId][stepId]}`
            : `${activeWorkFlowContainer}${prefix}${activeWorkFlowContainerVersion}${urlMap[workflowId][stepId]}`;

        return axios.post(url, { ...payload }, { headers: getIdToken() });
    },
    saveDocSign: action => {
        let { payload } = action;
        let url = `${activeWorkFlows}${prefix}${activeWorkFlowsVersion}/activeWorkflow/workflows/sncExeStatus`;
        return axios.put(url, { ...payload }, { headers: getIdToken() });
    },
    // Draft form data
    draftData: action => {
        let { payload } = action;
        let url = `${activeWorkFlowContainer}${prefix}${activeWorkFlowContainerVersion}/activeWorkflow/workflow/draft`;
        return axios.post(url, { ...payload }, { headers: getIdToken() });
    },
    saveCommentId: action => {
        let { payload } = action;
        let url = `${activeWorkFlowContainer}${prefix}${activeWorkFlowContainerVersion}/commentId`;
        return axios.post(url, { ...payload }, { headers: getIdToken() });
    },
    saveComment: action => {
        let { payload } = action;
        return axios.post(
            `${activeWorkFlowContainer}${prefix}${activeWorkFlowContainerVersion}/comment`,
            { ...payload },
            { headers: getIdToken() }
        );
    },
    getComments: action => {
        let { payload: commentId } = action;
        return axios.get(
            `${activeWorkFlowContainer}${prefix}${activeWorkFlowContainerVersion}/comment?commentId=${commentId}`,
            {
                headers: getIdToken()
            }
        );
    },
    getSignUsers: action => {
        let payload = action.payload;
        return axios.post(
            `${activeWorkFlowContainer}${prefix}${activeWorkFlowContainerVersion}/activeWorkflow/getSignUsers`,
            { ...payload },
            { headers: getIdToken() }
        );
    },

    // tpip/v1/activeWorkflow/getSignUsers
    approveReject: data => {
        let payload = data.payload;
        return axios.post(
            `${activeWorkFlowContainer}${prefix}${activeWorkFlowContainerVersion}/activeWorkflow/workflow/authorizeDetails`,
            { ...payload },
            { headers: getIdToken() }
        );
    },
    getUserListuserList: data => {
        let payload = data.payload;
        return axios.post(
            `${activeWorkFlowContainer}${prefix}${activeWorkFlowContainerVersion}/activeWorkflow/workflow/getUserList`,
            { ...payload },
            { headers: getIdToken() }
        );
    },
    getApproveReject: data => {
        let payload = data.payload;
        return axios.post(
            `${activeWorkFlowContainer}${prefix}${activeWorkFlowContainerVersion}/activeWorkflow/workflow/getAuthorizationDetails`,
            { ...payload },
            { headers: getIdToken() }
        );
    },
    getAllFlvlTriggers: data => {
        let { schemeId, stepId } = data.payload;
        return axios.get(
            `${activeWorkFlows}${prefix}${activeWorkFlowsVersion}/activeWorkflow/fundingLvlTriggers?schemeId=${schemeId}&stepId=${stepId}`,
            {
                headers: getIdToken()
            }
        );
    },
    addFlvlTrigger: data => {
        let payload = data.payload;
        return axios.post(
            `${activeWorkFlows}${prefix}${activeWorkFlowsVersion}/activeWorkflow/fundingLvlTriggers`,
            { ...payload },
            { headers: getIdToken() }
        );
    },
    deleteFlvlTrigger: data => {
        const {
            payload: { schemeId, triggerId, stepId, schemeName }
        } = data;
        return axios.delete(
            `${activeWorkFlows}${prefix}${activeWorkFlowsVersion}/activeWorkflow/fundingLvlTriggers?triggerId=${triggerId}&schemeId=${schemeId}&stepId=${stepId}&schemeName=${schemeName}`,
            { headers: getIdToken() }
        );
    },
    updateFlvlTrigger: data => {
        let payload = data.payload;
        return axios.put(
            `${activeWorkFlows}${prefix}${activeWorkFlowsVersion}/activeWorkflow/fundingLvlTriggers `,
            { ...payload },
            { headers: getIdToken() }
        );
    },
    abortWorkflows: data => {
        let payload = data.payload;
        return axios.post(
            `${activeWorkFlowContainer}${prefix}${activeWorkFlowContainerVersion}/activeWorkflow/abortWorkflow `,
            { ...payload },
            { headers: getIdToken() }
        );
    },
    updateAddRprt: data => {
        let payload = data.payload;
        return axios.post(
            `${activeWorkFlows}${prefix}${activeWorkFlowsVersion}/activeWorkflow/workflows/updateAdditionalReports `,
            { ...payload },
            { headers: getIdToken() }
        );
    },
    updateCompAddRprt: data => {
        let payload = data.payload;
        return axios.post(
            `${activeWorkFlows}${prefix}${activeWorkFlowsVersion}/activeWorkflow/workflows/updateCompnuAR`,
            { ...payload },
            { headers: getIdToken() }
        );
    },
    updateTPRAddRprt: data => {
        let payload = data.payload;
        return axios.post(
            `${activeWorkFlows}${prefix}${activeWorkFlowsVersion}/activeWorkflow/workflows/updateTPR`,
            { ...payload },
            { headers: getIdToken() }
        );
    },
    updatedftContRprt: data => {
        let payload = data.payload;
        return axios.post(
            `${activeWorkFlows}${prefix}${activeWorkFlowsVersion}/activeWorkflow/workflows/updateDeficitContribution`,
            { ...payload },
            { headers: getIdToken() }
        );
    },
    updatedftContPF: data => {
        let payload = data.payload;
        return axios.post(
            `${activeWorkFlows}${prefix}${activeWorkFlowsVersion}/activeWorkflow/workflows/updateDeficitContributionPF`,
            { ...payload },
            { headers: getIdToken() }
        );
    },

    fetchTrustees: action => {
        let { payload: schemeId } = action;
        return axios.get(`${scheme}${prefix}${schemeVersion}/scheme/trustees/${schemeId}`, {
            headers: getIdToken()
        });
    },
    getUserInfo: action => {
        let { payload } = action;
        return axios.get(`${user}${prefix}${userVersion}/user/email?email=${payload}`, {
            headers: getIdToken()
        });
    },
    getInformationData: data => {
        let payload = data.payload;
        return axios.post(
            `${scheme}${prefix}${schemeVersion}/scheme/getActiveScheme`,
            { ...payload },
            { headers: getIdToken() }
        );
    },
    updateSchemeFlag: data => {
        const { payload } = data;
        return axios.post(
            `${activeWorkFlowContainer}${prefix}${activeWorkFlowContainerVersion}/activeWorkflow/updateActiveSchemeFlags`,
            { ...payload },
            { headers: getIdToken() }
        );
    },
    updatNonLgimAsst: data => {
        const { payload } = data;
        return axios.post(
            `${activeWorkFlowContainer}${prefix}${activeWorkFlowContainerVersion}/activeWorkflow/updateNonLgimAssets/updateNonLgimAssets`,
            { ...payload },
            { headers: getIdToken() }
        );
    },
    updatedftContRprtPF: data => {
        let payload = data.payload;
        return axios.post(
            `${activeWorkFlows}${prefix}${activeWorkFlowsVersion}/activeWorkflow/workflows/updateDeficitContributionPF`,
            { ...payload },
            { headers: getIdToken() }
        );
    },
    updateSchemeInformationPF: data => {
        let payload = data.payload;
        return axios.post(
            `${activeWorkFlows}${prefix}${activeWorkFlowsVersion}/activeWorkflow/scheme-info/pf-update`,
            { ...payload },
            { headers: getIdToken() }
        );
    }
};

export default activeConnectApi;
