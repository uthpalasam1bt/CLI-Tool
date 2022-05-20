import { createSelector } from 'reselect';
const commonActionReducer = state => state.commonActionReducer;

const getOutputFiles_data = () =>
    createSelector(
        commonActionReducer,
        currentState => currentState.getOutputFiles_data
    );
const getOutputFiles_data_inProgress = () =>
    createSelector(
        commonActionReducer,
        currentState => currentState.getOutputFiles_data_inProgress
    );

export { getOutputFiles_data, getOutputFiles_data_inProgress };
