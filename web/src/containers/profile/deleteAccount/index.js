import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select, Table } from 'antd';
import { Spin } from 'antd';
import ConfirmModal from './confirmModal';
import FormHeaderComponent from '../../../UILibrary/components/forms/formHeader';
import uiLibConstants from '../../../UILibrary/constants';

import { getUserDeleteAccountData, sendUserDeleteAccountRequest } from '../actions';
import {
    getSchemeUserAccountDeleteData_inProgress,
    getSchemeUserAccountDeleteDataResult,
    sendSchemeUserAccountDeleteRequest_inProgress
} from '../selectors';

import { DELETE_ACCOUNT_TITLE } from '../constants';
import { DELETE_ACCOUNT_REQUEST_STATUS } from './constants';
import moment from 'moment';
import SuccessModal from './successModal';

const { NONE, PENDING, REJECTED } = DELETE_ACCOUNT_REQUEST_STATUS;
const { Option } = Select;
const { FORM_ACTION_TYPES } = uiLibConstants;

let RequestDeleteAccount = props => {
    const { loggedUser } = props;

    const dispatch = useDispatch();

    const [currentDeleteRequestStatus, setCurrentDeleteRequestStatus] = useState(NONE);

    const [deleteRequestRejectedReason, setDeleteRequestRejectedReason] = useState(null);
    const [deleteRequestRejectedDate, setDeleteRequestRejectedDate] = useState(null);
    // const [deleteRequestRejUserName, setDeleteRequestRejUserName] = useState(null);
    const [deleteUserImage, setDeleteImageUser] = useState(null);

    const [associatedSchemeData, setAssociatedSchemeData] = useState([]);
    const [userSchemeAdminStatus, setUserSchemeAdminStatus] = useState(false);
    const [confirmModalVisible, setConfirmModalVisible] = useState(false);
    const [successModalVisible, setSuccessModalVisible] = useState(false);

    const loading = useSelector(state => getSchemeUserAccountDeleteData_inProgress(state));
    const accountDeleteData = useSelector(state => getSchemeUserAccountDeleteDataResult(state));

    const requesting = useSelector(state => sendSchemeUserAccountDeleteRequest_inProgress(state));
    // NOTE: Following is not in use atm

    useEffect(() => {
        loadAccountDeleteData();
    }, []);

    useEffect(() => {
        prepareUserDeleteRequestStatusData();
        prepareAssociatedSchemeData();
    }, [loading]);

    const loadAccountDeleteData = () => {
        dispatch(getUserDeleteAccountData());
    };

    const prepareUserDeleteRequestStatusData = () => {
        // NOTE: Setting delete request status, rejected reason & date
        if (
            accountDeleteData &&
            accountDeleteData.data &&
            accountDeleteData.data.content &&
            accountDeleteData.data.content.status
        ) {
            setCurrentDeleteRequestStatus(accountDeleteData.data.content.status);

            if (accountDeleteData.data.content.status === REJECTED) {
                if (accountDeleteData.data.content.deleteRejectReason) {
                    setDeleteRequestRejectedReason(accountDeleteData.data.content.deleteRejectReason);
                }

                if (accountDeleteData.data.content.rejectedDate) {
                    setDeleteRequestRejectedDate(accountDeleteData.data.content.rejectedDate);
                }

                // if (accountDeleteData.data.content.userName) {
                //     setDeleteRequestRejUserName(accountDeleteData.data.content.userName);
                // }

                if (accountDeleteData.data.content.imageUrl) {
                    setDeleteImageUser(accountDeleteData.data.content.imageUrl);
                }
            }
        }
    };

    const prepareAssociatedSchemeData = () => {
        // NOTE: preparing custom scheme details array to display associated schemes
        if (
            accountDeleteData &&
            accountDeleteData.data &&
            accountDeleteData.data.content &&
            accountDeleteData.data.content.schemeDetails &&
            accountDeleteData.data.content.schemeDetails.length > 0
        ) {
            const schemeDetailsArr = accountDeleteData.data.content.schemeDetails;
            let customSchemeDetailsArr = [];
            let isUserAnAdminOfAnyScheme = false;

            for (let i = 0; i < schemeDetailsArr.length; i++) {
                let schemeAtIndex = schemeDetailsArr[i];
                let customSchemeObjAtIndex = {};
                customSchemeObjAtIndex.schemeName = schemeAtIndex.schemeName;

                let customUserGroupsTitle = '';

                for (let j = 0; j < schemeAtIndex.userGroups.length; j++) {
                    let schemeUserGroupAtIndex = schemeAtIndex.userGroups[j];
                    customUserGroupsTitle +=
                        j === 0 ? schemeUserGroupAtIndex.name : ` / ${schemeUserGroupAtIndex.name}`;

                    if (schemeUserGroupAtIndex.name == 'Admin' || schemeUserGroupAtIndex.name === 'Administrator') {
                        isUserAnAdminOfAnyScheme = true;
                    }
                }

                customSchemeObjAtIndex.associatedGroups = customUserGroupsTitle;
                customSchemeObjAtIndex.key = i;
                customSchemeDetailsArr.push(customSchemeObjAtIndex);
            }

            setAssociatedSchemeData(customSchemeDetailsArr);
            setUserSchemeAdminStatus(isUserAnAdminOfAnyScheme === true);
        }
    };

    const sendAccountDeletionRequest = () => {
        if (currentDeleteRequestStatus !== PENDING && !userSchemeAdminStatus) {
            setConfirmModalVisible(false);
            dispatch(
                sendUserDeleteAccountRequest({ email: loggedUser.email }, () => {
                    loadAccountDeleteData();
                    setSuccessModalVisible(true);
                })
            );
        }
    };

    const formHeaderProps = {
        title: DELETE_ACCOUNT_TITLE,
        actions: [
            {
                type: FORM_ACTION_TYPES.DELETE_ACCOUNT,
                state: { inProgress: requesting },
                onClick: () => {
                    //sendAccountDeletionRequest();
                    setConfirmModalVisible(true);
                },
                bool: true,
                disabled: currentDeleteRequestStatus === PENDING || userSchemeAdminStatus || requesting
            }
        ]
    };

    const tableColumns = [
        {
            title: 'Schemes',
            dataIndex: 'schemeName',
            key: 'schemeName',
            //className: 'scheme-name',
            render: schemeName => <span>{schemeName}</span>
        },
        {
            title: 'User groups',
            dataIndex: 'associatedGroups',
            key: 'associatedGroups',
            render: associatedGroups => <span>{associatedGroups}</span>
        }
    ];

    const renderBlueAlertView = isDeleteRequestStatusPending => {
        return (
            <div className="delete-detail-wrapper blue-wrap">
                <i className="fa fa-info-circle icon"></i>
                <span className="info-wrap">
                    {isDeleteRequestStatusPending
                        ? 'Your request to delete the user account is pending approval.'
                        : 'You cannot send a delete request if you are an Admin in any of the following schemes.'}
                </span>
            </div>
        );
    };

    const renderTopMessageAlertView = () => {
        if (currentDeleteRequestStatus === REJECTED) {
            return (
                <>
                    <div className="delete-detail-wrapper red-wrap">
                        <img src={deleteUserImage} alt="img" className="image" />
                        <div className="detail-wrap">
                            <p className="detail black-font">
                                LGIM - Rejected
                                <span className="day">
                                    {moment.utc(deleteRequestRejectedDate, 'MM/DD/YYYY, HH:mm:SS A').fromNow()}
                                </span>
                            </p>
                            <span className="sub-detail black-font">{deleteRequestRejectedReason}</span>
                        </div>
                        {/* <i className="fa fa-info-circle icon"></i> */}
                        {/* <span className="info-wrap">LGIM rejected your request.</span> */}
                    </div>
                    {userSchemeAdminStatus && renderBlueAlertView(false)}
                </>
            );
        } else if (currentDeleteRequestStatus === PENDING) {
            return renderBlueAlertView(true);
        } else {
            return userSchemeAdminStatus ? renderBlueAlertView(false) : <></>;
        }
    };

    const renderUserAssociatedSchemes = () => {
        return (
            <>
                {renderTopMessageAlertView()}
                <Table
                    className="delete-account-table"
                    columns={tableColumns}
                    dataSource={associatedSchemeData}
                    pagination={false}
                />
            </>
        );
    };

    return (
        <>
            <div className="profile-wrap delete-account-wrap">
                <div className="card card-wrapper">
                    <FormHeaderComponent {...formHeaderProps} />
                    <div className="content text-center">{loading ? <Spin /> : renderUserAssociatedSchemes()}</div>
                </div>
            </div>
            {confirmModalVisible && (
                <ConfirmModal
                    visible={confirmModalVisible}
                    onClose={() => setConfirmModalVisible(false)}
                    onProceed={() => sendAccountDeletionRequest()}
                    loggedUser={loggedUser}
                />
            )}
            <SuccessModal visible={successModalVisible} onClose={() => setSuccessModalVisible(false)} />
        </>
    );
};

