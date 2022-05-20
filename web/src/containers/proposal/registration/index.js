import React, { Component } from 'react';
import InitialProposalContainer from './InitialProposalContainer';
import { Row, Col, Steps } from 'antd';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import { saveInitialProposal_inProgress } from './selectors/initialProposalSelectors';
import PropTypes from 'prop-types';

const Step = Steps.Step;

class RegistrationContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            saveInitialProposal_inProgress: false
        };
    }

    componentWillReceiveProps(np, nc) {
        const { saveInitialProposal_inProgress } = this.state;

        if (
            np.saveInitialProposal_inProgress !== null ||
            saveInitialProposal_inProgress !== np.saveInitialProposal_inProgress
        ) {
            this.setState({ saveInitialProposal_inProgress: np.saveInitialProposal_inProgress });
        }
    }

    render() {
        const { saveInitialProposal_inProgress } = this.state;
        const { schemeName } = this.props;

        return (
            <section className="proposal-registration-section">
                <Row gutter={20}>
                    <Col xl={8} lg={8} xs={24}>
                        <div className="tasks-navigator">
                            <div className="card card-wrap">
                                <div className="header">
                                    <span className="title">Pending Tasks</span>
                                </div>
                                <div className="content">
                                    <Steps className="stepsList" direction="vertical" current={0} size="small">
                                        <Step
                                            title="Request formal proposal"
                                            icon={<i className="fa fa-minus-circle fa-icon"></i>}
                                        />
                                        <Step
                                            title="Download formal proposal information"
                                            icon={<i className="fa fa-minus-circle fa-icon"></i>}
                                        />
                                        <Step
                                            title="Publish formal proposal"
                                            icon={<i className="fa fa-minus-circle fa-icon"></i>}
                                        />
                                        <Step
                                            title="Review/Approve formal proposal"
                                            icon={<i className="fa fa-minus-circle fa-icon"></i>}
                                        />
                                        <Step
                                            title="Request IAA"
                                            icon={<i className="fa fa-minus-circle fa-icon"></i>}
                                        />
                                        <Step
                                            title="Review IAA, KYC, AML"
                                            icon={<i className="fa fa-minus-circle fa-icon"></i>}
                                        />
                                        <Step
                                            title="Upload IAA and manage Letters"
                                            icon={<i className="fa fa-minus-circle fa-icon"></i>}
                                        />
                                        <Step
                                            title="Approve IAA"
                                            icon={<i className="fa fa-minus-circle fa-icon"></i>}
                                        />
                                        <Step
                                            title="Publish IAA and manage Letters"
                                            icon={<i className="fa fa-minus-circle fa-icon"></i>}
                                        />
                                        <Step
                                            title="Review IAA and manage Letters"
                                            icon={<i className="fa fa-minus-circle fa-icon"></i>}
                                        />
                                        <Step
                                            title="Request asset management account opening"
                                            icon={<i className="fa fa-minus-circle fa-icon"></i>}
                                        />
                                        <Step
                                            title="Review asset management account opening information"
                                            icon={<i className="fa fa-minus-circle fa-icon"></i>}
                                        />
                                        <Step
                                            title="Upload asset management account opening documents"
                                            icon={<i className="fa fa-minus-circle fa-icon"></i>}
                                        />
                                        <Step
                                            title="Approve advisory report"
                                            icon={<i className="fa fa-minus-circle fa-icon"></i>}
                                        />
                                        <Step
                                            title="Approve IMA"
                                            icon={<i className="fa fa-minus-circle fa-icon"></i>}
                                        />
                                        <Step
                                            title="PMC Proposal"
                                            icon={<i className="fa fa-minus-circle fa-icon"></i>}
                                        />
                                        <Step
                                            title="Publish asset management account opening document"
                                            icon={<i className="fa fa-minus-circle fa-icon"></i>}
                                        />
                                        <Step
                                            title="Publish asset management account opening document"
                                            icon={<i className="fa fa-minus-circle fa-icon"></i>}
                                        />
                                        <Step
                                            title="Upload SIP"
                                            icon={<i className="fa fa-minus-circle fa-icon"></i>}
                                        />
                                        <Step
                                            title="Review SIP"
                                            icon={<i className="fa fa-minus-circle fa-icon"></i>}
                                        />
                                        <Step
                                            title="Upload transition report"
                                            icon={<i className="fa fa-minus-circle fa-icon"></i>}
                                        />
                                        <Step
                                            title="Review transition report"
                                            icon={<i className="fa fa-minus-circle fa-icon"></i>}
                                        />
                                        <Step
                                            title="Initiate Activate status"
                                            icon={<i className="fa fa-minus-circle fa-icon"></i>}
                                        />
                                    </Steps>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xl={16} lg={16} xs={24}>
                        <div className="root-forms-wrapper">
                            <div className="card card-wrap">
                                <div className="option-header">
                                    <div className="left-wrap">
                                        <span className="title">Request Formal Proposal</span>
                                    </div>
                                    <div className="right-wrap">
                                        <button
                                            className="btn btn-save"
                                            disabled={saveInitialProposal_inProgress}
                                            onClick={() => this.props.doSaveProposalForm()}
                                        >
                                            <i
                                                className={`fa fa-icon ${
                                                    saveInitialProposal_inProgress
                                                        ? 'fa-circle-o-notch fa-spin'
                                                        : 'fa-save'
                                                }`}
                                            ></i>
                                            {saveInitialProposal_inProgress ? 'Saving...' : 'Save'}
                                        </button>
                                        <button className="tpip-btn-blue regular btn-continue">Continue</button>
                                    </div>
                                </div>
                                <div className="content">
                                    <InitialProposalContainer schemeName={schemeName} />
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </section>
        );
    }
}

RegistrationContainer.propTypes = {
    saveInitialProposal_inProgress: PropTypes.bool
};
RegistrationContainer.defaultProps = {
    saveInitialProposal_inProgress: false
};

const mapStateToProps = createStructuredSelector({
    saveInitialProposal_inProgress: saveInitialProposal_inProgress()
});
const mapDispatchToProps = dispatch => ({
    doSaveProposalForm: () => {
        dispatch(submit('initialProposalForm'));
    }
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegistrationContainer);
