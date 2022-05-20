import React from 'react';
import { Checkbox, Popover, Row } from 'antd';
import moment from 'moment';

const MessageItem = ({ item, handleTaskSelection, selected, handleMarkAsRead, handleDeleteTask }) => {
    const content = (
        <div className="notify-popover">
            {!item.markAsRead && (
                <span className="notify-content" onClick={() => handleMarkAsRead(item.taskId)}>
                    <i className="fa fa-check icon"></i>Mark as read
                </span>
            )}
            <span className="notify-content" onClick={() => handleDeleteTask(item.taskId)}>
                <i className="fa fa-trash icon"></i>Delete
            </span>
        </div>
    );

    const handleSelect = e => {
        handleTaskSelection(e.target.name, e.target.checked);
    };

    const dotClassName = !item.markAsRead ? 'dot' : 'nodot';

    return (
        <Row>
            <div className="notification-list clearfix">
                <span className="checkbox-wrap">
                    <Checkbox checked={selected} name={item.taskId} onChange={handleSelect}></Checkbox>
                </span>
                <span className={dotClassName}></span>
                {item.senderName ? <span className="sender-name">{item.senderName}</span> : null}
                <div className={item.senderName ? 'description custom-title' : 'description'}>
                    <span className="notification-title">{item.title}</span>
                    <span className="notification-description">{item.description}</span>
                </div>
                <div className="date-wrap">
                    <span className="date">{moment(item.createdDate).format('MMM DD')}</span>
                    <Popover placement="bottom" content={content} trigger="click">
                        <span>
                            <i className="fa fa-ellipsis-v icon"></i>
                        </span>
                    </Popover>
                </div>
            </div>
        </Row>
    );
};

export default MessageItem;
