import React from 'react';
import AboutUsComponent from '../../../components/landing/AboutUsComponent';
import HelpComponent from '../../../components/landing/HelpComponent';
import WhyUsComponent from '../../../components/landing/WhyUsComponent';
import TeamComponent from '../../../components/landing/TeamComponent';
import FlowComponent from '../../../components/landing/FlowComponent';

const DefaultLanding = props => {
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

export default DefaultLanding;
