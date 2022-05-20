import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// import { initialize } from 'redux-form';
import { Empty } from 'antd';
import _ from 'lodash';

import { store_schemeData } from '../../selector';
// import store from '../../../../redux/store';

import Loading from '../../../../components/Loading';

import {
    //Scheme,
    //Assets,
    //Liabilities,
    //Funding,
    //Administration,
    //LDISample,
    // ReportingPreferences,
    //IncumbentManagersDoc,
    // Investment,
    // SchemeDocument,
    // Legal,
    // Letters,
    // Notices,
    AuditTrail,
    AdditionalReports,
    PerformanceReports,
    Funding
} from '../constants';
import UtilsHelper from '../../../../helpers/UtilsHelper';

import { document_config } from '../selectors/documentDirectorySelectors';
import { report_config } from '../selectors/reportDirectorySelectors';

import { information_directory_config } from '../selectors/informationDirectorySelectors';
import informationDirectorySectionMap from './informationDirectorySectionMap';

const retry = UtilsHelper.getInstance().retry;

//import screens using lazy loading
const InitialProposalForm = React.lazy(() => retry(() => import('./forms_old/InitialProposalForm')));
const DocumentView = React.lazy(() => retry(() => import('./documentView')));
const AuditTrailInfor = React.lazy(() => retry(() => import('./auditTrail')));
const ReportsView = React.lazy(() => retry(() => import('./reports')));
class Sections extends Component {
    constructor(props) {
        super(props);

        this.state = {
            store_schemeData: {},
            formData: {},
            getProposalData_data: {},
            getIAAData_data: {},
            getAMAODetailsData: {},
            // administrationData: null,
            InitialProposalName: null,
            // funding: null,
            informationData: null,
            schemeId: null,
            registration: {},
            document_config: {},
            information_directory_config: {},
            report_config: {}
        };
    }

    loadDataToForm() {
        const { getProposalData_data, getAMAODetailsData } = this.state;

        const assetManagementTrue = getAMAODetailsData && getAMAODetailsData.investment;
        // const investmentConst = assetManagementTrue ? getAMAODetailsData.investment : null;

        //format proposal data to view
        const _data = this.cleanData(getProposalData_data);
        if (assetManagementTrue) {
            //format amaod data to view
            // const datam = this.cleanAmaodData(getAMAODetailsData);
        }

        this.setState({ formData: _data });
    }

    cleanData(formData) {
        const {
            store_schemeData: { schemeId }
        } = this.props;
        const _data = { schemeId };

        delete _data['schemeId'];

        return _data;
    }

