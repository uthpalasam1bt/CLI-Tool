import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initialize } from 'redux-form';
// import { history } from 'store';

import { getSchemesListByUser, getTasks } from 'containers/notification/tasks/actions';
import { getVisibleTaskList } from 'containers/notification/tasks/reducers';

import CreateTaskModal from 'components/modals/CreateTaskModal';
import Loading from 'components/Loading';

import { Spin } from 'antd';

const pad = n => {
    return n < 10 ? '0' + n : n;
};

const TaskNavigator = ({ loggedUser, getTaskManagerCount, loading, history }) => {
    const { email: userEmail, organizationId } = loggedUser;
    const dispatch = useDispatch();
    const [isShowCreateTask, visibleCreateTask] = useState(false);

    const tasksList = useSelector(state => getVisibleTaskList(state.tasksReducer));
    const taskListLoading = useSelector(state => state.tasksReducer.taskListLoading);

    const closeTaskForm = () => {
        dispatch(initialize('createTaskForm'));
        visibleCreateTask(false);
    };

    useEffect(() => {
        console.log('organizationId', organizationId);
        dispatch(getSchemesListByUser({ organizationId }));
        dispatch(getTasks({ userEmail, unmarked: true }));
    }, [dispatch, userEmail, loggedUser, organizationId]);

    const navigateToTasks = () => {
        history.push('/tasks');
    };

    return (
        <>
            <div className="task-card">
                <span className="title">Your Tasks</span>
                <span className="count" onClick={() => navigateToTasks()}>
                    {loading ? <Spin /> : pad(getTaskManagerCount)}
                </span>
            </div>
            <div className="card custom-height">
                <div className="card-header">
                    <div className="heading-row">
                        <div className="pull-left div-left">
                            <h4 className="title">Collaborate</h4>
                        </div>
                        <div className="pull-right text-right div-right">
                            <div className="header-content">
                                <button onClick={() => visibleCreateTask(true)} className="btn-create btn-green">
                                    {' '}
                                    <i className="fa fa-plus fa-icon" />
                                    Message{' '}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-body task-content">
                    <div className="task-list">
                        {taskListLoading ? (
                            <Loading />
                        ) : (
                            tasksList.map(task => {
                                return (
                                    <div key={task.taskId} className="task-item  clearfix">
                                        <div className="left-wrap">
                                            <span className="icon">
                                                {' '}
                                                <i className="fa fa-file-text-o"></i>
                                            </span>
                                            <span className="font-weight-bold"> {task.senderName || 'Unknown'} </span>
                                            <br />
                                            <span className="task ml-4">{task.title}</span>
                                        </div>
                                        <span className="link" onClick={() => history.push('/notification/tasks')}>
                                            View
                                        </span>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
                <CreateTaskModal
                    userEmail={userEmail}
                    close={() => closeTaskForm()}
                    show={isShowCreateTask}
                    loggedUser={loggedUser}
                />
            </div>
        </>
    );
};

export default TaskNavigator;
