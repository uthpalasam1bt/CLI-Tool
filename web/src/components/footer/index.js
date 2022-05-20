import React, { Component } from 'react';
import { Row, Col } from 'antd';
import config from 'appConfig';
import footerImage1 from '../../assets/images/footer/award-1.png';
import footerImage2 from '../../assets/images/footer/award-2.png';
import footerImage3 from '../../assets/images/footer/award-3.jpg';
import footerImage4 from '../../assets/images/footer/award-4.jpg';
import footerImage5 from '../../assets/images/footer/award-5.jpg';
import logo from '../../assets/images/logo.svg';

const {
    termsAndConditionDocs: { registeredUser, guestUser },
    publicBucket
} = config;
class Footer extends Component {
    constructor(props) {
        super(props);
    }

    state = {};

    render() {
        const { loggedUser } = this.props;
        return (
            <>
                <div className="footer-wrap">
                    <div className="container">
                        <Row className="footer-row" gutter={12}>
                            <Col xl={4} xs={24} sm={6} className="footer-col">
                                <img alt="Logo" className="image" src={logo} width="120" />
                            </Col>

                            <Col xl={14} xs={24} sm={12} className="footer-col">
                                <Row>
                                    <Col xl={5} xs={12} sm={12} className="img-wrap">
                                        <img alt="Award5" className="image" src={footerImage5} width="119.5" />
                                    </Col>
                                    <Col xl={5} xs={12} sm={12} className="img-wrap">
                                        <img alt="Award4" className="image" src={footerImage4} width="120" />
                                    </Col>
                                    <Col xl={5} xs={12} sm={12} className="img-wrap">
                                        <img alt="Award3" className="image" src={footerImage3} width="120" />
                                    </Col>
                                    <Col xl={5} xs={12} sm={12} className="img-wrap">
                                        <img alt="Award1" className="image" src={footerImage1} width="120" />
                                    </Col>
                                    <Col xl={4} xs={24} sm={24} className="img-wrap">
                                        <img alt="Award2" className="image" src={footerImage2} width="80" />
                                    </Col>
                                </Row>
                            </Col>

                            <Col xl={6} xs={24} sm={6} className="footer-col">
                                <div className="footer-list">
                                    <div className="footer-items pd-0">
                                        <a
                                            href={`https://${publicBucket}.s3.eu-west-2.amazonaws.com/${
                                                loggedUser ? registeredUser : guestUser
                                            }`}
                                            target="_blank"
                                        >
                                            Terms and Conditions
                                        </a>
                                    </div>
                                    <div className="footer-items">
                                        <a href="https://www.lgim.com/" target="_blank">
                                            LGIM Website
                                        </a>
                                    </div>
                                    <div className="footer-heading heading-contact">Contact Us</div>
                                    <div className="footer-items custom-item">
                                        Email:{' '}
                                        <a href="mailto:fiduciarymanagement@lgim.com">fiduciarymanagement@lgim.com</a>
                                    </div>
                                    <div className="footer-items custom-item">Tel: +44 20 3124 4364</div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className="footer-main">
                        <div className="line-wrap">
                            <span className="blue-line" />
                            <span className="green-line" />
                            <span className="red-line" />
                            <span className="yellow-line" />
                        </div>
                        <div className="container">
                            <Row>
                                <Col>
                                    <p className="footer-text">
                                        © Legal &amp; General Investment Management (Holdings) Limited 2019. All rights
                                        reserved.
                                    </p>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Footer;
