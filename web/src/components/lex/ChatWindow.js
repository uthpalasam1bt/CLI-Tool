import React, { Component } from 'react';
import { Input } from 'antd';
import _ from 'lodash';
import image from '../../assets/images/logo.svg';
import connectApi from '../../middlewares/connectApi';
export default class ChatWindow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fetching: false,
            message: '',
            messagesList: []
        };

        this.handleChangeMessage = this.handleChangeMessage.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.pressEnter = this.pressEnter.bind(this);
        this.scrollToEnd = this.scrollToEnd.bind(this);
        this.generateMessage = this.generateMessage.bind(this);
    }

    handleChangeMessage(message) {
        this.setState({ message });
    }

    pressEnter() {
        const { message } = this.state;
        this.sendMessage(message);
    }

    componentDidUpdate() {
        //may need to remove this later if some operations should not scroll to end
        this.scrollToEnd();
    }

    generateMessage(messagesList, message, owner = 'me', type = 'PT', autoRepondLinks = []) {
        let generatedMsg = [];
        autoRepondLinks.forEach(ar => {
            if (generatedMsg.length < 1) {
                let msgChunks = message.split(ar.highLight);
                generatedMsg = [
                    msgChunks[0],
                    <a href="#" onClick={() => this.sendMessage(ar.autoType)}>
                        {ar.highLight}
                    </a>,
                    ...msgChunks.splice(1)
                ];
            } else {
                generatedMsg.forEach((msg, i) => {
                    if (typeof msg !== 'string' || !msg.includes(ar.highLight)) return;
                    let msgChunks = msg.split(ar.highLight);
                    let tempGmsg = [
                        msgChunks[0],
                        <a href="#" onClick={() => this.sendMessage(ar.autoType)}>
                            {ar.highLight}
                        </a>,
                        ...msgChunks.splice(1)
                    ];
                    generatedMsg.splice(i, 1, ...tempGmsg);
                });
            }
        });
        //if there are autorespondlinks then assign the generated msg else assign original msg
        messagesList.push({ message: autoRepondLinks.length ? generatedMsg : message, owner, type });
        return messagesList;
    }

    sendMessage(message) {
        const { messagesList, fetching } = this.state;
        if (fetching || !message) return;

        let withSenderMessage = this.generateMessage(messagesList, message);
        this.setState({ message: '', messagesList: withSenderMessage }, async () => {
            this.setState({ fetching: true });

            const response = await connectApi.getBotMessages({ message: message });
            const lexReply = _.get(response, 'data.content', []);
            if (lexReply.length) {
                lexReply.forEach(data => {
                    withSenderMessage = this.generateMessage(
                        withSenderMessage,
                        data.reply,
                        'them',
                        data.type,
                        data.autoRespond
                    );
                });
            }

            this.setState({ messagesList: withSenderMessage, fetching: false });
        });
    }

    scrollToEnd() {
        this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
    }

    render() {
        const { message, messagesList, fetching } = this.state;
        const { placeholder } = this.props;
        const { TextArea } = Input;

        return (
            <div className="message-tab">
                <div className="content">
                    <div className="content-body">
                        {messagesList.map((item, key) => (
                            <div className={`content-message sent-message clear ${item.owner}`} key={key}>
                                <span className="leaf-icon">
                                    <img alt="logo" className="logo-img" src={image} />
                                </span>
                                <pre className="text">{item.message}</pre>
                            </div>
                        ))}
                        {fetching && (
                            <div className="content-message type-message clear">
                                <p className="text"> Lex is typing...</p>
                            </div>
                        )}
                        {/* Dummy place holder to scroll to end */}
                        <div
                            ref={el => {
                                this.messagesEnd = el;
                            }}
                        ></div>
                    </div>
                    <div className="content-footer">
                        {/* <i className="icon-image fa fa-camera" /> */}
                        <TextArea
                            name="text"
                            wrap="soft"
                            placeholder={placeholder}
                            className="md-cell md-cell--bottom footer-message"
                            value={message}
                            onChange={e => {
                                this.handleChangeMessage(e.target.value);
                            }}
                            onKeyPress={evt => {
                                var charCode = evt.which || evt.charCode || evt.keyCode || 0;
                                if (charCode === 13) evt.preventDefault();
                            }}
                            onPressEnter={this.pressEnter}
                        />
                        <i className="icon-image fa fa-send" onClick={() => this.sendMessage(message)} />
                    </div>
                </div>
            </div>
        );
    }
}
