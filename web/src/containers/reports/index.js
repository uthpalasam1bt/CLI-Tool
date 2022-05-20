import React from 'react';
import { connect } from 'react-redux';
import UUID from 'uuid/v1';
import { createStructuredSelector } from 'reselect';

import AdminReportView from './adminReportView';
import ClientReportView from './clientReportView';

import {
    getStepData,
    getStepDataError,
    getStepData_inProgress,
    updateReportStepData,
    updateReportStepError,
    updateReportStep_inProgress
} from './selectors';
import { getStepReportData, updateReportData } from './actions';

import NotificationHelper from '../../helpers/NotificationHelper';
import { getPrimaryRole } from '../../helpers/validateUser';
import BrowserStorage from '../../middlewares/storage';

import { UserRole } from '../../constants/userConstants';

const BrowserStorageInstance = BrowserStorage.getInstance();
const session = UUID();

const ReportingContainer = props => {
    const { match, updateReportStepData } = props;
    const { ADMIN, CLIENT } = UserRole;
    const userPrimaryRole = getPrimaryRole(BrowserStorageInstance && BrowserStorageInstance.getLoggedUser());

    const updateStepAction = ({ action, tabId, data, cb }) => {
        if (!action || !tabId || !data) {
            return NotificationHelper.getInstance().warning('invalid Params supplied to update step ');
        }
        const payload = {
            reportAction: action,
            tabId: tabId,
            session: session,
            datasetMap: {
                reportData: [...data]
            }
        };

        updateReportStepData({ payload, cb });
    };

    return (
        <>
            <section className="report-wrap">
                <div className="container">
                    {/* <Spin spinning={progressIndicator}> */}
                    {userPrimaryRole === ADMIN ? (
                        <AdminReportView
                            urlParams={match.params}
                            {...props}
                            updateStepAction={updateStepAction}
                            session={session}
                        />
                    ) :
                        (<ClientReportView {...props} client={'publish'} />)
                    }
                    {/* </Spin> */}
                </div>
            </section>
        </>
    );
};

const mapStateToProps = createStructuredSelector({
    updateStepData_inProgress: updateReportStep_inProgress(),
    updatedStepData: updateReportStepData(),
    updateStepData_error: updateReportStepError(),
    getStepData_inProgress: getStepData_inProgress(),
    getStepData: getStepData(),
    getStepData_error: getStepDataError()
});

const mapDispatchToProps = dispatch => ({
    getStepReportData: data => dispatch(getStepReportData(data)),
    updateReportStepData: data => dispatch(updateReportData(data))
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReportingContainer);
