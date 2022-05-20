import React from 'react';

import ApproveRejectContainer from '../../../../workflows/templates/stepTemplates/approveReject';
import { FORM_TITLE, FORM_I_ICON } from './constants';
import constants from '../../../../workflows/constants';

const {
    APPROVE_REJECT_TYPE_SIMPLE,
    BUTTON_TITLE_APPROVE,
    BUTTON_TITLE_REJECT,
    ON_APPROVE_MESSAGE,
    ON_REJECT_MESSAGE
} = constants;

let ApproveIAA = props => {
    return (
        <>
            <ApproveRejectContainer
                formType={APPROVE_REJECT_TYPE_SIMPLE}
                documentName={'IAA'}
                options={{
                    title: FORM_TITLE,
                    titleIicon: FORM_I_ICON,
                    rejectButton: {
                        title: BUTTON_TITLE_REJECT
                    },
                    approveButton: {
                        title: BUTTON_TITLE_APPROVE
                    },

                    onRejectMessage: ON_REJECT_MESSAGE,
                    onApproveMessage: ON_APPROVE_MESSAGE
                }}
                {...props}
            />
        </>
    );
};

export default ApproveIAA;
