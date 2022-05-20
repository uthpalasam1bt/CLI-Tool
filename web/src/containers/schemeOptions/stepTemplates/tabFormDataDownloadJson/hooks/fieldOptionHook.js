/* 
this hook can be used to append the upload configuration to the json configuration fields 
*/
import config from 'appConfig';
const { rip } = config.uploads;

export const fieldOptionHook = data => {
    return {
        sampleCsv_options: {
            accept: '.csv',
            manual: true,
            block: data.screen === 'reqip',
            url: rip.deficitContribution,
            params: [data.schemeId, 'data[PROPOSAL_NAME]']
        }
    };
};
