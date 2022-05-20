import React, { Component } from 'react';

export default class ComingSoon extends Component {
    render() {
        return (
            <div className="coming-soon-wrapper">
                <img alt="img" className="dp" src={require('../../assets/images/common/coming-soon.png')} />
            </div>
        );
    }
}
