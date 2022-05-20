// constants for the whole application
export const REGISTRATION_SUCCESS = 'Registration successful. Please log in to proceed.';
export const REGISTRATION_CONTAINER_HEADING = 'Register';
export const REGISTRATION_ENTER_VERIFICATION_CODE = 'To complete registration, please enter code sent to your e-mail.';
export const REGISTRATION_VERIFICATION_CODE_GETTING_SUCCESS =
    'We have sent you a new verification code. Please enter your code to proceed.';

// Account Confirmation Container
export const CONFIRMATION_ACCOUNT_CONFIRMATION_CONTAINER_TITLE = 'Account Confirmation';
export const CONFIRMATION_PROVIDE_EMAIL_TO_CONTAINER =
    'Provide email and confirmation code sent to you to complete registration.';

// Reset Password Container
export const RESET_PASSWORD_SUCCESS = 'Your password has been updated. Please login with your new password.';

// forgot passord sagas
export const SENDING_SEND_PASSWORD_RESET_CODE =
    'An unexpected error occurred while sending password reset code. please try again later.';
export const PASSWORD_RESET_FAILED = 'An unexpected error occurred while resetting password. please try again later.';

// delete user force sign out
export const DELETE_USER_FORCE_SIGNOUT = 'Your account has been deleted.';

// concurrent login force sign out
export const CONCURRENT_USER_FORCE_SIGNOUT = 'You are signed in using a different device/browser.';

export const APPROVAL_COUNT_SHOULD_BE_LESS_THAN = {
    INDIVIDUAL: 'Approval count cannot exceed number of trustees.',
    COPORATE: 'Trustee approval count cannot be greater than the number of authorised persons.'
};
export const SIGN_COUNT_SHOULD_BE_LESS_THAN = {
    INDIVIDUAL: 'Sign count cannot exceed number of trustees.',
    COPORATE: 'Trustee sign count cannot be greater than the number of authorised persons.'
};
export const YOU_CAN_ONLY_ADD_CLIENT = 'You can only add client users as trustees.';

//common
export const SUCCESSFULLY_APPROVED = 'Approved.';
export const SUCCESSFULLY_REJECTED = 'Rejected.';
export const DOCUMENTS_PUBLISHED = 'Document(s) published.';
export const DOCUMENTS_UPLOADED = 'Document(s) uploaded successfully.';
export const DOCUMENTS_GENERATED = 'Document generated successfully.';
export const SUCCESSFULLY_ACTIVATED = 'Successfully activated.';
export const DATA_SAVED_SUCCESSFULLY = 'Data saved successfully.';
export const ACTION_FAILED =
    'Action failed, please try again.  If problem persists, please notify us via LGIM Navigator.';
export const SELECT_TWO_SIGNATORIES = 'Please select at least two signatories to continue.';
export const INFORMATION_SAVED = 'Information saved.';

// Login
// Login Sagas
export const LOGIN_FAIL = 'Login failed! Recheck credentials and try again.';

// register sagas
export const REGISTRATION_FAILED = 'An unexpected error occurred while registering. please try again later.';

// user confirmation code sagas
export const ACCOUNT_CONFIRMATION_FAILED =
    'An unexpected error occurred while confirming you account. please try again later.';
export const SENDING_CONFIRMATION_CODE_FAILED =
    'An unexpected error occurred while re-sending user confirmation token. please try again later.';

// Contact us
export const DETAILS_RECIEVE_SUCCESS = 'We have received your request.';
export const DETAILS_SENDING_FAILED = 'error occurred while sending contact details.';

// schemes
// saga
export const CREATE_SCHEME_FAILED = 'An unexpected error occurred while creating scheme.';
export const SCHEME_FETCHING_FAILED = 'An unexpected error occurred while fetching schemes.';
export const SCHEME_SPESIFIC_FETCHING_FAILED = 'An unexpected error occurred while fetching specific scheme.';
export const SCHEME_UPDATE_FAILED = 'An unexpected error occurred while updating scheme status.';

