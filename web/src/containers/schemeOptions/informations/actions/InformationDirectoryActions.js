import {
    GET_INFORMATION_DIRECTORY_CONFIG_REQUEST,
    GET_INFORMATION_DIRECTORY_CONFIG_INPROGRESS,
    GET_INFORMATION_DIRECTORY_CONFIG_SUCCESS,
    GET_INFORMATION_DIRECTORY_CONFIG_FAILED,
    INFORMATION_DIRECTORY_CONFIG_RESET,
    GET_INFORMATION_DIRECTORY_DATA_REQUEST,
    GET_INFORMATION_DIRECTORY_DATA_SUCCESS,
    GET_INFORMATION_DIRECTORY_DATA_FAILED,
    GET_INFORMATION_DIRECTORY_DATA_INPROGRESS,
    GET_INFORMATION_DIRECTORY_DATA_RESET
} from '../constants';

const doRequestInformationDirectoryConfig = schemeId => ({
    type: GET_INFORMATION_DIRECTORY_CONFIG_REQUEST,
    schemeId
});

const doRequestInformationDirectoryConfigInProgress = () => ({
    type: GET_INFORMATION_DIRECTORY_CONFIG_INPROGRESS
});

const doRequestInformationDirectoryConfigSuccess = result => ({
    type: GET_INFORMATION_DIRECTORY_CONFIG_SUCCESS,
    result
});

const doRequestInformationDirectoryConfigFailed = error => ({
    type: GET_INFORMATION_DIRECTORY_CONFIG_FAILED,
    error
});
const doResetConfig = () => ({
    type: INFORMATION_DIRECTORY_CONFIG_RESET
});

//data load
const doRequestInformationDirectoryData = schemeId => ({
    type: GET_INFORMATION_DIRECTORY_DATA_REQUEST,
    schemeId
});

const doRequestInformationDirectoryDataInProgress = () => ({
    type: GET_INFORMATION_DIRECTORY_DATA_INPROGRESS
});

const doRequestInformationDirectoryDataSuccess = result => ({
    type: GET_INFORMATION_DIRECTORY_DATA_SUCCESS,
    result
});

const doRequestInformationDirectoryDataFailed = error => ({
    type: GET_INFORMATION_DIRECTORY_DATA_FAILED,
    error
});
const doResetFormData = () => ({
    type: GET_INFORMATION_DIRECTORY_DATA_RESET
});

export {
    doRequestInformationDirectoryConfig,
    doRequestInformationDirectoryConfigInProgress,
    doRequestInformationDirectoryConfigSuccess,
    doRequestInformationDirectoryConfigFailed,
    doResetConfig,
    doRequestInformationDirectoryData,
    doRequestInformationDirectoryDataInProgress,
    doRequestInformationDirectoryDataSuccess,
    doRequestInformationDirectoryDataFailed,
    doResetFormData
};
