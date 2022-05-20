import React, { Component } from 'react';
import { Avatar } from 'antd';

export default class ProfileImage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return <Avatar icon="user" src={this.props.imageUrl} alt={this.props.alt} />;
    }
}
