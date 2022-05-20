import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Row, Card, Spin, Divider } from 'antd';
import moment from 'moment';
import { fetchTrustees } from '../../../activeWorkflow/commonModules/getTrustees/actions';
import {
    INDIVIDUAL_TRUSTEE_DETAILS_FIELD_LABELS,
    COPORATE_TRUSTEE_DETAILS_FIELD_LABELS
} from '../../../registration/constants';
import { getScheme } from '../../../../scheme/actions/schemeActions';

class SchemeForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            total: 0,
            trusteeInfo: {},
            loadingTrustees: true
        };
    }

    componentDidMount() {
        let { schemeId } = this.props.store_schemeData;
        this.props.getScheme(schemeId);
        this.props.getTrustees(schemeId, trustees => {
            this.setState({ loadingTrustees: false });
            this.setTrusteeInformation(trustees);
        });
    }

    setTrusteeInformation = trustees => {
        if (trustees && trustees.length) {
            let primaryTrustee = trustees.find(t => t.isPrimaryTrustee) || {};
            let otherTrustees = trustees.filter(t => !t.isPrimaryTrustee) || {};

            let trusteeObj = {
                numberOfTrustees: trustees.length,
                primaryTrusteeEmail: primaryTrustee.email,
                primaryTrusteeName: primaryTrustee.name,
                primaryTrusteeContact: primaryTrustee.phoneNumber,
                otherTrustees: otherTrustees
            };

            this.setState({ trusteeInfo: trusteeObj });
        }
    };

    render() {
        const { schemeName, trusteeType, trusteeEntityName, hasManagers, trusteeMeta } = this.props.store_schemeData;
        let { dateOfTrustDeed } = trusteeMeta;
        let { address1, address2, address3, city, postalCode, numberOfMembers } = this.props.getIAAData_data || {};

        const {
            trusteeInfo,
            trusteeInfo: { otherTrustees = [] },
            loadingTrustees
        } = this.state;

        let trusteeTypeName = '';

        if (trusteeType && trusteeType === 'individual_trustee') {
            trusteeTypeName = 'Individual trustee';
        } else if (trusteeType && trusteeType === 'corporate_trustee') {
            trusteeTypeName = 'Corporate trustee';
        }

        const fieldNames =
            trusteeType === 'individual_trustee'
                ? INDIVIDUAL_TRUSTEE_DETAILS_FIELD_LABELS
                : COPORATE_TRUSTEE_DETAILS_FIELD_LABELS;

        return (
            <>
                {loadingTrustees ? (
                    <div className="text-center">
                        <Spin />
                    </div>
                ) : (
                    <>
                        <Row className="input-row">
                            <Col xl={12} lg={12} xs={24} className="label-wrapper">
                                <label className="input-title">Scheme name</label>
                            </Col>
                            <Col xl={10} lg={12} xs={24} className="input-wrapper">
                                <div className={`field-wrapper`}>
                                    <input
                                        className="form-control input-field"
                                        title={schemeName || ''}
                                        value={schemeName || ''}
                                        disabled
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row className="input-row">
                            <Col xl={12} lg={12} xs={24} className="label-wrapper">
                                <label className="input-title">
                                    Does the scheme have a corporate trustee or individual trustees ?
                                </label>
                            </Col>
                            <Col xl={10} lg={12} xs={24} className="input-wrapper">
                                <div className={`field-wrapper`}>
                                    <input className="form-control input-field" value={trusteeTypeName} disabled />
                                </div>
                            </Col>
                        </Row>
                        {trusteeType !== 'individual_trustee' ? (
                            <Row className="input-row">
                                <Col xl={12} lg={12} xs={24} className="label-wrapper">
                                    <label className="input-title">Corporate trustee entity name</label>
                                </Col>
                                <Col xl={10} lg={12} xs={24} className="input-wrapper">
                                    <div className={`field-wrapper`}>
                                        <input
                                            className="form-control input-field"
                                            title={trusteeEntityName || ''}
                                            value={trusteeEntityName || ''}
                                            disabled
                                        />
                                    </div>
                                </Col>
                            </Row>
                        ) : null}
                        {/*<Row className="input-row">
              <Col xl={12} lg={12} xs={24} className="label-wrapper">
                <label className="input-title">
                  Does the scheme hold assets with managers other than LGIM ?
                </label>
              </Col>
              <Col xl={10} lg={12} xs={24} className="input-wrapper">
                <div className={`field-wrapper`}>
                  <input
                    className="form-control input-field"
                    value={hasManagers ? 'Yes' : 'No'}
                    disabled
                  />
                </div>
              </Col>
            </Row>*/}
                        <Row className="input-row">
                            <Col xl={12} lg={12} xs={24} className="label-wrapper">
                                <label className="input-title">Date of trust deed</label>
                            </Col>
                            <Col xl={10} lg={12} xs={24} className="input-wrapper">
                                <div className={`field-wrapper`}>
                                    <input
                                        className="form-control input-field"
                                        value={dateOfTrustDeed ? moment(dateOfTrustDeed).format('DD-MM-YYYY') : ''}
                                        disabled
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row className="input-row">
                            <Col xl={12} lg={12} xs={24} className="label-wrapper">
                                <label className="input-title">Approximate number of members in the scheme</label>
                            </Col>
                            <Col xl={10} lg={12} xs={24} className="input-wrapper">
                                <div className={`field-wrapper`}>
                                    <input
                                        className="form-control input-field"
                                        value={numberOfMembers || ''}
                                        disabled
                                        title={numberOfMembers || ''}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row className="input-row">
                            <Col xl={24} lg={24} xs={24} className="label-wrapper">
                                <label className="input-title deficit-title">
                                    <b>Address of trustees for correspondence</b>
                                </label>
                            </Col>
                        </Row>
                        <Row className="input-row">
                            <Card className="content-wrap">
                                <Row className="input-row">
                                    <Col xl={4} lg={12} xs={24} className="label-wrapper">
                                        <label className="input-title">Address</label>
                                    </Col>
                                    <Col xl={20} lg={12} xs={24}>
                                        <Row className="input-row">
                                            <div className={`field-wrapper`}>
                                                <input
                                                    className="form-control input-field"
                                                    disabled
                                                    value={address1 || ''}
                                                    title={address1 || ''}
                                                />
                                            </div>
                                        </Row>
                                        <Row className="input-row">
                                            <div className={`field-wrapper`}>
                                                <input
                                                    className="form-control input-field"
                                                    disabled
                                                    value={address2 || ''}
                                                    title={address2 || ''}
                                                />
                                            </div>
                                        </Row>
                                        <Row className="input-row">
                                            <div className={`field-wrapper`}>
                                                <input
                                                    className="form-control input-field"
                                                    disabled
                                                    value={address3 || ''}
                                                    title={address3 || ''}
                                                />
                                            </div>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className="input-row address-content-wrap">
                                    <Col xl={12} lg={12} xs={24}>
                                        <Row className="input-row">
                                            <Col xl={8} lg={12} xs={24} className="label-wrapper">
                                                <label className="input-title">City</label>
                                            </Col>
                                            <Col xl={16} lg={12} xs={24} className="input-wrapper custom-input">
                                                <input
                                                    className="form-control input-field"
                                                    disabled
                                                    value={city || ''}
                                                    title={city || ''}
                                                />
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xl={12} lg={12} xs={24}>
                                        <Row className="input-row">
                                            <Col xl={8} lg={12} xs={24} className="label-wrapper">
                                                <label className="input-title extra-padding">Postcode</label>
                                            </Col>
                                            <Col xl={16} lg={12} xs={24} className="input-wrapper custom-input">
                                                <input
                                                    className="form-control input-field"
                                                    disabled
                                                    value={postalCode || ''}
                                                />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card>
                        </Row>
                        <Row className="input-row">
                            <hr />
                        </Row>
                        {trusteeType === 'individual_trustee' ? (
                            <>
                                <Row className="input-row">
                                    <Col xl={12} lg={12} xs={24} className="label-wrapper">
                                        <label className="input-title">Number of trustees</label>
                                    </Col>
                                    <Col xl={10} lg={12} xs={24} className="input-wrapper">
                                        <div className={`field-wrapper`}>
                                            <input
                                                className="form-control input-field"
                                                value={trusteeInfo.numberOfTrustees || ''}
                                                disabled
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="input-row">
                                    <Col xl={12} lg={12} xs={24} className="label-wrapper">
                                        <label className="input-title">
                                            Number of trustees required to approve strategy change
                                        </label>
                                    </Col>
                                    <Col xl={10} lg={12} xs={24} className="input-wrapper">
                                        <div className={`field-wrapper`}>
                                            <input
                                                className="form-control input-field"
                                                value={trusteeMeta.dynamicApprovalCount}
                                                disabled
                                            />
                                        </div>
                                    </Col>
                                </Row>
                            </>
                        ) : null}
                        <Row className="input-row">
                            <Col xl={24} lg={24} xs={24} className="label-wrapper">
                                <label className="input-title deficit-title">
                                    {' '}
                                    <b>
                                        {fieldNames.TITLE}
                                        {/* Primary trustee details */}
                                    </b>
                                </label>
                            </Col>
                        </Row>
                        <Row className="input-row">
                            <Col xl={12} lg={12} xs={24} className="label-wrapper">
                                <label className="input-title">
                                    {fieldNames.NAME}
                                    {/* Who is the primary trustee contact for the scheme? */}
                                </label>
                            </Col>
                            <Col xl={10} lg={12} xs={24} className="input-wrapper">
                                <div className={`field-wrapper`}>
                                    {' '}
                                    <input
                                        className="form-control input-field"
                                        value={trusteeInfo.primaryTrusteeName || ''}
                                        title={trusteeInfo.primaryTrusteeName || ''}
                                        disabled
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row className="input-row">
                            <Col xl={12} lg={12} xs={24} className="label-wrapper">
                                <label className="input-title">
                                    {fieldNames.EMAIL}
                                    {/* Primary trustee contact e-mail */}
                                </label>
                            </Col>
                            <Col xl={10} lg={12} xs={24} className="input-wrapper">
                                <div className={`field-wrapper`}>
                                    <input
                                        className="form-control input-field"
                                        value={trusteeInfo.primaryTrusteeEmail || ''}
                                        title={trusteeInfo.primaryTrusteeEmail || ''}
                                        disabled
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row className="input-row">
                            <Col xl={12} lg={12} xs={24} className="label-wrapper">
                                <label className="input-title">
                                    {fieldNames.PHONE}
                                    {/* Primary trustee contact phone number */}
                                </label>
                            </Col>
                            <Col xl={10} lg={12} xs={24} className="input-wrapper">
                                <div className={`field-wrapper`}>
                                    <input
                                        className="form-control input-field"
                                        value={trusteeInfo.primaryTrusteeContact || ''}
                                        disabled
                                    />
                                </div>
                            </Col>
                        </Row>
                        {otherTrustees.length > 0 ? (
                            <>
                                <Row className="input-row">
                                    <hr />
                                </Row>
                                <Row className="input-row">
                                    <Col xl={24} lg={24} xs={24} className="label-wrapper">
                                        <label className="input-title deficit-title">
                                            <b>
                                                {fieldNames.OTHER_TRUSTEES.TITLE}
                                                {/* Other trustees details  */}
                                            </b>
                                        </label>
                                    </Col>
                                </Row>
                                {otherTrustees.map((otherTrustee, key) => (
                                    <Card
                                        key={key}
                                        bordered={trusteeType === 'individual_trustee' ? true : false}
                                        className={trusteeType === 'individual_trustee' ? '' : 'no-card-padding'}
                                    >
                                        <Row className="input-row">
                                            <Col xl={12} lg={12} xs={24} className="label-wrapper">
                                                <label className="input-title">
                                                    {fieldNames.OTHER_TRUSTEES.NAME}
                                                    {/* Name of other trustees */}
                                                </label>
                                            </Col>
                                            <Col xl={10} lg={12} xs={24} className="input-wrapper">
                                                <div className={`field-wrapper`}>
                                                    <input
                                                        className="form-control input-field"
                                                        value={otherTrustee.name || ''}
                                                        title={otherTrustee.name || ''}
                                                        disabled
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className="input-row">
                                            <Col xl={12} lg={12} xs={24} className="label-wrapper">
                                                <label className="input-title">
                                                    {fieldNames.OTHER_TRUSTEES.EMAIL}
                                                    {/* Email of other trustees */}
                                                </label>
                                            </Col>
                                            <Col xl={10} lg={12} xs={24} className="input-wrapper">
                                                <div className={`field-wrapper`}>
                                                    <input
                                                        className="form-control input-field"
                                                        value={otherTrustee.email || ''}
                                                        title={otherTrustee.email || ''}
                                                        disabled
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className="input-row">
                                            <Col xl={12} lg={12} xs={24} className="label-wrapper">
                                                <label className="input-title">
                                                    {fieldNames.OTHER_TRUSTEES.PHONE}
                                                    {/* Contact number of other trustees */}
                                                </label>
                                            </Col>
                                            <Col xl={10} lg={12} xs={24} className="input-wrapper">
                                                <div className={`field-wrapper`}>
                                                    <input
                                                        className="form-control input-field"
                                                        value={otherTrustee.phoneNumber || ''}
                                                        disabled
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                        {trusteeType !== 'individual_trustee' && <Divider />}
                                    </Card>
                                ))}
                            </>
                        ) : null}
                    </>
                )}
            </>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    getTrustees: (schemeId, callback) => dispatch(fetchTrustees(schemeId, callback)),
    getScheme: schemeId => dispatch(getScheme({ schemeId }))
});

export default connect(
    null,
    mapDispatchToProps
)(SchemeForm);
