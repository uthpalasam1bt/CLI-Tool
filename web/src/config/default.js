const lpDomainMap = require('./lpDomainMap');
const UploadPaths = require('./uploadPaths');

module.exports = {
    appName: 'TPIP',
    env: 'dev',
    api: {
        domains: {
            user: 'https://sk8kbb5mq8.execute-api.eu-west-2.amazonaws.com',
            contactUs: 'https://dj16y85sxf.execute-api.eu-west-2.amazonaws.com',
            scheme: 'https://eslz0acezi.execute-api.eu-west-2.amazonaws.com',
            workflow: 'https://715nj5gok4.execute-api.eu-west-2.amazonaws.com',
            initialProposal: 'https://uf1ioiod15.execute-api.eu-west-2.amazonaws.com',
            iaa: 'https://rhmnla5ci4.execute-api.eu-west-2.amazonaws.com',
            utility: 'https://gclr72tpkk.execute-api.eu-west-2.amazonaws.com',
            comment: 'https://hqcrdm5ikb.execute-api.eu-west-2.amazonaws.com',
            notification: 'https://lo6vinhpr6.execute-api.eu-west-2.amazonaws.com',
            assetManagement: 'https://n72jjqb775.execute-api.eu-west-2.amazonaws.com',
            dashboard: 'https://a4y8cvzev6.execute-api.eu-west-2.amazonaws.com',
            public: 'http://user-dev-tpip.net.s3-website.eu-west-2.amazonaws.com',
            tasks: 'https://96ms59zgbc.execute-api.eu-west-2.amazonaws.com',
            documentInfo: 'https://gclr72tpkk.execute-api.eu-west-2.amazonaws.com',
            activeWorkFlowContainer: 'https://715nj5gok4.execute-api.eu-west-2.amazonaws.com',
            activeWorkFlows: 'https://715nj5gok4.execute-api.eu-west-2.amazonaws.com', // NEW base URL for ActiveWorkflow releated Data saves
            auditTrail: 'https://otmnla8xv6.execute-api.eu-west-2.amazonaws.com',
            reports: 'https://zqd45iu5z4.execute-api.eu-west-2.amazonaws.com',
            chatBot: 'https://2aeqpxbl5d.execute-api.eu-west-2.amazonaws.com',
            multiClient: 'https://r40kyz80yg.execute-api.eu-west-2.amazonaws.com',
            analytic: 'https://63fdax1n7e.execute-api.eu-west-2.amazonaws.com',
            taskManager: 'https://2bdqabirpj.execute-api.eu-west-2.amazonaws.com',
            fm: 'https://gclr72tpkk.execute-api.eu-west-2.amazonaws.com',
            artifactName: 'https://vpvjq1gdc8.execute-api.eu-west-2.amazonaws.com',
            generate: 'https://l9edo2kflf.execute-api.eu-west-2.amazonaws.com'
        },
        prefix: '/dev/tpip',
        apiVersion: {
            user: '/v2',
            contactUs: '/v1',
            scheme: '/v2',
            workflow: '/v2',
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
            artifactName: '/v1',
            generate: '/v1',
            reports: '/v2'
        }
    },
    charting: {
        chart_url: 'https://3hdl9kz195.execute-api.eu-west-2.amazonaws.com/dev/tpip/v1/dashboard/getSchemeChartData',
        user_name: 'demo_user',
        auth_token: 'hggjdsoijgoi235u92ujdjsljg',
        tenant: 'LGIM'
    },
    recaptchaKey: '6Lfb7QccAAAAAENaFV7-oCbT_7B2bIC5XrXYoGKz',
    bucket: 'tpip-venus-dev-upload',
    publicBucket: 'tpip-venus-dev-public',
    generateBucket: 'dev-fu-lgim-eu-west-2',
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