export default RequestDeleteAccount;

// class deleteAccount extends Component {
//   state = {
//     selectedRowKeys: [],
//     loading: false
//   };
//   render() {
//     const { loading, selectedRowKeys } = this.state;

//     const rowSelection = {
//       selectedRowKeys,
//       onChange: this.onSelectChange
//     };

//     const { TextArea } = Input;

//     const columns = [
//       {
//         title: 'Schemes',
//         dataIndex: 'scheme',
//         key: 'scehme',
//         className: 'scheme-name'
//       },
//       {
//         title: 'User groups',
//         dataIndex: 'user',
//         key: 'user',
//         render: user => (
//           <span>
//             {user}
//             {/* <a href="#user" className="link">(<u>Change</u>)</a> */}
//           </span>
//         )
//       }
//     ];

//     const data = [
//       {
//         key: '1',
//         scheme: 'Scheme name 01',
//         user: 'Admin / Legal'
//       },
//       {
//         key: '2',
//         scheme: 'Scheme name 02',
//         user: 'Secondary'
//       },
//       {
//         key: '3',
//         scheme: 'Scheme name 03',
//         user: 'Legal'
//       }
//     ];

//     const requestColumns = [
//       {
//         title: 'Name',
//         dataIndex: 'name',
//         key: 'name',
//         className: 'scheme-name'
//       },
//       {
//         title: 'Email',
//         dataIndex: 'email',
//         key: 'email'
//       },
//       {
//         title: 'Associated schemes',
//         dataIndex: 'scheme',
//         key: 'scheme',
//         render: scheme => (
//           <span>
//             <a href="#user" className="link">
//               {scheme} Schemes
//             </a>
//           </span>
//         )
//       }
//     ];

