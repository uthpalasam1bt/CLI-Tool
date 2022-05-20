import _ from 'lodash';
import axios from 'axios';
import { put, call, takeLatest, delay } from 'redux-saga/effects';
import {
    getKeyMetricsConfigInProgress,
    getKeyMetricsConfigSuccess,
    getKeyMetricsConfigFailed,
    filterSchemes as fsch,
    filterSchemesInProgress,
    filterSchemesSuccess,
    filterSchemesFailed,
    getMyViews as gmv,
    getMyViewsInProgress,
    getMyViewsSuccess,
    getMyViewsFailed,
    deleteViewInProgress,
    deleteViewSuccess,
    deleteViewFailed,
    saveViewInProgress,
    saveViewSuccess,
    saveViewFailed,
    updateViewInProgress,
    updateViewSuccess,
    updateViewFailed,
    editViewInProgress,
    editViewSuccess,
    editViewFailed,
    schemeDataChangeInProgress,
    schemeDataChangeSuccess,
    schemeDataChangeFailed,
    saveGlobalViewInProgress,
    saveGlobalViewSuccess,
    saveGlobalViewFailed,
    updateGlobalViewInProgress,
    updateGlobalViewSuccess,
    updateGlobalViewFailed,
    editGlobalViewInProgress,
    editGlobalViewSuccess,
    editGlobalViewFailed,
    deleteGlobalViewInProgress,
    deleteGlobalViewSuccess,
    deleteGlobalViewFailed,
    getMyDefaultOrgGroupsInProgress,
    getMyDefaultOrgGroupsSuccess,
    getMyDefaultOrgGroupsFailed,
    getMyCurrentAppliedView as gmcav,
    getMyCurrentAppliedViewInProgress,
    getMyCurrentAppliedViewSuccess,
    getMyCurrentAppliedViewFailed,
    saveMyCurrentAppliedViewInProgress,
    saveMyCurrentAppliedViewSuccess,
    saveMyCurrentAppliedViewFailed,
    removeMyCurrentAppliedViewInProgress,
    removeMyCurrentAppliedViewSuccess,
    removeMyCurrentAppliedViewFailed
} from '../actions/keyMetricsActions';
import apiHandler from '../../../../middlewares/connectApi';
import { getError } from '../../../../helpers/apiHelper';
import {
    GET_KEY_METRICS_CONFIG_ERROR,
    FILTER_SCHEMES_ERROR,
    GET_MY_VIEWS_ERROR,
    DELETE_VIEW_ERROR,
    SAVE_VIEWS_ERROR,
    UPDATE_VIEWS_ERROR,
    EDIT_VIEWS_ERROR,
    SCHEME_DATA_CHANGE_ERROR,
    SAVE_GLOBAL_VIEWS_ERROR,
    UPDATE_GLOBAL_VIEWS_ERROR,
    EDIT_GLOBAL_VIEWS_ERROR,
    DELETE_GLOBAL_VIEW_ERROR,
    GET_MY_DEFAULT_ORG_GROUPS_ERROR,
    GET_MY_CURRENT_APPLIED_VIEW_ERROR,
    SAVE_MY_CURRENT_APPLIED_VIEW_ERROR,
    REMOVE_MY_CURRENT_APPLIED_VIEW_ERROR
} from '../../../../config/constants';

import {
    GET_KEY_METRICS_CONFIG_REQUEST,
    FILTER_SCHEMES_REQUEST,
    GET_MY_VIEWS_REQUEST,
    DELETE_VIEW_REQUEST,
    SAVE_VIEW_REQUEST,
    UPDATE_VIEW_REQUEST,
    EDIT_VIEW_REQUEST,
    SCHEME_DATA_CHANGE_REQUEST,
    SAVE_GLOBAL_VIEW_REQUEST,
    UPDATE_GLOBAL_VIEW_REQUEST,
    EDIT_GLOBAL_VIEW_REQUEST,
    DELETE_GLOBAL_VIEW_REQUEST,
    GET_MY_DEFAULT_ORG_GROUPS_REQUEST,
    GET_MY_CURRENT_APPLIED_VIEW_REQUEST,
    SAVE_MY_CURRENT_APPLIED_VIEW_REQUEST,
    REMOVE_MY_CURRENT_APPLIED_VIEW_REQUEST
} from '../constants';
import NotificationHelper from '../../../../helpers/NotificationHelper';

export function* getKeyMetricsConfig(data = null) {
    try {
        yield put(getKeyMetricsConfigInProgress());
        const result = yield call(apiHandler.getKeyMetricsConfig, data);
        yield put(getKeyMetricsConfigSuccess(result.data.content));
    } catch (e) {
        const errorObj = getError(e, GET_KEY_METRICS_CONFIG_ERROR);
        yield put(getKeyMetricsConfigFailed(errorObj));
        NotificationHelper.getInstance().error(errorObj.message);
    }
}

