import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import { Row, Col, Carousel, Modal } from 'antd';

import teamMember2 from '../../assets/images/landing/team-member-2.png';
import teamMember3 from '../../assets/images/landing/team-member-5.png';
import teamMember4 from '../../assets/images/landing/team-member-4.png';
import teamMember6 from '../../assets/images/landing/team-member-6.png';
import teamMember7 from '../../assets/images/landing/lisa.png';
import teamMember8 from '../../assets/images/landing/steve.png';
import teamMember9 from '../../assets/images/landing/nikeshShah.png';

const teamData = [
    {
        avatar: teamMember2,
        name: 'Tim Dougall, FIA',
        role: 'Head of Fiduciary Management',
        description:
            'Tim leads LGIM’s fiduciary management business, and has overall responsibility for ensuring that clients can access the best solutions and investment ideas that LGIM can offer. He has worked in the pensions industry since 2003, and joined LGIM in 2015 from Towers Watson, where he was Head of Investment Strategy for the UK Delegated Investment Services business. Tim is a Fellow of the Institute of Actuaries and graduated from Oxford University in 2002 with a Master’s degree in physics.'
    },
    {
        avatar: teamMember4,
        name: 'Victoria Myers, CFA',
        role: 'Head of Investment Advisory',
        description:
            'Victoria has overall responsibility for advisory services delivered as part of LGIM’s fiduciary management service. She has worked in the pensions industry since 2006, and joined LGIM in 2017 from Towers Watson, where she was a Senior Investment Consultant. Victoria is a CFA Charterholder, and holds a degree in economics from Bristol University.'
    },
    {
        avatar: teamMember7,
        name: 'Lisa Purdy, FIA',
        role: 'Head of Fiduciary Distribution',
        description:
            'Lisa works closely with clients and consultants to design and develop solutions which meet their needs. She has worked in the pensions industry since 2005, and joined LGIM in 2019 from Lloyds Bank, where she was Corporate Pensions Director. Prior to this she was a Principal Investment Consultant at Aon Hewitt. Lisa is a Fellow of the Institute of Actuaries, holds a Master’s degree from Imperial College London, and a degree in economics from Bristol University.'
    },
    {
        avatar: teamMember8,
        name: 'Steve Wright, FIA',
        role: 'Head of Fiduciary Relationships',
        description:
            'Steve has overall responsibility for client relationship management, ensuring that fiduciary management clients receive a first-class service at each step of their journey. Steve has over 25 years’ industry experience, and joined LGIM in July 2014 from Aon Hewitt where he was a Senior Investment Consultant. Steve is a Fellow of the Institute of Actuaries and holds an honours degree in economics with actuarial studies from Southampton University.'
    },
    {
        avatar: teamMember6,
        name: 'Bhavana Maherchand, FIA',
        role: 'Fiduciary Manager',
        description:
            'Bhavana works closely with clients to deliver a high-quality fiduciary management service. She has worked in the pensions industry since 2006, and joined LGIM in 2018 from Mercer, where she was a Senior Investment Consultant. Prior to this she was a Senior Investment Consultant at Towers Watson, with previous experience at Deloitte and HSBC.  Bhavana is a Fellow of the Institute of Actuaries and graduated from Cass Business School in 2006 with a BSc in Actuarial Science.'
    },
    {
        avatar: teamMember3,
        name: 'Memento Charinga',
        role: 'Fiduciary Manager',
        description:
            'Memento works closely with clients to deliver a high-quality fiduciary management service. She has worked in the pensions industry since 2011, and joined LGIM in 2018 from Aon, where she was a Product Specialist within the Delegated Consulting team and an Investment Consultant. Memento graduated with an MSc in Actuarial Finance from Imperial College London and an undergraduate degree from Heriot-Watt University. She holds the IMC and is currently working towards Fellowship of the Institute and Faculty of Actuaries.'
    },
    {
        avatar: teamMember9,
        name: 'Nikesh Shah',
        role: 'Fiduciary Associate',
        description:
            'Nikesh works closely with clients to deliver a high-quality fiduciary management service. He has worked in the pensions industry since 2015, and joined LGIM in 2020 from Willis Towers Watson, where he was an Actuarial Consultant and Transactions Specialist, advising on bulk annuities and longevity swaps. Nikesh and holds a BSc in mathematics and economics from the London School of Economics, and is currently working towards Fellowship of the Institute and Faculty of Actuaries'
    }

    // {
    //   avatar: teamMember1,
    //   name: 'Paul Docherty',
    //   role: 'Head of Investment Management',
    //   description:
    //     'Paul is Head of Investment Management. Paul joined LGIM in 2015 from Aon Hewitt, where he was the UK Head of Delegated Consulting and CEO of Aon Hewitt’s UK asset management company. Paul is responsible for LGIM’s investment management proposition, which enables clients to get the best from LGIM by delegating day to day decisions within agreed guidelines. Paul is a fellow of the Institute of Actuaries and holds a BSc in mathematics and statistics from the University of Warwick.'
    // },
];
const dataChunks = _.chunk(teamData, 3);

export default class TeamComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: -1
        };

        this.handleModalShow = this.handleModalShow.bind(this);
    }

    handleModalShow(key) {
        const { show } = this.state;
        if (key === show) return this.setState({ show: -1 });

        this.setState({ show: key });
    }

    render() {
        const { show } = this.state;

        return (
            <section className="team-section">
                <div className="team-wrap">
                    <div className="container">
                        <Row className="teamRow">
                            <Col lg={24}>
                                <h2 className="section-title">Meet our expert team</h2>
                                <p className="section-subtitle">
                                    LGIM is the UK’s largest pension fund asset manager with expertise spanning the full
                                    spectrum of asset classes.
                                </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={24}>
                                <Carousel autoplay>
                                    {dataChunks.map((chunk, cKey) => (
                                        <div className="teamMember" key={cKey}>
                                            {chunk.map((member, mKey) => (
                                                <Fragment key={mKey}>
                                                    <div
                                                        className="member-inline"
                                                        onClick={() => {
                                                            this.handleModalShow(`${cKey}_${mKey}`);
                                                        }}
                                                    >
                                                        <img src={member.avatar} alt="img" className="image" />
                                                        <div>
                                                            <p className="member-name">{member.name}</p>
                                                            <p className="member-position">{member.role}</p>
                                                        </div>
                                                    </div>
                                                    {show === `${cKey}_${mKey}` && (
                                                        <Modal
                                                            className="lgim-styles-wrapper  team-modal"
                                                            visible={show === `${cKey}_${mKey}`}
                                                            onCancel={() => {
                                                                this.handleModalShow(`${cKey}_${mKey}`);
                                                            }}
                                                            footer={null}
                                                        >
                                                            <div className="member-inline team-content">
                                                                <img src={member.avatar} alt="img" className="image" />
                                                                <p className="member-name">{member.name}</p>
                                                                <p className="member-position">{member.role}</p>
                                                                <p className="member-description">
                                                                    {member.description}
                                                                </p>
                                                            </div>
                                                        </Modal>
                                                    )}
                                                </Fragment>
                                            ))}
                                        </div>
                                    ))}
                                </Carousel>
                            </Col>
                        </Row>
                    </div>
                </div>
            </section>
        );
    }
}