// Registration flow
// Request Initial Proposal
export const INITIAL_PROPOSAL_SAVE_SUCCESS = 'Information saved.';
export const INITIAL_PROPOSAL_SUBMIT_SUCCESS = 'Proposal requested.';
export const INITIAL_PROPOSAL_NAME_REQUIRED = 'Proposal name is required.';
export const INITIAL_PROPOSAL_SELECT_APPRVE_USERS = 'Select users to approve/reject formal proposal.';
export const INITIAL_PROPOSAL_NAME_OCCUPIED = 'Proposal name is already exists.';
export const ALERT_NAME_REQUIED_MESSAGE = 'Formal proposal name';
export const REQUEST_INITIAL_PROPOSAL_TITLE = 'Request Formal Proposal';
export const REQUEST_INITIAL_PROPOSAL_INFORMATION_TITLE = 'Request a formal proposal from us';
export const REQUEST_INITIAL_PROPOSAL_SUBMIT_BUTTON_TITLE = 'Request Proposal';
export const REQUEST_INITIAL_PROPOSAL_SAVE_AS_NEW = 'No, I want to save as new';
export const REQUEST_INITIAL_PROPOSAL_GETTING_PROPOSAL_NAMES_ERROR =
    'An unexpected error occurred while getting proposal names.';
export const REQUEST_INITIAL_PROPOSAL_SAVE_DATA_FAIL = 'An unexpected error occurred while saving proposal data.';
export const REQUEST_INITIAL_PROPOSAL_GETTING_DATA_FAIL = 'An unexpected error occurred while getting proposal data.';
export const REQUEST_INITIAL_PROPOSAL_DO_YOU_WANT_TO_OVERIDE = 'Please Confirm you wish to overwrite ';

export const ADD_TRUSTEE_SAVE_SUCCESS = 'Information saved.';
export const ADD_TRUSTEE_REQUEST_SUCCESS = {
    INDIVIDUAL: 'Add / Change trustees requested.',
    COPORATE: 'Add / Change authorised persons requested.'
};

// Download Initial Proposal
export const DOWNLOAD_INITIAL_PROPOSAL_PROPOSAL_DATA_FETCHING_FAILED =
    'An unexpected error occurred while downloading Formal Proposal.';

// Publish Initial Proposal
export const PUBLISH_INITIAL_PROPOSAL_PUBLISH_SUCCESS = 'Document published.';
export const PUBLISH_INITIAL_PROPOSAL_UPLOAD_SUCCESS = 'Document uploaded successfully.';
export const PUBLISH_INITIAL_PROPOSAL_PUBLISH_FAILED = 'An unexpected error occurred while publishing formal proposal.';
export const PUBLISH_INITIAL_PROPOSAL_TITLE = 'Publish formal proposal';

// Approve initial proposal
export const APPROVE_INITIAL_PROPOSAL_TITLE = 'Review our proposal';

//Trustee change
export const TRUSTEE_CANNOT_REPEATED = {
    INDIVIDUAL: 'Trustee email cannot be repeated.',
    COPORATE: 'Authorised person email cannot be repeated.'
};
export const ADD_TWO_TRUSTEES = {
    INDIVIDUAL: 'Add at least two trustees.',
    COPORATE: 'Add at least two authorised persons.'
};

