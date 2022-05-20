//Antd adds default 1em to height and width, needed to override that, there were no props
//to override that
import React from 'react';

export const FileTextIcon = props => {
    let { height = '0.8em', width = '0.8em' } = props;
    return (
        <span role="img" aria-label="file-text" class="anticon anticon-file-text">
            <svg
                viewBox="64 64 896 896"
                focusable="false"
                class=""
                data-icon="close"
                width={width}
                height={height}
                fill="currentColor"
                aria-hidden="true"
            >
                <path d="M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0042 42h216v494zM504 618H320c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zM312 490v48c0 4.4 3.6 8 8 8h384c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H320c-4.4 0-8 3.6-8 8z"></path>
            </svg>
        </span>
    );
};
