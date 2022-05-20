import React from 'react';
import { Empty, Row, Table } from 'antd';

const BaseTableComponent = props => {
    const { tableKey, rowSelection, columns, dataSource, description, className, tableClassName } = props;
    return (
        <>
            <Row gutter={20} className={className ? className : 'custom-row table-row'}>
                <Table
                    key={tableKey}
                    className={tableClassName ? tableClassName : 'table-wrap'}
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={dataSource}
                    pagination={false}
                    locale={{
                        emptyText: (
                            <Empty
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                description={description ? description : 'Select report type'}
                            />
                        )
                    }}
                />
            </Row>
        </>
    );
};

export default BaseTableComponent;
