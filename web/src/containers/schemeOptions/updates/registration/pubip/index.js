import React from 'react';
import { Row, Col, Tooltip, Button } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

import CreatePublish from '../../../../workflows/templates/stepTemplates/publish';
import constants from '../../../../workflows/constants';
import { uploadField } from './uploadFormConfig';

import { OutputFilesForm } from '../../../../workflows/components';

import { FORM_NAME, FORM_I_ICON, FORM_TITLE, PUBLISH_DOC_NAME, FORMAL_PROPOSAL, ANALYTICAL_MODULES } from './constants';

const {
    FORM_SECTION_INCLUDE_UPLOAD_PUBLISH,
    FORM_SECTION_INCLUDE_COMPONENT,
    GENERATE_PUBLISH_TYPE_UPLOAD_TAB
} = constants;

let PublishUploadDoc = props => {
    const formTabs = [
        {
            type: FORM_SECTION_INCLUDE_UPLOAD_PUBLISH, //Use to mention the tab type
            tabKey: FORMAL_PROPOSAL.KEY, //A unique key for each tab
            tabName: FORMAL_PROPOSAL.NAME, //Tab header display name
            uploadFormConfig: uploadField //Use to pass functional configuration
        },
        {
            type: FORM_SECTION_INCLUDE_COMPONENT,
            tabKey: ANALYTICAL_MODULES.KEY,
            tabName: ANALYTICAL_MODULES.NAME,
            formSection: (
                <OutputFilesForm
                    schemeId={props.entityId}
                    step={'dowip'} // need to set stepfunction executed step
                    functionName={'adhoc_docGen'}
                    workflow={'registration'}
                />
            )
        }
    ];
    return (
        <>
            <CreatePublish
                formTabs={formTabs}
                // formFieldFunction={uploadField} // functional configuration to create upload-generate field in the template
                documentName={PUBLISH_DOC_NAME} //name of the document that need to publish
                formName={FORM_NAME} //name of the form
                publishType={GENERATE_PUBLISH_TYPE_UPLOAD_TAB} //type of the CreatePublish component (upload document).
                //necessary properties need to be passed down to the create form component and the header
                options={{
                    title: FORM_TITLE, //title to be displayed in the header.
                    titleIicon: FORM_I_ICON //the value of the tooltip icon in the header.
                }}
                // disabled={true}
                {...props} // props that are passed down to the child components
            />
        </>
    );
};

export default PublishUploadDoc;
