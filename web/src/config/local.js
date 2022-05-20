const lpDomainMap = require('./lpDomainMap');
const UploadPaths = require('./uploadPaths');

const awsPrefix = 'dev';
module.exports = {
    appName: 'TPIP',
    env: 'dev',
    api: {
        domains: {
            user: `https://hou8w349f9.execute-api.eu-west-2.amazonaws.com/${awsPrefix}`,
            contactUs: `https://ifqsoln7c9.execute-api.eu-west-2.amazonaws.com/${awsPrefix}`,
            scheme: 'http://localhost:3000',
            initialProposal: `https://36tcugxbpk.execute-api.eu-west-2.amazonaws.com/${awsPrefix}`,
            iaa: `https://g1kofqmq2g.execute-api.eu-west-2.amazonaws.com/${awsPrefix}`,
            utility: `https://27xahys1m0.execute-api.eu-west-2.amazonaws.com/${awsPrefix}`,
            comment: `https://vpb0pjadwa.execute-api.eu-west-2.amazonaws.com/${awsPrefix}`,
            notification: `https://lo6vinhpr6.execute-api.eu-west-2.amazonaws.com/${awsPrefix}`,
            assetManagement: `https://wtc7oy4xd0.execute-api.eu-west-2.amazonaws.com/${awsPrefix}`,
            dashboard: `https://m35dcydm57.execute-api.eu-west-2.amazonaws.com/${awsPrefix}`,
            public: `https://tpip-public.s3.eu-west-2.amazonaws.com/${awsPrefix}`,
            tasks: `https://2vnjyoi571.execute-api.eu-west-2.amazonaws.com/${awsPrefix}`,
            documentInfo: `https://27xahys1m0.execute-api.eu-west-2.amazonaws.com/${awsPrefix}`,
            claims: `https://10nd3agr5h.execute-api.eu-west-2.amazonaws.com/${awsPrefix}`,
            activeWorkFlow: `https://6asrgt62bb.execute-api.eu-west-2.amazonaws.com/${awsPrefix}`,
            reports: `https://zqd45iu5z4.execute-api.eu-west-2.amazonaws.com/${awsPrefix}`,
            taskManager: 'https://2bdqabirpj.execute-api.eu-west-2.amazonaws.com'
        },
        prefix: '/tpip/v1'
    },
    recaptchaKey: '6Ld7I5YUAAAAAFoZCSfweGZIJ9fJ8tXp0jk9zGEd',
    bucket: 'tpip-venus-dev-upload',
    publicBucket: 'tpip-public',
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
