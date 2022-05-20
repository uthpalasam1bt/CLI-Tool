import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { history } from '../../redux/store';
import { createStructuredSelector } from 'reselect';
import { Row, Col } from 'antd';

import NotificationHelper from '../../helpers/NotificationHelper';
import ContactUsForm from './forms/ContactUsForm';
import { doContactUs } from './actions/contactUsActions';
import { contactUs_inProgress, contactUs_status, contactUs_error } from './selectors/contactUsSelectors';

import { DETAILS_RECIEVE_SUCCESS } from '../../config/constants';

class ContactUsContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contactUs_inProgress: false,
            contactUs_status: false,
            contactUs_error: null
        };

        this.handleSubmitContactUs = this.handleSubmitContactUs.bind(this);
    }

    UNSAFE_componentWillReceiveProps(np, nc) {
        const { contactUs_inProgress, contactUs_status } = this.state;
        if (np.contactUs_inProgress !== null && contactUs_inProgress !== np.contactUs_inProgress) {
            this.setState({ contactUs_inProgress: np.contactUs_inProgress, contactUs_status: false });
        }
        if (np.contactUs_status !== null && contactUs_status !== np.contactUs_status) {
            this.setState({ contactUs_status: np.contactUs_status }, () => {
                if (np.contactUs_status === true) {
                    NotificationHelper.getInstance().success(DETAILS_RECIEVE_SUCCESS);
                    history.push('/');
                }
            });
        }
        if (np.contactUs_error !== null && np.contactUs_error.message) {
            this.setState({ contactUs_error: np.contactUs_error }, () => {
                NotificationHelper.getInstance().error(np.contactUs_error.message);
            });
        }
    }

    handleSubmitContactUs(formData) {
        delete formData.recaptcha;
        this.props.doContactUs(formData);
    }

    render() {
        const { contactUs_inProgress } = this.state;

        return (
            <div className="contact-us-wrap">
                <section className="contact-us-header">
                    <div className="container">
                        <h4 className="contact-us-text">Contact Us</h4>
                    </div>
                </section>

                <section className="contact-us-container">
                    <div className="container">
                        <Row className="contact-us-row">
                            <Col xl={15} lg={18} md={20} xs={24} className="contact-us-content">
                                <ContactUsForm
                                    onSubmit={this.handleSubmitContactUs}
                                    inProgress={contactUs_inProgress}
                                />
                            </Col>
                        </Row>
                    </div>
                </section>
            </div>
        );
    }
}

ContactUsContainer.propTypes = {
    contactUs_inProgress: PropTypes.bool,
    contactUs_status: PropTypes.bool,
    contactUs_error: PropTypes.object
};

ContactUsContainer.defaultProps = {
    contactUs_inProgress: false,
    contactUs_status: false,
    contactUs_error: null
};
const mapStateToProps = createStructuredSelector({
    contactUs_inProgress: contactUs_inProgress(),
    contactUs_status: contactUs_status(),
    contactUs_error: contactUs_error()
});

const mapDispatchToProps = dispatch => ({
    doContactUs: payload => {
        dispatch(doContactUs(payload));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContactUsContainer);