// Request IAA
export const REQUEST_IAA_TRUSTEE_COUNT_MISMATCH = {
    INDIVIDUAL: 'There is a discrepancy in the number of trustees.',
    COPORATE: 'There is a discrepancy in the number of authorised persons.'
};
export const REQUEST_IAA_DUPLICATE_EMAIL = 'Duplicate email';
export const REQUEST_IAA_LOGIN_FAILED = 'Login failed!';
export const REQUEST_IAA_TITLE = 'Request';
export const REQUEST_IAA_TITLE_INFORMATION_ENTER = 'Provide scheme regulatory information';
export const REQUEST_IAA_DATA_REQUEST_SUCCESS = 'Request submitted.';
export const HAS_REQUEST_IAA_DATA = 'has requested an IAA.';
export const SAVE_IAA_DATA_REQUEST_SUCCESS = 'Information saved.';
export const REQUEST_IAA_DATA_REQUEST_RECIEVE_SUCCESS = 'Your request for an IAA has been received.';
export const REQUEST_IAA_DATA_SAVE_FAILED = 'An unexpected error occurred while saving iaa data.';
export const REQUEST_IAA_DATA_GETTING_FAILED = 'An unexpected error occurred while getting iaa data.';
export const REQUEST_IAA_META_DATA_SAVE_FAILED = 'An unexpected error occurred while saving iaa upload meta.';
export const REQUEST_IAA_META_DATA_SAVE_SUCCESS = 'Information saved.';
export const PRIMART_TRUSTEE_VALIDATION = 'Primary trustee cannot add as other trustee.';

// Approve IAA
export const IAA_APPROVE_TYPE_REJECT = 'rejectInIAA';
export const IAA_APPROVE_TYPE_APPROVE = 'approveIAA';
export const APPROVE_IAA_TITLE = 'Approve IAA';

// Approve IAA and manager letters
export const APPROVE_IAA_MANAGER_LETTERS_TITLE = 'Review IAA and send for signing';

// Generate IAA and manager letters
export const GENERATE_IAA_MANAGER_LETTERS_DATA_SAVE_SUCCESS = 'Information saved.';
export const GENERATE_IAA_MANAGER_LETTERS_TITLE = 'Generate IAA and manager letters';

// publish iaa and manager letters
export const PUBLISH_IAA_MANAGER_LETTERS = 'Publish IAA and manager letters';
export const PUBLISH_IAA_MANAGER_LETTERS_DOCUMENTS_PUBLISH_SUCCESS = 'Documents published successfully.';
export const PUBLISH_IAA_MANAGER_LETTERS_DOCUMENTS_SELECT =
    'No new documents selected to publish / selected documents published already.';

// Execution status
export const EXECUTION_STATUS_ERROR_MESSAGE_ALL_USERS_MUST_SIGN = 'One or more users have yet to sign the document.';
export const EXECUTION_STATUS_TITLE = 'Sign Investment Advisory Agreement';
export const EXECUTION_STATUS_GETTING_IAA_EXECUTION_STATUS_FAILED =
    'An unexpected error occurred while getting iaa execution status.';
export const EXECUTION_STATUS_UPDATE_FAILED = 'An unexpected error occurred while updating iaa execution status.';
export const EXECUTION_STATUS_MANUAL_STATUS_CHANGE = 'Manual Status Change';

// Request asset management account opening
export const REQUEST_ASSET_MANAGEMENT_ACCOUNT_OPENING_MESSAGE_COMPLETE_ALL_TABS =
    'Please complete information in all tabs in order to request account';
export const REQUEST_ASSET_MANAGEMENT_ACCOUNT_OPENING_TITLE = 'Request Asset Management account';
export const REQUEST_ASSET_MANAGEMENT_ACCOUNT_INFORMATION_TITLE = 'Provide data for investment advice';
export const REQUEST_ASSET_MANAGEMENT_ACCOUNT_OPENING_SELECT_APPROVE_USERS =
    'Please select users for approve your account management account.';
export const REQUEST_ASSET_MANAGEMENT_ACCOUNT_OPENING_REQUEST_ACCOUNT = 'Request Advice';
export const REQUEST_ASSET_MANAGEMENT_ACCOUNT_OPENING_REQUEST_ACCOUNT_SUCCESS = 'Your account has been requested.';
export const REQUEST_ASSET_MANAGEMENT_ACCOUNT_OPENING_DATA_GETTING_FAILED =
    'An unexpected error occurred while getting asset management account data.';
export const REQUEST_ASSET_MANAGEMENT_ACCOUNT_OPENING_INFORMATION_SAVED_SUCCESS = 'Information Saved.';
export const REQUEST_ASSET_MANAGEMENT_ACCOUNT_OPENING_INFORMATION_GETTING_FAILED =
    'An unexpected error occurred while getting asset management account data.';
