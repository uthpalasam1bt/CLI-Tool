import { createSelector } from 'reselect';
const keyMetricsReducer = state => state.keyMetricsReducer;

const getKeyMetricsConfig_data = () =>
    createSelector(
        keyMetricsReducer,
        currentState => currentState.getKeyMetricsConfig_data
    );

const getKeyMetricsConfig_inProgress = () =>
    createSelector(
        keyMetricsReducer,
        currentState => currentState.getKeyMetricsConfig_inProgress
    );

const getKeyMetricsConfig_error = () =>
    createSelector(
        keyMetricsReducer,
        currentState => currentState.getKeyMetricsConfig_error
    );

const filterSchemes_data = () =>
    createSelector(
        keyMetricsReducer,
        currentState => currentState.filterSchemes_data
    );

const filterSchemes_inProgress = () =>
    createSelector(
        keyMetricsReducer,
        currentState => currentState.filterSchemes_inProgress
    );

const filterSchemes_error = () =>
    createSelector(
        keyMetricsReducer,
        currentState => currentState.filterSchemes_error
    );

const getMyViews_data = () =>
    createSelector(
        keyMetricsReducer,
        currentState => currentState.getMyViews_data
    );

const getMyViews_inProgress = () =>
    createSelector(
        keyMetricsReducer,
        currentState => currentState.getMyViews_inProgress
    );

const getMyViews_error = () =>
    createSelector(
        keyMetricsReducer,
        currentState => currentState.getMyViews_error
    );

const deleteView_data = () =>
    createSelector(
        keyMetricsReducer,
        currentState => currentState.deleteView_data
    );

const deleteView_inProgress = () =>
    createSelector(
        keyMetricsReducer,
        currentState => currentState.deleteView_inProgress
    );

const deleteView_error = () =>
    createSelector(
        keyMetricsReducer,
        currentState => currentState.deleteView_error
    );

const saveView_data = () => {
    createSelector(
        keyMetricsReducer,
        currentState => currentState.saveView_data
    );
};

const saveView_inProgress = () => {
    createSelector(
        keyMetricsReducer,
        currentState => currentState.saveView_inProgress
    );
};

const saveView_error = () => {
    createSelector(
        keyMetricsReducer,
        currentState => currentState.saveView_error
    );
};

const updateView_data = () => {
    createSelector(
        keyMetricsReducer,
        currentState => currentState.updateView_data
    );
};

const updateView_inProgress = () =>
    createSelector(
        keyMetricsReducer,
        currentState => currentState.updateView_inProgress
    );

const updateView_error = () => {
    createSelector(
        keyMetricsReducer,
        currentState => currentState.updateView_error
    );
};

const editView_data = () =>
    createSelector(
        keyMetricsReducer,
        currentState => currentState.editView_data
    );

const editView_inProgress = () =>
    createSelector(
        keyMetricsReducer,
        currentState => currentState.editView_inProgress
    );

const editView_error = () =>
    createSelector(
        keyMetricsReducer,
        currentState => currentState.editView_error
    );

const schemeDataChange_data = () => {
    createSelector(
        keyMetricsReducer,
        currentState => currentState.schemeDataChange_data
    );
};

const schemeDataChange_inProgress = () => {
    createSelector(
        keyMetricsReducer,
        currentState => currentState.schemeDataChange_inProgress
    );
};

const schemeDataChange_error = () => {
    createSelector(
        keyMetricsReducer,
        currentState => currentState.schemeDataChange_error
    );
};

const saveGlobalView_data = () => {
    createSelector(
        keyMetricsReducer,
        currentState => currentState.saveGlobalView_data
    );
};

const saveGlobalView_inProgress = () => {
    createSelector(
        keyMetricsReducer,
        currentState => currentState.saveGlobalView_inProgress
    );
};

const saveGlobalView_error = () => {
    createSelector(
        keyMetricsReducer,
        currentState => currentState.saveGlobalView_error
    );
};

const updateGlobalView_data = () => {
    createSelector(
        keyMetricsReducer,
        currentState => currentState.updateGlobalView_data
    );
};

const updateGlobalView_inProgress = () =>
    createSelector(
        keyMetricsReducer,
        currentState => currentState.updateGlobalView_inProgress
    );

const updateGlobalView_error = () => {
    createSelector(
        keyMetricsReducer,
        currentState => currentState.updateGlobalView_error
    );
};

const editGlobalView_data = () =>
    createSelector(
        keyMetricsReducer,
        currentState => currentState.editGlobalView_data
    );

