import React, { Component, Fragment } from 'react';
import { Col, Row, Menu, Icon } from 'antd';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _ from 'lodash';

import Sections from './sections';
import { store_schemeData } from '../selector';

import { Funding, taskMap } from './constants';
import { FileTextIcon } from '../../../components/icons/file-text';
import { UserRole } from '../../../constants/userConstants';

import { doRequestDocumentConfig } from './actions/documentDirectoryActions';
import { doRequestReportConfig } from './actions/reportDirectoryActions';
import { document_config_inProgress, document_config } from './selectors/documentDirectorySelectors';
import { report_config_inProgress, report_config } from './selectors/reportDirectorySelectors';
import {
    doRequestInformationDirectoryConfig,
    doResetConfig,
    doRequestInformationDirectoryData
    // doResetFormData
} from './actions/InformationDirectoryActions';
import {
    information_directory_config_inProgress,
    information_directory_config,
    information_directory_form_data_inProgress,
    information_directory_form_data
} from './selectors/informationDirectorySelectors';

import Loading from '../../../components/Loading';

const { LGIM, CLIENT, ADMIN } = UserRole;
const SubMenu = Menu.SubMenu;
class InformationContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            taskMap: null,
            activeTask: null,
            tempFormtype: null,
            formTypename: null,
            schemeId: null,
            document_config: {},
            document_config_inProgress: null,
            report_config: {},
            report_config_inProgress: null,
            information_directory_config: {},
            information_directory_config_inProgress: false,
            information_directory_form_data: {},
            information_directory_form_data_inProgress: false
        };

        this.handleChangeTask = this.handleChangeTask.bind(this);
    }

    componentDidMount() {
        this.getInformationDirectoryConfig();
        this.getDocumentConfig();
        this.getInformationDirectoryFormData();
        this.getReportConfig();
    }
    componentWillUnmount() {
        this.props.doResetConfig();
        // this.props.doResetFormData();
    }
    UNSAFE_componentWillReceiveProps() {
        const { information_directory_config, document_config_inProgress, report_config_inProgress } = this.props;
        if (information_directory_config && !document_config_inProgress && !report_config_inProgress) {
            this.genarateTaskMap(null, information_directory_config);
        }
    }

    UNSAFE_componentWillMount() {
        this.ua = window.navigator.userAgent;
        const windowsBrowserRegex = /Trident|MSIE|Edge/;
        this.isIE = this.ua.match(windowsBrowserRegex);
    }

    // when click navigation tabs, change view screen(screen key) and screen name
    handleChangeTask(activeTask) {
        this.setState({ activeTask });

        taskMap.forEach(task => {
            if (task.subItems) {
                task.subItems.forEach(tasksub => {
                    if (task.id === activeTask.taskMapid && tasksub.keyid === activeTask.keyid) {
                        this.setState({ tempFormtype: tasksub.formtype, formTypename: tasksub.name });
                    }
                });
            }
        });
    }

    getDocumentConfig() {
        const { doRequestDocumentConfig } = this.props;
        const { schemeClassification, schemeId } = this.props.store_schemeData;
        doRequestDocumentConfig({ schemeClassification, schemeId });
    }
    getInformationDirectoryConfig() {
        const { doRequestInformationDirectoryConfig } = this.props;
        let { schemeId } = this.props.store_schemeData;
        doRequestInformationDirectoryConfig(schemeId);
    }
    getInformationDirectoryFormData() {
        const { doRequestInformationDirectoryFormData } = this.props;
        let { schemeId } = this.props.store_schemeData;
        doRequestInformationDirectoryFormData(schemeId);
    }
    getReportConfig() {
        const { doRequestReportConfig } = this.props;
        const { schemeClassification, schemeId } = this.props.store_schemeData;
        doRequestReportConfig({ schemeClassification, schemeId });
    }
    genarateTaskMap(document_config = {}, information_directory_config = {}, report_config = {}) {

        const tabFiller = taskMap.filter((section) => !section.roles || (section.roles && section.roles.includes(this.props.loggedUser.primaryRole)));

        tabFiller.filter((section) => !section.roles || (section.roles && section.roles.includes(this.props.loggedUser.primaryRole))).map(task => {
            if (task.name === 'Documents' && document_config !== null) {
                if (task.subItems) task.subItems = [];
                for (const [key, value] of Object.entries(document_config)) {
                    task.subItems.push({
                        keyid: value.keyid,
                        formtype: key,
                        name: value.title,
                        sortOrder: value.sortOrder,
                        taskMapid: 2
                    });
                }
                task.subItems.sort((prv, nxt) => parseInt(prv.sortOrder) - parseInt(nxt.sortOrder));
            } else if (task.id === 0 && information_directory_config !== null) {
                if (task.subItems) task.subItems = [];

                for (const [key, value] of Object.entries(information_directory_config)) {
                            task.subItems.push({
                                key: key,
                                keyid: value.keyId,
                                formtype: value.formtype,
                                name: value.name,
                                sortOrder: value.sortOrder,
                                taskMapid: 0
                            });
                }
                task.subItems.sort((prv, nxt) => parseInt(prv.sortOrder) - parseInt(nxt.sortOrder));
            } else if (task.id === 4 && report_config !== null) {
                if (task.subItems) task.subItems = [];
                for (const [key, value] of Object.entries(report_config)) {
                    task.subItems.push({
                        keyid: value.keyid,
                        formtype: key,
                        name: value.title,
                        sortOrder: value.sortOrder,
                        taskMapid: 4
                    });
                }
                task.subItems.sort((prv, nxt) => parseInt(prv.sortOrder) - parseInt(nxt.sortOrder));
            }
        });



        this.setState({ taskMap: tabFiller });
    }

    render() {
        let { taskMap } = this.state;
        const { document_config, information_directory_config, report_config } = this.props;
         // console.log('form data :::::::', information_directory_form_data);

        if (!taskMap && document_config && information_directory_config && report_config) {
            this.genarateTaskMap(document_config, information_directory_config, report_config);
        }

        return (
            <section className="proposal-information-section">
                <Row gutter={20}>
                    <Col xl={8} lg={8} xs={24}>
                        <div className="information-navigator">
                            <div className="card card-wrap">
                                <div className="header">
                                    <span className="title">
                                        <b>Scheme Details</b>
                                    </span>
                                </div>
                                <div className="content">
                                    <Menu defaultSelectedKeys={[]} defaultOpenKeys={[]} mode="inline">
                                        {taskMap ? (
                                            taskMap.map((task, tKey) => (
                                                <SubMenu
                                                    title={
                                                        <span>
                                                            {this.isIE ? (
                                                                <Icon type="file-text" className="overflow-auto" />
                                                            ) : (
                                                                <FileTextIcon height="auto" width="auto" />
                                                            )}
                                                            <span>{task.name}</span>
                                                        </span>
                                                    }
                                                    key={tKey}
                                                >
                                                    {//set side menu and remove conditional tabs(ex : incumbent managers)
                                                    task.subItems
                                                        ? task.subItems.map(tasksub => (

                                                              <Menu.Item
                                                                  key={tasksub.keyid}
                                                                  onClick={() => {
                                                                      this.handleChangeTask(tasksub);
                                                                  }}
                                                              >
                                                                  {
                                                                      <span>
                                                                          {this.isIE ? (
                                                                              <Icon
                                                                                  type="file-text"
                                                                                  className="overflow-auto"
                                                                              />
                                                                          ) : (
                                                                              <FileTextIcon
                                                                                  height="auto"
                                                                                  width="auto"
                                                                              />
                                                                          )}
                                                                          <span>{tasksub.name}</span>
                                                                      </span>
                                                                  }
                                                              </Menu.Item>
                                                          ))
                                                        : null}
                                                </SubMenu>
                                            ))
                                        ) : (
                                            <Loading />
                                        )}
                                    </Menu>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xl={16} lg={16} xs={24}>
                        <Fragment>
                            <Sections
                                formtype={this.state.tempFormtype}
                                name={this.state.formTypename}
                                loggedUser={this.props.loggedUser}
                                information_directory_form_data={this.props.information_directory_form_data}
                            />
                        </Fragment>
                    </Col>
                </Row>
            </section>
        );
    }
}
const mapStateToProps = createStructuredSelector({
    store_schemeData: store_schemeData(),
    information_directory_form_data_inProgress: information_directory_form_data_inProgress(),
    information_directory_form_data: information_directory_form_data(),
    information_directory_config_inProgress: information_directory_config_inProgress(),
    information_directory_config: information_directory_config(),
    document_config: document_config(),
    document_config_inProgress: document_config_inProgress(),
    report_config: report_config(),
    report_config_inProgress: report_config_inProgress()
});

const mapDispatchToProps = dispatch => ({
    doRequestInformationDirectoryConfig: schemeId => dispatch(doRequestInformationDirectoryConfig(schemeId)),
    doRequestInformationDirectoryFormData: schemeId => dispatch(doRequestInformationDirectoryData(schemeId)),
    doRequestDocumentConfig: payload => dispatch(doRequestDocumentConfig(payload)),
    doResetConfig: () => dispatch(doResetConfig()),
    doRequestReportConfig: payload => dispatch(doRequestReportConfig(payload))
    // doResetFormData: () => dispatch(doResetFormData())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InformationContainer);
