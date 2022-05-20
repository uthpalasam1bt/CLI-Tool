import React from 'react';
import { Row, Col, Card } from 'antd';

const WhyUsComponent = () => (
    <section className="why-us-section">
        <div className="why-wrap">
            <div className="container">
                <Row className="why-row">
                    <Col lg={24}>
                        <h2 className="section-title">Why you should choose us</h2>
                        <p className="section-subtitle">
                            We are a major global investor specialising in helping UK defined benefit pension schemes.
                        </p>
                    </Col>
                </Row>
                <Row gutter={16} className="card-wrap">
                    <Col lg={6} xs={24} md={8}>
                        <Card className="card card-blue">
                            <p className="card-title">£1,279bn</p>
                            <p className="card-description">
                                Assets under <br /> management
                                <span className="text-sup">
                                    A<sup>A</sup>
                                </span>
                            </p>
                        </Card>
                    </Col>
                    <Col lg={6} xs={24} md={8}>
                        <Card className="card card-orange">
                            <p className="card-title">1836</p>
                            <p className="card-description">
                                Legal & General <br /> Group founded
                            </p>
                        </Card>
                    </Col>
                    <Col lg={6} xs={24} md={8}>
                        <Card className="card card-red">
                            <p className="card-title">350+</p>
                            <p className="card-description">
                                Investment <br /> professionals
                            </p>
                        </Card>
                    </Col>
                    <Col lg={6} xs={24} md={8}>
                        <Card className="card card-green">
                            <p className="card-title">16 years</p>
                            <p className="card-description">
                                average portfolio <br /> manager experience
                                {/* <span className="text-sup">D</span> */}
                            </p>
                        </Card>
                    </Col>
                    <Col lg={6} xs={24} md={8}>
                        <Card className="card card-green">
                            <p className="card-title">2,800+</p>
                            <p className="card-description">staff globally</p>
                        </Card>
                    </Col>
                    <Col lg={6} xs={24} md={8}>
                        <Card className="card card-red">
                            <p className="card-title">
                                11<sup>th</sup> largest
                            </p>
                            <p className="card-description">
                                asset manager <br /> worldwide
                                <span className="text-sub">B</span>
                            </p>
                        </Card>
                    </Col>
                    <Col lg={6} xs={24} md={8}>
                        <Card className="card card-orange">
                            <p className="card-title">2,500+</p>
                            <p className="card-description">
                                clients across <br /> the globe
                            </p>
                        </Card>
                    </Col>
                    <Col lg={6} xs={24} md={8}>
                        <Card className="card card-blue">
                            <p className="card-title">UK’s largest</p>
                            <p className="card-description">
                                pension fund <br /> manager
                                <span className="text-sub">B</span>
                            </p>
                        </Card>
                    </Col>
                </Row>
                <div className="bottom-text">
                    <p>
                        <b>A.</b> LGIM data as at 31 December 2020 – assets managed by LGIM, LGIMA and LGIM Asia.
                        Includes value of derivatives positions. <br /> <b>B.</b> IPE Research 2020
                        {/* <b>C.</b>{' '}Institutional approximate clients. Source: LGIM internal data 31 December 2017 -{' '}
            <b>D.</b> Source: as at 31 December 2017 - <b>E.</b> Source: KPMG LDI Survey 2017 */}
                    </p>
                </div>
            </div>
        </div>
    </section>
);

export default WhyUsComponent;
