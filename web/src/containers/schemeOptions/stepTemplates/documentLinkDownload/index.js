import React from 'react';

import documentConfig from './documentConfig.json';
import { FORM_TITLE } from './constants';
import constants from '../../../../UILibrary/constants';
import DownloadUiTemplate from '../../../workflows/templates/stepTemplates/downloads';
import { BUTTON_TITLE_CONTINUE } from '../../../workflows/constants/workflowConstant';
import connectApi from '../../../../middlewares/connectApi';

const { DOWNLOAD_USING_DOCUMENT_LINK } = constants;

let DownloadDraft = props => {
    return (
        <>
            <DownloadUiTemplate
                documentConfig={documentConfig}
                downloadType={DOWNLOAD_USING_DOCUMENT_LINK}
                options={{
                    title: FORM_TITLE,
                    saveButton: false,
                    submitButton: {
                        title: BUTTON_TITLE_CONTINUE
                    },
                    onSubmitMessage: null
                }}
                downloadOptions={{
                    api: connectApi,
                    isPublicBucket: false
                }}
                {...props}
            />
        </>
    );
};

export default DownloadDraft;
