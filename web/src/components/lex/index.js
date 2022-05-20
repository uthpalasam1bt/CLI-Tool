import ChatBubble from './ChatBubble';
import React from 'react';
import ReactDOM from 'react-dom';

import './global-styles.css';
import './index.css';

const LexChatSnippet = props => {
    return ReactDOM.createPortal(
        <>
            <div className="lex-react-ui-holder">
                <ChatBubble {...props} />
            </div>
        </>,
        document.body
    );
};

export default LexChatSnippet;
