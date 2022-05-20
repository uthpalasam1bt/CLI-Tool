import React, { Component } from 'react';
import { history } from '../../redux/store';

export default class PageNotFound extends Component {
    render() {
        return (
            <div className="page-not-found-wrapper">
                <div className="content-wrapper">
                    <img alt="img" className="dp" src={require('../../assets/images/common/404.png')} />
                    <button
                        className="btn tpip-btn-blue"
                        onClick={() => {
                            history.replace('/');
                        }}
                    >
                        Go Back to Home
                    </button>
                </div>
            </div>
        );
    }
}
