const lpDomainMap = require('./lpDomainMap');
const UploadPaths = require('./uploadPaths');

module.exports = {
    appName: 'TPIP',
    env: 'uat',
    api: {
        domains: {
            user: 'https://egasqbd1ai.execute-api.eu-west-2.amazonaws.com',
            contactUs: 'https://dj16y85sxf.execute-api.eu-west-2.amazonaws.com',
            scheme: 'https://yivf1fgh1h.execute-api.eu-west-2.amazonaws.com',
            initialProposal: 'https://uf1ioiod15.execute-api.eu-west-2.amazonaws.com',
            utility: 'https://abrmgogte4.execute-api.eu-west-2.amazonaws.com',
            comment: 'https://hqcrdm5ikb.execute-api.eu-west-2.amazonaws.com',
            notification: 'https://pfj517fas3.execute-api.eu-west-2.amazonaws.com',
            assetManagement: 'https://n72jjqb775.execute-api.eu-west-2.amazonaws.com',
            dashboard: 'https://8zqsvnwa5e.execute-api.eu-west-2.amazonaws.com',
            public: 'http://user-dev-tpip.net.s3-website.eu-west-2.amazonaws.com',
            tasks: 'https://yzbo9qndfi.execute-api.eu-west-2.amazonaws.com',
            documentInfo: 'https://abrmgogte4.execute-api.eu-west-2.amazonaws.com',
            activeWorkFlowContainer: 'https://715nj5gok4.execute-api.eu-west-2.amazonaws.com',
            activeWorkFlows: 'https://715nj5gok4.execute-api.eu-west-2.amazonaws.com', // NEW base URL for ActiveWorkflow releated Data saves
            auditTrail: 'https://fal12h7qmj.execute-api.eu-west-2.amazonaws.com',
            reports: 'https://5fty7ygcm3.execute-api.eu-west-2.amazonaws.com',
            chatBot: 'https://2aeqpxbl5d.execute-api.eu-west-2.amazonaws.com',
            multiClient: 'https://r40kyz80yg.execute-api.eu-west-2.amazonaws.com',
            analytic: 'https://qhjl16o524.execute-api.eu-west-2.amazonaws.com',
            taskManager: 'https://vwitbnepfb.execute-api.eu-west-2.amazonaws.com',
            fm: 'https://abrmgogte4.execute-api.eu-west-2.amazonaws.com',
            workflow: 'https://4i57ul1yw3.execute-api.eu-west-2.amazonaws.com',
            artifactName: 'https://vlhq0wdy9f.execute-api.eu-west-2.amazonaws.com',
            generate: 'https://20u6aj442d.execute-api.eu-west-2.amazonaws.com'
        },
        prefix: '/uat/tpip',
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
    bucket: 'tpip-venus-uat-upload',
    publicBucket: 'tpip-venus-uat-public',
    generateBucket: 'uat-fu-lgim-eu-west-2',
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
