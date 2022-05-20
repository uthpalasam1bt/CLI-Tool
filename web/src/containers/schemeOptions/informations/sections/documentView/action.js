import {
    GET_DOCUMENT_DATA_REQUEST,
    GET_DOCUMENT_DATA_INPROGRESS,
    GET_DOCUMENT_DATA_SUCCESS,
    GET_DOCUMENT_DATA_FAILED,
    GET_SELECTED_DOCUMENT_DATA_REQUEST,
    GET_SELECTED_DOCUMENT_DATA_INPROGRESS,
    GET_SELECTED_DOCUMENT_DATA_SUCCESS,
    GET_SELECTED_DOCUMENT_DATA_FAILED
} from './constants';

const doRequestDocument = payload => ({
    type: GET_DOCUMENT_DATA_REQUEST,
    payload
});
const doRequestDocumentInProgress = () => ({
    type: GET_DOCUMENT_DATA_INPROGRESS
});
const doRequestDocumentSuccess = result => ({
    type: GET_DOCUMENT_DATA_SUCCESS,
    result
});
const doRequestDocumentFailed = error => ({
    type: GET_DOCUMENT_DATA_FAILED,
    error
});

const doRequestSelectedDocument = payload => ({
    type: GET_SELECTED_DOCUMENT_DATA_REQUEST,
    payload
});
const doRequestSelectedDocumentInProgress = () => ({
    type: GET_SELECTED_DOCUMENT_DATA_INPROGRESS
});
const doRequestSelectedDocumentSuccess = result => ({
    type: GET_SELECTED_DOCUMENT_DATA_SUCCESS,
    result
});
const doRequestSelectedDocumentFailed = error => ({
    type: GET_SELECTED_DOCUMENT_DATA_FAILED,
    error
});

export {
    doRequestDocument,
    doRequestDocumentInProgress,
    doRequestDocumentSuccess,
    doRequestDocumentFailed,
    doRequestSelectedDocument,
    doRequestSelectedDocumentInProgress,
    doRequestSelectedDocumentSuccess,
    doRequestSelectedDocumentFailed
};
