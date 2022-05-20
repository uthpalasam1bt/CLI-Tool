import { takeEvery, put, call } from 'redux-saga/effects';
import { getError } from '../../../helpers/apiHelper';
import NotificationHelper from '../../../helpers/NotificationHelper';
import reportApi from '../../../middlewares/reportApi';
import {
    getReportTypesSuccess,
    getReportTypesError,
    getUploadReportSchemesSuccess,
    getUploadReportSchemesError,
    getUploadReportUrlSuccess,
    getUploadReportUrlError,
    generateReportValidationSuccess,
    generateReportValidationError,
    generateReportSuccess,
    generateReportError,
    getGenerateReportSchemesSuccess,
    getGenerateReportSchemesError
} from './action';
import { GENERATE_REPORT_VALIDATION_REQUEST, GET_REPORT_TYPES, GET_REPORT_UPLOAD_URL, GET_UPLOAD_REPORT_SCHEME,GENERATE_REPORT_REQUEST, GET_GENERATE_REPORT_SCHEME } from './constant';
function* getReportTypes() {
    try {
        const result = yield call(reportApi.getReportTypes);
        console.log('report', result);
        if (result && result.data && result.data.result) {
            yield put(getReportTypesSuccess(result.data.content));
        }
    } catch (error) {
        yield put(getReportTypesError(error));
    }
}

function* getUploadReportSchemes(action) {
    try {
        console.log('upload', action);
        const result = yield call(reportApi.getUploadReportTypeData, action.payload);
        console.log('upload', result);
        if (result && result.data && result.data.result) {
            yield put(getUploadReportSchemesSuccess(result.data.content));
        }
    } catch (error) {
        const errorObj = getError(error, 'Access denied.');
        if (errorObj && errorObj.message) {
            NotificationHelper.getInstance().error(errorObj.message);
        }
        yield put(getUploadReportSchemesError(error));
    }
}

function* getGenerateReportSchemes(action) {
    try {
        console.log('generate', action);
        const result = yield call(reportApi.getUploadReportTypeData, action.payload);
        console.log('generate', result);
        if (result && result.data && result.data.result) {
            yield put(getGenerateReportSchemesSuccess(result.data.content));
        }
    } catch (error) {
        const errorObj = getError(error, 'Access denied.');
        if (errorObj && errorObj.message) {
            NotificationHelper.getInstance().error(errorObj.message);
        }
        yield put(getGenerateReportSchemesError(error));
    }
}

function* getReportUploadUrl(action) {
    try {
        console.log('url');
        const result = yield call(reportApi.getReportUploadUrl, action.payload);
        console.log('url', result);
        if (result && result.data && result.data.result) {
            yield put(getUploadReportUrlSuccess(result.data.content));
        }
    } catch (error) {
        console.log('error', error);
        const errorObj = getError(error, 'Access denied.');
        if (errorObj && errorObj.message) {
            NotificationHelper.getInstance().error(errorObj.message);
        } 
        yield put(getUploadReportUrlError(error));
    }
}

function* reportGenerateValidation(action) {
    try {
  
        const result = yield call(reportApi.generateReportValidation, action.payload.data);
     
        if (result && result.data && result.data.result) {
            yield put(generateReportValidationSuccess(result.data.content));
            if(action.payload.cb){
                action.payload.cb()
            }
        }
    } catch (error) {
        console.log('error', error);
        const errorObj = getError(error, 'Access denied.');
        if (errorObj && errorObj.message) {
            NotificationHelper.getInstance().error(errorObj.message);
        } 
        yield put(generateReportValidationError(error));
    }
}

function* reportGenerate(action) {
    try {
  
        const result = yield call(reportApi.generateReport, action.payload.data);
     
        if (result && result.data && result.data.result) {
            yield put(generateReportSuccess(result.data.content));
            if(action.payload.cb){
                action.payload.cb()
            }
        }
    } catch (error) {
        console.log('error', error);
        const errorObj = getError(error, 'Access denied.');
        if (errorObj && errorObj.message) {
            console.log(typeof errorObj.message)
            NotificationHelper.getInstance().error(errorObj.message);
        }
        yield put(generateReportError(error));
    }
}

export default function* adminViewReportSagas() {
    yield* [takeEvery(GET_REPORT_TYPES, getReportTypes)];
    yield* [takeEvery(GET_UPLOAD_REPORT_SCHEME, getUploadReportSchemes)];
    yield* [takeEvery(GET_GENERATE_REPORT_SCHEME, getGenerateReportSchemes)];
    yield* [takeEvery(GET_REPORT_UPLOAD_URL, getReportUploadUrl)];
    yield* [takeEvery(GENERATE_REPORT_VALIDATION_REQUEST, reportGenerateValidation)];
    yield* [takeEvery(GENERATE_REPORT_REQUEST, reportGenerate)];

}
