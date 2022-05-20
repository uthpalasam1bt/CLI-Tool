import React, { Component } from 'react';
import { Col, Row, Comment, Empty, Select, Spin, Tooltip } from 'antd';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import Moment from 'helpers/Moment';
import config from 'appConfig';
import _ from 'lodash';

import PDFViewer from '../../../../../components/scheme/registration/PDFViewer';
import NotificationHelper from '../../../../../helpers/NotificationHelper';
import { FileDownloader } from '../../../../../UILibrary/components/forms/fields';
import ProfileImage from '../../../../../components/profileimage';

import { store_schemeData } from '../../../selector';
import { doRequestDocument, doRequestSelectedDocument } from './action';
import { document_config } from './../../selectors/documentDirectorySelectors';
import {
    document_data_inProgress,
    document_data,
    document_data_error,
    selected_document_data_inProgress,
    selected_document_data,
    selected_document_data_error
} from './selector';

import {
    SELECT_DOCUMENT_TYPE,
    SELECT_DOCUMENT_NAME,
    // TRANSITION_REPORT,
    // SIP,
    // documentStatus,
    NO_DATA
    // DocTypes,
    // AttachmentType
} from './constants';
import { STATES_APPROVE, STATES_REJECT } from '../../../../../config/constants';
import { Notices } from '../../constants';
import connectApi from '../../../../../middlewares/connectApi';
import { UserRole } from '../../../../../constants/userConstants';

const { ADMIN, CLIENT } = UserRole;

const { Option } = Select;
const { bucket: privateBucketName, publicBucket: publicBucketName, generateBucket: generateBucketName } = config;

