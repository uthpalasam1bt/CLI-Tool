import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
    directDownloadFile,
    getSignedURL,
    readFile,
    checkFileAvailability,
    convertFile
} from '../../../helpers/downloadHelper';
import config from 'appConfig';

const { bucket: privateBucketName, publicBucket: publicBucketName } = config;

const extensions = ['docx'];

export default class PDFViewer extends Component {
    static propTypes = {
        height: PropTypes.number,
        url: PropTypes.string
    };

    static defaultProps = {
        height: 600,
        isLoading: true
    };
    constructor(props) {
        super(props);

        this.state = {
            signedDocumentURL: null,
            convert_inprogress: false,
            canView: true
        };
        this.signedDocumentURL = this.signedDocumentURL.bind(this);
        this.downloadFile = this.downloadFile.bind(this);
        this.convertDocument = this.convertDocument.bind(this);
    }

    UNSAFE_componentWillMount() {
        this.ua = window.navigator.userAgent;
        const windowsBrowserRegex = /Trident|MSIE|Edge/;
        this.isIE = this.ua.match(windowsBrowserRegex);
    }

    

    componentDidMount() {
        let { documentURL } = this.props;
        if (documentURL && extensions.includes(documentURL.split('.').pop()) && !this.state.convert_inprogress) {
            this.convertDocument(documentURL);
        } else if (documentURL && ['pdf', 'PDF'].includes(documentURL.split('.').pop())) {
            this.setState({ canView: true }, () => {
                this.signedDocumentURL(documentURL);
            });
        } else {
            this.setState({ canView: false }, () => {
                this.signedDocumentURL(documentURL);
            });
        }
    }

    componentDidUpdate(prevProps) {
        if(!_.isEqual(this.props.documentURL, prevProps.documentURL)) 
        {
            this.setState({ signedDocumentURL:null})
            let { documentURL } = this.props;
            if (documentURL && extensions.includes(documentURL.split('.').pop()) && !this.state.convert_inprogress) {
                this.convertDocument(documentURL);
            } else if (documentURL && ['pdf', 'PDF'].includes(documentURL.split('.').pop())) {
                this.setState({ canView: true }, () => {
                    this.signedDocumentURL(documentURL);
                });
            } else {
                this.setState({ canView: false }, () => {
                    this.signedDocumentURL(documentURL);
                });
            }
        }
      } 



    async convertDocument(URL) {
        try {
            const { bucketNameProp, isPublic } = this.props;
            let documentURL = URL;
            this.setState({ convert_inprogress: true });
            let tempDocumentURL = documentURL.replace('.docx', '.pdf');
            const bucketName = bucketNameProp ? bucketNameProp : isPublic ? publicBucketName : privateBucketName;
            const data = await checkFileAvailability({ url: tempDocumentURL, bucketNameProp: bucketName });

            if (!data) {
                const datam = await convertFile({ url: documentURL, bucketNameProp: bucketName });

                if (datam) {
                    tempDocumentURL = datam;
                    this.setState({ canView: true });
                } else {
                    tempDocumentURL = documentURL;
                    this.setState({ canView: false });
                }
            } else {
                this.setState({ canView: true });
            }
            documentURL = tempDocumentURL;
            this.setState({ convert_inprogress: false }, () => {
                this.signedDocumentURL(documentURL);
            });
        } catch (error) {
            // console.log('Error occured while converting:', error);
            this.setState({ convert_inprogress: false, canView: false }, () => {
                this.signedDocumentURL(URL);
            });
        }
    }

    async signedDocumentURL(URL) {
        const { bucketNameProp, isPublic } = this.props;
        let documentURL = URL;
        try {
            const bucketName = bucketNameProp ? bucketNameProp : isPublic ? publicBucketName : privateBucketName;
            if (documentURL && extensions.includes(documentURL.split('.').pop()) && !this.state.convert_inprogress) {
                let tempDocumentURL = documentURL.replace('.docx', '.pdf');

                const data = await checkFileAvailability({ url: tempDocumentURL, bucketNameProp: bucketName });

                if (data) {
                    this.setState({ canView: true });
                    documentURL = tempDocumentURL;
                } else {
                    this.setState({ canView: false });
                }
            } else if (documentURL && ['pdf', 'PDF'].includes(documentURL.split('.').pop())) {
                this.setState({ canView: true });
            } else {
                this.setState({ canView: false });
            }

            const data = await readFile({ url: documentURL, bucket: bucketName });
            const {
                data: {
                    content: { url: signedDocumentURL }
                }
            } = await getSignedURL({ url: documentURL, bucket: bucketName });
            this.setState({ signedDocumentURL, fileData: data, convert_inprogress: false });
        } catch (error) {
            this.setState({ convert_inprogress: false, canView: false });
            // console.log('Error occured while getting signed url:', error);
        }
    }

    async downloadFile() {
        const { documentURL } = this.props;
        const { fileData } = this.state;

        let fileName = 'document.pdf';
        if (documentURL) {
            // console.log(documentURL);
            const chunks = documentURL.split('/');
            fileName = chunks[chunks.length - 1];
            fileName = fileName ? fileName.trim().replace(/ /g, '__') : fileName;
            fileName = extensions.includes(fileName.split('.').pop()) ? fileName.replace('.docx', '.pdf') : fileName;
        }
        await directDownloadFile(fileData, fileName);
    }

    render() {
        const { height, onlyDownload, extension } = this.props;
        const { signedDocumentURL, canView } = this.state;
        return (
            <div className="pdf-viewer-container">
                <div className="document-wrapper">
                    {this.isIE || onlyDownload || !canView ? (
                        <div className="download-pdf-error">
                            <p>{`Sorry, cannot view the ${extension ? extension.toUpperCase() : 'PDF'}`}</p>
                            <button type="button" className="tpip-btn-blue regular" onClick={this.downloadFile}>
                                <i class="fa fa-icon fa-download"></i>Download
                            </button>
                        </div>
                    ) : !signedDocumentURL ? (
                        <div className="download-pdf-error">
                            <p>{`The generated/uploaded document will display here.`}</p>
                        </div>
                    ) : (
                        signedDocumentURL && (
                            <object
                                data={`${signedDocumentURL}#navpanes=0&scrollbar=0`}
                                type="application/pdf"
                                width="100%"
                                height={height}
                            >
                                View PDF files is not supported
                            </object>
                        )
                    )}
                </div>
            </div>
        );
    }
}
