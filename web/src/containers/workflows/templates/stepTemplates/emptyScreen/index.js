import React from 'react';
import { Empty } from 'antd';

const EmptyView = props => {
    return (
        <div className="root-form-wrapper empty-view-container">
            <div className="card card-wrapper">
                <Empty
                    className="empty-view"
                    description={
                        <span>
                            Please select a category from 'Information Updates'
                            <br />
                            (Updates that are underway appear in bold)
                        </span>
                    }
                />
            </div>
        </div>
    );
};

export default EmptyView;
