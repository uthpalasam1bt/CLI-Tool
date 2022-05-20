/* This is functional configuration for creating a simple forms
   
    Functional Configuration accept an array of javaScript Objects. In functional configuration we can use constants and functions
    directly.Furthermore programatically easy to configure.

*/
import uiLibConstants from '../../../../../UILibrary/constants';
import _ from 'lodash';
const { FORM_TEMPLATES, FORM_FIELDS } = uiLibConstants;
const { FULL_CONTAINER, FULL_VIEW_CONTAINER, LABEL } = FORM_TEMPLATES;
const { INPUT_FIELD, TEXTAREA } = FORM_FIELDS;

export const formFields = (props = {}) => {
    console.log("values-------------------------------------->", props);

    const cancelReason = _.get(props, 'cancelReason', "");
    console.log("----------------------------------->",cancelReason);
    return [
        {
            type: FULL_CONTAINER,
            label: 'Reason for mandate termination:'
        },
        {
            type: LABEL, //  form template type
            value:`${cancelReason}` , // field label text
           
        }
    ];
};
