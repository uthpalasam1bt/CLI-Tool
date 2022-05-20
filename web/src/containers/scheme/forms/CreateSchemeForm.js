import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector, Field } from 'redux-form';
import { InputField, SelectOptions } from '../../../UILibrary/components/forms/fields';
import { required, length, format } from 'redux-form-validators';
import { Row, Col } from 'antd';
import { UserRole } from '../../../constants/userConstants';
// import { TrusteeTypes } from '../../../constants/trusteeConstants';
import BrowserStorage from '../../../middlewares/storage';

let CreateSchemeForm = props => {
    const { inProgress, handleShow, handleSubmit, schemeCategory } = props;
    const loggedUser = BrowserStorage.getInstance().getLoggedUser();
    const { primaryRole } = loggedUser;
    console.log(primaryRole);

    const userTypeOptions = {
        defaultValue: 'Select role',
        dataList: [
            { key: UserRole.TRUSTEE, value: 'Trustee' },
            { key: UserRole.SPONSOR, value: 'Sponsor' },
            { key: UserRole.ADVISOR, value: 'Advisor' },
            { key: UserRole.OTHER, value: 'Other' }
        ]
    };

    // const trusteeTypeOptions = {
    //     defaultValue: 'Select your type of trustee',
    //     dataList: [
    //         { key: TrusteeTypes.INDIVIDUAL_TRUSTEE, value: 'Individual Trustees' },
    //         { key: TrusteeTypes.CORPORATE_TRUSTEE, value: 'Corporate Trustee' }
    //     ]
    // };

    // const managersOtherThanLGIMOptions = {
    //     defaultValue: 'Select',
    //     dataList: [{ key: 'true', value: 'Yes' }, { key: 'false', value: 'No' }]
    // };

    // const schemeFundTypeOptions = {
    //     defaultValue: 'Select scheme type',
    //     dataList: [
    //         { key: 'pooledFund', value: 'Pooled Fund' }, //if you change this keys please refer create scheme hook
    //         { key: 'navGuide', value: 'NavGuide' } //if you change this keys please refer create scheme hook
    //     ]
    // };

    return (
        <form className="create-scheme-form" onSubmit={handleSubmit}>
            <Row className="input-row">
                <Col xs={24}>
                    <label htmlFor="schemeName" className="input-title">
                        Scheme name
                    </label>
                </Col>
                <Col xs={24}>
                    <Field
                        name="schemeName"
                        className="form-control"
                        component={InputField}
                        autocomplete="off"
                        validate={[
                            required({ message: 'Required' }),
                            length({
                                in: [2, 200],
                                message: 'Character limit should be withing 2 - 200 characters.'
                            }),
                            format({
                                without: /[`~!@#$%^*()|+\=?;:'"<>\{\}\[\]\\\/]/gi,
                                message: 'Special characters are not allowed for scheme name.'
                            })
                        ]}
                    />
                </Col>
            </Row>
            {/* {primaryRole === UserRole.GOVERN_USER && (
                <Row className="input-row">
                    <Col xs={24}>
                        <label htmlFor="schemeFundType" className="input-title">
                            Select your scheme type
                        </label>
                    </Col>
                    <Col xs={24}>
                        <Field
                            name="schemeCategory"
                            className="form-control"
                            component={SelectOptions}
                            validate={required({ message: 'Required' })}
                            options={schemeFundTypeOptions}
                        />
                    </Col>
                </Row>
            )} */}
            {schemeCategory !== 'pooledFund' && (
                <>
                    <Row className="input-row">
                        <Col xs={24}>
                            <label htmlFor="userType" className="input-title">
                                Select your role
                            </label>
                        </Col>
                        <Col xs={24}>
                            <Field
                                name="schemeUserRole"
                                className="form-control"
                                component={SelectOptions}
                                validate={required({ message: 'Required' })}
                                options={userTypeOptions}
                            />
                        </Col>
                    </Row>
                    {/* <Row className="input-row">
            <Col xs={24}>
              <label htmlFor="trusteeType" className="input-title">
                Does the scheme have a corporate trustee or individual trustees?
              </label>
            </Col>
            <Col xs={24}>
              <Field
                name="trusteeType"
                className="form-control"
                component={SelectOptions}
                validate={required({ message: 'Required' })}
                options={trusteeTypeOptions}
              />
            </Col>
          </Row> */}
                </>
            )}
            {/* {trusteeType === TrusteeTypes.CORPORATE_TRUSTEE && schemeCategory !== 'pooledFund' &&  (
        <Row className="input-row">
          <Col xs={24}>
            <label htmlFor="trusteeEntityName" className="input-title">
              Corporate Trustee Entity Name
            </label>
          </Col>
          <Col xs={24}>
            <Field
              name="trusteeEntityName"
              className="form-control"
              component={InputField}
              validate={required({ message: 'Required' })}
            />
          </Col>
        </Row>
      )} */}
            {/* {schemeCategory !== 'pooledFund' && (
                <Row className="input-row">
                    <Col xs={24}>
                        <label htmlFor="managersOtherThanLGIM" className="input-title">
                            Does the scheme hold assets with managers other than LGIM?
                        </label>
                    </Col>
                    <Col xs={24}>
                        <Field
                            name="hasManagers"
                            className="form-control"
                            component={SelectOptions}
                            validate={required({ message: 'Required' })}
                            options={managersOtherThanLGIMOptions}
                        />
                    </Col>
                </Row>
            )} */}
            <div className="footer">
                <button className="btn-grey-o regular btn-close" type="button" onClick={handleShow}>
                    Cancel
                </button>
                <button className="tpip-btn-blue regular" type="submit" disabled={inProgress}>
                    Create {inProgress && <i className="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>}
                </button>
            </div>
        </form>
    );
};

CreateSchemeForm = reduxForm({
    form: 'createSchemeForm'
})(CreateSchemeForm);
const selector = formValueSelector('createSchemeForm');

CreateSchemeForm = connect(state => {
    const trusteeType = selector(state, 'trusteeType');
    const schemeCategory = selector(state, 'schemeCategory');
    return { trusteeType, schemeCategory };
})(CreateSchemeForm);

export default CreateSchemeForm;
