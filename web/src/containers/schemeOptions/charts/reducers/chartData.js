import { GET_CHART_REQUEST, GET_CHART_SUCCESS, GET_CHART_ERROR, CLEAR_CHARTS } from '../constants';

const initialState = {
    charts: {}
};

const getChartData = (state, action) => {
    if (action.type !== GET_CHART_SUCCESS) return state;

    return {
        ...state,
        [action.chartKey]: action.result.data
    };
};

const loadingReducer = (state, action) => {
    switch (action.type) {
        case GET_CHART_REQUEST:
            return true;
        case GET_CHART_SUCCESS:
        case GET_CHART_ERROR:
            return false;
        default:
            return state[action.chartKey];
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CLEAR_CHARTS:
            return initialState;
        default:
            if (!action.chartKey) {
                return state;
            }
            return {
                ...state,
                charts: getChartData(state.charts, action),
                loaders: {
                    ...state.loaders,
                    [action.chartKey]: loadingReducer(state.loaders, action)
                }
            };
    }
};

export default reducer;
