import React, { useState } from 'react';
import { Tabs, Typography, Card, Select, Menu, Tooltip } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { commonUserClaims } from '../../../../containers/dashboard/UserManagement/selector';
import { CLAIMS } from '../../../../constants/keyMetricsConstants';

const { Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;
const { SubMenu } = Menu;

const ViewContainer = props => {
    const {
        views,
        handleViewChangeCb,
        selectedView,
        selectedUserType,
        handleUserType,
        latestSavedViewName,
        handleLatestSavedViewName
    } = props;
    const commonUserClaims_data = useSelector(state => commonUserClaims(state));

    const handleViewChange = e => {
        handleViewChangeCb(e);
        if (e.key) {
            handleViewChangeCb(e.key);
        }

        handleLatestSavedViewName();
    };

    const handleOnChangeUserType = e => {
        handleUserType(e);
        handleLatestSavedViewName();
    };
    const filterCustomValues = () => {
        const tempArr = views.filter(f => f.userId);
        return tempArr.length > 0;
    };
    const getLatestSavedViewId = () => {
        const latestSavedViewId = views.find(f => f.viewName === latestSavedViewName);

        if (latestSavedViewId) return latestSavedViewId.viewId;
    };

    return (
        <>
            <div className="lgim-styles-wrapper km-view-container">
                <Card bordered={false} className="km-view-container-card">
                    {commonUserClaims_data &&
                    commonUserClaims_data.includes(CLAIMS.MANAGE_KEY_METRICS_GLOBAL_VIEWS_CLAIM) ? (
                        <Select
                            defaultValue={selectedUserType}
                            onChange={handleOnChangeUserType}
                            className="km-select-user-type"
                        >
                            <Option value="admin">
                                <Typography.Text className="km-user-type-text">LGIM</Typography.Text>
                            </Option>
                            {/* <Option value="advisory">
                                <Typography.Text className="km-user-type-text">Advisory</Typography.Text>
                            </Option> */}
                            <Option value="specialAdvisory">
                                <Typography.Text className="km-user-type-text">SpecialAdvisory</Typography.Text>
                            </Option>
                            <Option value="client">
                                <Typography.Text className="km-user-type-text">Client</Typography.Text>
                            </Option>
                            <Option value="custom">
                                <Typography.Text className="km-user-type-text">Custom</Typography.Text>
                            </Option>
                        </Select>
                    ) : null}
                    <div className="km-slide-views-cn">
                        {filterCustomValues() ? (
                            <>
                                <Menu
                                    onClick={handleViewChange}
                                    defaultOpenKeys={[
                                        latestSavedViewName
                                            ? 'customKey'
                                            : selectedView
                                            ? selectedView.userId
                                                ? 'customKey'
                                                : 'defaultKey'
                                            : 'null'
                                    ]}
                                    mode="inline"
                                    selectedKeys={[
                                        latestSavedViewName !== null
                                            ? getLatestSavedViewId()
                                            : selectedView
                                            ? selectedView.viewId
                                            : null
                                    ]}
                                >
                                    <SubMenu
                                        key="defaultKey"
                                        icon={<SettingOutlined />}
                                        title={
                                            <Typography.Text className="km-ant-text-menu-title">
                                                DEFAULT VIEWS
                                            </Typography.Text>
                                        }
                                        className="km-view-menu-item"
                                    >
                                        {views
                                            .filter(f => !f.userId)
                                            .sort((prev, next) => {
                                                if (!prev.isSeeded) return 1;
                                                return -1;
                                            })
                                            .map((v, k) => {
                                                return v.userId === undefined ? (
                                                    <Menu.Item key={v.viewId} className="km-view-menu-sub-item">
                                                        {v.viewName.length > 12 ? (
                                                            <Tooltip placement="topLeft" title={v.viewName}>
                                                                {v.viewName.substr(0, 12)}...
                                                            </Tooltip>
                                                        ) : (
                                                            v.viewName
                                                        )}
                                                    </Menu.Item>
                                                ) : null;
                                            })}
                                    </SubMenu>

                                    <SubMenu
                                        key="customKey"
                                        icon={<SettingOutlined />}
                                        title={
                                            <Typography.Text className="km-ant-text-menu-title">
                                                CUSTOM VIEWS
                                            </Typography.Text>
                                        }
                                        className="km-view-menu-item"
                                    >
                                        {views
                                            .filter(f => f.userId)
                                            .map((v, k) => {
                                                return v.userId ? (
                                                    <Menu.Item key={v.viewId} className="km-view-menu-sub-item">
                                                       {v.viewName.length > 12 ? (
                                                            <Tooltip placement="topLeft" title={v.viewName}>
                                                                {v.viewName.substr(0, 12)}...
                                                            </Tooltip>
                                                        ) : (
                                                            v.viewName
                                                        )}
                                                    </Menu.Item>
                                                ) : null;
                                            })}
                                    </SubMenu>
                                </Menu>
                            </>
                        ) : (
                            <div>
                                <Typography className="km-ant-Typography">
                                    <Text className="km-ant-text">DEFAULT VIEWS</Text>
                                </Typography>

                                <Tabs
                                    className="key-metrics-tab"
                                    onChange={handleViewChange}
                                    tabPosition="left"
                                    activeKey={
                                        latestSavedViewName !== null
                                            ? getLatestSavedViewId()
                                            : selectedView
                                            ? selectedView.viewId
                                            : null
                                    }
                                >
                                    {views
                                        .sort((prev, next) => {
                                            if (!prev.isSeeded) return 1;
                                            return -1;
                                        })
                                        .map((v, k) => {
                                            return v.userId === undefined ? (
                                                <TabPane
                                                    tab={
                                                        <>
                                                            {v.viewName.length > 12 ? (
                                                                <Tooltip placement="topLeft" title={v.viewName}>
                                                                    {v.viewName.substr(0, 12)}...
                                                                </Tooltip>
                                                            ) : (
                                                                v.viewName
                                                            )}
                                                        </>
                                                    }
                                                    key={v.viewId}
                                                ></TabPane>
                                            ) : null;
                                        })}
                                </Tabs>

                                {/* 
                                
                            {filterCustomValues() ? (
                                <>
                                    <Typography className="km-ant-Typography">
                                        <Text className="km-ant-text">CUSTOM VIEWS</Text>
                                    </Typography>
                                </>
                            ) : null} */}

                                {/* <Tabs
                                        className="key-metrics-tab"
                                        defaultActiveKey="default-filters"
                                        onChange={handleViewChange}
                                        tabPosition="left"
                                        activeKey={selectedView ? selectedView.viewId : 'default-filters'}
                                    >
                                        {views.map((v, k) => {
                                            return v.userId ? (
                                                <TabPane tab={<>{v.viewName}</>} key={v.viewId}></TabPane>
                                            ) : null;
                                        })}
                                    </Tabs> */}
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        </>
    );
};

export default ViewContainer;
