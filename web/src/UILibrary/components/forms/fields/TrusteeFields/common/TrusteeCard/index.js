import React from 'react';
import { Card, Tooltip } from 'antd';
import { DELETE_ACTION, EDIT_ACTION, NUMBER_VERIFICATION_ERROR_TEXT, NUMBER_VERIFICATION_TEXT } from '../../constants';

const TrusteeCard = ({ trustees = [], position: trusteeEntity, manageTrustee, hideButtons = false, stepCompleted = false }) => {
    return (
        <div className="add-individual-trustee-edit-wrapper">
            {Array.isArray(trustees) &&
                trustees.map((trustee, index) => (
                    <Card
                        extra={
                            !hideButtons ? (
                                <div className="edit-card-functions">
                                    <span
                                        className="edit-func"
                                        onClick={() => {
                                            manageTrustee[EDIT_ACTION](trustee.email, trusteeEntity);
                                        }}
                                    >
                                        UPDATE
                                    </span>
                                    <span
                                        className="delete-func"
                                        onClick={() => {
                                            manageTrustee[DELETE_ACTION](trustee.email, trusteeEntity);
                                        }}
                                    >
                                        DELETE
                                    </span>
                                </div>
                            ) : null
                        }
                    >
                        <p className="trustee-name">
                            {trustee.firstName + ' ' + trustee.lastName}{' '}
                            {trustee.primary ? <span className="trustee-prime">(PRIMARY)</span> : null}
                        </p>
                        <p>
                            Email <span className="email-colon">:&nbsp;</span>
                            <Tooltip placement="bottom" title={trustee.email}>
                                 <span className="ellipsis-text">{trustee.email&&trustee.email.length<35?trustee.email:trustee.email&&`${trustee.email.substring(0, 33)}...`}</span>
                             </Tooltip>
                        </p>
                        <p>
                            Contact <span className="contact-colon">:&nbsp;</span>
                            {trustee.contactNumber}
                        </p>
                        {trustee.signDigitally === 'yes' && trustee.mobileNumber ? (
                            <p
                                className={`trustee-mobile ${
                                    trustee.isOtpMisMatched && !stepCompleted ? 'trustee-mobile-highlight' : ''
                                }`}
                            >
                                <div>
                                    Mobile <span className="mobile-colon">:&nbsp;</span>
                                    {trustee.mobileNumber}
                                </div>
                                <div className="trustee-mobile-icon">
                                    <Tooltip placement="topRight" title={NUMBER_VERIFICATION_TEXT}>
                                        <span>
                                            <i class="fa fa-info-circle i-icon-blue"></i>
                                        </span>
                                    </Tooltip>
                                    {trustee.isOtpMisMatched && !stepCompleted ? (
                                        <Tooltip placement="topRight" title={NUMBER_VERIFICATION_ERROR_TEXT}>
                                            <span>
                                                <i class="fa fa-info-circle i-icon-red"></i>
                                            </span>
                                        </Tooltip>
                                    ) : null}
                                </div>
                            </p>
                        ) : null}
                    </Card>
                ))}
        </div>
    );
};

export default TrusteeCard;
