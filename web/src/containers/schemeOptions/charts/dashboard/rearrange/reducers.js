import { combineReducers } from 'redux';

import { UPDATE_CHART_LIST_SUCCESS } from './constants';
import {
    CLEAR_CHARTS,
    GET_CHART_LIST_REQUEST,
    GET_CHART_LIST_SUCCESS,
    GET_CHART_LIST_ERROR,
    GET_LIABILITY_FLAGS_SUCCESS
} from '../../constants';

const loading = (state = false, action) => {
    switch (action.type) {
        case GET_CHART_LIST_REQUEST:
            return true;
        case GET_CHART_LIST_SUCCESS:
        case GET_CHART_LIST_ERROR:
            return false;
        default:
            return state;
    }
};

const chartListById = (state = {}, action) => {
    switch (action.type) {
        case GET_CHART_LIST_SUCCESS:
            return {
                ...action.result.reduce((obj, chart) => {
                    obj[chart.type] = chart;
                    return obj;
                }, {})
            };
        default:
            return state;
    }
};

const visibleChartIds = (state = [], action) => {
    switch (action.type) {
        case CLEAR_CHARTS:
            return [];
        case GET_CHART_LIST_SUCCESS:
            return action.result.map(chart => chart.type);
        case UPDATE_CHART_LIST_SUCCESS:
            return action.result.map(chart => chart.type);
        default:
            return state;
    }
};

const preLiabilityFlag = (state = null, action) => {
    switch (action.type) {
        case GET_LIABILITY_FLAGS_SUCCESS:
            return action.result;
        default:
            return state;
    }
};

const reducer = combineReducers({
    chartListById,
    visibleChartIds,
    loading,
    preLiabilityFlag
});

export default reducer;

export const getChartById = (state, id) => state.chartListById[id];
export const getVisibleChartList = state => {
    return state.visibleChartIds.map(id => getChartById(state, id));
};
