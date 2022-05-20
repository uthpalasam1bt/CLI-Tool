import React, { useState } from 'react';
import { Table, Tooltip, Empty } from 'antd';
import searchIcon from '../../../../assets/images/common/search-client.svg';
import Loading from 'components/Loading';
import { searchClientUsersRequest, getClientAutofillDataRequest } from '../actions';
import FormHeaderComponent from '../../../../UILibrary/components/forms/formHeader';
import uiLibConstants from '../../../../UILibrary/constants';
import { useDispatch } from 'react-redux';
import { history } from '../../../../redux/store';

const { FORM_ACTION_TYPES } = uiLibConstants;

const SearchTable = props => {
    const { clientUsers = null, loading, clientAutofill } = props;

    const [searchValue, setSearchValue] = useState('');

    const dispatch = useDispatch();
    const searchClientUsersHandler = value => {
        dispatch(searchClientUsersRequest({ value: value }));
    };
    const getClientAutofillDataHandler = value => {
        dispatch(getClientAutofillDataRequest({ value: value }));
    };
    const formHeaderProps = {
        title: 'Search Platform Users',
        actions: [
            {
                type: FORM_ACTION_TYPES.SEARCH,
                state: { inProgress: false },
                onSearch: (value, enter) => {
                    searchClientUsersHandler(enter ? value : searchValue);
                },
                onChange: value => {
                    getClientAutofillDataHandler(value);
                    setSearchValue(value);
                },
                bool: true,
                dataSource: clientAutofill
            }
        ]
    };
    const redirectToSchemeOptions = scheme => {
        return history.push(`/scheme/options/user-management/${scheme.schemeId}/${scheme.schemeName}`);
    };
    const sortByName = (a, b) => {
        let aString = a.name.toLowerCase();
        let bString = b.name.toLowerCase();
        if (aString < bString) return -1;
        if (aString > bString) return 1;
        return 0;
    };
    const sortByEmail = (a, b) => {
        let aString = a.email.toLowerCase();
        let bString = b.email.toLowerCase();
        if (aString < bString) return -1;
        if (aString > bString) return 1;
        return 0;
    };
    const sortBySchemes = (a, b) => {
        let aString = a.schemesCount;
        let bString = b.schemesCount;
        if (aString < bString) return -1;
        if (aString > bString) return 1;
        return 0;
    };
    const columnsMap = [
        {
            key: 'name',
            title: 'Name',
            dataIndex: 'name',
            sorter: sortByName
        },
        {
            key: 'email',
            title: 'Email',
            dataIndex: 'email',
            sorter: sortByEmail,
            render: email => (
                <Tooltip placement="bottom" title={email}>
                    <span className="ellipsis-text">{email}</span>
                </Tooltip>
            )
        },
        {
            key: 'schemesCount',
            title: 'Schemes',
            dataIndex: 'schemesCount',
            sorter: sortBySchemes,
            render: schemesCount => (
                <Tooltip placement="bottom" title={schemesCount}>
                    <span className="ellipsis-text">{schemesCount}</span>
                </Tooltip>
            )
        }
    ];
    const dataSourceMap =
        clientUsers &&
        clientUsers.map((user, key) => {
            return {
                key,
                name: user.name,
                email: user.email,
                schemes: user.schemes,
                schemesCount: user.schemes.length
            };
        });

    return (
        <div className="root-form-wrapper-information">
            <div className="card card-wrapper">
                <FormHeaderComponent {...formHeaderProps} />

                {loading ? (
                    <Loading />
                ) : Array.isArray(clientUsers) ? (
                    !loading && clientUsers.length ? (
                        <div className="user-table-container">
                            <Table
                                className="user-table"
                                columns={columnsMap}
                                pagination={false}
                                dataSource={dataSourceMap}
                                Key={columnsMap.email}
                                expandedRowRender={record =>
                                    record.schemesCount !== 0 && (
                                        <div className="search-collapse-wrap">
                                            <p className="collapse-content-heading">Scheme belongs to</p>
                                            <ul>
                                                {record.schemes.map(scheme => {
                                                    return (
                                                        <li
                                                            className="list-item"
                                                            onClick={() => {
                                                                redirectToSchemeOptions(scheme);
                                                            }}
                                                        >
                                                            {scheme.schemeName}
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                    )
                                }
                            ></Table>
                        </div>
                    ) : (
                        <div className="search-platform-user-wrap flex-wrap">
                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'No users found'}></Empty>
                        </div>
                    )
                ) : (
                    <div className="search-platform-user-wrap flex-wrap">
                        <img src={searchIcon} alt="icon" className="icon" />
                        <span className="sub-text">Search for Client Users</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchTable;
