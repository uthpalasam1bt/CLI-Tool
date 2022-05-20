import React from 'react';
import { Row, Col, Card } from 'antd';

import icon2 from '../../assets/images/landing/landingpage-icon2.png';
import icon3 from '../../assets/images/landing/landingpage-icon3.png';
import icon4 from '../../assets/images/landing/landingpage-icon4.png';
import icon5 from '../../assets/images/landing/landingpage-icon5.png';
import icon6 from '../../assets/images/landing/landingpage-icon6.png';
import icon7 from '../../assets/images/landing/landingpage-icon7.png';

const FlowComponent = () => (
    <section className="flow-section">
        <div className="flow-wrap">
            <div className="container">
                <Row className="margin-row">
                    <Col lg={24}>
                        <h2 className="section-title">Fiduciary Management Service</h2>
                    </Col>
                </Row>
                <Row gutter={0} className="card-row">
                    <Col lg={7} md={12}>
                        <Card className="card">
                            <div className="card-data">
                                <div className="img-wrap">
                                    <img src={icon3} alt="img" />
                                </div>
                                <span className="card-title">Register your scheme</span>
                                <p className="card-description">
                                    Register as a user to add your scheme and take decisive steps to improve the outcome
                                    for your pension fund.
                                </p>
                            </div>
                        </Card>
                    </Col>
                    <Col className="line-connector">
                        <hr className="horizontal-line" />
                        <hr className="vertical-line" />
                    </Col>
                    <Col lg={7} md={12}>
                        <Card className="card">
                            <div className="card-data">
                                <div className="img-wrap">
                                    <img src={icon4} alt="img" />
                                </div>
                                <span className="card-title">Collaborate with your stakeholders</span>
                                <p className="card-description">
                                    A single secure place for trustees, the scheme sponsor, your advisors and the fund
                                    manager to collaborate, manage scheme related activities, store and manage scheme
                                    documents.
                                </p>
                            </div>
                        </Card>
                    </Col>
                    <Col className="line-connector">
                        <hr className="horizontal-line" />
                        <hr className="vertical-line" />
                    </Col>
                    <Col lg={7} md={12}>
                        <Card className="card">
                            <div className="card-data">
                                <div className="img-wrap">
                                    <img src={icon7} alt="img" width="65" />
                                </div>
                                <span className="card-title">Receive a formal proposal from LGIM</span>
                                <p className="card-description">
                                    Receive a tailored investment proposal to meet your objectives. Make use of our
                                    expertise to capture new opportunities and diversify exposures.
                                </p>
                            </div>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <span className="img-connector" />
                    <Col className="line-connector">
                        <hr className="vertical-line" />
                    </Col>
                </Row>
                <Row gutter={0} className="card-row">
                    <Col lg={7} md={12}>
                        <Card className="card">
                            <div className="card-data">
                                <div className="img-wrap">
                                    <img src={icon2} alt="img" />
                                </div>
                                <span className="card-title">Analyse your portfolio</span>
                                <p className="card-description">
                                    Use online tools to evaluate the trade offs of different target returns,
                                    contribution levels and investment preferences.
                                </p>
                            </div>
                        </Card>
                    </Col>
                    <Col className="line-connector">
                        <hr className="horizontal-line" />
                        <hr className="vertical-line" />
                    </Col>
                    <Col lg={7} md={12}>
                        <Card className="card">
                            <div className="card-data">
                                <div className="img-wrap">
                                    <img src={icon5} alt="img" width="75" />
                                </div>
                                <span className="card-title">
                                    Open and manage your investment management account online
                                </span>
                                <p className="card-description">
                                    Complete all account opening formalities, sign all necessary agreements and make
                                    ongoing updates online, greatly reducing time and effort.
                                </p>
                            </div>
                        </Card>
                    </Col>
                    <Col className="line-connector">
                        <hr className="horizontal-line" />
                        <hr className="vertical-line" />
                    </Col>
                    <Col lg={7} md={12}>
                        <Card className="card">
                            <div className="card-data">
                                <div className="img-wrap">
                                    <img src={icon6} alt="img" />
                                </div>
                                <span className="card-title">Monitor online</span>
                                <p className="card-description">
                                    Constantly monitor performance and risks. Track funding level versus triggers to
                                    take dynamic de-risking action. Access current and archived scheme reports.
                                </p>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    </section>
);

export default FlowComponent;
