import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { submit } from 'redux-form';
import FormHeaderComponent from '../../../../../../UILibrary/components/forms/formHeader';
import uiLibConstants from '../../../../../../UILibrary/constants';
import { getSchemes } from '../../../../../scheme/actions/schemeActions';
import { getSchemes_inProgress, getSchemes_data } from '../../../../../scheme/selectors/schemeSelectors';
import SchemeTable from './components/schemeTable';
import constants from '../../../../constants';
import NotificationHelper from '../../../../../../helpers/NotificationHelper';
import ClaimHelper from '../../../../../../helpers/claimHelper';

const { ON_PUBLISH_MESSAGE, STEP_ACTION_PUBLISH, NO_SCHEMES_SELECTED } = constants;
const { FORM_ACTION_TYPES } = uiLibConstants;

const SchemePublish = props => {
    const {
        options: {
            title = null,
            titleIicon = null,
            onSubmitMessage = ON_PUBLISH_MESSAGE,
            fetchEntityDataAfterSubmit = null,
            navigateAfterSubmit = null,
            fetchWorkflowAfterSubmit = true
        },
        artifacts,
        updateWorkflowStepData,
        updateWorkflowStep_inProgress,
        step,
        getLoggedUserClaims_data
    } = props;

    const dispatch = useDispatch();

    // const inProgressSchemes_data = (useSelector(getSchemes_data()) || {}).inProgressSchemes || [];
    const activeSchemes_data = (useSelector(getSchemes_data()) || {}).activeSchemes || [];
    const fetchingSchemes = useSelector(getSchemes_inProgress());

    let [selectedSchemeIds, setSelectedSchemeIds] = useState([]);

    useEffect(() => {
        dispatch(getSchemes());
    }, []);

    const onSchemesSelected = schemesIds => {
        setSelectedSchemeIds(schemesIds);
    };

    const publish = submissionType => {
        const message = onSubmitMessage;

        if (!selectedSchemeIds.length) {
            return NotificationHelper.getInstance().error(NO_SCHEMES_SELECTED);
        }

        updateWorkflowStepData(submissionType, { selectedSchemeIds: selectedSchemeIds }, () => {}, {
            message,
            fetchEntityDataAfterSubmit,
            navigateAfterSubmit,
            fetchWorkflowAfterSubmit
        });
    };

    const formHeaderProps = {
        title: title,
        iIconText: titleIicon,
        actions: [
            {
                type: FORM_ACTION_TYPES.PUBLISH,
                state: { inProgress: updateWorkflowStep_inProgress },
                onClick: () => {
                    publish(STEP_ACTION_PUBLISH);
                },
                bool:
                    !step.completed &&
                    !step.rejected &&
                    ClaimHelper.getPermission(getLoggedUserClaims_data, step, STEP_ACTION_PUBLISH)
            }
        ],
        artifacts: artifacts
    };

    return (
        <>
            <FormHeaderComponent {...formHeaderProps} />
            <div className="root-form-wrapper">
                <div className="card card-wrapper publish-scheme-wrap">
                    <SchemeTable
                        fetchingSchemes={fetchingSchemes}
                        activeSchemes_data={activeSchemes_data.sort((a, b) =>
                            a.schemeName.toLowerCase() > b.schemeName.toLowerCase() ? 1 : -1
                        )}
                        onSchemesSelected={onSchemesSelected}
                    />
                </div>
            </div>
        </>
    );
};

const mapDispatchToProps = dispatch => ({
    submitForm: formName => {
        dispatch(submit(formName));
    }
});

export default connect(
    null,
    mapDispatchToProps
)(SchemePublish);
