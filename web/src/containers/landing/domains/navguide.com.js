import React from 'react';
import AboutUsComponent from '../../../components/landing/AboutUsComponent';
import FlowComponent from '../../../components/landing/FlowComponent';
import HelpComponent from '../../../components/landing/HelpComponent';
import WhyUsComponent from '../../../components/landing/WhyUsComponent';
import TeamComponent from '../../../components/landing/TeamComponent';

const Landing = props => {
    const { loggedUser } = props;
    return (
        <>
            <AboutUsComponent loggedUser={loggedUser} />
            {/*<KnowledgeCenterComponent />*/}
            <FlowComponent />
            <HelpComponent />
            <WhyUsComponent />
            <TeamComponent />
        </>
    );
};

export default Landing;
