import {
    GET_DOCUMENT_DATA_INPROGRESS,
    GET_DOCUMENT_DATA_SUCCESS,
    GET_DOCUMENT_DATA_FAILED,
    GET_SELECTED_DOCUMENT_DATA_INPROGRESS,
    GET_SELECTED_DOCUMENT_DATA_SUCCESS,
    GET_SELECTED_DOCUMENT_DATA_FAILED
} from './constants';

const initialStateDocuments = {
    document_data: null,
    document_data_inProgress: false,
    document_data_error: null
};

const initialStateSelectedDocuments = {
    selected_document_data_inProgress: false,
    selected_document_data: null,
    selected_document_data_error: null
};

export default function informationDocumentReducer(
    state = { ...initialStateDocuments, ...initialStateSelectedDocuments },
    action = {}
) {
    switch (action.type) {
        case GET_DOCUMENT_DATA_INPROGRESS:
            return {
                ...state,
                ...initialStateDocuments,

                document_data_inProgress: true,
                document_data: null,
                selected_document_data: null
            };

        case GET_DOCUMENT_DATA_SUCCESS:
            return { ...state, ...initialStateDocuments, document_data: action.result.data.content };

        case GET_DOCUMENT_DATA_FAILED:
            return { ...state, ...initialStateDocuments, document_data_error: action.error };

        case GET_SELECTED_DOCUMENT_DATA_INPROGRESS:
            return {
                ...state,
                ...initialStateSelectedDocuments,

                selected_document_data_inProgress: true,
                selected_document_data: null
            };

        case GET_SELECTED_DOCUMENT_DATA_SUCCESS:
            return {
                ...state,
                ...initialStateSelectedDocuments,

                selected_document_data: action.result.data.content
            };

        case GET_SELECTED_DOCUMENT_DATA_FAILED:
            return {
                ...state,
                ...initialStateSelectedDocuments,

                selected_document_data_error: action.error
            };

        default:
            return state;
    }
}
