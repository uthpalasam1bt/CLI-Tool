import React, { useState } from 'react';
import { Table } from 'antd';
import FormHeaderComponent from '../../forms/formHeader';
import constants from '../../../constants';
import { FORM_FIELDS } from '../../../../containers/schemeOptions/updates/schName/actMendt/constants';

const { ACTIVE_MANDATE_ACTION, BUTTON_TITLE_REQUEST, FORM_ACTION_TYPES, ON_SUBMIT_MESSAGE } = constants;

let TableActivation = props => {
    const {
        action_inProgress,
        handleFormSubmit,
        artifacts,

        options: { title = null, titleIicon = null, submitButton = true, onSubmitMessage = ON_SUBMIT_MESSAGE }
    } = props;

    const [submissionType, setSubmissionType] = useState(null);

    const handleSubmit = action => {
        let message = onSubmitMessage;
        setSubmissionType(action);
        handleFormSubmit(
            action,
            {},
            () => {
                setSubmissionType(null);
            },
            message,
            true
        );
    };

    const formHeaderProps = {
        title: title,
        iIconText: titleIicon,
        actions: [
            ...(submitButton
                ? [
                      {
                          type: FORM_ACTION_TYPES.ACTIVATE,
                          title: submitButton.title || BUTTON_TITLE_REQUEST,
                          state: {
                              inProgress: submissionType === ACTIVE_MANDATE_ACTION && action_inProgress
                          },
                          onClick: () => {
                              handleSubmit(ACTIVE_MANDATE_ACTION);
                          },
                          bool: submitButton.showbutton,
                          disabled: _.get(submitButton, 'disabled', false)
                      }
                  ]
                : [])
        ],
        artifacts: artifacts
    };

    let colums = [
        {
            title: 'Responded by',
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
            render: status => (
                <div>
                    <span className={`dot ${status === 'no' ? 'orange' : 'green'}-dot`}></span>
                    {status === 'no' ? 'Pending' : 'Yes'}
                </div>
            )
        }
    ];

    let dataSource = [
        {
            key: 1,
            name: props.dataset[FORM_FIELDS.RESPONDED_BY] || 'not responded yet',
            date: props.dataset[FORM_FIELDS.DATE] || '-',
            status: props.dataset[FORM_FIELDS.HAS_SBEEN_CONSULATED] || 'no'
        }
    ];

    return (
        <>
            <FormHeaderComponent {...formHeaderProps} />
            <div className="root-form-wrapper">
                <div className="card card-wrapper">
                    <div className="sponser-wrapper">
                        <span className="active-heading font-weight-bold">Sponsor consultation status</span>

                        <Table dataSource={dataSource} columns={colums} pagination={false} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default TableActivation;
