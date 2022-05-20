import React from 'react';
import { Row, Col, Card } from 'antd';
import landingImage1 from '../../assets/images/landing/landingpage-img3.jpg';
import landingImage2 from '../../assets/images/landing/landingpage-img2.jpg';
import landingImage3 from '../../assets/images/landing/landingpage-img1.jpg';

const dataMapper = [
    {
        coverImage: landingImage1,
        title: 'Solving the pension governance challenge',
        description:
            'Pension scheme assets and overall investment risk are professionally managed, relieving the trustee...',
        actionUri: '/'
    },
    {
        coverImage: landingImage2,
        title: 'Optimising your funding level',
        description:
            'A specialist can offer invaluable support by providing expertise and day to day oversight, combined with...',
        actionUri: '/'
    },
    {
        coverImage: landingImage3,
        title: 'Tools to generate bespoke, implementable advice',
        description:
            'An outsourced approach can reduce costs and also opens up the possibility of more efficient structures...',
        actionUri: '/'
    }
];

const KnowledgeCenterComponent = () => (
    <section className="knowledge-center-section">
        <div className="solution-wrap">
            <div className="container">
                <Row className="solution-row">
                    <Col lg={24}>
                        <h2 className="section-title">
                            A solution addressing the needs of trustees, sponsors and advisors
                        </h2>
                    </Col>
                </Row>
                <div className="card-row">
                    {dataMapper.map((data, dKey) => (
                        <div className="card-col" key={dKey}>
                            <Card
                                className="card"
                                hoverable
                                cover={<img alt={data.title} className="image" src={data.coverImage} />}
                            >
                                <div className="card-data">
                                    <h4 className="card-title">{data.title}</h4>
                                    <div className="card-description">
                                        <p>{data.description}</p>
                                        <span className="text-link">Read more</span>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

export default KnowledgeCenterComponent;