//     const requestData = [
//       {
//         key: '1',
//         name: 'David Joe',
//         email: 'dvid@gmil.com',
//         scheme: '1'
//       },
//       {
//         key: '2',
//         name: 'Peter Joe',
//         email: 'peter@gmil.com',
//         scheme: '2'
//       },
//       {
//         key: '3',
//         name: 'Joy Joe',
//         email: 'joy@gmil.com',
//         scheme: '3'
//       }
//     ];

//     const formHeaderProps = {
//       title: DELETE_ACCOUNT_TITLE,
//       actions: [
//         {
//           type: FORM_ACTION_TYPES.DELETE_ACCOUNT,
//           state: { inProgress: this.props.doSavePersonalDetails_inProgress },
//           onClick: this.props.submitForm,
//           bool: true
//         }
//       ]
//     };

//     return (
//       <>
//         <div className="profile-wrap delete-account-wrap">
//           <div className="card card-wrapper">
//             <FormHeaderComponent {...formHeaderProps} />
//             <div className="content">
//               <div className="delete-detail-wrapper red-wrap">
//                 {/* <img src={userImg} alt="img" className="image" />
//                 <div className="detail-wrap">
//                   <p className="detail">Roger shaw - Reject<span className="day">Yesterday</span></p>
//                   <span className="sub-detail">loreum ipssdfsf sfsdfsfs, klfjsdkflsfk</span>
//                 </div> */}
//                 <i className="fa fa-info-circle icon"></i>
//                 <span className="info-wrap">LGIM rejected your request.</span>
//               </div>
//               <div className="delete-detail-wrapper blue-wrap">
//                 <i className="fa fa-info-circle icon"></i>
//                 <span className="info-wrap">
//                   You cannot send a delete request if you are an Admin in any of the following
//                   schemes.
//                 </span>
//               </div>
//               <Table
//                 className="delete-account-table"
//                 columns={columns}
//                 dataSource={data}
//                 pagination={false}
//               />
//               <Table
//                 className="delete-account-table customize-table"
//                 rowSelection={rowSelection}
//                 columns={requestColumns}
//                 dataSource={requestData}
//                 pagination={false}
//               />
//             </div>
//           </div>
//         </div>

