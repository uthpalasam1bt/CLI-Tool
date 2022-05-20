import { UserRole } from '../constants/userConstants';
const { SUPER_ADMIN, ADMIN, GOVERN_USER, ADVISORY, SPECIAL_ADVISORY, CLIENT, LGIM } = UserRole;

const validateLGIM = loggedUser => {
    return loggedUser && loggedUser.primaryRole === LGIM;
};

const validateSuperAdmin = loggedUser => {
    return loggedUser && loggedUser.primaryRole === SUPER_ADMIN;
};

const validateAdmin = loggedUser => {
    return loggedUser && (loggedUser.primaryRole === SUPER_ADMIN || loggedUser.primaryRole === ADMIN);
};

const validateGovernUser = loggedUser => {
    return loggedUser && loggedUser.primaryRole === GOVERN_USER;
};

const validateAdvisary = loggedUser => {
    return loggedUser && loggedUser.primaryRole === ADVISORY;
};

const validateSpecialAdvisary = loggedUser => {
    return loggedUser && loggedUser.primaryRole === SPECIAL_ADVISORY;
};

const getPrimaryRole = loggedUser => {
    let returnUserType = CLIENT;
    switch (loggedUser.primaryRole) {
        case GOVERN_USER:
            returnUserType = GOVERN_USER;
            break;
        case ADVISORY:
            returnUserType = ADVISORY;
            break;
        case SPECIAL_ADVISORY:
            returnUserType = SPECIAL_ADVISORY;
            break;
        default:
            break;
    }
    return returnUserType;
};

const getRoleFromPrimary = primaryRole => {
    let userType = CLIENT;
    switch (primaryRole) {
        case GOVERN_USER:
            userType = GOVERN_USER;
            break;
        case ADVISORY:
            userType = ADVISORY;
            break;
        case SPECIAL_ADVISORY:
            userType = SPECIAL_ADVISORY;
            break;
        default:
            break;
    }
    return userType;
};

export {
    validateLGIM,
    validateSuperAdmin,
    validateAdmin,
    validateGovernUser,
    validateAdvisary,
    validateSpecialAdvisary,
    getPrimaryRole,
    getRoleFromPrimary
};
