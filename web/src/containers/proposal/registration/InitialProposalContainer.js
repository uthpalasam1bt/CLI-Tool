import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Tabs } from 'antd';
import PropTypes from 'prop-types';
import { notification } from 'antd';
import { initialize, change, destroy } from 'redux-form';
import store from '../../../redux/store';

import InitialProposalForm from './forms/InitialProposalForm';
import AssetsFormSection from './forms/AssetsFormSection';
import LiabilitiesFormSection from './forms/LiabilitiesFormSection';
import Funding from './forms/funding/FundingFormSection';
import ApprovalFormSection from './forms/ApprovalFormSection';
import {
    TAB_KEY_ASSET,
    TAB_KEY_NAME_ASSET,
    TAB_KEY_LIABILITIES,
    TAB_KEY_NAME_LIABILITIES,
    TAB_KEY_NAME_FUNDING,
    TAB_KEY_FUNDING,
    TAB_KEY_NAME_APPROVAL,
    TAB_KEY_APPROVAL
} from './constants';

import { doSaveProposalForm, doGetProposalForm, doGetProposalNames } from './actions/initialProposalActions';
import {
    saveInitialProposal_inProgress,
    saveInitialProposal_status,
    saveInitialProposal_error,
    getInitialProposal_inProgress,
    getInitialProposal_data,
    getInitialProposal_error,
    getInitialProposal__Names_data
} from './selectors/initialProposalSelectors';

const TabPane = Tabs.TabPane;

class InitialProposalContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeFormKey: TAB_KEY_ASSET,
            existingProposals: false,

            saveInitialProposal_inProgress: false,
            saveInitialProposal_status: false,
            saveInitialProposal_error: null,

            getInitialProposal_inProgress: false,
            getInitialProposal_data: null,
            getInitialProposal_error: null,

            getInitialProposal_Names_inProgress: false,
            getInitialProposal__Names_data: [],
            getInitialProposal__Names_error: null
        };

        this.handleChangeFormTabs = this.handleChangeFormTabs.bind(this);
        this.handleSubmitInitialProposalForm = this.handleSubmitInitialProposalForm.bind(this);

        this.loadDatatoForm = this.loadDatatoForm.bind(this);
        this.syncData = this.syncData.bind(this);
        this.chooseProposal = this.chooseProposal.bind(this);
        this.handleChangeProposalName = this.handleChangeProposalName.bind(this);
    }
    syncData(proposalName) {
        const { schemeName, doGetProposalForm, doGetProposalNames } = this.props;
        doGetProposalNames({ schemeName });
        if (proposalName) doGetProposalForm({ schemeName, proposalName });
    }

    chooseProposal(proposalName) {
        this.syncData(proposalName);
        this.setState({ existingProposals: true });
    }

    handleChangeProposalName() {
        const { existingProposals } = this.state;
        if (existingProposals) {
            this.setState({ existingProposals: false }, () => {
                store.dispatch(destroy('initialProposalForm'));
                this.syncData();
            });
        }
    }

    componentDidMount() {
        this.syncData();
    }
    componentWillReceiveProps(np, nc) {
        const {
            saveInitialProposal_inProgress,
            saveInitialProposal_status,
            getInitialProposal_inProgress,
            getInitialProposal_Names_inProgress
        } = this.state;

        if (
            np.saveInitialProposal_inProgress !== null ||
            saveInitialProposal_inProgress !== np.saveInitialProposal_inProgress
        ) {
            this.setState({ saveInitialProposal_inProgress: np.saveInitialProposal_inProgress });
        }
        if (np.saveInitialProposal_status !== null || saveInitialProposal_status !== np.saveInitialProposal_status) {
            this.setState({ saveInitialProposal_status: np.saveInitialProposal_status }, () => {
                if (np.saveInitialProposal_status === true) {
                    notification['success']({
                        message: 'Save Formal Proposal Success',
                        description: 'successfully saved'
                    });
                    this.syncData();
                }
            });
        }
        if (np.saveInitialProposal_error) {
            this.setState({ saveInitialProposal_error: np.saveInitialProposal_error }, () => {
                notification['error']({
                    message: 'Save Error',
                    description: np.saveInitialProposal_error
                });
            });
        }

        if (
            np.getInitialProposal_inProgress !== null ||
            getInitialProposal_inProgress !== np.getInitialProposal_inProgress
        ) {
            this.setState({ getInitialProposal_inProgress: np.getInitialProposal_inProgress });
        }

        if (np.getInitialProposal_data !== null) {
            this.setState({ getInitialProposal_data: np.getInitialProposal_data }, () => {
                this.loadDatatoForm();
            });
        }

        if (np.getInitialProposal_error) {
            this.setState({ getInitialProposal_error: np.getInitialProposal_error }, () => {
                notification['error']({
                    message: 'Save Error',
                    description: np.saveInitialProposal_error
                });
            });
        }
        if (
            np.getInitialProposal_Names_inProgress !== null ||
            getInitialProposal_Names_inProgress !== np.getInitialProposal_Names_inProgress
        ) {
            this.setState({ getInitialProposal_Names_inProgress: np.getInitialProposal_Names_inProgress });
        }
        if (np.getProposalName !== null) {
            this.setState({ getProposalName: np.getProposalName }, () => {
                store.dispatch(
                    change('initialProposalForm', 'assets.existingProposals', {
                        dataSource: np.getProposalName.map(data => data.proposalName)
                    })
                );
            });
        }
    }

    handleChangeFormTabs(activeFormKey) {
        this.setState({ activeFormKey });
    }

    handleSubmitInitialProposalForm(formData) {
        delete formData.existingProposals;
        const { schemeName } = this.props;
        const {
            assets: { proposalName, ...assetsProps },
            ...formDataProps
        } = formData;

        this.props.doSaveProposalForm({ schemeName, proposalName, assets: { ...assetsProps }, ...formDataProps });
    }

    loadDatatoForm() {
        const { getInitialProposal_data, getProposalName } = this.state;
        const { assets, ...rest } = getInitialProposal_data[0];

        const data = {
            assets: {
                existingProposals: { dataSource: getProposalName.map(data => data.proposalName) },
                ...getInitialProposal_data[0].assets
            },
            ...rest
        };

        store.dispatch(initialize('initialProposalForm', data, false));
    }

    render() {
        const { activeFormKey } = this.state;
        const formTabs = [
            {
                tabKey: TAB_KEY_ASSET,
                tabName: TAB_KEY_NAME_ASSET,
                formSection: (
                    <AssetsFormSection
                        syncData={this.chooseProposal}
                        handleChangeProposalName={this.handleChangeProposalName}
                    />
                )
            },
            { tabKey: TAB_KEY_LIABILITIES, tabName: TAB_KEY_NAME_LIABILITIES, formSection: <LiabilitiesFormSection /> },
            { tabKey: TAB_KEY_FUNDING, tabName: TAB_KEY_NAME_FUNDING, formSection: <Funding /> },
            { tabKey: TAB_KEY_APPROVAL, tabName: TAB_KEY_NAME_APPROVAL, formSection: <ApprovalFormSection /> }
        ];

        return (
            <>
                <div className="initial-proposal-form-container">
                    <InitialProposalForm onSubmit={this.handleSubmitInitialProposalForm}>
                        {/* <button type="submit">Submit</button> */}

                        <Tabs defaultActiveKey={activeFormKey} onChange={this.handleChangeFormTabs}>
                            {formTabs.map(tab => (
                                <TabPane tab={tab.tabName} key={tab.tabKey}>
                                    {activeFormKey === tab.tabKey && tab.formSection}
                                </TabPane>
                            ))}
                        </Tabs>
                    </InitialProposalForm>
                </div>
            </>
        );
    }
}

