import {
    GET_INFORMATION_DIRECTORY_CONFIG_INPROGRESS,
    GET_INFORMATION_DIRECTORY_CONFIG_SUCCESS,
    GET_INFORMATION_DIRECTORY_CONFIG_FAILED,
    INFORMATION_DIRECTORY_CONFIG_RESET,
    GET_INFORMATION_DIRECTORY_DATA_SUCCESS,
    GET_INFORMATION_DIRECTORY_DATA_FAILED,
    GET_INFORMATION_DIRECTORY_DATA_INPROGRESS,
    GET_INFORMATION_DIRECTORY_DATA_RESET
} from '../constants';

const initialStateInformationDirectoryConfig = {
    information_directory_config: null,
    information_directory_config_inProgress: true,
    information_directory_config_error: null,
    information_directory_form_data: null,
    information_directory_form_data_inProgress: true,
    information_directory_form_data_error: null
};

export default function informationDirectoryReducer(
    state = { ...initialStateInformationDirectoryConfig },
    action = {}
) {
    switch (action.type) {
        case GET_INFORMATION_DIRECTORY_CONFIG_INPROGRESS:
            return {
                ...state,
                information_directory_config: null,
                information_directory_config_inProgress: false,
                information_directory_config_error: null
            };
        case GET_INFORMATION_DIRECTORY_CONFIG_SUCCESS:
            return {
                ...state,
                information_directory_config: action.result.data.content,
                information_directory_config_inProgress: false,
                information_directory_config_error: null
            };
        case GET_INFORMATION_DIRECTORY_CONFIG_FAILED:
        case INFORMATION_DIRECTORY_CONFIG_RESET:
            return {
                ...state,
                information_directory_config: null,
                information_directory_config_inProgress: false,
                information_directory_config_error: action.error
            };
        case GET_INFORMATION_DIRECTORY_DATA_INPROGRESS:
            return {
                ...state,
                information_directory_form_data: null,
                information_directory_form_data_inProgress: false,
                information_directory_form_data_error: null
            };
        case GET_INFORMATION_DIRECTORY_DATA_SUCCESS:
            return {
                ...state,
                information_directory_form_data: action.result.data.content,
                information_directory_form_data_inProgress: false,
                information_directory_form_data_error: null
            };
        case GET_INFORMATION_DIRECTORY_DATA_FAILED:
        case GET_INFORMATION_DIRECTORY_DATA_RESET:
            return {
                ...state,
                information_directory_form_data: null,
                information_directory_form_data_inProgress: false,
                information_directory_form_data_error: action.error
            };

        default:
            return state;
    }
}
