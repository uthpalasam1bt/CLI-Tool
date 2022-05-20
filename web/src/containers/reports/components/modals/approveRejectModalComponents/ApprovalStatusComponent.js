import React from 'react';
import { lowerCase } from 'lodash';
import img1 from '../../../../../assets/images/common/tick.svg';
import img2 from '../../../../../assets/images/common/pending.png';
import img3 from '../../../../../assets/images/common/reject.png';

function ApprovalStatusComponent({ approvalStatus }) {
    return <div className="approval-status-container-single">{renderApprovalBoxStatus(approvalStatus)}</div>;
}

const ApprovalStatusBox = ({ status, icon, title }) => (
    <div className={`status-box ${lowerCase(title)}-box`}>
        <img className="icon img" src={icon} alt="icon" />
        <p className="title">{status}</p>
    </div>
);

const renderApprovalBoxStatus = approvalStatus => {
    switch (approvalStatus) {
        case 'Approval Pending':
            return <ApprovalStatusBox status="Pending Approval" title={'Pending'} icon={img2} />;
        case 'Approval Proceeding':
            return <ApprovalStatusBox status="Pending Approval" title={'Pending'} icon={img2} />;
        case 'Approved':
            return <ApprovalStatusBox status="Approved" title={'Approved'} icon={img1} />;
        case 'Rejected':
            return <ApprovalStatusBox status="Rejected" title={'Rejected'} icon={img3} />;
        case 'Published':
            return <ApprovalStatusBox status="Published" title={'Published'} icon={img1} />;
        case null:
            return <ApprovalStatusBox status="Pending Approval" title={'Pending'} icon={img2} />;
        default:
            return <></>;
    }
};

export default ApprovalStatusComponent;