class DocumentView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewDocUrl: null,
            viewComments: null,
            documentList: [],
            type: null,

            documentListValue: SELECT_DOCUMENT_NAME,
            dataSetValue: SELECT_DOCUMENT_TYPE,
            tempFormType: this.props.formType,

            document_config: {},

            document_data: null,
            document_data_inProgress: false,
            document_data_error: null,

            selected_document_data: null,
            selected_document_data_inProgress: false,
            selected_document_data_error: null
        };
    }

    componentDidMount() {
        const { formType } = this.props;
        if (formType === Notices) return this.requestOtherData(Notices);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.formType !== this.props.formType && this.props.formType === Notices) {
            this.requestOtherData(Notices);
        }
    }
    UNSAFE_componentWillReceiveProps(np, nc) {
        // set data to states
        if (np.formType !== null && this.state.tempFormType !== np.formType) {
            this.setState({
                dataSetValue: SELECT_DOCUMENT_TYPE,
                documentListValue: SELECT_DOCUMENT_NAME,
                tempFormType: np.formType
            });
        }

        if (np.document_data_inProgress && this.state.document_data_inProgress !== np.document_data_inProgress) {
            this.setState({ document_data_inProgress: np.document_data_inProgress });
        }

        if (np.document_data) {
            this.setState({ document_data: np.document_data }, () => {
                this.formatData();
            });
        }

        if (np.document_data_error) {
            this.setState({ document_data_error: np.document_data_error }, () => {
                NotificationHelper.getInstance().error(np.document_data_error.message);
            });
        }

        if (
            np.selected_document_data_inProgress &&
            this.state.selected_document_data_inProgress !== np.selected_document_data_inProgress
        ) {
            this.setState({ selected_document_data_inProgress: np.selected_document_data_inProgress });
        }

        if (np.selected_document_data) {
            this.setState({ selected_document_data: np.selected_document_data });
        }

        if (np.selected_document_data_error) {
            this.setState({ selected_document_data_error: np.selected_document_data_error }, () => {
                // NotificationHelper.getInstance().error(np.selected_document_data_error.message);
            });
        }

        if (np.selected_document_data && this.state.selected_document_data !== np.selected_document_data) {
            this.setState({ viewDocUrl: np.selected_document_data.documentURL });
        }
        if (np.selected_document_data && this.state.selected_document_data !== np.selected_document_data) {
            this.setState({ viewComments: np.selected_document_data.comments });
        }
    }

    renderCommentAuthor = comment => {
        if (comment.action === STATES_APPROVE) {
            return <span className="approved-text">{comment.name} - Approved</span>;
        } else if (comment.action === STATES_REJECT) {
            return <span className="rejected-text">{comment.name} - Rejected</span>;
        }
        return comment.name;
    };

    requestOtherData = event => {
        const {
            formType,
            store_schemeData: { schemeId }
        } = this.props;
        const section = formType.toLowerCase();
        const type = event;

        this.setState({
            type,
            viewComments: null,
            viewDocUrl: null,
            documentList: [],
            dataSetValue: event,
            documentListValue: SELECT_DOCUMENT_NAME
        });

        this.props.doRequestDocument({
            section,
            type,
            entityId: schemeId
        });
    };

    formatData = () => {
        const { document_data, dataSetValue } = this.state;
        if (document_data && document_data.length) {
            document_data.reverse();
            const documentList = document_data.map(({ id, documentName, transformedTitle }) => {
                return {
                    value: transformedTitle,
                    key: id,
                    documentName: documentName
                };
            });

            this.setState({
                documentList: documentList
                // viewDocUrl: null,
                // viewComments: null
            });
        } else {
            this.setState({
                documentListValue: dataSetValue !== SELECT_DOCUMENT_TYPE ? NO_DATA : SELECT_DOCUMENT_NAME,
                documentList: []
            });
        }
    };

    viewData = event => {
        const {
            formType,
            store_schemeData: { schemeId }
        } = this.props;

        const section = formType.toLowerCase();
        const type = this.state.type;
        const documentId = event;

        const document = this.state.document_data.find(x => x.id == event);

        this.setState({ documentListValue: event, viewDocUrl: document.documentURL });

        this.props.doRequestSelectedDocument({
            section,
            type,
            documentId,
            schemeId
        });
    };

    removeUnwantedItems = (data, removeItem) => {
        return data.filter(function(el) {
            return el.key !== removeItem;
        });
    };

    render() {
        const { formType, store_schemeData, document_config, document_data_inProgress } = this.props;
        const { viewDocUrl, viewComments, documentList, dataSetValue, documentListValue } = this.state;
        // generating dataMap obj using document config.
        const dataMap = {};
        for (const [key, value] of Object.entries(document_config)) {
            dataMap[key] = value.dataMap;
        }

        let dataSet = [];
        let tempDataSet = [];
        const extension = viewDocUrl ? viewDocUrl.split('.').pop() : 'pdf';

        dataSet = dataMap[formType];

        dataSet.sort((prv, nxt) => parseInt(prv.sortOrder) - parseInt(nxt.sortOrder));

        return (
            <Row className="input-row">
                <div className="ant-row">
                    <Col xl={24} lg={24} xs={24} className="label-wrapper doc-view">
                        {this.props.formType !== Notices ? (
                            <Select
                                onChange={event => this.requestOtherData(event)}
                                style={{ width: '30%' }}
                                value={dataSetValue}
                            >
                                {dataSet.map((item, index) => {
                                    return (
                                        <Option key={index} value={item.key}>
                                            {item.value}
                                        </Option>
                                    );
                                })}
                            </Select>
                        ) : null}
                        <Select
                            onChange={event => this.viewData(event)}
                            style={{ width: '49%' }}
                            value={documentListValue}
                            loading={document_data_inProgress}
                            notFoundContent={document_data_inProgress ? <Spin size="small" /> : null}
                        >
                            {dataSetValue !== SELECT_DOCUMENT_TYPE &&
                                documentList &&
                                documentList.map((item, index) => {
                                    return (
                                        <Option key={index} value={item.key}>
                                            <Tooltip title={item.documentName}>
                                                <span className="i-icon">{item.value}</span>
                                            </Tooltip>
                                        </Option>
                                    );
                                })}
                        </Select>
                        {viewDocUrl &&
                        extension === 'docx' &&
                        _.get(this.props.loggedUser, 'custom:primaryRole') === ADMIN ? (
                            <Select style={{ width: 110 }} value={`select`}>
                                <Option key={'select'} value={'select'}>
                                    Download
                                </Option>
                                <Option key={'docx'} value={'docx'}>
                                    <FileDownloader
                                        type="icon"
                                        url={viewDocUrl}
                                        downloadText="  docx"
                                        api={connectApi}
                                        bucketNameProp={this.props.isPublic ? publicBucketName : privateBucketName}
                                    />
                                </Option>
                                <Option key={'pdf'} value={'pdf'}>
                                    <FileDownloader
                                        type="icon"
                                        url={viewDocUrl.replace('.docx', '.pdf')}
                                        downloadText="  pdf"
                                        api={connectApi}
                                        bucketNameProp={this.props.isPublic ? publicBucketName : privateBucketName}
                                    />
                                </Option>
                            </Select>
                        ) : viewDocUrl ? (
                            <FileDownloader
                                type="primaryDownloadButton"
                                url={extension === 'docx' ? viewDocUrl.replace('.docx', '.pdf') : viewDocUrl}
                                api={connectApi}
                                bucketNameProp={this.props.isPublic ? publicBucketName : privateBucketName}
                            />
                        ) : null}
                    </Col>
                </div>
                <div className="ant-row">
                    {viewDocUrl &&
                    (dataSetValue !== SELECT_DOCUMENT_TYPE || documentListValue !== SELECT_DOCUMENT_NAME) ? (
                        // pdf view if only select second dropdown value
                        <div className="doc-preview-container">
                            {/* docx/doc view  */}
                            {/* <iframe src="http://docs.google.com/gview?url=http://remote.url.tld/path/to/document.doc&embedded=true"></iframe> */}

                            <PDFViewer
                                documentURL={viewDocUrl}
                                onlyDownload={viewDocUrl && !['pdf', 'docx'].includes(extension)}
                                extension={extension}
                            />
                        </div>
                    ) : dataSetValue !== null &&
                      dataSetValue !== SELECT_DOCUMENT_TYPE &&
                      (documentListValue === SELECT_DOCUMENT_NAME || documentListValue === NO_DATA) &&
                      !documentList ? (
                        <div className="empty-view">
                            {/* if there isn't any data  */}
                            <Empty
                                description={
                                    <span>
                                        The category you selected has no uploaded documents or no details entered yet.
                                    </span>
                                }
                            />
                        </div>
                    ) : null}
                </div>
                {viewComments &&
                viewComments.length &&
                (dataSetValue !== SELECT_DOCUMENT_TYPE || documentListValue !== SELECT_DOCUMENT_NAME) ? (
                    <div className="comment-container">
                        <h3 className="header">Comments</h3>
                        <div className="comment-list">
                            {viewComments &&
                                viewComments.map(comment => (
                                    <Comment
                                        key={comment.id}
                                        author={this.renderCommentAuthor(comment)}
                                        content={<p>{comment.content}</p>}
                                        avatar={<ProfileImage imageUrl={comment.imageUrl || null} alt={comment.name} />}
                                        datetime={
                                            <span>
                                                {moment(Moment.format(comment.createdDateTime)).format('Do MMM YYYY')}
                                            </span>
                                        }
                                    />
                                ))}
                        </div>
                    </div>
                ) : null}
            </Row>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    store_schemeData: store_schemeData(),
    document_config: document_config(),
    document_data: document_data(),
    document_data_inProgress: document_data_inProgress(),
    document_data_error: document_data_error(),
    selected_document_data_inProgress: selected_document_data_inProgress(),
    selected_document_data: selected_document_data(),
    selected_document_data_error: selected_document_data_error()
});

const mapDispatchToProps = dispatch => ({
    doRequestDocument: payload => {
        dispatch(doRequestDocument(payload));
    },
    doRequestSelectedDocument: payload => {
        dispatch(doRequestSelectedDocument(payload));
    }
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DocumentView);
