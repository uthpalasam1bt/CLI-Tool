import React, { Component } from 'react';
import RegistrationContainer from './registration';
import UtilsHelper from '../../helpers/UtilsHelper';
import { history } from '../../redux/store';

export default class TpipProposal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tabs: []
        };

        this.updateSelectedTab = this.updateSelectedTab.bind(this);
    }

    componentDidMount() {
        this.updateSelectedTab();
    }

    updateSelectedTab() {
        const { path } = this.props.match;
        const tabs = [
            {
                name: 'Information',
                active: UtilsHelper.getInstance().matchRuleShort(path, '/scheme/options/information/*')
            },
            {
                name: 'Registration',
                active: UtilsHelper.getInstance().matchRuleShort(path, '/scheme/options/registration/*')
            },
            {
                name: 'User Management',
                active: UtilsHelper.getInstance().matchRuleShort(path, '/scheme/options/user-management/*')
            }
        ];

        this.setState({ tabs });
    }

    render() {
        const { schemeName } = this.props.match.params;
        const { tabs } = this.state;

        return (
            <section className="scheme-options">
                <div className="header clearfix">
                    <div className="container">
                        <div className="div-back pull-left">
                            <span
                                className="back-text"
                                onClick={() => {
                                    history.goBack();
                                }}
                            >
                                <i className="fa fa-chevron-left fa-icon"></i>Back
                            </span>
                            <span className="user-name">{schemeName}</span>
                        </div>
                        <div className="list pull-right text-right">
                            {tabs.map((tab, tKey) => (
                                <span className={`list-items ${tab.active ? 'active' : ''}`} key={tKey}>
                                    {tab.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="content clearfix">
                    <div className="container">
                        <RegistrationContainer schemeName={schemeName} />
                    </div>
                </div>
            </section>
        );
    }
}
