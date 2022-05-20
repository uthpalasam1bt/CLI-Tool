import {
    EXECUTE_STEP_FUNCTION_REQUEST,
    EXECUTE_STEP_FUNCTION_SUCCESS,
    EXECUTE_STEP_FUNCTION_ERROR
} from '../constants';
const intialState = {
    isExecuting: false
};
const stepFuctionReducer = (state = intialState, action) => {
    switch (action.type) {
        case EXECUTE_STEP_FUNCTION_REQUEST: {
            return {
                ...state,
                isExecuting: true
            };
        }
        case EXECUTE_STEP_FUNCTION_SUCCESS:
            return {
                isExecuting: false
            };
        case EXECUTE_STEP_FUNCTION_ERROR:
            return {
                isExecuting: true
            };

        default:
            return state;
    }
};

export default stepFuctionReducer;
