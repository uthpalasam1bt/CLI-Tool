import { createSelector } from 'reselect';
const schemeOptionsReducer = state => state.schemeOptionsReducer;

const store_schemeData = () =>
    createSelector(
        schemeOptionsReducer,
        currentState => currentState.store_schemeData
    );
const store_schemeContributors = () =>
    createSelector(
        schemeOptionsReducer,
        currentState => currentState.store_schemeContributors
    );
const store_currentWorkflowPosition = () =>
    createSelector(
        schemeOptionsReducer,
        currentState => currentState.store_currentWorkflowPosition
    );

export { store_schemeData, store_schemeContributors, store_currentWorkflowPosition };
