import React from 'react';
import SimpleApproveReject from './templates/simpleApproveReject';
import TabApproveReject from './templates/tabApproveReject';
import SimpleApproveRejectMulticlient from './templates/simpleApproveRejectMulticlient';
import constants from '../../../constants';

const { APPROVE_REJECT_TYPE_SIMPLE, APPROVE_REJECT_TYPE_TABS, MULTICLIENT_APPROVE_REJECT_TYPE_SIMPLE } = constants;

const ApproveRejectContainer = props => {
    const { formType } = props;
  
    return (
        <>
            {formType === APPROVE_REJECT_TYPE_SIMPLE ? (
                <SimpleApproveReject {...props} />
            ) : formType === APPROVE_REJECT_TYPE_TABS ? (
                <TabApproveReject {...props} />
            ) : formType === MULTICLIENT_APPROVE_REJECT_TYPE_SIMPLE ? (
                <SimpleApproveRejectMulticlient {...props} />
            ) : null}
        </>
    );
};

export default ApproveRejectContainer;