export const REQUEST_ASSET_MANAGEMENT_ACCOUNT_OPENING_UPLOAD_AMOA_META_FAILED =
    'An unexpected error occurred while saving AMAO upload meta.';

export const CATEGORY_YOU_SELECTED_HAS_NO_UPLOADED_DOCUMENTS =
    'The category you selected has no uploaded documents or no details entered yet.';

// Approve Asset Management account opening
export const APPROVE_ASSET_MANAGEMENT_ACCOUNT_OPENING = 'Approve data for investment advice';

// Generate Asset Management account opening documents
export const GENERATE_ASSET_MANAGEMENT_ACCOUNT_OPENING_DOCUMENT_TITLE = 'Generate advice and PMC legal docs';
export const GENERATE_ASSET_MANAGEMENT_ACCOUNT_OPENING_DOCUMENT_UPLOAD_ATLEAST_ONE =
    'Please upload/generate documents to proceed.';
//generators
export const INVALID_FILE_FORMAT = 'Invalid format.  Please reload using correct format.';
export const NO_PROPOSAL_NAME_MESSAGE = 'Please enter a name for proposal before upload the document.';

// Approve Advisory Report
export const APPROVE_ADVISORY_REPORT_TITLE = 'Approve advisory report';

// Approve IMA
export const APPROVE_FMA_TITLE = 'Approve IMA';

// Approve PMC policy
export const APPROVE_PMC_TITLE = 'Approve PMC Policy';

// Publish Asset Management account opening documents
export const PUBLISH_ASSET_MANAGEMENT_ACCOUNT_OPENING_DOCUMENTS_TITLE = 'Publish advice and PMC legal docs';
export const PUBLISH_ASSET_MANAGEMENT_ACCOUNT_OPENING_DOCUMENTS_SELECT_ATLEAST_ONE =
    'No new documents selected to publish / selected documents published already.';

// Approve Advisory Report
export const APPROVE_ADVISORY_REPORT_TITTLE = 'Review investment advice';

// Approve IMA
export const REVIEW_FMA_TITTLE = 'Review IMA and send for signing';

// Approve PMC policy
export const REVIEW_PMC_TITTLE = 'Review Policy Terms and send for signing';

// IMA and PMC policy exucution status
export const FMA_PMC_EXECUTION_STATUS_TITLE = 'Investment Management Agreement and Policy Terms: Execution status';
export const TXT_FMA = 'fma';
export const TXT_PMC = 'pmc';
export const FMA_PMC_EXECUTION_STATUS_INFORMATION_GETTING_FAILED =
    'An unexpected error occurred while getting iaa execution status.';
export const FMA_PMC_EXECUTION_STATUS_INFORMATION_UPDATING_FAILED =
    'An unexpected error occurred while updating iaa execution status.';

// Approve manager termination letters
export const APPROVE_MANAGER_TERMINATION_LETTERS_TITTLE = 'Approve manager termination letters';

// Publish manager termination letters
export const PUBLISH_MANAGER_TERMINATION_LETTERS_TITTLE = 'Publish manager termination letters';
export const PUBLISH_MANAGER_TERMINATION_LETTERS_DOCUMENTS_PUBLISHE_SUCCESS = 'Document(s) Published.';
export const PUBLISH_MANAGER_TERMINATION_LETTERS_DOCUMENTS_SELECT_ONE =
    'No new documents selected to publish / selected documents published already.';

// Review/Download manager termination letters
export const REVIEW_MANAGER_TERMINATION_LETTERS_TITTLE = 'Review/download manager termination letters';

// Activate satatus
export const ACTIVATE_STATUS_CLIENT_ACCOUNT_ACTIVATE_SUCCESSFULLY = 'Account Activated.';
export const ACTIVATE_STATUS_CLIENT_ACCOUNT_ENTER_ACTIVATION_CODE = 'Please enter policy code to activate account.';
export const ACTIVATE_STATUS_CLIENT_ACCOUNT_ENTER_ACTIVATION_FAILED =
    'An unexpected error occurred while activating client.';

