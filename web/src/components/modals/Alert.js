import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

class Alert extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: this.props.show,
            value: '',
            errorMessage: ''
        };

        this.handleAccept = this.handleAccept.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.onCancel = this.onCancel.bind(this);

        this.handleChange = this.handleChange.bind(this);
    }

    handleAccept() {
        const { alertType, validateResponse } = this.props;
        const { value } = this.state;

        if (alertType === 'response') {
            if (!value) return;

            if (validateResponse) {
                const { isValid, errorMessage } = validateResponse(value);

                if (isValid) {
                    this.props.handleAccept(value);
                } else {
                    this.setState({ errorMessage });
                }

                return;
            }

            this.props.handleAccept(value);
        } else {
            this.props.handleAccept();
        }
    }

    handleCancel() {
        this.props.handleCancel();
    }

    onCancel() {
        const { onClose, handleAccept, handleCancel } = this.props;

        if (onClose) {
            onClose();
        } else if (handleCancel) {
            handleCancel();
        } else if (handleAccept) {
            handleAccept();
        }
    }

    handleChange(e) {
        const value = e.target.value;
        this.setState({ value, errorMessage: '' });
    }

    render() {
        const handleAlerts = {
            alert: {
                title: 'Alert'
            },
            warning: {
                title: 'Important',
                actions: {
                    accept: 'Yes',
                    cancel: 'No'
                }
            },
            error: {
                title: 'Error',
                actions: {
                    accept: 'OK'
                }
            },
            response: {
                title: 'Confirmation',
                actions: {
                    accept: 'Yes'
                }
            }
        };

        const { show, value, errorMessage } = this.state;
        const { alertType, message, handleAccept, handleCancel, alertTitle, unhappyBtnText, happyBtnText } = this.props;

        const isBothButton = handleAccept && handleCancel;
        const { title, actions } = handleAlerts[alertType];

        return (
            <>
                <Modal
                    className="lgim-styles-wrapper alert-holder"
                    visible={show}
                    maskClosable={false}
                    onCancel={this.onCancel}
                    footer={null}
                >
                    <div className="alert-wrapper">
                        <div className="alert-header-wrapper">
                            <h3 className="title">{alertTitle || title}</h3>
                        </div>
                        <div className="alert-body-wrapper">
                            <p className="message"> {message} </p>
                            {alertType === 'response' && (
                                <>
                                    <input
                                        type="text"
                                        className="form-control alert-input-field"
                                        value={value}
                                        onChange={this.handleChange}
                                    />
                                    {errorMessage && errorMessage !== '' && (
                                        <span className="has-error">{errorMessage}</span>
                                    )}
                                </>
                            )}
                        </div>
                        {actions && (
                            <div className="alert-actions-wrapper">
                                {handleCancel && actions.cancel && (
                                    <button
                                        className={`btn-unhappy btn-red regular ${!isBothButton ? 'btn-single' : ''}`}
                                        onClick={this.handleCancel}
                                    >
                                        {unhappyBtnText || actions.cancel}
                                    </button>
                                )}
                                {handleAccept && actions.accept && (
                                    <button
                                        className={`btn-happy tpip-btn-blue regular ${
                                            !isBothButton ? 'btn-single' : ''
                                        }`}
                                        onClick={this.handleAccept}
                                    >
                                        {happyBtnText || actions.accept}
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </Modal>
            </>
        );
    }
}

Alert.defaultProps = {
    alertType: 'alert',
    message: null
};

Alert.propTypes = {
    alertType: PropTypes.string
};

export default Alert;
