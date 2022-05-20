import React from 'react';
import { Tooltip } from 'antd';

const ActionBar = ({ items }) => {
    const renderItmes = () => {
        return items.map((item, index) => {
            if (item.type === 'button') {
                return item.onRender(item.key);
            }
            if (item.onRender) {
                return (
                    <span key={item.key} className="header-icons clearfix">
                        {item.onRender()}
                    </span>
                );
            }
            if (!item.show) {
                return null;
            }
            return (
                <Tooltip title={item.prompt}>
                    <span key={item.key} onClick={item.onClick} className="header-icons active">
                        <i className={`fa fa-${item.icon} ic-light`}></i>
                    </span>
                </Tooltip>
            );
        });
    };
    return <div className="header">{renderItmes()}</div>;
};

export default ActionBar;
