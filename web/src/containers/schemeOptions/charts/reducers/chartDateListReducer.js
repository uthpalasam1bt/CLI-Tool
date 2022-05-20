import { GET_DATE_LIST_REQUEST_SUCCESS, GET_DATE_LIST_REQUEST } from '../constants';
const intialState = {
    chartDateList: [],
    isLoading: false
};
const chartDateListReducer = (state = intialState, action) => {
    switch (action.type) {
        case GET_DATE_LIST_REQUEST: {
            return {
                ...state,
                isLoading: true
            };
        }
        case GET_DATE_LIST_REQUEST_SUCCESS:
            return {
                ...state,
                chartDateList: action.payload,
                isLoading: false
            };

        default:
            return state;
    }
};

export default chartDateListReducer;
export const getChartDateListFromReducer = state => {
    return state.chartDateList;
};
