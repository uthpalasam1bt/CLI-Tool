import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'antd';
import Moment from '../../helpers/Moment';
import { history } from '../../redux/store';

export default class SchemeCard extends Component {
    redirectToSchemeOptions() {
        const { scheme } = this.props;
        if (scheme.transitionStatus) {
            return history.push(`/scheme/options/active-workflow/${scheme.schemeId}/${scheme.schemeName}`);
        } else if (scheme.activationCode) {
            return history.push(`/scheme/options/dashboard/${scheme.schemeId}/${scheme.schemeName}`);
        } else {
            return history.push(`/scheme/options/active-workflow/${scheme.schemeId}/${scheme.schemeName}`);
        }
    }

    updateIsFavourite(scheme) {
        this.props.updateIsFavourite(scheme);
    }

    convertToReadableNum(labelValue) {
        if (!labelValue) return '-';
        // Nine Zeroes for Billions
        return Math.abs(Number(labelValue)) >= 1.0e9
            ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(2) + 'B'
            : // Six Zeroes for Millions
            Math.abs(Number(labelValue)) >= 1.0e6
            ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(2) + 'M'
            : // Three Zeroes for Thousands
            Math.abs(Number(labelValue)) >= 1.0e3
            ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(2) + 'K'
            : Math.abs(Number(labelValue)).toFixed(2);
    }

    render() {
        const { type, scheme } = this.props;
        const { schemeName, createdAt } = scheme;

        const transitionStatus = scheme.hasOwnProperty('transitionStatus')
            ? scheme.transitionStatus
                ? true
                : false
            : true;

        const statusDataMapper = {
            P: {
                className: 'orange-dot'
            },
            US: {
                className: 'grey-dot'
            },
            UL: {
                className: 'blue-dot'
            },
            C: {
                className: 'green-dot'
            }
        };

        const Content = ({ contentName, contentKey, contentStatusKey, prefix }) => {
            return (
                <Row className="content">
                    <Col xl={13} xs={12}>
                        {contentName}
                    </Col>
                    <Col xl={11} xs={12} className="text-right">
                        {type === 'In-Registration' ? (
                            <span
                                className={`dot ${
                                    statusDataMapper[scheme[contentStatusKey]]
                                        ? statusDataMapper[scheme[contentStatusKey]].className
                                        : null
                                }`}
                            />
                        ) : scheme.analytics &&
                          scheme.analytics.summaryData &&
                          scheme.analytics.summaryData[contentKey] ? (
                            <>
                                <span className="table-text-gray">{prefix}</span>
                                <span>{scheme.analytics.summaryData[contentKey]}</span>
                            </>
                        ) : (
                            <span>-</span>
                        )}
                    </Col>
                </Row>
            );
        };

        return (
            <Col xl={8} xs={24} lg={12} md={12}>
                <div className="customized-card">
                    <div className="customised-card-wrap">
                        <Row className="header">
                            <Col xl={20} xs={20} className="title-row">
                                <span
                                    title={schemeName}
                                    className={type === 'In-Registration' ? 'in-register-title' : 'card-title'}
                                    onClick={() => {
                                        this.redirectToSchemeOptions();
                                    }}
                                >
                                    {schemeName}
                                </span>
                                {type === 'In-Registration' && (
                                    <span className="date-text">Created on {Moment.dateOnly(createdAt, true)}</span>
                                )}
                                {type === 'Active' && transitionStatus && (
                                    <span className="date-text">In transition</span>
                                )}
                            </Col>
                            <Col xl={4} xs={4} className="rate-row">
                                <i
                                    className={`fa fa-icon ${scheme.isFavorite ? 'fa-star selected' : 'fa-star-o'}`}
                                    onClick={() => {
                                        this.updateIsFavourite(scheme);
                                    }}
                                ></i>
                            </Col>
                        </Row>
                        {/* {when transition status is true} */}
                        {type === 'Active' && transitionStatus && (
                            <div className="black-content">
                                <Content contentName="Assets Transitioned" contentKey="totalAssetValue" prefix="£" />
                                <Content contentName="Liabilities" contentKey="clientLiabilityValue" prefix="£" />
                            </div>
                        )}
                        {/* {when transition status is false} */}
                        {type === 'Active' && !transitionStatus && (
                            <div className="black-content">
                                <Content contentName="Assets" contentKey="totalAssetValue" prefix="£" />
                                <Content contentName="Liabilities" contentKey="clientLiabilityValue" prefix="£" />
                                <Content contentName="Funding Level" contentKey="fundingLevel" prefix="" />
                                <Content contentName="Quarterly Performance" contentKey="assetvsGiltReturn" prefix="" />
                            </div>
                        )}
                        {type === 'In-Registration' && (
                            <div className="black-content">
                                <Content
                                    contentName="Formal Proposal"
                                    contentStatusKey="investmentProposal"
                                    prefix=""
                                />
                                <Content
                                    contentName="Advisory Agreement"
                                    contentStatusKey="advisoryAgreement"
                                    prefix=""
                                />
                                <Content
                                    contentName="Asset Mngmt. Agreement"
                                    contentStatusKey="fmAgreement"
                                    prefix=""
                                />
                            </div>
                        )}
                    </div>
                </div>
            </Col>
        );
    }
}

SchemeCard.propTypes = {
    type: PropTypes.string.isRequired
};
SchemeCard.defaultProps = {
    type: null
};
