const lpDomainMap = require('./lpDomainMap');
const UploadPaths = require('./uploadPaths');

module.exports = {
    appName: 'TPIP',
    env: 'dit',
    api: {
        domains: {
            user: 'https://ngj3m7ve1h.execute-api.eu-west-2.amazonaws.com',
            user_v2: 'https://frereuxfnh.execute-api.eu-west-2.amazonaws.com',
            contactUs: 'https://lrro9q0em5.execute-api.eu-west-2.amazonaws.com',
            scheme: 'https://u2h8sgnbri.execute-api.eu-west-2.amazonaws.com',
            initialProposal: 'https://brk00veizf.execute-api.eu-west-2.amazonaws.com',
            iaa: 'https://ajxnnhwv4a.execute-api.eu-west-2.amazonaws.com',
            utility: 'https://gydi3bau11.execute-api.eu-west-2.amazonaws.com',
            comment: 'https://seb4wtwavi.execute-api.eu-west-2.amazonaws.com',
            notification: 'https://qinrb1ric6.execute-api.eu-west-2.amazonaws.com',
            assetManagement: 'https://xp43ltie3g.execute-api.eu-west-2.amazonaws.com',
            dashboard: 'https://pyrqr5sgj7.execute-api.eu-west-2.amazonaws.com',
            public: 'https://tpip-dit-public.s3.eu-west-2.amazonaws.com',
            tasks: 'https://9i36htj3fk.execute-api.eu-west-2.amazonaws.com',
            documentInfo: 'https://gydi3bau11.execute-api.eu-west-2.amazonaws.com',
            claims: 'https://w3loefvw99.execute-api.eu-west-2.amazonaws.com',
            activeWorkFlowContainer: 'https://5f6suwwjje.execute-api.eu-west-2.amazonaws.com',
            activeWorkFlows: 'https://ipozb5wao6.execute-api.eu-west-2.amazonaws.com', // NEW base URL for ActiveWorkflow releated Data saves
            auditTrail: 'https://zt2pa3hq8f.execute-api.eu-west-2.amazonaws.com',
            analytic: 'https://esoxmrsk01.execute-api.us-east-2.amazonaws.com',
            multiClient: 'https://h5xonzfprd.execute-api.eu-west-2.amazonaws.com',
            chatBot: 'https://a8nov7d144.execute-api.eu-west-2.amazonaws.com',
            reports: 'https://ma5gpd1pwd.execute-api.eu-west-2.amazonaws.com',
            taskManager: 'https://4ffvz5r2z9.execute-api.eu-west-2.amazonaws.com'
        },
        prefix: '/dit/tpip',
        apiVersion: {
            user: '/v2',
            contactUs: '/v1',
            scheme: '/v2',
            initialProposal: '/v1',
            iaa: '/v1',
            utility: '/v1',
            comment: '/v1',
            notification: '/v2',
            assetManagement: '/v1',
            dashboard: '/v1',
            public: '/v1',
            tasks: '/v1',
            documentInfo: '/v1',
            claims: '/v2',
            activeWorkFlow: '/v1',
            activeWorkFlowContainer: '/v1',
            activeWorkFlows: '/v1', // API Version for NEW base URL for ActiveWorkflow releated Data saves
            auditTrail: '/v1',
            multiClient: '/v1',
            analytic: '/v1',
            chatBot: '/v1',
            taskManager: '/v1'
        }
    },
    recaptchaKey: '6LdMNqkZAAAAAPH7bsHySV_vh9vSyRZ8RNGr-5XN',
    bucket: 'tpip-dit-upload',
    publicBucket: 'tpip-dit-public',
    generateBucket: 'exc-fu-lgim-us-east-2',
    uploads: UploadPaths('liabilitiesFsKey', 'fundingFsKey'),
    templates: {
        cashflowOverall: 'templates/cashflow-overall-template.xlsx',
        cashflowFnR: 'templates/cashflow-fixed-&-real-template.xlsx',
        deficitContribution: 'templates/deficit-contributions.xlsx'
    },
    //in public bucket
    videos: {
        learnMore: 'videos/learn_more.mp4'
    },
    landingPageDomainMap: lpDomainMap
};
