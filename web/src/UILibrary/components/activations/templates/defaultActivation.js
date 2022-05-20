import React, { useState } from 'react';
import _ from 'lodash';
import FormHeaderComponent from '../../forms/formHeader';
import constants from '../../../constants';
import { convertArtifacts } from '../../../helpers/ArtifactConverter';

const { ACTIVE_MANDATE_ACTION, BUTTON_TITLE_REQUEST, FORM_ACTION_TYPES, ON_SUBMIT_MESSAGE } = constants;

let DefaultActivation = props => {
    const {
        text,
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
                          type: FORM_ACTION_TYPES.SUBMIT,
                          title: submitButton.title || BUTTON_TITLE_REQUEST,
                          state: {
                              inProgress: submissionType === ACTIVE_MANDATE_ACTION && action_inProgress
                          },
                          onClick: () => {
                              handleSubmit(ACTIVE_MANDATE_ACTION);
                          },
                          bool: submitButton.showButton,
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
            <div className="root-form-wrapper">
                <div className="card card-wrapper text-center">
                    <div className="alert info-alert w-50">
                        <i class="fa fa-info-circle icon"></i>
                        <span className="alert-message">{convertArtifacts(text, artifacts)}</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DefaultActivation;