    cleanAmaodData(formData) {
        const {
            store_schemeData: { schemeId }
        } = this.props;
        const _data = { schemeId };

        delete _data['schemeId'];

        return _data;
    }
    render() {
        const { formtype, name, document_config, information_directory_config, loggedUser, report_config } = this.props; //store_schemeData loggedUser
        console.log('::::::::::::::::::formtype', formtype);
        const { getAMAODetailsData } = this.state;
        // used all previously used screens in registration flow
        // constant data object to render screen

        const screenMap = {
            // [Scheme]: {
            //   id: 0,
            //   component: () => (
            //     <SchemeForm
            //       store_schemeData={store_schemeData}
            //       getIAAData_data={getIAAData_data}
            //       getWorkflowStep_inProgress={getWorkflowStep_inProgress}
            //     />
            //   )
            // },
            // [Assets]: {
            //   id: 1,
            //   component: () => (
            //     <InitialProposalForm>
            //       <AssetsFormSection
            //         disabled={true}
            //         initialProposalName={InitialProposalName}
            //         getWorkflowStep_inProgress={getWorkflowStep_inProgress}
            //       />
            //     </InitialProposalForm>
            //   )
            // },
            // [Liabilities]: {
            //   id: 2,
            //   component: () => (
            //     <InitialProposalForm>
            //       <LiabilitiesFormSection
            //         disabled={true}
            //         getWorkflowStep_inProgress={getWorkflowStep_inProgress}
            //       />
            //     </InitialProposalForm>
            //   )
            // },
            // [Funding]: {
            //   id: 3,
            //   component: () => (
            //     <InitialProposalForm>
            //       <FundingFormSection
            //         disabled={true}
            //         fundingData={funding}
            //         getWorkflowStep_inProgress={getWorkflowStep_inProgress}
            //       />
            //     </InitialProposalForm>
            //   )
            // },
            // [Administration]: {
            //   id: 4,
            //   component: () => (
            //     <AssetManagementAccountOpenForm onSubmit={this.onFormSubmit}>
            //       <AdminstrationFormSection
            //         disabled={true}
            //         administrationDataForm={administrationData}
            //         getWorkflowStep_inProgress={getWorkflowStep_inProgress}
            //         removeTrusteeData = {true}
            //       />
            //     </AssetManagementAccountOpenForm>
            //   )
            // },
            // [ReportingPreferences]: {
            //   id: 5,
            //   component: () => (
            //     <AssetManagementAccountOpenForm onSubmit={this.onFormSubmit}>
            //       <ReportingFormSection
            //         disabled={true}
            //         getWorkflowStep_inProgress={getWorkflowStep_inProgress}
            //       />
            //     </AssetManagementAccountOpenForm>
            //   )
            // },
            // [IncumbentManagersDoc]: {
            //   id: 6,
            //   component: () => (
            //     <InitialProposalForm>
            //       <IncumbentManagers
            //         disabled={true}
            //         getIAAData_data={getIAAData_data}
            //         getWorkflowStep_inProgress={getWorkflowStep_inProgress}
            //       />
            //     </InitialProposalForm>
            //   )
            // },
            // [Investment]: {
            //   id: 7,
            //   component: () => (
            //     <InitialProposalForm>
            //       <DocumentView disabled={true} formType={formtype} />
            //     </InitialProposalForm>
            //   )
            // },
            // [SchemeDocument]: {
            //   id: 8,
            //   component: () => (
            //     <InitialProposalForm>
            //       <DocumentView disabled={true} formType={formtype} amaodData={getAMAODetailsData} />
            //     </InitialProposalForm>
            //   )
            // },
            // [Legal]: {
            //   id: 9,
            //   component: () => (
            //     <InitialProposalForm>
            //       <DocumentView disabled={true} formType={formtype} />
            //     </InitialProposalForm>
            //   )
            // },
            // [Letters]: {
            //   id: 10,
            //   component: () => (
            //     <InitialProposalForm>
            //       <DocumentView disabled={true} formType={formtype} />
            //     </InitialProposalForm>
            //   )
            // },
            [AuditTrail]: {
                id: 11,
                component: () => <AuditTrailInfor loggedUser={loggedUser} />
            },
            [AdditionalReports]: {
                id: 12,
                component: () => (
                    <InitialProposalForm>
                        <DocumentView disabled={true} formType={formtype} loggedUser={loggedUser} />
                    </InitialProposalForm>
                )
            }
            // [PerformanceReports]: {
            //     id: 13,
            //     component: () => (
            //         <InitialProposalForm>
            //             <DocumentView disabled={true} formType={formtype} />
            //         </InitialProposalForm>
            //     )
            // }
            // [Notices]: {
            //   id: 14,
            //   component: () => (
            //     <InitialProposalForm>
            //       <DocumentView disabled={true} formType={formtype} />
            //     </InitialProposalForm>
            //   )
            // }
        };

        if (document_config) {
            let lastId = Object.keys(screenMap).length - 1;
            for (const [key] of Object.entries(document_config)) {
                lastId++;
                if (key === 'SchemeDocument') {
                    screenMap[key] = {
                        id: lastId,
                        component: () => (
                            <InitialProposalForm>
                                <DocumentView disabled={true} formType={formtype} loggedUser={loggedUser} />
                            </InitialProposalForm>
                        )
                    };
                } else {
                    screenMap[key] = {
                        id: lastId,
                        component: () => (
                            <InitialProposalForm>
                                <DocumentView disabled={true} formType={formtype} loggedUser={loggedUser} />
                            </InitialProposalForm>
                        )
                    };
                }
            }
        }
        // information provided section
        if (information_directory_config) {
            const schemeClassification = this.props.store_schemeData.schemeClassification;
            const { information_directory_form_data } = this.props;
            for (const [key, value] of Object.entries(information_directory_config)) {
                const informationDirectoryUIComponentMap = _.get(
                    informationDirectorySectionMap,
                    `${value.formtype}.${schemeClassification}`,
                    props => (
                        <Empty description={<span>Information Directory UI Not Configured in this section </span>} />
                    )
                );

                screenMap[key] = {
                    id: value.keyId,
                    component: () => {
                        return informationDirectoryUIComponentMap({ information_directory_form_data });
                    }
                };
            }
            console.log('screenMap:::::', screenMap);
        }

        if (report_config) {
            let lastId = Object.keys(screenMap).length - 1;
            for (const [key] of Object.entries(report_config)) {
                lastId++;
                screenMap[key] = {
                    id: lastId,
                    component: () => (
                        <InitialProposalForm>
                            <ReportsView disabled={true} formType={formtype} />
                        </InitialProposalForm>
                    )
                };
                console.log('Screen map', screenMap);
            }
        }

        return (
            <div className="root-form-wrapper-information">
                <div className="card card-wrapper">
                    <div className="information-form-header">
                        <span className="form-title">{name}</span>
                        <div className="form-action-wrapper" />
                    </div>
                    <div className="content">
                        <div className="form-body custom-informtion-wrp">
                            <Suspense fallback={<Loading />}>
                                {screenMap[formtype] ? (
                                    screenMap[formtype].component()
                                ) : (
                                    <Empty description={<span>Please select a folder from 'Scheme Details'</span>} />
                                )}
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    store_schemeData: store_schemeData(),
    document_config: document_config(),
    information_directory_config: information_directory_config(),
    report_config: report_config()
});
const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Sections);
