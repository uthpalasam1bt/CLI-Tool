/* 
      This file contains all the constants required in the index.js of the step
 
*/
import React from 'react';

export const FORM_NAME = 'SAMPLE_FORM_SIX'; //Name for redux form
export const FORM_TITLE = 'Active mandate'; // Text for title to display in the header
export const ON_ACTIVATE_MESSAGE = 'Mandate change is now effective.'; //message that display when scheme is activated

export const HAS_SBEEN_CONSULATED = 'hasSponsorBeenConsulted';
export const RESPONDED_BY = 'userName';
export const DATE = 'date';

export const FIELD_NAME = {
    SPONSOR_CONSULTATION: 'Sponsor consultation status',
    INPUT_FIELD: 'inputField'
};

export const COLUMNS = [
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