const editGlobalView_inProgress = () =>
    createSelector(
        keyMetricsReducer,
        currentState => currentState.editGlobalView_inProgress
    );

const editGlobalView_error = () =>
    createSelector(
        keyMetricsReducer,
        currentState => currentState.editGlobalView_error
    );

const deleteGlobalView_data = () =>
    createSelector(
        keyMetricsReducer,
        currentState => currentState.deleteGlobalView_data
    );

const deleteGlobalView_inProgress = () =>
    createSelector(
        keyMetricsReducer,
        currentState => currentState.deleteGlobalView_inProgress
    );

const deleteGlobalView_error = () =>
    createSelector(
        keyMetricsReducer,
        currentState => currentState.deleteGlobalView_error
    );

const getMyDefaultOrgGroups_data = () =>
    createSelector(
        keyMetricsReducer,
        currentState => currentState.getMyDefaultOrgGroups_data
    );

const getMyDefaultOrgGroups_inProgress = () =>
    createSelector(
        keyMetricsReducer,
        currentState => currentState.getMyDefaultOrgGroups_inProgress
    );

const getMyDefaultOrgGroups_error = () =>
    createSelector(
        keyMetricsReducer,
        currentState => currentState.getMyDefaultOrgGroups_error
    );

const getMyCurrentAppliedView_data = () =>
    createSelector(
        keyMetricsReducer,
        currentState => currentState.getMyCurrentAppliedView_data
    );

const getMyCurrentAppliedView_inProgress = () =>
    createSelector(
        keyMetricsReducer,
        currentState => currentState.getMyCurrentAppliedView_inProgress
    );

const getMyCurrentAppliedView_error = () =>
    createSelector(
        keyMetricsReducer,
        currentState => currentState.getMyCurrentAppliedView_error
    );

const saveMyCurrentAppliedView_data = () =>
    createSelector(
        keyMetricsReducer,
        currentState => currentState.saveMyCurrentAppliedView_data
    );

const saveMyCurrentAppliedView_inProgress = () =>
    createSelector(
        keyMetricsReducer,
        currentState => currentState.saveMyCurrentAppliedView_inProgress
    );

const saveMyCurrentAppliedView_error = () =>
    createSelector(
        keyMetricsReducer,
        currentState => currentState.saveMyCurrentAppliedView_error
    );

const removeMyCurrentAppliedView_data = () =>
    createSelector(
        keyMetricsReducer,
        currentState => currentState.removeMyCurrentAppliedView_data
    );

const removeMyCurrentAppliedView_inProgress = () =>
    createSelector(
        keyMetricsReducer,
        currentState => currentState.removeMyCurrentAppliedView_inProgress
    );

const removeMyCurrentAppliedView_error = () =>
    createSelector(
        keyMetricsReducer,
        currentState => currentState.removeMyCurrentAppliedView_error
    );

export {
    getKeyMetricsConfig_data,
    getKeyMetricsConfig_inProgress,
    getKeyMetricsConfig_error,
    filterSchemes_data,
    filterSchemes_inProgress,
    filterSchemes_error,
    getMyViews_data,
    getMyViews_inProgress,
    getMyViews_error,
    deleteView_data,
    deleteView_inProgress,
    deleteView_error,
    saveView_data,
    saveView_inProgress,
    saveView_error,
    updateView_data,
    updateView_inProgress,
    updateView_error,
    editView_data,
    editView_inProgress,
    editView_error,
    schemeDataChange_data,
    schemeDataChange_inProgress,
    schemeDataChange_error,
    saveGlobalView_data,
    saveGlobalView_inProgress,
    saveGlobalView_error,
    updateGlobalView_data,
    updateGlobalView_inProgress,
    updateGlobalView_error,
    editGlobalView_data,
    editGlobalView_inProgress,
    editGlobalView_error,
    deleteGlobalView_data,
    deleteGlobalView_inProgress,
    deleteGlobalView_error,
    getMyDefaultOrgGroups_data,
    getMyDefaultOrgGroups_inProgress,
    getMyDefaultOrgGroups_error,
    getMyCurrentAppliedView_data,
    getMyCurrentAppliedView_inProgress,
    getMyCurrentAppliedView_error,
    saveMyCurrentAppliedView_data,
    saveMyCurrentAppliedView_inProgress,
    saveMyCurrentAppliedView_error,
    removeMyCurrentAppliedView_data,
    removeMyCurrentAppliedView_inProgress,
    removeMyCurrentAppliedView_error
};
