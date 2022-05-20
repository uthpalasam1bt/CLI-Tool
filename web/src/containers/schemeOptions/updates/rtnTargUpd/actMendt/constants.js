/* 
      This file contains all the constants required in the index.js of the step
 
*/
import React from 'react';

export const FORM_NAME = 'SAMPLE_FORM_SIX'; //Name for redux form
export const FORM_TITLE = 'Activate Mandate'; // Text for title to display in the header
export const ON_ACTIVATE_MESSAGE = 'Activated'; //message that display when scheme is activated

//The value of the tooltip icon in the header
export const FORM_I_ICON = (
    <p>
       Confirm that the new mandate details have been passed to the portfolio management team and activate the new guidelines on the system and complete this workflow. Note that the mandate is legally effective from the date that the legal documents were signed, so this step should be completed as soon as possible.[Confirm that the new mandate details have been passed to the portfolio management team and activate…]
    </p>
);

export const  HAS_SBEEN_CONSULATED ='hasSponsorBeenConsulted';
export const  RESPONDED_BY = 'userName';
export const DATE= 'date';
  


export const COLUMNS =[
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
        title: 'Sponsor Consulted?',
        dataIndex: 'status',
        key: 'status',
        render: status => (
            <div>
                <span className={`dot ${status === 'no' ? 'orange' : 'green'}-dot`}></span>
                {status === 'no' ? 'Pending' : 'Yes'}
            </div>
        )
    }

]