export function* filterSchemes(data) {
    try {
        yield put(filterSchemesInProgress());

        const result = yield call(apiHandler.filterSchemes, data);

        let schemes = [];

        if (_.has(result, `data.content.url`)) {
            const url = _.get(result, `data.content.url`);
            const signedURLResponse = yield axios.get(url);
            schemes = signedURLResponse.data || [];
        } else {
            schemes = result.data.content;
        }

        yield put(filterSchemesSuccess(schemes));
    } catch (e) {
        const errorObj = getError(e, FILTER_SCHEMES_ERROR);
        yield put(filterSchemesFailed(errorObj));
        NotificationHelper.getInstance().error(errorObj.message);
    }
}

export function* getMyViews(data = null) {
    try {
        yield put(getMyViewsInProgress());
        const result = yield call(apiHandler.getMyViews, data);
        yield put(getMyViewsSuccess(result.data.content));
    } catch (e) {
        const errorObj = getError(e, GET_MY_VIEWS_ERROR);
        yield put(getMyViewsFailed(errorObj));
        NotificationHelper.getInstance().error(errorObj.message);
    }
}

export function* deleteView(data) {
    try {
        yield put(deleteViewInProgress());
        const result = yield call(apiHandler.deleteView, data);
        yield put(deleteViewSuccess(result.data.content));
        yield put(gmv());
        yield put(gmcav());
    } catch (e) {
        const errorObj = getError(e, DELETE_VIEW_ERROR);
        yield put(deleteViewFailed(errorObj));
        NotificationHelper.getInstance().error(errorObj.message);
    }
}

export function* saveView(data) {
    try {
        yield put(saveViewInProgress());
        const result = yield call(apiHandler.saveView, data);
        yield put(saveViewSuccess(result.data.content));
        yield put(gmv());
    } catch (e) {
        const errorObj = getError(e, SAVE_VIEWS_ERROR);
        yield put(saveViewFailed(errorObj));
        NotificationHelper.getInstance().error(errorObj.message);
    }
}

export function* updateView(data) {
    try {
        yield put(updateViewInProgress());
        const result = yield call(apiHandler.updateView, data);
        yield put(updateViewSuccess(result.data.content));
        yield put(gmv());
    } catch (e) {
        const errorObj = getError(e, UPDATE_VIEWS_ERROR);
        yield put(updateViewFailed(errorObj));
        NotificationHelper.getInstance().error(errorObj.message);
    }
}

export function* editView(data) {
    try {
        yield put(editViewInProgress());
        const result = yield call(apiHandler.updateView, data);
        yield put(editViewSuccess(result.data.content));
        yield put(gmv());
    } catch (e) {
        const errorObj = getError(e, EDIT_VIEWS_ERROR);
        yield put(editViewFailed(errorObj));
        NotificationHelper.getInstance().error(errorObj.message);
    }
}

export function* schemeDataChange(data) {
    try {
        yield put(schemeDataChangeInProgress());
        const result = yield call(apiHandler.schemeDataChange, data);
        yield put(schemeDataChangeSuccess(result.data.content));
        yield delay(4000);

        if (data.payload.columns && data.payload.valuationDate) {
            yield put(fsch({ columns: data.payload.columns, valuationDate: data.payload.valuationDate }));
        } else if (data.payload.columns) {
            yield put(fsch({ columns: data.payload.columns }));
        } else if (data.payload.valuationDate) {
            yield put(fsch({ all: true, valuationDate: data.payload.valuationDate }));
        } else {
            yield put(fsch({ all: true }));
        }
    } catch (e) {
        const errorObj = getError(e, SCHEME_DATA_CHANGE_ERROR);
        yield put(schemeDataChangeFailed(errorObj));
        NotificationHelper.getInstance().error(errorObj.message);
    }
}

export function* saveGlobalView(data) {
    try {
        yield put(saveGlobalViewInProgress());
        const result = yield call(apiHandler.saveGlobalView, data);
        yield put(saveGlobalViewSuccess(result.data.content));
        yield put(gmv(data.payload.userType ? { userType: data.payload.userType } : {}));
    } catch (e) {
        const errorObj = getError(e, SAVE_GLOBAL_VIEWS_ERROR);
        yield put(saveGlobalViewFailed(errorObj));
        NotificationHelper.getInstance().error(errorObj.message);
    }
}

export function* updateGlobalView(data) {
    try {
        yield put(updateGlobalViewInProgress());
        const result = yield call(apiHandler.updateGlobalView, data);
        yield put(updateGlobalViewSuccess(result.data.content));
        yield put(gmv(data.payload.userType ? { userType: data.payload.userType } : {}));
    } catch (e) {
        const errorObj = getError(e, UPDATE_GLOBAL_VIEWS_ERROR);
        yield put(updateGlobalViewFailed(errorObj));
        NotificationHelper.getInstance().error(errorObj.message);
    }
}