// User management
export const USER_MANAGEMENT_GETTING_COUTRIBUTORS_FAILED =
    'An unexpected error occurred while fetching specific scheme contributors.';
export const USER_MANAGEMENT_USER_CREATE_SUCCESSFULLY = 'User created successfully.';
export const USER_MANAGEMENT_USER_CREATION_FAILED = 'User creation failed.';
export const USER_MANAGEMENT_ADDING_USER_FAILED = 'An unexpected error occurred while adding contributors.';
export const USER_MANAGEMENT_LGIM_USER_ADDING_VALIDATION = 'Lgim user cannot be added as a contributor'; // this use for check condition do not change

// USER MANAGEMENT TAB NAMES
export const USER_MANAGEMENT_TAB_INFORMATION = 'Information';
export const USER_MANAGEMENT_TAB_USER_MANAGEMENT = 'User Management';
export const USER_MANAGEMENT_TAB_REGISTRATION = 'Registration';
export const USER_MANAGEMENT_TAB_UPDATES = 'Updates';
export const USER_MANAGEMENT_TAB_DASHBOARD = 'Dashboard';
export const ACTIVE_WORKFLOW = 'Updates';
export const PORTFOLIO_ANALYZER_TAB = 'Portfolio Analyser';

export const TXT_TRUSTEE = 'Trustee';
export const TXT_SPONSOR = 'Sponsor';
export const TXT_ADVISOR = 'Advisor';
export const TXT_SELECT_ROLE = 'Select role in scheme';

//LGIM USER OPTION MENU ITEMS
export const TXT_ADMIN = 'Admin';
export const TXT_SIGNATORY = 'Signatory';
export const TXT_LEGAL = 'Legal';
export const TXT_LGIM_USER_SELECT_ROLE = 'Select LGIM user role';

// USER PROFILE
export const DO_SAVE_PROFILE_IMAGE_FAILED = 'Could not able to save the profile image';
export const DO_SAVE_PROFILE_IMAGE_SUCCESS =
    'Profile picture updated. Please log-out and log-in again in order for the new picture to take effect';

// Other constants
export const SCHEME_SELECTIN_TYPE_ALL = 'all';
export const ALERT_TYPE_RESPONSE = 'response';
export const ALERT_BUTTON_TITLE_SAVE_AS = 'Save As';
export const ALERT_BUTTON_TITLE_SAVE = 'Save';
export const ALERT_BUTTON_TITILE_SUBMIT = 'submit';
export const ALERT_BUTTON_TYPE_TITTLE_WARNING = 'warning';
export const TXT_YES = 'Yes';
export const TXT_YES_SIMPLE = 'yes';
export const TXT_REQUIRED = 'Required';

export const TXT_CONFIRMATION = 'Confirmation';
export const TXT_CONTINUE = 'Continue';
export const DATE_FORMAT = 'DD-MM-YYYY';

// States
export const STATES_APPROVE = 'A';
export const STATES_PENDING = 'P';
export const STATES_REJECT = 'R';
export const STATES_SIGNED = 'S';
export const STATES_COMPLETED = 'C';
export const STATES_APPROVED = 'approve';
export const STATES_REJECTED = 'reject';

export const PROPOSAL_STATUS_APPROVED = 'approveProposal';
export const PROPOSAL_STATUS_REJECT = 'rejectProposal';

// Submit status
export const SUBMIT_STATUS_SAVE = 'save';
export const SUBMIT_STATUS_SUBMIT = 'submit';

// Validation messages
export const TXT_INVALID_EMAIL = 'Invalid email address';
export const TXT_INVALID_NUMBER = 'Invalid entry. Please re-enter.';
export const SPACES_NOT_ALLOWED = 'Spaces not allowed.';
export const INVALID_FILE_SIZE = 'The document you uploaded has exceeded the maximum size limit of 10MB.';
export const FILE_ALREADY_UPLOADED =
    'Document already exists. Please upload a different document or rename the document.';

