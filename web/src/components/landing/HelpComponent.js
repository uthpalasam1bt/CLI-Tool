import React from 'react';
import { Row, Col } from 'antd';
import img from '../../assets/images/Infographics.svg';

const rightColData = [
    {
        title: '1. The pension challenge',
        description:
            'No two pension schemes are alike and the needs of individual schemes will typically change over time. Many schemes have a greater need than ever to grow their assets, but are less able to cope with market shocks alongside increasing investment and regulatory complexity'
    },
    {
        title: '2. The investment management solution',
        description:
            'A dedicated risk manager who really understands your scheme. Investment management can have benefits for trustees and scheme sponsors'
    },
    {
        title: '3. Working in partnership with you',
        description:
            'Our specialist team can deliver the expertise, resources, focus and time required to manage the complex financial burden that pension schemes impose'
    },
    {
        title: '4. Our investment philosophy',
        description:
            'Our broad expertise across the full spectrum of asset classes means that we have no need to sub-delegate the management of client investments to third parties'
    }
];
const leftColData = [
    {
        title: '5. Dynamic risk management',
        description:
            'The ability to react quickly and adjust asset allocations to changing market conditions is hugely beneficial but can be very difficult and expensive within a fragmented portfolio structure'
    },
    {
        title: '6. Expertise in asset allocation',
        description:
            'We have deep expertise across economic analysis and asset allocation research.This is a key input into the efficient capture of opportunities to achieve your investment goals'
    },
    {
        title: '7. Bespoke liability hedging',
        description:
            'We will build on our expertise as the UK’s largest LDI manager to protect against interest rate and inflation risk whilst also matching your scheme’s liability cashflows using the optimal mix of gilts, swaps and bonds'
    },
    {
        title: '8. Easy route to buy-out',
        description:
            'Whether your ultimate goal is self-sufficiency or full buy-out, we will be able to adapt your portfolio over time as your needs evolve'
    }
];
const HelpComponent = () => (
    <section className="help-section">
        <div className="help-wrap">
            <div className="container">
                <Row className="help-row">
                    <Col lg={24}>
                        <h2 className="section-title">How LGIM fiduciary management can help you</h2>
                        <p className="section-subtitle">
                            Delivering your scheme specific objectives through day-to-day management of the portfolios
                        </p>
                    </Col>
                </Row>
                <Row className="desc-row">
                    <Col lg={8} xs={24}>
                        {rightColData.map((data, dKey) => (
                            <div className="col-item col-right" key={dKey}>
                                <h5 className="help-title">{data.title}</h5>
                                <p className="help-description">{data.description}</p>
                            </div>
                        ))}
                    </Col>
                    <Col lg={1} xs={24} className="line-wrap">
                        <span className="blue-line" />
                        <span className="green-line" />
                        <span className="red-line" />
                        <span className="yellow-line" />
                    </Col>
                    <Col lg={8} xs={24}>
                        {leftColData.map((data, dKey) => (
                            <div className="col-item col-left" key={dKey}>
                                <h5 className="help-title">{data.title}</h5>
                                <p className="help-description">{data.description}</p>
                            </div>
                        ))}
                    </Col>
                </Row>
                <Row className="desc-row last-row">
                    <Col lg={10} xs={24}>
                        <div className="col-item">
                            <h5 className="help-title">9. Avoiding hidden costs and risks</h5>
                            <p className="help-description">
                                Transaction costs and associated hidden costs can be reduced or avoided entirely by
                                crossing trades between investors. As the UK's largest manager of pension scheme assets,
                                LGIM is able to cross almost half of all fund trades across commonly used funds
                            </p>
                        </div>
                    </Col>
                </Row>
            </div>
            <Row className="custom-container">
                <img src={img} alt="info-img" className="info-img" />
            </Row>
        </div>
    </section>
);

export default HelpComponent;
