import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector, Field, change } from 'redux-form';
import { required, length } from 'redux-form-validators';
import { Row, Col } from 'antd';
import { ButtonGroup, InputField, TextArea, SelectOptions } from '../../../../UILibrary/components/forms/fields';
import { validateGovernUser } from '../../../../helpers/validateUser';
import { getSchemeUserList, getLGIMUserList, restAssigneeList, createTask } from '../actions';

const userType = [{ title: 'Scheme user', value: 'user' }, { title: 'LGIM', value: 'lgim' }];
//TODO : NEED TO CHANGE USER TYPE
class CreateTaskForm extends Component {
    handleSchemIdChange = (e, newValue) => {
        this.props.getSchemeUserList({
            schemeId: newValue
        });
        let schemeName = this.props.schemeOptionList.find(scheme => scheme.key === newValue).value;
        this.props.change('schemeName', schemeName);
        this.props.restAssigneeList();
        this.props.changeField('createTaskForm', 'schemeId', '');
        this.props.changeField('createTaskForm', 'assignee', '');
    };

    handleUserTypeChange = (e, newValue) => {
        if (newValue === 'lgim') {
            this.props.getLGIMUserList();
        } else {
            this.props.restAssigneeList();
            this.props.changeField('createTaskForm', 'schemeId', '');
        }
        this.props.changeField('createTaskForm', 'assignee', '');
    };

    handleSubmit = formData => {
        const { userEmail, close } = this.props;
        this.props.createTask({ ...formData, userEmail }, close);
    };

    changeAssignee = (e, newValue) => {
        let assigneeName = this.props.assigneeList.find(user => user.key === newValue).value;
        this.props.change('assigneeName', assigneeName);
    };

    render() {
        const {
            assignTo,
            schemeOptionList,
            assigneeList,
            handleSubmit,
            close,
            taskCreateLoading,
            selectedSchemeId,
            loggedUser
        } = this.props;

        const schemeOptions = {
            defaultValue: 'Select a scheme',
            dataList: schemeOptionList
        };

        const assigneeOptions = {
            defaultValue: 'Select a user',
            dataList: assigneeList
        };

        const selectUserType = () => {
            if ((loggedUser && !validateGovernUser(loggedUser) && assignTo === undefined) || assignTo === 'user') {
                return true;
            }
        };

        return (
            <form className="form-body" onSubmit={handleSubmit(this.handleSubmit)}>
                {loggedUser && validateGovernUser(loggedUser) ? (
                    <Row className="content-row mt-20">
                        <Col lg={7} xs={24}>
                            <span className="input-title">Assign to</span>
                        </Col>
                        <Col className="input-wrapper" lg={17} xs={24}>
                            <Field
                                name="type"
                                className="form-control input-field"
                                component={ButtonGroup}
                                options={userType}
                                onChange={this.handleUserTypeChange}
                                validate={[required({ message: 'Required' })]}
                            />
                        </Col>
                    </Row>
                ) : null}

                <Row className={`content-row ${loggedUser && validateGovernUser(loggedUser) ? "" : "mt-20"}`} >
                    <Col lg={7} xs={24}>
                        <span className="input-title">Subject</span>
                    </Col>
                    <Col lg={17} xs={24}>
                        <div className="field-wrapper margin-wrap">
                            <Field
                                name="title"
                                className="form-control input-field"
                                component={InputField}
                                maxLength={100}
                                validate={[required({ message: 'Required' }), length({ in: [2, 100] })]}
                                placeholder="Subject"
                            />
                        </div>
                    </Col>
                </Row>
                <Row className="content-row">
                    <Col lg={7} xs={24}>
                        <span className="input-title">Message</span>
                    </Col>
                    <Col lg={17} xs={24}>
                        <div className="field-wrapper margin-wrap">
                            <Field
                                name="description"
                                className="form-control input-field text-area"
                                component={TextArea}
                                rows={5}
                                maxLength={180}
                                validate={[required({ message: 'Required' }), length({ in: [0, 180] })]}
                                placeholder="Message"
                            />
                        </div>
                    </Col>
                </Row>
                {selectUserType() && (
                    <Row className="content-row">
                        <Col lg={7} xs={24}>
                            <span className="input-title">Scheme name</span>
                        </Col>
                        <Col lg={17} xs={24}>
                            <div className="field-wrapper margin-wrap">
                                <Field
                                    showSearch={true}
                                    name="schemeId"
                                    className="form-control"
                                    component={SelectOptions}
                                    validate={required({ message: 'Required' })}
                                    onChange={this.handleSchemIdChange}
                                    options={schemeOptions}
                                />
                            </div>
                        </Col>
                    </Row>
                )}
                <Row className="content-row">
                    <Col lg={7} xs={24}>
                        <span className="input-title">Assignee</span>
                    </Col>
                    <Col lg={17} xs={24}>
                        <div className="field-wrapper margin-wrap">
                            <Field
                                showSearch={true}
                                name="assignee"
                                className="form-control"
                                component={SelectOptions}
                                validate={required({ message: 'Required' })}
                                options={assigneeOptions}
                                disabled={!selectedSchemeId && assignTo !== 'lgim'}
                                onChange={this.changeAssignee}
                            />
                        </div>
                    </Col>
                </Row>

                <div className="footer clearfix">
                    <button type="button" onClick={() => close()} className="btn-grey-o btn-close regular btn-footer">
                        Close
                    </button>
                    <button type="submit" disabled={taskCreateLoading} className="tpip-btn-blue btn-create regular btn-footer">
                        Send
                        {taskCreateLoading && (
                            <>
                                {' '}
                                <i className="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
                            </>
                        )}
                    </button>
                </div>
            </form>
        );
    }
}

CreateTaskForm = reduxForm({
    form: 'createTaskForm'
})(CreateTaskForm);

const selector = formValueSelector('createTaskForm');

const mapStateToProps = state => {
    const assignTo = selector(state, 'type');
    const selectedSchemeId = selector(state, 'schemeId');

    return {
        assignTo,
        selectedSchemeId,
        schemeOptionList: state.tasksReducer.schemeOptionList,
        assigneeList: state.tasksReducer.assigneeList,
        taskCreateLoading: state.tasksReducer.taskCreateLoading
    };
};

CreateTaskForm = connect(
    mapStateToProps,
    { getSchemeUserList, getLGIMUserList, restAssigneeList, changeField: change, createTask }
)(CreateTaskForm);

export default CreateTaskForm;
