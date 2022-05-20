import { createSelector } from 'reselect';
const informationDocumentReducer = state => state.informationDocumentReducer;

const document_data_inProgress = () =>
    createSelector(
        informationDocumentReducer,
        currentState => currentState.document_data_inProgress
    );
const document_data = () =>
    createSelector(
        informationDocumentReducer,
        currentState => currentState.document_data
    );
const document_data_error = () =>
    createSelector(
        informationDocumentReducer,
        currentState => currentState.document_data_error
    );
const selected_document_data_inProgress = () =>
    createSelector(
        informationDocumentReducer,
        currentState => currentState.selected_document_data_inProgress
    );
const selected_document_data = () =>
    createSelector(
        informationDocumentReducer,
        currentState => currentState.selected_document_data
    );
const selected_document_data_error = () =>
    createSelector(
        informationDocumentReducer,
        currentState => currentState.selected_document_data_error
    );

export {
    document_data_inProgress,
    document_data,
    document_data_error,
    selected_document_data_inProgress,
    selected_document_data,
    selected_document_data_error
};
