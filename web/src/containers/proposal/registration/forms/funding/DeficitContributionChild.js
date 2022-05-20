import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { Field, formValueSelector } from 'redux-form';

import ContributionOptions from './DeficitContributionOptions';
import { FileUploader, SelectOptions } from '../../../../../UILibrary/components/forms/fields';
import { required } from 'redux-form-validators';
import data from './DeficitContributionChildData';
import { connect } from 'react-redux';
import notificationHelper from '../../../../../helpers/NotificationHelper';

class DeficitContributionChild extends Component {
    state = {
        option: '',
        uploadValid: true,
        requestData: null
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (!nextProps.proposalName) {
            notificationHelper.getInstance().warning('Please enter a proposal name');
            return { uploadValid: false };
        }
        if (!nextProps.schemeId) {
            notificationHelper.getInstance().error('Oops! Something went wrong. No scheme id found');
            return { uploadValid: false };
        } else {
            const requestData = {
                uploadPath: `${nextProps.schemeId}/${nextProps.proposalName}/funding/deficitContributions`,
                bucketName: 'tpiptest'
            };
            return {
                uploadValid: true,
                requestData: requestData
            };
        }
    }

    render() {
        const { selectDeficitContibutionFunding } = this.props;

        return (
            <div>
                <Row className="input-row">
                    <Col xl={14} lg={12} xs={24} className="label-wrap">
                        <label className="input-title">
                            Do you want to upload file of deficit contributions or enter on screen?
                        </label>
                    </Col>
                    <Col xl={10} lg={12} xs={24} className="input-wrap">
                        <Row>
                            <div className="pull-left download-input">
                                <Field
                                    component={SelectOptions}
                                    name="selectDeficitContibutionFunding"
                                    validate={[required()]}
                                    options={data.selectDeficitContibutionFunding.fundingOptions}
                                />
                            </div>
                            <div className="pull-right download-input">
                                <button title="Download" className="tpip-btn-blue regular button-download">
                                    <span>
                                        <i className="fa fa-download fa-icon"></i>
                                    </span>
                                    Download
                                </button>
                            </div>
                        </Row>
                    </Col>
                </Row>

                {selectDeficitContibutionFunding === 'enterOnscreen' && <ContributionOptions />}
                {selectDeficitContibutionFunding === 'uploadDeficitContibutions' && this.state.uploadValid && (
                    <div>
                        <Row className="input-row">
                            <Col xl={14} lg={12} xs={24} className="label-wrap">
                                <span className="input-title">Download template, fill and upload excel file</span>
                            </Col>
                            <Col xl={10} lg={12} xs={24} className="input-wrap">
                                <Field
                                    name="upload"
                                    className="form-control"
                                    placeholder=""
                                    component={FileUploader}
                                    requestdata={this.state.requestData}
                                />
                            </Col>
                        </Row>
                    </div>
                )}
            </div>
        );
    }
}

const selectorChild = formValueSelector('initialProposalForm');

DeficitContributionChild = connect(state => {
    const selectDeficitContibutionFunding = selectorChild(state, `funding.selectDeficitContibutionFunding`);
    let proposalName = null;
    let schemeId = null;
    if (selectorChild(state, 'assets')) {
        proposalName = selectorChild(state, 'assets.proposalName');
    }
    // if(state.schemeOptionsReducer.store_schemeData) schemeId = (state.schemeOptionsReducer.store_schemeData.schemeId);
    return { selectDeficitContibutionFunding, proposalName, schemeId };
})(DeficitContributionChild);

export default DeficitContributionChild;
