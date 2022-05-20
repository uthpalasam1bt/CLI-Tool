import { createSelector } from 'reselect';

const documentDirectoryReducer = state => state.documentDirectoryReducer;

const document_config_inProgress = () =>
    createSelector(
        documentDirectoryReducer,
        currentState => currentState.document_config_inProgress
    );

const document_config = () =>
    createSelector(
        documentDirectoryReducer,
        currentState => currentState.document_config
    );

const document_config_error = () =>
    createSelector(
        documentDirectoryReducer,
        currentState => currentState.document_config_error
    );

export { document_config_inProgress, document_config, document_config_error };
