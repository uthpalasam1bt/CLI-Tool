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

const schemeInformationData = () =>
    createSelector(
        schemeOptionsReducer,
        currentState => currentState.schemeInformationData
    );

const schemeInformationData_inprogress = () =>
    createSelector(
        schemeOptionsReducer,
        currentState => currentState.schemeInformationDataInprogress
    );

const getIsSchemeNameValid = () =>
    createSelector(
        schemeOptionsReducer,
        currentState => currentState.validSchemeName
    );

const getIsVerifingSchemeName = () =>
    createSelector(
        schemeOptionsReducer,
        currentState => currentState.checkingSchemeNameValidity
    );

export {
    store_schemeData,
    store_schemeContributors,
    schemeInformationData,
    schemeInformationData_inprogress,
    getIsSchemeNameValid,
    getIsVerifingSchemeName
};
