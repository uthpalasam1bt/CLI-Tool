module.exports = {
    env: 'stage',
    api: {
        domains: {
            user: 'https://i5cgy6st3k.execute-api.eu-west-2.amazonaws.com',
            contactUs: 'https://816vct0n19.execute-api.eu-west-2.amazonaws.com',
            scheme: 'https://63s081q0bj.execute-api.eu-west-2.amazonaws.com',
            initialProposal: 'https://ku6utaoopk.execute-api.eu-west-2.amazonaws.com',
            iaa: 'https://jy9al32vi3.execute-api.eu-west-2.amazonaws.com',
            utility: 'https://wrmnut5ez9.execute-api.eu-west-2.amazonaws.com',
            comment: 'https://rpx6slree6.execute-api.eu-west-2.amazonaws.com',
            notification: 'https://w8zrb6gz5i.execute-api.eu-west-2.amazonaws.com',
            assetManagement: 'https://8ac1f7pti7.execute-api.eu-west-2.amazonaws.com',
            managerTermination: 'https://63s081q0bj.execute-api.eu-west-2.amazonaws.com',
            dashboard: 'https://8pigyld8jb.execute-api.eu-west-2.amazonaws.com',
            activeWorkFlow: 'https://6asrgt62bb.execute-api.eu-west-2.amazonaws.com'
        },
        prefix: '/stage/tpip',
        apiVersion: {
            user: '/v1',
            contactUs: '/v1',
            scheme: '/v1',
            initialProposal: '/v1',
            iaa: '/v1',
            notification: '/v1',
            utility: '/v1',
            comment: '/v1',
            activeWorkFlow: '/v1'
        }
    },
    bucket: 'tpip-upload-prod'
};
