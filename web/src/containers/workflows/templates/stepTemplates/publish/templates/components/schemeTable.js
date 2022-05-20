import _ from 'lodash';
import React from 'react';
import { Icon, Row, Table } from 'antd';
import SearchTextInput from './SearchTextInput';
import Loading from 'components/Loading';

const SchemeTable = ({ activeSchemes_data, fetchingSchemes, onSchemesSelected, dataset }) => {
    let displayColumns = _.get(dataset, `schemeConfig.displayColumns`, []);
    const schemes = _.get(dataset, `schemes`, []);

    // const schemesData = activeSchemes_data.map(scheme => ({
    //     key: scheme.schemeId,
    //     name: scheme.schemeName,
    //     status: scheme.status
    // }));

    const schemesData = schemes.map(scheme => {
        const obj = { key: scheme.schemeId };

        displayColumns.forEach(column => {
            if (scheme[column.name]) {
                obj[column.name] = scheme[column.name];
            } else {
                obj[column.name] = '-';
            }
        });

        return obj;
    });

    const handleSearch = (setSelectedKeys, selectedKeys, handleConfirm, dataIndex, searchText) => {
        setSelectedKeys([searchText]);
        handleConfirm();
    };

    const handleReset = (setSelectedKeys, clearFilters) => {
        setSelectedKeys([]);
        clearFilters();
    };

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            onSchemesSelected(selectedRowKeys);
        }
    };

    displayColumns = displayColumns.map(column => {
        return {
            key: column.name,
            title: column.title,
            dataIndex: column.name,
            filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
            onFilter: (value, record) => {
                return record[column.name]
                    .toString()
                    .toLowerCase()
                    .includes(value.toLowerCase());
            },
            render: text => <a>{text}</a>,
            ...(_.get(column, `filterConfig.enabled`, false) ? {filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <SearchTextInput
                    placeholder={_.get(column, `filterConfig.placeholder`, ' ')}
                    onReset={() => handleReset(setSelectedKeys, clearFilters)}
                    onSearch={searchText => handleSearch(setSelectedKeys, selectedKeys, confirm, column.name, searchText)}
                />
            )} : {})
        }
    });

    // const columns = [
    //     {
    //         key: 'schemeName',
    //         title: 'Scheme Name',
    //         dataIndex: 'name',
    //         filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
    //             <SearchTextInput
    //                 placeholder="Search by scheme name"
    //                 onReset={() => handleReset(setSelectedKeys, clearFilters)}
    //                 onSearch={searchText => handleSearch(setSelectedKeys, selectedKeys, confirm, 'name', searchText)}
    //             />
    //         ),
    //         filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
    //         onFilter: (value, record) => {
    //             return record['name']
    //                 .toString()
    //                 .toLowerCase()
    //                 .includes(value.toLowerCase());
    //         },
    //         render: text => <a>{text}</a>
    //     }
    // ];

    return (
        <Row>
            {fetchingSchemes ? (
                <Loading />
            ) : (
                <Table
                    key="publishToSchemeTable"
                    className="table-wrap"
                    rowSelection={{
                        type: 'checkbox',
                        ...rowSelection
                    }}
                    columns={displayColumns}
                    dataSource={schemesData}
                    size="small"
                    pagination={false}
                    bordered={false}
                />
            )}
        </Row>
    );
};

export default SchemeTable;
