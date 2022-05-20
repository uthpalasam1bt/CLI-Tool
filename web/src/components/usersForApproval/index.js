import React, { Component } from 'react';
import { List } from 'antd';
import userImg from '../../assets/images/common/user.png';

export default class UsersForApproval extends Component {
    constructor(props) {
        super(props);

        const { data } = this.props;
        this.state = {
            data
        };

        this.handleChange = this.handleChange.bind(this);
        this.notifyChange = this.notifyChange.bind(this);
    }

    UNSAFE_componentWillReceiveProps(np, nc) {
        if (np.data) {
            this.setState({ data: np.data });
        }
    }

    handleChange(item) {
        let { data } = this.state;
        const index = data.findIndex(i => i.__id === item.__id);

        if (index < 0) return;

        item.selected = !item.selected;
        data[index] = item;
        this.setState({ data }, this.notifyChange);
    }

    notifyChange() {
        const { data } = this.state;
        const { notifyChange } = this.props;

        if (notifyChange) notifyChange(data);
    }

    render() {
        const { data } = this.state;
        const { disabled } = this.props;
        const usersMap = item => (
            <List.Item className="list">
                <List.Item.Meta
                    avatar={<img src={userImg} className="img-fluid image" alt="user-img" icon="user" />}
                    title={item.userName}
                    // description={item.userType.charAt(0).toUpperCase() + item.userType.slice(1)}
                />
                <div>
                    <button
                        type="button"
                        disabled={disabled}
                        className={`btn-approval btn-${item.selected}`}
                        onClick={() => {
                            this.handleChange(item);
                        }}
                    >
                        {item.selected ? 'Deselect' : 'Select'}
                    </button>
                </div>
            </List.Item>
        );
        const selectedUsers = data.filter(d => d.selected === true);
        return (
            <div className="users-for-approval-wrapper">
                <div className="inner-header clearfix">
                    <label className="title">Select users for approval</label>
                    <label className="selected-users">{selectedUsers ? selectedUsers.length : 0} users selected</label>
                </div>
                <div className="content-holder clearfix">
                    <List
                        className="approval-list-items"
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={usersMap}
                    />
                </div>
            </div>
        );
    }
}
