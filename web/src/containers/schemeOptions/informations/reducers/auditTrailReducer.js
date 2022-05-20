import {
    GET_AUDIT_TRAIL_DATA_INPROGRESS,
    GET_AUDIT_TRAIL_DATA_SUCCESS,
    GET_AUDIT_TRAIL_DATA_FAILED
} from '../constants';

const initialState = {
    audit_trail_data: null,
    audit_trail_data_inProgress: false,
    audit_trail_data_error: null
};

export default function auditTrailReducer(state = { ...initialState }, action) {
    switch (action.type) {
        case GET_AUDIT_TRAIL_DATA_INPROGRESS:
            return {
                ...state,
                audit_trail_data_inProgress: true
            };

        case GET_AUDIT_TRAIL_DATA_SUCCESS:
            return {
                ...state,
                audit_trail_data: action.result.data.content,
                audit_trail_data_inProgress: false
            };

        case GET_AUDIT_TRAIL_DATA_FAILED:
            return { ...state, audit_trail_data_error: action.error };

        default:
            return state;
    }
}
