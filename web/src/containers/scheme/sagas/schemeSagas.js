import { takeEvery, put, call } from 'redux-saga/effects';
import {
    DO_CREATE_SCHEME_REQUEST,
    GET_SCHEMES_REQUEST,
    GET_SCHEME_REQUEST,
    DO_UPDATE_IS_FAVOURITE_REQUEST,
    DO_UPDATE_SCHEME_FLAG_REQUEST
} from '../constants';
import {
    doCreateSchemeInProgress,
    doCreateSchemeSuccess,
    doCreateSchemeFailed,
    getSchemesInProgress,
    getSchemesSuccess,
    getSchemesFailed,
    getSchemeInProgress,
    getSchemeSuccess,
    getSchemeFailed,
    doUpdateIsFavouriteInProgress,
    doUpdateIsFavouriteSuccess,
    doUpdateIsFavouriteFailed,
    doUpdateSchemeFlagInProgress,
    doUpdateSchemeFlagSuccess,
    doUpdateSchemeFlagFailed
} from '../actions/schemeActions';
import { filterSchemes } from '../keyMetrics/actions/keyMetricsActions';
import apiHandler from '../../../middlewares/connectApi';
import activeApiHandler from '../../../middlewares/activeConnectApi';
import { getError } from '../../../helpers/apiHelper';
import AwsIotSingleton from '../../../helpers/awsIot';
import { IOT_TYPES } from '..';
import {
    CREATE_SCHEME_FAILED,
    SCHEME_FETCHING_FAILED,
    SCHEME_SPESIFIC_FETCHING_FAILED,
    SCHEME_UPDATE_FAILED
} from '../../../config/constants';

const sortByDate = (a, b) => {
    return new Date(b.createdDateTime) - new Date(a.createdDateTime);
};

export function* createScheme(data) {
    const { callback } = data;
    try {
        yield put(doCreateSchemeInProgress());
        const result = yield call(apiHandler.createScheme, data);
        yield put(doCreateSchemeSuccess(result));
        AwsIotSingleton.publishPayloadWithinSocket(`/schemes`, { type: IOT_TYPES.SCHEMES_REFRESH });
        if (callback) callback(false, result.data.message);
        if (data.payload.selectedView && data.payload.filterData) {
            yield put(filterSchemes({ columns: data.payload.filterData }));
        } else {
            yield put(filterSchemes({ all: true }));
        }
    } catch (error) {
        const errorObj = getError(error, CREATE_SCHEME_FAILED);
        yield put(doCreateSchemeFailed(errorObj));
        if (callback) callback(true, errorObj.message);
    }
}

export function* getSchemes(data) {
    try {
        yield put(getSchemesInProgress());
        const result = yield call(apiHandler.getSchemes, data);
        const resultData = {
            inProgressSchemes: result.data.content.inProgressSchemesMap.sort(sortByDate),
            activeSchemes: result.data.content.activeSchemes
        };
        yield put(getSchemesSuccess(resultData));
    } catch (error) {
        const errorObj = getError(error, SCHEME_FETCHING_FAILED);
        yield put(getSchemesFailed(errorObj));
    }
}

export function* getScheme(data) {
    try {
        yield put(getSchemeInProgress());
        const result = yield call(apiHandler.getSchemeByName, data);
        yield put(getSchemeSuccess(result));
    } catch (error) {
        console.log('get scheme data error');
        const errorObj = getError(error, SCHEME_SPESIFIC_FETCHING_FAILED);
        yield put(getSchemeFailed(errorObj));
    }
}

export function* updateSchemeIsFavourite(data) {
    const { callback, payload } = data;
    try {
        yield put(doUpdateIsFavouriteInProgress());
        const result = yield call(apiHandler.updateIsFavourite, data);
        yield put(doUpdateIsFavouriteSuccess(result));

        if (payload.columns && payload.valuationDate) {
            yield put(filterSchemes({ columns: payload.columns, valuationDate: payload.valuationDate }));
        } else if (payload.columns) {
            yield put(filterSchemes({ columns: payload.columns }));
        } else if (payload.valuationDate) {
            yield put(filterSchemes({ all: true, valuationDate: payload.valuationDate }));
        } else {
            yield put(filterSchemes({ all: true }));
        }

        if (callback) callback(false, result.data.message);
    } catch (error) {
        const errorObj = getError(error, SCHEME_UPDATE_FAILED);
        yield put(doUpdateIsFavouriteFailed(errorObj));
        if (callback) callback(true, SCHEME_UPDATE_FAILED);
    }
}

export function* updateSchemeFlag(data) {
    const { callback } = data;
    try {
        yield put(doUpdateSchemeFlagInProgress());
        const result = yield call(activeApiHandler.updateSchemeFlag, data);
        yield put(doUpdateSchemeFlagSuccess(result));
        if (callback) callback(false, result.data.message);
    } catch (error) {
        const errorObj = getError(error, SCHEME_UPDATE_FAILED);
        yield put(doUpdateSchemeFlagFailed(errorObj));
        if (callback) callback(true, SCHEME_UPDATE_FAILED);
    }
}

export default function* schemeSagas() {
    yield* [
        takeEvery(DO_CREATE_SCHEME_REQUEST, createScheme),
        takeEvery(GET_SCHEMES_REQUEST, getSchemes),
        takeEvery(GET_SCHEME_REQUEST, getScheme),
        takeEvery(DO_UPDATE_IS_FAVOURITE_REQUEST, updateSchemeIsFavourite),
        takeEvery(DO_UPDATE_SCHEME_FLAG_REQUEST, updateSchemeFlag)
    ];
}
