import { GET_REPORT_CONFIG_INPROGRESS, GET_REPORT_CONFIG_SUCCESS, GET_REPORT_CONFIG_FAILED } from '../constants';

const initialStateReportConfig = {
    report_config: null,
    report_config_inProgress: false,
    report_config_error: null
};

export default function reportDirectoryReducer(state = { ...initialStateReportConfig }, action = {}) {
    switch (action.type) {
        case GET_REPORT_CONFIG_INPROGRESS:
            return {
                ...state,
                report_config: null,
                report_config_inProgress: true,
                report_config_error: null
            };

        case GET_REPORT_CONFIG_SUCCESS:
            return {
                ...state,
                report_config: action.result.data.content,
                report_config_inProgress: false,
                report_config_error: null
            };

        case GET_REPORT_CONFIG_FAILED:
            return {
                ...state,
                report_config: null,
                report_config_inProgress: false,
                report_config_error: action.error
            };

        default:
            return state;
    }
}
