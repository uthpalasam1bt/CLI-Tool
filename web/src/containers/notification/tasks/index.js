import React, { useState, useEffect } from 'react';
import { Checkbox, Input, Modal, Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash/debounce';
import { initialize } from 'redux-form';

import ActionBar from '../components/ActionBar';
import MessageItem from '../components/MessageItem';

import CreateTaskModal from 'components/modals/CreateTaskModal';
import Loading from 'components/Loading';

import { getTasks, getSchemesListByUser, markAsRead, deleteTasks } from './actions';

import { getVisibleTaskList } from './reducers';

import { validateGovernUser } from 'helpers/validateUser';
import { UserRole } from '../../../constants/userConstants';

const { GOVERN_USER, CLIENT } = UserRole;

const Search = Input.Search;
const { confirm } = Modal;

const Tasks = props => {
    const {
        loggedUser: { email }
    } = props;

    const dispatch = useDispatch();
    const [query, setQuery] = useState('');
    const [isShowCreateTask, visibleCreateTask] = useState(false);
    const [selectedTasks, setSelectedTasks] = useState([]);
    const [selectAllStatus, setselectAllStatus] = useState(false);

    const tasksList = useSelector(state => getVisibleTaskList(state.tasksReducer));
    const tasksListIds = useSelector(state => state.tasksReducer.visibleTaskIds);
    const tasksListById = useSelector(state => state.tasksReducer.taskById);
    const taskListLoading = useSelector(state => state.tasksReducer.taskListLoading);

    useEffect(() => {
        let type = validateGovernUser(props.loggedUser) ? GOVERN_USER : CLIENT;
        dispatch(getTasks({ userEmail: email }));
        dispatch(getSchemesListByUser({ userEmail: email, type }));
    }, [dispatch, email, props.loggedUser]);

    const searchTasks = value => {
        dispatch(getTasks({ userEmail: email, query: value }));
    };

    const debounceSearch = debounce(searchTasks, 500);
    const onSearchChange = value => {
        setQuery(value.target.value);
        debounceSearch(value.target.value);
    };

    const closeTaskForm = () => {
        dispatch(initialize('createTaskForm'));
        visibleCreateTask(false);
    };

    const handleSelectAll = e => {
        if (e.target.checked) {
            setSelectedTasks([...tasksListIds]);
        } else {
            setSelectedTasks([]);
        }
        setselectAllStatus(e.target.checked);
    };

    const resetCheckedBoxes = () => {
        setSelectedTasks([]);
        setselectAllStatus(false);
    };

    const handleTaskSelection = (id, status) => {
        if (status) {
            const tasksIdList = [...selectedTasks, id];
            setSelectedTasks(tasksIdList);
            let selectAllSt = tasksIdList.length === tasksListIds.length;
            setselectAllStatus(selectAllSt);
        } else {
            setselectAllStatus(false);
            setSelectedTasks(selectedTasks.filter(item => item !== id));
        }
    };

    const handleMarkAsRead = (id = null) => {
        if (id === null && selectedTasks.length > 0) {
            dispatch(markAsRead(selectedTasks, resetCheckedBoxes));
        } else {
            dispatch(markAsRead([id], resetCheckedBoxes));
        }
    };

    const canTaskListMarkAsRead = () => {
        for (let taskId of selectedTasks) {
            if (!tasksListById[taskId].markAsRead) {
                return true;
            }
        }
        return false;
    };

    const handleDeleteTask = (id = null) => {
        Modal.confirm({
            title: 'Do you want to delete these message(s)?',
            okType: 'danger',
            okText: 'Yes',
            cancelText: 'No',
            onOk() {
                if (id === null && selectedTasks.length > 0) {
                    dispatch(deleteTasks(selectedTasks, resetCheckedBoxes));
                } else {
                    dispatch(deleteTasks([id], resetCheckedBoxes));
                }
            },
            onCancel() {}
        });
    };

    const ActionBarItems = [
        {
            key: 'selectAll',
            onRender: key => (
                <Tooltip title="Select all">
                    <Checkbox checked={selectAllStatus} onChange={handleSelectAll} key={key}></Checkbox>
                </Tooltip>
            )
        },
        {
            key: 'refresh',
            name: 'Refresh',
            icon: 'repeat',
            show: true,
            prompt: 'Refresh',
            onClick: () => {
                dispatch(getTasks({ userEmail: email }));
                resetCheckedBoxes();
                setQuery('');
            }
        },
        {
            key: 'trash',
            name: 'Trash',
            icon: 'trash',
            prompt: 'Delete',
            show: selectedTasks.length > 0,
            onClick: () => {
                handleDeleteTask();
            }
        },
        {
            key: 'mark_as_read',
            name: 'Mark As Read',
            icon: 'check',
            prompt: 'Mark as read',
            show: canTaskListMarkAsRead(),
            onClick: () => {
                handleMarkAsRead();
                resetCheckedBoxes();
            }
        },
        {
            key: 'search',
            onRender: key => (
                <Search onChange={onSearchChange} key={key} placeholder="search" style={{ width: 200 }} value={query} />
            )
        },
        {
            key: 'button',
            type: 'button',
            onRender: key => (
                <button key={key} className="btn-green btn-task" onClick={() => visibleCreateTask(true)}>
                    <i className="fa fa-plus icon"></i>Message
                </button>
            )
        }
    ];

    return (
        <>
            <div className="notification-wrap tasks-details">
                <div className="card card-wrapper">
                    <ActionBar items={ActionBarItems} />
                    <div className="content">
                        {taskListLoading ? (
                            <Loading />
                        ) : (
                            tasksList.map(task => {
                                return (
                                    <MessageItem
                                        handleMarkAsRead={handleMarkAsRead}
                                        handleDeleteTask={handleDeleteTask}
                                        selected={selectedTasks.indexOf(task.taskId) > -1}
                                        handleTaskSelection={handleTaskSelection}
                                        key={task.taskId}
                                        item={task}
                                    />
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
            <CreateTaskModal
                userEmail={email}
                close={() => closeTaskForm()}
                show={isShowCreateTask}
                loggedUser={props.loggedUser}
            />
        </>
    );
};

export default Tasks;
