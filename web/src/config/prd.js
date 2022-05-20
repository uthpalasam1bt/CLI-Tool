const lpDomainMap = require('./lpDomainMap');
const UploadPaths = require('./uploadPaths');

module.exports = {
    appName: 'TPIP',
    env: 'prd',
    api: {
        domains: {
            user: 'https://bb876cmldk.execute-api.eu-west-2.amazonaws.com',
            // user_v2: 'https://gsunhna7e2.execute-api.eu-west-2.amazonaws.com',
            contactUs: 'https://14s1118vxj.execute-api.eu-west-2.amazonaws.com',
            scheme: 'https://a0nj5d8r6d.execute-api.eu-west-2.amazonaws.com',
            initialProposal: 'https://brk00veizf.execute-api.eu-west-2.amazonaws.com', // The API is depricated
            iaa: 'https://ajxnnhwv4a.execute-api.eu-west-2.amazonaws.com', // The API is depricated
            utility: 'https://j8wo4qo159.execute-api.eu-west-2.amazonaws.com',
            comment: 'https://k4eawnudch.execute-api.eu-west-2.amazonaws.com',
            notification: 'https://8eodjjfnk0.execute-api.eu-west-2.amazonaws.com',
            assetManagement: 'https://xp43ltie3g.execute-api.eu-west-2.amazonaws.com', // This API cannot be found ************ CHECK ***********
            dashboard: 'https://jk8gtzfnnd.execute-api.eu-west-2.amazonaws.com',
            public: 'https://tpip-prd-public.s3.eu-west-2.amazonaws.com', // This API cannot be found ************ CHECK ***********
            tasks: 'https://qroyo271cj.execute-api.eu-west-2.amazonaws.com',
            documentInfo: 'https://j8wo4qo159.execute-api.eu-west-2.amazonaws.com',
            claims: 'https://59go54tvb4.execute-api.eu-west-2.amazonaws.com',
            activeWorkFlowContainer: 'https://4bgspnv3x7.execute-api.eu-west-2.amazonaws.com',
            activeWorkFlows: 'https://188mqvr82m.execute-api.eu-west-2.amazonaws.com',
            auditTrail: 'https://trcbpnh6mj.execute-api.eu-west-2.amazonaws.com',
            reports: 'https://dgsyxbquf8.execute-api.eu-west-2.amazonaws.com/dev/query',
            generate: 'https://z1ympft9o0.execute-api.eu-west-2.amazonaws.com',
            chatBot: 'https://2aeqpxbl5d.execute-api.eu-west-2.amazonaws.com',
            // multiClient: 'https://jvixb7vxze.execute-api.eu-west-2.amazonaws.com',
            analytic: 'https://7coauqut16.execute-api.eu-west-2.amazonaws.com',
            taskManager: 'https://4ffvz5r2z9.execute-api.eu-west-2.amazonaws.com'
        },
        prefix: '/prd/tpip',
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
            generate: '/v1',
            chatBot: '/v1',
            multiClient: '/v1',
            analytic: '/v1',
            taskManager: '/v1'
        }
    },
    recaptchaKey: '6Lfi7O8UAAAAALOyqyQkApPvsdteH97cxD3NZWKS',
    bucket: 'navigator-uploads',
    publicBucket: 'tpip-prd-public',
    generateBucket: 'prd-fu-lgim-eu-west-2',
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
    termsAndConditionDocs: {
        guestUser: 'agreements/LGIMEXCUBED_GuestTCs.pdf',
        registeredUser: 'agreements/LGIMEXCUBED_RegisteredUserTCs.pdf'
    },
    landingPageDomainMap: lpDomainMap
};
