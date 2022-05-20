import React from 'react';
import { Table } from 'antd';

const TableField = props => {
    const {
        options: { title, dataSource, columns }
    } = props;

    return (
        <>
            <span className="active-heading font-weight-bold">{title}</span>
            <Table dataSource={dataSource} columns={columns} pagination={false} />
        </>
    );
};

export default TableField;
