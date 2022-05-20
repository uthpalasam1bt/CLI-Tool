/**
 * WORKFLOW STEP GENERATOR TYPES
 *
 * if you need to create a new view of steps, you can create a new generator for it
 */

const GENERATE_WORKFLOW_STEPS_TYPE_SINGLE = 'GENERATE_WORKFLOW_STEPS_TYPE_SINGLE';
const GENERATE_WORKFLOW_STEPS_TYPE_MULTIPLE_WORKFLOWS = 'GENERATE_WORKFLOW_STEPS_TYPE_MULTIPLE_WORKFLOWS';

/**
 * ASSIGNEE CLAIMS
 */
const ASSIGNEE_CLAIM_TO_BE_ASSIGNEE = 'toBeAssignee';
const ASSIGNEE_CLAIM_CHANGE_ASSIGNEE = 'changeAssignUser';
const ASSIGNEE_CLAIM_VIEW_ASSIGNEE = 'viewAssignUser';

/**
 * STEP ACTIONS
 *
 */
const STEP_ACTION_DATA_SAVE = 'SA_DC';
const STEP_ACTION_ASSIGN = 'SA_A';
const STEP_ACTION_UPDATE_WORKFLOW = 'SA_UW';
const STEP_ACTION_SIGN = 'SA_DOC_SIGN';
const STEP_ACTION_COMMENT = 'SA_COMMENT';
const STEP_ACTION_DOWNLOAD = 'SA_DWN';
const STEP_ACTION_PROCEED_WORKFLOW = 'SA_PW';
const STEP_ACTION_ACTIVATE = 'SA_ACTIVE_MANDATE';
const STEP_ACTION_DATA_CHANGE = 'SA_DATA_CHANGE';
const STEP_ACTION_DOC_UPLOAD = 'SA_DOC_UPLOAD';
const STEP_ACTION_PROCEED = 'SA_PROCEED';
const STEP_ACTION_PUBLISH = 'SA_PUBLISH_DOCUMENT';
const STEP_ACTION_PUBLISH_MULTICLIENT = 'SA_PUBLISH_DOCUMENT_MULTI_CLIENT';
const STEP_ACTION_UPLOD_PUBLISH = 'SA_UPLOAD_PUBLISH';
const STEP_ACTION_UPDATE = 'SA_UPDATE';
const STEP_ACTION_AUTHORIZE = 'SA_AUTHORIZE';
const STEP_ACTION_AUTHORIZE_MULTICLIENT = 'SA_AUTHORIZE_MULTICLIENT';
const STEP_ACTION_PUBLISH_MANDATE = 'SA_PUBLISH_MANDATE';
const STEP_ACTION_TERMINATE_MANDATE = 'SA_TERMINATE_MANDATE';
const STEP_ACTION_ASSIGNEE = 'SA_ASSIGNEE';
const STEP_ACTION_AUTHORIZE_MANDATE = 'SA_AUTHORIZE_MANDATE';

/**
 * ABORT ACTIONS
 */

const ABORT_WORKFLOW_ACTION = 'ABORT_WORKFLOW_ACTION';

/**
 * STEP UPDATE TYPES
 */

const STEP_UPDATE_TYPE_UPLOAD = 'UPLOAD';
const STEP_UPDATE_TYPE_ACTIVE = 'ACTIVATE';

/**
 * USER ACTIONS
 */

const USER_ACTION_PENDING = 'PENDING';
const USER_ACTION_APPROVED = 'APPROVED';
const USER_ACTION_REJECTED = 'REJECTED';

/**
 * BUTTON CLAIMS
 *
 */
const BUTTON_CLAIM_SAVE = 'save';
const BUTTON_CLAIM_REQUEST = 'request';
const BUTTON_CLAIM_ACTIVATE = 'activate';
const BUTTON_CLAIM_DOWNLOAD = 'download';
const BUTTON_CLAIM_APPROVE = 'approve';
const BUTTON_CLAIM_REJECT = 'reject';
const BUTTON_CLAIM_PUBLISH = 'publish';

/**
 * BUTTON TITLES
 *
 */
const BUTTON_TITLE_SAVE = 'save';
const BUTTON_TITLE_REQUEST = 'request';
const BUTTON_TITLE_CONTINUE = 'continue';
const BUTTON_TITLE_DOWNLOAD = 'download';
const BUTTON_TITLE_ACTIVATE = 'activate';
const BUTTON_TITLE_APPROVE = 'approve';
const BUTTON_TITLE_REJECT = 'reject';
const BUTTON_TITLE_PUBLISH = 'publish';

/**
 * DEFAULT MESSAGES
 *
 */
const ON_REJECT_MESSAGE = 'Rejected.';
const ON_APPROVE_MESSAGE = 'Approved.';
const ON_SUBMIT_MESSAGE = 'Successfully submitted.';
const ON_SAVE_MESSAGE = 'Successfully saved.';
const ON_CONTINUE_UPLOAD_MESSAGE = 'Document(s) uploaded successfully.';
const ON_DOCUMENT_GENERATE_MESSAGE = 'Document generated successfully.';
const ON_PUBLISH_MESSAGE = 'Successfully published.';
const ON_MULTIPLE_DOCUMENTS_PUBLISHED = 'Document(s) published.';
const PUBLISH_ASSET_MANAGEMENT_ACCOUNT_OPENING_DOCUMENTS_SELECT_ATLEAST_ONE =
    'No new documents selected to publish / selected documents published already.';
