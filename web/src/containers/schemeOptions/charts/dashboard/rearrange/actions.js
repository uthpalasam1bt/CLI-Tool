import { UPDATE_CHART_LIST_REQUEST, UPDATE_CHART_LIST_SUCCESS } from './constants';

export const updateChartList = (payload, schemeId, userEmail, chartArray, preLiabilityFlag) => ({
    type: UPDATE_CHART_LIST_REQUEST,
    payload,
    schemeId,
    userEmail,
    chartArray,
    preLiabilityFlag
});

export const updateChartListSucccess = result => ({
    type: UPDATE_CHART_LIST_SUCCESS,
    result
});
