import { GET_DOCUMENT_CONFIG_INPROGRESS, GET_DOCUMENT_CONFIG_SUCCESS, GET_DOCUMENT_CONFIG_FAILED } from '../constants';

const initialStateDocumentConfig = {
    document_config: null,
    document_config_inProgress: false,
    document_config_error: null
};

export default function documentDirectoryReducer(state = { ...initialStateDocumentConfig }, action = {}) {
    switch (action.type) {
        case GET_DOCUMENT_CONFIG_INPROGRESS:
            return {
                ...state,
                document_config: null,
                document_config_inProgress: true,
                document_config_error: null
            };

        case GET_DOCUMENT_CONFIG_SUCCESS:
            return {
                ...state,
                document_config: action.result.data.content,
                document_config_inProgress: false,
                document_config_error: null
            };

        case GET_DOCUMENT_CONFIG_FAILED:
            return {
                ...state,
                document_config: null,
                document_config_inProgress: false,
                document_data_error: action.error
            };

        default:
            return state;
    }
}
