import React from 'react';
import { Card, Row, Col } from 'antd';
import icon1 from '../../assets/images/knowledgeCenter/knowledge1.svg';
import icon2 from '../../assets/images/knowledgeCenter/knowledge2.svg';
import icon3 from '../../assets/images/knowledgeCenter/knowledge3.svg';
import icon4 from '../../assets/images/knowledgeCenter/knowledge4.svg';
import icon5 from '../../assets/images/knowledgeCenter/knowledge5.svg';
import icon6 from '../../assets/images/knowledgeCenter/knowledge6.svg';
import moreIcon from '../../assets/images/knowledgeCenter/reamore.svg';

function KnowladgeCenter() {
    const openWindow = url => {
        window.open(url);
    };

    return (
        <section className="knowledge-bridge-wrap">
            <div className="container">
                <div className="bridge-wrapper">
                    <Row className="card-row" gutter={20}>
                        <Col xl={8} md={12} xs={24}>
                            <Card className="card" cover={<img alt="img" src={icon6} />}>
                                <div className="wrap">
                                    <span className="title">Our Thinking</span>
                                    <span className="description">
                                        Bringing our most compelling thoughts to help you make more informed investment
                                        decisions.
                                    </span>
                                </div>
                                <span className="link">
                                    <img src={moreIcon} alt="icon" className="icon" />
                                    <a
                                        href="#"
                                        onClick={() => openWindow('https://www.lgim.com/uk/en/insights/our-thinking/')}
                                    >
                                        Read More
                                    </a>
                                </span>
                            </Card>
                        </Col>
                        <Col xl={8} md={12} xs={24}>
                            <Card className="card" cover={<img alt="img" src={icon5} />}>
                                <div className="wrap">
                                    <span className="title">LGIM Blog</span>
                                    <span className="description">
                                        Exploring the future of investment with the thoughts of today.
                                    </span>
                                </div>
                                <span className="link">
                                    <img src={moreIcon} alt="icon" className="icon" />
                                    <a href="#" onClick={() => openWindow('https://www.lgimblog.com/')}>
                                        Read More
                                    </a>
                                </span>
                            </Card>
                        </Col>
                        <Col xl={8} md={12} xs={24}>
                            <Card className="card" cover={<img alt="img" src={icon4} />}>
                                <div className="wrap">
                                    <span className="title">LGIM Talks: an investment management podcast</span>
                                    <span className="description">
                                        Conversations about the global economy, and how investors can take advantage of
                                        these opportunities.
                                    </span>
                                </div>
                                <span className="link">
                                    <img src={moreIcon} alt="icon" className="icon" />
                                    <a
                                        href="#"
                                        onClick={() => openWindow('https://www.lgim.com/uk/en/insights/podcast/')}
                                    >
                                        Read More
                                    </a>
                                </span>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="card-row" gutter={20}>
                        <Col xl={8} md={12} xs={24}>
                            <Card className="card" cover={<img alt="img" src={icon3} />}>
                                <div className="wrap">
                                    <span className="title">Literature</span>
                                    <span className="description">Our literature library</span>
                                </div>
                                <span className="link">
                                    <img src={moreIcon} alt="icon" className="icon" />
                                    <a
                                        href="#"
                                        onClick={() =>
                                            openWindow('https://www.lgim.com/uk/en/insights/literature-uk-en/')
                                        }
                                    >
                                        Read More
                                    </a>
                                </span>
                            </Card>
                        </Col>
                        <Col xl={8} md={12} xs={24}>
                            <Card className="card" cover={<img alt="img" src={icon1} />}>
                                <div className="wrap">
                                    <span className="title">Videos and webinars</span>
                                    <span className="description">
                                        Watch our latest webinars and videos from our investment teams.
                                    </span>
                                </div>
                                <span className="link">
                                    <img src={moreIcon} alt="icon" className="icon" />
                                    <a
                                        href="#"
                                        onClick={() =>
                                            openWindow('https://www.lgim.com/uk/en/insights/videos-and-webinars/')
                                        }
                                    >
                                        Read More
                                    </a>
                                </span>
                            </Card>
                        </Col>
                        <Col xl={8} md={12} xs={24}>
                            <Card className="card" cover={<img alt="img" src={icon2} />}>
                                <div className="wrap">
                                    <span className="title">Trustee education</span>
                                    <span className="description">
                                        Watch our latest webinars and videos from our investment teams.
                                    </span>
                                </div>
                                <span className="link">
                                    <img src={moreIcon} alt="icon" className="icon" />
                                    <a
                                        href="#"
                                        onClick={() =>
                                            openWindow('https://www.lgim.com/uk/en/insights/trustee-education/')
                                        }
                                    >
                                        Read More
                                    </a>
                                </span>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        </section>
    );
}
export default KnowladgeCenter;
