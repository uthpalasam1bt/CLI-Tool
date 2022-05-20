import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Modal, Input, Button, Spin, Icon } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import FormHeaderComponent from '../../../../UILibrary/components/forms/formHeader';
import NotificationHelper from '../../../../helpers/NotificationHelper';

import {
    getSchemeUserDeleteAccountRequests,
    rejectSchemeUserDeleteAccountRequests,
    deleteUsersFromSystem
} from '../actions';
import {
    getSchemeUserAccountDeleteRequests_inProgress,
    getSchemeUserAccountDeleteRequestsResult,
    rejectSchemeUserAccountDeleteRequests_inProgress,
    deleteUsersFromSystem_inProgress
} from '../selector';
import { DELETE_USER_CLAIMS, DELETE_SCHEME_USERS_SYSTEM_MESSAGES } from '../constants';
import uiLibConstants from '../../../../UILibrary/constants';

const { FORM_ACTION_TYPES } = uiLibConstants;
const { TextArea } = Input;

const format = /[!#$%^*()+\=\[\]{};':"\\|<>\/?]+/;

let DeleteAccountRequests = props => {
    const { claims } = props;
    const hasClaim = claims.includes(DELETE_USER_CLAIMS.DELETE_SCHEME_USER);

    const dispatch = useDispatch();

    //const [deleteRequestsData, setDeleteRequestsData] = useState([]);

    const [selectedUserSchemeDetails, setSelectedUserSchemeDetails] = useState([]);
    const [schemeDetailsModalVisibility, setSchemeDetailsModalVisibility] = useState(false);
    const [warningModalVisibility, setWarningModalVisibility] = useState(false);
    const [confirmationModalVisibility, setConfirmationModalVisibility] = useState(false);
    const [rejectionModalVisibility, setRejectionModalVisibility] = useState(false);
    const [rejectReason, setRejectReason] = useState(null);

    const loading = useSelector(state => getSchemeUserAccountDeleteRequests_inProgress(state));
    const pendingDeleteRequestData = useSelector(state => getSchemeUserAccountDeleteRequestsResult(state)) || [];

    const rejecting = useSelector(state => rejectSchemeUserAccountDeleteRequests_inProgress(state));

    const deleting = useSelector(state => deleteUsersFromSystem_inProgress(state));

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);

    // const [searchText, setSearchText] = useState('');

    useEffect(() => {
        loadDeleteRequests();
    }, []);

    // useEffect(() => {
    //   loadDeleteRequestsData();
    // }, [loading === false]);

    const loadDeleteRequests = () => {
        dispatch(getSchemeUserDeleteAccountRequests());
    };

    // const loadDeleteRequestsData = () => {
    //   if (
    //     pendingDeleteRequestData &&
    //     pendingDeleteRequestData.data &&
    //     pendingDeleteRequestData.data.content &&
    //     pendingDeleteRequestData.data.content.length > 0
    //   ) {
    //     setDeleteRequestsData(pendingDeleteRequestData.data.content);
    //   }
    // };

    const onRowSelectionChange = (_selectedRowKeys, _selectedRows) => {
        setSelectedRowKeys(_selectedRowKeys);
        setSelectedRows(_selectedRows);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onRowSelectionChange
    };

    const generateUserIdList = () => {
        var idList = [];
        selectedRows.forEach(user => {
            if (user && user.userId) {
                idList.push(user.userId);
            }
        });

        return idList;
    };

    const approveDeleteRequests = () => {
        if (selectedRows.length > 0) {
            validateDeleteRequestSelection();
        } else {
            NotificationHelper.getInstance().warning(DELETE_SCHEME_USERS_SYSTEM_MESSAGES.NO_SELECTION);
        }
    };

    const validateDeleteRequestSelection = () => {
        for (const user of selectedRows) {
            if (user && user.schemeDetails && user.schemeDetails.length > 0) {
                for (const scheme of user.schemeDetails) {
                    if (scheme && scheme.userGroups && scheme.userGroups.length > 0) {
                        for (const uGroup of scheme.userGroups) {
                            if ((uGroup && uGroup.name && uGroup.name === 'Admin') || uGroup.name === 'Administrator') {
                                setWarningModalVisibility(true);
                                return;
                            }
                        }
                    }
                }
            }
        }

        setConfirmationModalVisibility(true);
    };

    const callDeleteUsersFromSystemAction = () => {
        setConfirmationModalVisibility(false);
        dispatch(
            deleteUsersFromSystem(
                {
                    idList: generateUserIdList()
                },
                result => {
                    // TODO::SIRI // Create custom modal view to show response
                    NotificationHelper.getInstance().success(DELETE_SCHEME_USERS_SYSTEM_MESSAGES.DELETE_SUCCESS);
                    setSelectedRowKeys([]);
                    setSelectedRows([]);
                    loadDeleteRequests();
                }
            )
        );
    };

    const rejectDeleteRequests = () => {
        if (selectedRows.length > 0) {
            setRejectionModalVisibility(true);
        } else {
            NotificationHelper.getInstance().warning(DELETE_SCHEME_USERS_SYSTEM_MESSAGES.NO_SELECTION);
        }
    };

    const callRejectDeleteRequestAction = () => {
        if (rejectReason && rejectReason.length > 0) {
            setRejectionModalVisibility(false);
            dispatch(
                rejectSchemeUserDeleteAccountRequests(
                    {
                        idList: generateUserIdList(),
                        reason: rejectReason
                    },
                    result => {
                        setRejectReason(null);
                        setSelectedRowKeys([]);
                        setSelectedRows([]);
                        loadDeleteRequests();
                    }
                )
            );
        } else {
            NotificationHelper.getInstance().error('No reason specified.');
        }
    };

    const onRejectReasonTextAreaChange = reason => {
        setRejectReason(reason && reason.length > 0 ? reason : null);
    };

    const setSchemeDetailsModalData = schemeDetails => {
        setSelectedUserSchemeDetails(schemeDetails);
        setSchemeDetailsModalVisibility(true);
    };

    const prepareUserGroupsDisplayLabelText = userGroups => {
        let customUserGroupsTitle = '';
        for (let i = 0; i < userGroups.length; i++) {
            let userGroupAtIndex = userGroups[i];
            customUserGroupsTitle += i === 0 ? userGroupAtIndex.name : ` / ${userGroupAtIndex.name}`;
        }
        return customUserGroupsTitle;
    };

    const formHeaderProps = {
        title: 'Delete requests',
        actions: [
            {
                type: FORM_ACTION_TYPES.DELETE,
                state: { inProgress: deleting },
                onClick: () => {
                    approveDeleteRequests();
                },
                bool: hasClaim,
                disabled: deleting || !selectedRows.length
            },
            {
                type: FORM_ACTION_TYPES.CONTINUE,
                title: 'Reject',
                state: { inProgress: rejecting },
                onClick: () => {
                    rejectDeleteRequests();
                },
                bool: hasClaim,
                disabled: rejecting || !selectedRows.length
            }
        ]
    };

    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div className="report-dropdown-input">
                <Input
                    className="report-input"
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button onClick={() => handleReset(clearFilters)} className="btn-grey-o btn-cancel btn-reset">
                    Reset
                </Button>
                <Button
                    className="tpip-btn-blue btn-search"
                    onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    icon={<SearchOutlined />}
                >
                    Search
                </Button>
            </div>
        ),
        filterIcon: filtered => (
            <SearchOutlined
                style={{ color: filtered ? '#1890ff' : undefined }}
                //className="position-static pull-right"
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase())
    });

    const handleSearch = (selectedKeys, confirmFunc, dataIndex) => {
        confirmFunc();
    };

    const handleReset = clearFilters => {
        clearFilters();
        // setSearchText({ searchText: '' });
    };

    const userTableColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            className: 'scheme-name',
            render: name => <span>{name}</span>,
            ...getColumnSearchProps('name'),
            filterIcon: filtered => (
                <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined, left: '54px' }} />
            )
        },
        {
            title: 'Email',
            dataIndex: 'email',
            className: 'email',
            key: 'email',
            render: email => <span>{email}</span>,
            ...getColumnSearchProps('email'),
            filterIcon: filtered => (
                <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined, left: '52px' }} />
            )
        },
        {
            title: 'Associated schemes',
            dataIndex: 'schemeDetails',
            key: 'schemeDetails',
            render: schemeDetails => (
                <span>
                    <a
                        href="#schemeDetails"
                        className={schemeDetails && schemeDetails.length > 0 ? `ellipsis-text` : `remove-hand`} //"link"
                        onClick={() => {
                            if (schemeDetails && schemeDetails.length > 0) {
                                setSchemeDetailsModalData(schemeDetails);
                            }
                        }}
                    >
                        {schemeDetails && schemeDetails.length > 0
                            ? schemeDetails.length > 1
                                ? `${schemeDetails.length} Schemes`
                                : '1 Scheme'
                            : '0 Schemes'}
                    </a>
                </span>
            )
        }
    ];

    const schemeTableColumns = [
        {
            title: 'Schemes',
            dataIndex: 'schemeName',
            key: 'schemeName',
            //className: 'scheme-name',
            render: schemeName => <span>{schemeName}</span>,
            width: 120
        },
        {
            title: 'User groups',
            dataIndex: 'userGroups',
            key: 'userGroups',
            render: userGroups => <span>{prepareUserGroupsDisplayLabelText(userGroups)}</span>
        }
    ];

    return (
        <>
            <div className="root-form-wrapper-information">
                <div className="card card-wrapper delete-account">
                    <FormHeaderComponent {...formHeaderProps} />
                    <div className="user-table-container text-center">
                        {loading ? (
                            <Spin />
                        ) : (
                            <Table
                                className="user-table"
                                rowSelection={rowSelection}
                                columns={userTableColumns}
                                dataSource={pendingDeleteRequestData}
                                pagination={false}
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* Associated Schemes Details Modal */}
            <Modal
                className="lgim-styles-wrapper delete-account-modal delete-request-modal associated-modal"
                footer={null}
                visible={schemeDetailsModalVisibility}
                title="Associated Schemes"
                onCancel={() => setSchemeDetailsModalVisibility(false)}
            >
                <div className="content">
                    <Table
                        className="delete-account-table"
                        columns={schemeTableColumns}
                        dataSource={selectedUserSchemeDetails}
                        pagination={false}
                    />
                    <div className="content-footer">
                        <button
                            className="btn btn-outline regular btn-close"
                            onClick={() => setSchemeDetailsModalVisibility(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Rejection Modal */}
            <Modal
                className="lgim-styles-wrapper delete-account-modal delete-reject-modal"
                footer={null}
                visible={rejectionModalVisibility}
                title="Reject"
                onCancel={() => {
                    setRejectionModalVisibility(false);
                    setRejectReason(null);
                }}
            >
                <div className="content">
                    <p className="content-title">Please specify the reason for rejection.</p>
                    <TextArea
                        rows={4}
                        className="text-area"
                        onChange={e => {
                            if (e && e.target && e.target.value && format.test(e.target.value)) {
                                NotificationHelper.getInstance().warning('Special characters are not allowed.');
                                onRejectReasonTextAreaChange(
                                    e.target.value.replace(/[!#$%^&*()+\=\[\]{};':"\\|<>\/?]+/, '')
                                );
                            } else {
                                onRejectReasonTextAreaChange(e.target.value);
                            }
                        }}
                        value={rejectReason}
                    />
                    <div className="content-footer">
                        <button
                            className="btn btn-outline regular btn-close"
                            onClick={() => setRejectionModalVisibility(false)}
                        >
                            Close
                        </button>
                        <button
                            className="btn tpip-btn-blue regular btn-delete"
                            onClick={() => callRejectDeleteRequestAction()}
                        >
                            Yes, Reject.
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Delete Warning Modal */}
            <Modal
                className="lgim-styles-wrapper delete-account-modal delete-reject-modal"
                footer={null}
                visible={warningModalVisibility}
                title="Cannot Delete"
                onCancel={() => setWarningModalVisibility(false)}
            >
                <div className="content">
                    <p className="content-title delete-title">
                        The selected user(s) cannot be deleted as they are associated with one or more scheme admin
                        groups.
                    </p>
                </div>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                className="lgim-styles-wrapper delete-account-modal delete-reject-modal"
                footer={null}
                visible={confirmationModalVisibility}
                title="Delete"
                onCancel={() => setConfirmationModalVisibility(false)}
            >
                <div className="content">
                    <p className="content-title delete-title">Are you sure you want to delete the selected user(s)?</p>
                    <div className="content-footer">
                        <button
                            className="btn btn-outline regular btn-close"
                            onClick={() => setConfirmationModalVisibility(false)}
                        >
                            Close
                        </button>
                        <button
                            className="btn btn-red regular btn-delete"
                            onClick={() => callDeleteUsersFromSystemAction()}
                        >
                            Yes, Delete!
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default DeleteAccountRequests;
