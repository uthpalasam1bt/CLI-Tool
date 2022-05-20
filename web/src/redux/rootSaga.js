import { fork, all } from 'redux-saga/effects';

import layoutSagas from '../containers/layout/sagas';

import loginSagas from '../containers/user/sagas/loginSagas';
import logoutSagas from '../containers/user/sagas/logoutSagas';
import registerSagas from '../containers/user/sagas/registerSagas';
import userConfirmationSagas from '../containers/user/sagas/userConfirmationSagas';
import forgotPasswordSagas from '../containers/user/sagas/forgotPasswordSagas';

import profileDetailSagas from '../containers/profile/sagas';

import contactUsSagas from '../containers/contactUs/sagas/contactUsSagas';

import schemeSagas from '../containers/scheme/sagas/schemeSagas';

import lgimManagementSagas from '../containers/dashboard/UserManagement/sagas';
import tasksManagerSagas from '../containers/dashboard/sagas/tasksManagerSaga';

import tasksSagas from '../containers/notification/tasks/sagas';
import notificationSagas from '../containers/notification/notifications/sagas';
import userGroupNotificationSagas from '../containers/notification/sagas';

import userAssignSaga from '../components/userAssign/saga';

import userManagementSagas from '../containers/schemeOptions/userManagement/saga';

import dashbaordSagas from '../containers/schemeOptions/charts/sagas';
import dashbaordRearrangeSagas from '../containers/schemeOptions/charts/dashboard/rearrange/sagas';
import portfolioSagas from '../containers/schemeOptions/charts/portfolioBuilder/sagas';

import schemeOptionSagas from '../containers/schemeOptions/sagas/schemeOptionSagas';

import workflowStepDataSagas from '../containers/workflows/sagas/workflowStepDataSaga';
import workflowsSagas from '../containers/workflows/sagas/workflowsSaga';
import commonActionSaga from '../containers/workflows/sagas/commonActionSaga';

import requestDocumentConfigSagas from '../containers/schemeOptions/informations/sagas/requestDocumentConfigSagas';
import requestDocumentSagas from '../containers/schemeOptions/informations/sections/documentView/saga';

import keyMetricsSagas from '../containers/scheme/keyMetrics/sagas/keyMetricsSagas';
import requestInformationDirectoryConfigSagas from '../containers/schemeOptions/informations/sagas/requestInformationDirectoryConfigSagas';
import adminViewReportSagas from '../containers/reports/adminReportView/saga';
import commonReportSagas from '../containers/reports/saga';
import requestAuditTrailSagas from '../containers/schemeOptions/informations/sections/auditTrail/saga';

import requestReportConfigSagas from '../containers/schemeOptions/informations/sagas/requestReportConfigSagas';
import requestReportSagas from '../containers/schemeOptions/informations/sections/reports/saga';

export default function* rootSaga() {
    return yield all([
        fork(layoutSagas),
        fork(loginSagas),
        fork(logoutSagas),
        fork(registerSagas),
        fork(userConfirmationSagas),
        fork(forgotPasswordSagas),

        fork(profileDetailSagas),
        fork(contactUsSagas),
        fork(schemeSagas),

        fork(lgimManagementSagas),
        fork(tasksManagerSagas),

        fork(tasksSagas),
        fork(notificationSagas),
        fork(userGroupNotificationSagas),

        fork(userAssignSaga),

        fork(userManagementSagas),

        fork(dashbaordSagas),
        fork(dashbaordRearrangeSagas),

        fork(portfolioSagas),

        fork(schemeOptionSagas),
        fork(workflowsSagas),
        fork(commonActionSaga),
        fork(workflowStepDataSagas),

        fork(requestDocumentConfigSagas),
        fork(requestDocumentSagas),

        fork(keyMetricsSagas),
        fork(requestInformationDirectoryConfigSagas),

        fork(adminViewReportSagas),
        fork(commonReportSagas),
        fork(requestAuditTrailSagas),
        fork(requestReportConfigSagas),
        fork(requestReportSagas)
    ]);
}
