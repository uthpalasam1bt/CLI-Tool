import React, { Component } from 'react';
import { Row, Table, Spin, Button, Input } from 'antd';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getTasks } from './actions/taskManagerActions';
import { getTaskManagerTasks, getTaskManagerTasks_InProgress } from './selectors/taskManagerSelectors';
import moment from 'moment';
import { SearchOutlined } from '@ant-design/icons';
import _ from 'lodash';
// const dataSource = [
//   {
//     key: '1',
//     userGroup: 'Mike',
//     scheme: 'scheme',
//     workflow: 'full strategy review',
//     step: 'Generate documents',
//     open: '16/5/2020',
//     assignee: 'Mdwe'
//   },
//   {
//     key: '2',
//     userGroup: 'Mike',
//     scheme: 'scheme',
//     workflow: 'full strategy review',
//     step: 'Generate documents',
//     open: '16/5/2020',
//     assignee: '-'
//   }
// ];

class TaskContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            filteredInfo: null
        };
    }

    componentDidMount() {
        this.props.getTasks();
    }

    mapTasksToTableData = () => {
        const { tasks } = this.props;
        let mappedTasks = (tasks['tasks'] || []).map(task => ({
            userGroup: task.userName || task.groupName,
            scheme: task.schemeName,
            workflow: task.workflowTitle,
            step: task.stepTitle,
            openSince: moment(task.StartedAt).format('MM/DD/YYYY'),
            assignee: _.get(task, 'assignee.name') || 'Not assigned',
            schemeId: task.entityId,
            workflowName: task.workflowTitle,
            workflowType: task.workflowType ? task.workflowType : task.workflowId === 'Reporting' ? 'Reporting' : ['cngfmfees', 'distntc', 'updiaafma'].includes(task.workflowId) ? 'multiclient' : 'activeworkflow',
            workflowId: task.workflowId
        }));

        return mappedTasks;
    };

    refreshData = () => {
        this.props.getTasks();
        this.setState({ filteredInfo: null });
    };

    navigateToScheme = (schemeId, workflowType, schemeName, workflowId) => {
        if (['registration', 'activeworkflow'].includes(workflowType.toLowerCase())) {
            this.props.history.push(`/scheme/options/active-workflow/${schemeId}/${schemeName}`);
        } else if (workflowType.toLowerCase() === 'multiclient') {
            this.props.history.push(`/multi-client?workflow=${workflowId}`);
        } else if (workflowType.toLowerCase() === 'reporting') {
            this.props.history.push(`/reports`);
        }
    };

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />

                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
                </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reset
                </Button>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex]
                      .toString()
                      .toLowerCase()
                      .includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select(), 100);
            }
        }
    });

    handleSearch = (selectedKeys, confirmFunc, dataIndex) => {
        confirmFunc();
        this.setState({
            searchText: selectedKeys[0]
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    getFilters = () => (this.props.tasks['filters'] || []).map(filter => ({ text: filter, value: filter }));

    onChange = (...[, filters, , action]) => {
        this.props.getTasks(filters.userGroup);
        this.setState({
            filteredInfo: filters
        });
    };

    render() {
        let { filteredInfo } = this.state;
        filteredInfo = filteredInfo || {};
        let columnsMap = [
            {
                title: 'User/User Group',
                key: 'userGroup',
                dataIndex: 'userGroup',
                width: 200,
                filters: this.getFilters(),
                filteredValue: filteredInfo.userGroup || null
            },
            {
                title: 'Scheme',
                key: 'scheme',
                dataIndex: 'scheme',
                width: 200,
                //sorter: (a, b) => a.age - b.age,
                render: (schemeName, record) => (
                    <span
                        className="text-link"
                        onClick={() =>
                            this.navigateToScheme(record.schemeId, record.workflowType, schemeName, record.workflowId)
                        }
                    >
                        <span>{schemeName}</span>
                    </span>
                ),
                ...this.getColumnSearchProps('scheme')
            },
            {
                title: 'Workflow',
                key: 'workflow',
                dataIndex: 'workflow',
                width: 200,
                sorter: (a, b) => a.workflow.localeCompare(b.workflow),
                render: (workflow, record) => (
                    <span
                        className="text-link"
                        onClick={() =>
                            this.navigateToScheme(
                                record.schemeId,
                                record.workflowType,
                                record.scheme,
                                record.workflowId
                            )
                        }
                    >
                        <span>{workflow}</span>
                    </span>
                )
            },
            {
                title: 'Step',
                key: 'step',
                dataIndex: 'step',
                width: 200,
                sorter: (a, b) => a.step.localeCompare(b.step)
            },
            {
                title: 'Open since',
                key: 'openSince',
                dataIndex: 'openSince',
                sorter: (a, b) => moment(a.openSince).diff(moment(b.openSince))
            },
            {
                title: 'Assignee',
                key: 'assignee',
                dataIndex: 'assignee',
                width: 200,
                sorter: (a, b) => a.assignee.localeCompare(b.assignee)
            }
        ];

        const { fetchTasksInProgress } = this.props;
        let dataSource = this.mapTasksToTableData();
        return (
            <>
                <div className="scheme">
                    <div className="scheme-wrap">
                        <div className="container">
                            <div className="active-wrap">
                                <div className="title-wrap task-title-wrap">
                                    <p className="title">Tasks</p>
                                    <div className="wrap-right">
                                        <button
                                            className="btn btn-green btn-refresh button-scheme"
                                            onClick={this.refreshData}
                                        >
                                            Refresh
                                        </button>
                                    </div>
                                </div>
                                {fetchTasksInProgress && (
                                    <div className="text-center">
                                        <Spin />
                                    </div>
                                )}
                                <Row className="content-wrap">
                                    <Table
                                        pagination={false}
                                        columns={columnsMap}
                                        dataSource={dataSource}
                                        className="task-table"
                                        onChange={this.onChange}
                                    />
                                </Row>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    //activeWorkflows: activeWorkflows_data()
    tasks: getTaskManagerTasks(),
    fetchTasksInProgress: getTaskManagerTasks_InProgress()
});

const mapDispatchToProps = dispatch => ({
    getTasks: filterGroups => dispatch(getTasks(filterGroups))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskContainer);
