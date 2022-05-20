export const IndvtrusteeFieldsLabelsMap = [
    { label: 'Number of individual trustees', field: 'numOfIndividualTrustees' },
    { label: 'Trustee first name', field: 'trustees.firstName', __order: 'a' },
    { label: 'Trustee last name', field: 'trustees.lastName', __order: 'b' },
    { label: 'Trustee contact e-mail', field: 'trustees.email', __order: 'c' },
    { label: 'Trustee contact number', field: 'trustees.contactNumber', __order: 'd' },
    {
        label: 'Do you want to be able to sign documents digitally?',
        field: 'trustees.signDigitally',
        __order: 'e'
    },
    { label: 'Trustee mobile phone number', field: 'trustees.mobileNumber', __order: 'f' }
];

export const CorptrusteeFieldsLabelsMap = [
    { label: 'Corporate trustee company name', field: 'trusteeEntities.entityName' },
    { label: 'Signatory first name', field: 'trustees.firstName', __order: 'a' },
    { label: 'Signatory last name', field: 'trustees.lastName', __order: 'b' },
    { label: 'Signatory contact e-mail', field: 'trustees.email', __order: 'c' },
    { label: 'Signatory contact number', field: 'trustees.contactNumber', __order: 'd' },
    {
        label: 'Do you want to be able to sign documents digitally?',
        field: 'trustees.signDigitally',
        __order: 'e'
    },
    { label: 'Authorised signatory mobile phone number', field: 'trustees.mobileNumber', __order: 'f' }
];
