import React, { Component } from 'react';
import { Modal } from 'antd';

export default class SessionTimeOutModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            counter: '01:00'
        };
        this.startTimer = this.startTimer.bind(this);
    }

    componentDidMount() {
        this.startTimer(60);
    }

    startTimer(duration) {
        const { handleClose } = this.props;
        let timer = duration,
            minutes,
            seconds;

        this.interval = setInterval(() => {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? '0' + minutes : minutes;
            seconds = seconds < 10 ? '0' + seconds : seconds;

            const counter = minutes + ':' + seconds;
            this.setState({ counter });

            if (--timer < 0) {
                timer = duration;
                clearInterval(this.interval);
                handleClose(false);
            }
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const { show, handleClose } = this.props;
        const { counter } = this.state;

        return (
            <Modal
                visible={show}
                footer={null}
                className="lgim-styles-wrapper session-modal"
                width={450}
                closable={false}
                maskClosable={false}
            >
                <div className="session-modal-wrapper">
                    <div className="body">
                        <h4 className="title">Session Timeout</h4>
                        <p className="content">
                            You have been idle for over 30 minutes. For your security, you will be automatically signed
                            out in
                        </p>
                        <p className="counter-time">{counter}</p>
                        <p className="content">
                            To continue your session, select <span>continue</span>
                        </p>
                    </div>
                    <div className="footer">
                        <span
                            className="btn-blue-o regular btn-blue"
                            onClick={() => {
                                handleClose(false);
                            }}
                        >
                            Log out
                        </span>
                        <span
                            className="tpip-btn-blue regular btn-blue"
                            onClick={() => {
                                handleClose(true);
                            }}
                        >
                            Continue
                        </span>
                    </div>
                </div>
            </Modal>
        );
    }
}
