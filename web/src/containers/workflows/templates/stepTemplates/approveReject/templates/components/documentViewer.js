import React from 'react';
import { Spin } from 'antd';
import PDFViewer from '../../../../../../../components/scheme/registration/PDFViewer';

const LoadingContainer = () => (
    <div className="loading-container">
        <Spin />
    </div>
);

const DocumentViewer = props => {
    const { signedDocumentURL = null, documentsList = [], isLoadingDocument = false } = props;

    const renderPDFViewer = url => {
        if (isLoadingDocument) {
            return <LoadingContainer />;
        }
        return <PDFViewer documentURL={url} />;
    };

    const renderDocumentsList = docList => {
        return (
            <div className="doc-list-container">
                {docList.map(docItem => {
                    return (
                        <div className="doc-list-item">
                            <div>{docItem.name}</div>
                            <div>
                                <a href={docItem.url} target="new">
                                    Download link
                                </a>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    if (signedDocumentURL) return renderPDFViewer(signedDocumentURL);
    else if (documentsList) return renderDocumentsList(documentsList);
    else return <LoadingContainer />;
};

export default DocumentViewer;
