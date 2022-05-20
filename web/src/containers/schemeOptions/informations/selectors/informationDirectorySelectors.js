import { createSelector } from 'reselect';
const informationDirectoryReducer = state => state.informationDirectoryReducer;

const information_directory_config_inProgress = () =>
    createSelector(
        informationDirectoryReducer,
        currentState => currentState.information_directory_config_inProgress
    );

const information_directory_config = () =>
    createSelector(
        informationDirectoryReducer,
        currentState => currentState.information_directory_config
    );

const information_directory_config_error = () =>
    createSelector(
        informationDirectoryReducer,
        currentState => currentState.information_directory_config_error
    );

const information_directory_form_data_inProgress = () =>
    createSelector(
        informationDirectoryReducer,
        currentState => currentState.information_directory_form_data_inProgress
    );

const information_directory_form_data = () =>
    createSelector(
        informationDirectoryReducer,
        currentState => currentState.information_directory_form_data
    );

const information_directory_form_data_error = () =>
    createSelector(
        informationDirectoryReducer,
        currentState => currentState.information_directory_form_data_error
    );

export {
    information_directory_config_inProgress,
    information_directory_config,
    information_directory_config_error,
    information_directory_form_data_inProgress,
    information_directory_form_data,
    information_directory_form_data_error
};
