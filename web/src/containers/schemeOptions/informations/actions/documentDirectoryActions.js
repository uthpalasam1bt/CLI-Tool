import {
    GET_DOCUMENT_CONFIG_REQUEST,
    GET_DOCUMENT_CONFIG_INPROGRESS,
    GET_DOCUMENT_CONFIG_SUCCESS,
    GET_DOCUMENT_CONFIG_FAILED
} from '../constants';

const doRequestDocumentConfig = payload => ({
    payload,
    type: GET_DOCUMENT_CONFIG_REQUEST
});

const doRequestDocumentConfigInProgress = () => ({
    type: GET_DOCUMENT_CONFIG_INPROGRESS
});

const doRequestDocumentConfigSuccess = result => ({
    type: GET_DOCUMENT_CONFIG_SUCCESS,
    result
});

const doRequestDocumentConfigFailed = error => ({
    type: GET_DOCUMENT_CONFIG_FAILED,
    error
});

export {
    doRequestDocumentConfig,
    doRequestDocumentConfigInProgress,
    doRequestDocumentConfigSuccess,
    doRequestDocumentConfigFailed
};
