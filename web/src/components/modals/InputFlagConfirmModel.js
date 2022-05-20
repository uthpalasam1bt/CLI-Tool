import React from 'react';
import { Col, Modal, Row } from 'antd';

const inputFlagMap = {
    transitionStatus: 'In Transition',
    livePriceFlag: 'Live Price',
    monitorOnlyFlag: 'Monitoring Only',
    chartingType: 'Portfolio Chart',
    showHr: 'Hedge Ratio Chart',
    showBuyin: 'Buy-in Chart',
    reportFlag: 'Reporting',
    inceptionOverride: 'Inception'
};

const InputFlagConfirmModel = props => {
    const { show, handleShow, inProgress, flagName, schemeName, onSubmit } = props;

    return (
        <Modal
            visible={show}
            maskClosable={false}
            onCancel={handleShow}
            footer={null}
            className="lgim-styles-wrapper input-flag-modal"
        >
            <div className="create-scheme-modal-wrapper">
                <Row>
                    <Col lg={24}>
                        <div className="title">
                            <i className="fa fa-exclamation-circle model-icon" aria-hidden="true"></i>
                            <h4 className="title-text">CONFIRMATION</h4>
                        </div>

                        <div className="input-flag-form">
                            <p className="content">
                                Are you sure you want to change <strong>{inputFlagMap[flagName]}</strong>{' '}
                                {flagName === 'inceptionOverride' ? 'date' : 'status'} for{' '}
                                <strong>"{schemeName}"</strong>?
                            </p>
                            <div className="footer">
                                <button className="btn-grey-o regular btn-close" type="button" onClick={handleShow}>
                                    Cancel
                                </button>
                                <button className="tpip-btn-blue regular" onClick={onSubmit} disabled={inProgress}>
                                    YES
                                    {inProgress && <i className="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>}
                                </button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </Modal>
    );
};

export default InputFlagConfirmModel;
