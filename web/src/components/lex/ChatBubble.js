import React, { useState } from 'react';
import { Popover } from 'antd';
import ChatWindow from './ChatWindow';

export default function ChatBubble(props) {
    const [isShowChatWindow, showChatWindow] = useState(false);

    const placeholder = props['placeholder'];
    const title = (
        <div className="flex-wrap">
            <span className="title">Automated support</span>
            <i
                onClick={() => {
                    showChatWindow(!isShowChatWindow);
                }}
                className="fa fa-times close-icon"
            />
        </div>
    );
    const chatWindow = <ChatWindow placeholder={placeholder} />;
    return (
        <Popover
            overlayClassName="chat-popover"
            placement="topRight"
            title={title}
            content={chatWindow}
            trigger="click"
            visible={isShowChatWindow}
        >
            {!isShowChatWindow && (
                <div
                    className="chat-bubble-wrapper"
                    onClick={() => {
                        showChatWindow(!isShowChatWindow);
                    }}
                >
                    <i className={`fa fa-comment comment-icon`}></i>
                </div>
            )}
        </Popover>
    );
}
