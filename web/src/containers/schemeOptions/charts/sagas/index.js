import { takeEvery, put, call, all, select } from 'redux-saga/effects';
import moment from 'moment';
import { getError } from 'helpers/apiHelper';
import NotificationHelper from 'helpers/NotificationHelper';
import { LOAD_CHART_DATA_ERROR } from 'config/constants';
import apiHandler from 'middlewares/connectApi';

import {
    getChartDataError,
    getChartData,
    getChartDateListSucccess,
    getChartListSucccess,
    executeStepfunctionError,
    generateChartsDocumentSucccess,
    generateChartsDocumentError,
    generateAdHocReportSucccess,
    generateAdHocReportError
} from '../actions';

import {
    GET_CHART_BY_PAGE,
    CHART_PAGES,
    GET_DATE_LIST_REQUEST,
    EXECUTE_STEP_FUNCTION_REQUEST,
    GENERATE_CHARTS_DOCUMENT_REQUEST,
    GENERATE_ADHOC_REPORT_REQUEST
} from '../constants';
import { USER_CHART_LIST } from '../constants';

const getChartTypeList = state => state.dashboardRearrangeReducer.visibleChartIds;

export function* getChartDateList(action) {
    try {
        const activationCode =
            action && action.payload && action.payload.activationCode ? action.payload.activationCode : null;
        const result = yield call(apiHandler.geDateList, { activationCode });

        if (result && result.data && result.data.content[0] && result.data.content[0].data) {
            yield put(getChartDateListSucccess(result.data.content[0].data));
        }
    } catch (error) {
        // console.log('error', error);
    }
}

export function* getChartByPage(action) {
    try {
        const { userEmail, schemeId } = action;
        const data = {
            payload: {
                schemeId,
                userEmail
            }
        };
        const { data: result = {} } = yield call(apiHandler.getChartList, data);
        const { data: user_chart_list = {} } = yield call(apiHandler.getChartListByScheme, { schemeId });
        const chartData = result.content && result.content.chartsList ? result.content.chartsList : user_chart_list.content;
        yield put(getChartListSucccess(chartData));

        const chartList = yield select(getChartTypeList);

        const chartToLoad = CHART_PAGES[action.payload];
        const [from, to] = action.date;
        if (!action.date || !from || !to) {
            NotificationHelper.getInstance().warning('Please select both start and end date to load data');
        } else {
            const fromDate = moment(from).format('MM/DD/YYYY');
            const toDate = moment(to).format('MM/DD/YYYY');
            yield all(
                chartToLoad.charts.map(chartIndex => {
                    const data = {
                        schemeId: action.schemeId,
                        userEmail: action.userEmail,

                        fromDate,
                        toDate
                    };
                    return put(getChartData(data, chartList[chartIndex]));
                })
            );
        }
    } catch (error) {
        const errorObj = getError(error, LOAD_CHART_DATA_ERROR);
        yield put(getChartDataError(errorObj));
        NotificationHelper.getInstance().error(errorObj.message);
    }
}

export function* executeStepfunction(action) {
    try {
        const { payload } = action;

        yield call(apiHandler.executeStepfunction, payload);
        //yield put(executeStepfunctionSuccess(true));
    } catch (error) {
        yield put(executeStepfunctionError(true));
        // NotificationHelper.getInstance().error('Step function execution failed');
    }
}

// Handles sending dashboard charts document generation request
export function* generateChartsDocument(action) {
    try {
        const { payload, refreshCallBack } = action;
        const result = yield call(apiHandler.requestActiveSchemeChartsDocumentGeneration, payload);
        yield put(generateChartsDocumentSucccess(result));
        refreshCallBack();
    } catch (error) {
        yield put(generateChartsDocumentError(error));
        NotificationHelper.getInstance().error('Failed to send the request.');
    }
}

// Handles sending dashboard ad hoc report generation request
export function* generateAdHocReport(action) {
    try {
        const { payload, refreshCallBack } = action;
        const result = yield call(apiHandler.requestActiveSchemeAdHocReportGeneration, payload);
        yield put(generateAdHocReportSucccess(result));
        refreshCallBack();
    } catch (error) {
        yield put(generateAdHocReportError(error));
        NotificationHelper.getInstance().error('Failed to send the request.');
    }
}

export default function* dashbaordSagas() {
    yield* [
        takeEvery(GET_CHART_BY_PAGE, getChartByPage),
        takeEvery(GET_DATE_LIST_REQUEST, getChartDateList),
        takeEvery(EXECUTE_STEP_FUNCTION_REQUEST, executeStepfunction),
        takeEvery(GENERATE_CHARTS_DOCUMENT_REQUEST, generateChartsDocument),
        takeEvery(GENERATE_ADHOC_REPORT_REQUEST, generateAdHocReport)
    ];
}