InitialProposalContainer.propTypes = {
    saveInitialProposal_inProgress: PropTypes.bool,
    saveInitialProposal_status: PropTypes.bool,
    saveInitialProposal_error: PropTypes.object,

    getInitialProposal_inProgress: PropTypes.bool,
    getInitialProposal_data: PropTypes.array,
    getInitialProposal_error: PropTypes.object
};
InitialProposalContainer.defaultProps = {
    saveInitialProposal_inProgress: false,
    saveInitialProposal_status: false,
    saveInitialProposal_error: null,

    getInitialProposal_inProgress: false,
    getInitialProposal_data: [],
    getInitialProposal_error: null
};

const mapStateToProps = createStructuredSelector({
    saveInitialProposal_inProgress: saveInitialProposal_inProgress(),
    saveInitialProposal_status: saveInitialProposal_status(),
    saveInitialProposal_error: saveInitialProposal_error(),

    getInitialProposal_inProgress: getInitialProposal_inProgress(),
    getInitialProposal_data: getInitialProposal_data(),
    getInitialProposal_error: getInitialProposal_error(),
    getProposalName: getInitialProposal__Names_data()
});

const mapDispatchToProps = dispatch => ({
    doSaveProposalForm: payload => {
        dispatch(doSaveProposalForm(payload));
    },
    doGetProposalForm: payload => {
        dispatch(doGetProposalForm(payload));
    },
    doGetProposalNames: payload => {
        dispatch(doGetProposalNames(payload));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InitialProposalContainer);
