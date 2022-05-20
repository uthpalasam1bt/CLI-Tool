import { createSelector } from 'reselect';
const chartDateListReducer = state => state.chartDatesReducer;

const getChartDateListFromRedux = () =>
    createSelector(
        chartDateListReducer,
        currentState => currentState.chartDateList
    );
export { getChartDateListFromRedux };