// Chart messages
export const LOAD_CHART_DATA_ERROR = 'An unexpected error occurred while getting chart data';
export const LOAD_CHART_LIST_ERROR = 'An unexpected error occurred while getting chart list';
export const UPDATE_CHART_ERROR = 'An unexpected error occurred while updating chart list';

// Tasks system messages
export const LOAD_TASKS_ERROR = 'An unexpected error occurred while getting tasks';
export const LOAD_TASKS_COUNT_ERROR = 'An unexpected error occurred while getting tasks count';
export const GET_SCHEMES_LIST_ERROR = 'An unexpected error occurred while getting schemes';
export const GET_SCHEME_USER_LIST_ERROR = 'An unexpected error occurred while getting scheme users';
export const GET_LGIM_USER_LIST_ERROR = 'An unexpected error occurred while getting lgim users';
export const CREATE_TASK_SUCCESS = 'Message sent.';
export const CREATE_TASK_ERROR = 'An unexpected error occurred while creating task';
export const UPDATE_TASK_ERROR = 'An unexpected error occurred while updating task';
export const DELETE_TASK_ERROR = 'An unexpected error occurred while deleting task';
export const DELETE_TASK = 'Message successfully deleted';
export const TASK_MARK_AS_READ = 'Message successfully mark as read';
export const TASK_MARK_AS_ERROR = 'An unexpected error occurred while mark as read';
export const SET_TASK_CONFIG_ERROR = 'An unexpected error occurred while change email option';
export const GET_TASK_CONFIG_ERROR = 'An unexpected error occurred while get email config details';

export const SET_NOTIFICATION_CONFIG_ERROR = 'An unexpected error occurred while change notification option';

// personal details
export const UPDATE_PERONAL_DETAILS_SUCCESS = 'Personal data updated.';
export const DELETE_PROFILE_IMAGE_SUCCESS = 'Profile picture deleted.';
export const PROFILE_IMAGE_SUCCESSFULLY_UPLOADED = 'Profile picture successfully updated.';
export const DELETE_PROFILE_IMAGE_FAILED = 'Delete failed. Please try again';
export const UPDATE_PASSWORD_SUCCESS = 'Your password has been changed.';
export const UPDATE_PASSWORD_FAILED = 'Password updation failed';

// user group success
export const USER_GROUP_DELETE_SUCCESS = 'Scheme group successfully deleted';

//saga error messages

export const ERROR_GET_REVIEW_PROPOSAL_DATA = 'An unexpected error occurred while getting review proposal data.';
export const FMA_PMC_SIGNED = 'IMA and PMC documents have been signed.';
export const YOUR_EMAIL_IS_NOT_VERIFIED = 'Enter the verification code emailed to you.';
export const WE_HAVE_SENT_YOU_A_VERIFICATION_CODE =
    'We have sent you a verification code. Please reset your password with the code provided.';
export const ERROR_WHILE_GETTING_USER_NOTIFICATION = 'An unexpected error occurred while getting user notifications.';
export const ERROR_WHILE_GETTING_USER_NOTIFICATION_FLAG =
    'An unexpected error occurred while setting user notifications flag';
export const ERROR_WHILE_UPDATING_PERSONAL_DATA = 'An unexpected error occurred while updating personal data.';
export const ERROR_WHILE_GETING_PERSONAL_DATA = 'An unexpected error occurred while getting personal data.';
export const SUCCESSFULLY_UPLOADED_MTL = 'Successfully uploaded manager termination letters.';
export const ERROR_WHILE_SAVING_MTL = 'An unexpected error occurred while saving MTL data.';
export const ERROR_WHILE_GETTING_MTL = 'An unexpected error occurred while getting MTL data.';
export const ERROR_WHILE_GETTING_ARTIFACTS = 'An unexpected error occurred while getting artifacts';

