import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import { compose } from 'redux';
import { Table, Select } from 'antd';
import _ from 'lodash';

import FormHeaderComponent from '../../../../../../UILibrary/components/forms/formHeader';
import uiLibConstants from '../../../../../../UILibrary/constants';
import { validateAdmin } from '../../../../../../helpers/validateUser';
import NotificationHelper from '../../../../../../helpers/NotificationHelper';
import constants from '../../../../constants';
import { UserRole } from '../../../../../../constants/userConstants';
import claimHelper from '../../../../../../helpers/claimHelper';
import { DATE_FORMAT } from '../../../../../../config/constants';
import { convertArtifacts } from '../../../../../../UILibrary/helpers/ArtifactConverter';

const { CLIENT, ADMIN } = UserRole;

const {
    BUTTON_TITLE_REQUEST,
    STEP_ACTION_SIGN,
    EXECUTION_STATUS,
    SIGNATORY_STATUS,
    DOC_SIGNED_UPDATE_TYPE,
    EXECUTION_STATUS_ERROR_MESSAGE_ALL_USERS_MUST_SIGN,
    STEP_ACTION_UPDATE,
    ON_SUBMIT_MESSAGE
} = constants;

const { FORM_ACTION_TYPES } = uiLibConstants;

let SignatoryTableExecution = props => {
    const {
        options: {
            title = null,
            titleIicon = null,
            submitButton = true,
            fetchEntityDataAfterSubmit = false,
            navigateAfterSubmit = false,
            onSubmitMessage = ON_SUBMIT_MESSAGE,
            fetchWorkflowAfterSubmit = true
        },
        dataset,
        updateWorkflowStep_inProgress,
        loggedUser,
        step,
        signatoryConfig = [],
        updateWorkflowStepData,
        getLoggedUserClaims_data,
        submitAction = STEP_ACTION_UPDATE,
        signedAction = STEP_ACTION_SIGN,
        artifacts
    } = props;

    const userType = validateAdmin(loggedUser) ? ADMIN : CLIENT;

    const [signatories, setSignatories] = useState({});
    const [submissionType, setSubmissionType] = useState(null);

    useEffect(() => {
        setSignatories(_.get(dataset, 'signatories', {}));
    }, [dataset]);

    const checkSignStatus = () => {
        let signedList = [];
        let result = false;
        let count = 0;
        if (dataset && signatories) {
            signatoryConfig.forEach(
                sig =>
                    signatories &&
                    signatories[sig.doc_name][sig.role].forEach(item => {
                        if (_.has(item, 'trustees')) {
                            item.trustees.forEach(trustee => {
                                count++;
                                if (trustee.status && trustee.status === SIGNATORY_STATUS.SIGNED) {
                                    signedList.push(trustee);
                                }
                            });
                        } else {
                            count++;
                            if (item.status && item.status === SIGNATORY_STATUS.SIGNED) {
                                signedList.push(item);
                            }
                        }
                    })
            );
            if (count === signedList.length) {
                result = true;
            }
            return result;
        }
    };

    useEffect(() => {
        if (signatories && Object.entries(signatories).length !== 0) {
            doUpdateExecutionStatus();
        }
    }, [signatories]);

    useEffect(() => {
        if (dataset && signatories) {
            if (submissionType === submitAction) {
                let message = onSubmitMessage;
                const updateType = DOC_SIGNED_UPDATE_TYPE;
                if (checkSignStatus()) {
                    updateWorkflowStepData(
                        submissionType,
                        { signatories: signatories },
                        () => {
                            handleSubmit(null);
                        },
                        {
                            message,
                            fetchEntityDataAfterSubmit: true,
                            navigateAfterSubmit,
                            fetchWorkflowAfterSubmit
                        },
                        updateType
                    );
                } else {
                    handleSubmit(null);
                    NotificationHelper.getInstance().error(EXECUTION_STATUS_ERROR_MESSAGE_ALL_USERS_MUST_SIGN);
                }
            }
            if (submissionType === signedAction) {
                // let message = onSubmitMessage;
                updateWorkflowStepData(
                    submissionType,
                    { signatories: signatories },
                    () => {
                        handleSubmit(null);
                    },
                    {
                        // message,
                        fetchEntityDataAfterSubmit,
                        navigateAfterSubmit
                    }
                );
            }
        }
    }, [submissionType]);

    const handleSubmit = type => {
        setSubmissionType(type);
    };

    const handleChange = (statusValue, index, doc_name, role) => {
        setSignatories({
            ...signatories,
            [doc_name]: {
                ...signatories[doc_name],
                [role]: signatories[doc_name][role].map(signatory => {
                    if (_.has(signatory, 'trustees')) {
                        return {
                            ...signatory,
                            trustees: signatory.trustees.map(trustee => {
                                if (trustee.userId === index) {
                                    return {
                                        ...trustee,
                                        status: statusValue,
                                        date: statusValue !== SIGNATORY_STATUS.PENDING ? moment() : null
                                    };
                                } else return trustee;
                            })
                        };
                    } else {
                        if (signatory.userId === index) {
                            return {
                                ...signatory,
                                status: statusValue,
                                date: statusValue !== SIGNATORY_STATUS.PENDING ? moment() : null
                            };
                        } else return signatory;
                    }
                })
            }
        });
        handleSubmit(signedAction);
    };

    const doUpdateExecutionStatus = () => {
        signatoryConfig.map(
            sig =>
                signatories &&
                Object.entries(signatories).length !== 0 &&
                _.get(signatories,`[${sig.doc_name}][${sig.role}]`,[]).filter(item => item.status === SIGNATORY_STATUS.SIGNED)
        );
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: ({ status }) => {
                return (
                    <div>
                        <span className={`dot ${EXECUTION_STATUS[status]['className']}`}></span>
                        {EXECUTION_STATUS[status]['key']}
                    </div>
                );
            }
        }
    ];

    if (userType === ADMIN)
        columns.push({
            title: 'Manual status change',
            dataIndex: 'status',
            key: 'mc_status',
            render: ({ index, status, doc_name, role }) => {
                return (
                    <div>
                        <Select
                            defaultValue={SIGNATORY_STATUS.PENDING}
                            disabled={step.completed}
                            value={status}
                            onChange={statusValue => {
                                handleChange(statusValue, index, doc_name, role);
                            }}
                            className="client-table-Manage-status"
                        >
                            <Select.Option value={SIGNATORY_STATUS.PENDING}>
                                <span className={`dot ${EXECUTION_STATUS.P.className}`}></span>
                                {EXECUTION_STATUS.P.key}
                            </Select.Option>
                            <Select.Option value={SIGNATORY_STATUS.SIGNED}>
                                <span className={`dot ${EXECUTION_STATUS.S.className}`}></span>
                                {EXECUTION_STATUS.S.key}
                            </Select.Option>
                        </Select>
                    </div>
                );
            }
        });

    const DataSource = (doc_name, role) => {
        const data = [];

        _.get(signatories, `${doc_name}.${role}`, []).forEach((signatory, index) => {
            if (_.has(signatory, 'trustees')) {
                _.get(signatory, 'trustees').forEach((trustee, index) => {
                    data.push({
                        key: trustee.userId,
                        name: trustee.userName ? trustee.userName : `${trustee.firstName} ${trustee.lastName}`,
                        date:
                            trustee.status === SIGNATORY_STATUS.SIGNED
                                ? moment(trustee.date).format(DATE_FORMAT)
                                : '--',
                        status: {
                            index: trustee.userId,
                            status: trustee.status ? trustee.status : SIGNATORY_STATUS.PENDING,
                            doc_name: doc_name,
                            role: role
                        }
                    });
                });
            } else {
                data.push({
                    key: signatory.userId,
                    name: signatory.userName ? signatory.userName : `${signatory.firstName} ${signatory.lastName}`,
                    date:
                        signatory.status === SIGNATORY_STATUS.SIGNED
                            ? moment(signatory.date).format(DATE_FORMAT)
                            : '--',
                    status: {
                        index: signatory.userId,
                        status: signatory.status ? signatory.status : SIGNATORY_STATUS.PENDING,
                        doc_name: doc_name,
                        role: role
                    }
                });
            }
        });

        return data;
    };

    const checkLoggedUser = () => {
        return userType && userType === ADMIN ? true : false;
    };


    const formHeaderProps = {
        title: title,
        iIconText: titleIicon,
        actions: [
            ...(submitButton
                ? [
                      {
                          type: FORM_ACTION_TYPES.SUBMIT,
                          title: submitButton.title || BUTTON_TITLE_REQUEST,
                          state: {
                              inProgress: submissionType === STEP_ACTION_UPDATE && updateWorkflowStep_inProgress
                          },
                          onClick: () => {
                              handleSubmit(submitAction);
                          },
                          bool:
                              !step.completed &&
                              !step.rejected &&
                              checkLoggedUser() &&
                              claimHelper.getPermission(getLoggedUserClaims_data, step, STEP_ACTION_UPDATE),
                          disabled: _.get(submitButton, 'disabled', false)
                      }
                  ]
                : [])
        ],
        artifacts: artifacts
    };

    return (
        <>
            <FormHeaderComponent {...formHeaderProps} />

            {signatories && Object.entries(signatories).length ? (
                <div className="iaa-execution-status-container">
                    {userType === ADMIN
                        ? signatoryConfig.map(signatoryTable => (
                              <div className="status-table">
                                  <div className="client-table">
                                      <p className="title">
                                          {convertArtifacts(signatoryTable['title_' + ADMIN], artifacts)}
                                      </p>
                                      <Table
                                          dataSource={DataSource(signatoryTable.doc_name, signatoryTable.role)}
                                          columns={columns}
                                          pagination={false}
                                      ></Table>
                                  </div>
                              </div>
                          ))
                        : signatoryConfig
                              .filter(signatoryTable => signatoryTable.role === CLIENT)
                              .map(signatoryTable => (
                                  <div className="status-table">
                                      <div className="client-table">
                                          <p className="title">
                                              {convertArtifacts(signatoryTable['title_' + CLIENT], artifacts)}
                                          </p>
                                          <Table
                                              dataSource={DataSource(signatoryTable.doc_name, CLIENT)}
                                              columns={columns}
                                              pagination={false}
                                          ></Table>
                                      </div>
                                  </div>
                              ))}
                </div>
            ) : null}
        </>
    );
};

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = dispatch => ({
    submitSimpleForm: formName => {
        dispatch(submit(formName));
    }
});
export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(SignatoryTableExecution);
