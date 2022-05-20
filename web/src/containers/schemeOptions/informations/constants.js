export const Scheme = 'Scheme';
export const Assets = 'Assets';
export const Liabilities = 'Liabilities';
export const Funding = 'Funding';
export const Administration = 'Administration';
export const ReportingPreferences = 'ReportingPreferences';
export const IncumbentManagersDoc = 'IncumbentManagersDoc';
export const Investment = 'Investment';
export const SchemeDocument = 'SchemeDocument';
export const Legal = 'Legal';
export const Letters = 'Letters';
export const Notices = 'Notices';
export const AuditTrail = 'AuditTrail';
export const AdditionalReports = 'AdditionalReports';
export const PerformanceReports = 'PerformanceReports';
export const LDISample = 'LDISample';

export const GET_DOCUMENT_CONFIG_REQUEST = 'GET_DOCUMENT_CONFIG_REQUEST';
export const GET_DOCUMENT_CONFIG_INPROGRESS = 'GET_DOCUMENT_CONFIG_INPROGRESS';
export const GET_DOCUMENT_CONFIG_SUCCESS = 'GET_DOCUMENT_CONFIG_SUCCESS';
export const GET_DOCUMENT_CONFIG_FAILED = 'GET_DOCUMENT_CONFIG_FAILED';

export const GET_INFORMATION_DIRECTORY_CONFIG_REQUEST = 'GET_INFORMATION_DIRECTORY_CONFIG_REQUEST';
export const GET_INFORMATION_DIRECTORY_CONFIG_INPROGRESS = 'GET_INFORMATION_DIRECTORY_CONFIG_INPROGRESS';
export const GET_INFORMATION_DIRECTORY_CONFIG_SUCCESS = 'GET_INFORMATION_DIRECTORY_CONFIG_SUCCESS';
export const GET_INFORMATION_DIRECTORY_CONFIG_FAILED = 'GET_INFORMATION_DIRECTORY_CONFIG_FAILED';
export const INFORMATION_DIRECTORY_CONFIG_RESET = 'INFORMATION_DIRECTORY_CONFIG_RESET';

export const GET_INFORMATION_DIRECTORY_DATA_REQUEST = 'GET_INFORMATION_DIRECTORY_FORM_DATA_REQUEST';
export const GET_INFORMATION_DIRECTORY_DATA_SUCCESS = 'GET_INFORMATION_DIRECTORY_FORM_DATA_SUCCESS';
export const GET_INFORMATION_DIRECTORY_DATA_FAILED = 'GET_INFORMATION_DIRECTORY_FORM_DATA_FAILED';
export const GET_INFORMATION_DIRECTORY_DATA_INPROGRESS = 'GET_INFORMATION_DIRECTORY_FORM_DATA_INPROGRESS';
export const GET_INFORMATION_DIRECTORY_DATA_RESET = 'GET_INFORMATION_DIRECTORY_FORM_DATA_RESET';

export const GET_AUDIT_TRAIL_DATA_REQUEST = 'GET_AUDIT_TRAIL_DATA_REQUEST';
export const GET_AUDIT_TRAIL_DATA_INPROGRESS = 'GET_AUDIT_TRAIL_DATA_INPROGRESS';
export const GET_AUDIT_TRAIL_DATA_SUCCESS = 'GET_AUDIT_TRAIL_DATA_SUCCESS';
export const GET_AUDIT_TRAIL_DATA_FAILED = 'GET_AUDIT_TRAIL_DATA_FAILED';

export const GET_REPORT_CONFIG_REQUEST = 'GET_REPORT_CONFIG_REQUEST';
export const GET_REPORT_CONFIG_INPROGRESS = 'GET_REPORT_CONFIG_INPROGRESS';
export const GET_REPORT_CONFIG_SUCCESS = 'GET_REPORT_CONFIG_SUCCESS';
export const GET_REPORT_CONFIG_FAILED = 'GET_REPORT_CONFIG_FAILED';

export const taskMap = [
    {
        id: 0,
        name: 'Information provided ',
        subItems: [
            // {
            //     keyid: 1,
            //     taskMapid: 0,
            //     name: Scheme,
            //     formtype: Scheme
            // },
            // {
            //     keyid: 0,
            //     taskMapid: 0,
            //     name: Assets,
            //     formtype: Assets
            // },
            // {
            //     keyid: 3,
            //     taskMapid: 0,
            //     name: Liabilities,
            //     formtype: Liabilities
            // },
            // {
            //     keyid: 2,
            //     taskMapid: 0,
            //     name: Funding,
            //     formtype: Funding
            // },
            // {
            //     keyid: 4,
            //     taskMapid: 0,
            //     name: Administration,
            //     formtype: Administration
            // },
            // {
            //   keyid: 5,
            //   taskMapid: 0,
            //   name: 'Reporting Preferences',
            //   formtype: ReportingPreferences
            // },
            // {
            //     keyid: 6,
            //     taskMapid: 0,
            //     name: 'Incumbent Managers',
            //     formtype: IncumbentManagersDoc
            // }
        ]
    },
    {
        id: 2,
        name: 'Documents',
        subItems: [
            // {
            //   keyid: 21,
            //   taskMapid: 2,
            //   name: Investment,
            //   formtype: Investment
            // },
            // {
            //   keyid: 22,
            //   taskMapid: 2,
            //   name: Scheme,
            //   formtype: SchemeDocument
            // },
            // {
            //   keyid: 23,
            //   taskMapid: 2,
            //   name: Legal,
            //   formtype: Legal
            // },
            // {
            //   keyid: 24,
            //   taskMapid: 2,
            //   name: Letters,
            //   formtype: Letters
            // },
            // {
            //   keyid: 25,
            //   taskMapid: 2,
            //   name: Notices,
            //   formtype: Notices
            // }
        ]
    },
    {
        id: 3,
        name: 'Activity log',
        roles: ['admin'],
        subItems: [
            {
                keyid: 31,
                taskMapid: 3,
                name: 'Audit trail information',
                formtype: AuditTrail
            }
        ]
    },
    {
        id: 4,
        name: 'Reports',
        subItems: [
            // {
            //     keyid: 41,
            //     taskMapid: 4,
            //     name: 'Performance Reports',
            //     formtype: PerformanceReports
            // },
            // {
            //     keyid: 42,
            //     taskMapid: 4,
            //     name: 'Additional reports',
            //     formtype: AdditionalReports
            // }
        ]
    }
];