const ON_EMPTY_DOC_UPLOAD_MESSAGE = 'Please upload/generate documents to proceed.';
const NO_SCHEMES_SELECTED = 'No schemes selected.';

/**
 * STATUS
 */

const STATUS_PENDING = 'P';
const STATUS_SUBMITTED = 'S';
const STATUS_DOWNLOADED = 'D';
const STATUS_DOCUMENT_PUBLISHED = 'PUBLISHED';
const STATUS_DOCUMENT_PUBLISHE_COMPLETE = 'PC';
const STATUS_DOCUMENT_UPLOAD = 'UPLOADED';
const STATUS_DOCUMENT_INITIATED = 'INITIATED';
const STATUS_DOCUMENT_GENERATE = 'GENERATED';
const STATUS_DOCUMENT_UPLOAD_COMPLETE = 'UPLOAD_COMPLETED';
const STATUS_DOCUMENT_UPLOAD_PROCESSED = 'UPLOAD_PROCESSED';
const STATUS_DOCUMENT_UPLOAD_PENDING = 'UPLOAD_PENDING';
const STATUS_REJECTED = 'R';
const STATUS_APPROVED = 'A';
const STATUS_COMPLETED = 'C';

/**
 * PROPOSAL STATUS
 */

const PROPOSAL_STATUS_APPROVED = 'approveProposal';
const PROPOSAL_STATUS_REJECT = 'rejectProposal';

export {
    GENERATE_WORKFLOW_STEPS_TYPE_SINGLE,
    GENERATE_WORKFLOW_STEPS_TYPE_MULTIPLE_WORKFLOWS,
    ASSIGNEE_CLAIM_TO_BE_ASSIGNEE,
    ASSIGNEE_CLAIM_CHANGE_ASSIGNEE,
    ASSIGNEE_CLAIM_VIEW_ASSIGNEE,
    STEP_ACTION_DATA_SAVE,
    STEP_ACTION_ASSIGN,
    STEP_ACTION_UPDATE_WORKFLOW,
    STEP_ACTION_AUTHORIZE,
    STEP_ACTION_AUTHORIZE_MULTICLIENT,
    STEP_ACTION_SIGN,
    STEP_ACTION_COMMENT,
    STEP_ACTION_DOWNLOAD,
    STEP_ACTION_PROCEED_WORKFLOW,
    STEP_ACTION_ACTIVATE,
    STEP_ACTION_DATA_CHANGE,
    STEP_ACTION_DOC_UPLOAD,
    STEP_ACTION_PROCEED,
    STEP_ACTION_UPDATE,
    STEP_ACTION_PUBLISH_MANDATE,
    STEP_ACTION_TERMINATE_MANDATE,
    BUTTON_CLAIM_SAVE,
    BUTTON_CLAIM_REQUEST,
    BUTTON_CLAIM_ACTIVATE,
    BUTTON_CLAIM_DOWNLOAD,
    BUTTON_TITLE_SAVE,
    BUTTON_TITLE_REQUEST,
    BUTTON_TITLE_CONTINUE,
    BUTTON_TITLE_DOWNLOAD,
    BUTTON_TITLE_ACTIVATE,
    BUTTON_TITLE_APPROVE,
    BUTTON_TITLE_REJECT,
    BUTTON_TITLE_PUBLISH,
    BUTTON_CLAIM_APPROVE,
    BUTTON_CLAIM_REJECT,
    BUTTON_CLAIM_PUBLISH,
    ON_REJECT_MESSAGE,
    ON_APPROVE_MESSAGE,
    ON_SUBMIT_MESSAGE,
    ON_SAVE_MESSAGE,
    ON_CONTINUE_UPLOAD_MESSAGE,
    ON_DOCUMENT_GENERATE_MESSAGE,
    ON_PUBLISH_MESSAGE,
    ON_MULTIPLE_DOCUMENTS_PUBLISHED,
    PUBLISH_ASSET_MANAGEMENT_ACCOUNT_OPENING_DOCUMENTS_SELECT_ATLEAST_ONE,
    ON_EMPTY_DOC_UPLOAD_MESSAGE,
    STATUS_PENDING,
    STATUS_SUBMITTED,
    STATUS_DOWNLOADED,
    STATUS_DOCUMENT_PUBLISHED,
    STEP_ACTION_PUBLISH_MULTICLIENT,
    STATUS_DOCUMENT_PUBLISHE_COMPLETE,
    STATUS_DOCUMENT_UPLOAD,
    STATUS_DOCUMENT_INITIATED,
    STATUS_DOCUMENT_GENERATE,
    STATUS_DOCUMENT_UPLOAD_COMPLETE,
    STATUS_DOCUMENT_UPLOAD_PROCESSED,
    STATUS_DOCUMENT_UPLOAD_PENDING,
    STATUS_REJECTED,
    STATUS_APPROVED,
    STATUS_COMPLETED,
    PROPOSAL_STATUS_APPROVED,
    PROPOSAL_STATUS_REJECT,
    STEP_ACTION_PUBLISH,
    STEP_ACTION_UPLOD_PUBLISH,
    USER_ACTION_PENDING,
    USER_ACTION_APPROVED,
    USER_ACTION_REJECTED,
    STEP_UPDATE_TYPE_UPLOAD,
    STEP_UPDATE_TYPE_ACTIVE,
    ABORT_WORKFLOW_ACTION,
    NO_SCHEMES_SELECTED,
    STEP_ACTION_ASSIGNEE,
    STEP_ACTION_AUTHORIZE_MANDATE,
};
