import React from 'react';

import documentConfig from './documentConfig.json';
import { FORM_TITLE } from './constants';
import constants from '../../../../../UILibrary/constants';
import DownloadUiTemplate from '../../../../workflows/templates/stepTemplates/downloads';
import connectApi from '../../../../../middlewares/connectApi';
const { DOWNLOAD_USING_DOCUMENT_LINK } = constants;

let Revmlt = props => {
    return (
        <>
            <DownloadUiTemplate
                documentConfig={documentConfig}
                downloadType={DOWNLOAD_USING_DOCUMENT_LINK}
                options={{
                    title: FORM_TITLE,
                    saveButton: false,
                    submitButton: false,
                    onSubmitMessage: null,
                    divider: true
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

export default Revmlt;