export function* editGlobalView(data) {
    try {
        yield put(editGlobalViewInProgress());
        const result = yield call(apiHandler.updateGlobalView, data);
        yield put(editGlobalViewSuccess(result.data.content));
        yield put(gmv(data.payload.userType ? { userType: data.payload.userType } : {}));
    } catch (e) {
        const errorObj = getError(e, EDIT_GLOBAL_VIEWS_ERROR);
        yield put(editGlobalViewFailed(errorObj));
        NotificationHelper.getInstance().error(errorObj.message);
    }
}

export function* deleteGlobalView(data) {
    try {
        yield put(deleteGlobalViewInProgress());
        const result = yield call(apiHandler.deleteGlobalView, data);
        yield put(deleteGlobalViewSuccess(result.data.content));
        yield put(gmv(data.payload.userType ? { userType: data.payload.userType } : {}));
        yield put(gmcav());
    } catch (e) {
        const errorObj = getError(e, DELETE_GLOBAL_VIEW_ERROR);
        yield put(deleteGlobalViewFailed(errorObj));
        NotificationHelper.getInstance().error(errorObj.message);
    }
}

export function* getMyDefaultOrgGroups(data) {
    try {
        yield put(getMyDefaultOrgGroupsInProgress());
        const result = yield call(apiHandler.getDefaultOrganizationGroupsByOrgId, data);
        yield put(getMyDefaultOrgGroupsSuccess(result.data.content));
    } catch (e) {
        const errorObj = getError(e, GET_MY_DEFAULT_ORG_GROUPS_ERROR);
        yield put(getMyDefaultOrgGroupsFailed(errorObj));
        NotificationHelper.getInstance().error(errorObj.message);
    }
}

export function* getMyCurrentAppliedView(data = null) {
    try {
        yield put(getMyCurrentAppliedViewInProgress());
        const result = yield call(apiHandler.getMyCurrentAppliedView, data);
        yield put(getMyCurrentAppliedViewSuccess(result.data.content));
    } catch (e) {
        const errorObj = getError(e, GET_MY_CURRENT_APPLIED_VIEW_ERROR);
        yield put(getMyCurrentAppliedViewFailed(errorObj));
        NotificationHelper.getInstance().error(errorObj.message);
    }
}

export function* saveMyCurrentAppliedView(data = null) {
    try {
        yield put(saveMyCurrentAppliedViewInProgress());
        const result = yield call(apiHandler.saveMyCurrentAppliedView, data);
        yield put(saveMyCurrentAppliedViewSuccess(result.data.content));
        yield put(gmcav());
    } catch (e) {
        const errorObj = getError(e, SAVE_MY_CURRENT_APPLIED_VIEW_ERROR);
        yield put(saveMyCurrentAppliedViewFailed(errorObj));
        NotificationHelper.getInstance().error(errorObj.message);
    }
}

export function* removeMyCurrentAppliedView(data = null) {
    try {
        yield put(removeMyCurrentAppliedViewInProgress());
        const result = yield call(apiHandler.removeMyCurrentAppliedView, data);
        yield put(gmcav());
        yield put(removeMyCurrentAppliedViewSuccess(result.data.content));
    } catch (e) {
        const errorObj = getError(e, REMOVE_MY_CURRENT_APPLIED_VIEW_ERROR);
        yield put(removeMyCurrentAppliedViewFailed(errorObj));
        NotificationHelper.getInstance().error(errorObj.message);
    }
}

export default function* keyMetricsSagas() {
    yield* [
        takeLatest(GET_KEY_METRICS_CONFIG_REQUEST, getKeyMetricsConfig),
        takeLatest(FILTER_SCHEMES_REQUEST, filterSchemes),
        takeLatest(GET_MY_VIEWS_REQUEST, getMyViews),
        takeLatest(DELETE_VIEW_REQUEST, deleteView),
        takeLatest(SAVE_VIEW_REQUEST, saveView),
        takeLatest(UPDATE_VIEW_REQUEST, updateView),
        takeLatest(EDIT_VIEW_REQUEST, editView),
        takeLatest(SCHEME_DATA_CHANGE_REQUEST, schemeDataChange),
        takeLatest(SAVE_GLOBAL_VIEW_REQUEST, saveGlobalView),
        takeLatest(UPDATE_GLOBAL_VIEW_REQUEST, updateGlobalView),
        takeLatest(EDIT_GLOBAL_VIEW_REQUEST, editGlobalView),
        takeLatest(DELETE_GLOBAL_VIEW_REQUEST, deleteGlobalView),
        takeLatest(GET_MY_DEFAULT_ORG_GROUPS_REQUEST, getMyDefaultOrgGroups),
        takeLatest(GET_MY_CURRENT_APPLIED_VIEW_REQUEST, getMyCurrentAppliedView),
        takeLatest(SAVE_MY_CURRENT_APPLIED_VIEW_REQUEST, saveMyCurrentAppliedView),
        takeLatest(REMOVE_MY_CURRENT_APPLIED_VIEW_REQUEST, removeMyCurrentAppliedView)
    ];
}
