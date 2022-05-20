import React, { Component } from 'react';
// import { Tooltip } from 'antd';

import FormHeaderComponent from '../../UILibrary/components/forms/formHeader';
import InviteUsersModal from '../../components/modals/InviteUsersModal';

import uiLibConstants from '../../UILibrary/constants';

const { FORM_ACTION_TYPES } = uiLibConstants;

export default class UserTable extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {
            // dataArray,
            addContributors_inProgress,
            showInviteUsersModal,
            isLgimUserCreate,
            // columnTitleStatus,
            // columnTitleGroup,
            lgimUserTitle
        } = this.props;

        // let dataSourceMap = [];

        // if (dataArray) {
        //     dataSourceMap = dataArray.map((user, key) => ({
        //         key,
        //         userName: user.userName,
        //         userEmail: user.userEmail,
        //         userType: user.userType,
        //         action: user.action,
        //         registered: user.registered
        //     }));
        // }

        // const sortByName = (a, b) => {
        //     let aString = a.userName.toLowerCase();
        //     let bString = b.userName.toLowerCase();
        //     if (aString < bString) return -1;
        //     if (aString > bString) return 1;
        //     return 0;
        // };

        // const sortByEmail = (a, b) => {
        //     let aString = a.userEmail.toLowerCase();
        //     let bString = b.userEmail.toLowerCase();
        //     if (aString < bString) return -1;
        //     if (aString > bString) return 1;
        //     return 0;
        // };

        // const columnsMap = [
        //     {
        //         title: 'Name',
        //         key: 'userName',
        //         dataIndex: 'userName',
        //         sorter: sortByName,
        //         render: userName => (
        //             <Tooltip placement="bottom" title={userName}>
        //                 <span className="ellipsis-text">{userName}</span>
        //             </Tooltip>
        //         )
        //     },
        //     {
        //         title: 'Email',
        //         key: 'userEmail',
        //         dataIndex: 'userEmail',
        //         sorter: sortByEmail,
        //         render: userEmail => (
        //             <Tooltip placement="bottom" title={userEmail}>
        //                 <span className="ellipsis-text">{userEmail}</span>
        //             </Tooltip>
        //         )
        //     },
        //     {
        //         title: columnTitleStatus ? 'Status' : 'User Role',
        //         key: 'userType',
        //         sorter: true,
        //         dataIndex: 'userType',
        //         render: userType => <span>{userType.charAt(0).toUpperCase() + userType.slice(1)}</span>
        //     },
        //     {
        //         title: columnTitleGroup ? 'Group' : 'Platform Status',
        //         key: 'registered',
        //         sorter: true,
        //         dataIndex: 'registered',
        //         render: registered => <span>{registered ? 'Registered' : 'Un-registered'}</span>
        //     },
        //     {
        //         title: 'Action',
        //         key: 'action',
        //         dataIndex: 'action',
        //         className: 'action-column',
        //         render: action => <i className="fa fa-ellipsis-h action-icon"></i>
        //     }
        // ];

        const formHeaderProps = {
            title: lgimUserTitle ? 'LGMI users' : 'Manage users of this scheme',
            actions: [
                {
                    type: this.props.addButtonName ? FORM_ACTION_TYPES.CREATE : FORM_ACTION_TYPES.ADD,
                    state: { inProgress: addContributors_inProgress },
                    onClick: () => this.props.handleShowInviteUsersModal()
                }
            ]
        };

        return (
            <div className="root-form-wrapper">
                <div className="card card-wrapper">
                    <FormHeaderComponent {...formHeaderProps} />
                    <div className="user-table-container">
                        {/* <Table
              className="user-table"
              columns={}
              dataSource={}
              pagination={false}
              Key={columnsMap.userEmail}
            ></Table> */}
                    </div>

                    {showInviteUsersModal && (
                        <InviteUsersModal
                            show={showInviteUsersModal}
                            handleShow={this.props.handleShowInviteUsersModal}
                            handleSubmit={this.props.submitUser}
                            inProgress={addContributors_inProgress}
                            isLgimUserCreate={isLgimUserCreate}
                        />
                    )}
                </div>
            </div>
        );
    }
}
