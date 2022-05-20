export const TABS = {
    GENERATE_REPORTS: { TAB_KEY: 'generate-reports', TAB_NAME: 'Generate', TITLE: 'Generate', BUTTON_NAME: 'Generate' },
    UPLOAD: { TAB_KEY: 'upload', TAB_NAME: 'Upload', TITLE: 'Upload', BUTTON_NAME: 'Proceed' },
    SELECT_FOR_APPROVAL: {
        TAB_KEY: 'selectForApproval',
        TAB_NAME: 'Select for Approval',
        TITLE: 'Select for Approval',
        BUTTON_NAME: 'Continue'
    },
    PENDING_APPROVAL: {
        TAB_KEY: 'pendingApproval',
        TAB_NAME: 'Pending Approval',
        TITLE: 'Pending Approval',
        BUTTON_NAME: 'Notify Assignees'
    },
    PENDING_PUBLISHING: {
        TAB_KEY: 'pendingPublish',
        TAB_NAME: 'Pending Publishing',
        TITLE: 'Pending Publishing',
        BUTTON_NAME: 'Publish'
    },
    PUBLISHED: { TAB_KEY: 'publish', TAB_NAME: 'Published', TITLE: 'Published' }
};

export const DISPLAY_TYPES = {
    QuarterUI: 'QuarterUI',
    DateRange: 'DateRange'
};

export const COMMENT_DATE_TIME_FORMAT = 'MM-DD-YYYY hh:mm:ss';

export const COMMENT_FORM = 'COMMENT_FORM';

export const StepAction_Success_Msgs = {
    UPLOAD: 'Selected report(s) available for approval in ‘Select For Approval’ tab.',
    SELECT_FOR_APPROVAL: 'Selected report(s) available for approval in ‘Pending Approval’ tab.',
    PENDING_APPROVAL: 'Assignee(s) notified.',
    PENDING_PUBLISHING: 'Selected reports published successfully.'
};
