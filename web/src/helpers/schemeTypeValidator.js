//Keep adding new scheme type validators as needed

const SCHEME_TYPES = {
    SPECIAL_ADVISARY: 'specialAdvisory'
};

export const isSchemeTypeSpecialAdvisary = schemeObj => {
    return schemeObj.schemeType === SCHEME_TYPES.SPECIAL_ADVISARY;
};
