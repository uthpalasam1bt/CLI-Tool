import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import _ from 'lodash';
import FormHeaderComponent from '../../forms/formHeader';
import { FileDownloader } from '../../forms/fields';
import { convertArtifacts } from '../../../helpers/ArtifactConverter';
import constants from '../../../constants';
const { BUTTON_TITLE_REQUEST, SUBMIT_ACTION, FORM_ACTION_TYPES } = constants;

const isArrayOrNot = data => {
    try {
        if (data && data.urls && Array.isArray(data.urls)) return true;
        return false;
    } catch (error) {
        return false;
    }
};

let DownloadUsingDocumentLink = props => {
    const {
        dataset,
        options: { title = null, titleIicon = null, submitButton = true, divider = false },
        downloadOptions: { api, bucketName = null },
        documentConfig,
        action_inProgress,
        artifacts,
        submitAction = SUBMIT_ACTION,
        handleFormSubmit
    } = props;

    const [documentData, setDocumentData] = useState({});
    useEffect(() => {
        if (dataset && dataset.documents) {
            setDocumentData(dataset.documents);
        }
    }, [dataset]);

    const formSubmit = submissionType => {
        let message = null;
        handleFormSubmit(submissionType, { formData: dataset && dataset.formData }, () => { }, message, true);
    };

    const formHeaderProps = {
        title: title,
        iIconText: titleIicon,
        actions: [
            ...(submitButton
                ? [
                      {
                          type: FORM_ACTION_TYPES.SUBMIT,
                          title: submitButton.title || BUTTON_TITLE_REQUEST,
                          state: {
                              inProgress: action_inProgress
                          },
                          onClick: () => {
                              formSubmit(submitAction);
                          },
                          bool: submitButton.showButton,
                          disabled: _.get(submitButton, 'disabled', false)
                      }
                  ]
                : [])
        ],
        artifacts: artifacts
    };

    return (
        <>
            <FormHeaderComponent {...formHeaderProps} />
            <form onSubmit={() => {}}>
                <div className="form-body custom-dwld-draft">
                    {documentConfig.map(
                        (doc, key) =>
                            documentData[doc.key] && (
                                <Row className="input-row" key={key}>
                                    <b className="title-sclla">
                                        {convertArtifacts(_.get(doc, 'title', ''), artifacts)}
                                    </b>
                                    {isArrayOrNot(documentData[doc.key])
                                        ? documentData[doc.key].urls.map((docItem, key) => (
                                              <>
                                                  {divider && <hr />}
                                                  <Row className="input-row" key={key}>
                                                      <Col className="files-sclla">
                                                          <FileDownloader
                                                              type="resource"
                                                              url={docItem.url}
                                                              bucketNameProp={bucketName}
                                                              api={api}
                                                          />
                                                      </Col>
                                                  </Row>
                                              </>
                                          ))
                                        : documentData[doc.key].url && (
                                              <Row className="input-row" key={key}>
                                                  <Col className="files-sclla">
                                                      <FileDownloader
                                                          type="resource"
                                                          url={documentData[doc.key].url}
                                                          bucketNameProp={bucketName}
                                                          api={api}
                                                      />
                                                  </Col>
                                              </Row>
                                          )}
                                </Row>
                            )
                    )}
                </div>
            </form>
        </>
    );
};

export default DownloadUsingDocumentLink;

// .checkbox-row {
//     border-bottom: 1px solid $light-grey;
//     margin-bottom: 0 !important;
//     padding: 14px;
//   }