export const SAVE_USER_GROUP_ERROR = 'An unexpected error occurred while saving user group';
export const GET_USER_GROUPS = 'An unexpected error occurred while fetching user groups';
export const DELETE_USER_GROUPS_ERROR = 'An unexpected error occurred while deleting user group';
export const DELETE_LGIM_USER_ERROR = 'An unexpected error occurred while deleting lgim user';
export const SAVE_LGIM_USER_ERROR = 'An unexpected error occurred while saving lgim user';
export const GET_LGIM_USERS_ERROR = 'An unexpected error occurred while fetching lgim users';
export const GET_USER_CLAIMS = 'An unexpected error occurred while fetching user claims';
export const GET_FNAME_LNAME_BY_EMAIL = 'An unexpected error occurred while fetching user details';
export const DELETE_CONTRIBUTOR = 'An unexpected error occurred while deleting scheme user';

export const GET_USER_GROUPS_NOTIFICATION_ERROR =
    'An unexpected error occurred while getting user groups notifications';
export const SET_NOTIFICATION_CONFIG_SUCCES = 'Successfully change the configuration';

// ACTIVE WORKFLOWS CONSTANTS
export const TITTLE_CHANGE_ADVISORY_FEE = 'Change advisory fee';
export const TITILE_GENERATE_IAA_ADVISORY_FEE = 'Generate IAA';
export const TITILE_APPROVE_IAA_ADVISORY_FEE = 'Approve IAA';
export const TITILE_PUBLISH_IAA = 'Publish IAA';
export const TITILE_SHEME_APPROVE_IAA = 'Sheme approve IAA';
export const TITTLE_IAAEXECUTION_STATUS = 'Sign Investment Advisory Agreement';
export const TITTLE_ACTIVATE_MANDATE = 'Activate mandate';

export const TITILE_GENERATE_FMA_ADVISORY_FEE = 'Generate IMA';
export const TITTLE_CHANGE_FM_FEE = 'Change investment management fee';
export const TITILE_APPROVE_FMA_ADVISORY_FEE = 'Approve IMA';
export const TITILE_PUBLISH_FMA = 'Publish IMA';
export const TITILE_SHEME_APPROVE_FMA = 'Scheme Approve IMA';
export const TITILE_PUBLISH_SIP = 'Publish SIP';
export const TITTLE_FMAEXECUTION_STATUS = 'Sign Investment Management Agreement';
// END OF ACTIVE WORKFLOW CONSTANTS

//claims
export const SAVE = 'save';
export const REQUEST = 'request';
export const VIEW_ASSIGN_USER = 'viewAssignUser';
export const TOBE_ASSIGN_USER = 'toBeAssignee';
export const CHANGE_ASSIGN_USER = 'changeAssignUser';
export const APPROVE_REJECT = 'approveReject';
export const DOWNLOAD = 'download';
export const GENERATE = 'generate';
export const PUBLISH = 'publish';
export const GENERATE_ADVISORY = 'generateAdvisory';
export const GENERATE_LETTERS = 'generateLetters';
export const GENERATE_PMCFMA = 'generatePMCFMA';
export const UPLOAD_ADVISORY = 'uploadAdvisory';
export const UPLOAD_LETTERS = 'uploadLetters';
export const UPLOAD_PMCFMA = 'uploadPMCFMA';
export const ACTIVATE = 'activate';

//want to sync with BE permission middleware => libs constant
export const commonClaimIds = {
    claims: {
        addSchemeUsers: 'cl-23',
        editSchemeUsers: 'cl-34',
        addSchemeGroups: 'cl-25',
        modifySchemeGroups: 'cl-37',

        addLgimUsers: 'cl-24',
        editLgimUsers: 'cl-35',
        addLgimGroups: 'cl-28',
        modifyLgimGroups: 'cl-38',

        addAdvisoryUsers: 'cl-30',
        editAdvisoryUsers: 'cl-36',
        addAdvisoryGroups: 'cl-31',
        modifyAdvisoryGroups: 'cl-39',

        editOtp: 'cl-um-5'
    }
};