//         <Modal
//           className="lgim-styles-wrapper delete-account-modal delete-request-modal"
//           footer={null}
//           visible={false}
//           title="Delete Request"
//         >
//           <div className="content">
//             <p className="content-title">Please enter your password to confirm</p>
//             <Input type="password" placeholder="Enter your password" className="input-password" />
//             <Checkbox>
//               I agree that by requesting to delete my account I will no longer have access to
//               platform and all my pension scheme data will be deleted.
//             </Checkbox>
//             <button className="btn-red regular btn-delete">Send delete request</button>
//           </div>
//         </Modal>
//         <Modal
//           className="lgim-styles-wrapper delete-account-modal delete-request-modal associated-modal"
//           footer={null}
//           visible={false}
//           title="Associated Schemes"
//         >
//           <div className="content">
//             <Table
//               className="delete-account-table"
//               columns={columns}
//               dataSource={data}
//               pagination={false}
//             />
//             <div className="content-footer">
//               <button className="btn btn-outline regular btn-close">Close</button>
//             </div>
//           </div>
//         </Modal>
//         <Modal
//           className="lgim-styles-wrapper delete-account-modal delete-reject-modal"
//           footer={null}
//           visible={false}
//           title="Cannot Delete"
//         >
//           <div className="content">
//             <p className="content-title delete-title">
//               The selected user(s) cannot be deleted as they are associated with one or more scheme
//               admin groups
//             </p>
//             {/* <p className="content-title">Your delete request has been sent.</p> */}
//           </div>
//         </Modal>
//         <Modal
//           className="lgim-styles-wrapper delete-account-modal delete-reject-modal"
//           footer={null}
//           visible={false}
//           title="Delete"
//         >
//           <div className="content">
//             <p className="content-title delete-title">
//               Are you sure you want to delete the selected user(s)?
//             </p>
//             {/* <p className="content-title">Your delete request has been sent.</p> */}
//             <div className="content-footer">
//               <button className="btn btn-outline regular btn-close">Close</button>
//               <button className="btn btn-red regular btn-delete">Yes, Delete!</button>
//             </div>
//           </div>
//         </Modal>
//         <Modal
//           className="lgim-styles-wrapper delete-account-modal delete-reject-modal"
//           footer={null}
//           visible={false}
//           title="Reject"
//         >
//           <div className="content">
//             <p className="content-title">Please specify the reason for rejection.</p>
//             <TextArea rows={4} className="text-area" />
//             <div className="content-footer">
//               <button className="btn btn-outline regular btn-close">Close</button>
//               <button className="btn tpip-btn-blue regular btn-delete">Yes, Reject.</button>
//             </div>
//           </div>
//         </Modal>
//         <Modal
//           className="lgim-styles-wrapper delete-account-modal change-user-modal"
//           footer={null}
//           visible={false}
//           title="Change user group"
//         >
//           <div className="content">
//             <p className="content-title">Group</p>
//             <Select defaultValue="admin" className="group-select">
//               <Option value="admin">Admin</Option>
//               <Option value="Signtory">Signatory</Option>
//               <Option value="Legal">Legal</Option>
//             </Select>
//             <button className="tpip-btn-blue regular btn-change">Change user group</button>
//           </div>
//         </Modal>
//       </>
//     );
//   }
// }

// export default deleteAccount;
