import _ from 'lodash';
import { takeEvery, put, call } from 'redux-saga/effects';
import { getError } from 'helpers/apiHelper';
import NotificationHelper from 'helpers/NotificationHelper';
import apiHandler from 'middlewares/connectApi';
import { LOAD_CHART_LIST_ERROR, UPDATE_CHART_ERROR } from 'config/constants';

import { getChartListSucccess, getChartListError } from '../../actions';

import { GET_CHART_LIST_REQUEST } from '../../constants';
import { UPDATE_CHART_LIST_REQUEST } from './constants';
import { USER_CHART_LIST, GET_LIABILITY_FLAGS_SUCCESS } from '../../constants';

const selectChartLayout = (liabilityFlag, userChartList) => {
    if (liabilityFlag === 'Y') {
        const sortedItem = userChartList.sort(function(a, b) {
            return a.LiabilityFlagYesOder - b.LiabilityFlagYesOder;
        });

        return sortedItem.map(item => {
            if (!item.LiabilityFlagValueForShow.includes('Y')) {
                item.show = false;
            } else {
                item.show = true;
            }
            return item;
        });
    } else if (liabilityFlag === 'N') {
        const sortedItem = userChartList.sort(function(a, b) {
            return a.LiabilityFlagNoOder - b.LiabilityFlagNoOder;
        });

        return sortedItem.map(item => {
            if (!item.LiabilityFlagValueForShow.includes('N')) {
                item.show = false;
            } else {
                item.show = true;
            }

            return item;
        });
    }
};

export function* getChartList(action) {
    let chartData = null;
    try {
        const { data: result = {} } = yield call(apiHandler.getChartList, action);
        const { data: userChartList = {} } = yield call(apiHandler.getChartListByScheme, {
            schemeId: action.payload.schemeId
        });

        let preLiabilityFlag = _.get(result, 'content.preLiabilityFlag', null);
        const liabilityFlag = _.get(result, 'content.newLiabilityFlag');
        const chartsList = _.get(result, 'content.chartsList', null);

        if (chartsList && preLiabilityFlag !== liabilityFlag) {
            chartData = selectChartLayout(liabilityFlag, userChartList.content);
            preLiabilityFlag = liabilityFlag;
        } else if (chartsList && preLiabilityFlag === liabilityFlag) {
            chartData = result.content.chartsList;
        } else if (!chartsList) {
            preLiabilityFlag = liabilityFlag;
            chartData = selectChartLayout(liabilityFlag, userChartList.content);
        }
        if (preLiabilityFlag) yield put({ type: GET_LIABILITY_FLAGS_SUCCESS, result: { preLiabilityFlag } });

        yield put(getChartListSucccess(chartData));
    } catch (error) {
        const errorObj = getError(error, LOAD_CHART_LIST_ERROR);
        yield put(getChartListError(errorObj));
        NotificationHelper.getInstance().error(errorObj.message);
    }
}

export function* updateChartList(action) {
    try {
        const { schemeId, userEmail, chartArray, preLiabilityFlag } = action;

        const data = {
            schemeId,
            userEmail,
            chartsList: chartArray.filter(i => !(i === null || i === undefined)),
            ...preLiabilityFlag
        };
        yield call(apiHandler.updateChartsList, data);
    } catch (error) {
        const errorObj = getError(error, UPDATE_CHART_ERROR);
        NotificationHelper.getInstance().error(errorObj.message);
    }
}

export default function* dashbaordRearrangeSagas() {
    yield* [takeEvery(GET_CHART_LIST_REQUEST, getChartList), takeEvery(UPDATE_CHART_LIST_REQUEST, updateChartList)];
}
