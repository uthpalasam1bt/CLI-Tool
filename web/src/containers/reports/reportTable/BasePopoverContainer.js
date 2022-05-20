import React, { useState } from 'react';
import { Popover } from 'antd';
import icon from '../../../assets/images/threedot.svg';

const BasePopoverContainer = ({ actions, placement = 'bottomRight', concurrencyModalVisibility }) => {
    const [visible, setVisible] = useState(false);

    return (
        <Popover
            placement={placement}
            content={<div onClick={() => setVisible(false)}>{actions}</div>}
            trigger="click"
            visible={visible && !concurrencyModalVisibility}
            onVisibleChange={visibleStatus => setVisible(visibleStatus)}
        >
            <span className="cursor">
                <img className="icon" src={icon} alt="icon" />
            </span>
        </Popover>
    );
};

export default BasePopoverContainer;
