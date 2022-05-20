import React from 'react';
import constants from '../../../constants';
import FormPublishComponent from './templates/FormPublishComponent';
import MultipleFilePublish from './templates/MultipleFilePublish';
import SingleFilePublish from './templates/SingleFilePublish';
import SimpleUploadPublish from './templates/SimpleUploadPublish';
import TabUploadPublish from './templates/TabUploadPublish';
import SchemePublish from './templates/SchemePublish';
import MultiClientPublish from './templates/MultiClientPublish';

const {
    GENERATE_PUBLISH_TYPE_SINGLE,
    GENERATE_PUBLISH_TYPE_MULTIPLE,
    GENERATE_PUBLISH_TYPE_FORM,
    GENERATE_PUBLISH_TYPE_UPLOAD,
    GENERATE_PUBLISH_TYPE_UPLOAD_TAB,
    GENERATE_PUBLISH_TYPE_SCHEME,
    GENERATE_PUBLISH_TYPE_MULTICLIENT,
    GENERATE_PUBLISH_TYPE_MANDATE,
    STEP_ACTION_PUBLISH_MANDATE,
    STEP_ACTION_PUBLISH
} = constants;

const CreatePublish = props => {
    const { publishType } = props; //formName

    

    return publishType === GENERATE_PUBLISH_TYPE_SINGLE || publishType === GENERATE_PUBLISH_TYPE_MANDATE ? (
        <SingleFilePublish
            submitAction={
                publishType === GENERATE_PUBLISH_TYPE_SINGLE
                    ? STEP_ACTION_PUBLISH
                    : publishType === GENERATE_PUBLISH_TYPE_MANDATE
                    ? STEP_ACTION_PUBLISH_MANDATE
                    : null
            }
            {...props}
        />
    ) : publishType === GENERATE_PUBLISH_TYPE_MULTIPLE ? (
        <MultipleFilePublish {...props} />
    ) : publishType === GENERATE_PUBLISH_TYPE_FORM ? (
        <FormPublishComponent {...props} />
    ) : publishType === GENERATE_PUBLISH_TYPE_UPLOAD ? (
        <SimpleUploadPublish {...props} />
    ) : publishType === GENERATE_PUBLISH_TYPE_UPLOAD_TAB ? (
        <TabUploadPublish {...props} />
    ) : publishType === GENERATE_PUBLISH_TYPE_SCHEME ? (
        <SchemePublish {...props} />
    ) : publishType === GENERATE_PUBLISH_TYPE_MULTICLIENT ? (
        <MultiClientPublish {...props} />
    ) : null;
};

export default CreatePublish;
