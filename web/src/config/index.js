import defaultConfig from './default';
import qaConfig from './qa';
import ditConfig from './dit';
import stagingConfig from './staging';
import localConfig from './local';
import uatConfig from './uat';
import vpenConfig from './vpen';

const env = process.env.REACT_APP_STAGE;
const envConfig =
    env === 'staging'
        ? stagingConfig
        : env === 'qa'
        ? qaConfig
        : env === 'dit'
        ? ditConfig
        : env === 'local'
        ? localConfig
        : env === 'uat'
        ? uatConfig
                        : env === 'vpen'
                            ? vpenConfig
        : null;
export default {
    ...defaultConfig,
    ...envConfig
};
