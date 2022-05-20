import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import layoutReducer from '../containers/layout/reducers';

import loginReducer from '../containers/user/reducers/loginReducer';
import logoutReducer from '../containers/user/reducers/logoutReducer';
import registerReducer from '../containers/user/reducers/registerReducer';
import userConfirmationReducer from '../containers/user/reducers/userConfirmationReducer';
import forgotPasswordReducer from '../containers/user/reducers/forgotPasswordReducer';

import contactUsReducer from '../containers/contactUs/reducers/contactUsReducer';

import schemeReducer from '../containers/scheme/reducers/schemeReducer';

import { userGroupsNotificationsReducer } from '../containers/notification/userGroupsNotificationsReducer';
import notificationReducer from '../containers/notification/notifications/notificationReducer';
import tasksReducer from '../containers/notification/tasks/reducers';

import profileDetailsReducer from '../containers/profile/reducers';

import lgimUserManagementReducer from '../containers/dashboard/UserManagement/lgimUserManagementReducer';

import userAssignReducer from '../components/userAssign/userAssignReducer';

import schemeOptionsReducer from '../containers/schemeOptions/reducers/schemeOptionsReducer';
import userManagementReducer from '../containers/schemeOptions/userManagement/userManagementReducer';

import dashboardReducer from '../containers/schemeOptions/charts/reducers/chartData';
import dashboardDocumentsGenerationReducer from '../containers/schemeOptions/charts/reducers/dashboardDocumentsGenerationReducer';
import dashboardRearrangeReducer from '../containers/schemeOptions/charts/dashboard/rearrange/reducers';
import chartDatesReducer from '../containers/schemeOptions/charts/reducers/chartDateListReducer';
import stepFuctionReducer from '../containers/schemeOptions/charts/reducers/stepFuctionReducer';
import portfolioReducer from '../containers/schemeOptions/charts/portfolioBuilder/reducers';

import taskManagerReducer from '../containers/dashboard/reducers/taskManagerReducer';
import workflowStepDataReducer from '../containers/workflows/reducers/workflowStepDataReducer';
import workflowsReducer from '../containers/workflows/reducers/workFlowsReducer';
import commonActionReducer from '../containers/workflows/reducers/commonActionReducer';

import documentDirectoryReducer from '../containers/schemeOptions/informations/reducers/documentDirectoryReducer';
import informationDocumentReducer from '../containers/schemeOptions/informations/sections/documentView/informationDocumentReducer';
import reportDirectoryReducer from '../containers/schemeOptions/informations/reducers/reportDirectoryReducer';
import informationReportReducer from '../containers/schemeOptions/informations/sections/reports/reportReducer';

import keyMetricsReducer from '../containers/scheme/keyMetrics/reducers/keyMetricsReducer';
import informationDirectoryReducer from '../containers/schemeOptions/informations/reducers/InformationDirectoryReducer';
import auditTrailReducer from '../containers/schemeOptions/informations/reducers/auditTrailReducer';

import reportReducer from '../containers/reports/reducers';

const rootReducer = combineReducers({
    layoutReducer,
    loginReducer,
    logoutReducer,
    registerReducer,
    userConfirmationReducer,
    forgotPasswordReducer,

    contactUsReducer,

    schemeReducer,

    userGroupsNotificationsReducer,
    notificationReducer,
    tasksReducer,

    profileDetailsReducer,

    lgimUserManagementReducer,

    userAssignReducer,

    schemeOptionsReducer,
    workflowsReducer,
    userManagementReducer,
    commonActionReducer,

    dashboardReducer,
    dashboardDocumentsGenerationReducer,
    dashboardRearrangeReducer,

    chartDatesReducer,
    stepFuctionReducer,
    portfolioReducer,

    tasksManagerReducer: taskManagerReducer,
    workflowStepDataReducer: workflowStepDataReducer,
    form: formReducer,

    documentDirectoryReducer,
    informationDocumentReducer,

    keyMetricsReducer,
    informationDirectoryReducer,

    reportReducer,
    auditTrailReducer,

    reportDirectoryReducer,
    informationReportReducer
});

const appReducer = (state, action) => {
    if (action.type === 'DO_LOGOUT_SUCCESS') {
        state = undefined;
    }
    return rootReducer(state, action);
};

export default appReducer;
