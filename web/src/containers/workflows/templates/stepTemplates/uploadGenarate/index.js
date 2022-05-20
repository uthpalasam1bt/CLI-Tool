import React from 'react';

import SimpleFileUpload from './templates/simpleFileUpload';
import TabFileUpload from './templates/tabFileUpload';
import constants from '../../../constants';

const { GENERATOR_TYPE_SINGLE_PAGE, GENERATOR_TYPE_WITH_TABS } = constants;

const CreateDocumentGeneration = props => {
    const { formType } = props;

    return (
        <>
            {formType === GENERATOR_TYPE_SINGLE_PAGE ? (
                <SimpleFileUpload {...props} />
            ) : formType === GENERATOR_TYPE_WITH_TABS ? (
                <TabFileUpload {...props} />
            ) : null}
        </>
    );
};

export default CreateDocumentGeneration;
