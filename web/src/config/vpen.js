const lpDomainMap = require('./lpDomainMap');
const UploadPaths = require('./uploadPaths');

module.exports = {
    appName: 'TPIP',
    env: 'vpen',
    api: {
        domains: {
            user: 'https://8y0ax08cf9.execute-api.eu-west-2.amazonaws.com',
            contactUs: 'https://dj16y85sxf.execute-api.eu-west-2.amazonaws.com',
            scheme: 'https://dbnxd689z2.execute-api.eu-west-2.amazonaws.com',
            initialProposal: 'https://uf1ioiod15.execute-api.eu-west-2.amazonaws.com',
            utility: 'https://abrmgogte4.execute-api.eu-west-2.amazonaws.com',
            comment: 'https://zopk9rvs5j.execute-api.eu-west-2.amazonaws.com',
            notification: 'https://9g8uh5l29h.execute-api.eu-west-2.amazonaws.com',
            assetManagement: 'https://n72jjqb775.execute-api.eu-west-2.amazonaws.com',
            dashboard: 'https://sn4y180qx0.execute-api.eu-west-2.amazonaws.com',
            public: 'http://venus-vpen-tpip.net.s3-website.eu-west-2.amazonaws.com/',
            tasks: 'https://m6pd8e8cu2.execute-api.eu-west-2.amazonaws.com',
            documentInfo: 'https://abrmgogte4.execute-api.eu-west-2.amazonaws.com',
            activeWorkFlowContainer: 'https://715nj5gok4.execute-api.eu-west-2.amazonaws.com',
            activeWorkFlows: 'https://715nj5gok4.execute-api.eu-west-2.amazonaws.com', // NEW base URL for ActiveWorkflow releated Data saves
            auditTrail: 'https://tqip4b3ioc.execute-api.eu-west-2.amazonaws.com',
            reports: 'https://5fty7ygcm3.execute-api.eu-west-2.amazonaws.com',
            chatBot: 'https://2aeqpxbl5d.execute-api.eu-west-2.amazonaws.com',
            multiClient: 'https://r40kyz80yg.execute-api.eu-west-2.amazonaws.com',
            analytic: 'https://qhjl16o524.execute-api.eu-west-2.amazonaws.com',
            taskManager: 'https://qwlo6eufrg.execute-api.eu-west-2.amazonaws.com',
            fm: 'https://n6yxml2nhl.execute-api.eu-west-2.amazonaws.com',
            workflow: 'https://0a0lf6lzje.execute-api.eu-west-2.amazonaws.com',
            artifactName: 'https://lsadmdivf8.execute-api.eu-west-2.amazonaws.com',
            generate: 'https://o14iql5gnh.execute-api.eu-west-2.amazonaws.com'
        },
        prefix: '/vpen/tpip',
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
            activeWorkFlow: '/v1',
            activeWorkFlowContainer: '/v1',
            activeWorkFlows: '/v1', // API Version for NEW base URL for ActiveWorkflow releated Data saves
            auditTrail: '/v1',
            chatBot: '/v1',
            multiClient: '/v1',
            analytic: '/v1',
            taskManager: '/v1',
            fm: '/v1',
            workflow: '/v2',
            reports: '/v2',
            generate: '/v1',
            artifactName: '/v1'
        }
    },
    charting: {
        chart_url: 'https://3hdl9kz195.execute-api.eu-west-2.amazonaws.com/dev/tpip/v1/dashboard/getSchemeChartData',
        user_name: 'demo_user',
        auth_token: 'hggjdsoijgoi235u92ujdjsljg',
        tenant: 'LGIM'
    },
    recaptchaKey: '6LdtOB8fAAAAAPPqIXVcT2TRg2mUCLnPMPi4gjho',
    bucket: 'tpip-venus-vpen-upload',
    publicBucket: 'tpip-venus-vpen-public',
    generateBucket: 'vpen-fu-lgim-eu-west-2',
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
        guestUser: 'agreements/LGIM%2B_%2BEXCUBED%2B-%2BGuest%2BTCs%2B-%2B20.02.2020(111712413.2).pdf',
        registeredUser: 'agreements/LGIM%2B_%2BEXCUBED%2B-%2BRegistered%2BUser%2BTCs%2B-%2B20.02.2020(111711417.3).pdf'
    },
    landingPageDomainMap: lpDomainMap
};
