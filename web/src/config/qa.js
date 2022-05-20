const lpDomainMap = require('./lpDomainMap');
const UploadPaths = require('./uploadPaths');

module.exports = {
    appName: 'TPIP',
    env: 'qa',

    api: {
        domains: {
            user: 'https://3pdzsg3ih2.execute-api.eu-west-2.amazonaws.com',
            user_v2: 'https://3pdzsg3ih2.execute-api.eu-west-2.amazonaws.com',
            contactUs: 'https://jvpo2lzvjb.execute-api.eu-west-2.amazonaws.com',
            scheme: 'https://42z4vts8od.execute-api.eu-west-2.amazonaws.com',
            initialProposal: 'https://3clwjb2xgd.execute-api.eu-west-2.amazonaws.com',
            iaa: 'https://4fqas0mh4k.execute-api.eu-west-2.amazonaws.com',
            utility: 'https://xy0ye2kna7.execute-api.eu-west-2.amazonaws.com',
            comment: 'https://4g8p8v68ck.execute-api.eu-west-2.amazonaws.com',
            notification: 'https://b4zbl5e31i.execute-api.eu-west-2.amazonaws.com',
            assetManagement: 'https://mq1838dveg.execute-api.eu-west-2.amazonaws.com',
            dashboard: 'https://i9f8sq2s38.execute-api.eu-west-2.amazonaws.com',
            public: 'https://tpip-public.s3.eu-west-2.amazonaws.com',
            tasks: 'https://baoflppdtf.execute-api.eu-west-2.amazonaws.com',
            documentInfo: 'https://xy0ye2kna7.execute-api.eu-west-2.amazonaws.com',
            claims: 'https://l741d241x8.execute-api.eu-west-2.amazonaws.com',
            activeWorkFlowContainer: 'https://1fcrsm23yf.execute-api.eu-west-2.amazonaws.com',
            activeWorkFlows: 'https://vzcn9rybr1.execute-api.eu-west-2.amazonaws.com', // NEW base URL for ActiveWorkflow releated Data saves
            auditTrail: 'https://stzvdoorp1.execute-api.eu-west-2.amazonaws.com',
            reports: 'https://itgpbntr4j.execute-api.eu-west-2.amazonaws.com',
            multiClient: 'https://tku0fkoen9.execute-api.eu-west-2.amazonaws.com',
            chatBot: 'https://thkeaw6or2.execute-api.eu-west-2.amazonaws.com',
            taskManager: 'https://v55257ifz0.execute-api.eu-west-2.amazonaws.com',
            fm: 'https://xy0ye2kna7.execute-api.eu-west-2.amazonaws.com',
            workflow: 'https://4xtdiu13gd.execute-api.eu-west-2.amazonaws.com',
            artifactName: 'https://3xun1f0d2k.execute-api.eu-west-2.amazonaws.com',
            analytic: 'https://vdvc57byt0.execute-api.eu-west-2.amazonaws.com'
        },
        prefix: '/qa/tpip',
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
            chatBot: '/v1',
            taskManager: '/v1',
            fm: '/v1',
            workflow: '/v2',
            artifactName: '/v1',
            reports: '/v2',
            analytic: '/v1'
        }
    },
    recaptchaKey: '6Le7QcYcAAAAAItgHM9GMLZerGwMIooS7ftbVjTY',
    bucket: 'tpip-venus-qa-upload',
    publicBucket: 'tpip-venus-qa-public',
    generateBucket: 'qa-fu-lgim-eu-west-2',
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