export const organizationUMClaims = ['cl-24', 'cl-24', 'cl-35', 'cl-28', 'cl-38', 'cl-30', 'cl-36', 'cl-31', 'cl-39'];

export const numberOfchartsPerPage = 4;

// NOTE: Default tenant in use
const DEFAULT_TENANT = 'LGIM';

// NOTE: Export default tenant
export const getDefaultTenant = () => {
    return DEFAULT_TENANT;
};

export const documentGenConstant = {
    TENENT: DEFAULT_TENANT,
    REGISTRATION: 'registration',
    ADVISORY: 'advisoryReport',
    FMA: 'fmaDocument',
    IMA: 'IMAdocument',
    INITIAL_PROPOSAL: 'initialProposal',
    FORMAL_PROPOSAL: 'formalProposal',
    IAA: 'iaaDocument',
    PMC: 'pmcProposal',
    RETURN_TARGET_UPDATE: 'rtnTargUpd',
    LIABILITY_UPDATE: 'liabUpd',
    FULL_STRATEGY_REVIEW: 'flStrtgRevw'
};

export const FILE_MANAGEMENT = {
    TENANT: true ? DEFAULT_TENANT : ''
    // NOTE: To add a custom tenant, set the defaultTenant condition to false and enter custom tenant name to the second statemennt of ternary operator
    // i.e.: false ? DEFAULT_TENANT : 'Custom'
};

export const stepFunctionConstants = {
    PORTFOLIO_REJECT_FUNCTION_NAME: 'adhoc_rj',
    WORKFLOW_REGISTRATION: 'registration',
    STEP_PORTFOLIO_ANALYZER: 'portfolioAnalyzer',
    PORTFOLIO_ANALYZE_FUNCTION_NAME: 'adhoc_pa'
};

export const LGIM_CLAIM_UPDATE_TRANSITION_STATE = 'cl-121';

export const USER_ROLE_INDIVIDUAL_TRUSTEE = 'individual_trustee';
export const TXT_TRUSTEE_CHECK_COPERATE = 'corporate_trustee';

// Key Metrics constants
export const GET_KEY_METRICS_CONFIG_ERROR = 'An unexpected error occurred while getting key metrics config';
export const FILTER_SCHEMES_ERROR = 'An unexpected error occurred while filtering schemes';
export const GET_MY_VIEWS_ERROR = 'An unexpected error occurred while geting my views';
export const DELETE_VIEW_ERROR = 'An unexpected error occurred while deleting the view';
export const SAVE_VIEWS_ERROR = 'An unexpected error occurred while saving view';
export const EDIT_VIEWS_ERROR = 'An unexpected error occurred while editing view';
export const UPDATE_VIEWS_ERROR = 'An unexpected error occurred while updating view';
export const SCHEME_DATA_CHANGE_ERROR = 'An unexpected error occurred while updating scheme data';
export const SAVE_GLOBAL_VIEWS_ERROR = 'An unexpected error occurred while saving global view';
export const UPDATE_GLOBAL_VIEWS_ERROR = 'An unexpected error occurred while updating global view';
export const EDIT_GLOBAL_VIEWS_ERROR = 'An unexpected error occurred while editing global view';
export const DELETE_GLOBAL_VIEW_ERROR = 'An unexpected error occurred while deleting the global view';
export const GET_MY_DEFAULT_ORG_GROUPS_ERROR = 'An unexpected error occurred while getting default groups';
export const GET_MY_CURRENT_APPLIED_VIEW_ERROR = 'An unexpected error occurred while getting current applied view';
export const SAVE_MY_CURRENT_APPLIED_VIEW_ERROR = 'An unexpected error occurred while saving current applied view';
export const REMOVE_MY_CURRENT_APPLIED_VIEW_ERROR = 'An unexpected error occurred while removing current applied view';

export const LGIM_CLAIM_UPDATE_OTP = 'cl-um-5';
